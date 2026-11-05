<?php

namespace App\Providers;

use App\Models\Emitente;
use App\Policies\EmitentePolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Emitente::class => EmitentePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        // Users with the "Administrador" role bypass every permission check below.
        Gate::before(function ($user, $ability) {
            return $user->hasRole('Administrador') ? true : null;
        });
    }
}
