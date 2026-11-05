<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, HasRoles, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'all_emitentes',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'all_emitentes' => 'boolean',
    ];

    public function emitentes(): BelongsToMany
    {
        return $this->belongsToMany(Emitente::class, 'emitente_user');
    }

    /**
     * Whether this user may access the given emitente: either they have the
     * blanket "all emitentes" flag, or they were individually granted access.
     */
    public function canAccessEmitente(Emitente $emitente): bool
    {
        return $this->all_emitentes || $this->emitentes()->whereKey($emitente->id)->exists();
    }
}
