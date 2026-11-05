<?php

namespace App\Console\Commands;

use App\Models\Module;
use Illuminate\Console\Command;
use Spatie\Permission\Models\Permission;

class SyncModulePermissions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'modules:sync-permissions';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Ensure every active module has its standard CRUD (and extra) permissions registered';

    public function handle(): int
    {
        $created = 0;

        foreach (Module::query()->active()->get() as $module) {
            foreach ($module->permissionNames() as $permissionName) {
                $permission = Permission::firstOrCreate(['name' => $permissionName, 'guard_name' => 'web']);

                if ($permission->wasRecentlyCreated) {
                    $created++;
                }
            }
        }

        $this->info("Permissões sincronizadas. {$created} nova(s) criada(s).");

        return self::SUCCESS;
    }
}
