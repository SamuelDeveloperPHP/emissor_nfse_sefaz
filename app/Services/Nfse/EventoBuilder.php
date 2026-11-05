<?php

namespace App\Services\Nfse;

use App\Models\Emitente;
use DOMDocument;
use DOMElement;

/**
 * Builds the unsigned "pedido de registro de evento" (pedRegEvento) of layout 1.01.
 * Only the cancellation event (101101) is supported.
 */
class EventoBuilder
{
    public const CODIGO_CANCELAMENTO = '101101';

    /** Justification codes the XSD accepts for a cancellation (TSCodJustCanc). */
    public const MOTIVOS_CANCELAMENTO = [
        '1' => 'Erro na emissão',
        '2' => 'Serviço não prestado',
        '9' => 'Outros',
    ];

    public function cancelamento(Emitente $emitente, string $chaveNfse, string $codigoMotivo, string $motivo, string $ambiente): string
    {
        $cnpj = preg_replace('/\D/', '', (string) $emitente->cnpj);

        if (strlen($cnpj) !== 14) {
            throw new NfseException('O CNPJ do emitente é inválido.');
        }
        if (! preg_match('/^\d{50}$/', $chaveNfse)) {
            throw new NfseException('A chave de acesso da NFS-e é inválida.');
        }
        if (! isset(self::MOTIVOS_CANCELAMENTO[$codigoMotivo])) {
            throw new NfseException('Escolha um motivo de cancelamento válido.');
        }

        $doc = new DOMDocument('1.0', 'UTF-8');
        $doc->formatOutput = false;

        $ped = $doc->createElementNS(DpsBuilder::NAMESPACE, 'pedRegEvento');
        $ped->setAttribute('versao', config('nfse.versao_leiaute'));
        $doc->appendChild($ped);

        $inf = $this->child($doc, $ped, 'infPedReg');
        $inf->setAttribute('Id', 'PRE'.$chaveNfse.self::CODIGO_CANCELAMENTO);

        $this->child($doc, $inf, 'tpAmb', $ambiente === 'producao' ? '1' : '2');
        $this->child($doc, $inf, 'verAplic', config('nfse.ver_aplic'));
        $this->child($doc, $inf, 'dhEvento', now()->format('Y-m-d\TH:i:sP'));
        $this->child($doc, $inf, 'CNPJAutor', $cnpj);
        $this->child($doc, $inf, 'chNFSe', $chaveNfse);

        $evento = $this->child($doc, $inf, 'e'.self::CODIGO_CANCELAMENTO);
        $this->child($doc, $evento, 'xDesc', 'Cancelamento de NFS-e');
        $this->child($doc, $evento, 'cMotivo', $codigoMotivo);
        $this->child($doc, $evento, 'xMotivo', trim($motivo));

        return $doc->saveXML();
    }

    private function child(DOMDocument $doc, DOMElement $parent, string $name, ?string $value = null): DOMElement
    {
        $element = $doc->createElementNS(DpsBuilder::NAMESPACE, $name);
        if ($value !== null) {
            $element->appendChild($doc->createTextNode($value));
        }

        return $parent->appendChild($element);
    }
}
