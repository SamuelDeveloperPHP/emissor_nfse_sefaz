<?php

return [
    // Layout version of the official Sistema Nacional NFS-e XSD package in use
    // (gov.br/nfse > Documentação Atual, NFSe-ESQUEMAS_XSD v1.01 of 2026-02-09).
    'versao_leiaute' => '1.01',

    'xsd_path' => resource_path('nfse/xsd/v1.01-20260209/Schemas/1.01'),

    'ver_aplic' => 'EmissorNFSe-0.1',

    'max_linhas_por_lote' => 5000,

    // SEFIN Nacional (Sistema Nacional NFS-e). Base URLs come from the "APIs produção restrita e
    // produção" page on gov.br/nfse; they can be overridden in .env if the government moves them.
    // The request/response contract below is NOT confirmed against the official Swagger (it needs
    // a client certificate to open): validate it in produção restrita before trusting it.
    'adn' => [
        'urls' => [
            'homologacao' => env('NFSE_URL_HOMOLOGACAO', 'https://sefin.producaorestrita.nfse.gov.br/API/SefinNacional'),
            'producao' => env('NFSE_URL_PRODUCAO', 'https://sefin.nfse.gov.br/SefinNacional'),
        ],
        // DANFSE (PDF) service of the ADN.
        'danfse_urls' => [
            'homologacao' => env('NFSE_DANFSE_URL_HOMOLOGACAO', 'https://adn.producaorestrita.nfse.gov.br/danfse'),
            'producao' => env('NFSE_DANFSE_URL_PRODUCAO', 'https://adn.nfse.gov.br/danfse'),
        ],
        'timeout' => (int) env('NFSE_TIMEOUT', 30),
    ],

    // XMLDSig digest/signature pair. The XSD package's restricted xmldsig schema (Schemas/1.00)
    // fixes rsa-sha1; the generic one (Schemas/1.01) accepts sha256. Confirm which one the
    // ADN accepts in homologação and set NFSE_ASSINATURA_ALGORITMO=sha256 if it demands it.
    'assinatura' => [
        'algoritmo' => env('NFSE_ASSINATURA_ALGORITMO', 'sha1'),
    ],
];
