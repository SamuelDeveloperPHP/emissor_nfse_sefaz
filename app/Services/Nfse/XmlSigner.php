<?php

namespace App\Services\Nfse;

use DOMDocument;
use DOMElement;
use DOMXPath;

/**
 * XMLDSig (enveloped) for the DPS: signs the infDPS element by its Id and appends
 * ds:Signature as the last child of DPS, which is where the official XSD puts it.
 *
 * Canonicalization is Canonical XML 1.0 (inclusive, no comments). The digest/signature
 * pair is sha1 or sha256 (see config/nfse.php) because the ADN's required one could not be
 * confirmed offline.
 */
class XmlSigner
{
    public const DS = 'http://www.w3.org/2000/09/xmldsig#';

    private const C14N = 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315';

    private const ALGORITMOS = [
        'sha1' => ['sig' => 'http://www.w3.org/2000/09/xmldsig#rsa-sha1', 'digest' => 'http://www.w3.org/2000/09/xmldsig#sha1', 'openssl' => OPENSSL_ALGO_SHA1],
        'sha256' => ['sig' => 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256', 'digest' => 'http://www.w3.org/2001/04/xmlenc#sha256', 'openssl' => OPENSSL_ALGO_SHA256],
    ];

    public function assinarDps(string $xml, CertificadoA1 $certificado, ?string $algoritmo = null): string
    {
        $algoritmo ??= config('nfse.assinatura.algoritmo', 'sha1');
        $alg = self::ALGORITMOS[$algoritmo] ?? throw new NfseException("Algoritmo de assinatura desconhecido: {$algoritmo}.");

        $doc = $this->carregar($xml);
        $raiz = $doc->documentElement;
        $inf = $this->infDps($doc);
        $id = $inf->getAttribute('Id');

        if ($id === '') {
            throw new NfseException('O infDPS não tem o atributo Id; não há o que assinar.');
        }
        if ($this->assinatura($doc) !== null) {
            throw new NfseException('Esta DPS já está assinada.');
        }

        $digest = base64_encode(hash($algoritmo, $inf->C14N(false, false), true));

        $signature = $doc->createElementNS(self::DS, 'Signature');
        $signedInfo = $this->filho($doc, $signature, 'SignedInfo');
        $this->filho($doc, $signedInfo, 'CanonicalizationMethod')->setAttribute('Algorithm', self::C14N);
        $this->filho($doc, $signedInfo, 'SignatureMethod')->setAttribute('Algorithm', $alg['sig']);

        $reference = $this->filho($doc, $signedInfo, 'Reference');
        $reference->setAttribute('URI', '#'.$id);
        $transforms = $this->filho($doc, $reference, 'Transforms');
        $this->filho($doc, $transforms, 'Transform')->setAttribute('Algorithm', self::DS.'enveloped-signature');
        $this->filho($doc, $transforms, 'Transform')->setAttribute('Algorithm', self::C14N);
        $this->filho($doc, $reference, 'DigestMethod')->setAttribute('Algorithm', $alg['digest']);
        $this->filho($doc, $reference, 'DigestValue', $digest);

        // Attached before SignedInfo is canonicalized so it sees the same namespace context a verifier will.
        $raiz->appendChild($signature);

        $valor = '';
        if (! openssl_sign($signedInfo->C14N(false, false), $valor, $certificado->chavePrivada(), $alg['openssl'])) {
            throw new NfseException('Falha ao assinar a DPS com o certificado digital.');
        }

        $this->filho($doc, $signature, 'SignatureValue', base64_encode($valor));
        $keyInfo = $this->filho($doc, $signature, 'KeyInfo');
        $x509 = $this->filho($doc, $keyInfo, 'X509Data');
        $this->filho($doc, $x509, 'X509Certificate', $certificado->certificadoBase64());

        $assinado = $doc->saveXML();

        if (! $this->verificar($assinado)) {
            throw new NfseException('A assinatura gerada não passou na verificação interna.');
        }

        return $assinado;
    }

    /** Checks the digest and the signature using the certificate embedded in KeyInfo. */
    public function verificar(string $xml): bool
    {
        try {
            $doc = $this->carregar($xml);
        } catch (NfseException) {
            return false;
        }

        $signature = $this->assinatura($doc);
        if ($signature === null) {
            return false;
        }

        $xp = new DOMXPath($doc);
        $xp->registerNamespace('ds', self::DS);
        $texto = fn (string $consulta) => trim((string) $xp->evaluate("string({$consulta})", $signature));

        $uri = $texto('ds:SignedInfo/ds:Reference/@URI');
        $sigUri = $texto('ds:SignedInfo/ds:SignatureMethod/@Algorithm');

        $algoritmo = null;
        foreach (self::ALGORITMOS as $nome => $definicao) {
            if ($definicao['sig'] === $sigUri) {
                $algoritmo = $nome;
            }
        }

        // The signature must sit directly under DPS and point at infDPS itself, not at some other node.
        $inf = $this->infDps($doc);
        if ($algoritmo === null || $signature->parentNode !== $doc->documentElement || $uri !== '#'.$inf->getAttribute('Id')) {
            return false;
        }

        if (! hash_equals(base64_encode(hash($algoritmo, $inf->C14N(false, false), true)), $texto('ds:SignedInfo/ds:Reference/ds:DigestValue'))) {
            return false;
        }

        $signedInfo = $xp->query('ds:SignedInfo', $signature)->item(0);
        $cert = "-----BEGIN CERTIFICATE-----\n".chunk_split(preg_replace('/\s+/', '', $texto('ds:KeyInfo/ds:X509Data/ds:X509Certificate')), 64, "\n").'-----END CERTIFICATE-----';
        $publica = openssl_pkey_get_public($cert);
        if ($publica === false) {
            return false;
        }

        return openssl_verify(
            $signedInfo->C14N(false, false),
            base64_decode($texto('ds:SignatureValue'), true) ?: '',
            $publica,
            self::ALGORITMOS[$algoritmo]['openssl'],
        ) === 1;
    }

    private function carregar(string $xml): DOMDocument
    {
        $doc = new DOMDocument('1.0', 'UTF-8');
        $doc->preserveWhiteSpace = true;

        $anterior = libxml_use_internal_errors(true);
        $ok = $doc->loadXML($xml);
        libxml_clear_errors();
        libxml_use_internal_errors($anterior);

        if (! $ok || $doc->documentElement === null) {
            throw new NfseException('O XML da DPS não pôde ser lido para assinatura.');
        }

        return $doc;
    }

    private function infDps(DOMDocument $doc): DOMElement
    {
        $inf = $doc->getElementsByTagNameNS(DpsBuilder::NAMESPACE, 'infDPS')->item(0);

        return $inf instanceof DOMElement ? $inf : throw new NfseException('A DPS não tem o elemento infDPS.');
    }

    private function assinatura(DOMDocument $doc): ?DOMElement
    {
        $assinatura = $doc->getElementsByTagNameNS(self::DS, 'Signature')->item(0);

        return $assinatura instanceof DOMElement ? $assinatura : null;
    }

    private function filho(DOMDocument $doc, DOMElement $pai, string $nome, ?string $valor = null): DOMElement
    {
        $elemento = $doc->createElementNS(self::DS, $nome);
        if ($valor !== null) {
            $elemento->appendChild($doc->createTextNode($valor));
        }

        return $pai->appendChild($elemento);
    }
}
