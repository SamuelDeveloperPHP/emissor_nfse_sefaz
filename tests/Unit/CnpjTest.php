<?php

namespace Tests\Unit;

use App\Support\Cnpj;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

class CnpjTest extends TestCase
{
    #[DataProvider('cnpjsValidos')]
    public function test_valida_cnpj_numerico_e_alfanumerico(string $cnpj): void
    {
        $this->assertTrue(Cnpj::valido($cnpj));
    }

    public static function cnpjsValidos(): array
    {
        return [
            'numérico' => ['11.222.333/0001-81'],
            'alfanumérico' => ['12.ABC.345/01DE-35'],
        ];
    }

    #[DataProvider('cnpjsInvalidos')]
    public function test_rejeita_cnpj_invalido(string $cnpj): void
    {
        $this->assertFalse(Cnpj::valido($cnpj));
    }

    public static function cnpjsInvalidos(): array
    {
        return [
            'dígito incorreto' => ['12ABC34501DE36'],
            'dígitos verificadores com letras' => ['12ABC34501DE3X'],
            'repetido' => ['00000000000000'],
            'incompleto' => ['1122233300018'],
        ];
    }
}
