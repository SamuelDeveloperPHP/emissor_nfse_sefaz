# Emissor NFS-e

Sistema para escritórios de contabilidade emitirem notas fiscais de serviço (NFS-e Nacional) de forma avulsa ou em lote, com controle de acesso por papel e por CNPJ.

> **Estado atual:** a geração e a validação da DPS contra o esquema oficial funcionam. A **assinatura com certificado A1 e a transmissão real ao ADN ainda não existem**: hoje só o driver *Simulador local* autoriza notas, e ele não emite nada de verdade. Mantenha os emitentes em **Homologação**.

## O que o sistema faz

- **Emitentes:** cadastro de CNPJs com regime tributário, município (código IBGE), certificado A1 e driver de transmissão por emitente.
- **NFS-e avulsa:** formulário para emitir uma nota.
- **Lotes:** envio de planilha CSV (até 5.000 linhas), processamento em fila e acompanhamento do andamento.
- **Ambiente de emissão:** por padrão toda emissão sai em **homologação**. O Administrador pode liberar, em Administração > Configurações, a escolha entre homologação e produção a cada lote ou nota; vale para o sistema inteiro.
- **Painel:** indicadores de emitentes ativos/inativos e de notas por dia, semana, mês e ano (Chart.js com rótulos), além de certificados perto do vencimento.
- **Módulos e permissões:** o menu lateral é montado a partir de módulos cadastrados no banco; cada módulo gera as permissões `view`, `create`, `edit` e `delete` (mais ações extras).
- **Papéis e usuários:** o administrador define os papéis e libera cada usuário para todos os emitentes ou só para alguns.

## Tecnologias

Laravel 12, Inertia.js, React 19 com TypeScript, Vite, template Velzon (react-bootstrap), `spatie/laravel-permission`, Chart.js.

## Como rodar em desenvolvimento

Requisitos: PHP 8.2+, Composer, Node.js e MySQL.

```bash
composer install
npm install --legacy-peer-deps
cp .env.example .env
php artisan key:generate
# configure DB_* no .env e crie o banco
php artisan migrate --seed
npm run dev
php artisan serve
```

O seeder cria o login de desenvolvimento `admin@example.com` / `password`. **Ele só existe fora de produção.** Nunca use essas credenciais em um servidor real.

Os lotes usam a fila do banco (`QUEUE_CONNECTION=database`). Em desenvolvimento, rode o worker:

```bash
php artisan queue:work
```

## Testes

```bash
php artisan test
```

Os testes usam SQLite em memória. Alguns testes antigos do Breeze (`ProfileTest`, `ExampleTest`) já falhavam antes e não fazem parte do trabalho do emissor.

## NFS-e e o esquema oficial

A NFS-e é do padrão **federal** (SEFIN Nacional / ADN). O ISSQN continua sendo municipal, mas o sistema e o leiaute são nacionais.

- Os XSD oficiais (pacote v1.01, 2026-02-09) ficam em `resources/nfse/xsd/` e **não devem ser editados**.
- O XML da DPS é montado em `app/Services/Nfse/DpsBuilder.php` e validado por `XsdValidator.php`.
- O padrão `TSSerieDPS` do XSD oficial tem um defeito conhecido (usa `^` e `$`, que são literais em XSD). O validador ignora apenas esse erro.

### Falta fazer

- Assinatura XMLDSig com o certificado A1.
- Transmissão real ao ADN, usando os endpoints dos manuais oficiais.
- Grupo IBS/CBS.
- Telas de Notas Fiscais e Monitoramento.

## Colocar em produção (hospedagem compartilhada)

O guia completo está em [`docs/deploy-cpanel.md`](docs/deploy-cpanel.md). Em resumo:

```bash
powershell -ExecutionPolicy Bypass -File deploy/build-package.ps1
```

Isso gera `deploy/dist/emissor-nfse.zip` com o frontend compilado e as dependências de produção, sem `.env`, certificados nem logs. Depois envie o zip, configure o `.env` a partir de `.env.production.example`, rode as migrações e crie o primeiro administrador:

```bash
php artisan usuarios:criar-admin seu@email.com.br --nome="Seu Nome"
```

A fila precisa de um cron a cada minuto (`queue:work --stop-when-empty`); sem ele os lotes ficam em "Processando".

## Segurança

- Não suba `.env`, certificados (`.pfx`) nem senhas para o repositório.
- A rota pública `/register` do Breeze ainda está ativa; em produção, desative-a para que só o administrador crie usuários.
- Se o pacote de produção foi gerado com uma versão antiga, apague o usuário de exemplo do template (`admin@themesbrand.com`).

## Licença

Projeto privado. O template Velzon e o Laravel têm licenças próprias.
