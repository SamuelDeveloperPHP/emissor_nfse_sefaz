<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CriarAdminTest extends TestCase
{
    use RefreshDatabase;

    public function test_creates_an_administrator_with_the_typed_password(): void
    {
        $this->seed(RolesAndPermissionsSeeder::class);

        $this->artisan('usuarios:criar-admin', ['email' => 'contador@exemplo.com.br', '--nome' => 'Contador'])
            ->expectsQuestion('Senha', 'uma-senha-bem-longa')
            ->expectsQuestion('Confirme a senha', 'uma-senha-bem-longa')
            ->assertSuccessful();

        $usuario = User::where('email', 'contador@exemplo.com.br')->first();
        $this->assertTrue($usuario->hasRole('Administrador'));
        $this->assertTrue($usuario->all_emitentes);
        $this->assertTrue(password_verify('uma-senha-bem-longa', $usuario->password));
    }

    public function test_refuses_short_passwords(): void
    {
        $this->seed(RolesAndPermissionsSeeder::class);

        $this->artisan('usuarios:criar-admin', ['email' => 'contador@exemplo.com.br'])
            ->expectsQuestion('Senha', 'curta')
            ->assertFailed();

        $this->assertNull(User::where('email', 'contador@exemplo.com.br')->first());
    }

    public function test_seeder_does_not_create_the_default_login_in_production(): void
    {
        $this->app['env'] = 'production';

        $this->artisan('db:seed', ['--class' => RolesAndPermissionsSeeder::class, '--force' => true])->assertSuccessful();

        $this->assertNull(User::where('email', 'admin@example.com')->first());
    }
}
