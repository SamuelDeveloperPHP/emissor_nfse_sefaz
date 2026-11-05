<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Spatie\Permission\Models\Role;

class CriarAdmin extends Command
{
    protected $signature = 'usuarios:criar-admin {email} {--nome=Administrador}';

    protected $description = 'Cria (ou atualiza) um usuário Administrador com acesso a todos os emitentes, pedindo a senha no terminal';

    public function handle(): int
    {
        $email = (string) $this->argument('email');

        if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->error('E-mail inválido.');

            return self::FAILURE;
        }

        if (! Role::where('name', 'Administrador')->where('guard_name', 'web')->exists()) {
            $this->error('O papel Administrador não existe. Rode antes: php artisan db:seed --class=RolesAndPermissionsSeeder --force');

            return self::FAILURE;
        }

        $senha = (string) $this->secret('Senha');

        if (strlen($senha) < 12) {
            $this->error('Use uma senha com pelo menos 12 caracteres.');

            return self::FAILURE;
        }

        if ($senha !== (string) $this->secret('Confirme a senha')) {
            $this->error('As senhas não conferem.');

            return self::FAILURE;
        }

        $usuario = User::updateOrCreate(
            ['email' => $email],
            ['name' => (string) $this->option('nome'), 'password' => $senha, 'all_emitentes' => true]
        );
        $usuario->syncRoles(['Administrador']);

        $this->info("Administrador {$email} pronto.");

        return self::SUCCESS;
    }
}
