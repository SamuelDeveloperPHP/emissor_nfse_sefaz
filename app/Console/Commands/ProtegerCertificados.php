<?php

namespace App\Console\Commands;

use App\Models\Emitente;
use App\Services\Nfse\CofreDeCertificados;
use Illuminate\Console\Command;
use Throwable;

class ProtegerCertificados extends Command
{
    protected $signature = 'nfse:proteger-certificados';

    protected $description = 'Criptografa os certificados A1 guardados em texto simples por versões anteriores.';

    public function handle(CofreDeCertificados $cofre): int
    {
        $convertidos = 0;

        Emitente::query()->whereNotNull('certificado_path')->each(function (Emitente $emitente) use ($cofre, &$convertidos) {
            if ($cofre->estaProtegido($emitente->certificado_path)) {
                return;
            }

            try {
                $antigo = $emitente->certificado_path;
                $novo = $cofre->guardar($cofre->ler($antigo), $emitente->id);
                $emitente->forceFill(['certificado_path' => $novo])->save();
                $cofre->apagar($antigo);
                $convertidos++;
            } catch (Throwable $e) {
                $this->warn("Emitente {$emitente->id}: não convertido ({$e->getMessage()}).");
            }
        });

        $this->info("{$convertidos} certificado(s) protegido(s).");

        return self::SUCCESS;
    }
}
