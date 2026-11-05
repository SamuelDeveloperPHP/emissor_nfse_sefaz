<?php

namespace App\Http\Middleware;

use App\Models\Module;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;
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
                'permissions' => $user ? $user->getAllPermissions()->pluck('name')->values()->all() : [],
                'menu' => $user ? $this->buildMenu($user) : [],
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
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
