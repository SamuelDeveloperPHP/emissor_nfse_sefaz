<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SegurancaAdministracaoTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(RolesAndPermissionsSeeder::class);
        $this->actingAs(User::where('email', 'admin@example.com')->firstOrFail());
    }

    public function test_even_the_administrator_cannot_create_update_or_delete_users(): void
    {
        $alvo = User::factory()->create(['name' => 'Usuário preservado']);

        $this->post(route('users.store'), [
            'name' => 'Novo usuário',
            'email' => 'novo@example.com',
            'password' => 'senha-segura',
            'password_confirmation' => 'senha-segura',
            'all_emitentes' => false,
        ])->assertForbidden();

        $this->put(route('users.update', $alvo), [
            'name' => 'Nome alterado',
            'email' => $alvo->email,
            'all_emitentes' => false,
        ])->assertForbidden();

        $this->delete(route('users.destroy', $alvo))->assertForbidden();

        $this->assertDatabaseMissing('users', ['email' => 'novo@example.com']);
        $this->assertDatabaseHas('users', ['id' => $alvo->id, 'name' => 'Usuário preservado']);
    }
}
