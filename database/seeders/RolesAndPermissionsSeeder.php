<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(ModulesSeeder::class);

        Artisan::call('modules:sync-permissions');

        $admin = Role::firstOrCreate(['name' => 'Administrador', 'guard_name' => 'web']);
        Role::firstOrCreate(['name' => 'Operador', 'guard_name' => 'web']);

        // The Gate::before bypass already gives Administrador everything, but syncing
        // the permissions too keeps the permission-matrix screen showing it as fully checked.
        $admin->syncPermissions(Permission::all());

        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            ['name' => 'Administrador', 'password' => Hash::make('password'), 'all_emitentes' => true]
        );
        $adminUser->syncRoles([$admin->name]);
    }
}
