<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessarLoteJob;
use App\Mail\NotaFiscalEmitida;
use App\Models\Emitente;
use App\Models\Lote;
use App\Models\NotaFiscal;
use App\Services\Nfse\DpsBuilder;
use App\Services\Nfse\Drivers\DriverManager;
use App\Services\Nfse\EventoBuilder;
use App\Services\Nfse\NfseException;
use App\Services\Nfse\NotaOperacoes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Throwable;

class NotaFiscalController extends Controller
{
    /** How many pending notas one click on "Consultar pendentes" looks up. */
    private const LIMITE_CONSULTA = 25;

    public function index(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'emitente_id' => ['nullable', 'integer'],
            'status' => ['nullable', Rule::in(NotaFiscal::STATUSES)],
            'de' => ['nullable', 'date'],
            'ate' => ['nullable', 'date'],
            'q' => ['nullable', 'string', 'max:100'],
        ]);

        $visiveis = NotaFiscal::query()->whereIn('emitente_id', Emitente::query()->visibleTo($user)->select('id'));

        $notas = (clone $visiveis)
            ->with('emitente:id,razao_social,driver', 'lote:id,ambiente')
            ->when($request->filled('emitente_id'), fn ($q) => $q->where('emitente_id', $request->integer('emitente_id')))
            ->when($request->filled('status'), fn ($q) => $q->where('status', $request->input('status')))
            ->when($request->filled('de'), fn ($q) => $q->whereDate('created_at', '>=', $request->input('de')))
            ->when($request->filled('ate'), fn ($q) => $q->whereDate('created_at', '<=', $request->input('ate')))
            ->when($request->filled('q'), function ($q) use ($request) {
                $termo = '%'.str_replace(['%', '_'], ['\%', '\_'], trim($request->input('q'))).'%';

                $q->where(fn ($w) => $w->where('numero_nfse', 'like', $termo)
                    ->orWhere('chave_acesso', 'like', $termo)
                    ->orWhere('payload', 'like', $termo));
            })
            ->latest('id')
            ->paginate(25)
            ->withQueryString()
            ->through(fn (NotaFiscal $nota) => [
                'id' => $nota->id,
                'status' => $nota->status,
                'emitente' => $nota->emitente->razao_social,
                'tomador' => $nota->payload['tomador_nome'] ?? null,
                'numero_nfse' => $nota->numero_nfse,
                'numero_dps' => $nota->numero,
                'valor' => $nota->valor_servicos,
                'ambiente' => $nota->lote?->ambiente,
                'simulada' => $nota->emitente->driver === 'simulador',
                'substituida' => $nota->substituida_por_id !== null,
                'substituta' => $nota->chaveSubstituida() !== null,
                'data' => ($nota->emitida_em ?? $nota->created_at)->format('d/m/Y H:i'),
            ]);

        return Inertia::render('Fiscal/Notas/index', [
            'notas' => $notas,
            'filtros' => $request->only(['emitente_id', 'status', 'de', 'ate', 'q']),
            'emitentes' => Emitente::query()->visibleTo($user)->orderBy('razao_social')->get(['id', 'razao_social']),
            'pendentes' => (clone $visiveis)->where('status', NotaFiscal::STATUS_PENDENTE)->count(),
        ]);
    }

    public function show(Request $request, NotaFiscal $nota)
    {
        $this->autorizar($request, $nota);
        $nota->load('emitente', 'lote', 'substituidaPor:id,numero_nfse');

        $substituida = $nota->chaveSubstituida()
            ? NotaFiscal::query()->where('emitente_id', $nota->emitente_id)->where('chave_acesso', $nota->chaveSubstituida())->first(['id', 'numero_nfse'])
            : null;

        return Inertia::render('Fiscal/Notas/show', [
            'nota' => [
                'id' => $nota->id,
                'status' => $nota->status,
                'emitente' => $nota->emitente->razao_social,
                'simulada' => $nota->emitente->driver === 'simulador',
                'ambiente' => $nota->lote?->ambiente,
                'lote_id' => $nota->lote_id,
                'numero_dps' => $nota->numero,
                'numero_nfse' => $nota->numero_nfse,
                'chave_acesso' => $nota->chave_acesso,
                'valor' => $nota->valor_servicos,
                'tomador' => $nota->payload['tomador_nome'] ?? null,
                'tomador_documento' => $nota->payload['tomador_documento'] ?? null,
                'descricao' => $nota->payload['descricao'] ?? null,
                'competencia' => $nota->payload['competencia'] ?? null,
                'criada_em' => $nota->created_at->format('d/m/Y H:i'),
                'emitida_em' => $nota->emitida_em?->format('d/m/Y H:i'),
                'cancelada_em' => $nota->cancelada_em?->format('d/m/Y H:i'),
                'cancelamento_motivo' => $nota->cancelamento_motivo,
                'consultada_em' => $nota->consultada_em?->format('d/m/Y H:i'),
                'erros' => $nota->erros ?? [],
                'tem_dps' => filled($nota->dps_xml),
                'tem_nfse' => filled($nota->nfse_xml),
                'tem_cancelamento' => filled($nota->cancelamento_xml),
                'pode_danfse' => filled($nota->chave_acesso) && $nota->status !== NotaFiscal::STATUS_PENDENTE,
                'pode_consultar' => $nota->status === NotaFiscal::STATUS_PENDENTE && filled($nota->dps_xml),
                'pode_cancelar' => $nota->status === NotaFiscal::STATUS_AUTORIZADA,
                'pode_substituir' => $nota->status === NotaFiscal::STATUS_AUTORIZADA && filled($nota->chave_acesso),
                'pode_enviar_email' => $nota->status === NotaFiscal::STATUS_AUTORIZADA && filled($nota->nfse_xml) && $nota->emitente->driver !== 'simulador',
                'tomador_email' => $nota->payload['tomador_email'] ?? null,
                'email_enviado_em' => $nota->email_enviado_em?->format('d/m/Y H:i'),
                'email_enviado_para' => $nota->email_enviado_para,
                'substituida_por' => $nota->substituidaPor ? ['id' => $nota->substituidaPor->id, 'numero_nfse' => $nota->substituidaPor->numero_nfse] : null,
                'substitui' => $substituida ? ['id' => $substituida->id, 'numero_nfse' => $substituida->numero_nfse] : null,
                'substituicao_motivo' => $nota->payload['substituicao_motivo'] ?? null,
            ],
            'motivos' => collect(EventoBuilder::MOTIVOS_CANCELAMENTO)->map(fn ($rotulo, $codigo) => ['codigo' => (string) $codigo, 'rotulo' => $rotulo])->values(),
        ]);
    }

    public function xml(Request $request, NotaFiscal $nota, string $tipo)
    {
        $this->autorizar($request, $nota);

        [$conteudo, $nome] = match ($tipo) {
            'dps' => [$nota->dps_xml, 'dps-'.($nota->numero ?? $nota->id).'.xml'],
            'nfse' => [$nota->nfse_xml, 'nfse-'.($nota->chave_acesso ?? $nota->id).'.xml'],
            'cancelamento' => [$nota->cancelamento_xml, 'cancelamento-'.($nota->chave_acesso ?? $nota->id).'.xml'],
            default => abort(404),
        };

        abort_if(blank($conteudo), 404, 'Este XML não está disponível para a nota.');

        return response()->streamDownload(fn () => print($conteudo), $nome, ['Content-Type' => 'application/xml']);
    }

    public function danfse(Request $request, NotaFiscal $nota, DriverManager $drivers)
    {
        $this->autorizar($request, $nota);

        try {
            $pdf = $drivers->for($nota->emitente)->baixarDanfse($nota->emitente, $nota);
        } catch (Throwable $e) {
            report($e);
            $pdf = null;
        }

        if ($pdf === null) {
            return back()->with('error', 'Não foi possível baixar o DANFSE agora. Confira se a nota está autorizada e tente de novo; o XML continua disponível.');
        }

        return response()->streamDownload(fn () => print($pdf), 'danfse-'.$nota->chave_acesso.'.pdf', ['Content-Type' => 'application/pdf']);
    }

    public function consultar(Request $request, NotaFiscal $nota, NotaOperacoes $operacoes)
    {
        $this->autorizar($request, $nota);

        if ($nota->status !== NotaFiscal::STATUS_PENDENTE) {
            return back()->with('error', 'Só notas pendentes precisam de consulta.');
        }

        try {
            $resultado = $operacoes->consultar($nota->load('emitente', 'lote'));
        } catch (NfseException $e) {
            return back()->with('error', $e->getMessage());
        } catch (Throwable $e) {
            return $this->falha($e, 'Não foi possível consultar a nota agora. Tente de novo em instantes.', $nota, $request);
        }

        return back()->with(
            $resultado['status'] === NotaFiscal::STATUS_PENDENTE ? 'error' : 'success',
            $resultado['status'] === NotaFiscal::STATUS_PENDENTE
                ? ($resultado['mensagens'][0] ?? 'A nota continua pendente.')
                : 'Situação atualizada: '.$resultado['status'].'.'
        );
    }

    /** Looks up, now, the pending notas the user can see (the scheduler does the same every 5 minutes). */
    public function consultarPendentes(Request $request, NotaOperacoes $operacoes)
    {
        $notas = NotaFiscal::query()
            ->whereIn('emitente_id', Emitente::query()->visibleTo($request->user())->select('id'))
            ->where('status', NotaFiscal::STATUS_PENDENTE)
            ->whereNotNull('dps_xml')
            ->orderByRaw('consultada_em IS NOT NULL')
            ->orderBy('consultada_em')
            ->limit(self::LIMITE_CONSULTA)
            ->with('emitente', 'lote')
            ->get();

        if ($notas->isEmpty()) {
            return back()->with('success', 'Não há notas pendentes para consultar.');
        }

        $resolvidas = 0;
        $falhas = 0;

        foreach ($notas as $nota) {
            try {
                if ($operacoes->consultar($nota)['status'] !== NotaFiscal::STATUS_PENDENTE) {
                    $resolvidas++;
                }
            } catch (Throwable $e) {
                report($e);
                $falhas++;
            }
        }

        $resumo = $notas->count().' nota(s) consultada(s): '.$resolvidas.' resolvida(s), '.($notas->count() - $resolvidas - $falhas).' ainda pendente(s)';

        return $falhas > 0
            ? back()->with('warning', $resumo.' e '.$falhas.' com falha na consulta.')
            : back()->with('success', $resumo.'.');
    }

    public function cancelar(Request $request, NotaFiscal $nota, NotaOperacoes $operacoes)
    {
        $this->autorizar($request, $nota);

        $dados = $request->validate([
            'motivo_codigo' => ['required', Rule::in(array_keys(EventoBuilder::MOTIVOS_CANCELAMENTO))],
            'motivo' => ['required', 'string', 'min:15', 'max:255'],
        ], [
            'motivo.min' => 'Explique o motivo com pelo menos 15 caracteres.',
        ]);

        try {
            $resultado = $operacoes->cancelar($nota->load('emitente', 'lote'), (string) $dados['motivo_codigo'], $dados['motivo']);
        } catch (NfseException $e) {
            return back()->with('error', $e->getMessage());
        } catch (Throwable $e) {
            return $this->falha($e, 'Não foi possível cancelar a nota agora. Confira a situação dela e tente de novo.', $nota, $request);
        }

        if (! $resultado['cancelada']) {
            return back()->with('error', $resultado['mensagens'][0] ?? 'O cancelamento não foi aceito.');
        }

        return back()->with('success', 'Nota cancelada.');
    }

    /** The form to issue the corrected nota that replaces an authorized one. */
    public function substituir(Request $request, NotaFiscal $nota)
    {
        $this->autorizar($request, $nota);
        $nota->load('emitente', 'lote');

        if ($nota->status !== NotaFiscal::STATUS_AUTORIZADA || blank($nota->chave_acesso)) {
            return redirect()->route('notas.show', $nota)->with('error', 'Só é possível substituir uma nota autorizada.');
        }

        $p = $nota->payload ?? [];

        return Inertia::render('Fiscal/Notas/substituir', [
            'nota' => [
                'id' => $nota->id,
                'emitente' => $nota->emitente->razao_social,
                'numero_nfse' => $nota->numero_nfse,
                'ambiente' => $nota->lote?->ambiente ?? $nota->emitente->ambiente,
                'simulada' => $nota->emitente->driver === 'simulador',
            ],
            'dados' => [
                'tomador_documento' => (string) ($p['tomador_documento'] ?? ''),
                'tomador_nome' => (string) ($p['tomador_nome'] ?? ''),
                'tomador_email' => (string) ($p['tomador_email'] ?? ''),
                'tomador_cep' => (string) ($p['tomador_cep'] ?? ''),
                'tomador_logradouro' => (string) ($p['tomador_logradouro'] ?? ''),
                'tomador_numero' => (string) ($p['tomador_numero'] ?? ''),
                'tomador_complemento' => (string) ($p['tomador_complemento'] ?? ''),
                'tomador_bairro' => (string) ($p['tomador_bairro'] ?? ''),
                'tomador_codigo_municipio' => (string) ($p['tomador_codigo_municipio'] ?? ''),
                'descricao_servico' => (string) ($p['descricao'] ?? ''),
                'codigo_tributacao_nacional' => (string) ($p['codigo_tributacao'] ?? ''),
                'valor_servico' => isset($p['valor']) ? number_format((float) $p['valor'], 2, ',', '') : '',
                'aliquota_iss' => isset($p['aliquota']) ? number_format((float) $p['aliquota'], 2, ',', '') : '',
                'iss_retido' => ! empty($p['iss_retido']),
                'data_competencia' => (string) ($p['competencia'] ?? now()->toDateString()),
                'ibscbs_codigo_operacao' => (string) ($p['ibscbs_codigo_operacao'] ?? ''),
                'ibscbs_cst' => (string) ($p['ibscbs_cst'] ?? ''),
                'ibscbs_classificacao' => (string) ($p['ibscbs_classificacao'] ?? ''),
            ],
            'motivos' => collect(DpsBuilder::MOTIVOS_SUBSTITUICAO)->map(fn ($rotulo, $codigo) => ['codigo' => (string) $codigo, 'rotulo' => $rotulo])->values(),
        ]);
    }

    public function substituirStore(Request $request, NotaFiscal $nota, NotaOperacoes $operacoes)
    {
        $this->autorizar($request, $nota);

        // The emitente and the environment come from the nota being replaced, never from the request.
        $regras = collect(LoteController::regrasDaNota())->except(['emitente_id', 'ambiente'])->all();
        $dados = $request->validate([
            ...$regras,
            'motivo_codigo' => ['required', Rule::in(array_keys(DpsBuilder::MOTIVOS_SUBSTITUICAO))],
            'motivo' => ['required', 'string', 'min:15', 'max:255'],
        ], [
            'motivo.min' => 'Explique o motivo da substituição com pelo menos 15 caracteres.',
            'motivo_codigo.in' => 'Escolha um motivo de substituição válido.',
        ]);

        $linha = [
            ...collect($dados)->except(['iss_retido', 'motivo_codigo', 'motivo'])->map(fn ($valor) => (string) $valor)->all(),
            'iss_retido' => ! empty($dados['iss_retido']) ? '1' : '0',
        ];

        try {
            $lote = $operacoes->prepararSubstituicao($nota->load('emitente', 'lote'), $request->user(), $linha, (string) $dados['motivo_codigo'], $dados['motivo']);
        } catch (NfseException $e) {
            return back()->with('error', $e->getMessage())->withInput();
        } catch (Throwable $e) {
            return $this->falha($e, 'Não foi possível preparar a substituição. Nada foi emitido; tente de novo.', $nota, $request);
        }

        try {
            ProcessarLoteJob::dispatchSync($lote);
        } catch (Throwable $e) {
            report($e);
        }

        $lote->refresh();
        $nova = $lote->notas()->first();

        $mensagem = match ($nova?->status) {
            NotaFiscal::STATUS_AUTORIZADA => ['success', 'Substituta emitida. A nota anterior foi marcada como substituída.'],
            NotaFiscal::STATUS_PENDENTE => ['warning', 'A substituta foi enviada, mas ainda não tem resposta. A nota anterior continua valendo até a confirmação; a consulta automática acompanha.'],
            default => ['error', 'A substituta foi rejeitada: '.($nova?->motivo_rejeicao ?? 'veja os detalhes na nota').'. A nota anterior continua valendo.'],
        };

        return redirect()->route('notas.show', $nova ?? $nota)->with($mensagem[0], $mensagem[1]);
    }

    /** Queues the e-mail with the XML (and DANFSE, when available) to the tomador. */
    public function enviarEmail(Request $request, NotaFiscal $nota)
    {
        $this->autorizar($request, $nota);

        $dados = $request->validate(['email' => ['required', 'email', 'max:150']], [
            'email.required' => 'Informe o e-mail de quem vai receber a nota.',
            'email.email' => 'Esse e-mail não parece válido.',
        ]);

        if ($nota->status !== NotaFiscal::STATUS_AUTORIZADA || blank($nota->nfse_xml)) {
            return back()->with('error', 'Só dá para enviar uma nota autorizada que tenha o XML da NFS-e.');
        }
        if ($nota->emitente->driver === 'simulador') {
            return back()->with('error', 'Esta nota é do simulador e não tem valor fiscal; ela não é enviada a clientes.');
        }

        try {
            Mail::to($dados['email'])->queue(new NotaFiscalEmitida($nota));
            $nota->update(['email_enviado_em' => now(), 'email_enviado_para' => $dados['email']]);
        } catch (Throwable $e) {
            return $this->falha($e, 'Não foi possível colocar o e-mail na fila. Confira as configurações de e-mail do sistema.', $nota, $request);
        }

        return back()->with('success', 'E-mail na fila de envio para '.$dados['email'].'.');
    }

    private function autorizar(Request $request, NotaFiscal $nota): void
    {
        abort_unless($request->user()->canAccessEmitente($nota->emitente), 403);
    }

    private function falha(Throwable $e, string $mensagem, NotaFiscal $nota, Request $request)
    {
        Log::error($mensagem, ['nota_id' => $nota->id, 'user_id' => $request->user()->id, 'exception' => $e]);

        return back()->with('error', $mensagem);
    }
}
