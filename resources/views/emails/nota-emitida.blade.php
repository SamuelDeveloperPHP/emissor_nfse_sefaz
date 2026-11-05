<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>NFS-e</title>
</head>
<body style="margin:0;padding:24px;background:#f4f6f5;font-family:Arial,Helvetica,sans-serif;color:#0f2a33;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;padding:28px;border-radius:6px;">
        <p style="margin:0 0 16px;">Olá{{ $tomador ? ', '.$tomador : '' }},</p>

        <p style="margin:0 0 16px;line-height:1.5;">
            <strong>{{ $emitente }}</strong> emitiu uma nota fiscal de serviço para você.
        </p>

        <table style="border-collapse:collapse;margin:0 0 16px;">
            @if ($numero)
                <tr><td style="padding:4px 16px 4px 0;color:#5b6f77;">Número da NFS-e</td><td style="padding:4px 0;">{{ $numero }}</td></tr>
            @endif
            <tr><td style="padding:4px 16px 4px 0;color:#5b6f77;">Valor</td><td style="padding:4px 0;">R$ {{ $valor }}</td></tr>
            @if ($chave)
                <tr><td style="padding:4px 16px 4px 0;color:#5b6f77;vertical-align:top;">Chave de acesso</td><td style="padding:4px 0;word-break:break-all;">{{ $chave }}</td></tr>
            @endif
        </table>

        <p style="margin:0 0 16px;line-height:1.5;">
            Segue em anexo o arquivo XML da nota{{ $temPdf ? ' e o DANFSE em PDF' : '' }}.
        </p>

        <p style="margin:24px 0 0;font-size:12px;color:#5b6f77;">Este é um envio automático; para dúvidas, responda a este e-mail.</p>
    </div>
</body>
</html>
