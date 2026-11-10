<?php

namespace Tests\Feature;

use App\Models\Emitente;
use App\Models\Lote;
use App\Models\User;
use App\Services\Nfse\LoteImporter;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use OpenSpout\Common\Entity\Cell;
use OpenSpout\Common\Entity\Row;
use OpenSpout\Common\Entity\Style\Style;
use OpenSpout\Reader\XLSX\Reader;
use OpenSpout\Writer\XLSX\Writer;
use Tests\TestCase;

class LoteExcelTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(RolesAndPermissionsSeeder::class);
    }

    private function admin(): User
    {
        return User::where('email', 'admin@example.com')->first();
    }

    private function emitente(): Emitente
    {
        return Emitente::create([
            'razao_social' => 'Empresa Excel',
            'cnpj' => '11222333000181',
            'codigo_municipio' => '3550308',
            'inscricao_municipal' => '12345',
            'regime_tributario' => 'simples_nacional',
            'ambiente' => 'homologacao',
            'driver' => 'simulador',
            'is_active' => true,
        ]);
    }

    /** Builds an .xlsx the way an accountant's Excel would: numbers as numbers, dates as dates. */
    private function planilha(array $linhas, ?array $cabecalho = null, string $aba = 'Notas'): UploadedFile
    {
        $caminho = tempnam(sys_get_temp_dir(), 'tst').'.xlsx';

        $writer = new Writer;
        $writer->openToFile($caminho);
        $writer->getCurrentSheet()->setName($aba);
        $writer->addRow(Row::fromValues($cabecalho ?? LoteImporter::COLUNAS));
        foreach ($linhas as $linha) {
            $data = (new Style)->setFormat('dd/mm/yyyy');
            $writer->addRow(new Row(array_map(
                fn ($v) => Cell::fromValue($v, $v instanceof \DateTimeInterface ? $data : null),
                $linha,
            )));
        }
        $writer->close();

        return new UploadedFile($caminho, 'lote.xlsx', null, null, true);
    }

    private function linha(array $campos): array
    {
        $base = array_fill_keys(LoteImporter::COLUNAS, '');

        return array_values([...$base, ...$campos]);
    }

    public function test_the_excel_template_downloads_and_goes_back_in_empty_but_valid(): void
    {
        $resposta = $this->actingAs($this->admin())->get(route('lotes.modelo', ['formato' => 'xlsx']))->assertOk();
        $this->assertStringContainsString('modelo-lote-nfse.xlsx', $resposta->headers->get('content-disposition'));

        $caminho = $resposta->baseResponse->getFile()->getPathname();
        $reader = new Reader;
        $reader->open($caminho);
        $abas = [];
        foreach ($reader->getSheetIterator() as $sheet) {
            $abas[$sheet->getName()] = true;
            if ($sheet->getName() === 'Notas') {
                foreach ($sheet->getRowIterator() as $i => $row) {
                    if ($i === 1) {
                        $this->assertSame(LoteImporter::COLUNAS, $row->toArray());
                    }
                }
            }
        }
        $reader->close();
        $this->assertArrayHasKey('Notas', $abas);
        $this->assertArrayHasKey('Instruções', $abas);

        // Sent back untouched it is refused instead of issuing a sample nota.
        $this->actingAs($this->admin())
            ->postJson(route('lotes.previa'), ['emitente_id' => $this->emitente()->id, 'arquivo' => new UploadedFile($caminho, 'modelo.xlsx', null, null, true)])
            ->assertStatus(422)
            ->assertJsonValidationErrors('arquivo');
    }

    public function test_a_filled_spreadsheet_is_previewed_and_sent_like_a_csv(): void
    {
        $emitente = $this->emitente();

        $arquivo = fn () => $this->planilha([
            // Excel-style cells: CPF with lost leading zero, numeric code, real date, decimal value.
            $this->linha(['tomador_documento' => 1234567890, 'tomador_nome' => 'Maria', 'descricao_servico' => 'Consultoria', 'codigo_tributacao_nacional' => 171901, 'valor_servico' => 1500.5, 'aliquota_iss' => 2, 'iss_retido' => 'sim', 'data_competencia' => new \DateTimeImmutable('2026-11-05')]),
            $this->linha(['tomador_documento' => '98765432100', 'tomador_nome' => 'João', 'descricao_servico' => 'Consultoria', 'codigo_tributacao_nacional' => '171901', 'valor_servico' => '250,50']),
            $this->linha(['tomador_documento' => '123', 'tomador_nome' => '', 'descricao_servico' => 'Consultoria', 'codigo_tributacao_nacional' => 17, 'valor_servico' => 0]),
        ]);

        $this->actingAs($this->admin())
            ->post(route('lotes.previa'), ['emitente_id' => $emitente->id, 'arquivo' => $arquivo()])
            ->assertOk()
            ->assertJsonPath('total', 3)
            ->assertJsonPath('validas', 2)
            ->assertJsonPath('invalidas', 1)
            ->assertJsonPath('valor_total', 1751)
            ->assertJsonPath('problemas.0.linha', 4); // Excel row number, header being row 1

        $this->post(route('lotes.store'), ['emitente_id' => $emitente->id, 'arquivo' => $arquivo()])->assertRedirect();

        $lote = Lote::first();
        $this->assertSame(3, $lote->total);
        $primeira = $lote->notas()->orderBy('linha')->first();
        $this->assertSame('01234567890', $primeira->payload['tomador_documento']);
        $this->assertSame('171901', $primeira->payload['codigo_tributacao']);
        $this->assertSame('2026-11-05', $primeira->payload['competencia']);
        $this->assertEquals(1500.5, $primeira->payload['valor']);
        $this->assertTrue($primeira->payload['iss_retido']);
    }

    public function test_the_notas_sheet_is_found_even_when_it_is_not_the_first(): void
    {
        $this->assertSame(0, app(LoteImporter::class)->previa(file_get_contents($this->planilha([
            $this->linha(['tomador_documento' => '98765432100', 'tomador_nome' => 'João', 'descricao_servico' => 'X', 'codigo_tributacao_nacional' => '171901', 'valor_servico' => 10]),
        ], aba: 'Notas')->getRealPath()))['invalidas']);
    }

    public function test_a_spreadsheet_with_wrong_columns_or_that_is_not_one_is_refused(): void
    {
        $emitente = $this->emitente();

        $this->actingAs($this->admin())
            ->postJson(route('lotes.previa'), ['emitente_id' => $emitente->id, 'arquivo' => $this->planilha([['a', 'b']], ['coluna_errada', 'outra'])])
            ->assertStatus(422)
            ->assertJsonValidationErrors('arquivo');

        // Garbage that merely starts like a zip.
        $falso = UploadedFile::fake()->createWithContent('lote.xlsx', "PK\x03\x04 isto nao e uma planilha");
        $this->postJson(route('lotes.previa'), ['emitente_id' => $emitente->id, 'arquivo' => $falso])
            ->assertStatus(422)
            ->assertJsonValidationErrors('arquivo');
    }

    public function test_repeated_lines_are_flagged_as_possible_duplicates(): void
    {
        $emitente = $this->emitente();
        $igual = $this->linha(['tomador_documento' => '98765432100', 'tomador_nome' => 'João', 'descricao_servico' => 'Consultoria', 'codigo_tributacao_nacional' => '171901', 'valor_servico' => '100,00', 'data_competencia' => '2026-11-05']);

        $this->actingAs($this->admin())
            ->post(route('lotes.previa'), ['emitente_id' => $emitente->id, 'arquivo' => $this->planilha([$igual, $igual])])
            ->assertOk()
            ->assertJsonPath('validas', 2)
            ->assertJsonPath('duplicadas.0.linha', 3)
            ->assertJsonPath('duplicadas.0.igual_a', 2);
    }

    public function test_rejected_lines_come_back_as_excel_ready_to_fix_and_resend(): void
    {
        $emitente = $this->emitente();
        $this->actingAs($this->admin())->post(route('lotes.store'), ['emitente_id' => $emitente->id, 'arquivo' => $this->planilha([
            $this->linha(['tomador_documento' => '98765432100', 'tomador_nome' => 'João', 'descricao_servico' => 'X', 'codigo_tributacao_nacional' => '171901', 'valor_servico' => 10]),
            $this->linha(['tomador_documento' => '123', 'tomador_nome' => 'Ruim', 'descricao_servico' => 'X', 'codigo_tributacao_nacional' => '171901', 'valor_servico' => 25.5]),
        ])]);

        $resposta = $this->get(route('lotes.rejeitadas', ['lote' => Lote::first(), 'formato' => 'xlsx']))->assertOk();
        $caminho = $resposta->baseResponse->getFile()->getPathname();

        $conteudo = file_get_contents($caminho);
        $this->assertStringStartsWith("PK", $conteudo);

        $previa = app(LoteImporter::class)->previa($conteudo);
        $this->assertSame(1, $previa['total'], 'only the rejected line, and the motivo column does not get in the way');
        $this->assertSame(1, $previa['invalidas']);
        $this->assertStringContainsString('documento do tomador', $previa['problemas'][0]['erros'][0]);
    }
}
