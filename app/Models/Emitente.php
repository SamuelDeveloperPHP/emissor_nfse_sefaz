<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Emitente extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'razao_social',
        'nome_fantasia',
        'cnpj',
        'inscricao_municipal',
        'codigo_municipio',
        'municipio',
        'uf',
        'cep',
        'logradouro',
        'numero',
        'complemento',
        'bairro',
        'email',
        'telefone',
        'regime_tributario',
        'ambiente',
        'driver',
        'driver_config',
        // Set only by GestaoDeCertificado (and tests); no controller passes request data into them.
        'certificado_path',
        'certificado_password',
        'certificado_validade',
        'rps_serie',
        'rps_numero_atual',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'certificado_password',
        'certificado_path',
        'certificado_impressao',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'driver_config' => 'array',
        'certificado_password' => 'encrypted',
        'certificado_validade' => 'date',
        'certificado_enviado_em' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'emitente_user');
    }

    public function certificadoEnviadoPor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'certificado_enviado_por');
    }

    public function notasFiscais(): HasMany
    {
        return $this->hasMany(NotaFiscal::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeVisibleTo($query, User $user)
    {
        return $user->all_emitentes
            ? $query
            : $query->whereRelation('users', 'users.id', $user->id);
    }

    public function certificadoProximoDoVencimento(int $dias = 30): bool
    {
        return $this->certificado_validade !== null
            && now()->diffInDays($this->certificado_validade, false) <= $dias;
    }
}
