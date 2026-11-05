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
    public function transmitir(Emitente $emitente, NotaFiscal $nota): array
    {
        return [
            'status' => NotaFiscal::STATUS_AUTORIZADA,
            'mensagens' => ['Autorizada pelo simulador local; nenhuma NFS-e real foi emitida.'],
        ];
    }
}
