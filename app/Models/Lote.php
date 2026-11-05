<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lote extends Model
{
    public const STATUS_PROCESSANDO = 'processando';
    public const STATUS_AGUARDANDO_TRANSMISSAO = 'aguardando_transmissao';
    public const STATUS_CONCLUIDO = 'concluido';
    public const STATUS_CONCLUIDO_COM_ERROS = 'concluido_com_erros';

    protected $fillable = ['emitente_id', 'user_id', 'arquivo', 'status', 'ambiente', 'total', 'processado_em'];

    protected $casts = ['processado_em' => 'datetime'];

    public function emitente(): BelongsTo
    {
        return $this->belongsTo(Emitente::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function notas(): HasMany
    {
        return $this->hasMany(NotaFiscal::class);
    }

    public function scopeVisibleTo($query, User $user)
    {
        return $query->whereIn('emitente_id', Emitente::query()->visibleTo($user)->select('id'));
    }

    /**
     * @return array<string, int>
     */
    public function contagemPorStatus(): array
    {
        $counts = $this->notas()->selectRaw('status, COUNT(*) as total')->groupBy('status')->pluck('total', 'status');

        return collect(NotaFiscal::STATUSES)->mapWithKeys(fn (string $status) => [$status => (int) ($counts[$status] ?? 0)])->all();
    }
}
