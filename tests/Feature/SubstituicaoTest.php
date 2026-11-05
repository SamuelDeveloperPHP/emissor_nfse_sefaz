<?php

namespace Tests\Feature;

use App\Models\Emitente;
use App\Models\Lote;
use App\Models\NotaFiscal;
use App\Models\User;
use App\Services\Nfse\DpsBuilder;
use App\Services\Nfse\NfseException;
use App\Services\Nfse\XsdValidator;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

/** Substitution of an authorized NFS-e: a corrected DPS that names the old nota (group "subst"). */
class SubstituicaoTest extends TestCase
{
    use RefreshDatabase;

    private const CHAVE = '35503082112223300018100001000000000042123456789012';

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
            'razao_social' => 'Empresa', 'cnpj' => '11222333000181', 'codigo_municipio' => '3550308',
            'inscricao_municipal' => '12345', 'regime_tributario' => 'lucro_presumido',
            'ambiente' => 'homologacao', 'driver' => 'simulador', 'is_active' => true,
        ]);
    }

    private function original(Emitente $e, array $extra = []): NotaFiscal
    {
        $lote = Lote::create(['emitente_id' => $e->id, 'arquivo' => 'x', 'status' => 'concluido', 'ambiente' => 'homologacao', 'total' => 1]);

        return NotaFiscal::create(array_merge([
            'emitente_id' => $e->id, 'lote_id' => $lote->id, 'status' => 'autorizada', 'valor_servicos' => 100,
            'numero' => '1', 'chave_acesso' => self::CHAVE, 'numero_nfse' => '42', 'emitida_em' => now(),
            'payload' => [
                'tomador_documento' => '12345678909', 'tomador_nome' => 'Fulano', 'descricao' => 'Serviço errado',
                'codigo_tributacao' => '171901', 'valor' => 100, 'aliquota' => 2.0, 'iss_retido' => false, 'competencia' => '2026-11-05',
            ],
        ], $extra));
    }

    private function formulario(array $extra = []): array
    {
        return array_merge([
            'tomador_documento' => '12345678909', 'tomador_nome' => 'Fulano', 'descricao_servico' => 'Serviço corrigido',
            'codigo_tributacao_nacional' => '171901', 'valor_servico' => '150,00', 'aliquota_iss' => '2,00', 'iss_retido' => false,
            'data_competencia' => '2026-11-05', 'motivo_codigo' => '99', 'motivo' => 'Valor do serviço estava errado na nota',
        ], $extra);
    }

    public function test_the_substitute_dps_carries_the_subst_group_and_passes_the_official_xsd(): void
    {
        $xml = (new DpsBuilder)->build($this->emitente(), [
            'tomador_documento' => '12345678909', 'tomador_nome' => 'Fulano', 'descricao' => 'Serviço', 'codigo_tributacao' => '171901',
            'valor' => 100, 'aliquota' => 2.0, 'iss_retido' => false, 'competencia' => '2026-11-05',
            'substitui_chave' => self::CHAVE, 'substituicao_motivo_codigo' => '99', 'substituicao_motivo' => 'Valor do serviço estava errado',
        ], 1);

        $this->assertSame([], (new XsdValidator)->validarDps($xml));
        $this->assertStringContainsString('<subst><chSubstda>'.self::CHAVE.'</chSubstda><cMotivo>99</cMotivo><xMotivo>Valor do serviço estava errado</xMotivo></subst><prest>', $xml);
    }

    public function test_the_builder_refuses_a_bad_key_code_or_short_reason(): void
    {
        $base = ['tomador_documento' => '12345678909', 'tomador_nome' => 'F', 'descricao' => 'S', 'codigo_tributacao' => '171901', 'valor' => 1, 'competencia' => '2026-11-05'];
        $builder = new DpsBuilder;
        $emitente = $this->emitente();

        foreach ([
            ['substitui_chave' => '123', 'substituicao_motivo_codigo' => '99', 'substituicao_motivo' => str_repeat('a', 20)],
            ['substitui_chave' => self::CHAVE, 'substituicao_motivo_codigo' => '77', 'substituicao_motivo' => str_repeat('a', 20)],
            ['substitui_chave' => self::CHAVE, 'substituicao_motivo_codigo' => '99', 'substituicao_motivo' => 'curto'],
        ] as $extra) {
            try {
                $builder->build($emitente, [...$base, ...$extra], 1);
                $this->fail('accepted an invalid substitution');
            } catch (NfseException) {
                $this->addToAssertionCount(1);
            }
        }
    }

    public function test_the_form_is_prefilled_from_the_nota(): void
    {
        $original = $this->original($this->emitente());

        $this->actingAs($this->admin())->get(route('notas.substituir', $original))
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->component('Fiscal/Notas/substituir')
                ->where('dados.descricao_servico', 'Serviço errado')
                ->where('dados.valor_servico', '100,00')
                ->where('dados.aliquota_iss', '2,00')
                ->where('nota.ambiente', 'homologacao'));
    }

    public function test_an_authorized_substitute_retires_the_old_nota(): void
    {
        $original = $this->original($this->emitente());

        $this->actingAs($this->admin())->post(route('notas.substituir.store', $original), $this->formulario())
            ->assertSessionHas('success');

        $nova = NotaFiscal::where('id', '!=', $original->id)->first();
        $this->assertSame('autorizada', $nova->status);
        $this->assertSame(self::CHAVE, $nova->payload['substitui_chave']);
        $this->assertSame('99', $nova->payload['substituicao_motivo_codigo']);
        $this->assertSame('150.00', $nova->valor_servicos);

        $original->refresh();
        $this->assertSame('cancelada', $original->status);
        $this->assertSame($nova->id, $original->substituida_por_id);
        $this->assertStringContainsString('Valor do serviço estava errado', $original->cancelamento_motivo);

        // The detail pages point to each other.
        $this->get(route('notas.show', $original))->assertInertia(fn ($p) => $p->where('nota.substituida_por.id', $nova->id));
        $this->get(route('notas.show', $nova))->assertInertia(fn ($p) => $p->where('nota.substitui.id', $original->id));
    }

    public function test_a_substitute_that_is_not_authorized_leaves_the_old_nota_valid(): void
    {
        $original = $this->original($this->emitente());

        // The line passes the form but is refused by the pipeline: invalid CNPJ of the emitente's municipality is not needed;
        // a pending substitute (no answer yet) is enough to prove the old nota is kept.
        $lote = app(\App\Services\Nfse\NotaOperacoes::class)->prepararSubstituicao($original, $this->admin(), [
            'tomador_documento' => '12345678909', 'tomador_nome' => 'Fulano', 'descricao_servico' => 'Corrigido',
            'codigo_tributacao_nacional' => '171901', 'valor_servico' => '150,00',
        ], '99', 'Valor do serviço estava errado');

        $this->assertSame('pendente', $lote->notas()->first()->status);
        $this->assertSame('autorizada', $original->fresh()->status);
        $this->assertNull($original->fresh()->substituida_por_id);
    }

    public function test_one_nota_cannot_be_substituted_twice_or_unless_authorized(): void
    {
        $emitente = $this->emitente();
        $original = $this->original($emitente);
        $this->actingAs($this->admin());

        $this->post(route('notas.substituir.store', $original), $this->formulario())->assertSessionHas('success');

        // Already replaced (now cancelada): both the screen and the action refuse.
        $this->get(route('notas.substituir', $original))->assertRedirect(route('notas.show', $original));
        $this->post(route('notas.substituir.store', $original), $this->formulario())->assertSessionHas('error');

        // A pending nota cannot be substituted either.
        $pendente = $this->original($emitente, ['status' => 'pendente', 'chave_acesso' => null, 'numero_nfse' => null]);
        $this->post(route('notas.substituir.store', $pendente), $this->formulario())->assertSessionHas('error');
    }

    public function test_an_existing_pending_substitute_blocks_a_second_one(): void
    {
        $original = $this->original($this->emitente());
        $operacoes = app(\App\Services\Nfse\NotaOperacoes::class);
        $linha = ['tomador_documento' => '12345678909', 'tomador_nome' => 'F', 'descricao_servico' => 'C', 'codigo_tributacao_nacional' => '171901', 'valor_servico' => '1,00'];

        $operacoes->prepararSubstituicao($original, $this->admin(), $linha, '99', 'Primeira tentativa de correção');

        $this->expectException(NfseException::class);
        $this->expectExceptionMessage('já tem uma substituta');
        $operacoes->prepararSubstituicao($original, $this->admin(), $linha, '99', 'Segunda tentativa de correção');
    }

    public function test_validation_and_permissions(): void
    {
        $emitente = $this->emitente();
        $outro = Emitente::create([...$emitente->only(['razao_social', 'codigo_municipio', 'inscricao_municipal', 'regime_tributario', 'ambiente', 'driver', 'is_active']), 'cnpj' => '99888777000100']);
        $original = $this->original($emitente);

        $this->actingAs($this->admin())->post(route('notas.substituir.store', $original), $this->formulario(['motivo' => 'curto']))->assertSessionHasErrors('motivo');
        $this->post(route('notas.substituir.store', $original), $this->formulario(['motivo_codigo' => '55']))->assertSessionHasErrors('motivo_codigo');
        $this->post(route('notas.substituir.store', $original), $this->formulario(['valor_servico' => '0']))->assertSessionHas('error');
        $this->assertSame(1, NotaFiscal::count(), 'nothing was issued by the refused attempts');

        $semPermissao = User::factory()->create(['all_emitentes' => true]);
        $semPermissao->syncRoles(['Operador']);
        $semPermissao->givePermissionTo('notas-fiscais.view');
        $this->actingAs($semPermissao)->get(route('notas.substituir', $original))->assertForbidden();

        $restrito = User::factory()->create(['all_emitentes' => false]);
        $restrito->syncRoles(['Operador']);
        $restrito->emitentes()->attach($outro->id);
        $restrito->givePermissionTo('notas-fiscais.view', 'notas-fiscais.substituir');
        $this->actingAs($restrito)->get(route('notas.substituir', $original))->assertForbidden();
        $this->post(route('notas.substituir.store', $original), $this->formulario())->assertForbidden();
    }

    public function test_consult_pending_looks_up_only_visible_pending_notas(): void
    {
        $emitente = $this->emitente();
        $this->original($emitente);
        $this->actingAs($this->admin());

        $this->post(route('notas.consultar-pendentes'))->assertSessionHas('success', 'Não há notas pendentes para consultar.');

        NotaFiscal::create([
            'emitente_id' => $emitente->id, 'status' => 'pendente', 'valor_servicos' => 1, 'numero' => '9',
            'dps_xml' => '<DPS/>', 'payload' => ['tomador_nome' => 'X'],
        ]);

        // The simulator has nothing to look up, so the nota stays pending and the answer says so.
        $this->post(route('notas.consultar-pendentes'))->assertSessionHas('success', fn ($m) => str_contains($m, '1 nota(s) consultada(s): 0 resolvida(s), 1 ainda pendente(s)'));

        $this->get(route('notas.index'))->assertInertia(fn ($p) => $p->where('pendentes', 1));
    }
}
