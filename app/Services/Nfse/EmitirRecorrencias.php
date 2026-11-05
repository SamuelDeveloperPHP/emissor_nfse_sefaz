<?php

namespace App\Services\Nfse;

use App\Jobs\ProcessarLoteJob;
use App\Models\Lote;
use App\Models\Recorrencia;
use App\Models\Setting;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

/**
 * Issues the recurring notas that are due. Each recurrence becomes a one-line lote that goes
 * through the normal pipeline (DPS, signature, transmission).
 *
 * A recurrence is advanced to its next month before anything is queued, inside a row lock, so
 * running this twice (overlapping crons, a retry) cannot issue the same month twice. If the system
 * was down for months only one nota is issued and the schedule moves on: it never "catches up".
 */
class EmitirRecorrencias
{
    public function __construct(private readonly LoteImporter $importer)
    {
    }

    /** @return array{emitidas: int, falhas: int} */
    public function executar(?Carbon $hoje = null): array
    {
        $hoje = ($hoje ?? now())->copy()->startOfDay();
        $emitidas = 0;
        $falhas = 0;
        $lotes = [];

        $ids = Recorrencia::query()->where('ativa', true)->whereDate('proxima_emissao', '<=', $hoje)->orderBy('id')->pluck('id');

        foreach ($ids as $id) {
            $lote = DB::transaction(function () use ($id, $hoje, &$falhas) {
                $r = Recorrencia::query()->lockForUpdate()->with('emitente', 'tomador', 'servico', 'user')->find($id);

                // Another run got here first, or it was paused meanwhile.
                if (! $r || ! $r->ativa || $r->proxima_emissao->greaterThan($hoje)) {
                    return null;
                }

                $proxima = Recorrencia::proximaData($hoje, $r->dia_do_mes);

                if (! $r->emitente->is_active) {
                    $r->update(['proxima_emissao' => $proxima, 'ultimo_erro' => 'O emitente está inativo; a nota deste mês não foi emitida.']);
                    $falhas++;

                    return null;
                }

                $linha = $this->linha($r, $hoje);
                [, $erros] = $this->importer->normalizar($linha);
                if ($erros) {
                    $r->update(['proxima_emissao' => $proxima, 'ultimo_erro' => mb_substr($erros[0], 0, 255)]);
                    $falhas++;

                    return null;
                }

                // Unattended runs stay in homologação unless the Administrador has opened the choice.
                $ambiente = Setting::bool(Setting::ESCOLHER_AMBIENTE) ? $r->ambiente : 'homologacao';
                $lote = $this->importer->importarLinha($r->emitente, $r->user, $linha, 'Recorrente: '.$r->tomador->nome, $ambiente);

                $r->update([
                    'proxima_emissao' => $proxima,
                    'ultima_emissao_em' => now(),
                    'ultimo_lote_id' => $lote->id,
                    'ultimo_erro' => null,
                ]);

                return $lote;
            });

            if ($lote instanceof Lote) {
                $lotes[] = $lote;
                $emitidas++;
            }
        }

        // Queued only after the schedule is saved, so a failure here cannot cause a second issue.
        foreach ($lotes as $lote) {
            ProcessarLoteJob::dispatch($lote);
        }

        return ['emitidas' => $emitidas, 'falhas' => $falhas];
    }

    /** @return array<string, string> */
    private function linha(Recorrencia $r, Carbon $hoje): array
    {
        $t = $r->tomador;
        $s = $r->servico;

        return [
            'tomador_documento' => $t->documento,
            'tomador_nome' => $t->nome,
            'tomador_email' => (string) $t->email,
            'tomador_cep' => (string) $t->cep,
            'tomador_logradouro' => (string) $t->logradouro,
            'tomador_numero' => (string) $t->numero,
            'tomador_complemento' => (string) $t->complemento,
            'tomador_bairro' => (string) $t->bairro,
            'tomador_codigo_municipio' => (string) $t->codigo_municipio,
            'descricao_servico' => $s->descricao,
            'codigo_tributacao_nacional' => $s->codigo_tributacao,
            'valor_servico' => (string) $r->valor,
            'aliquota_iss' => $s->aliquota !== null ? (string) $s->aliquota : '',
            'iss_retido' => $s->iss_retido ? '1' : '0',
            'data_competencia' => $hoje->toDateString(),
        ];
    }
}
