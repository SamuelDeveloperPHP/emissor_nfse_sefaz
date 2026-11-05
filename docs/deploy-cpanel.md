# Deploy em hospedagem compartilhada (cPanel)

## O que a hospedagem precisa ter

- PHP 8.2 ou superior (em "Select PHP Version" / "MultiPHP Manager")
- Extensões PHP: `dom`, `libxml`, `openssl`, `mbstring`, `fileinfo`, `pdo_mysql`, `zip`
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

## 6. Fila de lotes (cron)

Em "Cron Jobs", a cada minuto:

```
* * * * * /opt/cpanel/ea-php82/root/usr/bin/php /home/USUARIO/emissor/artisan queue:work --stop-when-empty --max-time=50 >/dev/null 2>&1
```

Sem isso, os lotes enviados ficam em "Processando" para sempre.

## 7. Conferir

- `https://nfse.seudominio.com.br` abre a tela de login (com cadeado).
- Entre com o administrador, cadastre um emitente e envie um lote pequeno.
- Crie os usuários dos contadores em Administração > Usuários, com papel e emitentes liberados.

## O que ainda não é emissão real

Hoje só o driver **Simulador local** autoriza notas, e ele não emite nada de verdade. Os outros drivers geram e validam a DPS no XSD oficial, mas não assinam nem transmitem: faltam a assinatura com o certificado A1 e a conexão com a API da NFS-e Nacional. Mantenha os emitentes em **Homologação** até lá.

## Atualizar depois

Gere um novo pacote, envie e extraia por cima (preserve o `.env` e `storage/`), depois:

```bash
php artisan migrate --force
php artisan config:cache
php artisan route:cache
```
