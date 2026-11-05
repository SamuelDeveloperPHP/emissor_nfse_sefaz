<?php

namespace App\Services\Nfse\Drivers;

use App\Models\Emitente;
use App\Models\NotaFiscal;

class NaoImplementadoDriver implements Transmissor
{
    public function exigeAssinatura(): bool
    {
        return false;
    }

    public function transmitir(Emitente $emitente, NotaFiscal $nota, string $dpsXml): array
    {
        return [
            'status' => NotaFiscal::STATUS_PENDENTE,
            'mensagens' => ["A transmissão pelo driver \"{$emitente->driver}\" ainda não está disponível; a DPS foi gerada e validada no XSD oficial."],
        ];
    }
}
