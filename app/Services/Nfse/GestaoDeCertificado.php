<?php

namespace App\Services\Nfse;

use App\Models\Emitente;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;
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

    // ---- the office's own certificate ("Certificado do sistema") ------------------------------------
    // Kept with the same protections as an emitente's. It is NOT used to sign or transmit notas: those
    // always use the emitente's own A1.

    /**
     * What the screen may show about the system certificate (never the file, path or password).
     *
     * @return array<string, mixed>|null
     */
    public function dadosDoSistema(): ?array
    {
        return Setting::json(Setting::CERTIFICADO_SISTEMA);
    }

    /**
     * @return array{avisos: array<int, string>, titular: string, valido_ate: string}
     *
     * @throws NfseException
     */
    public function enviarDoSistema(string $pfx, string $senha, User $por): array
    {
        if ($pfx === '' || strlen($pfx) > self::TAMANHO_MAXIMO) {
            throw new NfseException('O arquivo do certificado está vazio ou grande demais para ser um certificado A1.');
        }

        $certificado = CertificadoA1::dePfx($pfx, $senha);
        $avisos = $certificado->cnpj() === null ? ['Não foi possível ler o CNPJ dentro do certificado; confirme que é o e-CNPJ do escritório.'] : [];

        $novo = $this->cofre->guardar($pfx, 0);
        $antigo = $this->dadosDoSistema()['path'] ?? null;

        try {
            Setting::putJson(Setting::CERTIFICADO_SISTEMA, [
                'path' => $novo,
                'senha' => Crypt::encryptString($senha),
                'validade' => $certificado->validoAte->toDateString(),
                'titular' => mb_substr($certificado->titular(), 0, 255),
                'cnpj' => $certificado->cnpj(),
                'impressao' => $certificado->impressao(),
                'enviado_em' => now()->toDateTimeString(),
                'enviado_por' => $por->id,
                'enviado_por_nome' => $por->name,
            ]);
        } catch (Throwable $e) {
            $this->cofre->apagar($novo);

            throw $e;
        }

        $this->cofre->apagar($antigo);

        Log::info('Certificado do sistema enviado.', ['user_id' => $por->id, 'impressao' => $certificado->impressao(), 'valido_ate' => $certificado->validoAte->toDateString()]);

        return ['avisos' => $avisos, 'titular' => $certificado->titular(), 'valido_ate' => $certificado->validoAte->toDateString()];
    }

    public function removerDoSistema(User $por): void
    {
        $caminho = $this->dadosDoSistema()['path'] ?? null;

        Setting::forget(Setting::CERTIFICADO_SISTEMA);
        $this->cofre->apagar($caminho);

        Log::info('Certificado do sistema removido.', ['user_id' => $por->id]);
    }

    /** @throws NfseException */
    public function testarDoSistema(): CertificadoA1
    {
        $dados = $this->dadosDoSistema();

        if ($dados === null) {
            throw new NfseException('O sistema não tem certificado cadastrado.');
        }

        try {
            $senha = Crypt::decryptString($dados['senha']);
        } catch (DecryptException) {
            throw new NfseException('Não foi possível ler a senha guardada (a chave de segurança do sistema mudou?). Envie o certificado de novo.');
        }

        return CertificadoA1::dePfx($this->cofre->ler($dados['path']), $senha);
    }
}
