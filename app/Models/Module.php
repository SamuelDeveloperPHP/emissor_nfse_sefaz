<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Module extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'key',
        'name',
        'icon',
        'route',
        'parent_id',
        'order',
        'is_active',
        'actions',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'actions' => 'array',
    ];

    /**
     * The standard CRUD actions every module gets, regardless of its own extra actions.
     *
     * @var array<int, string>
     */
    public const DEFAULT_ACTIONS = ['view', 'create', 'edit', 'delete'];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Module::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Module::class, 'parent_id')->orderBy('order');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeRoots($query)
    {
        return $query->whereNull('parent_id');
    }

    /**
     * All actions this module supports: the standard CRUD set plus any extra actions of its own.
     *
     * @return array<int, string>
     */
    public function allActions(): array
    {
        return array_values(array_unique([...self::DEFAULT_ACTIONS, ...($this->actions ?? [])]));
    }

    /**
     * The spatie permission names this module should have, e.g. "emitentes.view".
     *
     * A module with no route of its own is just a sidebar grouping (e.g. "Fiscal"),
     * not a resource — it has nothing to authorize, so it gets no permissions.
     *
     * @return array<int, string>
     */
    public function permissionNames(): array
    {
        if (blank($this->route)) {
            return [];
        }

        return array_map(fn (string $action) => "{$this->key}.{$action}", $this->allActions());
    }
}
