<?php

namespace App\Http\Controllers;

use App\Models\Emitente;
use App\Services\Nfse\GestaoDeCertificado;
use App\Services\Nfse\NfseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * Administração > Configurações > Certificados digitais. Administrador only (route middleware).
 *
 * The request carries the .pfx and its password: neither is ever written to the logs, returned to
 * the browser or flashed back into the form (see Handler::$dontFlash).
 */
class CertificadoController extends Controller
{
    public function store(Request $request, Emitente $emitente, GestaoDeCertificado $certificados)
    {
        $this->autorizar($request, $emitente);

        $request->validate([
            'certificado' => ['required', 'file', 'max:256', 'extensions:pfx,p12'],
            'certificado_senha' => ['required', 'string', 'max:200'],
        ], [
            'certificado.required' => 'Escolha o arquivo do certificado (.pfx ou .p12).',
            'certificado.extensions' => 'O certificado precisa ser um arquivo .pfx ou .p12.',
            'certificado.max' => 'O arquivo é grande demais para ser um certificado A1.',
            'certificado_senha.required' => 'Informe a senha do certificado.',
        ]);

        try {
            $resultado = $certificados->enviar(
                $emitente,
                (string) file_get_contents($request->file('certificado')->getRealPath()),
                (string) $request->input('certificado_senha'),
                $request->user()
            );
        } catch (NfseException $e) {
            return back()->with('error', $e->getMessage());
        } catch (Throwable $e) {
            return $this->falha($e, 'Não foi possível guardar o certificado. Tente novamente.', $emitente, $request);
        }

        $validade = date('d/m/Y', strtotime($resultado['valido_ate']));

        if ($resultado['avisos']) {
            return back()->with('warning', 'Certificado guardado (válido até '.$validade.'), mas atenção: '.implode(' ', $resultado['avisos']));
        }

        return back()->with('success', 'Certificado guardado. Válido até '.$validade.'.');
    }

    public function destroy(Request $request, Emitente $emitente, GestaoDeCertificado $certificados)
    {
        $this->autorizar($request, $emitente);

        try {
            $certificados->remover($emitente, $request->user());
        } catch (Throwable $e) {
            return $this->falha($e, 'Não foi possível remover o certificado. Tente novamente.', $emitente, $request);
        }

        return back()->with('success', 'Certificado removido. Este emitente não consegue mais emitir notas reais até receber outro.');
    }

    /** Opens the stored certificate the way an emission would, without sending anything to the ADN. */
    public function testar(Request $request, Emitente $emitente, GestaoDeCertificado $certificados)
    {
        $this->autorizar($request, $emitente);

        try {
            $certificado = $certificados->testar($emitente);
        } catch (NfseException $e) {
            return back()->with('error', $e->getMessage());
        } catch (Throwable $e) {
            return $this->falha($e, 'Não foi possível testar o certificado agora. Tente novamente.', $emitente, $request);
        }

        return back()->with('success', 'Certificado em ordem: abre com a senha cadastrada e vale até '.$certificado->validoAte->format('d/m/Y').'.');
    }

    private function autorizar(Request $request, Emitente $emitente): void
    {
        abort_unless($request->user()->canAccessEmitente($emitente), 403);
    }

    private function falha(Throwable $e, string $mensagem, Emitente $emitente, Request $request)
    {
        Log::error($mensagem, ['emitente_id' => $emitente->id, 'user_id' => $request->user()->id, 'exception' => $e]);

        return back()->with('error', $mensagem);
    }
}
