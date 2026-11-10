/**
 * Conteúdo do treinamento. Cada módulo descreve uma tela real do sistema:
 * o desenho da tela (blocos), os passos (cada um aponta para um bloco) e uma pergunta de fixação.
 */

export type Tipo = "titulo" | "botao" | "botao2" | "campo" | "lista" | "tabela" | "cartao" | "aviso" | "abas" | "chave" | "grafico" | "upload" | "texto" | "selo";

export interface Bloco {
  id: string;
  tipo: Tipo;
  x: number;
  y: number;
  w: number;
  h: number;
  rotulo: string;
  extra?: string[];
}

export interface Passo {
  alvo: string;
  titulo: string;
  texto: string;
}

export interface Quiz {
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
}

export type Demo = "hero" | "glossario" | "certificado" | "lote" | "fluxo" | "matriz" | "recorrencia";

export interface Modulo {
  id: string;
  grupo: string;
  titulo: string;
  rota: string;
  quem: string;
  resumo: string;
  tela: Bloco[];
  passos: Passo[];
  dicas: string[];
  cuidados?: string[];
  quiz: Quiz;
  demo?: Demo;
}

export const GRUPOS = ["Começar", "Acesso", "Painel", "Cadastros", "Emissão", "Notas", "Administração"] as const;

// ---- fábricas de blocos (coordenadas dentro da área de conteúdo: 606 x 364) ----
const titulo = (id: string, rotulo: string, x = 14, y = 12): Bloco => ({ id, tipo: "titulo", x, y, w: 300, h: 22, rotulo });
const botao = (id: string, rotulo: string, x: number, y: number, w = 110): Bloco => ({ id, tipo: "botao", x, y, w, h: 28, rotulo });
const botao2 = (id: string, rotulo: string, x: number, y: number, w = 110): Bloco => ({ id, tipo: "botao2", x, y, w, h: 28, rotulo });
const campo = (id: string, rotulo: string, x: number, y: number, w = 180): Bloco => ({ id, tipo: "campo", x, y, w, h: 46, rotulo });
const tabela = (id: string, x: number, y: number, w: number, h: number, colunas: string[], rotulo = ""): Bloco => ({ id, tipo: "tabela", x, y, w, h, rotulo, extra: colunas });
const cartao = (id: string, rotulo: string, x: number, y: number, w: number, h: number, extra?: string[]): Bloco => ({ id, tipo: "cartao", x, y, w, h, rotulo, extra });
const aviso = (id: string, rotulo: string, x: number, y: number, w: number, h = 34, tom = "info"): Bloco => ({ id, tipo: "aviso", x, y, w, h, rotulo, extra: [tom] });
const abas = (id: string, x: number, y: number, itens: string[], ativa = 0): Bloco => ({ id, tipo: "abas", x, y, w: 560, h: 28, rotulo: String(ativa), extra: itens });
const chave = (id: string, rotulo: string, x: number, y: number, w = 220): Bloco => ({ id, tipo: "chave", x, y, w, h: 24, rotulo });
const grafico = (id: string, rotulo: string, x: number, y: number, w: number, h: number): Bloco => ({ id, tipo: "grafico", x, y, w, h, rotulo });
const upload = (id: string, rotulo: string, x: number, y: number, w: number, h = 70): Bloco => ({ id, tipo: "upload", x, y, w, h, rotulo });
const texto = (id: string, rotulo: string, x: number, y: number, w = 300): Bloco => ({ id, tipo: "texto", x, y, w, h: 18, rotulo });
const selo = (id: string, rotulo: string, x: number, y: number, tom = "ok"): Bloco => ({ id, tipo: "selo", x, y, w: 90, h: 20, rotulo, extra: [tom] });
const lista = (id: string, x: number, y: number, w: number, h: number, itens: string[], rotulo = ""): Bloco => ({ id, tipo: "lista", x, y, w, h, rotulo, extra: itens });

export const MODULOS: Modulo[] = [
  // ───────────────────────────── COMEÇAR
  {
    id: "visao-geral",
    grupo: "Começar",
    titulo: "Visão geral",
    rota: "/treinamento",
    quem: "Todos",
    resumo: "O sistema emite NFS-e (nota fiscal de serviço eletrônica nacional) em lote para escritórios de contabilidade: você cadastra o emitente, envia uma planilha e acompanha as notas até o fechamento do mês.",
    demo: "hero",
    tela: [
      titulo("t", "Painel fiscal"),
      cartao("c1", "Emitentes", 14, 44, 140, 70, ["12 ativos"]),
      cartao("c2", "Notas do mês", 166, 44, 140, 70, ["318 notas"]),
      cartao("c3", "Certificados A1", 318, 44, 140, 70, ["2 a vencer"]),
      grafico("g", "Situação das notas", 14, 126, 290, 120),
      tabela("tb", 316, 126, 270, 120, ["Nota", "Valor"]),
    ],
    passos: [
      { alvo: "c1", titulo: "1. Cadastre quem emite", texto: "Cada cliente do escritório que vai emitir nota é um Emitente (CNPJ, município, ambiente e forma de assinatura)." },
      { alvo: "c3", titulo: "2. Deixe a assinatura pronta", texto: "Para assinar as notas o sistema usa o certificado A1 do emitente, ou o do escritório quando o emitente tem procuração." },
      { alvo: "tb", titulo: "3. Emita", texto: "Envie uma planilha (lote), emita uma nota avulsa ou deixe uma recorrência fazer isso todo mês." },
      { alvo: "g", titulo: "4. Acompanhe e feche o mês", texto: "O painel e a lista de notas mostram o que foi autorizado, está pendente ou foi rejeitado. No fim do mês, baixe planilha e XMLs." },
    ],
    dicas: ["Percorra os módulos na ordem do menu: Acesso → Cadastros → Emissão → Notas → Administração.", "Marque cada módulo como concluído; o progresso fica salvo neste navegador."],
    quiz: {
      pergunta: "Qual é a ordem correta para emitir a primeira nota?",
      opcoes: ["Enviar a planilha e depois cadastrar o emitente", "Cadastrar emitente, deixar o certificado pronto e então emitir", "Emitir e só depois escolher o ambiente"],
      correta: 1,
      explicacao: "Sem emitente e sem forma de assinatura (A1 próprio ou procuração) o sistema não tem como assinar nem transmitir a nota.",
    },
  },
  {
    id: "glossario",
    grupo: "Começar",
    titulo: "Glossário",
    rota: "/treinamento",
    quem: "Todos",
    resumo: "Os termos que aparecem nas telas, explicados em uma frase. Clique em um cartão para virá-lo.",
    demo: "glossario",
    tela: [titulo("t", "Glossário"), campo("busca", "Buscar termo", 14, 44, 240), lista("l", 14, 100, 570, 200, ["NFS-e", "DPS", "ADN", "Certificado A1", "Procuração", "Homologação"])],
    passos: [
      { alvo: "busca", titulo: "Busque", texto: "Digite parte do termo para filtrar os cartões." },
      { alvo: "l", titulo: "Vire o cartão", texto: "Clique no cartão para ver o significado e onde o termo aparece no sistema." },
    ],
    dicas: ["Em dúvida sobre uma sigla durante o uso, volte aqui."],
    quiz: {
      pergunta: "O que é a DPS?",
      opcoes: ["A nota já autorizada pela prefeitura", "O documento que o sistema monta e assina para pedir a emissão da nota", "O PDF impresso da nota"],
      correta: 1,
      explicacao: "DPS é a Declaração de Prestação de Serviços: o sistema a envia e, se aprovada, vira a NFS-e.",
    },
  },

  // ───────────────────────────── ACESSO
  {
    id: "login",
    grupo: "Acesso",
    titulo: "Entrar no sistema",
    rota: "/login",
    quem: "Qualquer pessoa com usuário",
    resumo: "Tela de entrada. Não existe cadastro público: quem cria o seu usuário é o Administrador.",
    tela: [titulo("t", "Entrar", 220, 40), campo("em", "E-mail", 200, 80, 220), campo("se", "Senha", 200, 134, 220), botao("go", "Entrar", 200, 196, 220), texto("esq", "Esqueci a senha", 200, 240, 220)],
    passos: [
      { alvo: "em", titulo: "Informe o e-mail", texto: "Use o e-mail que o Administrador cadastrou para você." },
      { alvo: "se", titulo: "Digite a senha", texto: "Se errar, a tela mostra um alerta no próprio campo com o que precisa corrigir." },
      { alvo: "go", titulo: "Entre", texto: "Depois do login você cai no Painel fiscal, ou na primeira tela a que seu papel dá acesso." },
      { alvo: "esq", titulo: "Esqueceu?", texto: "O link leva à recuperação de senha por e-mail (próximo módulo)." },
    ],
    dicas: ["Não há botão “Criar conta”: peça o acesso ao Administrador do escritório."],
    cuidados: ["Muitas tentativas erradas bloqueiam o login por alguns minutos."],
    quiz: {
      pergunta: "Como uma pessoa nova passa a ter acesso?",
      opcoes: ["Ela mesma se cadastra na tela de login", "O Administrador cria o usuário em Administração > Usuários", "O acesso é liberado pelo CNPJ do cliente"],
      correta: 1,
      explicacao: "O cadastro público foi removido; só o Administrador cria usuários.",
    },
  },
  {
    id: "recuperar-senha",
    grupo: "Acesso",
    titulo: "Recuperar senha",
    rota: "/forgot-password · /reset-password/{token}",
    quem: "Quem esqueceu a senha",
    resumo: "Você informa o e-mail, recebe um link e define uma senha nova.",
    tela: [titulo("t", "Esqueceu sua senha?", 200, 40), campo("em", "E-mail", 200, 80, 220), botao("go", "Enviar link", 200, 140, 220), aviso("ok", "Enviamos o link para o seu e-mail.", 200, 190, 220, 34, "ok")],
    passos: [
      { alvo: "em", titulo: "Informe o e-mail", texto: "O mesmo e-mail do seu usuário." },
      { alvo: "go", titulo: "Peça o link", texto: "O sistema envia uma mensagem com um link de redefinição." },
      { alvo: "ok", titulo: "Abra o link", texto: "Na página de redefinição, digite a nova senha duas vezes e confirme." },
    ],
    dicas: ["Olhe também a caixa de spam.", "O link expira; se não funcionar, peça outro."],
    quiz: {
      pergunta: "Se o link da mensagem não funcionar, o que fazer?",
      opcoes: ["Pedir um novo link na mesma tela", "Criar outro usuário", "Esperar o link voltar a funcionar sozinho"],
      correta: 0,
      explicacao: "Links de redefinição expiram. Basta solicitar um novo.",
    },
  },
  {
    id: "confirmar-senha",
    grupo: "Acesso",
    titulo: "Confirmar senha e verificar e-mail",
    rota: "/confirm-password · /verify-email",
    quem: "Quem acessa áreas sensíveis",
    resumo: "Em ações sensíveis o sistema pede a senha de novo. Quando a verificação de e-mail está ligada, ele também pede a confirmação do endereço.",
    tela: [titulo("t", "Confirme sua senha", 200, 40), aviso("av", "Esta é uma área segura. Confirme a senha para continuar.", 150, 76, 320, 34), campo("se", "Senha", 200, 124, 220), botao("go", "Confirmar", 200, 184, 220)],
    passos: [
      { alvo: "av", titulo: "Área segura", texto: "A confirmação vale por um tempo; depois ela é pedida de novo." },
      { alvo: "se", titulo: "Digite a senha atual", texto: "É a mesma senha do login." },
      { alvo: "go", titulo: "Continue", texto: "Você volta para o que estava fazendo." },
    ],
    dicas: ["Na verificação de e-mail, clique no link recebido; o botão “Reenviar” pede outra mensagem."],
    quiz: { pergunta: "Para que serve a confirmação de senha?", opcoes: ["Trocar a senha", "Garantir que é você mesmo antes de uma ação sensível", "Criar um usuário"], correta: 1, explicacao: "É uma camada extra de segurança, sem alterar a senha." },
  },
  {
    id: "perfil",
    grupo: "Acesso",
    titulo: "Meu perfil",
    rota: "/profile-edit",
    quem: "Todos os usuários",
    resumo: "Atualize seu nome e e-mail, troque a senha ou exclua a própria conta.",
    tela: [
      titulo("t", "Meu perfil"),
      cartao("info", "Informações do perfil", 14, 44, 280, 130, ["Nome", "E-mail"]),
      cartao("senha", "Atualizar senha", 306, 44, 280, 130, ["Senha atual", "Nova senha", "Confirmar"]),
      cartao("del", "Excluir conta", 14, 188, 572, 70, ["Remove sua conta de forma permanente"]),
    ],
    passos: [
      { alvo: "info", titulo: "Nome e e-mail", texto: "Altere e salve. Se o e-mail mudar, pode ser preciso verificá-lo de novo." },
      { alvo: "senha", titulo: "Trocar a senha", texto: "Informe a senha atual, a nova e a confirmação." },
      { alvo: "del", titulo: "Excluir conta", texto: "Pede a senha para confirmar. A ação não tem volta." },
    ],
    dicas: ["Use uma senha longa e exclusiva para este sistema."],
    cuidados: ["Quem deve perder o acesso é desativado/excluído pelo Administrador em Usuários."],
    quiz: { pergunta: "Onde você troca a sua senha?", opcoes: ["Em Meu perfil", "Em Administração > Módulos", "Em Fechamento do mês"], correta: 0, explicacao: "O cartão “Atualizar senha” fica em Meu perfil." },
  },

  // ───────────────────────────── PAINEL
  {
    id: "painel",
    grupo: "Painel",
    titulo: "Painel fiscal",
    rota: "/dashboard",
    quem: "Quem tem a permissão dashboard.view",
    resumo: "Resumo do movimento: notas por período, situação, emitentes e certificados perto de vencer.",
    tela: [
      titulo("t", "Painel fiscal"),
      abas("per", 14, 40, ["Hoje", "Semana", "Mês", "Ano"], 2),
      grafico("g1", "Notas por dia", 14, 78, 300, 130),
      grafico("g2", "Situação das notas", 326, 78, 260, 130),
      grafico("g3", "Emitentes", 14, 220, 190, 130),
      lista("cert", 216, 220, 370, 130, ["Cliente A · vence em 12 dias", "Cliente B · vence em 25 dias"], "Certificados A1 para renovar"),
    ],
    passos: [
      { alvo: "per", titulo: "Escolha o período", texto: "Hoje, Semana, Mês ou Ano. Todos os gráficos acompanham." },
      { alvo: "g1", titulo: "Notas no tempo", texto: "Quantidade de notas por hora, dia ou mês, separadas por situação." },
      { alvo: "g2", titulo: "Situação", texto: "Autorizadas, pendentes, rejeitadas e canceladas, com a taxa de rejeição." },
      { alvo: "g3", titulo: "Emitentes", texto: "Quantos estão ativos e inativos." },
      { alvo: "cert", titulo: "Certificados A1", texto: "Lista os que vencem em até 30 dias. Renove antes: certificado vencido impede emitir." },
    ],
    dicas: ["Você só vê os emitentes vinculados ao seu usuário.", "Se aparece “sem certificado”, o emitente que assina com A1 próprio ainda não tem o arquivo enviado."],
    quiz: { pergunta: "O que o painel avisa 30 dias antes?", opcoes: ["Notas rejeitadas", "Certificados A1 a vencer", "Lotes grandes"], correta: 1, explicacao: "O cartão “Certificados A1 para renovar” lista os que vencem em até 30 dias." },
  },

  // ───────────────────────────── CADASTROS
  {
    id: "emitentes",
    grupo: "Cadastros",
    titulo: "Emitentes",
    rota: "/emitentes",
    quem: "Permissão do módulo Emitentes",
    resumo: "Emitente é a empresa que presta o serviço e emite a nota. Aqui você cadastra os dados fiscais e escolhe como a nota será assinada.",
    demo: "certificado",
    tela: [
      titulo("t", "Emitentes"),
      botao("novo", "+ Novo emitente", 456, 10, 130),
      tabela("tb", 14, 46, 572, 150, ["Razão social", "CNPJ", "Município/UF", "Ambiente", "Certificado", "Status"]),
      campo("cnpj", "CNPJ (consulta automática)", 14, 212, 200),
      campo("modo", "Como assina: certificado ou procuração", 226, 212, 250),
      botao("sv", "Salvar", 488, 226, 98),
    ],
    passos: [
      { alvo: "novo", titulo: "Novo emitente", texto: "Abre o formulário em uma janela. Razão social e CNPJ são obrigatórios." },
      { alvo: "cnpj", titulo: "CNPJ", texto: "Aceita CNPJ numérico e alfanumérico. Ao digitar um CNPJ válido, o sistema consulta a base pública e preenche razão social e endereço." },
      { alvo: "modo", titulo: "Certificado ou procuração", texto: "Certificado próprio: o emitente envia o A1 dele (em Configurações). Procuração: o escritório assina com o certificado do sistema, mediante procuração eletrônica no e-CAC." },
      { alvo: "tb", titulo: "A lista", texto: "Mostra ambiente, driver, se há certificado e se o emitente está ativo. Editar e excluir ficam no fim de cada linha." },
      { alvo: "sv", titulo: "Salvar", texto: "Os dados ficam salvos. Para emitir é preciso que o emitente esteja ativo." },
    ],
    dicas: ["Para procuração, o sistema só guarda a escolha. A procuração em si existe na Receita Federal.", "A inscrição municipal e o código IBGE do município entram na DPS: confira."],
    cuidados: ["Excluir um emitente com notas ou lotes vinculados é bloqueado."],
    quiz: { pergunta: "Um emitente com procuração precisa enviar o próprio A1?", opcoes: ["Sim, sempre", "Não: assina o certificado do escritório, cadastrado em Configurações", "Não precisa de certificado nenhum"], correta: 1, explicacao: "Sob procuração a nota é assinada com o certificado do sistema (e-CNPJ do escritório)." },
  },
  {
    id: "tomadores",
    grupo: "Cadastros",
    titulo: "Tomadores",
    rota: "/tomadores",
    quem: "Permissão do módulo Tomadores",
    resumo: "Tomador é o cliente que contrata o serviço. Cada tomador pertence a um emitente e pode ser reaproveitado na nota avulsa e nas recorrências.",
    tela: [
      titulo("t", "Tomadores"),
      botao("novo", "+ Novo tomador", 456, 10, 130),
      tabela("tb", 14, 46, 572, 150, ["Nome", "Documento", "Emitente", "E-mail", "Endereço"]),
      campo("emit", "Emitente", 14, 212, 170),
      campo("doc", "CPF ou CNPJ", 196, 212, 150),
      campo("mail", "E-mail", 358, 212, 170),
    ],
    passos: [
      { alvo: "novo", titulo: "Cadastre", texto: "Informe emitente, nome, documento, e-mail e endereço." },
      { alvo: "emit", titulo: "Vínculo com o emitente", texto: "O tomador aparece só quando você escolhe aquele emitente na emissão." },
      { alvo: "doc", titulo: "Documento", texto: "CPF (11 dígitos) ou CNPJ. O sistema valida o formato." },
      { alvo: "mail", titulo: "E-mail", texto: "É sugerido ao enviar a nota por e-mail." },
      { alvo: "tb", titulo: "Editar ou excluir", texto: "Use os botões ao fim da linha. Excluir não apaga notas já emitidas." },
    ],
    dicas: ["Para lotes você não precisa cadastrar: os dados do tomador vêm na planilha."],
    quiz: { pergunta: "Um tomador pode ser usado por qualquer emitente?", opcoes: ["Sim", "Não: cada tomador pertence a um emitente", "Só se for CNPJ"], correta: 1, explicacao: "O cadastro é por emitente." },
  },
  {
    id: "servicos",
    grupo: "Cadastros",
    titulo: "Serviços",
    rota: "/servicos",
    quem: "Permissão do módulo Serviços",
    resumo: "Catálogo de serviços do emitente: descrição, código de tributação nacional e alíquota do ISS prontos para reutilizar.",
    tela: [
      titulo("t", "Serviços"),
      botao("novo", "+ Novo serviço", 456, 10, 130),
      tabela("tb", 14, 46, 572, 120, ["Nome", "Emitente", "Código", "ISS", "Descrição"]),
      campo("nome", "Nome na lista", 14, 182, 150),
      campo("cod", "Código de tributação nacional", 176, 182, 190),
      campo("iss", "Alíquota do ISS (%)", 378, 182, 130),
      chave("ret", "ISS retido pelo tomador", 14, 242, 220),
    ],
    passos: [
      { alvo: "nome", titulo: "Nome na lista", texto: "Como você reconhece o serviço ao escolher na emissão." },
      { alvo: "cod", titulo: "Código de tributação nacional", texto: "Seis dígitos (ex.: 010101). Define o tipo de serviço perante o município." },
      { alvo: "iss", titulo: "Alíquota", texto: "Percentual do ISS. Empresas do Simples Nacional geralmente não informam alíquota na nota." },
      { alvo: "ret", titulo: "ISS retido", texto: "Marque quando o tomador é quem recolhe o ISS." },
      { alvo: "tb", titulo: "Reuso", texto: "Na nota avulsa e nas recorrências, escolher o serviço preenche tudo automaticamente." },
    ],
    dicas: ["Os campos Indicador de operação (6), CST (3) e Classificação tributária (6) são da reforma tributária; preencha só se o seu caso exigir."],
    quiz: { pergunta: "Quantos dígitos tem o código de tributação nacional?", opcoes: ["3", "6", "14"], correta: 1, explicacao: "O código nacional tem 6 dígitos." },
  },

  // ───────────────────────────── EMISSÃO
  {
    id: "emitir-avulsa",
    grupo: "Emissão",
    titulo: "Emitir NFS-e avulsa",
    rota: "/lotes/emitir",
    quem: "Permissão nfse-avulsa.create",
    resumo: "Emite uma única nota preenchendo um formulário. Ideal para casos pontuais.",
    tela: [
      titulo("t", "Emitir NFS-e"),
      aviso("amb", "Ambiente: Homologação (teste, sem valor fiscal).", 14, 40, 572, 28),
      campo("emit", "Emitente", 14, 78, 170),
      campo("tom", "Tomador cadastrado", 196, 78, 190),
      campo("srv", "Serviço cadastrado", 398, 78, 188),
      campo("desc", "Descrição do serviço", 14, 136, 372),
      campo("val", "Valor do serviço (R$)", 398, 136, 188),
      chave("ret", "ISS retido pelo tomador", 14, 198, 220),
      botao("go", "Emitir", 476, 220, 110),
    ],
    passos: [
      { alvo: "amb", titulo: "Ambiente", texto: "Enquanto a escolha de ambiente não for liberada pelo Administrador, tudo sai em Homologação (teste)." },
      { alvo: "emit", titulo: "Emitente", texto: "Quem emite. Isso filtra os tomadores e serviços das listas ao lado." },
      { alvo: "tom", titulo: "Tomador e serviço", texto: "Escolher um cadastrado preenche os campos. Também dá para digitar tudo manualmente." },
      { alvo: "desc", titulo: "Descrição", texto: "Texto que sairá na nota." },
      { alvo: "val", titulo: "Valor e alíquota", texto: "Valor em reais e alíquota do ISS em %." },
      { alvo: "go", titulo: "Emitir", texto: "O sistema monta a DPS, assina, transmite e abre a nota. Se ficar Pendente, ele consulta a resposta sozinho." },
    ],
    dicas: ["Competência é o mês a que o serviço se refere, não necessariamente o de hoje."],
    cuidados: ["Se a nota ficar Pendente, não emita outra igual: reenviar pode duplicar."],
    quiz: { pergunta: "A nota ficou Pendente. O que fazer?", opcoes: ["Emitir outra igual na hora", "Aguardar ou usar “Consultar situação”", "Excluir o emitente"], correta: 1, explicacao: "O sistema consulta o ADN a cada 5 minutos; reenviar pode duplicar a nota." },
  },
  {
    id: "lotes",
    grupo: "Emissão",
    titulo: "Lotes de emissão",
    rota: "/lotes",
    quem: "Permissões lotes-emissao.view / .create",
    resumo: "Envia uma planilha Excel ou CSV com uma nota por linha. O sistema confere, emite todas e guarda o resultado de cada linha.",
    demo: "lote",
    tela: [
      titulo("t", "Lotes de emissão"),
      campo("emit", "Emitente", 14, 40, 180),
      upload("arq", "Arraste ou escolha o arquivo (.xlsx ou .csv)", 14, 98, 380, 60),
      texto("mod", "Baixar modelo Excel · CSV", 410, 108, 180),
      botao2("conf", "Conferir", 14, 172, 100),
      botao("env", "Enviar", 126, 172, 100),
      tabela("tb", 14, 216, 572, 130, ["Arquivo", "Emitente", "Enviado em", "Notas", "Situação"]),
    ],
    passos: [
      { alvo: "mod", titulo: "Baixe o modelo", texto: "O modelo Excel já vem com as colunas certas e uma aba de instruções. O mesmo layout é aceito na volta." },
      { alvo: "emit", titulo: "Escolha o emitente", texto: "Todas as linhas do arquivo serão emitidas por ele." },
      { alvo: "arq", titulo: "Anexe a planilha", texto: "Aceita .xlsx e .csv de até 5 MB, uma nota por linha." },
      { alvo: "conf", titulo: "Conferir antes de enviar", texto: "Mostra a prévia: linhas válidas, inválidas (com o que corrigir) e possíveis duplicadas. Nada é emitido ainda." },
      { alvo: "env", titulo: "Enviar", texto: "Cria o lote e coloca as notas na fila. O processamento roda em segundo plano." },
      { alvo: "tb", titulo: "Acompanhe", texto: "Clique no lote para ver cada linha, ou baixe as rejeitadas, corrija e reenvie." },
    ],
    dicas: ["Se o Excel mudar CPF/CNPJ para número, o sistema devolve os zeros à esquerda sozinho.", "Datas podem ser dd/mm/aaaa ou aaaa-mm-dd."],
    cuidados: ["Linhas duplicadas (mesmo tomador, valor, descrição e competência) são apontadas na prévia: confira antes de enviar."],
    quiz: { pergunta: "Para que serve o botão Conferir?", opcoes: ["Emitir as notas de teste", "Validar a planilha sem emitir nada", "Cancelar o lote"], correta: 1, explicacao: "Conferir só mostra a prévia com erros e duplicadas; nada é enviado." },
  },
  {
    id: "lote-detalhe",
    grupo: "Emissão",
    titulo: "Detalhe do lote",
    rota: "/lotes/{id}",
    quem: "Permissão lotes-emissao.view",
    resumo: "Mostra o andamento de um lote e a situação de cada linha.",
    tela: [
      titulo("t", "relatorio-mes.xlsx"),
      selo("st", "Concluído c/ erros", 14, 40, "erro"),
      texto("res", "18 autorizadas · 2 rejeitadas", 120, 42, 240),
      botao2("rej", "Baixar rejeitadas (Excel)", 400, 36, 186),
      tabela("tb", 14, 76, 572, 220, ["Linha", "Nº DPS", "Tomador", "Valor", "Situação", "Observações"]),
    ],
    passos: [
      { alvo: "st", titulo: "Situação do lote", texto: "Processando, Aguardando transmissão, Concluído ou Concluído com erros." },
      { alvo: "res", titulo: "Resumo", texto: "Quantas notas estão em cada situação." },
      { alvo: "tb", titulo: "Linha a linha", texto: "O número da linha é o da planilha. Em Observações aparece o motivo de cada rejeição." },
      { alvo: "rej", titulo: "Corrigir e reenviar", texto: "Baixe só as linhas rejeitadas no mesmo formato, corrija e envie como um novo lote." },
    ],
    dicas: ["Para ver a nota completa, clique na linha."],
    quiz: { pergunta: "Como reenviar só o que falhou?", opcoes: ["Reenviar a planilha inteira", "Baixar rejeitadas, corrigir e enviar como novo lote", "Não é possível"], correta: 1, explicacao: "A planilha de rejeitadas já vem no layout de importação." },
  },
  {
    id: "recorrentes",
    grupo: "Emissão",
    titulo: "Notas recorrentes",
    rota: "/recorrencias",
    quem: "Permissão do módulo Recorrências",
    resumo: "Para serviços cobrados todo mês (mensalidades): o sistema emite sozinho no dia combinado.",
    demo: "recorrencia",
    tela: [
      titulo("t", "Notas recorrentes"),
      botao("nova", "+ Nova recorrência", 436, 10, 150),
      tabela("tb", 14, 46, 572, 130, ["Tomador", "Serviço", "Valor", "Dia", "Próxima emissão", "Última"]),
      campo("dia", "Dia do mês (1 a 28)", 14, 192, 150),
      campo("val", "Valor (R$)", 176, 192, 130),
      chave("ativa", "Ativa (desmarque para pausar)", 14, 252, 250),
    ],
    passos: [
      { alvo: "nova", titulo: "Nova recorrência", texto: "Escolha emitente, tomador e serviço já cadastrados e o valor." },
      { alvo: "dia", titulo: "Dia do mês", texto: "De 1 a 28, para valer em todos os meses (inclusive fevereiro)." },
      { alvo: "ativa", titulo: "Ativa ou pausada", texto: "Desmarque para pausar sem apagar." },
      { alvo: "tb", titulo: "Próxima e última", texto: "Mostram quando será a próxima emissão e quando foi a última." },
    ],
    dicas: ["O sistema verifica as recorrências todos os dias às 06:00.", "Cadastre antes o tomador e o serviço."],
    cuidados: ["Mudou o valor da mensalidade? Edite a recorrência; as notas já emitidas não mudam."],
    quiz: { pergunta: "Por que o dia vai só até 28?", opcoes: ["Por limitação da prefeitura", "Para existir em todos os meses, inclusive fevereiro", "Porque o dia 29 é feriado"], correta: 1, explicacao: "Assim a data existe em qualquer mês." },
  },

  // ───────────────────────────── NOTAS
  {
    id: "notas",
    grupo: "Notas",
    titulo: "Notas fiscais",
    rota: "/notas",
    quem: "Permissão notas-fiscais.view",
    resumo: "Lista de todas as notas, com filtros por emitente, situação, período e busca por tomador, número ou chave.",
    tela: [
      titulo("t", "Notas fiscais"),
      aviso("pend", "3 notas pendentes de resposta · Consultar pendentes", 14, 40, 572, 28, "aviso"),
      campo("f-emit", "Emitente", 14, 78, 130),
      campo("f-sit", "Situação", 152, 78, 100),
      campo("f-de", "De", 260, 78, 80),
      campo("f-ate", "Até", 348, 78, 80),
      campo("busca", "Tomador, número ou chave", 436, 78, 150),
      tabela("tb", 14, 136, 572, 200, ["Data", "Emitente", "Tomador", "Nº NFS-e", "Ambiente", "Valor", "Situação"]),
    ],
    passos: [
      { alvo: "pend", titulo: "Pendentes", texto: "Aparece quando há notas sem resposta. O botão consulta todas de uma vez." },
      { alvo: "f-emit", titulo: "Filtre", texto: "Emitente, situação (autorizada, pendente, rejeitada, cancelada) e período." },
      { alvo: "busca", titulo: "Busca livre", texto: "Procure por nome do tomador, número da nota ou chave de acesso." },
      { alvo: "tb", titulo: "A lista", texto: "Clique em uma linha para abrir a nota. Os selos coloridos indicam a situação." },
    ],
    dicas: ["Os filtros ficam na URL: copie o endereço para compartilhar a mesma visão."],
    quiz: { pergunta: "O que o botão “Consultar pendentes” faz?", opcoes: ["Emite novas notas", "Pergunta ao ADN a situação de todas as notas pendentes", "Cancela as pendentes"], correta: 1, explicacao: "Ele atualiza as notas sem resposta confirmada." },
  },
  {
    id: "nota-detalhe",
    grupo: "Notas",
    titulo: "Detalhe da nota",
    rota: "/notas/{id}",
    quem: "Permissão notas-fiscais.view (ações têm permissões próprias)",
    resumo: "Dados completos, histórico e as ações possíveis: baixar XML/DANFSE, enviar por e-mail, consultar, substituir e cancelar.",
    demo: "fluxo",
    tela: [
      titulo("t", "NFS-e 1234"),
      selo("st", "Autorizada", 14, 40, "ok"),
      cartao("dados", "Dados da nota", 14, 72, 300, 130, ["Tomador", "Valor", "Competência"]),
      cartao("hist", "Histórico", 14, 214, 300, 100, ["Enviada", "Autorizada"]),
      cartao("acoes", "Arquivos e ações", 326, 72, 260, 242),
      botao2("xml", "Baixar XML da NFS-e", 338, 106, 236),
      botao2("pdf", "Baixar DANFSE (PDF)", 338, 142, 236),
      botao2("mail", "Enviar por e-mail", 338, 178, 236),
      botao2("sub", "Substituir por nota corrigida", 338, 214, 236),
      botao2("can", "Cancelar nota", 338, 250, 236),
    ],
    passos: [
      { alvo: "st", titulo: "Situação", texto: "Autorizada, Pendente, Rejeitada ou Cancelada. Avisos coloridos explicam o que fazer em cada caso." },
      { alvo: "hist", titulo: "Histórico", texto: "Registra o que aconteceu e quando, inclusive rejeições com o motivo." },
      { alvo: "xml", titulo: "XML e DANFSE", texto: "O XML da NFS-e, o PDF (DANFSE), o XML da DPS enviada e, se houver, o do cancelamento." },
      { alvo: "mail", titulo: "E-mail", texto: "Envia ao tomador. O sistema registra o último envio." },
      { alvo: "sub", titulo: "Substituir", texto: "Quando a nota autorizada tem um erro de dados: emite uma nova corrigida que substitui a anterior." },
      { alvo: "can", titulo: "Cancelar", texto: "Exige um motivo e uma explicação de no mínimo 15 caracteres." },
    ],
    dicas: ["Nota do simulador local não tem valor fiscal e traz um aviso amarelo."],
    cuidados: ["Cancelar e substituir são ações fiscais e ficam registradas."],
    quiz: { pergunta: "Qual o mínimo de caracteres na explicação do cancelamento?", opcoes: ["5", "15", "100"], correta: 1, explicacao: "O sistema só habilita o botão com pelo menos 15 caracteres." },
  },
  {
    id: "substituir",
    grupo: "Notas",
    titulo: "Substituir NFS-e",
    rota: "/notas/{id}/substituir",
    quem: "Permissão notas-fiscais.substituir",
    resumo: "Corrige uma nota autorizada emitindo outra no lugar. A anterior continua valendo até a nova ser autorizada.",
    tela: [
      titulo("t", "Substituir NFS-e"),
      aviso("av", "A nota anterior continua valendo até esta ser autorizada.", 14, 40, 572, 30),
      campo("desc", "Descrição do serviço", 14, 82, 350),
      chave("ret", "ISS retido", 380, 94, 200),
      campo("mot", "Motivo", 14, 146, 240),
      campo("exp", "Explique o motivo (mínimo de 15 caracteres)", 266, 146, 320),
      botao("go", "Substituir", 476, 220, 110),
    ],
    passos: [
      { alvo: "av", titulo: "Entenda o efeito", texto: "Nada é perdido: a nota antiga só deixa de valer quando a nova é autorizada." },
      { alvo: "desc", titulo: "Corrija os dados", texto: "Altere o que estava errado: descrição, valor, ISS retido, etc." },
      { alvo: "mot", titulo: "Motivo", texto: "Escolha um dos motivos da lista." },
      { alvo: "exp", titulo: "Explicação", texto: "Mínimo de 15 caracteres." },
      { alvo: "go", titulo: "Substituir", texto: "A nota original passa a mostrar “substituída por…”, e a nova mostra “substitui…”." },
    ],
    dicas: ["Para erro que não tem correção, o caminho é o cancelamento."],
    quiz: { pergunta: "Quando a nota antiga deixa de valer?", opcoes: ["Assim que você clica em Substituir", "Quando a nova é autorizada", "Nunca"], correta: 1, explicacao: "Até lá a anterior continua válida." },
  },
  {
    id: "fechamento",
    grupo: "Notas",
    titulo: "Fechamento do mês",
    rota: "/fechamento",
    quem: "Permissões fechamento.view / .exportar",
    resumo: "Totais do mês para conferir e entregar: planilha Excel e XMLs em ZIP.",
    tela: [
      titulo("t", "Fechamento do mês"),
      campo("mes", "Mês", 14, 40, 130),
      campo("emit", "Emitente", 156, 40, 240),
      campo("amb", "Ambiente", 408, 40, 178),
      cartao("n1", "Notas autorizadas", 14, 104, 136, 66, ["318"]),
      cartao("n2", "Valor dos serviços", 160, 104, 136, 66, ["R$ 84.200"]),
      cartao("n3", "ISS retido", 306, 104, 136, 66, ["R$ 1.530"]),
      cartao("n4", "Canceladas", 452, 104, 134, 66, ["4"]),
      botao("xls", "Baixar planilha (Excel)", 14, 196, 190),
      botao2("zip", "Baixar XMLs (ZIP)", 216, 196, 160),
    ],
    passos: [
      { alvo: "mes", titulo: "Mês", texto: "Escolha o mês a fechar." },
      { alvo: "emit", titulo: "Emitente", texto: "Um emitente ou todos." },
      { alvo: "amb", titulo: "Ambiente", texto: "Produção (valor fiscal) ou Homologação (teste)." },
      { alvo: "n2", titulo: "Totais", texto: "Notas autorizadas, valor dos serviços, ISS retido pelos tomadores e canceladas." },
      { alvo: "xls", titulo: "Planilha", texto: "Uma aba com todas as notas, outra com totais por tomador e outra por emitente." },
      { alvo: "zip", titulo: "XMLs", texto: "Todos os XMLs do período em um só arquivo." },
    ],
    dicas: ["Notas canceladas aparecem na lista, mas não entram nos totais.", "Notas do simulador local nunca entram no fechamento."],
    cuidados: ["Simples Nacional não informa alíquota, então o ISS calculado aparece zero."],
    quiz: { pergunta: "Notas canceladas entram nos totais?", opcoes: ["Sim", "Não, só aparecem na lista", "Só as de produção"], correta: 1, explicacao: "Elas são listadas, mas ficam fora dos totais." },
  },

  // ───────────────────────────── ADMINISTRAÇÃO
  {
    id: "cfg-certificados",
    grupo: "Administração",
    titulo: "Configurações · Certificados digitais",
    rota: "/configuracoes",
    quem: "Somente Administrador",
    resumo: "Aqui o Administrador envia o certificado A1 (.pfx) de cada emitente e testa se ele está válido.",
    demo: "certificado",
    tela: [
      titulo("t", "Configurações"),
      abas("ab", 14, 40, ["Certificados digitais", "Certificado do sistema", "Ambiente de emissão"], 0),
      aviso("av", "O arquivo é guardado criptografado e a senha não é exibida.", 14, 76, 572, 30),
      tabela("tb", 14, 114, 572, 130, ["Emitente", "Como assina", "Validade", "Situação"]),
      botao("env", "Enviar certificado", 14, 258, 160),
      botao2("test", "Testar", 186, 258, 100),
      botao2("rem", "Remover", 298, 258, 100),
    ],
    passos: [
      { alvo: "tb", titulo: "Uma linha por emitente", texto: "Emitentes por procuração mostram o selo “Por procuração” e não precisam de arquivo." },
      { alvo: "env", titulo: "Envie o .pfx", texto: "Selecione o arquivo e digite a senha. O sistema confere o CNPJ do certificado com o do emitente." },
      { alvo: "test", titulo: "Teste", texto: "Verifica se o certificado abre, está dentro da validade e é do CNPJ certo." },
      { alvo: "rem", titulo: "Remova", texto: "Apaga o arquivo guardado, por exemplo, ao trocar por um renovado." },
    ],
    dicas: ["Quem usa certificado próprio precisa do A1 (arquivo). O A3 (cartão/token) não funciona em servidor.", "Anote a validade: o painel avisa 30 dias antes."],
    cuidados: ["Nunca envie o certificado por e-mail ou chat: use apenas esta tela."],
    quiz: { pergunta: "Qual tipo de certificado funciona no sistema?", opcoes: ["A3 (token)", "A1 (arquivo .pfx)", "Qualquer um"], correta: 1, explicacao: "O A1 é um arquivo que o servidor consegue usar para assinar." },
  },
  {
    id: "cfg-sistema",
    grupo: "Administração",
    titulo: "Configurações · Certificado do sistema",
    rota: "/configuracoes",
    quem: "Somente Administrador",
    resumo: "O e-CNPJ A1 do escritório. É usado para assinar as notas dos emitentes que estão no modo “procuração”.",
    demo: "certificado",
    tela: [
      titulo("t", "Configurações"),
      abas("ab", 14, 40, ["Certificados digitais", "Certificado do sistema", "Ambiente de emissão"], 1),
      aviso("av", "Quando é usado: somente por emitentes que assinam por procuração.", 14, 76, 572, 30),
      cartao("card", "Certificado do escritório", 14, 118, 572, 100, ["ESCRITORIO CONTABIL LTDA", "Válido até 2027"]),
      botao("env", "Enviar certificado", 14, 232, 160),
      botao2("test", "Testar", 186, 232, 100),
      botao2("rem", "Remover", 298, 232, 100),
    ],
    passos: [
      { alvo: "av", titulo: "Quando é usado", texto: "Apenas por emitentes marcados como “Procuração”. Emitentes com A1 próprio nunca usam este certificado." },
      { alvo: "env", titulo: "Envie o certificado do escritório", texto: "Arquivo A1 (.pfx) com a senha." },
      { alvo: "test", titulo: "Teste", texto: "Confirma validade e dados do certificado." },
      { alvo: "rem", titulo: "Remover", texto: "Emitentes por procuração deixam de conseguir emitir até um novo envio." },
    ],
    dicas: ["Se ele não estiver cadastrado, o sistema avisa na hora de emitir pelo emitente em procuração."],
    cuidados: ["A procuração precisa existir na Receita (e-CAC). Quem valida é o governo, a cada pedido."],
    quiz: { pergunta: "Quem usa o certificado do sistema?", opcoes: ["Todos os emitentes", "Só emitentes em modo procuração", "Só emitentes inativos"], correta: 1, explicacao: "O modo de cada emitente decide qual certificado assina." },
  },
  {
    id: "cfg-ambiente",
    grupo: "Administração",
    titulo: "Configurações · Ambiente de emissão",
    rota: "/configuracoes",
    quem: "Somente Administrador",
    resumo: "Chave geral que decide se quem emite pode escolher entre Homologação (teste) e Produção (valor fiscal).",
    tela: [
      titulo("t", "Configurações"),
      abas("ab", 14, 40, ["Certificados digitais", "Certificado do sistema", "Ambiente de emissão"], 2),
      aviso("av", "Tudo em Homologação. Nenhum usuário pode escolher.", 14, 76, 572, 32, "aviso"),
      chave("sw", "Liberar a escolha do ambiente na emissão", 14, 126, 300),
      botao("sv", "Salvar", 14, 176, 110),
    ],
    passos: [
      { alvo: "av", titulo: "Estado atual", texto: "A faixa colorida diz se está tudo em Homologação ou se a escolha está liberada." },
      { alvo: "sw", titulo: "A chave", texto: "Desligada: toda emissão usa Homologação. Ligada: aparece o campo Ambiente nos lotes e nas notas avulsas." },
      { alvo: "sv", titulo: "Salve", texto: "Vale para todos os usuários do sistema." },
    ],
    dicas: ["Comece sempre testando em Homologação e libere a Produção só depois de validar um lote pequeno."],
    cuidados: ["Notas de Produção têm valor fiscal. Confira os dados antes."],
    quiz: { pergunta: "Com a chave desligada, em que ambiente saem as notas?", opcoes: ["Produção", "Homologação", "O usuário escolhe"], correta: 1, explicacao: "Desligada = tudo em teste." },
  },
  {
    id: "usuarios",
    grupo: "Administração",
    titulo: "Usuários",
    rota: "/usuarios",
    quem: "Permissão do módulo Usuários",
    resumo: "Crie as pessoas que acessam o sistema, escolha o papel e limite quais emitentes cada uma enxerga.",
    tela: [
      titulo("t", "Usuários"),
      botao("novo", "+ Novo usuário", 456, 10, 130),
      tabela("tb", 14, 46, 572, 100, ["Nome", "E-mail", "Papéis", "Emitentes"]),
      campo("nome", "Nome", 14, 160, 150),
      campo("mail", "E-mail", 176, 160, 170),
      campo("pap", "Papéis", 358, 160, 110),
      lista("emit", 14, 218, 572, 90, ["Todos os emitentes (atuais e futuros)", "Selecionar todos", "Cliente A", "Cliente B"], "Emitentes vinculados"),
    ],
    passos: [
      { alvo: "novo", titulo: "Novo usuário", texto: "Nome, e-mail e senha (com confirmação)." },
      { alvo: "pap", titulo: "Papéis", texto: "O papel define o que a pessoa pode fazer (veja Papéis & Permissões)." },
      { alvo: "emit", titulo: "Emitentes vinculados", texto: "Escolha um a um, “Selecionar todos”, ou “Todos os emitentes (atuais e futuros)”. A pessoa só vê o que estiver marcado." },
      { alvo: "tb", titulo: "Editar", texto: "Ao editar, a senha é opcional: deixe em branco para manter a atual." },
    ],
    dicas: ["Para um contador que atende poucos clientes, vincule só os emitentes dele."],
    cuidados: ["“Todos (atuais e futuros)” inclui emitentes que ainda serão cadastrados."],
    quiz: { pergunta: "Como limitar um usuário a dois clientes?", opcoes: ["Dando o papel Administrador", "Vinculando só esses dois emitentes ao usuário", "Não é possível"], correta: 1, explicacao: "O vínculo por emitente restringe o que a pessoa enxerga." },
  },
  {
    id: "papeis",
    grupo: "Administração",
    titulo: "Papéis & Permissões",
    rota: "/papeis",
    quem: "Permissão do módulo Papéis & Permissões",
    resumo: "Papel é um conjunto de permissões. Marque, para cada módulo, o que o papel pode ver, criar, editar e excluir.",
    demo: "matriz",
    tela: [
      titulo("t", "Papéis & Permissões"),
      lista("pap", 14, 44, 150, 160, ["Administrador", "Operador", "Contador"], "Papéis"),
      botao("novo", "+ Novo papel", 14, 214, 150),
      tabela("mx", 176, 44, 410, 180, ["Módulo", "Ver", "Criar", "Editar", "Excluir"], "Permissões do papel"),
      botao("sv", "Salvar permissões", 436, 236, 150),
    ],
    passos: [
      { alvo: "pap", titulo: "Escolha o papel", texto: "À esquerda ficam os papéis; à direita, a matriz dele." },
      { alvo: "mx", titulo: "Matriz", texto: "Cada linha é um módulo e cada coluna uma ação. Marque o que o papel pode fazer." },
      { alvo: "novo", titulo: "Novo papel", texto: "Crie papéis sob medida (ex.: “Conferência” só com ver)." },
      { alvo: "sv", titulo: "Salvar", texto: "Vale na próxima vez que o usuário abrir a tela." },
    ],
    dicas: ["O Administrador tem acesso total e não perde permissões."],
    cuidados: ["Dar “Excluir” só a quem realmente precisa."],
    quiz: { pergunta: "Para só olhar as notas, sem alterar nada, que permissões o papel precisa?", opcoes: ["Todas", "Apenas “Ver” em Notas fiscais", "“Excluir” em Notas fiscais"], correta: 1, explicacao: "Quanto menos permissões, melhor." },
  },
  {
    id: "modulos",
    grupo: "Administração",
    titulo: "Módulos",
    rota: "/modulos",
    quem: "Permissão do módulo Módulos",
    resumo: "Cada item do menu lateral é um módulo. Aqui você os organiza e define as ações que cada um oferece nas permissões.",
    tela: [
      titulo("t", "Módulos"),
      botao("novo", "+ Novo módulo", 456, 10, 130),
      tabela("tb", 14, 46, 572, 130, ["Nome", "Chave", "Grupo", "Rota", "Ordem", "Status"]),
      campo("chave", "Chave", 14, 190, 130),
      campo("rota", "Rota", 156, 190, 150),
      campo("grupo", "Grupo (pai)", 318, 190, 130),
      campo("extra", "Ações extras", 460, 190, 126),
      chave("ativo", "Módulo ativo", 14, 250, 160),
    ],
    passos: [
      { alvo: "tb", titulo: "Lista do menu", texto: "Cada linha é um item do menu, na ordem em que aparece." },
      { alvo: "chave", titulo: "Chave", texto: "Identificador interno. Dá nome às permissões (ex.: notas-fiscais.view)." },
      { alvo: "rota", titulo: "Rota e grupo", texto: "A rota abre a tela; o grupo agrupa o item sob um título." },
      { alvo: "extra", titulo: "Ações extras", texto: "Além de ver/criar/editar/excluir (ex.: enviar, cancelar), separadas por vírgula." },
      { alvo: "ativo", titulo: "Ativo", texto: "Desativado, o item some do menu." },
    ],
    dicas: ["No uso normal você não precisa mexer aqui."],
    cuidados: ["Alterar a chave de um módulo em uso muda as permissões dele."],
    quiz: { pergunta: "Onde se define se um item aparece no menu?", opcoes: ["Em Módulos (Módulo ativo)", "Em Fechamento do mês", "No perfil"], correta: 0, explicacao: "O módulo ativo aparece; desativado, some do menu." },
  },
];
