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
        'chave_acesso',
        'numero_nfse',
        'status',
        'valor_servicos',
        'motivo_rejeicao',
        'emitida_em',
        'cancelada_em',
        'cancelamento_motivo',
        'cancelamento_xml',
        'substituida_por_id',
        'consultada_em',
        'email_enviado_em',
        'email_enviado_para',
        'payload',
        'dps_xml',
        'nfse_xml',
        'erros',
        'resposta',
    ];

    protected $casts = [
        'valor_servicos' => 'decimal:2',
        'emitida_em' => 'datetime',
        'cancelada_em' => 'datetime',
        'consultada_em' => 'datetime',
        'email_enviado_em' => 'datetime',
        'payload' => 'array',
        'erros' => 'array',
        'resposta' => 'array',
    ];

    public function lote(): BelongsTo
    {
        return $this->belongsTo(Lote::class);
    }

    public function emitente(): BelongsTo
    {
        return $this->belongsTo(Emitente::class);
    }

    /** The nota that replaced this one (only set on a nota that was substituted). */
    public function substituidaPor(): BelongsTo
    {
        return $this->belongsTo(self::class, 'substituida_por_id');
    }

    /** Access key of the nota this one replaces, when it is a substitute. */
    public function chaveSubstituida(): ?string
    {
        return $this->payload['substitui_chave'] ?? null;
    }
}
