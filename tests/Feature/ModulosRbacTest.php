<?php

namespace Tests\Feature;

use App\Models\Emitente;
use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class ModulosRbacTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(RolesAndPermissionsSeeder::class);
    }

    public function test_administrador_can_see_every_admin_screen(): void
    {
        $admin = User::where('email', 'admin@example.com')->first();

        $this->actingAs($admin);

        $this->get(route('modules.index'))->assertOk();
        $this->get(route('roles.index'))->assertOk();
        $this->get(route('users.index'))->assertOk();
        $this->get(route('emitentes.index'))->assertOk();
    }

    public function test_operador_without_permissions_is_forbidden(): void
    {
        $operador = User::factory()->create();
        $operador->syncRoles(['Operador']);

        $this->actingAs($operador);

        $this->get(route('modules.index'))->assertForbidden();
        $this->get(route('emitentes.index'))->assertForbidden();
    }

    public function test_user_without_all_emitentes_only_sees_linked_emitentes(): void
    {
        $operador = User::factory()->create(['all_emitentes' => false]);
        $operador->syncRoles(['Operador']);
        $operador->givePermissionTo(['emitentes.view']);

        $allowed = Emitente::create([
            'razao_social' => 'Empresa Permitida',
            'cnpj' => '11111111000111',
            'ambiente' => 'homologacao',
            'driver' => 'adn_nacional',
            'is_active' => true,
        ]);
        $blocked = Emitente::create([
            'razao_social' => 'Empresa Bloqueada',
            'cnpj' => '22222222000122',
            'ambiente' => 'homologacao',
            'driver' => 'adn_nacional',
            'is_active' => true,
        ]);
        $operador->emitentes()->attach($allowed->id);

        $this->actingAs($operador);

        $response = $this->get(route('emitentes.index'));
        $response->assertOk();
        $response->assertInertia(function (AssertableInertia $page) {
            $names = collect($page->toArray()['props']['emitentes'])->pluck('razao_social');

            $this->assertTrue($names->contains('Empresa Permitida'));
            $this->assertFalse($names->contains('Empresa Bloqueada'));
        });
    }

    public function test_user_with_all_emitentes_sees_every_emitente(): void
    {
        $operador = User::factory()->create(['all_emitentes' => true]);
        $operador->syncRoles(['Operador']);
        $operador->givePermissionTo(['emitentes.view']);

        Emitente::create([
            'razao_social' => 'Empresa A', 'cnpj' => '11111111000111', 'ambiente' => 'homologacao', 'driver' => 'adn_nacional', 'is_active' => true,
        ]);
        Emitente::create([
            'razao_social' => 'Empresa B', 'cnpj' => '22222222000122', 'ambiente' => 'homologacao', 'driver' => 'adn_nacional', 'is_active' => true,
        ]);

        $this->actingAs($operador);

        $response = $this->get(route('emitentes.index'));
        $response->assertOk();
        $response->assertInertia(function (AssertableInertia $page) {
            $this->assertCount(2, $page->toArray()['props']['emitentes']);
        });
    }
}
