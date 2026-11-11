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
use OpenSpout\Common\Entity\Cell;
use OpenSpout\Common\Entity\Row;
use OpenSpout\Common\Entity\Style\Style;
use OpenSpout\Reader\XLSX\Options as XlsxOptions;
use OpenSpout\Reader\XLSX\Reader as XlsxReader;
use OpenSpout\Writer\XLSX\Writer as XlsxWriter;

class LoteImporter
{
    private const ABA_NOTAS = 'Notas';

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
        // Optional: the tomador's address. The DPS only carries it when it is complete.
        'tomador_cep',
        'tomador_logradouro',
        'tomador_numero',
        'tomador_complemento',
        'tomador_bairro',
        'tomador_codigo_municipio',
        // Optional: IBS/CBS group (reforma tributária). All three or none.
        'ibscbs_codigo_operacao',
        'ibscbs_cst',
        'ibscbs_classificacao',
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
    public function importar(Emitente $emitente, ?User $user, string $conteudo, string $nomeArquivo, ?string $ambiente = null): Lote
    {
        return $this->criarLote($emitente, $user, $this->lerValidado($conteudo), $nomeArquivo, $ambiente);
    }

    /**
     * Dry run of importar(): reports what would be accepted and what not, without creating anything.
     * Every problem line is listed (up to $limite); of the good ones only a short sample.
     *
     * @return array{total: int, validas: int, invalidas: int, valor_total: float, problemas: array<int, array>, amostra: array<int, array>, duplicadas: array<int, array>, truncado: bool}
     */
    public function previa(string $conteudo, int $limite = 500): array
    {
        $linhas = $this->lerValidado($conteudo);

        $validas = 0;
        $valorTotal = 0.0;
        $problemas = [];
        $amostra = [];
        $totalProblemas = 0;
        $vistas = [];
        $duplicadas = [];

        foreach ($linhas as $numero => $linha) {
            [$payload, $erros] = $this->normalizar($linha);
            $item = ['linha' => $numero, 'tomador' => $payload['tomador_nome'] ?: null, 'valor' => $payload['valor'], 'erros' => $erros];

            if ($erros) {
                $totalProblemas++;
                if (count($problemas) < $limite) {
                    $problemas[] = $item;
                }

                continue;
            }

            $validas++;
            $valorTotal += (float) $payload['valor'];

            // Same tomador, service, value and date twice is almost always a pasted line, and would issue two notas.
            $chave = implode('|', [$payload['tomador_documento'], $payload['valor'], $payload['descricao'], $payload['competencia']]);
            if (isset($vistas[$chave])) {
                $duplicadas[] = ['linha' => $numero, 'igual_a' => $vistas[$chave], 'tomador' => $payload['tomador_nome']];
            } else {
                $vistas[$chave] = $numero;
            }
            if (count($amostra) < 10) {
                $amostra[] = $item;
            }
        }

        return [
            'total' => count($linhas),
            'validas' => $validas,
            'invalidas' => $totalProblemas,
            'valor_total' => round($valorTotal, 2),
            'problemas' => $problemas,
            'amostra' => $amostra,
            'duplicadas' => array_slice($duplicadas, 0, $limite),
            'truncado' => $totalProblemas > count($problemas),
        ];
    }

    /**
     * Rows of a lote's rejected notas laid out as an import file, so the user can fix them and send again.
     * The extra "motivo" column is ignored by the importer.
     */
    public function csvDasRejeitadas(Lote $lote): string
    {
        $saida = fopen('php://temp', 'r+');
        fwrite($saida, "\xEF\xBB\xBF");
        fputcsv($saida, [...self::COLUNAS, 'motivo'], ';');

        $lote->notas()->where('status', NotaFiscal::STATUS_REJEITADA)->orderBy('linha')->each(function (NotaFiscal $nota) use ($saida) {
            $p = $nota->payload ?? [];
            $decimal = fn ($v) => $v === null || $v === '' ? '' : number_format((float) $v, 2, ',', '');

            // A cell starting with = or @ would run as a formula when the file is opened in a spreadsheet.
            $seguro = fn ($v) => is_string($v) && preg_match('/^[=@\t\r]/', $v) ? "'".$v : $v;

            fputcsv($saida, array_map($seguro, [
                ...$this->valoresDoPayload($p, $decimal),
                implode(' | ', $nota->erros ?? [$nota->motivo_rejeicao]),
            ]), ';');
        });

        rewind($saida);
        $csv = stream_get_contents($saida);
        fclose($saida);

        return $csv;
    }

    /** @return array<int, array<string, string>> */
    private function lerValidado(string $conteudo): array
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

        return $linhas;
    }

    /**
     * Single-note emission: a lote of one line, so it goes through the same pipeline.
     *
     * @param  array<string, string>  $linha
     */
    public function importarLinha(Emitente $emitente, ?User $user, array $linha, string $nome = 'Emissão individual', ?string $ambiente = null, array $extrasDoPayload = []): Lote
    {
        return $this->criarLote($emitente, $user, [1 => $linha], $nome, $ambiente, $extrasDoPayload);
    }

    /**
     * @param  array<string, mixed>  $extrasDoPayload  keys that are not CSV columns (e.g. the substitution data), added to every payload
     */
    private function criarLote(Emitente $emitente, ?User $user, array $linhas, string $nomeArquivo, ?string $ambiente = null, array $extrasDoPayload = []): Lote
    {
        // Trava de segurança central: nenhuma entrada HTTP, tarefa agendada ou chamada interna pode emitir em produção.
        $ambiente = 'homologacao';

        return DB::transaction(function () use ($emitente, $user, $linhas, $nomeArquivo, $ambiente, $extrasDoPayload) {
            $lote = Lote::create([
                'emitente_id' => $emitente->id,
                'user_id' => $user?->id,
                'arquivo' => $nomeArquivo,
                'status' => Lote::STATUS_PROCESSANDO,
                'ambiente' => $ambiente ?? $emitente->ambiente,
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
                    'payload' => json_encode([...$payload, ...$extrasDoPayload]),
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
            ."12345678909;Maria da Silva;maria@exemplo.com.br;Consultoria contábil mensal;171901;1500,00;2,00;0;".now()->toDateString().";;;;;;;;;;\n";
    }

    /** Columns that are numbers-as-text; Excel drops their leading zeros, so numeric cells are padded back. */
    private const TAMANHO_DIGITOS = [
        'codigo_tributacao_nacional' => 6,
        'tomador_cep' => 8,
        'tomador_codigo_municipio' => 7,
        'municipio_prestacao' => 7,
        'ibscbs_codigo_operacao' => 6,
        'ibscbs_cst' => 3,
        'ibscbs_classificacao' => 6,
    ];

    /**
     * Excel template for the accountant: a "Notas" sheet with only the header (so an unfilled
     * file is refused instead of issuing a sample nota) and an "Instruções" sheet with the rules.
     */
    public static function gerarModeloXlsx(string $caminho): void
    {
        $negrito = (new Style)->setFontBold();

        $writer = new XlsxWriter;
        $writer->getOptions()->setColumnWidth(24, ...range(1, count(self::COLUNAS)));
        $writer->openToFile($caminho);
        $writer->getCurrentSheet()->setName(self::ABA_NOTAS);
        $writer->addRow(Row::fromValues(self::COLUNAS, $negrito));

        $writer->addNewSheetAndMakeItCurrent()->setName('Instruções');
        $writer->addRow(Row::fromValues(['Como preencher a aba "'.self::ABA_NOTAS.'"'], $negrito));
        foreach ([
            'Uma nota por linha, a partir da linha 2. Não altere nem apague a linha de cabeçalho.',
            'Colunas obrigatórias: tomador_documento, tomador_nome, descricao_servico, codigo_tributacao_nacional e valor_servico. As demais são opcionais.',
            'Se o Excel remover zeros à esquerda (CPF, código, CEP), não tem problema: o sistema recompõe.',
            'Depois de preencher, salve como .xlsx e envie em Lotes de emissão > Novo lote. Use "Conferir" antes de enviar.',
        ] as $texto) {
            $writer->addRow(Row::fromValues([$texto]));
        }

        $writer->addRow(Row::fromValues([]));
        $writer->addRow(Row::fromValues(['Coluna', 'Obrigatória', 'Formato / exemplo'], $negrito));
        foreach ([
            ['tomador_documento', 'Sim', 'CPF (11 dígitos) ou CNPJ (14). Ex.: 12345678909'],
            ['tomador_nome', 'Sim', 'Nome ou razão social. Ex.: Maria da Silva'],
            ['tomador_email', 'Não', 'Ex.: maria@exemplo.com.br'],
            ['descricao_servico', 'Sim', 'Ex.: Consultoria contábil mensal'],
            ['codigo_tributacao_nacional', 'Sim', '6 dígitos. Ex.: 171901'],
            ['valor_servico', 'Sim', 'Maior que zero. Ex.: 1500,00'],
            ['aliquota_iss', 'Não', 'Percentual. Ex.: 2,00'],
            ['iss_retido', 'Não', '1 ou 0 (também aceita sim/não). Padrão: 0'],
            ['data_competencia', 'Não', 'AAAA-MM-DD ou DD/MM/AAAA. Padrão: hoje'],
            ['municipio_prestacao', 'Não', 'Código IBGE de 7 dígitos'],
            ['tomador_cep ... tomador_codigo_municipio', 'Não', 'Endereço do tomador: preencha todos (CEP, logradouro, número, bairro, código IBGE) ou nenhum'],
            ['ibscbs_*', 'Não', 'Reforma tributária: indicador de operação (6), CST (3) e classificação (6), os três juntos ou nenhum'],
        ] as $linha) {
            $writer->addRow(Row::fromValues($linha));
        }

        $writer->close();
    }

    /** Same layout as the CSV of rejected lines, as a spreadsheet to fix and send again. */
    public function xlsxDasRejeitadas(Lote $lote, string $caminho): void
    {
        $negrito = (new Style)->setFontBold();
        $dinheiro = (new Style)->setFormat('#,##0.00');

        $writer = new XlsxWriter;
        $writer->getOptions()->setColumnWidth(24, ...range(1, count(self::COLUNAS) + 1));
        $writer->openToFile($caminho);
        $writer->getCurrentSheet()->setName(self::ABA_NOTAS);
        $writer->addRow(Row::fromValues([...self::COLUNAS, 'motivo'], $negrito));

        $lote->notas()->where('status', NotaFiscal::STATUS_REJEITADA)->orderBy('linha')->each(function (NotaFiscal $nota) use ($writer, $dinheiro) {
            $valores = $this->valoresDoPayload($nota->payload ?? [], fn ($v) => $v === null || $v === '' ? '' : (float) $v);
            $valores[] = implode(' | ', $nota->erros ?? [$nota->motivo_rejeicao]);

            $writer->addRow(new Row(array_map(
                fn ($v, $i) => Cell::fromValue($v, in_array($i, [5, 6], true) ? $dinheiro : null),
                $valores,
                array_keys($valores),
            )));
        });

        $writer->close();
    }

    /**
     * Payload values in the order of COLUNAS.
     *
     * @return array<int, mixed>
     */
    private function valoresDoPayload(array $p, callable $decimal): array
    {
        return [
            $p['tomador_documento'] ?? '',
            $p['tomador_nome'] ?? '',
            $p['tomador_email'] ?? '',
            $p['descricao'] ?? '',
            $p['codigo_tributacao'] ?? '',
            $decimal($p['valor'] ?? null),
            $decimal($p['aliquota'] ?? null),
            ! empty($p['iss_retido']) ? '1' : '0',
            $p['competencia'] ?? '',
            $p['municipio_prestacao'] ?? '',
            $p['tomador_cep'] ?? '',
            $p['tomador_logradouro'] ?? '',
            $p['tomador_numero'] ?? '',
            $p['tomador_complemento'] ?? '',
            $p['tomador_bairro'] ?? '',
            $p['tomador_codigo_municipio'] ?? '',
            $p['ibscbs_codigo_operacao'] ?? '',
            $p['ibscbs_cst'] ?? '',
            $p['ibscbs_classificacao'] ?? '',
        ];
    }

    /**
     * @return array<int, array<string, string>> rows keyed by their row number in the spreadsheet
     */
    private function lerXlsx(string $conteudo): array
    {
        $caminho = tempnam(sys_get_temp_dir(), 'lote');
        file_put_contents($caminho, $conteudo);

        $opcoes = new XlsxOptions;
        $opcoes->SHOULD_PRESERVE_EMPTY_ROWS = true; // keeps row numbers equal to what the user sees in Excel

        $reader = new XlsxReader($opcoes);

        try {
            try {
                $reader->open($caminho);

                $aba = null;
                foreach ($reader->getSheetIterator() as $sheet) {
                    $aba ??= $sheet;
                    if (mb_strtolower($sheet->getName()) === mb_strtolower(self::ABA_NOTAS)) {
                        $aba = $sheet;
                        break;
                    }
                }

                $cabecalho = null;
                $linhas = [];
                $numeroLinha = 0;
                foreach ($aba?->getRowIterator() ?? [] as $row) {
                    $numeroLinha++;
                    $celulas = $row->toArray();

                    if ($cabecalho === null) {
                        $cabecalho = array_map(fn ($nome) => strtolower(trim((string) $nome)), $celulas);
                        $this->exigirColunas($cabecalho);

                        continue;
                    }

                    $linha = [];
                    foreach ($cabecalho as $indice => $nome) {
                        if ($nome !== '') {
                            $linha[$nome] = $this->textoDaCelula($celulas[$indice] ?? null, $nome);
                        }
                    }
                    if (count(array_filter($linha, fn ($c) => $c !== '')) > 0) {
                        $linhas[$numeroLinha] = $linha;
                    }
                }
            } catch (ValidationException $e) {
                throw $e;
            } catch (\Throwable) {
                throw ValidationException::withMessages(['arquivo' => 'Não foi possível ler a planilha. Envie um arquivo .xlsx válido (baixe o modelo para ver o formato).']);
            }

            if ($cabecalho === null) {
                $this->exigirColunas([]);
            }

            return $linhas;
        } finally {
            try {
                $reader->close();
            } catch (\Throwable) {
                // never opened
            }
            @unlink($caminho);
        }
    }

    private function exigirColunas(array $cabecalho): void
    {
        $faltando = array_diff(self::OBRIGATORIAS, $cabecalho);
        if ($faltando) {
            throw ValidationException::withMessages([
                'arquivo' => 'Faltam colunas no cabeçalho: '.implode(', ', $faltando).'. Baixe o modelo para ver o formato esperado.',
            ]);
        }
    }

    /** A spreadsheet cell as the same text the CSV would carry. */
    private function textoDaCelula(mixed $valor, string $coluna): string
    {
        if ($valor instanceof \DateTimeInterface) {
            return $valor->format('Y-m-d');
        }
        if (is_bool($valor)) {
            return $valor ? '1' : '0';
        }
        if (is_float($valor) && floor($valor) === $valor && abs($valor) < 1e15) {
            $valor = (int) $valor;
        }
        if (is_int($valor)) {
            $texto = (string) $valor;
            if ($coluna === 'tomador_documento') {
                return str_pad($texto, strlen($texto) <= 11 ? 11 : 14, '0', STR_PAD_LEFT);
            }

            return isset(self::TAMANHO_DIGITOS[$coluna]) ? str_pad($texto, self::TAMANHO_DIGITOS[$coluna], '0', STR_PAD_LEFT) : $texto;
        }
        if (is_float($valor)) {
            return rtrim(rtrim(sprintf('%.10F', $valor), '0'), '.');
        }

        return trim((string) $valor);
    }

    /**
     * @return array<int, array<string, string>> rows keyed by their line number in the file
     */
    private function ler(string $conteudo): array
    {
        if (str_starts_with($conteudo, "PK\x03\x04")) {
            return $this->lerXlsx($conteudo);
        }

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

        $endereco = [
            'tomador_cep' => preg_replace('/\D/', '', $linha['tomador_cep'] ?? ''),
            'tomador_logradouro' => trim($linha['tomador_logradouro'] ?? ''),
            'tomador_numero' => trim($linha['tomador_numero'] ?? ''),
            'tomador_complemento' => trim($linha['tomador_complemento'] ?? ''),
            'tomador_bairro' => trim($linha['tomador_bairro'] ?? ''),
            'tomador_codigo_municipio' => preg_replace('/\D/', '', $linha['tomador_codigo_municipio'] ?? ''),
        ];

        // Partial addresses are refused: the schema needs all five of these together or none.
        $informados = array_filter($endereco, fn ($v, $k) => $k !== 'tomador_complemento' && $v !== '', ARRAY_FILTER_USE_BOTH);
        if ($informados !== []) {
            if (strlen($endereco['tomador_cep']) !== 8 || strlen($endereco['tomador_codigo_municipio']) !== 7
                || $endereco['tomador_logradouro'] === '' || $endereco['tomador_numero'] === '' || $endereco['tomador_bairro'] === '') {
                $erros[] = 'O endereço do tomador está incompleto: informe CEP (8 dígitos), logradouro, número, bairro e código IBGE do município (7 dígitos), ou deixe tudo em branco.';
            }
        }

        $ibscbs = [
            'ibscbs_codigo_operacao' => preg_replace('/\D/', '', $linha['ibscbs_codigo_operacao'] ?? ''),
            'ibscbs_cst' => preg_replace('/\D/', '', $linha['ibscbs_cst'] ?? ''),
            'ibscbs_classificacao' => preg_replace('/\D/', '', $linha['ibscbs_classificacao'] ?? ''),
        ];
        if (array_filter($ibscbs) !== []) {
            if (strlen($ibscbs['ibscbs_codigo_operacao']) !== 6 || strlen($ibscbs['ibscbs_cst']) !== 3 || strlen($ibscbs['ibscbs_classificacao']) !== 6) {
                $erros[] = 'O grupo IBS/CBS está incompleto: informe o indicador de operação (6 dígitos), o CST (3 dígitos) e a classificação tributária (6 dígitos), ou deixe os três em branco.';
            }
        }

        $payload = [
            ...$endereco,
            ...$ibscbs,
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
