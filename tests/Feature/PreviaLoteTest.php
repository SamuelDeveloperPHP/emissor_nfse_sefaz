<?php

namespace Tests\Feature;

use App\Models\Emitente;
use App\Models\Lote;
use App\Models\User;
use App\Services\Nfse\LoteImporter;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class PreviaLoteTest extends TestCase
{
    use RefreshDatabase;

    private int $contador = 0;

    private const CABECALHO = 'tomador_documento;tomador_nome;tomador_email;descricao_servico;codigo_tributacao_nacional;valor_servico;aliquota_iss;iss_retido;data_competencia;municipio_prestacao';

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
            'razao_social' => 'Empresa '.++$this->contador,
            'cnpj' => sprintf('112223%08d', $this->contador),
            'codigo_municipio' => '3550308',
            'inscricao_municipal' => '12345',
            'regime_tributario' => 'simples_nacional',
            'ambiente' => 'homologacao',
            'driver' => 'simulador',
            'is_active' => true,
        ]);
    }

    private function csv(array $linhas, string $cabecalho = self::CABECALHO): UploadedFile
    {
        return UploadedFile::fake()->createWithContent('lote.csv', $cabecalho."\n".implode("\n", $linhas)."\n");
    }

    private function arquivoMisto(): UploadedFile
    {
        return $this->csv([
            '12345678909;Maria;;Consultoria;171901;100,00;2,00;0;2026-11-05;',   // linha 2: ok
            '123;;;Consultoria;171901;100,00;;0;;',                              // linha 3: documento e nome
            '12345678909;=HYPERLINK("x");;Serviço;17;0;;0;;',                     // linha 4: código e valor
            '98765432100;João;;Consultoria;171901;250,50;;1;;',                  // linha 5: ok
        ]);
    }

    public function test_the_preview_counts_good_and_bad_lines_and_creates_nothing(): void
    {
        $emitente = $this->emitente();

        $resposta = $this->actingAs($this->admin())
            ->post(route('lotes.previa'), ['emitente_id' => $emitente->id, 'arquivo' => $this->arquivoMisto()])
            ->assertOk()
            ->assertJsonPath('total', 4)
            ->assertJsonPath('validas', 2)
            ->assertJsonPath('invalidas', 2)
            ->assertJsonPath('valor_total', 350.5)
            ->assertJsonPath('truncado', false);

        $problemas = $resposta->json('problemas');
        $this->assertSame([3, 4], array_column($problemas, 'linha'));
        $this->assertCount(2, $problemas[0]['erros']);
        $this->assertSame(0, Lote::count());
    }

    public function test_the_preview_refuses_files_with_missing_columns_and_other_peoples_emitentes(): void
    {
        $meu = $this->emitente();
        $outro = $this->emitente();

        $this->actingAs($this->admin())
            ->postJson(route('lotes.previa'), ['emitente_id' => $meu->id, 'arquivo' => $this->csv(['a;b'], 'coluna_errada;outra')])
            ->assertStatus(422)
            ->assertJsonValidationErrors('arquivo');

        $operador = User::factory()->create(['all_emitentes' => false]);
        $operador->syncRoles(['Operador']);
        $operador->givePermissionTo('lotes-emissao.create');
        $operador->emitentes()->attach($meu->id);

        $this->actingAs($operador)
            ->post(route('lotes.previa'), ['emitente_id' => $outro->id, 'arquivo' => $this->arquivoMisto()])
            ->assertForbidden();

        $semPermissao = User::factory()->create(['all_emitentes' => true]);
        $semPermissao->syncRoles(['Operador']);
        $this->actingAs($semPermissao)
            ->post(route('lotes.previa'), ['emitente_id' => $meu->id, 'arquivo' => $this->arquivoMisto()])
            ->assertForbidden();
    }

    public function test_only_problem_lines_come_back_in_the_rejected_csv_ready_to_fix_and_resend(): void
    {
        $emitente = $this->emitente();
        $admin = $this->admin();

        $this->actingAs($admin)->post(route('lotes.store'), ['emitente_id' => $emitente->id, 'arquivo' => $this->arquivoMisto()]);
        $lote = Lote::first();

        $resposta = $this->get(route('lotes.rejeitadas', $lote))->assertOk();
        $this->assertStringContainsString('text/csv', $resposta->headers->get('content-type'));
        $csv = $resposta->streamedContent();

        $linhas = array_values(array_filter(explode("\n", ltrim($csv, "\xEF\xBB\xBF"))));
        $this->assertCount(3, $linhas, 'header plus the two rejected lines');
        $this->assertStringEndsWith(';motivo', $linhas[0]);
        $this->assertStringContainsString('documento do tomador', $linhas[1]);
        $this->assertStringNotContainsString('Maria', $csv);
        $this->assertStringNotContainsString('João', $csv);

        // A spreadsheet must not run the pasted "=HYPERLINK(...)" as a formula.
        $this->assertStringContainsString("'=HYPERLINK", $csv);

        // The extra motivo column does not stop the same file from being sent again.
        $this->assertSame(2, app(LoteImporter::class)->previa($csv)['total']);
    }

    public function test_the_rejected_csv_is_only_for_users_who_can_see_the_lote(): void
    {
        $emitente = $this->emitente();
        $outro = $this->emitente();

        $this->actingAs($this->admin())->post(route('lotes.store'), ['emitente_id' => $emitente->id, 'arquivo' => $this->arquivoMisto()]);
        $lote = Lote::first();

        $operador = User::factory()->create(['all_emitentes' => false]);
        $operador->syncRoles(['Operador']);
        $operador->givePermissionTo('lotes-emissao.view');
        $operador->emitentes()->attach($outro->id);

        $this->actingAs($operador)->get(route('lotes.rejeitadas', $lote))->assertForbidden();
    }
}
