<?php

namespace App\Http\Controllers;

use App\Models\Emitente;
use App\Services\Nfse\CofreDeCertificados;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class EmitenteController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Emitente::class);

        $query = Emitente::query()->visibleTo($request->user());

        return Inertia::render('Fiscal/Emitentes/index', [
            'emitentes' => $query->orderBy('razao_social')->get()->map(fn (Emitente $emitente) => [
                ...$emitente->toArray(),
                'certificado_proximo_do_vencimento' => $emitente->certificadoProximoDoVencimento(),
                'tem_certificado' => filled($emitente->certificado_path),
            ]),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Emitente::class);

        $data = $this->validated($request);

        return $this->executar(
            fn () => Emitente::create($data),
            'Emitente cadastrado com sucesso.',
            'Não foi possível cadastrar o emitente. Tente novamente.'
        );
    }

    public function update(Request $request, Emitente $emitente)
    {
        $this->authorize('update', $emitente);

        $data = $this->validated($request, $emitente);

        return $this->executar(
            fn () => $emitente->update($data),
            'Emitente atualizado com sucesso.',
            'Não foi possível atualizar o emitente. Tente novamente.',
            ['emitente_id' => $emitente->id]
        );
    }

    public function destroy(Emitente $emitente, CofreDeCertificados $cofre)
    {
        $this->authorize('delete', $emitente);

        return $this->executar(function () use ($emitente, $cofre) {
            $caminho = $emitente->certificado_path;
            $emitente->delete();
            $cofre->apagar($caminho);
        }, 'Emitente excluído com sucesso.', 'Não foi possível excluir o emitente. Ele pode ter notas e lotes vinculados.', ['emitente_id' => $emitente->id]);
    }

    /** The A1 certificate is not part of this form: it is sent in Administração > Configurações. */
    private function validated(Request $request, ?Emitente $emitente = null): array
    {
        // Normalize before validating so a punctuated CNPJ is checked for uniqueness
        // against the same digits-only format it's stored in.
        $request->merge(['cnpj' => preg_replace('/\D/', '', (string) $request->input('cnpj'))]);

        return $request->validate([
            'razao_social' => ['required', 'string', 'max:200'],
            'nome_fantasia' => ['nullable', 'string', 'max:200'],
            'cnpj' => ['required', 'digits:14', Rule::unique('emitentes', 'cnpj')->ignore($emitente)],
            'inscricao_municipal' => ['nullable', 'string', 'max:30'],
            'codigo_municipio' => ['nullable', 'string', 'max:7'],
            'municipio' => ['nullable', 'string', 'max:150'],
            'uf' => ['nullable', 'string', 'size:2'],
            'cep' => ['nullable', 'string', 'max:8'],
            'logradouro' => ['nullable', 'string', 'max:200'],
            'numero' => ['nullable', 'string', 'max:20'],
            'complemento' => ['nullable', 'string', 'max:100'],
            'bairro' => ['nullable', 'string', 'max:100'],
            'email' => ['nullable', 'email', 'max:150'],
            'telefone' => ['nullable', 'string', 'max:20'],
            'regime_tributario' => ['nullable', 'string', 'max:30'],
            'ambiente' => ['required', Rule::in(['homologacao', 'producao'])],
            'driver' => ['required', Rule::in(['adn_nacional', 'prefeitura_legada', 'gateway', 'simulador'])],
            'driver_config' => ['nullable', 'array'],
            'rps_serie' => ['nullable', 'string', 'max:10'],
            'rps_numero_atual' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['required', 'boolean'],
        ]);
    }
}
