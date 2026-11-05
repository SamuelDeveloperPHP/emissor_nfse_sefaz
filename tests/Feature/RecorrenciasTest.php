<?php

namespace Tests\Feature;

use App\Models\Emitente;
use App\Models\Lote;
use App\Models\NotaFiscal;
use App\Models\Recorrencia;
use App\Models\Servico;
use App\Models\Setting;
use App\Models\Tomador;
use App\Models\User;
use App\Services\Nfse\EmitirRecorrencias;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class RecorrenciasTest extends TestCase
{
    use RefreshDatabase;

    private int $contador = 0;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(RolesAndPermissionsSeeder::class);
        $this->travelTo(Carbon::parse('2026-11-10 06:00:00'));
    }

    private function admin(): User
    {
        return User::where('email', 'admin@example.com')->first();
    }

    private function emitente(bool $ativo = true): Emitente
    {
        return Emitente::create([
            'razao_social' => 'Empresa '.++$this->contador,
            'cnpj' => sprintf('112223%08d', $this->contador),
            'codigo_municipio' => '3550308',
            'inscricao_municipal' => '12345',
            'regime_tributario' => 'simples_nacional',
            'ambiente' => 'homologacao',
            'driver' => 'simulador',
            'is_active' => $ativo,
        ]);
    }

    private function tomador(Emitente $emitente): Tomador
    {
        return Tomador::create(['emitente_id' => $emitente->id, 'documento' => sprintf('%011d', $this->contador), 'nome' => 'Maria da Silva', 'email' => 'maria@exemplo.com.br']);
    }

    private function servico(Emitente $emitente): Servico
    {
        return Servico::create(['emitente_id' => $emitente->id, 'nome' => 'Honorários', 'descricao' => 'Honorários contábeis mensais', 'codigo_tributacao' => '171901', 'aliquota' => 2, 'iss_retido' => false]);
    }

    private function recorrencia(?Emitente $emitente = null, array $extra = []): Recorrencia
    {
        $emitente ??= $this->emitente();

        return Recorrencia::create(array_merge([
            'emitente_id' => $emitente->id,
            'tomador_id' => $this->tomador($emitente)->id,
            'servico_id' => $this->servico($emitente)->id,
            'valor' => 1500,
            'dia_do_mes' => 10,
            'ambiente' => 'homologacao',
            'ativa' => true,
            'proxima_emissao' => '2026-11-10',
        ], $extra));
    }

    // ---- schedule math ---------------------------------------------------------------------------

    public function test_the_next_date_is_never_today_or_in_the_past(): void
    {
        $hoje = Carbon::parse('2026-11-10');

        $this->assertSame('2026-11-20', Recorrencia::proximaData($hoje, 20)->toDateString());
        $this->assertSame('2026-12-10', Recorrencia::proximaData($hoje, 10)->toDateString()); // today: next month
        $this->assertSame('2026-12-03', Recorrencia::proximaData($hoje, 3)->toDateString());
        $this->assertSame('2027-01-05', Recorrencia::proximaData(Carbon::parse('2026-12-31'), 5)->toDateString());
        $this->assertSame('2027-03-28', Recorrencia::proximaData(Carbon::parse('2027-02-28'), 28)->toDateString());
    }

    // ---- cadastro --------------------------------------------------------------------------------

    public function test_a_recurrence_is_created_scheduled_for_the_next_occurrence_and_forced_to_homologacao(): void
    {
        $emitente = $this->emitente();

        $this->actingAs($this->admin())->post(route('recorrencias.store'), [
            'emitente_id' => $emitente->id,
            'tomador_id' => $this->tomador($emitente)->id,
            'servico_id' => $this->servico($emitente)->id,
            'valor' => '1.500,00',
            'dia_do_mes' => 20,
            'ambiente' => 'producao', // ignored while the Administrador has not opened the choice
            'ativa' => true,
        ])->assertSessionHasNoErrors();

        $r = Recorrencia::first();
        $this->assertSame('1500.00', $r->valor);
        $this->assertSame('2026-11-20', $r->proxima_emissao->toDateString());
        $this->assertSame('homologacao', $r->ambiente);
        $this->assertSame($this->admin()->id, $r->user_id);
    }

    public function test_tomador_and_service_must_belong_to_the_same_emitente_and_the_day_to_1_28(): void
    {
        $a = $this->emitente();
        $b = $this->emitente();
        $dados = ['emitente_id' => $a->id, 'tomador_id' => $this->tomador($a)->id, 'servico_id' => $this->servico($a)->id, 'valor' => '100', 'dia_do_mes' => 5, 'ativa' => true];

        $this->actingAs($this->admin());
        $this->post(route('recorrencias.store'), [...$dados, 'tomador_id' => $this->tomador($b)->id])->assertSessionHasErrors('tomador_id');
        $this->post(route('recorrencias.store'), [...$dados, 'servico_id' => $this->servico($b)->id])->assertSessionHasErrors('servico_id');
        $this->post(route('recorrencias.store'), [...$dados, 'dia_do_mes' => 29])->assertSessionHasErrors('dia_do_mes');
        $this->post(route('recorrencias.store'), [...$dados, 'valor' => '0'])->assertSessionHasErrors('valor');
        $this->assertSame(0, Recorrencia::count());
    }

    public function test_pausing_keeps_the_date_and_resuming_or_changing_the_day_reschedules(): void
    {
        $r = $this->recorrencia(null, ['proxima_emissao' => '2026-11-10']);
        $dados = ['emitente_id' => $r->emitente_id, 'tomador_id' => $r->tomador_id, 'servico_id' => $r->servico_id, 'valor' => '1500', 'dia_do_mes' => 10, 'ativa' => false];

        $this->actingAs($this->admin())->put(route('recorrencias.update', $r), $dados)->assertSessionHasNoErrors();
        $this->assertFalse($r->fresh()->ativa);
        $this->assertSame('2026-11-10', $r->fresh()->proxima_emissao->toDateString());

        $this->put(route('recorrencias.update', $r), [...$dados, 'ativa' => true])->assertSessionHasNoErrors();
        $this->assertSame('2026-12-10', $r->fresh()->proxima_emissao->toDateString(), 'resuming does not issue what was missed');

        $this->put(route('recorrencias.update', $r), [...$dados, 'ativa' => true, 'dia_do_mes' => 25]);
        $this->assertSame('2026-11-25', $r->fresh()->proxima_emissao->toDateString());
    }

    public function test_users_cannot_touch_recurrences_of_other_emitentes(): void
    {
        $meu = $this->emitente();
        $outro = $this->emitente();
        $deles = $this->recorrencia($outro);

        $operador = User::factory()->create(['all_emitentes' => false]);
        $operador->syncRoles(['Operador']);
        $operador->givePermissionTo(['recorrencias.view', 'recorrencias.create', 'recorrencias.edit', 'recorrencias.delete']);
        $operador->emitentes()->attach($meu->id);

        $this->actingAs($operador)->get(route('recorrencias.index'))->assertOk()->assertInertia(fn ($p) => $p->has('recorrencias', 0));
        $this->delete(route('recorrencias.destroy', $deles))->assertForbidden();
        $this->post(route('recorrencias.store'), ['emitente_id' => $outro->id, 'tomador_id' => $deles->tomador_id, 'servico_id' => $deles->servico_id, 'valor' => '10', 'dia_do_mes' => 3, 'ativa' => true])->assertForbidden();
        $this->assertSame(1, Recorrencia::count());
    }

    public function test_a_tomador_or_service_in_use_cannot_be_deleted(): void
    {
        $r = $this->recorrencia();

        $this->actingAs($this->admin())->delete(route('tomadores.destroy', $r->tomador_id))->assertSessionHas('error');
        $this->delete(route('servicos.destroy', $r->servico_id))->assertSessionHas('error');

        $this->assertNotNull(Tomador::find($r->tomador_id));
        $this->assertNotNull(Servico::find($r->servico_id));
    }

    // ---- emission --------------------------------------------------------------------------------

    public function test_a_due_recurrence_issues_one_nota_and_moves_to_next_month(): void
    {
        $r = $this->recorrencia();

        $resultado = app(EmitirRecorrencias::class)->executar();

        $this->assertSame(['emitidas' => 1, 'falhas' => 0], $resultado);

        $lote = Lote::first();
        $this->assertSame('Recorrente: Maria da Silva', $lote->arquivo);
        $this->assertSame('homologacao', $lote->ambiente);

        $nota = $lote->notas()->first();
        $this->assertSame(NotaFiscal::STATUS_AUTORIZADA, $nota->status); // simulador, queue runs sync in tests
        $this->assertSame(1500.0, (float) $nota->valor_servicos);
        $this->assertSame('Maria da Silva', $nota->payload['tomador_nome']);
        $this->assertSame('2026-11-10', $nota->payload['competencia']);

        $r->refresh();
        $this->assertSame('2026-12-10', $r->proxima_emissao->toDateString());
        $this->assertSame($lote->id, $r->ultimo_lote_id);
        $this->assertNull($r->ultimo_erro);
    }

    public function test_running_twice_the_same_day_never_issues_twice(): void
    {
        $this->recorrencia();

        app(EmitirRecorrencias::class)->executar();
        $segunda = app(EmitirRecorrencias::class)->executar();

        $this->assertSame(['emitidas' => 0, 'falhas' => 0], $segunda);
        $this->assertSame(1, Lote::count());
    }

    public function test_paused_and_not_yet_due_recurrences_are_left_alone(): void
    {
        $this->recorrencia(null, ['ativa' => false]);
        $this->recorrencia(null, ['proxima_emissao' => '2026-11-11']);

        $this->assertSame(['emitidas' => 0, 'falhas' => 0], app(EmitirRecorrencias::class)->executar());
        $this->assertSame(0, Lote::count());
    }

    public function test_after_months_of_downtime_only_one_nota_is_issued(): void
    {
        $r = $this->recorrencia(null, ['proxima_emissao' => '2026-08-10']);

        $this->assertSame(1, app(EmitirRecorrencias::class)->executar()['emitidas']);
        $this->assertSame(1, Lote::count());
        $this->assertSame('2026-12-10', $r->fresh()->proxima_emissao->toDateString());
    }

    public function test_an_inactive_emitente_skips_the_month_and_records_why(): void
    {
        $r = $this->recorrencia($this->emitente(false));

        $this->assertSame(['emitidas' => 0, 'falhas' => 1], app(EmitirRecorrencias::class)->executar());

        $r->refresh();
        $this->assertStringContainsString('inativo', $r->ultimo_erro);
        $this->assertSame('2026-12-10', $r->proxima_emissao->toDateString());
        $this->assertSame(0, Lote::count());
    }

    public function test_the_stored_environment_only_counts_while_the_administrador_allows_the_choice(): void
    {
        $this->recorrencia(null, ['ambiente' => 'producao']);
        $this->recorrencia(null, ['ambiente' => 'producao']);

        // Choice closed (default): unattended runs are forced to homologação.
        app(EmitirRecorrencias::class)->executar();
        $this->assertSame(['homologacao', 'homologacao'], Lote::orderBy('id')->pluck('ambiente')->all());

        Lote::query()->delete();
        Recorrencia::query()->update(['proxima_emissao' => '2026-11-10']);
        Setting::putBool(Setting::ESCOLHER_AMBIENTE, true);

        app(EmitirRecorrencias::class)->executar();
        $this->assertSame(['producao', 'producao'], Lote::orderBy('id')->pluck('ambiente')->all());
    }

    public function test_the_artisan_command_runs_it(): void
    {
        $this->recorrencia();

        $this->artisan('nfse:emitir-recorrentes')->expectsOutputToContain('1 nota(s) recorrente(s)')->assertSuccessful();
        $this->assertSame(1, Lote::count());
    }
}
