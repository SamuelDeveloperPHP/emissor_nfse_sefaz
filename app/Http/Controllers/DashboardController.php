<?php

namespace App\Http\Controllers;

use App\Models\Emitente;
use App\Models\NotaFiscal;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $now = now()->locale('pt_BR');

        $emitentes = Emitente::query()->visibleTo($user);
        $ativos = (clone $emitentes)->where('is_active', true)->count();
        $inativos = (clone $emitentes)->where('is_active', false)->count();

        $certificados = (clone $emitentes)
            ->where('is_active', true)
            ->whereNotNull('certificado_validade')
            ->whereDate('certificado_validade', '<=', $now->copy()->addDays(30))
            ->orderBy('certificado_validade')
            ->limit(6)
            ->get()
            ->map(fn (Emitente $e) => [
                'id' => $e->id,
                'razao_social' => $e->razao_social,
                'validade' => $e->certificado_validade->format('Y-m-d'),
                'dias' => (int) $now->copy()->startOfDay()->diffInDays($e->certificado_validade->copy()->startOfDay(), false),
            ]);

        $semCertificado = (clone $emitentes)
            ->where('is_active', true)
            ->whereNull('certificado_path')
            ->count();

        $notas = NotaFiscal::query()->whereIn('emitente_id', Emitente::query()->visibleTo($user)->select('id'));

        $dias = $this->notasPorDia(clone $notas, $now);
        $horas = $this->notasPorHora(clone $notas, $now);

        return Inertia::render('Dashboard/index', [
            'emitentes' => [
                'total' => $ativos + $inativos,
                'ativos' => $ativos,
                'inativos' => $inativos,
                'sem_certificado' => $semCertificado,
                'certificados' => $certificados,
            ],
            'periodos' => [
                'dia' => $this->periodo('Hoje', $now->isoFormat('D [de] MMMM'), $this->bucketsDoDia(), $horas),
                'semana' => $this->periodo('Semana', $this->intervaloSemana($now), $this->bucketsDaSemana($now), $this->filtrarDias($dias, $now->copy()->startOfWeek(), $now->copy()->endOfWeek())),
                'mes' => $this->periodo('Mês', $now->isoFormat('MMMM [de] YYYY'), $this->bucketsDoMes($now), $this->filtrarDias($dias, $now->copy()->startOfMonth(), $now->copy()->endOfMonth())),
                'ano' => $this->periodo('Ano', (string) $now->year, $this->bucketsDoAno($now), $this->agruparPorMes($dias)),
            ],
            'gerado_em' => $now->format('H:i'),
        ]);
    }

    /**
     * One row per day of the current year and status, so week, month and year
     * can all be derived from a single query.
     *
     * @return array<int, array{key: string, status: string, n: int, v: float}>
     */
    private function notasPorDia($query, Carbon $now): array
    {
        return $query
            ->whereBetween('emitida_em', [$now->copy()->startOfYear(), $now->copy()->endOfYear()])
            ->selectRaw('DATE(emitida_em) as bucket, status, COUNT(*) as total, COALESCE(SUM(valor_servicos), 0) as valor')
            ->groupBy('bucket', 'status')
            ->get()
            ->map(fn ($row) => ['key' => (string) $row->bucket, 'status' => $row->status, 'n' => (int) $row->total, 'v' => (float) $row->valor])
            ->all();
    }

    /**
     * @return array<int, array{key: int, status: string, n: int, v: float}>
     */
    private function notasPorHora($query, Carbon $now): array
    {
        $hora = match (DB::connection()->getDriverName()) {
            'sqlite' => "CAST(strftime('%H', emitida_em) AS INTEGER)",
            'pgsql' => 'EXTRACT(HOUR FROM emitida_em)',
            default => 'HOUR(emitida_em)',
        };

        return $query
            ->whereBetween('emitida_em', [$now->copy()->startOfDay(), $now->copy()->endOfDay()])
            ->selectRaw("{$hora} as bucket, status, COUNT(*) as total, COALESCE(SUM(valor_servicos), 0) as valor")
            ->groupBy('bucket', 'status')
            ->get()
            ->map(fn ($row) => ['key' => (int) $row->bucket, 'status' => $row->status, 'n' => (int) $row->total, 'v' => (float) $row->valor])
            ->all();
    }

    private function filtrarDias(array $dias, Carbon $inicio, Carbon $fim): array
    {
        return array_values(array_filter(
            $dias,
            fn (array $row) => $row['key'] >= $inicio->format('Y-m-d') && $row['key'] <= $fim->format('Y-m-d')
        ));
    }

    private function agruparPorMes(array $dias): array
    {
        return array_map(fn (array $row) => [...$row, 'key' => substr($row['key'], 0, 7)], $dias);
    }

    /**
     * @param  array<int|string, string>  $buckets  bucket key => axis label
     * @param  array<int, array{key: int|string, status: string, n: int, v: float}>  $rows
     */
    private function periodo(string $rotulo, string $intervalo, array $buckets, array $rows): array
    {
        $posicao = array_flip(array_keys($buckets));
        $serie = array_fill_keys(NotaFiscal::STATUSES, array_fill(0, count($buckets), 0));
        $porStatus = array_fill_keys(NotaFiscal::STATUSES, 0);
        $valor = 0.0;

        foreach ($rows as $row) {
            if (! isset($posicao[$row['key']]) || ! isset($porStatus[$row['status']])) {
                continue;
            }

            $serie[$row['status']][$posicao[$row['key']]] += $row['n'];
            $porStatus[$row['status']] += $row['n'];

            if ($row['status'] === NotaFiscal::STATUS_AUTORIZADA) {
                $valor += $row['v'];
            }
        }

        $total = array_sum($porStatus);
        $decididas = $porStatus[NotaFiscal::STATUS_AUTORIZADA] + $porStatus[NotaFiscal::STATUS_REJEITADA];

        return [
            'rotulo' => $rotulo,
            'intervalo' => $intervalo,
            'total' => $total,
            'valor' => round($valor, 2),
            'por_status' => $porStatus,
            'taxa_rejeicao' => $decididas > 0 ? round($porStatus[NotaFiscal::STATUS_REJEITADA] / $decididas * 100, 1) : 0,
            'labels' => array_values($buckets),
            'serie' => $serie,
        ];
    }

    private function bucketsDoDia(): array
    {
        $buckets = [];
        foreach (range(0, 23) as $hora) {
            $buckets[$hora] = sprintf('%02dh', $hora);
        }

        return $buckets;
    }

    private function bucketsDaSemana(Carbon $now): array
    {
        $buckets = [];
        $dia = $now->copy()->startOfWeek();
        for ($i = 0; $i < 7; $i++, $dia->addDay()) {
            $buckets[$dia->format('Y-m-d')] = rtrim($dia->isoFormat('ddd'), '.');
        }

        return $buckets;
    }

    private function bucketsDoMes(Carbon $now): array
    {
        $buckets = [];
        $dia = $now->copy()->startOfMonth();
        for ($i = 0; $i < $now->daysInMonth; $i++, $dia->addDay()) {
            $buckets[$dia->format('Y-m-d')] = $dia->format('d');
        }

        return $buckets;
    }

    private function bucketsDoAno(Carbon $now): array
    {
        $buckets = [];
        $mes = $now->copy()->startOfYear();
        for ($i = 0; $i < 12; $i++, $mes->addMonth()) {
            $buckets[$mes->format('Y-m')] = rtrim($mes->isoFormat('MMM'), '.');
        }

        return $buckets;
    }

    private function intervaloSemana(Carbon $now): string
    {
        return $now->copy()->startOfWeek()->format('d/m').' a '.$now->copy()->endOfWeek()->format('d/m');
    }
}
