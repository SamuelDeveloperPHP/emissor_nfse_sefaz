<?php

namespace App\Services\Nfse\Drivers;

use App\Models\Emitente;
use App\Models\NotaFiscal;
use App\Services\Nfse\CertificadoA1;
use App\Services\Nfse\NfseException;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;

/**
 * Transmits the signed DPS to the SEFIN Nacional over mutual TLS with the emitente's A1.
 *
 * The wire contract (POST {base}/nfse with {"dpsXmlGZipB64": ...} and the reply fields parsed in
 * interpretar()) follows what the public integrations report; the official Swagger could not be
 * read offline. Treat it as unverified until it has run in produção restrita.
 *
 * A timeout or a 5xx never counts as a rejection: the ADN may have accepted the DPS, so the nota
 * stays pending and must be looked up, never re-sent.
 */
class AdnNacionalDriver implements Transmissor
{
    public function exigeAssinatura(): bool
    {
        return true;
    }

    public function transmitir(Emitente $emitente, NotaFiscal $nota, string $dpsXml): array
    {
        $ambiente = $nota->lote?->ambiente ?? $emitente->ambiente;

        try {
            $resposta = $this->comCertificado(
                $emitente,
                fn ($http) => $http->post($this->url($ambiente, '/nfse'), ['dpsXmlGZipB64' => base64_encode(gzencode($dpsXml))])
            );
        } catch (NfseException $e) {
            return $this->pendente($e->getMessage());
        } catch (ConnectionException $e) {
            return $this->pendente('Sem resposta do ADN ('.$e->getMessage().'). A nota pode ter sido recebida: consulte a situação antes de reenviar.');
        }

        return $this->interpretar($resposta);
    }

    public function consultar(Emitente $emitente, NotaFiscal $nota): array
    {
        $idDps = $this->idDaDps($nota->dps_xml);
        if ($idDps === null) {
            return $this->pendente('A nota não tem a DPS guardada; não há o que consultar.');
        }

        $ambiente = $nota->lote?->ambiente ?? $emitente->ambiente;

        try {
            return $this->comCertificado($emitente, function ($http) use ($ambiente, $idDps, $nota) {
                $porDps = $http->get($this->url($ambiente, '/dps/'.$idDps));

                if ($porDps->status() === 404) {
                    return $this->pendente('O ADN ainda não encontrou esta DPS. Se passar de algumas horas, emita a nota novamente.');
                }
                if (! $porDps->successful()) {
                    return $this->pendente("A consulta ao ADN respondeu HTTP {$porDps->status()}; tente de novo mais tarde.");
                }

                $chave = $porDps->json('chaveAcesso') ?? $nota->chave_acesso;
                if (! is_string($chave) || $chave === '') {
                    return $this->pendente('O ADN conhece a DPS, mas ainda não devolveu a chave de acesso da NFS-e.', $porDps->json());
                }

                $nfse = $http->get($this->url($ambiente, '/nfse/'.$chave));
                if ($nfse->successful()) {
                    return $this->interpretar($nfse, $chave);
                }

                // The key exists, so the nota was authorized even if its XML could not be fetched now.
                return ['status' => NotaFiscal::STATUS_AUTORIZADA, 'mensagens' => ['NFS-e autorizada; o XML ainda não pôde ser baixado do ADN.'], 'chave_acesso' => $chave, 'resposta' => $porDps->json()];
            });
        } catch (NfseException $e) {
            return $this->pendente($e->getMessage());
        } catch (ConnectionException $e) {
            return $this->pendente('Sem resposta do ADN na consulta ('.$e->getMessage().'); tente de novo mais tarde.');
        }
    }

    public function cancelar(Emitente $emitente, NotaFiscal $nota, string $eventoXml): array
    {
        $ambiente = $nota->lote?->ambiente ?? $emitente->ambiente;

        try {
            $resposta = $this->comCertificado($emitente, fn ($http) => $http->post(
                $this->url($ambiente, '/nfse/'.$nota->chave_acesso.'/eventos'),
                ['pedidoRegistroEventoXmlGZipB64' => base64_encode(gzencode($eventoXml))]
            ));
        } catch (NfseException $e) {
            return ['cancelada' => false, 'mensagens' => [$e->getMessage()]];
        } catch (ConnectionException $e) {
            return ['cancelada' => false, 'mensagens' => ['Sem resposta do ADN ('.$e->getMessage().'). O cancelamento pode ter sido registrado: consulte a nota antes de tentar de novo.']];
        }

        $json = $resposta->json();
        $json = is_array($json) ? $json : [];

        if ($resposta->successful()) {
            return ['cancelada' => true, 'mensagens' => $this->mensagens($json['alertas'] ?? []), 'resposta' => $json ?: null];
        }

        $erros = $this->mensagens($json['erros'] ?? $json['erro'] ?? $json['errors'] ?? []);

        return [
            'cancelada' => false,
            'mensagens' => $erros ?: ["O ADN recusou o cancelamento (HTTP {$resposta->status()}): ".mb_substr(trim($resposta->body()), 0, 300)],
            'resposta' => $json ?: null,
        ];
    }

    public function baixarDanfse(Emitente $emitente, NotaFiscal $nota): ?string
    {
        if (blank($nota->chave_acesso)) {
            return null;
        }

        $ambiente = $nota->lote?->ambiente ?? $emitente->ambiente;
        $base = rtrim(config('nfse.adn.danfse_urls.'.($ambiente === 'producao' ? 'producao' : 'homologacao')), '/');

        try {
            $resposta = $this->comCertificado($emitente, fn ($http) => $http->get($base.'/'.$nota->chave_acesso));
        } catch (NfseException|ConnectionException) {
            return null;
        }

        return $resposta->successful() && str_starts_with($resposta->body(), '%PDF') ? $resposta->body() : null;
    }

    /**
     * Runs $uso with an HTTP client that presents the emitente's A1 certificate (mTLS).
     *
     * @template T
     *
     * @param  callable(\Illuminate\Http\Client\PendingRequest): T  $uso
     * @return T
     */
    private function comCertificado(Emitente $emitente, callable $uso)
    {
        return CertificadoA1::doEmitente($emitente)->comArquivosTemporarios(
            fn (string $certFile, string $keyFile) => $uso(
                Http::withOptions(['cert' => $certFile, 'ssl_key' => $keyFile])->timeout(config('nfse.adn.timeout'))->acceptJson()->asJson()
            )
        );
    }

    private function idDaDps(?string $xml): ?string
    {
        return $xml !== null && preg_match('/<infDPS[^>]*\bId="(DPS\d+)"/', $xml, $m) ? $m[1] : null;
    }

    /** Base URL of the SEFIN Nacional for the environment; the lote's environment, never the emitente's default. */
    public function url(string $ambiente, string $caminho): string
    {
        $base = config('nfse.adn.urls.'.($ambiente === 'producao' ? 'producao' : 'homologacao'));

        return rtrim($base, '/').$caminho;
    }

    /** @return array{status: string, mensagens: array<int, string>, chave_acesso?: ?string, numero_nfse?: ?string, nfse_xml?: ?string, resposta?: ?array} */
    private function interpretar(Response $resposta, ?string $chaveConhecida = null): array
    {
        $json = $resposta->json();
        $json = is_array($json) ? $json : [];

        if ($resposta->successful()) {
            $xml = $this->xmlDaNfse($json);
            $chave = $json['chaveAcesso'] ?? $this->chaveDoXml($xml) ?? $chaveConhecida;

            if ($chave === null && $xml === null) {
                return $this->pendente('O ADN respondeu sucesso, mas sem a NFS-e nem a chave de acesso; consulte a situação da nota.', $json);
            }

            return [
                'status' => NotaFiscal::STATUS_AUTORIZADA,
                'mensagens' => $this->mensagens($json['alertas'] ?? []),
                'chave_acesso' => $chave,
                'numero_nfse' => $this->numeroDoXml($xml),
                'nfse_xml' => $xml,
                'resposta' => $json,
            ];
        }

        // Not the nota's fault: certificate refused, throttling, or the service being down.
        if (in_array($resposta->status(), [401, 403, 408, 429], true) || $resposta->serverError()) {
            return $this->pendente("O ADN respondeu HTTP {$resposta->status()}; a nota ficou pendente e deve ser consultada antes de reenviar.", $json);
        }

        $erros = $this->mensagens($json['erros'] ?? $json['erro'] ?? $json['errors'] ?? []);

        return [
            'status' => NotaFiscal::STATUS_REJEITADA,
            'mensagens' => $erros ?: ["O ADN recusou a DPS (HTTP {$resposta->status()}): ".mb_substr(trim($resposta->body()), 0, 300)],
            'resposta' => $json ?: null,
        ];
    }

    /** @return array{status: string, mensagens: array<int, string>, resposta?: ?array} */
    private function pendente(string $mensagem, ?array $resposta = null): array
    {
        return ['status' => NotaFiscal::STATUS_PENDENTE, 'mensagens' => [$mensagem], 'resposta' => $resposta ?: null];
    }

    /** Flattens the several shapes an error/alert list can take into plain sentences. */
    private function mensagens(mixed $itens): array
    {
        if (is_string($itens)) {
            return [$itens];
        }
        if (! is_array($itens)) {
            return [];
        }
        if (isset($itens['descricao']) || isset($itens['mensagem'])) {
            $itens = [$itens];
        }

        $mensagens = [];
        foreach ($itens as $item) {
            if (is_string($item)) {
                $mensagens[] = $item;
            } elseif (is_array($item)) {
                $texto = $item['descricao'] ?? $item['mensagem'] ?? $item['message'] ?? null;
                if ($texto === null) {
                    continue;
                }
                $codigo = $item['codigo'] ?? $item['code'] ?? null;
                $complemento = $item['complemento'] ?? null;
                $mensagens[] = trim(($codigo ? "{$codigo}: " : '').$texto.($complemento ? " ({$complemento})" : ''));
            }
        }

        return $mensagens;
    }

    private function xmlDaNfse(array $json): ?string
    {
        $b64 = $json['nfseXmlGZipB64'] ?? null;
        if (! is_string($b64) || $b64 === '') {
            return null;
        }

        $bruto = base64_decode($b64, true);
        $xml = $bruto === false ? false : @gzdecode($bruto);

        return $xml === false ? null : $xml;
    }

    private function chaveDoXml(?string $xml): ?string
    {
        // infNFSe Id is "NFS" + the 50-digit access key.
        return $xml !== null && preg_match('/<infNFSe[^>]*\bId="NFS(\d{50})"/', $xml, $m) ? $m[1] : null;
    }

    private function numeroDoXml(?string $xml): ?string
    {
        return $xml !== null && preg_match('/<nNFSe>(\d+)<\/nNFSe>/', $xml, $m) ? $m[1] : null;
    }
}
