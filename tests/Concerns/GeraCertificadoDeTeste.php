<?php

namespace Tests\Concerns;

trait GeraCertificadoDeTeste
{
    /** A throwaway self-signed certificate: enough to exercise real signing, never valid for the ADN. */
    private function gerarPfx(string $senha, int $dias = 365, string $cn = 'EMPRESA TESTE LTDA:11222333000181'): string
    {
        $config = ['digest_alg' => 'sha256', 'private_key_bits' => 2048, 'private_key_type' => OPENSSL_KEYTYPE_RSA];
        $cnf = dirname(PHP_BINARY).'/extras/ssl/openssl.cnf';
        if (! getenv('OPENSSL_CONF') && is_file($cnf)) {
            $config['config'] = $cnf;
        }

        $chave = openssl_pkey_new($config);
        $csr = openssl_csr_new(['commonName' => $cn], $chave, $config);
        $cert = openssl_csr_sign($csr, null, $chave, $dias, $config);
        openssl_pkcs12_export($cert, $pfx, $chave, $senha);

        return $pfx;
    }
}
