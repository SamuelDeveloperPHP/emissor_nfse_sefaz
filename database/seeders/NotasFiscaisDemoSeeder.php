<?php

namespace Database\Seeders;

use App\Models\Emitente;
use App\Models\NotaFiscal;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Populates the dashboard with fake emitentes and invoices for local development.
 * Every demo emitente is prefixed with "[DEMO]" so it can be found and removed:
 *   Emitente::where('razao_social', 'like', '[DEMO]%')->delete();
 * (invoices go with them through the cascading foreign key).
 *
 * Run on demand: php artisan db:seed --class=NotasFiscaisDemoSeeder
 */
class NotasFiscaisDemoSeeder extends Seeder
{
    public function run(): void
    {
        if (Emitente::where('razao_social', 'like', '[DEMO]%')->exists()) {
            $this->command?->warn('Dados de demonstração já existem; nada a fazer.');

            return;
        }

        mt_srand(42);
        $now = now();

        $emitentes = collect([
            ['[DEMO] Aurora Contabilidade Ltda', '90000000000101', 'São Paulo', 'SP', true, '+120 days'],
            ['[DEMO] Vértice Serviços de TI ME', '90000000000202', 'Campinas', 'SP', true, '+9 days'],
            ['[DEMO] Clínica Horizonte S/S', '90000000000303', 'Belo Horizonte', 'MG', true, '-3 days'],
            ['[DEMO] Oficina Norte Engenharia', '90000000000404', 'Curitiba', 'PR', true, null],
            ['[DEMO] Praça Alta Consultoria', '90000000000505', 'Rio de Janeiro', 'RJ', false, '+200 days'],
            ['[DEMO] Marés Arquitetura EPP', '90000000000606', 'Florianópolis', 'SC', false, '+45 days'],
        ])->map(fn (array $e) => Emitente::create([
            'razao_social' => $e[0],
            'cnpj' => $e[1],
            'municipio' => $e[2],
            'uf' => $e[3],
            'regime_tributario' => 'simples_nacional',
            'ambiente' => 'homologacao',
            'driver' => 'adn_nacional',
            'is_active' => $e[4],
            'certificado_path' => $e[5] ? 'certificados/demo.pfx' : null,
            'certificado_validade' => $e[5] ? $now->copy()->modify($e[5])->toDateString() : null,
        ]));

        foreach ($emitentes->where('is_active', true) as $emitente) {
            $this->gerarNotas($emitente, $now);
        }
    }

    private function gerarNotas(Emitente $emitente, $now): void
    {
        $rows = [];
        $numero = 1;
        $dia = $now->copy()->startOfYear();

        while ($dia->lte($now)) {
            $util = $dia->isWeekday();
            $quantidade = $util ? mt_rand(14, 46) : mt_rand(0, 6);

            for ($i = 0; $i < $quantidade; $i++) {
                $maxHora = $dia->isSameDay($now) ? $now->hour : 19;
                $emitidaEm = $dia->copy()->setTime(mt_rand(min(7, $maxHora), $maxHora), mt_rand(0, 59), mt_rand(0, 59));

                if ($emitidaEm->gt($now)) {
                    continue;
                }

                $sorteio = mt_rand(1, 100);
                $recente = $emitidaEm->gte($now->copy()->subDay()->startOfDay());
                $status = match (true) {
                    $sorteio <= 3 => NotaFiscal::STATUS_CANCELADA,
                    $sorteio <= 8 => NotaFiscal::STATUS_REJEITADA,
                    $sorteio <= 20 && $recente => NotaFiscal::STATUS_PENDENTE,
                    default => NotaFiscal::STATUS_AUTORIZADA,
                };

                $rows[] = [
                    'emitente_id' => $emitente->id,
                    'numero' => (string) $numero++,
                    'status' => $status,
                    'valor_servicos' => mt_rand(15000, 850000) / 100,
                    'motivo_rejeicao' => $status === NotaFiscal::STATUS_REJEITADA ? 'Código de tributação municipal inválido' : null,
                    'emitida_em' => $emitidaEm,
                    'created_at' => $emitidaEm,
                    'updated_at' => $emitidaEm,
                ];
            }

            $dia->addDay();
        }

        DB::transaction(function () use ($rows) {
            foreach (array_chunk($rows, 1000) as $chunk) {
                NotaFiscal::insert($chunk);
            }
        });
    }
}
