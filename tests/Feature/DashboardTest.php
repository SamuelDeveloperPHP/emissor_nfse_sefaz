<?php

namespace Tests\Feature;

use App\Models\Emitente;
use App\Models\NotaFiscal;
use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(RolesAndPermissionsSeeder::class);
        $this->travelTo(now()->setDate(2026, 11, 5)->setTime(15, 0));
    }

    private function emitente(string $nome, string $cnpj, bool $ativo = true, ?string $validade = null): Emitente
    {
        return Emitente::create([
            'razao_social' => $nome,
            'cnpj' => $cnpj,
            'ambiente' => 'homologacao',
            'driver' => 'adn_nacional',
            'is_active' => $ativo,
            'certificado_path' => $validade ? 'certificados/x.pfx' : null,
            'certificado_validade' => $validade,
        ]);
    }

    private function nota(Emitente $emitente, string $status, string $quando, float $valor = 100): NotaFiscal
    {
        return NotaFiscal::create([
            'emitente_id' => $emitente->id,
            'status' => $status,
            'valor_servicos' => $valor,
            'emitida_em' => $quando,
        ]);
    }

    private function props($response): array
    {
        $props = [];
        $response->assertOk()->assertInertia(function (AssertableInertia $page) use (&$props) {
            $page->component('Dashboard/index');
            $props = $page->toArray()['props'];
        });

        return $props;
    }

    public function test_counts_emitentes_and_groups_invoices_by_period(): void
    {
        $a = $this->emitente('Ativa', '11111111000111', true, '2026-11-10');
        $this->emitente('Inativa', '22222222000122', false);

        $this->nota($a, 'autorizada', '2026-11-05 10:15:00', 250);
        $this->nota($a, 'rejeitada', '2026-11-05 11:00:00', 999);
        $this->nota($a, 'autorizada', '2026-11-03 09:00:00', 100); // same week and month, not today
        $this->nota($a, 'autorizada', '2026-11-30 09:00:00', 100); // later this month, outside the week and ahead of "now"
        $this->nota($a, 'cancelada', '2026-02-02 09:00:00', 100);  // this year only
        $this->nota($a, 'autorizada', '2025-12-31 23:00:00', 100); // last year: ignored

        $props = $this->props($this->actingAs(User::where('email', 'admin@example.com')->first())->get(route('dashboard')));

        $this->assertSame(['total' => 2, 'ativos' => 1, 'inativos' => 1], array_intersect_key($props['emitentes'], array_flip(['total', 'ativos', 'inativos'])));
        $this->assertSame(5, $props['emitentes']['certificados'][0]['dias']);

        $this->assertSame(2, $props['periodos']['dia']['total']);
        $this->assertSame(250.0, (float) $props['periodos']['dia']['valor']);
        $this->assertSame(50.0, (float) $props['periodos']['dia']['taxa_rejeicao']);
        $this->assertSame(1, $props['periodos']['dia']['serie']['autorizada'][10]);

        $this->assertSame(3, $props['periodos']['semana']['total']);
        $this->assertSame(4, $props['periodos']['mes']['total']);
        $this->assertSame(5, $props['periodos']['ano']['total']);
        $this->assertSame(1, $props['periodos']['ano']['serie']['cancelada'][1]);
        $this->assertCount(12, $props['periodos']['ano']['labels']);
        $this->assertCount(30, $props['periodos']['mes']['labels']);
    }

    public function test_pending_and_rejected_notes_without_emission_date_count_by_creation_date(): void
    {
        $a = $this->emitente('Ativa', '11111111000111');

        // The batch job leaves emitida_em empty for anything that was not authorized.
        NotaFiscal::create(['emitente_id' => $a->id, 'status' => 'rejeitada', 'valor_servicos' => 10]);
        NotaFiscal::create(['emitente_id' => $a->id, 'status' => 'pendente', 'valor_servicos' => 10]);
        $this->nota($a, 'autorizada', '2026-11-05 10:00:00');

        $props = $this->props($this->actingAs(User::where('email', 'admin@example.com')->first())->get(route('dashboard')));

        $dia = $props['periodos']['dia'];
        $this->assertSame(3, $dia['total']);
        $this->assertSame(1, $dia['por_status']['rejeitada']);
        $this->assertSame(1, $dia['por_status']['pendente']);
        $this->assertSame(50.0, (float) $dia['taxa_rejeicao']);
        $this->assertSame(1, $dia['serie']['rejeitada'][15]);
        $this->assertSame(3, $props['periodos']['ano']['total']);
    }

    public function test_no_route_uses_a_closure_so_route_cache_works(): void
    {
        $closures = collect(app('router')->getRoutes()->getRoutes())
            ->filter(fn ($route) => $route->getAction('uses') instanceof \Closure)
            ->map(fn ($route) => $route->uri())
            ->values()
            ->all();

        $this->assertSame([], $closures);
    }

    public function test_user_only_sees_figures_for_linked_emitentes(): void
    {
        $linked = $this->emitente('Vinculada', '11111111000111');
        $other = $this->emitente('Outra', '22222222000122');
        $this->nota($linked, 'autorizada', '2026-11-05 10:00:00');
        $this->nota($other, 'autorizada', '2026-11-05 10:00:00');
        $this->nota($other, 'autorizada', '2026-11-05 11:00:00');

        $operador = User::factory()->create(['all_emitentes' => false]);
        $operador->syncRoles(['Operador']);
        $operador->emitentes()->attach($linked->id);

        $props = $this->props($this->actingAs($operador)->get(route('dashboard')));

        $this->assertSame(1, $props['emitentes']['total']);
        $this->assertSame(1, $props['periodos']['dia']['total']);
        $this->assertSame(1, $props['periodos']['ano']['total']);
    }

    public function test_user_without_dashboard_permission_is_forbidden(): void
    {
        $this->actingAs(User::factory()->create())->get(route('dashboard'))->assertForbidden();
    }
}
