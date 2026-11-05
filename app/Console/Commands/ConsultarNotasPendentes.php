<?php

namespace App\Console\Commands;

use App\Models\NotaFiscal;
use App\Services\Nfse\NotaOperacoes;
use Illuminate\Console\Command;
use Throwable;

class ConsultarNotasPendentes extends Command
{
    protected $signature = 'nfse:consultar-pendentes {--limite=200 : máximo de notas por execução} {--espera=2 : minutos de espera antes de consultar uma nota recém-enviada}';

    protected $description = 'Consulta no ADN as notas enviadas sem resposta confirmada (timeout, erro 5xx) e atualiza a situação.';

    public function handle(NotaOperacoes $operacoes): int
    {
        // Only notas that actually went out (their DPS was kept) and whose emitente transmits through
        // the ADN; stub drivers have nothing to look up.
        $notas = NotaFiscal::query()
            ->where('status', NotaFiscal::STATUS_PENDENTE)
            ->whereNotNull('dps_xml')
            ->where('updated_at', '<=', now()->subMinutes((int) $this->option('espera')))
            ->whereHas('emitente', fn ($q) => $q->where('driver', 'adn_nacional'))
            ->orderByRaw('consultada_em IS NOT NULL')
            ->orderBy('consultada_em')
            ->limit((int) $this->option('limite'))
            ->with('emitente', 'lote')
            ->get();

        $resolvidas = 0;

        foreach ($notas as $nota) {
            try {
                if ($operacoes->consultar($nota)['status'] !== NotaFiscal::STATUS_PENDENTE) {
                    $resolvidas++;
                }
            } catch (Throwable $e) {
                report($e);
            }
        }

        $this->info("{$notas->count()} nota(s) consultada(s), {$resolvidas} resolvida(s).");

        return self::SUCCESS;
    }
}
