<?php

namespace App\Services\Nfse;

use App\Models\Emitente;
use DOMDocument;
use DOMElement;

/**
 * Builds the unsigned DPS (Declaração de Prestação de Serviços) XML of the
 * Sistema Nacional NFS-e, layout 1.01, from an emitente and a normalized payload.
 *
 * Payload keys: tomador_documento (11 or 14 digits), tomador_nome, tomador_email?,
 * descricao, codigo_tributacao (6 digits), valor, aliquota?, iss_retido, competencia
 * (Y-m-d), municipio_prestacao? (IBGE, defaults to the emitente's municipality).
 */
class DpsBuilder
{
    public const NAMESPACE = 'http://www.sped.fazenda.gov.br/nfse';

    public function build(Emitente $emitente, array $payload, int $numeroDps): string
    {
        $cnpj = preg_replace('/\D/', '', (string) $emitente->cnpj);
        $municipioEmissor = preg_replace('/\D/', '', (string) $emitente->codigo_municipio);

        if (strlen($cnpj) !== 14) {
            throw new NfseException('O CNPJ do emitente é inválido.');
        }
        if (strlen($municipioEmissor) !== 7) {
            throw new NfseException('Informe o código IBGE (7 dígitos) do município do emitente.');
        }

        $opSimpNac = match ($emitente->regime_tributario) {
            'mei' => '2',
            'simples_nacional' => '3',
            default => '1',
        };

        $serie = str_pad(ltrim((string) ($emitente->rps_serie ?: '1'), '0') ?: '1', 5, '0', STR_PAD_LEFT);

        $doc = new DOMDocument('1.0', 'UTF-8');
        $doc->formatOutput = false;

        $dps = $doc->createElementNS(self::NAMESPACE, 'DPS');
        $dps->setAttribute('versao', config('nfse.versao_leiaute'));
        $doc->appendChild($dps);

        $inf = $this->child($doc, $dps, 'infDPS');
        $inf->setAttribute('Id', sprintf('DPS%s1%s%s%015d', $municipioEmissor, $cnpj, $serie, $numeroDps));

        $this->child($doc, $inf, 'tpAmb', $emitente->ambiente === 'producao' ? '1' : '2');
        $this->child($doc, $inf, 'dhEmi', now()->format('Y-m-d\TH:i:sP'));
        $this->child($doc, $inf, 'verAplic', config('nfse.ver_aplic'));
        $this->child($doc, $inf, 'serie', $serie);
        $this->child($doc, $inf, 'nDPS', (string) $numeroDps);
        $this->child($doc, $inf, 'dCompet', $payload['competencia'] ?? now()->toDateString());
        $this->child($doc, $inf, 'tpEmit', '1');
        $this->child($doc, $inf, 'cLocEmi', $municipioEmissor);

        $prest = $this->child($doc, $inf, 'prest');
        $this->child($doc, $prest, 'CNPJ', $cnpj);
        if (filled($emitente->inscricao_municipal)) {
            $this->child($doc, $prest, 'IM', $emitente->inscricao_municipal);
        }
        $regTrib = $this->child($doc, $prest, 'regTrib');
        $this->child($doc, $regTrib, 'opSimpNac', $opSimpNac);
        if ($opSimpNac === '3') {
            $this->child($doc, $regTrib, 'regApTribSN', '1');
        }
        $this->child($doc, $regTrib, 'regEspTrib', '0');

        $toma = $this->child($doc, $inf, 'toma');
        $documento = preg_replace('/\D/', '', (string) ($payload['tomador_documento'] ?? ''));
        $this->child($doc, $toma, strlen($documento) === 14 ? 'CNPJ' : 'CPF', $documento);
        $this->child($doc, $toma, 'xNome', (string) ($payload['tomador_nome'] ?? ''));
        if (filled($payload['tomador_email'] ?? null)) {
            $this->child($doc, $toma, 'email', $payload['tomador_email']);
        }

        $serv = $this->child($doc, $inf, 'serv');
        $locPrest = $this->child($doc, $serv, 'locPrest');
        $this->child($doc, $locPrest, 'cLocPrestacao', $payload['municipio_prestacao'] ?? $municipioEmissor);
        $cServ = $this->child($doc, $serv, 'cServ');
        $this->child($doc, $cServ, 'cTribNac', (string) ($payload['codigo_tributacao'] ?? ''));
        $this->child($doc, $cServ, 'xDescServ', (string) ($payload['descricao'] ?? ''));

        $valores = $this->child($doc, $inf, 'valores');
        $vServPrest = $this->child($doc, $valores, 'vServPrest');
        $this->child($doc, $vServPrest, 'vServ', $this->decimal($payload['valor'] ?? 0));
        $trib = $this->child($doc, $valores, 'trib');
        $tribMun = $this->child($doc, $trib, 'tribMun');
        $this->child($doc, $tribMun, 'tribISSQN', '1');
        $this->child($doc, $tribMun, 'tpRetISSQN', ! empty($payload['iss_retido']) ? '2' : '1');
        if ($opSimpNac !== '3' && isset($payload['aliquota']) && $payload['aliquota'] !== null) {
            $this->child($doc, $tribMun, 'pAliq', $this->decimal($payload['aliquota']));
        }
        $totTrib = $this->child($doc, $trib, 'totTrib');
        $this->child($doc, $totTrib, 'indTotTrib', '0');

        return $doc->saveXML();
    }

    private function child(DOMDocument $doc, DOMElement $parent, string $name, ?string $value = null): DOMElement
    {
        $element = $doc->createElementNS(self::NAMESPACE, $name);
        if ($value !== null) {
            $element->appendChild($doc->createTextNode($value));
        }

        return $parent->appendChild($element);
    }

    private function decimal(float|int|string $value): string
    {
        return number_format((float) $value, 2, '.', '');
    }
}
