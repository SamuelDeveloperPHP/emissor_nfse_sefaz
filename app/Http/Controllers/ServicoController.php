<?php

namespace App\Http\Controllers;

use App\Models\Emitente;
use App\Models\Recorrencia;
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
                ->map(fn (Servico $s) => [...$s->only(['id', 'emitente_id', 'nome', 'descricao', 'codigo_tributacao', 'aliquota', 'iss_retido', 'ibscbs_codigo_operacao', 'ibscbs_cst', 'ibscbs_classificacao']), 'emitente' => $s->emitente->razao_social]),
            'emitentes' => Emitente::query()->visibleTo($user)->active()->orderBy('razao_social')->get(['id', 'razao_social']),
        ]);
    }

    public function store(Request $request)
    {
        $dados = $this->validated($request);
        $this->autorizar($request, $dados['emitente_id']);

        return $this->executar(
            fn () => Servico::create($dados),
            'Serviço cadastrado.',
            'Não foi possível cadastrar o serviço. Tente novamente.',
            ['emitente_id' => $dados['emitente_id']]
        );
    }

    public function update(Request $request, Servico $servico)
    {
        $this->autorizar($request, $servico->emitente_id);
        $dados = $this->validated($request);
        $this->autorizar($request, $dados['emitente_id']);

        return $this->executar(
            fn () => $servico->update($dados),
            'Serviço atualizado.',
            'Não foi possível atualizar o serviço. Tente novamente.',
            ['servico_id' => $servico->id]
        );
    }

    public function destroy(Request $request, Servico $servico)
    {
        $this->autorizar($request, $servico->emitente_id);
        if (Recorrencia::where('servico_id', $servico->id)->exists()) {
            return back()->with('error', 'Este serviço é usado por uma nota recorrente. Exclua ou troque a recorrência antes.');
        }

        return $this->executar(
            fn () => $servico->delete(),
            'Serviço excluído.',
            'Não foi possível excluir o serviço. Tente novamente.',
            ['servico_id' => $servico->id]
        );
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

        $request->merge([
            'codigo_tributacao' => preg_replace('/\D/', '', (string) $request->input('codigo_tributacao')),
            'ibscbs_codigo_operacao' => preg_replace('/\D/', '', (string) $request->input('ibscbs_codigo_operacao')) ?: null,
            'ibscbs_cst' => preg_replace('/\D/', '', (string) $request->input('ibscbs_cst')) ?: null,
            'ibscbs_classificacao' => preg_replace('/\D/', '', (string) $request->input('ibscbs_classificacao')) ?: null,
        ]);

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
            // All three or none: the DPS carries the IBS/CBS group only when it is complete.
            'ibscbs_codigo_operacao' => ['nullable', 'digits:6', 'required_with:ibscbs_cst,ibscbs_classificacao'],
            'ibscbs_cst' => ['nullable', 'digits:3', 'required_with:ibscbs_codigo_operacao,ibscbs_classificacao'],
            'ibscbs_classificacao' => ['nullable', 'digits:6', 'required_with:ibscbs_codigo_operacao,ibscbs_cst'],
        ], [
            'ibscbs_codigo_operacao.required_with' => 'Informe os três códigos do IBS/CBS, ou deixe os três em branco.',
            'ibscbs_cst.required_with' => 'Informe os três códigos do IBS/CBS, ou deixe os três em branco.',
            'ibscbs_classificacao.required_with' => 'Informe os três códigos do IBS/CBS, ou deixe os três em branco.',
            'ibscbs_codigo_operacao.digits' => 'O indicador de operação tem 6 dígitos.',
            'ibscbs_cst.digits' => 'O CST tem 3 dígitos.',
            'ibscbs_classificacao.digits' => 'A classificação tributária tem 6 dígitos.',
            'codigo_tributacao.digits' => 'O código de tributação nacional tem 6 dígitos.',
        ]);
    }
}
