# Deploy em hospedagem compartilhada (cPanel)

## O que a hospedagem precisa ter

- PHP 8.2 ou superior (em "Select PHP Version" / "MultiPHP Manager")
- Extensões PHP: `dom`, `libxml`, `openssl`, `mbstring`, `fileinfo`, `pdo_mysql`, `zip`, `xmlwriter`, `xmlreader` (planilha do fechamento)
- MySQL e criação de subdomínio com **document root** configurável
- **Terminal ou SSH** (os comandos da seção 5 precisam dele)
- Cron jobs (a fila de lotes roda por cron, não há processo fixo)
- SSL (AutoSSL / Let's Encrypt) no subdomínio

## 1. Gerar o pacote (no seu computador)

```bash
powershell -ExecutionPolicy Bypass -File deploy/build-package.ps1
```

Gera `deploy/dist/emissor-nfse.zip` (~66 MB) com o frontend já compilado e as dependências PHP de produção. Não leva `.env`, certificados nem logs.

## 2. Banco de dados

No cPanel, em "MySQL Databases": crie o banco e um usuário, e vincule os dois com todos os privilégios. Anote nome, usuário e senha.

## 3. Enviar os arquivos

1. No "File Manager", crie a pasta `emissor` **fora** de `public_html` (ex.: `/home/USUARIO/emissor`).
2. Envie o zip para ela e use "Extract".
3. Em "Subdomains", crie `nfse.seudominio.com.br` com document root `/home/USUARIO/emissor/public`.
4. Ative o SSL do subdomínio.

## 4. Configurar o `.env`

Copie `.env.production.example` para `.env` na pasta `emissor` e preencha `APP_URL`, `DB_DATABASE`, `DB_USERNAME` e `DB_PASSWORD`. Deixe `APP_ENV=production` e `APP_DEBUG=false`.

## 5. Comandos (Terminal do cPanel, dentro de `emissor`)

```bash
php artisan key:generate --force
php artisan migrate --force
php artisan db:seed --class=RolesAndPermissionsSeeder --force
php artisan usuarios:criar-admin seu@email.com.br --nome="Seu Nome"
php artisan config:cache
php artisan route:cache
chmod -R 775 storage bootstrap/cache
```

Se o comando `php` não for a versão 8.2, use o caminho completo (ex.: `/opt/cpanel/ea-php82/root/usr/bin/php`). O `db:seed` em produção **não** cria o login `admin@example.com`; o primeiro administrador é o do `usuarios:criar-admin` (senha de 12+ caracteres, pedida no terminal).

## 6. Tarefas agendadas (cron)

Em "Cron Jobs", **uma única entrada**, a cada minuto:

```
* * * * * /opt/cpanel/ea-php82/root/usr/bin/php /home/USUARIO/emissor/artisan schedule:run >/dev/null 2>&1
```

O agendador do sistema cuida de três coisas: processar a fila de lotes e os e-mails (a cada minuto), consultar no ADN as notas que ficaram pendentes por timeout ou erro do servidor (a cada 5 minutos) e emitir as notas recorrentes do dia (todo dia às 6h, no fuso de São Paulo). Se você já tinha criado o cron antigo com `queue:work`, **apague-o** e use só esta linha. Sem ela, os lotes ficam em "Processando" para sempre.

## 7. E-mail (opcional)

Para enviar a nota ao tomador, preencha no `.env` os dados SMTP de uma caixa do seu domínio (veja o bloco comentado em `.env.production.example`) e rode `php artisan config:cache`. Sem isso o envio fica registrado apenas no log.

## 8. Conferir

- `https://nfse.seudominio.com.br` abre a tela de login (com cadeado).
- Entre com o administrador, cadastre um emitente e envie um lote pequeno.
- Crie os usuários dos contadores em Administração > Usuários, com papel e emitentes liberados.

## Antes de emitir de verdade

O driver **ADN Nacional** assina a DPS com o certificado A1 e transmite ao SEFIN Nacional, mas o contrato da API ainda não foi confirmado contra o ADN real. Antes de qualquer uso fiscal: cadastre um emitente com certificado A1 válido, deixe-o em **Homologação** (produção restrita), emita um lote pequeno e confira se o ADN aceita a nota, o XML e o cancelamento. Se o ADN recusar a assinatura, teste `NFSE_ASSINATURA_ALGORITMO=sha256` no `.env`. O driver **Simulador local** não emite nada de verdade.

## Atualizar depois

Gere um novo pacote, envie e extraia por cima (preserve o `.env` e `storage/`), depois:

```bash
php artisan migrate --force
php artisan config:cache
php artisan route:cache
```
