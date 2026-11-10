<?php

namespace App\Services\Nfse;

use App\Models\Emitente;
use Carbon\CarbonImmutable;

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

    /**
     * The certificate that signs and transmits for this emitente: its own A1, or, when it issues under a
     * procuração, the office's certificate. The procuração itself lives at the Receita Federal and is
     * checked by the ADN on every request, so nothing about it is stored here.
     */
    public static function doEmitente(Emitente $emitente): self
    {
        if ($emitente->emitePorProcuracao()) {
            $gestao = app(GestaoDeCertificado::class);

            if ($gestao->dadosDoSistema() === null) {
                throw new NfseException('Este emitente emite por procuração, mas o certificado do escritório não está cadastrado. Envie-o em Configurações > Certificado do sistema.');
            }

            return $gestao->testarDoSistema();
        }

        if (blank($emitente->certificado_path)) {
            throw new NfseException('O emitente não tem certificado digital A1 cadastrado. Envie o certificado em Administração > Configurações.');
        }
        if (blank($emitente->certificado_password)) {
            throw new NfseException('A senha do certificado digital não está cadastrada. Envie o certificado de novo em Administração > Configurações.');
        }

        return self::dePfx(app(CofreDeCertificados::class)->ler($emitente->certificado_path), (string) $emitente->certificado_password);
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
            throw new NfseException('O certificado digital venceu em '.$validoAte->format('d/m/Y').'. Envie um certificado válido em Administração > Configurações.');
        }

        return new self($itens['cert'], $itens['pkey'], implode("\n", $itens['extracerts'] ?? []), $validoAte);
    }

    /** Common name of the certificate holder (for ICP-Brasil: "RAZAO SOCIAL:CNPJ"). */
    public function titular(): string
    {
        $cn = openssl_x509_parse($this->certPem)['subject']['CN'] ?? '';

        return is_array($cn) ? (string) ($cn[0] ?? '') : (string) $cn;
    }

    /**
     * CNPJ the certificate was issued to, or null when it cannot be read (e-CPF, unusual layout).
     * ICP-Brasil puts it in the otherName 2.16.76.1.3.3 and, by convention, after a colon in the CN.
     */
    public function cnpj(): ?string
    {
        if (preg_match('/:(\d{14})\s*$/', $this->titular(), $m)) {
            return $m[1];
        }

        $der = base64_decode($this->certificadoBase64(), true) ?: '';

        // OID 2.16.76.1.3.3 is 60 4C 01 03 03 in DER; the value follows within a few bytes.
        return preg_match('/\x60\x4C\x01\x03\x03.{0,8}?(\d{14})/s', $der, $m) ? $m[1] : null;
    }

    /** SHA-256 fingerprint, hex: identifies the certificate without revealing anything secret. */
    public function impressao(): string
    {
        return (string) openssl_x509_fingerprint($this->certPem, 'sha256');
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
