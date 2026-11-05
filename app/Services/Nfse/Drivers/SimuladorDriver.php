<?php

namespace App\Services\Nfse\Drivers;

use App\Models\Emitente;
use App\Models\NotaFiscal;

/**
 * Local stand-in for a real transmission: nothing leaves the machine and no
 * NFS-e is actually issued. It lets the whole batch pipeline run without credentials.
 */
class SimuladorDriver implements Transmissor
{
    public function exigeAssinatura(): bool
    {
        return false;
    }

    public function transmitir(Emitente $emitente, NotaFiscal $nota, string $dpsXml): array
    {
        return [
            'status' => NotaFiscal::STATUS_AUTORIZADA,
            'mensagens' => ['Autorizada pelo simulador local; nenhuma NFS-e real foi emitida.'],
        ];
    }

    public function consultar(Emitente $emitente, NotaFiscal $nota): array
    {
        return ['status' => $nota->status, 'mensagens' => ['Consulta feita no simulador local; nada foi verificado em um órgão real.']];
    }

    public function cancelar(Emitente $emitente, NotaFiscal $nota, string $eventoXml): array
    {
        return ['cancelada' => true, 'mensagens' => ['Cancelada no simulador local; nenhum cancelamento real foi registrado.']];
    }

    public function baixarDanfse(Emitente $emitente, NotaFiscal $nota): ?string
    {
        return null;
    }
}
