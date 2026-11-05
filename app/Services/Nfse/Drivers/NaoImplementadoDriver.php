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

    public function consultar(Emitente $emitente, NotaFiscal $nota): array
    {
        return ['status' => $nota->status, 'mensagens' => ["A consulta pelo driver \"{$emitente->driver}\" ainda não está disponível."]];
    }

    public function cancelar(Emitente $emitente, NotaFiscal $nota, string $eventoXml): array
    {
        return ['cancelada' => false, 'mensagens' => ["O cancelamento pelo driver \"{$emitente->driver}\" ainda não está disponível."]];
    }

    public function baixarDanfse(Emitente $emitente, NotaFiscal $nota): ?string
    {
        return null;
    }
}
