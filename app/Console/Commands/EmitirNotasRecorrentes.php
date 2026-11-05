<?php

namespace App\Console\Commands;

use App\Services\Nfse\EmitirRecorrencias;
use Illuminate\Console\Command;

class EmitirNotasRecorrentes extends Command
{
    protected $signature = 'nfse:emitir-recorrentes';

    protected $description = 'Emite as notas recorrentes (mensalidades) que vencem hoje ou estão atrasadas.';

    public function handle(EmitirRecorrencias $emissor): int
    {
        $resultado = $emissor->executar();

        $this->info("{$resultado['emitidas']} nota(s) recorrente(s) enviada(s) para processamento; {$resultado['falhas']} com problema.");

        return self::SUCCESS;
    }
}
