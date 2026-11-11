<?php

namespace App\Http\Controllers;

use App\Models\Emitente;
use App\Services\Nfse\CofreDeCertificados;
use App\Support\Cnpj;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
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

    public function consultarCnpj(Request $request, string $cnpj): JsonResponse
    {
        $this->authorize('viewAny', Emitente::class);

        $cnpj = Cnpj::sanitizar($cnpj);

        abort_unless(Cnpj::valido($cnpj), 422, 'Informe um CNPJ válido para realizar a consulta.');

        $resposta = Http::acceptJson()->timeout(8)->get("https://brasilapi.com.br/api/cnpj/v1/{$cnpj}");

        if ($resposta->status() === 404) {
            return response()->json(['message' => 'CNPJ não localizado na base pública. Preencha os dados manualmente.'], 404);
        }

        if (! $resposta->successful()) {
            return response()->json(['message' => 'A consulta pública de CNPJ está indisponível no momento.'], 503);
        }

        $dados = $resposta->json();

        return response()->json([
            'razao_social' => $dados['razao_social'] ?? '',
            'nome_fantasia' => $dados['nome_fantasia'] ?? '',
            'cep' => preg_replace('/\D/', '', (string) ($dados['cep'] ?? '')),
            'logradouro' => filled($dados['descricao_tipo_de_logradouro'] ?? null)
                ? trim(($dados['descricao_tipo_de_logradouro'] ?? '').' '.($dados['logradouro'] ?? ''))
                : ($dados['logradouro'] ?? ''),
            'numero' => $dados['numero'] ?? '',
            'complemento' => $dados['complemento'] ?? '',
            'bairro' => $dados['bairro'] ?? '',
            'municipio' => $dados['municipio'] ?? '',
            'uf' => $dados['uf'] ?? '',
            'email' => $dados['email'] ?? '',
            'telefone' => preg_replace('/\D/', '', (string) ($dados['ddd_telefone_1'] ?? '')),
        ]);
    }

    /** The A1 file is not part of this form (it is sent in Administração > Configurações); only whether the emitente uses its own certificate or the office's under a procuração. */
    private function validated(Request $request, ?Emitente $emitente = null): array
    {
        $texto = fn (string $campo, int $maximo) => mb_substr(trim(preg_replace('/[\x00-\x1F\x7F]/u', '', (string) $request->input($campo)) ?? ''), 0, $maximo);
        $request->merge([
            'razao_social' => $texto('razao_social', 200),
            'nome_fantasia' => $texto('nome_fantasia', 200),
            'cnpj' => Cnpj::sanitizar($request->input('cnpj')),
            'inscricao_municipal' => mb_substr(preg_replace('/[^A-Z0-9.\/-]/', '', mb_strtoupper((string) $request->input('inscricao_municipal'))) ?? '', 0, 30),
            'codigo_municipio' => substr(preg_replace('/\D/', '', (string) $request->input('codigo_municipio')) ?? '', 0, 7),
            'municipio' => $texto('municipio', 150),
            'uf' => substr(preg_replace('/[^A-Z]/', '', mb_strtoupper((string) $request->input('uf'))) ?? '', 0, 2),
            'cep' => substr(preg_replace('/\D/', '', (string) $request->input('cep')) ?? '', 0, 8),
            'logradouro' => $texto('logradouro', 200),
            'numero' => mb_substr(preg_replace('/[^A-Z0-9.\/-]/', '', mb_strtoupper((string) $request->input('numero'))) ?? '', 0, 20),
            'complemento' => $texto('complemento', 100),
            'bairro' => $texto('bairro', 100),
            'email' => mb_strtolower(trim((string) $request->input('email'))),
            'telefone' => substr(preg_replace('/\D/', '', (string) $request->input('telefone')) ?? '', 0, 11),
            'ambiente' => 'homologacao',
        ]);

        return $request->validate([
            'razao_social' => ['required', 'string', 'max:200'],
            'nome_fantasia' => ['nullable', 'string', 'max:200'],
            'cnpj' => ['required', 'regex:/^[A-Z0-9]{12}[0-9]{2}$/', function ($attribute, $value, $fail) {
                if (! Cnpj::valido($value)) {
                    $fail('Informe um CNPJ válido, numérico ou alfanumérico.');
                }
            }, Rule::unique('emitentes', 'cnpj')->ignore($emitente)],
            'inscricao_municipal' => ['nullable', 'string', 'max:30'],
            'codigo_municipio' => ['nullable', 'string', 'max:7'],
            'municipio' => ['nullable', 'string', 'max:150'],
            'uf' => ['nullable', 'string', 'size:2'],
            'cep' => ['nullable', 'regex:/^\d{8}$/'],
            'logradouro' => ['nullable', 'string', 'max:200'],
            'numero' => ['nullable', 'string', 'max:20'],
            'complemento' => ['nullable', 'string', 'max:100'],
            'bairro' => ['nullable', 'string', 'max:100'],
            'email' => ['nullable', 'email', 'max:150'],
            'telefone' => ['nullable', 'regex:/^\d{10,11}$/'],
            'regime_tributario' => ['nullable', 'string', 'max:30'],
            'ambiente' => ['required', Rule::in(['homologacao', 'producao'])],
            'driver' => ['required', Rule::in(['adn_nacional', 'prefeitura_legada', 'gateway', 'simulador'])],
            'driver_config' => ['nullable', 'array'],
            'modo_certificado' => ['sometimes', 'required', Rule::in(Emitente::MODOS_CERTIFICADO)],
            'rps_serie' => ['nullable', 'string', 'max:10'],
            'rps_numero_atual' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['required', 'boolean'],
        ], [
            'cnpj.regex' => 'O CNPJ deve ter 14 posições: letras e números nas 12 primeiras e números nas 2 últimas.',
            'cep.regex' => 'Informe um CEP válido com 8 números.',
            'telefone.regex' => 'Informe um telefone válido com DDD e 10 ou 11 números.',
        ]);
    }
}
