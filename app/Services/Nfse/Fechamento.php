<?php

namespace App\Services\Nfse;

use App\Models\Emitente;
use App\Models\NotaFiscal;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;
use OpenSpout\Common\Entity\Cell;
use OpenSpout\Common\Entity\Row;
use OpenSpout\Common\Entity\Style\Style;
use OpenSpout\Writer\XLSX\Writer;
use RuntimeException;
use ZipArchive;

/**
 * Month-end package for the accountant: every XML of the month in a ZIP and a spreadsheet with the
 * figures (ISS withheld, totals per tomador and per emitente).
 *
 * Only authorized and cancelled notas count, and only those with a real fiscal trail: notas from the
 * simulator are left out because they were never issued. Cancelled notas are listed but never summed.
 */
class Fechamento
{
    /** @param  string  $mes  "YYYY-MM" */
    public function consulta(User $user, string $mes, ?int $emitenteId, string $ambiente = 'producao'): Builder
    {
        $inicio = Carbon::createFromFormat('!Y-m', $mes)->startOfMonth();

        return NotaFiscal::query()
            ->whereIn('emitente_id', Emitente::query()->visibleTo($user)->where('driver', '!=', 'simulador')->select('id'))
            ->whereIn('status', [NotaFiscal::STATUS_AUTORIZADA, NotaFiscal::STATUS_CANCELADA])
            ->whereBetween('emitida_em', [$inicio, $inicio->copy()->endOfMonth()])
            ->whereHas('lote', fn ($q) => $q->where('ambiente', $ambiente))
            ->when($emitenteId, fn ($q) => $q->where('emitente_id', $emitenteId))
            ->with('emitente:id,razao_social,cnpj', 'lote:id,ambiente');
    }

    /** @return array{autorizadas: int, canceladas: int, valor: float, iss_retido: float, tem_notas: bool} */
    public function resumo(Builder $consulta): array
    {
        $r = ['autorizadas' => 0, 'canceladas' => 0, 'valor' => 0.0, 'iss_retido' => 0.0];

        foreach ($consulta->cursor() as $nota) {
            if ($nota->status === NotaFiscal::STATUS_CANCELADA) {
                $r['canceladas']++;

                continue;
            }

            $r['autorizadas']++;
            $r['valor'] += (float) $nota->valor_servicos;
            $r['iss_retido'] += $this->issRetido($nota);
        }

        return [
            'autorizadas' => $r['autorizadas'],
            'canceladas' => $r['canceladas'],
            'valor' => round($r['valor'], 2),
            'iss_retido' => round($r['iss_retido'], 2),
            'tem_notas' => $r['autorizadas'] + $r['canceladas'] > 0,
        ];
    }

    /** ISS withheld by the tomador on this nota (zero when not withheld or when no rate was given). */
    public function issRetido(NotaFiscal $nota): float
    {
        return $this->iss($nota, true);
    }

    /** ISS estimated from the informed rate; Simples notas carry no rate and read as zero. */
    public function iss(NotaFiscal $nota, bool $apenasRetido = false): float
    {
        $p = $nota->payload ?? [];

        if ($apenasRetido && empty($p['iss_retido'])) {
            return 0.0;
        }

        return round((float) $nota->valor_servicos * (float) ($p['aliquota'] ?? 0) / 100, 2);
    }

    /**
     * Writes the XLSX to $caminho: a sheet with every nota, one grouped by tomador and one by emitente.
     */
    public function planilha(Builder $consulta, string $caminho, string $mes): void
    {
        $dinheiro = (new Style)->setFormat('#,##0.00');
        $negrito = (new Style)->setFontBold();

        $writer = new Writer;
        $writer->openToFile($caminho);

        $writer->getCurrentSheet()->setName('Notas');
        $writer->addRow(Row::fromValues(['Emissão', 'Emitente', 'CNPJ do emitente', 'Nº NFS-e', 'Chave de acesso', 'Tomador', 'CPF/CNPJ do tomador', 'Descrição', 'Valor (R$)', 'Alíquota ISS (%)', 'ISS (R$)', 'ISS retido', 'Situação'], $negrito));

        $porTomador = [];
        $porEmitente = [];

        foreach ($consulta->orderBy('emitida_em')->orderBy('id')->cursor() as $nota) {
            $p = $nota->payload ?? [];
            $cancelada = $nota->status === NotaFiscal::STATUS_CANCELADA;
            $valor = (float) $nota->valor_servicos;
            $iss = $this->iss($nota);
            $retido = ! empty($p['iss_retido']);

            $writer->addRow(new Row([
                Cell::fromValue($nota->emitida_em->format('d/m/Y')),
                Cell::fromValue($nota->emitente->razao_social),
                Cell::fromValue($nota->emitente->cnpj),
                Cell::fromValue((string) $nota->numero_nfse),
                Cell::fromValue((string) $nota->chave_acesso),
                Cell::fromValue((string) ($p['tomador_nome'] ?? '')),
                Cell::fromValue((string) ($p['tomador_documento'] ?? '')),
                Cell::fromValue((string) ($p['descricao'] ?? '')),
                Cell::fromValue($valor, $dinheiro),
                Cell::fromValue(isset($p['aliquota']) ? (float) $p['aliquota'] : ''),
                Cell::fromValue($iss, $dinheiro),
                Cell::fromValue($retido ? 'Sim' : 'Não'),
                Cell::fromValue($cancelada ? 'Cancelada' : 'Autorizada'),
            ]));

            // Cancelled notas are listed above but never enter the totals.
            if ($cancelada) {
                continue;
            }

            $chaveTomador = ($p['tomador_documento'] ?? '').'|'.$nota->emitente_id;
            $porTomador[$chaveTomador] ??= ['nome' => (string) ($p['tomador_nome'] ?? ''), 'doc' => (string) ($p['tomador_documento'] ?? ''), 'emitente' => $nota->emitente->razao_social, 'qtd' => 0, 'valor' => 0.0, 'retido' => 0.0];
            $porTomador[$chaveTomador]['qtd']++;
            $porTomador[$chaveTomador]['valor'] += $valor;
            $porTomador[$chaveTomador]['retido'] += $retido ? $iss : 0.0;

            $porEmitente[$nota->emitente_id] ??= ['nome' => $nota->emitente->razao_social, 'cnpj' => $nota->emitente->cnpj, 'qtd' => 0, 'valor' => 0.0, 'iss' => 0.0, 'retido' => 0.0];
            $porEmitente[$nota->emitente_id]['qtd']++;
            $porEmitente[$nota->emitente_id]['valor'] += $valor;
            $porEmitente[$nota->emitente_id]['iss'] += $iss;
            $porEmitente[$nota->emitente_id]['retido'] += $retido ? $iss : 0.0;
        }

        $writer->addNewSheetAndMakeItCurrent()->setName('Por tomador');
        $writer->addRow(Row::fromValues(['Tomador', 'CPF/CNPJ', 'Emitente', 'Notas', 'Total (R$)', 'ISS retido (R$)'], $negrito));
        uasort($porTomador, fn ($a, $b) => $b['valor'] <=> $a['valor']);
        foreach ($porTomador as $t) {
            $writer->addRow(new Row([Cell::fromValue($t['nome']), Cell::fromValue($t['doc']), Cell::fromValue($t['emitente']), Cell::fromValue($t['qtd']), Cell::fromValue(round($t['valor'], 2), $dinheiro), Cell::fromValue(round($t['retido'], 2), $dinheiro)]));
        }

        $writer->addNewSheetAndMakeItCurrent()->setName('Por emitente');
        $writer->addRow(Row::fromValues(['Emitente', 'CNPJ', 'Notas', 'Total (R$)', 'ISS (R$)', 'ISS retido (R$)'], $negrito));
        uasort($porEmitente, fn ($a, $b) => $b['valor'] <=> $a['valor']);
        foreach ($porEmitente as $e) {
            $writer->addRow(new Row([Cell::fromValue($e['nome']), Cell::fromValue($e['cnpj']), Cell::fromValue($e['qtd']), Cell::fromValue(round($e['valor'], 2), $dinheiro), Cell::fromValue(round($e['iss'], 2), $dinheiro), Cell::fromValue(round($e['retido'], 2), $dinheiro)]));
        }

        $writer->close();
    }

    /**
     * Writes a ZIP with one folder per emitente (by CNPJ): the NFS-e XML of each nota, and the signed
     * cancellation event next to the cancelled ones. Returns how many XML files went in.
     */
    public function zip(Builder $consulta, string $caminho): int
    {
        $zip = new ZipArchive;
        if ($zip->open($caminho, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
            throw new RuntimeException('Não foi possível criar o arquivo ZIP.');
        }

        $arquivos = 0;

        foreach ($consulta->orderBy('id')->cursor() as $nota) {
            $pasta = preg_replace('/\D/', '', (string) $nota->emitente->cnpj);
            $nome = $nota->chave_acesso ?: 'nota-'.$nota->id;

            if (filled($nota->nfse_xml)) {
                $zip->addFromString("{$pasta}/{$nome}.xml", $nota->nfse_xml);
                $arquivos++;
            }
            if (filled($nota->cancelamento_xml)) {
                $zip->addFromString("{$pasta}/{$nome}-cancelamento.xml", $nota->cancelamento_xml);
                $arquivos++;
            }
        }

        $zip->close();

        return $arquivos;
    }
}
