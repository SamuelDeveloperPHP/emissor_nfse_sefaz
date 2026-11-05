<?php

namespace App\Http\Controllers;

use App\Models\Emitente;
use App\Services\Nfse\Fechamento;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class FechamentoController extends Controller
{
    public function index(Request $request, Fechamento $fechamento)
    {
        [$mes, $emitenteId, $ambiente] = $this->filtros($request);
        $user = $request->user();

        return Inertia::render('Fiscal/Fechamento/index', [
            'filtros' => ['mes' => $mes, 'emitente_id' => $emitenteId ? (string) $emitenteId : '', 'ambiente' => $ambiente],
            'emitentes' => Emitente::query()->visibleTo($user)->where('driver', '!=', 'simulador')->orderBy('razao_social')->get(['id', 'razao_social']),
            'resumo' => $fechamento->resumo($fechamento->consulta($user, $mes, $emitenteId, $ambiente)),
        ]);
    }

    public function excel(Request $request, Fechamento $fechamento)
    {
        [$mes, $emitenteId, $ambiente] = $this->filtros($request);
        $consulta = $fechamento->consulta($request->user(), $mes, $emitenteId, $ambiente);

        if (! $fechamento->resumo(clone $consulta)['tem_notas']) {
            return back()->with('error', 'Não há notas neste período para exportar.');
        }

        $caminho = tempnam(sys_get_temp_dir(), 'fech');
        $fechamento->planilha($consulta, $caminho, $mes);

        return response()->download($caminho, "fechamento-{$mes}.xlsx", ['Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'])->deleteFileAfterSend(true);
    }

    public function zip(Request $request, Fechamento $fechamento)
    {
        [$mes, $emitenteId, $ambiente] = $this->filtros($request);
        $consulta = $fechamento->consulta($request->user(), $mes, $emitenteId, $ambiente);

        $caminho = tempnam(sys_get_temp_dir(), 'fech');
        $arquivos = $fechamento->zip($consulta, $caminho);

        if ($arquivos === 0) {
            @unlink($caminho);

            return back()->with('error', 'Não há XMLs de NFS-e neste período para baixar.');
        }

        return response()->download($caminho, "xmls-{$mes}.zip", ['Content-Type' => 'application/zip'])->deleteFileAfterSend(true);
    }

    /** @return array{0: string, 1: ?int, 2: string} month, emitente, environment */
    private function filtros(Request $request): array
    {
        $dados = $request->validate([
            'mes' => ['nullable', 'regex:/^\d{4}-(0[1-9]|1[0-2])$/'],
            'emitente_id' => ['nullable', 'integer'],
            'ambiente' => ['nullable', Rule::in(['producao', 'homologacao'])],
        ]);

        return [$dados['mes'] ?? now()->format('Y-m'), isset($dados['emitente_id']) ? (int) $dados['emitente_id'] : null, $dados['ambiente'] ?? 'producao'];
    }
}
