<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessarLoteJob;
use App\Models\Emitente;
use App\Models\Lote;
use App\Models\Servico;
use App\Models\Setting;
use App\Models\Tomador;
use App\Services\Nfse\LoteImporter;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
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
                'ambiente' => $lote->ambiente,
            ]);

        return Inertia::render('Fiscal/Lotes/index', [
            'lotes' => $lotes,
            'emitentes' => Emitente::query()
                ->visibleTo($user)
                ->active()
                ->orderBy('razao_social')
                ->get(['id', 'razao_social', 'cnpj', 'ambiente']),
            'permite_escolher_ambiente' => Setting::bool(Setting::ESCOLHER_AMBIENTE),
        ]);
    }

    /**
     * Environment the lote is issued in. Only while the Administrador has the option
     * switched on can the user choose; switched off, everything is homologação.
     */
    private function ambienteDoLote(Request $request): string
    {
        if (! Setting::bool(Setting::ESCOLHER_AMBIENTE)) {
            return 'homologacao';
        }

        return $request->input('ambiente') ?: 'homologacao';
    }

    public function store(Request $request, LoteImporter $importer)
    {
        $request->validate([
            'ambiente' => ['nullable', Rule::in(['homologacao', 'producao'])],
            'emitente_id' => ['required', 'integer', 'exists:emitentes,id'],
            'arquivo' => ['required', 'file', 'extensions:csv,txt,xlsx', 'max:5120'],
        ], [
            'arquivo.extensions' => 'Envie um arquivo CSV ou Excel (.xlsx).',
            'arquivo.max' => 'O arquivo pode ter no máximo 5 MB.',
        ]);

        $emitente = Emitente::findOrFail($request->input('emitente_id'));

        abort_unless($request->user()->canAccessEmitente($emitente), 403);

        if (! $emitente->is_active) {
            return back()->withErrors(['emitente_id' => 'Este emitente está inativo.']);
        }

        $arquivo = $request->file('arquivo');
        $lote = $importer->importar($emitente, $request->user(), (string) file_get_contents($arquivo->getRealPath()), $arquivo->getClientOriginalName(), $this->ambienteDoLote($request));

        ProcessarLoteJob::dispatch($lote);

        return redirect()->route('lotes.show', $lote)->with('success', 'Lote enviado para processamento.');
    }

    /** Dry run of an upload: JSON with what would be accepted and the problems per line. */
    public function previa(Request $request, LoteImporter $importer)
    {
        $request->validate([
            'emitente_id' => ['required', 'integer', 'exists:emitentes,id'],
            'arquivo' => ['required', 'file', 'extensions:csv,txt,xlsx', 'max:5120'],
        ], [
            'arquivo.extensions' => 'Envie um arquivo CSV ou Excel (.xlsx).',
            'arquivo.max' => 'O arquivo pode ter no máximo 5 MB.',
        ]);

        abort_unless($request->user()->canAccessEmitente(Emitente::findOrFail($request->input('emitente_id'))), 403);

        return response()->json($importer->previa((string) file_get_contents($request->file('arquivo')->getRealPath())));
    }

    public function rejeitadas(Request $request, Lote $lote, LoteImporter $importer)
    {
        abort_unless($request->user()->canAccessEmitente($lote->emitente), 403);

        if ($request->query('formato') === 'xlsx') {
            $caminho = tempnam(sys_get_temp_dir(), 'rej');
            $importer->xlsxDasRejeitadas($lote, $caminho);

            return response()->download($caminho, 'rejeitadas-lote-'.$lote->id.'.xlsx')->deleteFileAfterSend();
        }

        return response()->streamDownload(
            fn () => print($importer->csvDasRejeitadas($lote)),
            'rejeitadas-lote-'.$lote->id.'.csv',
            ['Content-Type' => 'text/csv; charset=UTF-8']
        );
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
                'ambiente' => $lote->ambiente,
            ],
            'notas' => $notas,
        ]);
    }

    public function emitir(Request $request)
    {
        return Inertia::render('Fiscal/Lotes/emitir', [
            'emitentes' => Emitente::query()
                ->visibleTo($request->user())
                ->active()
                ->orderBy('razao_social')
                ->get(['id', 'razao_social', 'cnpj', 'driver', 'ambiente']),
            'tomadores' => Tomador::query()->visibleTo($request->user())->orderBy('nome')->get(),
            'servicos' => Servico::query()->visibleTo($request->user())->orderBy('nome')->get(),
            'permite_escolher_ambiente' => Setting::bool(Setting::ESCOLHER_AMBIENTE),
        ]);
    }

    public function emitirStore(Request $request, LoteImporter $importer)
    {
        $dados = $request->validate(self::regrasDaNota());

        $emitente = Emitente::findOrFail($dados['emitente_id']);

        abort_unless($request->user()->canAccessEmitente($emitente), 403);

        if (! $emitente->is_active) {
            return back()->withErrors(['emitente_id' => 'Este emitente está inativo.']);
        }

        $linha = [
            ...collect($dados)->except(['emitente_id', 'iss_retido', 'ambiente'])->map(fn ($valor) => (string) $valor)->all(),
            'iss_retido' => ! empty($dados['iss_retido']) ? '1' : '0',
        ];

        [, $erros] = $importer->normalizar($linha);
        if ($erros) {
            return back()->withErrors(['nota' => $erros])->withInput();
        }

        $lote = $importer->importarLinha($emitente, $request->user(), $linha, ambiente: $this->ambienteDoLote($request));

        try {
            ProcessarLoteJob::dispatchSync($lote);
        } catch (\Throwable $e) {
            // The lote is saved and its notas stay pending: the user lands on it instead of on an error page.
            report($e);

            return redirect()->route('lotes.show', $lote)->with('error', 'A nota foi recebida, mas o processamento falhou. Veja a situação abaixo e tente consultar de novo.');
        }

        $lote->refresh();

        return redirect()->route('lotes.show', $lote)->with(
            $lote->status === Lote::STATUS_CONCLUIDO_COM_ERROS ? 'error' : 'success',
            match ($lote->status) {
                Lote::STATUS_CONCLUIDO => 'Nota processada.',
                Lote::STATUS_AGUARDANDO_TRANSMISSAO => 'DPS gerada e validada; a transmissão ainda não está disponível para o driver deste emitente.',
                default => 'A nota foi rejeitada; veja os motivos abaixo.',
            }
        );
    }

    /**
     * Validation of one nota typed on a form (single emission and substitution share it).
     *
     * @return array<string, array<int, mixed>>
     */
    public static function regrasDaNota(): array
    {
        return [
            'ambiente' => ['nullable', Rule::in(['homologacao', 'producao'])],
            'emitente_id' => ['required', 'integer', 'exists:emitentes,id'],
            'tomador_documento' => ['required', 'string', 'max:20'],
            'tomador_nome' => ['required', 'string', 'max:300'],
            'tomador_email' => ['nullable', 'email', 'max:80'],
            'ibscbs_codigo_operacao' => ['nullable', 'string', 'max:10'],
            'ibscbs_cst' => ['nullable', 'string', 'max:10'],
            'ibscbs_classificacao' => ['nullable', 'string', 'max:10'],
            'tomador_cep' => ['nullable', 'string', 'max:10'],
            'tomador_logradouro' => ['nullable', 'string', 'max:255'],
            'tomador_numero' => ['nullable', 'string', 'max:60'],
            'tomador_complemento' => ['nullable', 'string', 'max:156'],
            'tomador_bairro' => ['nullable', 'string', 'max:60'],
            'tomador_codigo_municipio' => ['nullable', 'string', 'max:10'],
            'descricao_servico' => ['required', 'string', 'max:2000'],
            'codigo_tributacao_nacional' => ['required', 'string', 'max:10'],
            'valor_servico' => ['required', 'string', 'max:20'],
            'aliquota_iss' => ['nullable', 'string', 'max:10'],
            'iss_retido' => ['boolean'],
            'data_competencia' => ['nullable', 'string', 'max:10'],
        ];
    }

    public function modelo(Request $request)
    {
        if ($request->query('formato') === 'xlsx') {
            $caminho = tempnam(sys_get_temp_dir(), 'modelo');
            LoteImporter::gerarModeloXlsx($caminho);

            return response()->download($caminho, 'modelo-lote-nfse.xlsx')->deleteFileAfterSend();
        }

        return response(LoteImporter::modeloCsv(), 200, [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="modelo-lote-nfse.csv"',
        ]);
    }
}
