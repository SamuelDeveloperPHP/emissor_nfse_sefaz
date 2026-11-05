<?php

namespace App\Services\Nfse\Drivers;

use App\Models\Emitente;
use App\Models\NotaFiscal;

interface Transmissor
{
    /**
     * Sends the already validated DPS of the nota and returns how the nota should end up.
     *
     * @return array{status: string, mensagens: array<int, string>}
     */
    public function transmitir(Emitente $emitente, NotaFiscal $nota): array;
}
