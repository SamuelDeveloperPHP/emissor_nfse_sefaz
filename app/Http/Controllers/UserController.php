<?php

namespace App\Http\Controllers;

use App\Models\Emitente;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Usuarios/index', [
            'users' => User::query()->with('roles:id,name', 'emitentes:id,razao_social')->orderBy('name')->get()
                ->map(fn (User $user) => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'all_emitentes' => $user->all_emitentes,
                    'roles' => $user->roles->pluck('name'),
                    'emitente_ids' => $user->emitentes->pluck('id'),
                ]),
            'roles' => Role::query()->orderBy('name')->pluck('name'),
            'emitentes' => Emitente::query()->active()->orderBy('razao_social')->get(['id', 'razao_social', 'cnpj']),
        ]);
    }

    public function store(Request $request)
    {
        abort(403, 'O cadastro de usuários está desativado.');

        $data = $this->validated($request);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'all_emitentes' => $data['all_emitentes'],
        ]);

        $user->syncRoles($data['roles'] ?? []);
        $user->emitentes()->sync($data['all_emitentes'] ? [] : ($data['emitente_ids'] ?? []));

        return back()->with('success', 'Usuário criado com sucesso.');
    }

    public function update(Request $request, User $user)
    {
        abort(403, 'A edição de usuários está desativada.');

        $data = $this->validated($request, $user);

        $user->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'all_emitentes' => $data['all_emitentes'],
            ...($data['password'] ? ['password' => Hash::make($data['password'])] : []),
        ]);

        $user->syncRoles($data['roles'] ?? []);
        $user->emitentes()->sync($data['all_emitentes'] ? [] : ($data['emitente_ids'] ?? []));

        return back()->with('success', 'Usuário atualizado com sucesso.');
    }

    public function destroy(Request $request, User $user)
    {
        abort(403, 'A exclusão de usuários está desativada.');

        if ($user->id === $request->user()->id) {
            return back()->with('error', 'Você não pode excluir seu próprio usuário.');
        }

        $user->delete();

        return back()->with('success', 'Usuário excluído com sucesso.');
    }

    private function validated(Request $request, ?User $user = null): array
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'email' => ['required', 'email', 'max:150', Rule::unique('users', 'email')->ignore($user)],
            'password' => [$user ? 'nullable' : 'required', 'string', 'min:8', 'confirmed'],
            'all_emitentes' => ['required', 'boolean'],
            'roles' => ['array'],
            'roles.*' => ['string', 'exists:roles,name'],
            'emitente_ids' => ['array'],
            'emitente_ids.*' => ['integer', 'exists:emitentes,id'],
        ]);

        $data['password'] ??= null;

        return $data;
    }
}
