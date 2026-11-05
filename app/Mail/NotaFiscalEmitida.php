<?php

namespace App\Mail;

use App\Models\NotaFiscal;
use App\Services\Nfse\Drivers\DriverManager;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

/**
 * Sends an authorized NFS-e to the tomador with the XML and, when the ADN provides it, the DANFSE PDF.
 * A failure to fetch the PDF never blocks the e-mail: the XML is the fiscal document.
 */
class NotaFiscalEmitida extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public NotaFiscal $nota)
    {
    }

    public function envelope(): Envelope
    {
        $emitente = $this->nota->emitente;

        return new Envelope(
            subject: 'NFS-e '.($this->nota->numero_nfse ?? '').' - '.$emitente->razao_social,
            replyTo: filled($emitente->email) ? [new Address($emitente->email, $emitente->razao_social)] : [],
        );
    }

    public function content(): Content
    {
        return new Content(view: 'emails.nota-emitida', with: [
            'emitente' => $this->nota->emitente->razao_social,
            'tomador' => $this->nota->payload['tomador_nome'] ?? null,
            'numero' => $this->nota->numero_nfse,
            'valor' => number_format((float) $this->nota->valor_servicos, 2, ',', '.'),
            'chave' => $this->nota->chave_acesso,
            'temPdf' => $this->danfse() !== null,
        ]);
    }

    /** @return array<int, Attachment> */
    public function attachments(): array
    {
        $nome = $this->nota->chave_acesso ?? (string) $this->nota->id;
        $anexos = [
            Attachment::fromData(fn () => $this->nota->nfse_xml, "nfse-{$nome}.xml")->withMime('application/xml'),
        ];

        if (($pdf = $this->danfse()) !== null) {
            $anexos[] = Attachment::fromData(fn () => $pdf, "danfse-{$nome}.pdf")->withMime('application/pdf');
        }

        return $anexos;
    }

    private ?string $pdf = null;

    private bool $pdfTentado = false;

    private function danfse(): ?string
    {
        if (! $this->pdfTentado) {
            $this->pdfTentado = true;
            $this->pdf = app(DriverManager::class)->for($this->nota->emitente)->baixarDanfse($this->nota->emitente, $this->nota);
        }

        return $this->pdf;
    }
}
