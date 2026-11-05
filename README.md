# Emissor NFS-e

Sistema para escritórios de contabilidade emitirem notas fiscais de serviço (NFS-e Nacional) de forma avulsa ou em lote, com controle de acesso por papel e por CNPJ.

> **Estado atual:** a geração da DPS, a validação contra o esquema oficial, a **assinatura XMLDSig com o certificado A1** e o driver de transmissão ao ADN (SEFIN Nacional, mTLS) estão implementados e testados com respostas simuladas. **Nada disso foi validado contra o ADN de verdade**: o contrato da API (corpo, campos da resposta, algoritmo SHA-1 ou SHA-256) precisa ser confirmado em *produção restrita* com um certificado real antes do uso fiscal. Hoje o driver *Simulador local* continua não emitindo nada. Mantenha os emitentes em **Homologação**.

## O que o sistema faz

- **Emitentes:** cadastro de CNPJs com regime tributário, município (código IBGE) e driver de transmissão por emitente.
- **Certificado do sistema:** aba em Configurações para guardar o e-CNPJ A1 do escritório, com as mesmas proteções; por enquanto só é guardado e conferido, as notas usam o A1 de cada emitente.
- **Certificados digitais (A1):** o Administrador envia o .pfx e a senha de cada emitente em Administração > Configurações. O sistema abre o certificado na hora e só guarda se a senha estiver certa, se estiver na validade e se for do mesmo CNPJ (matriz e filial valem). O arquivo e a senha ficam criptografados com a `APP_KEY`; não voltam para a tela, para os logs nem para downloads; cada envio e remoção é registrado com usuário e data. **Faça backup da `APP_KEY`**: sem ela os certificados guardados não abrem e precisam ser enviados de novo.
- **Notas fiscais:** lista com filtros (emitente, situação, período, tomador/número/chave), detalhe, download do XML da NFS-e e da DPS, DANFSE em PDF, consulta de notas pendentes (também automática a cada 5 minutos, com botão "Consultar agora") cancelamento por evento assinado e **substituição** (emite a nota corrigida com o grupo `subst` da DPS; a anterior só sai de circulação quando a nova é autorizada).
- **IBS e CBS (reforma tributária):** grupo opcional da DPS, preenchido por serviço, no CSV (colunas `ibscbs_*`) ou na emissão avulsa; só vai na nota com os três códigos.
- **Tomadores e serviços:** cadastro por emitente (CPF/CNPJ, endereço, descrição, código de tributação e alíquota prontos), usado na emissão avulsa e nas recorrências.
- **Notas recorrentes:** mensalidades emitidas sozinhas todo mês, no dia escolhido (1 a 28), às 6h; pausa e retomada; nunca emite duas vezes o mesmo mês.
- **E-mail ao tomador:** envia a nota autorizada com o XML (e o DANFSE em PDF, quando o ADN fornece).
- **Fechamento do mês:** planilha Excel (notas, totais por tomador e por emitente, ISS retido) e ZIP com os XMLs do mês.
- **Lotes por CSV:** botão *Conferir* mostra, linha a linha, o que será aceito antes de enviar; as linhas rejeitadas voltam em um CSV pronto para corrigir e reenviar.
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

- Validar a transmissão em produção restrita (endpoints, corpo da requisição, resposta, algoritmo da assinatura).
- Confirmar em produção restrita a consulta (`/dps/{id}`), o cancelamento por evento e o DANFSE, que seguem o contrato público e não foram testados no ADN real.
- Grupo IBS/CBS: o sistema envia o que for informado (indicador de operação, CST e classificação tributária), mas não conhece as tabelas oficiais de códigos nem as regras de quando é obrigatório; o ADN decide. Preencher no cadastro de serviços ou no CSV.
- E-mail ao tomador depende de SMTP configurado no `.env`; com `MAIL_MAILER=log` nada é enviado.

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
