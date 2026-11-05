<?php

namespace App\Services\Nfse\Drivers;

use App\Models\Emitente;
use App\Models\NotaFiscal;

interface Transmissor
{
    /** Whether the DPS must be signed with the emitente's A1 certificate before transmission. */
    public function exigeAssinatura(): bool;

    /**
     * Sends the already validated (and, if required, signed) DPS and returns how the nota ends up.
     * Keys beyond status/mensagens are optional and filled when the driver gets an authorization.
     *
     * @return array{status: string, mensagens: array<int, string>, chave_acesso?: ?string, numero_nfse?: ?string, nfse_xml?: ?string, resposta?: ?array}
     */
    public function transmitir(Emitente $emitente, NotaFiscal $nota, string $dpsXml): array;

    /**
     * Looks up a nota that was sent without a confirmed answer. Same result shape as transmitir();
     * a nota the ADN does not know yet stays pending.
     *
     * @return array{status: string, mensagens: array<int, string>, chave_acesso?: ?string, numero_nfse?: ?string, nfse_xml?: ?string, resposta?: ?array}
     */
    public function consultar(Emitente $emitente, NotaFiscal $nota): array;

    /**
     * Sends the signed cancellation event.
     *
     * @return array{cancelada: bool, mensagens: array<int, string>, resposta?: ?array}
     */
    public function cancelar(Emitente $emitente, NotaFiscal $nota, string $eventoXml): array;

    /** PDF bytes of the DANFSE, or null when this driver cannot provide one. */
    public function baixarDanfse(Emitente $emitente, NotaFiscal $nota): ?string;
}
