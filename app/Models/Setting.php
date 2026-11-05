<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * System-wide switches, edited only by the Administrador.
 */
class Setting extends Model
{
    /** When on, batch/single emission lets the user pick homologação or produção. */
    public const ESCOLHER_AMBIENTE = 'emissao.escolher_ambiente';

    public $incrementing = false;

    protected $primaryKey = 'key';

    protected $keyType = 'string';

    protected $fillable = ['key', 'value'];

    public static function bool(string $key, bool $default = false): bool
    {
        $value = static::query()->whereKey($key)->value('value');

        return $value === null ? $default : $value === '1';
    }

    public static function putBool(string $key, bool $value): void
    {
        static::query()->updateOrCreate(['key' => $key], ['value' => $value ? '1' : '0']);
    }
}
