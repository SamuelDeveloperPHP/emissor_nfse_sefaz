<?php

namespace Tests\Feature;

use App\Models\Emitente;
use App\Models\Lote;
use App\Models\Recorrencia;
use App\Models\Servico;
use App\Models\Tomador;
use App\Models\User;
use App\Services\Nfse\DpsBuilder;
use App\Services\Nfse\EmitirRecorrencias;
use App\Services\Nfse\LoteImporter;
use App\Services\Nfse\XsdValidator;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class IbsCbsTest extends TestCase
{
    use RefreshDatabase;

    // Format-valid sample codes. They are not claimed to be real combinations: the ADN judges those.
    private const CODIGOS = ['ibscbs_codigo_operacao' => '010101', 'ibscbs_cst' => '000', 'ibscbs_classificacao' => '000001'];

    private int $contador = 0;

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
            'regime_tributario' => 'lucro_presumido',
            'ambiente' => 'homologacao',
            'driver' => 'simulador',
            'is_active' => true,
        ]);
    }

    private function payload(array $extra = []): array
    {
        return array_merge([
            'tomador_documento' => '12345678909', 'tomador_nome' => 'Fulano', 'descricao' => 'Serviço',
            'codigo_tributacao' => '171901', 'valor' => 100, 'aliquota' => 2.0, 'iss_retido' => false, 'competencia' => '2026-11-05',
        ], $extra);
    }

    private function linha(array $extra = []): array
    {
        return array_merge([
            'tomador_documento' => '12345678909', 'tomador_nome' => 'Fulano', 'descricao_servico' => 'Serviço',
            'codigo_tributacao_nacional' => '171901', 'valor_servico' => '100,00',
        ], $extra);
    }

    // ---- DPS ----------------------------------------------------------------------------------

    public function test_the_group_goes_after_valores_and_passes_the_official_xsd(): void
    {
        $xml = (new DpsBuilder)->build($this->emitente(), $this->payload(self::CODIGOS), 1);

        $this->assertSame([], (new XsdValidator)->validarDps($xml));
        $this->assertStringContainsString(
            '<IBSCBS><finNFSe>0</finNFSe><cIndOp>010101</cIndOp><indDest>0</indDest><valores><trib><gIBSCBS><CST>000</CST><cClassTrib>000001</cClassTrib></gIBSCBS></trib></valores></IBSCBS></infDPS>',
            $xml
        );
        $this->assertGreaterThan(strpos($xml, '</valores>'), strpos($xml, '<IBSCBS>'), 'IBSCBS follows the valores group');
    }

    public function test_without_all_three_codes_the_dps_has_no_group(): void
    {
        $builder = new DpsBuilder;
        $emitente = $this->emitente();

        $this->assertStringNotContainsString('IBSCBS', $builder->build($emitente, $this->payload(), 1));
        $this->assertStringNotContainsString('IBSCBS', $builder->build($emitente, $this->payload(['ibscbs_cst' => '000']), 1));
        $this->assertStringNotContainsString('IBSCBS', $builder->build($emitente, $this->payload([...self::CODIGOS, 'ibscbs_cst' => '']), 1));
    }

    // ---- validation of the codes -------------------------------------------------------------------

    public function test_partial_or_malformed_codes_are_refused_on_import(): void
    {
        $importer = app(LoteImporter::class);

        [, $erros] = $importer->normalizar($this->linha(['ibscbs_cst' => '000']));
        $this->assertCount(1, $erros);
        $this->assertStringContainsString('IBS/CBS está incompleto', $erros[0]);

        [, $erros] = $importer->normalizar($this->linha([...self::CODIGOS, 'ibscbs_cst' => '00']));
        $this->assertCount(1, $erros);

        [$payload, $erros] = $importer->normalizar($this->linha(['ibscbs_codigo_operacao' => '01.01.01', 'ibscbs_cst' => '000', 'ibscbs_classificacao' => '000-001']));
        $this->assertSame([], $erros);
        $this->assertSame('010101', $payload['ibscbs_codigo_operacao']);
        $this->assertSame('000001', $payload['ibscbs_classificacao']);

        [, $erros] = $importer->normalizar($this->linha());
        $this->assertSame([], $erros, 'leaving all three blank is fine');
    }

    // ---- services --------------------------------------------------------------------------------

    public function test_a_service_stores_the_codes_all_or_none(): void
    {
        $emitente = $this->emitente();
        $dados = ['emitente_id' => $emitente->id, 'nome' => 'Honorários', 'descricao' => 'Honorários mensais', 'codigo_tributacao' => '171901', 'iss_retido' => false];

        $this->actingAs($this->admin());

        $this->post(route('servicos.store'), [...$dados, ...self::CODIGOS])->assertSessionHasNoErrors();
        $servico = Servico::first();
        $this->assertSame('010101', $servico->ibscbs_codigo_operacao);
        $this->assertSame('000', $servico->ibscbs_cst);
        $this->assertSame('000001', $servico->ibscbs_classificacao);

        $this->post(route('servicos.store'), [...$dados, 'nome' => 'Só um código', 'ibscbs_cst' => '000'])
            ->assertSessionHasErrors(['ibscbs_codigo_operacao', 'ibscbs_classificacao']);
        $this->post(route('servicos.store'), [...$dados, ...self::CODIGOS, 'ibscbs_cst' => '12'])->assertSessionHasErrors('ibscbs_cst');

        $this->post(route('servicos.store'), [...$dados, 'nome' => 'Sem IBS'])->assertSessionHasNoErrors();
        $this->assertNull(Servico::where('nome', 'Sem IBS')->first()->ibscbs_cst);

        $this->put(route('servicos.update', $servico), [...$dados, 'ibscbs_codigo_operacao' => '', 'ibscbs_cst' => '', 'ibscbs_classificacao' => ''])->assertSessionHasNoErrors();
        $this->assertNull($servico->fresh()->ibscbs_cst, 'clearing all three removes the group');
    }

    // ---- end to end ------------------------------------------------------------------------------

    public function test_a_single_emission_carries_the_codes_into_the_stored_dps(): void
    {
        $emitente = $this->emitente();

        $this->actingAs($this->admin())->post(route('lotes.emitir.store'), [
            'emitente_id' => $emitente->id,
            'tomador_documento' => '12345678909', 'tomador_nome' => 'Fulano', 'descricao_servico' => 'Serviço',
            'codigo_tributacao_nacional' => '171901', 'valor_servico' => '100,00', 'aliquota_iss' => '2,00', 'iss_retido' => false,
            ...self::CODIGOS,
        ])->assertSessionHasNoErrors();

        $nota = Lote::first()->notas()->first();
        $this->assertSame('010101', $nota->payload['ibscbs_codigo_operacao']);
        $this->assertStringContainsString('<cClassTrib>000001</cClassTrib>', $nota->dps_xml);
        $this->assertSame('autorizada', $nota->status);
    }

    public function test_a_csv_with_the_columns_produces_the_group_and_a_partial_line_is_rejected(): void
    {
        $emitente = $this->emitente();
        $cabecalho = 'tomador_documento;tomador_nome;descricao_servico;codigo_tributacao_nacional;valor_servico;ibscbs_codigo_operacao;ibscbs_cst;ibscbs_classificacao';
        $arquivo = UploadedFile::fake()->createWithContent('lote.csv', $cabecalho."\n"
            ."12345678909;Maria;Serviço;171901;100,00;010101;000;000001\n"
            ."12345678909;João;Serviço;171901;100,00;010101;;\n");

        $this->actingAs($this->admin())->post(route('lotes.store'), ['emitente_id' => $emitente->id, 'arquivo' => $arquivo])->assertSessionHasNoErrors();

        $notas = Lote::first()->notas()->orderBy('linha')->get();
        $this->assertSame('autorizada', $notas[0]->status);
        $this->assertStringContainsString('<IBSCBS>', $notas[0]->dps_xml);
        $this->assertSame('rejeitada', $notas[1]->status);
        $this->assertStringContainsString('IBS/CBS', $notas[1]->motivo_rejeicao);
    }

    public function test_recurring_notas_use_the_codes_of_their_service(): void
    {
        $this->travelTo(now()->setDate(2026, 11, 10)->setTime(6, 0));
        $emitente = $this->emitente();
        $tomador = Tomador::create(['emitente_id' => $emitente->id, 'documento' => '12345678909', 'nome' => 'Maria']);
        $servico = Servico::create(['emitente_id' => $emitente->id, 'nome' => 'Honorários', 'descricao' => 'Honorários', 'codigo_tributacao' => '171901', ...self::CODIGOS]);
        Recorrencia::create([
            'emitente_id' => $emitente->id, 'tomador_id' => $tomador->id, 'servico_id' => $servico->id, 'valor' => 100,
            'dia_do_mes' => 10, 'ambiente' => 'homologacao', 'ativa' => true, 'proxima_emissao' => '2026-11-10',
        ]);

        app(EmitirRecorrencias::class)->executar();

        $nota = Lote::first()->notas()->first();
        $this->assertSame('010101', $nota->payload['ibscbs_codigo_operacao']);
        $this->assertStringContainsString('<CST>000</CST>', $nota->dps_xml);
    }

    public function test_the_rejected_csv_and_the_template_keep_the_new_columns(): void
    {
        $this->assertContains('ibscbs_cst', LoteImporter::COLUNAS);

        $cabecalho = explode(';', explode("\n", ltrim(LoteImporter::modeloCsv(), "\xEF\xBB\xBF"))[0]);
        $exemplo = explode(';', explode("\n", ltrim(LoteImporter::modeloCsv(), "\xEF\xBB\xBF"))[1]);
        $this->assertCount(count($cabecalho), $exemplo);
    }
}
