<?php

namespace App\Services\Nfse;

use App\Models\Emitente;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Storage;

/**
 * An opened A1 certificate (.pfx / .p12): leaf certificate, private key and chain in PEM.
 * Never log or serialize an instance; it holds the private key.
 */
final class CertificadoA1
{
    private function __construct(
        private readonly string $certPem,
        private readonly string $keyPem,
        private readonly string $chainPem,
        public readonly CarbonImmutable $validoAte,
    ) {
    }

    public static function doEmitente(Emitente $emitente): self
    {
        if (blank($emitente->certificado_path) || ! Storage::disk('local')->exists($emitente->certificado_path)) {
            throw new NfseException('O emitente não tem certificado digital A1 cadastrado.');
        }
        if (blank($emitente->certificado_password)) {
            throw new NfseException('Informe a senha do certificado digital no cadastro do emitente.');
        }

        return self::dePfx(Storage::disk('local')->get($emitente->certificado_path), (string) $emitente->certificado_password);
    }

    public static function dePfx(string $pfx, string $senha): self
    {
        $itens = [];
        if (! @openssl_pkcs12_read($pfx, $itens, $senha)) {
            // Drain OpenSSL's error queue so it does not leak into later calls.
            while (openssl_error_string() !== false) {
            }

            throw new NfseException('Não foi possível abrir o certificado digital. Confira se o arquivo é um A1 (.pfx) e se a senha cadastrada está correta.');
        }

        $info = openssl_x509_parse($itens['cert']);
        $validoAte = CarbonImmutable::createFromTimestamp((int) ($info['validTo_time_t'] ?? 0));

        if ($validoAte->isPast()) {
            throw new NfseException('O certificado digital venceu em '.$validoAte->format('d/m/Y').'. Cadastre um certificado válido no emitente.');
        }

        return new self($itens['cert'], $itens['pkey'], implode("\n", $itens['extracerts'] ?? []), $validoAte);
    }

    /** Leaf certificate as base64 DER, the form XMLDSig's X509Certificate element carries. */
    public function certificadoBase64(): string
    {
        return preg_replace('/\s+/', '', str_replace(['-----BEGIN CERTIFICATE-----', '-----END CERTIFICATE-----'], '', $this->certPem));
    }

    /** @return \OpenSSLAsymmetricKey */
    public function chavePrivada()
    {
        $chave = openssl_pkey_get_private($this->keyPem);
        if ($chave === false) {
            throw new NfseException('A chave privada do certificado não pôde ser usada.');
        }

        return $chave;
    }

    /**
     * mTLS needs the certificate and key as files. They are written with owner-only
     * permissions, handed to $uso, and removed even if $uso throws.
     *
     * @template T
     *
     * @param  callable(string, string): T  $uso  receives (certFile, keyFile)
     * @return T
     */
    public function comArquivosTemporarios(callable $uso)
    {
        $pasta = storage_path('app/tmp');
        if (! is_dir($pasta)) {
            mkdir($pasta, 0700, true);
        }

        $certFile = tempnam($pasta, 'crt');
        $keyFile = tempnam($pasta, 'key');

        try {
            file_put_contents($certFile, $this->certPem."\n".$this->chainPem);
            file_put_contents($keyFile, $this->keyPem);
            @chmod($certFile, 0600);
            @chmod($keyFile, 0600);

            return $uso($certFile, $keyFile);
        } finally {
            @unlink($certFile);
            @unlink($keyFile);
        }
    }
}
