<?php

namespace App\Http\Controllers;

use App\Models\Emitente;
use App\Models\Recorrencia;
use App\Models\Tomador;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TomadorController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return Inertia::render('Fiscal/Tomadores/index', [
            'tomadores' => Tomador::query()->visibleTo($user)->with('emitente:id,razao_social')->orderBy('nome')->get()
                ->map(fn (Tomador $t) => [...$t->only(['id', 'emitente_id', 'documento', 'nome', 'email', 'cep', 'logradouro', 'numero', 'complemento', 'bairro', 'codigo_municipio']), 'emitente' => $t->emitente->razao_social]),
            'emitentes' => Emitente::query()->visibleTo($user)->active()->orderBy('razao_social')->get(['id', 'razao_social']),
        ]);
    }

    public function store(Request $request)
    {
        $dados = $this->validated($request);
        $this->autorizar($request, $dados['emitente_id']);

        return $this->executar(
            fn () => Tomador::create($dados),
            'Tomador cadastrado.',
            'Não foi possível cadastrar o tomador. Tente novamente.',
            ['emitente_id' => $dados['emitente_id']]
        );
    }

    public function update(Request $request, Tomador $tomador)
    {
        $this->autorizar($request, $tomador->emitente_id);
        $dados = $this->validated($request, $tomador);
        $this->autorizar($request, $dados['emitente_id']);

        return $this->executar(
            fn () => $tomador->update($dados),
            'Tomador atualizado.',
            'Não foi possível atualizar o tomador. Tente novamente.',
            ['tomador_id' => $tomador->id]
        );
    }

    public function destroy(Request $request, Tomador $tomador)
    {
        $this->autorizar($request, $tomador->emitente_id);
        if (Recorrencia::where('tomador_id', $tomador->id)->exists()) {
            return back()->with('error', 'Este tomador é usado por uma nota recorrente. Exclua ou troque a recorrência antes.');
        }

        return $this->executar(
            fn () => $tomador->delete(),
            'Tomador excluído.',
            'Não foi possível excluir o tomador. Tente novamente.',
            ['tomador_id' => $tomador->id]
        );
    }

    private function autorizar(Request $request, int|string $emitenteId): void
    {
        abort_unless($request->user()->canAccessEmitente(Emitente::findOrFail($emitenteId)), 403);
    }

    private function validated(Request $request, ?Tomador $tomador = null): array
    {
        // Before validating: a uniqueness error must not reveal records of an emitente the user cannot access.
        if ($request->filled('emitente_id') && ($alvo = Emitente::find($request->input('emitente_id')))) {
            abort_unless($request->user()->canAccessEmitente($alvo), 403);
        }

        // Digits only, so the same CPF/CNPJ typed with or without punctuation is one tomador.
        $request->merge([
            'documento' => preg_replace('/\D/', '', (string) $request->input('documento')),
            'cep' => preg_replace('/\D/', '', (string) $request->input('cep')),
            'codigo_municipio' => preg_replace('/\D/', '', (string) $request->input('codigo_municipio')),
        ]);

        $dados = $request->validate([
            'emitente_id' => ['required', 'integer', 'exists:emitentes,id'],
            'documento' => ['required', 'regex:/^(\d{11}|\d{14})$/', Rule::unique('tomadores', 'documento')->where('emitente_id', $request->input('emitente_id'))->ignore($tomador)],
            'nome' => ['required', 'string', 'max:300'],
            'email' => ['nullable', 'email', 'max:80'],
            'cep' => ['nullable', 'digits:8'],
            'logradouro' => ['nullable', 'string', 'max:255'],
            'numero' => ['nullable', 'string', 'max:60'],
            'complemento' => ['nullable', 'string', 'max:156'],
            'bairro' => ['nullable', 'string', 'max:60'],
            'codigo_municipio' => ['nullable', 'digits:7'],
        ], [
            'documento.regex' => 'Informe um CPF (11 dígitos) ou CNPJ (14 dígitos).',
            'documento.unique' => 'Este emitente já tem um tomador com este documento.',
        ]);

        return $dados;
    }
}
