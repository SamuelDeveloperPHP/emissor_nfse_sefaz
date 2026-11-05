<?php

namespace App\Http\Controllers;

use App\Models\Emitente;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index(Request $request)
    {
        $hoje = now()->startOfDay();

        return Inertia::render('Admin/Configuracoes/index', [
            'escolher_ambiente' => Setting::bool(Setting::ESCOLHER_AMBIENTE),
            // Only what the screen needs: never the file path, the fingerprint in full or the password.
            'certificados' => Emitente::query()
                ->visibleTo($request->user())
                ->with('certificadoEnviadoPor:id,name')
                ->orderBy('razao_social')
                ->get()
                ->map(fn (Emitente $e) => [
                    'id' => $e->id,
                    'razao_social' => $e->razao_social,
                    'cnpj' => $e->cnpj,
                    'is_active' => $e->is_active,
                    'driver' => $e->driver,
                    'tem_certificado' => filled($e->certificado_path),
                    'validade' => $e->certificado_validade?->format('d/m/Y'),
                    'dias' => $e->certificado_validade ? (int) $hoje->diffInDays($e->certificado_validade->copy()->startOfDay(), false) : null,
                    'titular' => $e->certificado_titular,
                    'cnpj_certificado' => $e->certificado_cnpj,
                    'enviado_em' => $e->certificado_enviado_em?->format('d/m/Y H:i'),
                    'enviado_por' => $e->certificadoEnviadoPor?->name,
                    'impressao' => $e->certificado_impressao ? strtoupper(substr($e->certificado_impressao, 0, 16)) : null,
                ]),
        ]);
    }

    public function update(Request $request)
    {
        $dados = $request->validate([
            'escolher_ambiente' => ['required', 'boolean'],
        ]);

        return $this->executar(
            fn () => Setting::putBool(Setting::ESCOLHER_AMBIENTE, (bool) $dados['escolher_ambiente']),
            'Configurações salvas.',
            'Não foi possível salvar as configurações. Tente novamente.'
        );
    }
}
