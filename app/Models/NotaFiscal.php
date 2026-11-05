<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NotaFiscal extends Model
{
    public const STATUS_AUTORIZADA = 'autorizada';
    public const STATUS_PENDENTE = 'pendente';
    public const STATUS_REJEITADA = 'rejeitada';
    public const STATUS_CANCELADA = 'cancelada';

    public const STATUSES = [
        self::STATUS_AUTORIZADA,
        self::STATUS_PENDENTE,
        self::STATUS_REJEITADA,
        self::STATUS_CANCELADA,
    ];

    protected $table = 'notas_fiscais';

    protected $fillable = [
        'emitente_id',
        'lote_id',
        'linha',
        'numero',
        'status',
        'valor_servicos',
        'motivo_rejeicao',
        'emitida_em',
        'payload',
        'dps_xml',
        'erros',
    ];

    protected $casts = [
        'valor_servicos' => 'decimal:2',
        'emitida_em' => 'datetime',
        'payload' => 'array',
        'erros' => 'array',
    ];

    public function lote(): BelongsTo
    {
        return $this->belongsTo(Lote::class);
    }

    public function emitente(): BelongsTo
    {
        return $this->belongsTo(Emitente::class);
    }
}
