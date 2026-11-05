<?php

namespace App\Services\Nfse;

use App\Models\Emitente;
use App\Models\Lote;
use App\Models\NotaFiscal;
use App\Models\User;
use Carbon\Exceptions\InvalidFormatException;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class LoteImporter
{
    public const COLUNAS = [
        'tomador_documento',
        'tomador_nome',
        'tomador_email',
        'descricao_servico',
        'codigo_tributacao_nacional',
        'valor_servico',
        'aliquota_iss',
        'iss_retido',
        'data_competencia',
        'municipio_prestacao',
    ];

    private const OBRIGATORIAS = [
        'tomador_documento',
        'tomador_nome',
        'descricao_servico',
        'codigo_tributacao_nacional',
        'valor_servico',
    ];

    /**
     * Reads the CSV and creates the lote with one nota per line. Lines that fail
     * the basic checks are stored as rejected so the user sees them in the lote.
     */
    public function importar(Emitente $emitente, ?User $user, string $conteudo, string $nomeArquivo): Lote
    {
        $linhas = $this->ler($conteudo);

        if (count($linhas) === 0) {
            throw ValidationException::withMessages(['arquivo' => 'O arquivo não tem nenhuma linha de nota.']);
        }
        if (count($linhas) > config('nfse.max_linhas_por_lote')) {
            throw ValidationException::withMessages([
                'arquivo' => 'O arquivo passa de '.number_format(config('nfse.max_linhas_por_lote'), 0, ',', '.').' linhas. Divida em mais de um lote.',
            ]);
        }

        return $this->criarLote($emitente, $user, $linhas, $nomeArquivo);
    }

    /**
     * Single-note emission: a lote of one line, so it goes through the same pipeline.
     *
     * @param  array<string, string>  $linha
     */
    public function importarLinha(Emitente $emitente, ?User $user, array $linha, string $nome = 'Emissão individual'): Lote
    {
        return $this->criarLote($emitente, $user, [1 => $linha], $nome);
    }

    private function criarLote(Emitente $emitente, ?User $user, array $linhas, string $nomeArquivo): Lote
    {
        return DB::transaction(function () use ($emitente, $user, $linhas, $nomeArquivo) {
            $lote = Lote::create([
                'emitente_id' => $emitente->id,
                'user_id' => $user?->id,
                'arquivo' => $nomeArquivo,
                'status' => Lote::STATUS_PROCESSANDO,
                'total' => count($linhas),
            ]);

            $agora = now();
            $registros = [];
            foreach ($linhas as $numeroLinha => $linha) {
                [$payload, $erros] = $this->normalizar($linha);

                $registros[] = [
                    'emitente_id' => $emitente->id,
                    'lote_id' => $lote->id,
                    'linha' => $numeroLinha,
                    'status' => $erros ? NotaFiscal::STATUS_REJEITADA : NotaFiscal::STATUS_PENDENTE,
                    'valor_servicos' => $payload['valor'] ?? 0,
                    'motivo_rejeicao' => $erros[0] ?? null,
                    'payload' => json_encode($payload),
                    'erros' => $erros ? json_encode($erros) : null,
                    'created_at' => $agora,
                    'updated_at' => $agora,
                ];
            }

            foreach (array_chunk($registros, 500) as $bloco) {
                NotaFiscal::insert($bloco);
            }

            return $lote;
        });
    }

    public static function modeloCsv(): string
    {
        return "\xEF\xBB\xBF".implode(';', self::COLUNAS)."\n"
            ."12345678909;Maria da Silva;maria@exemplo.com.br;Consultoria contábil mensal;171901;1500,00;2,00;0;".now()->toDateString().";\n";
    }

    /**
     * @return array<int, array<string, string>> rows keyed by their line number in the file
     */
    private function ler(string $conteudo): array
    {
        $conteudo = preg_replace('/^\xEF\xBB\xBF/', '', $conteudo);
        if (! mb_check_encoding($conteudo, 'UTF-8')) {
            $conteudo = mb_convert_encoding($conteudo, 'UTF-8', 'Windows-1252');
        }

        $primeiraLinha = strtok($conteudo, "\r\n") ?: '';
        $delimitador = substr_count($primeiraLinha, ';') >= substr_count($primeiraLinha, ',') ? ';' : ',';

        $stream = fopen('php://temp', 'r+');
        fwrite($stream, $conteudo);
        rewind($stream);

        $cabecalho = fgetcsv($stream, 0, $delimitador);
        $cabecalho = array_map(fn ($nome) => strtolower(trim((string) $nome)), $cabecalho ?: []);

        $faltando = array_diff(self::OBRIGATORIAS, $cabecalho);
        if ($faltando) {
            fclose($stream);
            throw ValidationException::withMessages([
                'arquivo' => 'Faltam colunas no cabeçalho: '.implode(', ', $faltando).'. Baixe o modelo para ver o formato esperado.',
            ]);
        }

        $linhas = [];
        $numeroLinha = 1;
        while (($campos = fgetcsv($stream, 0, $delimitador)) !== false) {
            $numeroLinha++;
            if ($campos === [null] || count(array_filter($campos, fn ($c) => trim((string) $c) !== '')) === 0) {
                continue;
            }

            $linha = [];
            foreach ($cabecalho as $indice => $nome) {
                $linha[$nome] = trim((string) ($campos[$indice] ?? ''));
            }
            $linhas[$numeroLinha] = $linha;
        }
        fclose($stream);

        return $linhas;
    }

    /**
     * @return array{0: array<string, mixed>, 1: array<int, string>}
     */
    public function normalizar(array $linha): array
    {
        $erros = [];

        $documento = preg_replace('/\D/', '', $linha['tomador_documento'] ?? '');
        if (! in_array(strlen($documento), [11, 14], true)) {
            $erros[] = 'O documento do tomador precisa ter 11 dígitos (CPF) ou 14 (CNPJ).';
        }

        $nome = $linha['tomador_nome'] ?? '';
        if ($nome === '') {
            $erros[] = 'Informe o nome do tomador.';
        }

        $descricao = $linha['descricao_servico'] ?? '';
        if ($descricao === '') {
            $erros[] = 'Informe a descrição do serviço.';
        }

        $codigo = preg_replace('/\D/', '', $linha['codigo_tributacao_nacional'] ?? '');
        if (strlen($codigo) !== 6) {
            $erros[] = 'O código de tributação nacional precisa ter 6 dígitos.';
        }

        $valor = $this->numero($linha['valor_servico'] ?? '');
        if ($valor === null || $valor <= 0) {
            $erros[] = 'O valor do serviço precisa ser maior que zero.';
        }

        $aliquota = null;
        if (($linha['aliquota_iss'] ?? '') !== '') {
            $aliquota = $this->numero($linha['aliquota_iss']);
            if ($aliquota === null || $aliquota < 0) {
                $erros[] = 'A alíquota do ISS é inválida.';
            }
        }

        $competencia = now()->toDateString();
        if (($linha['data_competencia'] ?? '') !== '') {
            $competencia = $this->data($linha['data_competencia']);
            if ($competencia === null) {
                $erros[] = 'A data de competência é inválida; use AAAA-MM-DD ou DD/MM/AAAA.';
            }
        }

        $municipio = preg_replace('/\D/', '', $linha['municipio_prestacao'] ?? '');
        if ($municipio !== '' && strlen($municipio) !== 7) {
            $erros[] = 'O município de prestação precisa ser o código IBGE de 7 dígitos.';
        }

        $payload = [
            'tomador_documento' => $documento,
            'tomador_nome' => $nome,
            'tomador_email' => $linha['tomador_email'] ?? '',
            'descricao' => $descricao,
            'codigo_tributacao' => $codigo,
            'valor' => $valor,
            'aliquota' => $aliquota,
            'iss_retido' => in_array(strtolower($linha['iss_retido'] ?? ''), ['1', 's', 'sim', 'true'], true),
            'competencia' => $competencia,
            'municipio_prestacao' => $municipio !== '' ? $municipio : null,
        ];

        return [$payload, $erros];
    }

    private function numero(string $valor): ?float
    {
        $valor = trim($valor);
        if ($valor === '') {
            return null;
        }
        if (str_contains($valor, ',')) {
            $valor = str_replace('.', '', $valor);
            $valor = str_replace(',', '.', $valor);
        }

        return is_numeric($valor) ? (float) $valor : null;
    }

    private function data(string $valor): ?string
    {
        foreach (['Y-m-d', 'd/m/Y'] as $formato) {
            try {
                $data = Carbon::createFromFormat('!'.$formato, $valor);
            } catch (InvalidFormatException) {
                continue;
            }

            if ($data->format($formato) === $valor) {
                return $data->toDateString();
            }
        }

        return null;
    }
}
