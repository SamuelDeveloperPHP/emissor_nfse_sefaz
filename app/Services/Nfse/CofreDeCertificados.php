<?php

namespace App\Services\Nfse;

use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Where the A1 files (.pfx) live. They are stored encrypted with the application key on the private
 * "local" disk, so a copy of storage/ alone is useless; the file name carries no CNPJ and is random.
 *
 * Files saved by earlier versions (plain .pfx, still protected by the certificate's own password)
 * are still read; `php artisan nfse:proteger-certificados` converts them.
 */
class CofreDeCertificados
{
    private const SUFIXO = '.pfx.enc';

    public function guardar(string $pfx, int $emitenteId): string
    {
        $caminho = 'certificados/'.$emitenteId.'-'.Str::random(40).self::SUFIXO;

        Storage::disk('local')->put($caminho, Crypt::encryptString(base64_encode($pfx)));

        return $caminho;
    }

    public function ler(string $caminho): string
    {
        $disco = Storage::disk('local');

        if (! $disco->exists($caminho)) {
            throw new NfseException('O arquivo do certificado digital não foi encontrado. Envie o certificado de novo em Administração > Configurações.');
        }

        $conteudo = $disco->get($caminho);

        if (! $this->estaProtegido($caminho)) {
            return $conteudo;
        }

        try {
            $pfx = base64_decode(Crypt::decryptString($conteudo), true);
        } catch (DecryptException) {
            $pfx = false;
        }

        if ($pfx === false || $pfx === '') {
            // Typically the APP_KEY changed after the file was saved.
            throw new NfseException('Não foi possível ler o certificado guardado (a chave de segurança do sistema mudou?). Envie o certificado de novo em Administração > Configurações.');
        }

        return $pfx;
    }

    public function apagar(?string $caminho): void
    {
        if (filled($caminho)) {
            Storage::disk('local')->delete($caminho);
        }
    }

    public function estaProtegido(string $caminho): bool
    {
        return str_ends_with($caminho, self::SUFIXO);
    }
}
