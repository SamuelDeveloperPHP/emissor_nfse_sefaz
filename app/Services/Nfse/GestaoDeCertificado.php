<?php

namespace App\Services\Nfse;

use App\Models\Emitente;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * Receives, checks, stores and removes the A1 certificate of an emitente.
 *
 * The certificate is opened with the password before anything is kept, so a wrong password, a
 * corrupted file or an expired certificate is refused at upload time instead of failing a whole lote
 * later. Logs name the emitente, the user and the fingerprint; never the file, the key or the password.
 */
class GestaoDeCertificado
{
    private const TAMANHO_MAXIMO = 262144; // 256 KB: a real .pfx has a few KB

    public function __construct(private readonly CofreDeCertificados $cofre)
    {
    }

    /**
     * @return array{avisos: array<int, string>, titular: string, valido_ate: string}
     *
     * @throws NfseException when the user must fix something (password, file, CNPJ, expiry)
     */
    public function enviar(Emitente $emitente, string $pfx, string $senha, User $por): array
    {
        if ($pfx === '' || strlen($pfx) > self::TAMANHO_MAXIMO) {
            throw new NfseException('O arquivo do certificado está vazio ou grande demais para ser um certificado A1.');
        }

        $certificado = CertificadoA1::dePfx($pfx, $senha);
        $avisos = [];

        $cnpjDoEmitente = preg_replace('/\D/', '', (string) $emitente->cnpj);
        $cnpjDoCertificado = $certificado->cnpj();

        if ($cnpjDoCertificado === null) {
            $avisos[] = 'Não foi possível conferir o CNPJ dentro do certificado. Confirme que ele é o e-CNPJ de '.$emitente->razao_social.'.';
        } elseif (substr($cnpjDoCertificado, 0, 8) !== substr($cnpjDoEmitente, 0, 8)) {
            throw new NfseException('Este certificado é de outra empresa (CNPJ '.$cnpjDoCertificado.'). O certificado precisa ser do emitente '.$emitente->razao_social.' (CNPJ '.$cnpjDoEmitente.').');
        }

        $novo = $this->cofre->guardar($pfx, $emitente->id);
        $antigo = $emitente->certificado_path;

        try {
            $emitente->forceFill([
                'certificado_path' => $novo,
                'certificado_password' => $senha,
                'certificado_validade' => $certificado->validoAte->toDateString(),
                'certificado_titular' => mb_substr($certificado->titular(), 0, 255),
                'certificado_cnpj' => $cnpjDoCertificado,
                'certificado_impressao' => $certificado->impressao(),
                'certificado_enviado_em' => now(),
                'certificado_enviado_por' => $por->id,
            ])->save();
        } catch (Throwable $e) {
            $this->cofre->apagar($novo);

            throw $e;
        }

        $this->cofre->apagar($antigo);

        Log::info('Certificado digital enviado.', [
            'emitente_id' => $emitente->id,
            'user_id' => $por->id,
            'impressao' => $certificado->impressao(),
            'valido_ate' => $certificado->validoAte->toDateString(),
        ]);

        return ['avisos' => $avisos, 'titular' => $certificado->titular(), 'valido_ate' => $certificado->validoAte->toDateString()];
    }

    public function remover(Emitente $emitente, User $por): void
    {
        $caminho = $emitente->certificado_path;

        $emitente->forceFill([
            'certificado_path' => null,
            'certificado_password' => null,
            'certificado_validade' => null,
            'certificado_titular' => null,
            'certificado_cnpj' => null,
            'certificado_impressao' => null,
            'certificado_enviado_em' => null,
            'certificado_enviado_por' => null,
        ])->save();

        $this->cofre->apagar($caminho);

        Log::info('Certificado digital removido.', ['emitente_id' => $emitente->id, 'user_id' => $por->id]);
    }

    /** Opens the stored certificate exactly as a real emission would. */
    public function testar(Emitente $emitente): CertificadoA1
    {
        return CertificadoA1::doEmitente($emitente);
    }
}
