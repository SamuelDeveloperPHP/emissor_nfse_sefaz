<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ModuleController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Modulos/index', [
            'modules' => Module::query()->orderBy('order')->get(),
        ]);
    }

    public function store(Request $request)
    {
        Module::create($this->validated($request));

        Artisan::call('modules:sync-permissions');

        return back()->with('success', 'Módulo criado com sucesso.');
    }

    public function update(Request $request, Module $module)
    {
        $module->update($this->validated($request, $module));

        Artisan::call('modules:sync-permissions');

        return back()->with('success', 'Módulo atualizado com sucesso.');
    }

    public function destroy(Module $module)
    {
        if ($module->children()->exists()) {
            return back()->with('error', 'Remova ou mova os submódulos antes de excluir este módulo.');
        }

        $module->delete();

        return back()->with('success', 'Módulo excluído com sucesso.');
    }

    private function validated(Request $request, ?Module $module = null): array
    {
        return $request->validate([
            'key' => ['required', 'string', 'max:100', 'alpha_dash', Rule::unique('modules', 'key')->ignore($module)],
            'name' => ['required', 'string', 'max:150'],
            'icon' => ['nullable', 'string', 'max:50'],
            'route' => ['nullable', 'string', 'max:150'],
            'parent_id' => ['nullable', 'exists:modules,id'],
            'order' => ['required', 'integer', 'min:0'],
            'is_active' => ['required', 'boolean'],
            'actions' => ['nullable', 'array'],
            'actions.*' => ['string', 'max:50'],
        ]);
    }
}
