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

    /** The office's own A1 certificate (JSON: file, encrypted password and what was read from it). */
    public const CERTIFICADO_SISTEMA = 'certificado.sistema';

    public $incrementing = false;

    protected $primaryKey = 'key';

    protected $keyType = 'string';

    protected $fillable = ['key', 'value'];

    public static function bool(string $key, bool $default = false): bool
    {
        if ($key === self::ESCOLHER_AMBIENTE) {
            return false;
        }

        $value = static::query()->whereKey($key)->value('value');

        return $value === null ? $default : $value === '1';
    }

    /** @return array<string, mixed>|null */
    public static function json(string $key): ?array
    {
        $value = static::query()->whereKey($key)->value('value');
        $dados = $value === null ? null : json_decode($value, true);

        return is_array($dados) ? $dados : null;
    }

    public static function putJson(string $key, array $value): void
    {
        static::query()->updateOrCreate(['key' => $key], ['value' => json_encode($value)]);
    }

    public static function forget(string $key): void
    {
        static::query()->whereKey($key)->delete();
    }

    public static function putBool(string $key, bool $value): void
    {
        if ($key === self::ESCOLHER_AMBIENTE) {
            $value = false;
        }

        static::query()->updateOrCreate(['key' => $key], ['value' => $value ? '1' : '0']);
    }
}
