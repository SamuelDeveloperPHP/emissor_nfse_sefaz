<?php

namespace Tests\Feature;

use App\Models\Emitente;
use App\Models\Servico;
use App\Models\Tomador;
use App\Models\User;
use App\Services\Nfse\DpsBuilder;
use App\Services\Nfse\LoteImporter;
use App\Services\Nfse\XsdValidator;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TomadoresServicosTest extends TestCase
{
    use RefreshDatabase;

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
            'regime_tributario' => 'simples_nacional',
            'ambiente' => 'homologacao',
            'driver' => 'simulador',
            'is_active' => true,
        ]);
    }

    private function operador(array $permissoes, Emitente ...$emitentes): User
    {
        $operador = User::factory()->create(['all_emitentes' => false]);
        $operador->syncRoles(['Operador']);
        $operador->givePermissionTo($permissoes);
        $operador->emitentes()->attach(array_map(fn ($e) => $e->id, $emitentes));

        return $operador;
    }

    private function dadosTomador(Emitente $emitente, array $extra = []): array
    {
        return array_merge([
            'emitente_id' => $emitente->id,
            'documento' => '123.456.789-09',
            'nome' => 'Maria da Silva',
            'email' => 'maria@exemplo.com.br',
        ], $extra);
    }

    // ---- tomadores ---------------------------------------------------------------------------

    public function test_tomadores_are_created_with_digits_only_and_listed_for_the_user(): void
    {
        $emitente = $this->emitente();

        $this->actingAs($this->admin())->post(route('tomadores.store'), $this->dadosTomador($emitente, ['cep' => '01310-100', 'codigo_municipio' => '3550308']))
            ->assertSessionHasNoErrors();

        $tomador = Tomador::first();
        $this->assertSame('12345678909', $tomador->documento);
        $this->assertSame('01310100', $tomador->cep);

        $this->get(route('tomadores.index'))->assertOk()->assertInertia(
            fn ($page) => $page->component('Fiscal/Tomadores/index')->has('tomadores', 1)->has('emitentes', 1)
        );
    }

    public function test_the_same_document_cannot_repeat_in_one_emitente_but_can_in_another(): void
    {
        $a = $this->emitente();
        $b = $this->emitente();
        $admin = $this->admin();

        $this->actingAs($admin)->post(route('tomadores.store'), $this->dadosTomador($a))->assertSessionHasNoErrors();
        $this->post(route('tomadores.store'), $this->dadosTomador($a))->assertSessionHasErrors('documento');
        $this->post(route('tomadores.store'), $this->dadosTomador($b))->assertSessionHasNoErrors();
        $this->post(route('tomadores.store'), $this->dadosTomador($a, ['documento' => '123']))->assertSessionHasErrors('documento');

        $this->assertSame(2, Tomador::count());
    }

    public function test_tomadores_update_and_delete(): void
    {
        $emitente = $this->emitente();
        $tomador = Tomador::create(['emitente_id' => $emitente->id, 'documento' => '12345678909', 'nome' => 'Antigo']);

        $this->actingAs($this->admin())
            ->put(route('tomadores.update', $tomador), $this->dadosTomador($emitente, ['nome' => 'Novo Nome']))
            ->assertSessionHasNoErrors();
        $this->assertSame('Novo Nome', $tomador->fresh()->nome);

        $this->delete(route('tomadores.destroy', $tomador))->assertRedirect();
        $this->assertSame(0, Tomador::count());
    }

    public function test_users_only_reach_tomadores_and_servicos_of_their_emitentes_and_permissions(): void
    {
        $meu = $this->emitente();
        $outro = $this->emitente();
        $deles = Tomador::create(['emitente_id' => $outro->id, 'documento' => '12345678909', 'nome' => 'Cliente alheio']);
        $servicoDeles = Servico::create(['emitente_id' => $outro->id, 'nome' => 'Alheio', 'descricao' => 'Descrição', 'codigo_tributacao' => '171901']);

        $operador = $this->operador(['tomadores.view', 'tomadores.create', 'tomadores.edit', 'tomadores.delete', 'servicos.view', 'servicos.create'], $meu);

        $this->actingAs($operador)->get(route('tomadores.index'))->assertInertia(fn ($page) => $page->has('tomadores', 0));

        $this->post(route('tomadores.store'), $this->dadosTomador($outro))->assertForbidden();
        $this->put(route('tomadores.update', $deles), $this->dadosTomador($meu))->assertForbidden();
        $this->delete(route('tomadores.destroy', $deles))->assertForbidden();
        $this->post(route('servicos.store'), ['emitente_id' => $outro->id, 'nome' => 'X', 'descricao' => 'Descrição', 'codigo_tributacao' => '171901', 'iss_retido' => false])->assertForbidden();
        $this->delete(route('servicos.destroy', $servicoDeles))->assertForbidden(); // no servicos.delete permission

        // Without the module permission the screen itself is closed.
        $semPermissao = $this->operador([], $meu);
        $this->actingAs($semPermissao)->get(route('tomadores.index'))->assertForbidden();
        $this->get(route('servicos.index'))->assertForbidden();
    }

    // ---- servicos ----------------------------------------------------------------------------

    public function test_servicos_accept_a_comma_aliquota_and_validate_the_code(): void
    {
        $emitente = $this->emitente();
        $dados = ['emitente_id' => $emitente->id, 'nome' => 'Honorários', 'descricao' => 'Honorários contábeis mensais', 'codigo_tributacao' => '17.19.01', 'aliquota' => '2,5', 'iss_retido' => true];

        $this->actingAs($this->admin())->post(route('servicos.store'), $dados)->assertSessionHasNoErrors();

        $servico = Servico::first();
        $this->assertSame('171901', $servico->codigo_tributacao);
        $this->assertSame('2.50', $servico->aliquota);
        $this->assertTrue($servico->iss_retido);

        $this->post(route('servicos.store'), [...$dados, 'codigo_tributacao' => '123'])->assertSessionHasErrors('codigo_tributacao');
        $this->post(route('servicos.store'), [...$dados, 'aliquota' => '150'])->assertSessionHasErrors('aliquota');

        $this->put(route('servicos.update', $servico), [...$dados, 'nome' => 'Honorários 2'])->assertSessionHasNoErrors();
        $this->assertSame('Honorários 2', $servico->fresh()->nome);
        $this->delete(route('servicos.destroy', $servico));
        $this->assertSame(0, Servico::count());
    }

    public function test_the_single_emission_screen_offers_only_registered_data_of_visible_emitentes(): void
    {
        $meu = $this->emitente();
        $outro = $this->emitente();
        Tomador::create(['emitente_id' => $meu->id, 'documento' => '12345678909', 'nome' => 'Meu cliente']);
        Tomador::create(['emitente_id' => $outro->id, 'documento' => '98765432100', 'nome' => 'Cliente alheio']);
        Servico::create(['emitente_id' => $meu->id, 'nome' => 'Meu serviço', 'descricao' => 'Descrição', 'codigo_tributacao' => '171901']);
        Servico::create(['emitente_id' => $outro->id, 'nome' => 'Serviço alheio', 'descricao' => 'Descrição', 'codigo_tributacao' => '171901']);

        $operador = $this->operador(['nfse-avulsa.view'], $meu);

        $this->actingAs($operador)->get(route('lotes.emitir'))->assertOk()->assertInertia(
            fn ($page) => $page->has('tomadores', 1)->where('tomadores.0.nome', 'Meu cliente')->has('servicos', 1)->where('servicos.0.nome', 'Meu serviço')
        );
    }

    // ---- address in the DPS ----------------------------------------------------------------------

    private function payload(array $extra = []): array
    {
        return array_merge([
            'tomador_documento' => '12345678909', 'tomador_nome' => 'Fulano', 'descricao' => 'Serviço',
            'codigo_tributacao' => '171901', 'valor' => 100, 'aliquota' => 2.0, 'iss_retido' => false, 'competencia' => '2026-11-05',
        ], $extra);
    }

    public function test_a_complete_tomador_address_goes_into_the_dps_and_passes_the_official_xsd(): void
    {
        $xml = (new DpsBuilder)->build($this->emitente(), $this->payload([
            'tomador_cep' => '01310100', 'tomador_logradouro' => 'Avenida Paulista', 'tomador_numero' => '1000',
            'tomador_complemento' => 'Sala 12', 'tomador_bairro' => 'Bela Vista', 'tomador_codigo_municipio' => '3550308',
        ]), 1);

        $this->assertSame([], (new XsdValidator)->validarDps($xml));
        $this->assertStringContainsString('<endNac><cMun>3550308</cMun><CEP>01310100</CEP></endNac>', $xml);
        $this->assertStringContainsString('<xLgr>Avenida Paulista</xLgr><nro>1000</nro><xCpl>Sala 12</xCpl><xBairro>Bela Vista</xBairro>', $xml);
    }

    public function test_without_an_address_the_dps_has_no_end_group(): void
    {
        $xml = (new DpsBuilder)->build($this->emitente(), $this->payload(), 1);

        $this->assertStringNotContainsString('<end>', $xml);
        $this->assertSame([], (new XsdValidator)->validarDps($xml));
    }

    public function test_a_partial_address_is_refused_with_a_clear_message(): void
    {
        $importer = app(LoteImporter::class);
        $linha = [
            'tomador_documento' => '12345678909', 'tomador_nome' => 'Fulano', 'descricao_servico' => 'Serviço', 'codigo_tributacao_nacional' => '171901',
            'valor_servico' => '100,00', 'tomador_logradouro' => 'Avenida Paulista',
        ];

        [, $erros] = $importer->normalizar($linha);
        $this->assertCount(1, $erros);
        $this->assertStringContainsString('endereço do tomador está incompleto', $erros[0]);

        [, $semErros] = $importer->normalizar(array_diff_key($linha, ['tomador_logradouro' => 1]));
        $this->assertSame([], $semErros);
    }

    public function test_the_csv_template_matches_its_header(): void
    {
        $linhas = array_values(array_filter(explode("\n", ltrim(LoteImporter::modeloCsv(), "\xEF\xBB\xBF"))));

        $this->assertSame(count(LoteImporter::COLUNAS), count(explode(';', $linhas[0])));
        $this->assertSame(count(LoteImporter::COLUNAS), count(explode(';', $linhas[1])));
    }
}
