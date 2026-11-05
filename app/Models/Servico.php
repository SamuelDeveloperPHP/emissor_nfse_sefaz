<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Servico extends Model
{
    protected $table = 'servicos';

    protected $fillable = ['emitente_id', 'nome', 'descricao', 'codigo_tributacao', 'aliquota', 'iss_retido'];

    protected $casts = ['aliquota' => 'decimal:2', 'iss_retido' => 'boolean'];

    public function emitente(): BelongsTo
    {
        return $this->belongsTo(Emitente::class);
    }

    public function scopeVisibleTo($query, User $user)
    {
        return $query->whereIn('emitente_id', Emitente::query()->visibleTo($user)->select('id'));
    }
}
