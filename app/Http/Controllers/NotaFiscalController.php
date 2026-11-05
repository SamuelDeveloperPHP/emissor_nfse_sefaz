<?php

namespace App\Http\Controllers;

use App\Mail\NotaFiscalEmitida;
use App\Models\Emitente;
use App\Models\NotaFiscal;
use App\Services\Nfse\Drivers\DriverManager;
use App\Services\Nfse\EventoBuilder;
use App\Services\Nfse\NfseException;
use App\Services\Nfse\NotaOperacoes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class NotaFiscalController extends Controller
{
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

        $notas = NotaFiscal::query()
            ->whereIn('emitente_id', Emitente::query()->visibleTo($user)->select('id'))
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
                'data' => ($nota->emitida_em ?? $nota->created_at)->format('d/m/Y H:i'),
            ]);

        return Inertia::render('Fiscal/Notas/index', [
            'notas' => $notas,
            'filtros' => $request->only(['emitente_id', 'status', 'de', 'ate', 'q']),
            'emitentes' => Emitente::query()->visibleTo($user)->orderBy('razao_social')->get(['id', 'razao_social']),
        ]);
    }

    public function show(Request $request, NotaFiscal $nota)
    {
        $this->autorizar($request, $nota);
        $nota->load('emitente', 'lote');

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
                'pode_enviar_email' => $nota->status === NotaFiscal::STATUS_AUTORIZADA && filled($nota->nfse_xml) && $nota->emitente->driver !== 'simulador',
                'tomador_email' => $nota->payload['tomador_email'] ?? null,
                'email_enviado_em' => $nota->email_enviado_em?->format('d/m/Y H:i'),
                'email_enviado_para' => $nota->email_enviado_para,
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

        $pdf = $drivers->for($nota->emitente)->baixarDanfse($nota->emitente, $nota);

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

        $resultado = $operacoes->consultar($nota->load('emitente', 'lote'));

        return back()->with(
            $resultado['status'] === NotaFiscal::STATUS_PENDENTE ? 'error' : 'success',
            $resultado['status'] === NotaFiscal::STATUS_PENDENTE
                ? ($resultado['mensagens'][0] ?? 'A nota continua pendente.')
                : 'Situação atualizada: '.$resultado['status'].'.'
        );
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
            return back()->withErrors(['cancelamento' => $e->getMessage()]);
        }

        if (! $resultado['cancelada']) {
            return back()->withErrors(['cancelamento' => $resultado['mensagens'][0] ?? 'O cancelamento não foi aceito.']);
        }

        return back()->with('success', 'Nota cancelada.');
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
            return back()->withErrors(['email' => 'Só dá para enviar uma nota autorizada que tenha o XML da NFS-e.']);
        }
        if ($nota->emitente->driver === 'simulador') {
            return back()->withErrors(['email' => 'Esta nota é do simulador e não tem valor fiscal; ela não é enviada a clientes.']);
        }

        Mail::to($dados['email'])->queue(new NotaFiscalEmitida($nota));

        $nota->update(['email_enviado_em' => now(), 'email_enviado_para' => $dados['email']]);

        return back()->with('success', 'E-mail na fila de envio para '.$dados['email'].'.');
    }

    private function autorizar(Request $request, NotaFiscal $nota): void
    {
        abort_unless($request->user()->canAccessEmitente($nota->emitente), 403);
    }
}
