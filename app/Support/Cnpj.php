<?php

namespace App\Support;

final class Cnpj
{
    public static function sanitizar(?string $valor): string
    {
        return preg_replace('/[^A-Z0-9]/', '', mb_strtoupper((string) $valor)) ?? '';
    }

    public static function valido(?string $valor): bool
    {
        $cnpj = self::sanitizar($valor);

        if (! preg_match('/^[A-Z0-9]{12}[0-9]{2}$/', $cnpj)
            || preg_match('/^(.)\1{13}$/', $cnpj)) {
            return false;
        }

        $base = substr($cnpj, 0, 12);
        $primeiro = self::digito($base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
        $segundo = self::digito($base.$primeiro, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

        return substr($cnpj, -2) === $primeiro.$segundo;
    }

    /** @param array<int, int> $pesos */
    private static function digito(string $base, array $pesos): string
    {
        $soma = 0;

        foreach (str_split($base) as $indice => $caractere) {
            $soma += (ord($caractere) - 48) * $pesos[$indice];
        }

        $resto = $soma % 11;

        return (string) ($resto < 2 ? 0 : 11 - $resto);
    }
}
