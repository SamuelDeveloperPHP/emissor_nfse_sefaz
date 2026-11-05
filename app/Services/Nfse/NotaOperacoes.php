<?php

namespace App\Services\Nfse;

use App\Models\NotaFiscal;
use App\Services\Nfse\Drivers\DriverManager;

/**
 * Operations on a nota that already exists: looking up a pending one at the ADN and cancelling an
 * authorized one. Shared by the Notas Fiscais screen and the scheduled lookup command.
 */
class NotaOperacoes
{
    public function __construct(
        private readonly DriverManager $drivers,
        private readonly EventoBuilder $eventos,
        private readonly XmlSigner $signer,
        private readonly XsdValidator $validator,
    ) {
    }

    /**
     * Asks the ADN what became of a nota and stores the answer.
     *
     * @return array{status: string, mensagens: array<int, string>}
     */
    public function consultar(NotaFiscal $nota): array
    {
        $resultado = $this->drivers->for($nota->emitente)->consultar($nota->emitente, $nota);

        $campos = ['consultada_em' => now()];

        if ($resultado['status'] === NotaFiscal::STATUS_AUTORIZADA && $nota->status !== NotaFiscal::STATUS_AUTORIZADA) {
            $campos += [
                'status' => NotaFiscal::STATUS_AUTORIZADA,
                'emitida_em' => now(),
                'motivo_rejeicao' => null,
                'erros' => null,
                'chave_acesso' => $resultado['chave_acesso'] ?? $nota->chave_acesso,
                'numero_nfse' => $resultado['numero_nfse'] ?? $nota->numero_nfse,
                'nfse_xml' => $resultado['nfse_xml'] ?? $nota->nfse_xml,
                'resposta' => $resultado['resposta'] ?? $nota->resposta,
            ];
        } elseif ($resultado['status'] === NotaFiscal::STATUS_REJEITADA && $nota->status === NotaFiscal::STATUS_PENDENTE) {
            $campos += [
                'status' => NotaFiscal::STATUS_REJEITADA,
                'motivo_rejeicao' => $resultado['mensagens'][0] ?? null,
                'erros' => $resultado['mensagens'],
                'resposta' => $resultado['resposta'] ?? $nota->resposta,
            ];
        } elseif ($nota->status === NotaFiscal::STATUS_PENDENTE) {
            // Still unknown: keep the latest explanation so the screen can show why.
            $campos['erros'] = $resultado['mensagens'];
        }

        $nota->update($campos);

        return ['status' => $nota->status, 'mensagens' => $resultado['mensagens']];
    }

    /**
     * Cancels an authorized nota. Throws NfseException for anything the user must fix first;
     * otherwise returns whether the ADN accepted it.
     *
     * @return array{cancelada: bool, mensagens: array<int, string>}
     */
    public function cancelar(NotaFiscal $nota, string $codigoMotivo, string $motivo): array
    {
        if ($nota->status !== NotaFiscal::STATUS_AUTORIZADA) {
            throw new NfseException('Só é possível cancelar notas autorizadas.');
        }

        $emitente = $nota->emitente;
        $driver = $this->drivers->for($emitente);
        $evento = '';

        if ($driver->exigeAssinatura()) {
            if (blank($nota->chave_acesso)) {
                throw new NfseException('A nota não tem chave de acesso; consulte a situação dela antes de cancelar.');
            }

            $ambiente = $nota->lote?->ambiente ?? $emitente->ambiente;
            $evento = $this->eventos->cancelamento($emitente, $nota->chave_acesso, $codigoMotivo, $motivo, $ambiente);
            $evento = $this->signer->assinarEvento($evento, CertificadoA1::doEmitente($emitente));

            if ($erros = $this->validator->validarEvento($evento)) {
                throw new NfseException('O pedido de cancelamento não passou no esquema oficial: '.implode(' ', $erros));
            }
        }

        $resultado = $driver->cancelar($emitente, $nota, $evento);

        if ($resultado['cancelada']) {
            $nota->update([
                'status' => NotaFiscal::STATUS_CANCELADA,
                'cancelada_em' => now(),
                'cancelamento_motivo' => trim($motivo),
                'cancelamento_xml' => $evento !== '' ? $evento : null,
            ]);
        }

        return ['cancelada' => $resultado['cancelada'], 'mensagens' => $resultado['mensagens']];
    }
}
