<?php

namespace Tests\Feature;

use App\Models\Emitente;
use App\Models\Lote;
use App\Models\NotaFiscal;
use App\Models\User;
use App\Services\Nfse\DpsBuilder;
use App\Services\Nfse\XsdValidator;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class LotesTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(RolesAndPermissionsSeeder::class);
    }

    private function emitente(string $cnpj = '11222333000181', string $driver = 'simulador', string $regime = 'simples_nacional'): Emitente
    {
        return Emitente::create([
            'razao_social' => 'Empresa '.$cnpj,
            'cnpj' => $cnpj,
            'codigo_municipio' => '3550308',
            'inscricao_municipal' => '12345',
            'regime_tributario' => $regime,
            'ambiente' => 'homologacao',
            'driver' => $driver,
            'is_active' => true,
        ]);
    }

    private function csv(array $linhas): UploadedFile
    {
        $cabecalho = 'tomador_documento;tomador_nome;tomador_email;descricao_servico;codigo_tributacao_nacional;valor_servico;aliquota_iss;iss_retido;data_competencia;municipio_prestacao';

        return UploadedFile::fake()->createWithContent('lote.csv', $cabecalho."\n".implode("\n", $linhas)."\n");
    }

    private function payload(array $override = []): array
    {
        return array_merge([
            'tomador_documento' => '12345678909',
            'tomador_nome' => 'Fulano de Tal',
            'tomador_email' => 'fulano@exemplo.com.br',
            'descricao' => 'Consultoria contábil',
            'codigo_tributacao' => '171901',
            'valor' => 1500.5,
            'aliquota' => 2.0,
            'iss_retido' => false,
            'competencia' => '2026-11-05',
        ], $override);
    }

    public function test_generated_dps_passes_the_official_xsd(): void
    {
        $xml = (new DpsBuilder)->build($this->emitente(), $this->payload(), 7);

        $this->assertSame([], (new XsdValidator)->validarDps($xml));
        $this->assertStringContainsString('<nDPS>7</nDPS>', $xml);
        // DPS + município emissor (7) + tipo de inscrição CNPJ (1) + CNPJ (14) + série (5) + nDPS (15)
        $this->assertStringContainsString('Id="DPS'.'3550308'.'1'.'11222333000181'.'00001'.'000000000000007"', $xml);
    }

    public function test_every_regime_and_a_company_tomador_pass_the_official_xsd(): void
    {
        foreach (['mei' => '11222333000181', 'simples_nacional' => '11444777000161', 'lucro_presumido' => '45723174000110'] as $regime => $cnpj) {
            $xml = (new DpsBuilder)->build($this->emitente($cnpj, 'simulador', $regime), $this->payload([
                'tomador_documento' => '11444777000161',
                'iss_retido' => true,
            ]), 1);

            $this->assertSame([], (new XsdValidator)->validarDps($xml), "regime {$regime}");
        }
    }

    public function test_validator_reports_schema_violations(): void
    {
        $xml = (new DpsBuilder)->build($this->emitente(), $this->payload(['codigo_tributacao' => '12']), 1);

        $erros = (new XsdValidator)->validarDps($xml);

        $this->assertCount(1, $erros);
        $this->assertStringContainsString('cTribNac', $erros[0]);
    }

    public function test_uploading_a_csv_creates_the_lote_and_processes_every_line(): void
    {
        $emitente = $this->emitente();
        $admin = User::where('email', 'admin@example.com')->first();

        $response = $this->actingAs($admin)->post(route('lotes.store'), [
            'emitente_id' => $emitente->id,
            'arquivo' => $this->csv([
                '12345678909;Maria da Silva;maria@x.com;Consultoria mensal;171901;1.500,00;2,00;0;2026-11-05;',
                '11444777000161;Empresa Cliente Ltda;;Treinamento;171901;800.50;;1;05/11/2026;',
                '123;Sem Documento;;Serviço;171901;100;;0;;',
                '12345678909;Código Curto;;Serviço;12;100;;0;;',
            ]),
        ]);

        $lote = Lote::first();
        $response->assertRedirect(route('lotes.show', $lote));

        $this->assertSame(4, $lote->total);
        $this->assertSame(Lote::STATUS_CONCLUIDO_COM_ERROS, $lote->status);
        $this->assertSame(
            [NotaFiscal::STATUS_AUTORIZADA => 2, NotaFiscal::STATUS_PENDENTE => 0, NotaFiscal::STATUS_REJEITADA => 2, NotaFiscal::STATUS_CANCELADA => 0],
            $lote->contagemPorStatus()
        );

        $primeira = $lote->notas()->orderBy('linha')->first();
        $this->assertSame('1', $primeira->numero);
        $this->assertNotNull($primeira->dps_xml);
        $this->assertSame(1500.0, (float) $primeira->valor_servicos);

        $this->assertSame(2, $emitente->fresh()->rps_numero_atual);
        $this->assertStringContainsString('11 dígitos', $lote->notas()->where('linha', 4)->first()->erros[0]);
    }

    public function test_driver_without_transmission_leaves_valid_notes_pending(): void
    {
        $emitente = $this->emitente('11222333000181', 'adn_nacional');

        $this->actingAs(User::where('email', 'admin@example.com')->first())->post(route('lotes.store'), [
            'emitente_id' => $emitente->id,
            'arquivo' => $this->csv(['12345678909;Maria;;Consultoria;171901;100;;0;;']),
        ]);

        $lote = Lote::first();
        $this->assertSame(Lote::STATUS_AGUARDANDO_TRANSMISSAO, $lote->status);
        $this->assertSame(NotaFiscal::STATUS_PENDENTE, $lote->notas()->first()->status);
        $this->assertNotNull($lote->notas()->first()->dps_xml);
    }

    public function test_csv_with_missing_columns_is_refused(): void
    {
        $emitente = $this->emitente();

        $this->actingAs(User::where('email', 'admin@example.com')->first())
            ->post(route('lotes.store'), [
                'emitente_id' => $emitente->id,
                'arquivo' => UploadedFile::fake()->createWithContent('lote.csv', "nome;valor\nA;1\n"),
            ])
            ->assertSessionHasErrors('arquivo');

        $this->assertSame(0, Lote::count());
    }

    public function test_user_cannot_send_a_lote_for_an_emitente_they_cannot_access(): void
    {
        $permitido = $this->emitente('11222333000181');
        $bloqueado = $this->emitente('11444777000161');

        $operador = User::factory()->create(['all_emitentes' => false]);
        $operador->syncRoles(['Operador']);
        $operador->givePermissionTo(['lotes-emissao.view', 'lotes-emissao.create']);
        $operador->emitentes()->attach($permitido->id);

        $this->actingAs($operador)->post(route('lotes.store'), [
            'emitente_id' => $bloqueado->id,
            'arquivo' => $this->csv(['12345678909;Maria;;Consultoria;171901;100;;0;;']),
        ])->assertForbidden();

        $this->assertSame(0, Lote::count());
    }

    public function test_lote_pages_render_for_the_owner_and_hide_other_emitentes(): void
    {
        $permitido = $this->emitente('11222333000181');
        $bloqueado = $this->emitente('11444777000161');

        $loteBloqueado = Lote::create(['emitente_id' => $bloqueado->id, 'arquivo' => 'x.csv', 'total' => 0, 'status' => 'concluido']);
        $lotePermitido = Lote::create(['emitente_id' => $permitido->id, 'arquivo' => 'y.csv', 'total' => 0, 'status' => 'concluido']);

        $operador = User::factory()->create(['all_emitentes' => false]);
        $operador->syncRoles(['Operador']);
        $operador->givePermissionTo(['lotes-emissao.view']);
        $operador->emitentes()->attach($permitido->id);

        $this->actingAs($operador);

        $this->get(route('lotes.show', $lotePermitido))->assertOk();
        $this->get(route('lotes.show', $loteBloqueado))->assertForbidden();
        $this->get(route('lotes.index'))->assertOk()->assertInertia(
            fn ($page) => $page->component('Fiscal/Lotes/index')->has('lotes', 1)
        );
    }

    private function notaIndividual(Emitente $emitente, array $override = []): array
    {
        return array_merge([
            'emitente_id' => $emitente->id,
            'tomador_documento' => '123.456.789-09',
            'tomador_nome' => 'Maria da Silva',
            'tomador_email' => 'maria@exemplo.com.br',
            'descricao_servico' => 'Consultoria contábil',
            'codigo_tributacao_nacional' => '171901',
            'valor_servico' => '1.500,00',
            'aliquota_iss' => '2,00',
            'iss_retido' => false,
            'data_competencia' => '2026-11-05',
        ], $override);
    }

    public function test_single_note_is_issued_through_the_same_pipeline(): void
    {
        $emitente = $this->emitente();

        $response = $this->actingAs(User::where('email', 'admin@example.com')->first())
            ->post(route('lotes.emitir.store'), $this->notaIndividual($emitente));

        $lote = Lote::first();
        $response->assertRedirect(route('lotes.show', $lote));

        $this->assertSame('Emissão individual', $lote->arquivo);
        $this->assertSame(Lote::STATUS_CONCLUIDO, $lote->status);

        $nota = $lote->notas()->first();
        $this->assertSame(NotaFiscal::STATUS_AUTORIZADA, $nota->status);
        $this->assertSame('1', $nota->numero);
        $this->assertSame(1500.0, (float) $nota->valor_servicos);
        $this->assertSame('12345678909', $nota->payload['tomador_documento']);
    }

    public function test_single_note_with_invalid_data_shows_the_errors_and_creates_nothing(): void
    {
        $emitente = $this->emitente();

        $this->actingAs(User::where('email', 'admin@example.com')->first())
            ->post(route('lotes.emitir.store'), $this->notaIndividual($emitente, ['tomador_documento' => '123', 'codigo_tributacao_nacional' => '12']))
            ->assertSessionHasErrors('nota');

        $this->assertSame(0, Lote::count());
    }

    public function test_single_note_requires_the_emitir_permission_and_emitente_access(): void
    {
        $permitido = $this->emitente('11222333000181');
        $bloqueado = $this->emitente('11444777000161');

        $operador = User::factory()->create(['all_emitentes' => false]);
        $operador->syncRoles(['Operador']);
        $operador->emitentes()->attach($permitido->id);

        $this->actingAs($operador)->get(route('lotes.emitir'))->assertForbidden();

        $operador->givePermissionTo(['nfse-avulsa.view', 'nfse-avulsa.create']);

        $this->get(route('lotes.emitir'))->assertOk()->assertInertia(
            fn ($page) => $page->component('Fiscal/Lotes/emitir')->has('emitentes', 1)
        );
        $this->post(route('lotes.emitir.store'), $this->notaIndividual($bloqueado))->assertForbidden();
        $this->assertSame(0, Lote::count());
    }

    public function test_csv_template_downloads(): void
    {
        $this->actingAs(User::where('email', 'admin@example.com')->first())
            ->get(route('lotes.modelo'))
            ->assertOk()
            ->assertHeader('content-disposition', 'attachment; filename="modelo-lote-nfse.csv"');
    }
}
