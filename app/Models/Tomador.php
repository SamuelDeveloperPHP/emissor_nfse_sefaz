<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tomador extends Model
{
    protected $table = 'tomadores';

    protected $fillable = [
        'emitente_id', 'documento', 'nome', 'email', 'cep', 'logradouro', 'numero', 'complemento', 'bairro', 'codigo_municipio',
    ];

    public function emitente(): BelongsTo
    {
        return $this->belongsTo(Emitente::class);
    }

    public function scopeVisibleTo($query, User $user)
    {
        return $query->whereIn('emitente_id', Emitente::query()->visibleTo($user)->select('id'));
    }
}
