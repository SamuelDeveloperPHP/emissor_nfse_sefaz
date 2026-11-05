<?php

namespace App\Policies;

use App\Models\Emitente;
use App\Models\User;

class EmitentePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('emitentes.view');
    }

    public function view(User $user, Emitente $emitente): bool
    {
        return $user->can('emitentes.view') && $user->canAccessEmitente($emitente);
    }

    public function create(User $user): bool
    {
        return $user->can('emitentes.create');
    }

    public function update(User $user, Emitente $emitente): bool
    {
        return $user->can('emitentes.edit') && $user->canAccessEmitente($emitente);
    }

    public function delete(User $user, Emitente $emitente): bool
    {
        return $user->can('emitentes.delete') && $user->canAccessEmitente($emitente);
    }
}
