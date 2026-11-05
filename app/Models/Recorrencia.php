<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

class Recorrencia extends Model
{
    protected $table = 'recorrencias';

    protected $fillable = [
        'emitente_id', 'tomador_id', 'servico_id', 'user_id', 'valor', 'dia_do_mes', 'ambiente', 'ativa',
        'proxima_emissao', 'ultima_emissao_em', 'ultimo_lote_id', 'ultimo_erro',
    ];

    protected $casts = [
        'valor' => 'decimal:2',
        'ativa' => 'boolean',
        'proxima_emissao' => 'date',
        'ultima_emissao_em' => 'datetime',
    ];

    public function emitente(): BelongsTo
    {
        return $this->belongsTo(Emitente::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function tomador(): BelongsTo
    {
        return $this->belongsTo(Tomador::class);
    }

    public function servico(): BelongsTo
    {
        return $this->belongsTo(Servico::class);
    }

    public function scopeVisibleTo($query, User $user)
    {
        return $query->whereIn('emitente_id', Emitente::query()->visibleTo($user)->select('id'));
    }

    /**
     * First issue date strictly after $referencia on the given day of the month. A recurrence is
     * never scheduled for today or the past, so creating one never triggers a surprise emission.
     */
    public static function proximaData(Carbon $referencia, int $dia): Carbon
    {
        $candidata = $referencia->copy()->startOfMonth()->day($dia);

        return $candidata->greaterThan($referencia->copy()->startOfDay()) ? $candidata : $referencia->copy()->startOfMonth()->addMonthNoOverflow()->day($dia);
    }
}
