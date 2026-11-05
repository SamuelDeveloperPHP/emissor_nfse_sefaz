<?php

namespace App\Http\Middleware;

use App\Models\Module;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Spatie\Permission\Models\Permission;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'permissions' => $user ? $this->permissionsOf($user) : [],
                'menu' => $user ? $this->buildMenu($user) : [],
            ],
            // One-shot messages set with ->with('success'|'error'|'warning'); the pages show them with SweetAlert2.
            'flash' => fn () => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'warning' => $request->session()->get('warning'),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }

    /**
     * Permission names the front end uses to show or hide buttons.
     *
     * The Administrador passes every Gate check (Gate::before), so the buttons must agree: reading
     * only the permissions linked to the role hid the actions of modules created after the role
     * was last synced (e.g. "Novo tomador").
     *
     * @return array<int, string>
     */
    private function permissionsOf(User $user): array
    {
        $query = $user->hasRole('Administrador') ? Permission::query() : null;

        return $query
            ? $query->pluck('name')->values()->all()
            : $user->getAllPermissions()->pluck('name')->values()->all();
    }

    /**
     * Build the sidebar tree from the active modules the user has "view" permission on
     * (or that have at least one visible child). Runs a single query, no N+1.
     *
     * @return array<int, array<string, mixed>>
     */
    private function buildMenu(User $user): array
    {
        $byParent = Module::query()
            ->active()
            ->orderBy('order')
            ->get()
            ->groupBy(fn (Module $module) => $module->parent_id === null ? 'root' : $module->parent_id);

        $build = function (string|int $parentKey) use (&$build, $byParent, $user): array {
            return ($byParent->get($parentKey) ?? collect())
                ->map(function (Module $module) use ($build, $user) {
                    $children = $build($module->id);

                    if (! $user->can("{$module->key}.view") && empty($children)) {
                        return null;
                    }

                    return [
                        'key' => $module->key,
                        'name' => $module->name,
                        'icon' => $module->icon,
                        'route' => $module->route,
                        'children' => $children,
                    ];
                })
                ->filter()
                ->values()
                ->all();
        };

        return $build('root');
    }
}
