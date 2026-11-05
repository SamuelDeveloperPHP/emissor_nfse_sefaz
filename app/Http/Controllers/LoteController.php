<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessarLoteJob;
use App\Models\Emitente;
use App\Models\Lote;
use App\Services\Nfse\LoteImporter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoteController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $lotes = Lote::query()
            ->visibleTo($user)
            ->with('emitente:id,razao_social,driver')
            ->latest()
            ->limit(100)
            ->get()
            ->map(fn (Lote $lote) => [
                'id' => $lote->id,
                'arquivo' => $lote->arquivo,
                'status' => $lote->status,
                'total' => $lote->total,
                'emitente' => $lote->emitente->razao_social,
                'driver' => $lote->emitente->driver,
                'created_at' => $lote->created_at->format('d/m/Y H:i'),
                'por_status' => $lote->contagemPorStatus(),
            ]);

        return Inertia::render('Fiscal/Lotes/index', [
            'lotes' => $lotes,
            'emitentes' => Emitente::query()
                ->visibleTo($user)
                ->active()
                ->orderBy('razao_social')
                ->get(['id', 'razao_social', 'cnpj']),
        ]);
    }

    public function store(Request $request, LoteImporter $importer)
    {
        $request->validate([
            'emitente_id' => ['required', 'integer', 'exists:emitentes,id'],
            'arquivo' => ['required', 'file', 'mimes:csv,txt', 'max:5120'],
        ], [
            'arquivo.mimes' => 'Envie um arquivo CSV.',
            'arquivo.max' => 'O arquivo pode ter no máximo 5 MB.',
        ]);

        $emitente = Emitente::findOrFail($request->input('emitente_id'));

        abort_unless($request->user()->canAccessEmitente($emitente), 403);

        if (! $emitente->is_active) {
            return back()->withErrors(['emitente_id' => 'Este emitente está inativo.']);
        }

        $arquivo = $request->file('arquivo');
        $lote = $importer->importar($emitente, $request->user(), (string) file_get_contents($arquivo->getRealPath()), $arquivo->getClientOriginalName());

        ProcessarLoteJob::dispatch($lote);

        return redirect()->route('lotes.show', $lote)->with('success', 'Lote enviado para processamento.');
    }

    public function show(Request $request, Lote $lote)
    {
        abort_unless($request->user()->canAccessEmitente($lote->emitente), 403);

        $notas = $lote->notas()
            ->orderBy('linha')
            ->paginate(50)
            ->through(fn ($nota) => [
                'id' => $nota->id,
                'linha' => $nota->linha,
                'numero' => $nota->numero,
                'status' => $nota->status,
                'valor' => $nota->valor_servicos,
                'tomador' => $nota->payload['tomador_nome'] ?? null,
                'erros' => $nota->erros ?? [],
            ]);

        return Inertia::render('Fiscal/Lotes/show', [
            'lote' => [
                'id' => $lote->id,
                'arquivo' => $lote->arquivo,
                'status' => $lote->status,
                'total' => $lote->total,
                'emitente' => $lote->emitente->razao_social,
                'driver' => $lote->emitente->driver,
                'created_at' => $lote->created_at->format('d/m/Y H:i'),
                'por_status' => $lote->contagemPorStatus(),
            ],
            'notas' => $notas,
        ]);
    }

    public function modelo()
    {
        return response(LoteImporter::modeloCsv(), 200, [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="modelo-lote-nfse.csv"',
        ]);
    }
}
