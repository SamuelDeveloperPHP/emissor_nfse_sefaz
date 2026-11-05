<?php

namespace App\Http\Controllers;

use App\Models\Emitente;
use App\Models\Servico;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServicoController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return Inertia::render('Fiscal/Servicos/index', [
            'servicos' => Servico::query()->visibleTo($user)->with('emitente:id,razao_social')->orderBy('nome')->get()
                ->map(fn (Servico $s) => [...$s->only(['id', 'emitente_id', 'nome', 'descricao', 'codigo_tributacao', 'aliquota', 'iss_retido']), 'emitente' => $s->emitente->razao_social]),
            'emitentes' => Emitente::query()->visibleTo($user)->active()->orderBy('razao_social')->get(['id', 'razao_social']),
        ]);
    }

    public function store(Request $request)
    {
        $dados = $this->validated($request);
        $this->autorizar($request, $dados['emitente_id']);

        Servico::create($dados);

        return back()->with('success', 'Serviço cadastrado.');
    }

    public function update(Request $request, Servico $servico)
    {
        $this->autorizar($request, $servico->emitente_id);
        $dados = $this->validated($request);
        $this->autorizar($request, $dados['emitente_id']);

        $servico->update($dados);

        return back()->with('success', 'Serviço atualizado.');
    }

    public function destroy(Request $request, Servico $servico)
    {
        $this->autorizar($request, $servico->emitente_id);
        $servico->delete();

        return back()->with('success', 'Serviço excluído.');
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

        $request->merge(['codigo_tributacao' => preg_replace('/\D/', '', (string) $request->input('codigo_tributacao'))]);

        if (is_string($request->input('aliquota'))) {
            $request->merge(['aliquota' => str_replace(',', '.', $request->input('aliquota')) ?: null]);
        }

        return $request->validate([
            'emitente_id' => ['required', 'integer', 'exists:emitentes,id'],
            'nome' => ['required', 'string', 'max:120'],
            'descricao' => ['required', 'string', 'max:2000'],
            'codigo_tributacao' => ['required', 'digits:6'],
            'aliquota' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'iss_retido' => ['required', 'boolean'],
        ], [
            'codigo_tributacao.digits' => 'O código de tributação nacional tem 6 dígitos.',
        ]);
    }
}
