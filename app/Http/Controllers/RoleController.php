<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::query()->with('permissions:id,name')->orderBy('name')->get();

        return Inertia::render('Admin/Papeis/index', [
            'roles' => $roles->map(fn (Role $role) => [
                'id' => $role->id,
                'name' => $role->name,
                'is_system' => $role->name === 'Administrador',
                'permissions' => $role->permissions->pluck('name'),
            ]),
            'modules' => Module::query()->active()->orderBy('order')->get()->map(fn (Module $module) => [
                'id' => $module->id,
                'key' => $module->key,
                'name' => $module->name,
                'parent_id' => $module->parent_id,
                // A module with no route is just a sidebar grouping: it has no permissions of its own.
                'actions' => $module->route ? $module->allActions() : [],
            ]),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:100', Rule::unique('roles', 'name')],
        ]);

        Role::create(['name' => $data['name'], 'guard_name' => 'web']);

        return back()->with('success', 'Papel criado com sucesso.');
    }

    public function update(Request $request, Role $role)
    {
        if ($role->name === 'Administrador') {
            return back()->with('error', 'O papel Administrador não pode ser alterado.');
        }

        $data = $request->validate([
            'name' => ['required', 'string', 'max:100', Rule::unique('roles', 'name')->ignore($role)],
            'permissions' => ['array'],
            'permissions.*' => ['string', 'exists:permissions,name'],
        ]);

        $role->update(['name' => $data['name']]);
        $role->syncPermissions($data['permissions'] ?? []);

        return back()->with('success', 'Papel atualizado com sucesso.');
    }

    public function destroy(Role $role)
    {
        if ($role->name === 'Administrador') {
            return back()->with('error', 'O papel Administrador não pode ser excluído.');
        }

        if ($role->users()->exists()) {
            return back()->with('error', 'Existem usuários com este papel. Reatribua-os antes de excluir.');
        }

        $role->delete();

        return back()->with('success', 'Papel excluído com sucesso.');
    }
}
