<?php

namespace App\Services\Nfse;

use DOMDocument;

class XsdValidator
{
    /**
     * Validates a DPS XML against the official XSD and returns the list of errors
     * (empty when the document is valid).
     *
     * @return array<int, string>
     */
    public function validarDps(string $xml): array
    {
        return $this->validar($xml, 'DPS');
    }

    /** Pedido de registro de evento (cancelamento etc.). */
    public function validarEvento(string $xml): array
    {
        return $this->validar($xml, 'pedRegEvento');
    }

    /** @return array<int, string> */
    private function validar(string $xml, string $arquivo): array
    {
        $schema = config('nfse.xsd_path').'/'.$arquivo.'_v'.config('nfse.versao_leiaute').'.xsd';

        $previous = libxml_use_internal_errors(true);
        libxml_clear_errors();

        $doc = new DOMDocument();
        $valid = $doc->loadXML($xml) && $doc->schemaValidate($schema);

        $errors = [];
        if (! $valid) {
            foreach (libxml_get_errors() as $error) {
                if ($this->isKnownSchemaDefect($error->message)) {
                    continue;
                }
                $errors[] = trim($error->message);
            }
        }

        libxml_clear_errors();
        libxml_use_internal_errors($previous);

        return $errors;
    }

    // The official 1.01 XSD declares TSSerieDPS with the pattern "^0{0,4}\d{1,5}$".
    // In XSD regular expressions ^ and $ are literal characters, so no value can ever
    // match it. The serie we emit is always 1-5 digits (see DpsBuilder), so that one
    // facet failure is ignored instead of editing the official schema files.
    private function isKnownSchemaDefect(string $message): bool
    {
        return str_contains($message, "}serie': [facet 'pattern']");
    }
}
