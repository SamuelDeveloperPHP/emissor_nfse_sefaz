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

    /** Justification codes the XSD accepts for replacing a nota (TSCodJustSubst). */
    public const MOTIVOS_SUBSTITUICAO = [
        '01' => 'Desenquadramento de NFS-e do Simples Nacional',
        '02' => 'Enquadramento de NFS-e no Simples Nacional',
        '03' => 'Inclusão retroativa de imunidade ou isenção',
        '04' => 'Exclusão retroativa de imunidade ou isenção',
        '05' => 'Rejeição de NFS-e pelo tomador ou intermediário',
        '99' => 'Outros',
    ];

    /**
     * @param  string|null  $ambiente  'homologacao' | 'producao'; defaults to the emitente's own
     */
    public function build(Emitente $emitente, array $payload, int $numeroDps, ?string $ambiente = null): string
    {
        $ambiente ??= $emitente->ambiente;

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

        $this->child($doc, $inf, 'tpAmb', $ambiente === 'producao' ? '1' : '2');
        $this->child($doc, $inf, 'dhEmi', now()->format('Y-m-d\TH:i:sP'));
        $this->child($doc, $inf, 'verAplic', config('nfse.ver_aplic'));
        $this->child($doc, $inf, 'serie', $serie);
        $this->child($doc, $inf, 'nDPS', (string) $numeroDps);
        $this->child($doc, $inf, 'dCompet', $payload['competencia'] ?? now()->toDateString());
        $this->child($doc, $inf, 'tpEmit', '1');
        $this->child($doc, $inf, 'cLocEmi', $municipioEmissor);

        // A substitute DPS names the nota it replaces; the ADN then cancels that one by substitution.
        if (filled($payload['substitui_chave'] ?? null)) {
            if (! preg_match('/^\d{50}$/', (string) $payload['substitui_chave'])) {
                throw new NfseException('A chave de acesso da NFS-e a substituir é inválida.');
            }
            if (! isset(self::MOTIVOS_SUBSTITUICAO[$payload['substituicao_motivo_codigo'] ?? ''])) {
                throw new NfseException('Escolha um motivo de substituição válido.');
            }
            if (mb_strlen(trim((string) ($payload['substituicao_motivo'] ?? ''))) < 15) {
                throw new NfseException('Explique o motivo da substituição com pelo menos 15 caracteres.');
            }

            $subst = $this->child($doc, $inf, 'subst');
            $this->child($doc, $subst, 'chSubstda', $payload['substitui_chave']);
            $this->child($doc, $subst, 'cMotivo', $payload['substituicao_motivo_codigo']);
            $this->child($doc, $subst, 'xMotivo', trim($payload['substituicao_motivo']));
        }

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
        if ($this->enderecoCompleto($payload)) {
            $end = $this->child($doc, $toma, 'end');
            $endNac = $this->child($doc, $end, 'endNac');
            $this->child($doc, $endNac, 'cMun', $payload['tomador_codigo_municipio']);
            $this->child($doc, $endNac, 'CEP', $payload['tomador_cep']);
            $this->child($doc, $end, 'xLgr', $payload['tomador_logradouro']);
            $this->child($doc, $end, 'nro', $payload['tomador_numero']);
            if (filled($payload['tomador_complemento'] ?? null)) {
                $this->child($doc, $end, 'xCpl', $payload['tomador_complemento']);
            }
            $this->child($doc, $end, 'xBairro', $payload['tomador_bairro']);
        }
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

        if ($this->ibscbsCompleto($payload)) {
            $ibscbs = $this->child($doc, $inf, 'IBSCBS');
            $this->child($doc, $ibscbs, 'finNFSe', '0');
            $this->child($doc, $ibscbs, 'cIndOp', $payload['ibscbs_codigo_operacao']);
            $this->child($doc, $ibscbs, 'indDest', '0'); // the destinatário is the tomador itself
            $gIbsCbs = $this->child($doc, $this->child($doc, $this->child($doc, $ibscbs, 'valores'), 'trib'), 'gIBSCBS');
            $this->child($doc, $gIbsCbs, 'CST', $payload['ibscbs_cst']);
            $this->child($doc, $gIbsCbs, 'cClassTrib', $payload['ibscbs_classificacao']);
        }

        return $doc->saveXML();
    }

    /** The IBS/CBS group goes into the DPS only when the three codes are all there. */
    private function ibscbsCompleto(array $payload): bool
    {
        foreach (['ibscbs_codigo_operacao', 'ibscbs_cst', 'ibscbs_classificacao'] as $campo) {
            if (blank($payload[$campo] ?? null)) {
                return false;
            }
        }

        return true;
    }

    private function enderecoCompleto(array $payload): bool
    {
        foreach (['tomador_cep', 'tomador_codigo_municipio', 'tomador_logradouro', 'tomador_numero', 'tomador_bairro'] as $campo) {
            if (blank($payload[$campo] ?? null)) {
                return false;
            }
        }

        return true;
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
