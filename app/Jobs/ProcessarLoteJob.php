<?php

namespace App\Jobs;

use App\Models\Emitente;
use App\Models\Lote;
use App\Models\NotaFiscal;
use App\Services\Nfse\Drivers\DriverManager;
use App\Services\Nfse\DpsBuilder;
use App\Services\Nfse\NfseException;
use App\Services\Nfse\XsdValidator;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Throwable;

class ProcessarLoteJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $timeout = 3600;

    public int $tries = 1;

    public function __construct(public Lote $lote)
    {
    }

    public function handle(DpsBuilder $builder, XsdValidator $validator, DriverManager $drivers): void
    {
        $emitente = $this->lote->emitente;
        $driver = $drivers->for($emitente);

        $this->lote->notas()
            ->where('status', NotaFiscal::STATUS_PENDENTE)
            ->whereNull('dps_xml')
            ->orderBy('linha')
            ->chunkById(200, function ($notas) use ($emitente, $builder, $validator, $driver) {
                foreach ($notas as $nota) {
                    try {
                        $this->processar($nota, $emitente, $builder, $validator, $driver);
                    } catch (Throwable $e) {
                        report($e);
                        $this->rejeitar($nota, ['Falha inesperada ao processar esta linha: '.$e->getMessage()]);
                    }
                }
            });

        $this->finalizar();
    }

    private function processar(NotaFiscal $nota, Emitente $emitente, DpsBuilder $builder, XsdValidator $validator, $driver): void
    {
        $numero = DB::transaction(function () use ($emitente) {
            $atual = Emitente::query()->whereKey($emitente->id)->lockForUpdate()->firstOrFail();
            $atual->increment('rps_numero_atual');

            return (int) $atual->rps_numero_atual;
        });

        try {
            $xml = $builder->build($emitente, $nota->payload ?? [], $numero, $this->lote->ambiente);
        } catch (NfseException $e) {
            $this->rejeitar($nota, [$e->getMessage()], $numero);

            return;
        }

        $erros = $validator->validarDps($xml);
        if ($erros) {
            $this->rejeitar($nota, $erros, $numero, $xml);

            return;
        }

        $resultado = $driver->transmitir($emitente, $nota);
        $autorizada = $resultado['status'] === NotaFiscal::STATUS_AUTORIZADA;

        $nota->update([
            'numero' => (string) $numero,
            'dps_xml' => $xml,
            'status' => $resultado['status'],
            'emitida_em' => $autorizada ? now() : null,
            'erros' => $autorizada ? null : $resultado['mensagens'],
        ]);
    }

    private function rejeitar(NotaFiscal $nota, array $erros, ?int $numero = null, ?string $xml = null): void
    {
        $nota->update([
            'numero' => $numero !== null ? (string) $numero : $nota->numero,
            'dps_xml' => $xml,
            'status' => NotaFiscal::STATUS_REJEITADA,
            'motivo_rejeicao' => $erros[0],
            'erros' => $erros,
        ]);
    }

    private function finalizar(): void
    {
        $contagem = $this->lote->contagemPorStatus();

        $status = match (true) {
            $contagem[NotaFiscal::STATUS_PENDENTE] > 0 => Lote::STATUS_AGUARDANDO_TRANSMISSAO,
            $contagem[NotaFiscal::STATUS_REJEITADA] > 0 => Lote::STATUS_CONCLUIDO_COM_ERROS,
            default => Lote::STATUS_CONCLUIDO,
        };

        $this->lote->update(['status' => $status, 'processado_em' => now()]);
    }
}
