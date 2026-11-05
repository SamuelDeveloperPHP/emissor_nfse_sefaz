<?php

namespace App\Services\Nfse\Drivers;

use App\Models\Emitente;

class DriverManager
{
    public function for(Emitente $emitente): Transmissor
    {
        return match ($emitente->driver) {
            'simulador' => new SimuladorDriver(),
            'adn_nacional' => new AdnNacionalDriver(),
            default => new NaoImplementadoDriver(),
        };
    }
}
