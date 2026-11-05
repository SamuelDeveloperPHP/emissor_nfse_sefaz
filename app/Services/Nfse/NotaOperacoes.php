<?php

namespace App\Services\Nfse;

use App\Models\Lote;
use App\Models\NotaFiscal;
use App\Models\User;
use App\Services\Nfse\Drivers\DriverManager;

/**
 * Operations on a nota that already exists: looking up a pending one at the ADN, cancelling an
 * authorized one and replacing it with a corrected one. Shared by the Notas Fiscais screens, the
 * lote job and the scheduled lookup command.
 */
class NotaOperacoes
{
    public function __construct(
        private readonly DriverManager $drivers,
        private readonly EventoBuilder $eventos,
        private readonly XmlSigner $signer,
        private readonly XsdValidator $validator,
        private readonly LoteImporter $importer,
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
        $this->concluirSubstituicao($nota);

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

    /**
     * Creates the lote that issues the corrected nota replacing an authorized one. The new nota is an
     * ordinary DPS that names the old one (group "subst"); the old one only becomes "cancelada" when
     * the new one is authorized (see concluirSubstituicao). Returns the lote, not yet processed.
     *
     * @param  array<string, string>  $linha  the corrected data, laid out like a CSV line
     *
     * @throws NfseException for anything the user must fix first
     */
    public function prepararSubstituicao(NotaFiscal $original, User $por, array $linha, string $codigoMotivo, string $motivo): Lote
    {
        $original->loadMissing('emitente', 'lote');

        if ($original->status !== NotaFiscal::STATUS_AUTORIZADA) {
            throw new NfseException('Só é possível substituir uma nota autorizada.');
        }
        if (! preg_match('/^\d{50}$/', (string) $original->chave_acesso)) {
            throw new NfseException('A nota não tem chave de acesso; consulte a situação dela antes de substituir.');
        }
        if (! isset(DpsBuilder::MOTIVOS_SUBSTITUICAO[$codigoMotivo])) {
            throw new NfseException('Escolha um motivo de substituição válido.');
        }
        if (mb_strlen(trim($motivo)) < 15) {
            throw new NfseException('Explique o motivo da substituição com pelo menos 15 caracteres.');
        }

        $emAndamento = NotaFiscal::query()
            ->where('emitente_id', $original->emitente_id)
            ->whereIn('status', [NotaFiscal::STATUS_PENDENTE, NotaFiscal::STATUS_AUTORIZADA])
            ->where('payload', 'like', '%"substitui_chave":"'.$original->chave_acesso.'"%')
            ->exists();
        if ($emAndamento) {
            throw new NfseException('Esta nota já tem uma substituta emitida ou em andamento.');
        }

        [, $erros] = $this->importer->normalizar($linha);
        if ($erros) {
            throw new NfseException(implode(' ', $erros));
        }

        return $this->importer->importarLinha(
            $original->emitente,
            $por,
            $linha,
            'Substituição da NFS-e '.($original->numero_nfse ?? $original->id),
            // A substitute belongs to the same environment as the nota it replaces.
            $original->lote?->ambiente ?? $original->emitente->ambiente,
            [
                'substitui_chave' => $original->chave_acesso,
                'substituicao_motivo_codigo' => $codigoMotivo,
                'substituicao_motivo' => trim($motivo),
            ]
        );
    }

    /**
     * Once a substitute is authorized, the nota it replaces is marked as replaced. Safe to call any
     * number of times and for notas that are not substitutes.
     */
    public function concluirSubstituicao(NotaFiscal $nova): void
    {
        $chave = $nova->chaveSubstituida();

        if ($chave === null || $nova->status !== NotaFiscal::STATUS_AUTORIZADA) {
            return;
        }

        $original = NotaFiscal::query()
            ->where('emitente_id', $nova->emitente_id)
            ->where('chave_acesso', $chave)
            ->where('status', NotaFiscal::STATUS_AUTORIZADA)
            ->first();

        $original?->update([
            'status' => NotaFiscal::STATUS_CANCELADA,
            'cancelada_em' => now(),
            'cancelamento_motivo' => 'Substituída pela NFS-e '.($nova->numero_nfse ?? 'nº '.$nova->id).': '.($nova->payload['substituicao_motivo'] ?? ''),
            'substituida_por_id' => $nova->id,
        ]);
    }
}
