<?php

namespace App\Http\Controllers;

use App\Models\Emitente;
use App\Models\Recorrencia;
use App\Models\Servico;
use App\Models\Setting;
use App\Models\Tomador;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class RecorrenciaController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return Inertia::render('Fiscal/Recorrencias/index', [
            'recorrencias' => Recorrencia::query()->visibleTo($user)->with('emitente:id,razao_social', 'tomador:id,nome', 'servico:id,nome')->orderBy('id')->get()
                ->map(fn (Recorrencia $r) => [
                    'id' => $r->id,
                    'emitente_id' => $r->emitente_id,
                    'emitente' => $r->emitente->razao_social,
                    'tomador_id' => $r->tomador_id,
                    'tomador' => $r->tomador->nome,
                    'servico_id' => $r->servico_id,
                    'servico' => $r->servico->nome,
                    'valor' => $r->valor,
                    'dia_do_mes' => $r->dia_do_mes,
                    'ambiente' => $r->ambiente,
                    'ativa' => $r->ativa,
                    'proxima_emissao' => $r->proxima_emissao->format('d/m/Y'),
                    'ultima_emissao_em' => $r->ultima_emissao_em?->format('d/m/Y H:i'),
                    'ultimo_lote_id' => $r->ultimo_lote_id,
                    'ultimo_erro' => $r->ultimo_erro,
                ]),
            'emitentes' => Emitente::query()->visibleTo($user)->active()->orderBy('razao_social')->get(['id', 'razao_social']),
            'tomadores' => Tomador::query()->visibleTo($user)->orderBy('nome')->get(['id', 'emitente_id', 'nome']),
            'servicos' => Servico::query()->visibleTo($user)->orderBy('nome')->get(['id', 'emitente_id', 'nome']),
            'permite_escolher_ambiente' => Setting::bool(Setting::ESCOLHER_AMBIENTE),
        ]);
    }

    public function store(Request $request)
    {
        $dados = $this->validated($request);
        $this->autorizar($request, $dados['emitente_id']);

        Recorrencia::create([
            ...$dados,
            'user_id' => $request->user()->id,
            'proxima_emissao' => Recorrencia::proximaData(now(), (int) $dados['dia_do_mes']),
        ]);

        return back()->with('success', 'Nota recorrente cadastrada.');
    }

    public function update(Request $request, Recorrencia $recorrencia)
    {
        $this->autorizar($request, $recorrencia->emitente_id);
        $dados = $this->validated($request);
        $this->autorizar($request, $dados['emitente_id']);

        // Changing the day or resuming a paused one reschedules from today, never into the past.
        if ((int) $dados['dia_do_mes'] !== $recorrencia->dia_do_mes || (! $recorrencia->ativa && $dados['ativa'])) {
            $dados['proxima_emissao'] = Recorrencia::proximaData(now(), (int) $dados['dia_do_mes']);
        }

        $recorrencia->update($dados);

        return back()->with('success', 'Nota recorrente atualizada.');
    }

    public function destroy(Request $request, Recorrencia $recorrencia)
    {
        $this->autorizar($request, $recorrencia->emitente_id);
        $recorrencia->delete();

        return back()->with('success', 'Nota recorrente excluída. As notas já emitidas não mudam.');
    }

    private function autorizar(Request $request, int|string $emitenteId): void
    {
        abort_unless($request->user()->canAccessEmitente(Emitente::findOrFail($emitenteId)), 403);
    }

    private function validated(Request $request): array
    {
        if ($request->filled('emitente_id') && ($alvo = Emitente::find($request->input('emitente_id')))) {
            abort_unless($request->user()->canAccessEmitente($alvo), 403);
        }

        if (is_string($request->input('valor'))) {
            $valor = trim($request->input('valor'));
            $request->merge(['valor' => str_contains($valor, ',') ? str_replace(',', '.', str_replace('.', '', $valor)) : $valor]);
        }

        $emitenteId = $request->input('emitente_id');

        $dados = $request->validate([
            'emitente_id' => ['required', 'integer', 'exists:emitentes,id'],
            // The tomador and the service must belong to the same emitente as the recurrence.
            'tomador_id' => ['required', 'integer', Rule::exists('tomadores', 'id')->where('emitente_id', $emitenteId)],
            'servico_id' => ['required', 'integer', Rule::exists('servicos', 'id')->where('emitente_id', $emitenteId)],
            'valor' => ['required', 'numeric', 'gt:0', 'max:999999999999'],
            'dia_do_mes' => ['required', 'integer', 'between:1,28'],
            'ambiente' => ['nullable', Rule::in(['homologacao', 'producao'])],
            'ativa' => ['required', 'boolean'],
        ], [
            'tomador_id.exists' => 'Escolha um tomador deste emitente.',
            'servico_id.exists' => 'Escolha um serviço deste emitente.',
            'dia_do_mes.between' => 'Escolha um dia entre 1 e 28, para que todo mês tenha esse dia.',
            'valor.gt' => 'O valor precisa ser maior que zero.',
        ]);

        // Only the Administrador's switch lets a recurrence be saved for produção.
        $dados['ambiente'] = Setting::bool(Setting::ESCOLHER_AMBIENTE) ? ($dados['ambiente'] ?? 'homologacao') : 'homologacao';

        return $dados;
    }
}
