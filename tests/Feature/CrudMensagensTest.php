<?php

namespace Tests\Feature;

use App\Models\Emitente;
use App\Models\Recorrencia;
use App\Models\Servico;
use App\Models\Tomador;
use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

/** The write endpoints answer with flash messages (shown by SweetAlert2) and never with a 500 page. */
class CrudMensagensTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(RolesAndPermissionsSeeder::class);
        $this->actingAs(User::where('email', 'admin@example.com')->first());
    }

    private function emitente(): Emitente
    {
        return Emitente::create([
            'razao_social' => 'Empresa', 'cnpj' => '11222333000181', 'codigo_municipio' => '3550308',
            'inscricao_municipal' => '12345', 'regime_tributario' => 'lucro_presumido',
            'ambiente' => 'homologacao', 'driver' => 'simulador', 'is_active' => true,
        ]);
    }

    private function dadosTomador(Emitente $e): array
    {
        return ['emitente_id' => $e->id, 'documento' => '12345678909', 'nome' => 'Maria'];
    }

    public function test_the_flash_message_reaches_the_next_page_as_a_prop(): void
    {
        $e = $this->emitente();

        $this->post(route('tomadores.store'), $this->dadosTomador($e))->assertSessionHas('success', 'Tomador cadastrado.');

        $this->get(route('tomadores.index'))->assertInertia(
            fn (AssertableInertia $page) => $page->where('flash.success', 'Tomador cadastrado.')->where('flash.error', null)
        );

        // One-shot: the next visit has nothing to show.
        $this->get(route('tomadores.index'))->assertInertia(fn (AssertableInertia $page) => $page->where('flash.success', null));
    }

    public function test_a_database_failure_becomes_an_error_message_not_a_500(): void
    {
        Log::spy();
        $e = $this->emitente();

        Tomador::creating(fn () => throw new \RuntimeException('disco cheio'));
        $this->post(route('tomadores.store'), $this->dadosTomador($e))
            ->assertRedirect()
            ->assertSessionHas('error', 'Não foi possível cadastrar o tomador. Tente novamente.');
        $this->assertSame(0, Tomador::count());

        Servico::creating(fn () => throw new \RuntimeException('disco cheio'));
        $this->post(route('servicos.store'), ['emitente_id' => $e->id, 'nome' => 'S', 'descricao' => 'D', 'codigo_tributacao' => '171901', 'iss_retido' => false])
            ->assertSessionHas('error', 'Não foi possível cadastrar o serviço. Tente novamente.');

        // The cause goes to the log, not to the screen.
        Log::shouldHaveReceived('error')->twice();
    }

    public function test_update_and_delete_failures_are_reported_too(): void
    {
        Log::spy();
        $e = $this->emitente();
        $tomador = Tomador::create($this->dadosTomador($e));
        $servico = Servico::create(['emitente_id' => $e->id, 'nome' => 'S', 'descricao' => 'D', 'codigo_tributacao' => '171901']);
        $recorrencia = Recorrencia::create([
            'emitente_id' => $e->id, 'tomador_id' => $tomador->id, 'servico_id' => $servico->id, 'valor' => 10,
            'dia_do_mes' => 5, 'ambiente' => 'homologacao', 'ativa' => true, 'proxima_emissao' => now()->addMonth(),
        ]);

        Tomador::updating(fn () => throw new \RuntimeException('falha'));
        $this->put(route('tomadores.update', $tomador), [...$this->dadosTomador($e), 'nome' => 'Novo'])
            ->assertSessionHas('error', 'Não foi possível atualizar o tomador. Tente novamente.');
        $this->assertSame('Maria', $tomador->fresh()->nome);

        Recorrencia::deleting(fn () => throw new \RuntimeException('falha'));
        $this->delete(route('recorrencias.destroy', $recorrencia))
            ->assertSessionHas('error', 'Não foi possível excluir a nota recorrente. Tente novamente.');
        $this->assertNotNull($recorrencia->fresh());
    }

    public function test_validation_and_authorization_are_not_swallowed(): void
    {
        $e = $this->emitente();

        $this->post(route('tomadores.store'), [...$this->dadosTomador($e), 'documento' => '123'])->assertSessionHasErrors('documento');

        $semAcesso = User::factory()->create(['all_emitentes' => false]);
        $this->actingAs($semAcesso);
        $this->post(route('tomadores.store'), $this->dadosTomador($e))->assertForbidden();
    }

    public function test_the_administrador_gets_every_permission_even_if_the_role_was_not_synced(): void
    {
        $admin = User::where('email', 'admin@example.com')->first();
        \Spatie\Permission\Models\Permission::create(['name' => 'modulo-novo.create', 'guard_name' => 'web']);
        $this->assertFalse($admin->getAllPermissions()->pluck('name')->contains('modulo-novo.create'));

        $this->actingAs($admin)->get(route('tomadores.index'))->assertInertia(
            fn (AssertableInertia $page) => $page->where('auth.permissions', fn ($lista) => collect($lista)->contains('modulo-novo.create') && collect($lista)->contains('tomadores.create'))
        );
    }

    public function test_success_messages_for_the_happy_path(): void
    {
        $e = $this->emitente();
        $this->post(route('tomadores.store'), $this->dadosTomador($e));
        $tomador = Tomador::first();

        $this->put(route('tomadores.update', $tomador), [...$this->dadosTomador($e), 'nome' => 'Nova'])->assertSessionHas('success', 'Tomador atualizado.');
        $this->delete(route('tomadores.destroy', $tomador))->assertSessionHas('success', 'Tomador excluído.');
        $this->assertSame(0, Tomador::count());
    }
}
