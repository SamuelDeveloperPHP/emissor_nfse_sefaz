<?php

namespace App\Http\Controllers;

use App\Models\Emitente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class EmitenteController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Emitente::class);

        $query = Emitente::query();

        if (! $request->user()->all_emitentes) {
            $query->whereRelation('users', 'users.id', $request->user()->id);
        }

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
        $data = $this->handleCertificado($request, $data);

        Emitente::create($data);

        return back()->with('success', 'Emitente cadastrado com sucesso.');
    }

    public function update(Request $request, Emitente $emitente)
    {
        $this->authorize('update', $emitente);

        $data = $this->validated($request, $emitente);
        $data = $this->handleCertificado($request, $data, $emitente);

        $emitente->update($data);

        return back()->with('success', 'Emitente atualizado com sucesso.');
    }

    public function destroy(Emitente $emitente)
    {
        $this->authorize('delete', $emitente);

        if ($emitente->certificado_path) {
            Storage::disk('local')->delete($emitente->certificado_path);
        }

        $emitente->delete();

        return back()->with('success', 'Emitente excluído com sucesso.');
    }

    private function validated(Request $request, ?Emitente $emitente = null): array
    {
        // Normalize before validating so a punctuated CNPJ is checked for uniqueness
        // against the same digits-only format it's stored in.
        $request->merge(['cnpj' => preg_replace('/\D/', '', (string) $request->input('cnpj'))]);

        $data = $request->validate([
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
            'driver' => ['required', Rule::in(['adn_nacional', 'prefeitura_legada', 'gateway'])],
            'driver_config' => ['nullable', 'array'],
            'certificado' => ['nullable', 'file', 'max:4096', 'mimes:pfx,p12'],
            'certificado_password' => ['nullable', 'string'],
            'certificado_validade' => ['nullable', 'date'],
            'rps_serie' => ['nullable', 'string', 'max:10'],
            'rps_numero_atual' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['required', 'boolean'],
        ]);

        return $data;
    }

    private function handleCertificado(Request $request, array $data, ?Emitente $emitente = null): array
    {
        if ($request->hasFile('certificado')) {
            if ($emitente?->certificado_path) {
                Storage::disk('local')->delete($emitente->certificado_path);
            }

            $data['certificado_path'] = $request->file('certificado')->store('certificados');
        }

        unset($data['certificado']);

        if (blank($data['certificado_password'] ?? null)) {
            unset($data['certificado_password']);
        }

        return $data;
    }
}
