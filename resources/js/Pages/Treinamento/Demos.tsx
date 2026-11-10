import React, { useMemo, useState } from "react";

/* ───────────── Glossário ───────────── */
const TERMOS = [
  { t: "NFS-e", d: "Nota Fiscal de Serviço eletrônica, no padrão nacional. É o documento final autorizado.", o: "Notas fiscais" },
  { t: "DPS", d: "Declaração de Prestação de Serviços: o XML que o sistema monta, assina e envia para pedir a nota.", o: "Detalhe da nota (XML da DPS)" },
  { t: "ADN", d: "Ambiente de Dados Nacional: o serviço do governo que recebe a DPS, valida e devolve a NFS-e.", o: "Emitentes (driver ADN nacional)" },
  { t: "Emitente", d: "A empresa que presta o serviço e emite a nota (cliente do escritório).", o: "Cadastros > Emitentes" },
  { t: "Tomador", d: "Quem contrata e recebe o serviço (cliente do emitente).", o: "Cadastros > Tomadores" },
  { t: "Certificado A1", d: "Certificado digital em arquivo (.pfx) com senha. É o que o servidor usa para assinar a DPS.", o: "Configurações > Certificados digitais" },
  { t: "Procuração", d: "Autorização eletrônica, feita na Receita (e-CAC), para o escritório emitir em nome do cliente. O sistema só guarda a escolha “Procuração”.", o: "Emitentes" },
  { t: "Homologação", d: "Ambiente de teste do governo: as notas não têm valor fiscal.", o: "Configurações > Ambiente de emissão" },
  { t: "Produção", d: "Ambiente real: a nota tem valor fiscal e obrigações tributárias.", o: "Lotes e nota avulsa" },
  { t: "Competência", d: "Mês em que o serviço foi prestado.", o: "Emitir NFS-e" },
  { t: "ISS retido", d: "Quando o tomador, e não o prestador, recolhe o ISS da nota.", o: "Serviços, Emitir NFS-e, Fechamento" },
  { t: "Lote", d: "Conjunto de notas enviado de uma vez por planilha.", o: "Emissão > Lotes" },
  { t: "DANFSE", d: "A versão em PDF da NFS-e, para enviar ao tomador.", o: "Detalhe da nota" },
  { t: "Chave de acesso", d: "Código único de 50 dígitos que identifica a NFS-e.", o: "Notas fiscais (busca)" },
  { t: "Recorrência", d: "Nota emitida automaticamente todo mês, no dia combinado.", o: "Emissão > Notas recorrentes" },
  { t: "Papel", d: "Conjunto de permissões atribuído a um usuário.", o: "Administração > Papéis" },
];

export function Glossario() {
  const [busca, setBusca] = useState("");
  const [viradas, setViradas] = useState<Record<string, boolean>>({});
  const lista = TERMOS.filter((x) => (x.t + x.d).toLowerCase().includes(busca.toLowerCase()));
  return (
    <div>
      <input className="tr-input" placeholder="Buscar termo…" value={busca} onChange={(e) => setBusca(e.target.value)} aria-label="Buscar termo do glossário" />
      <div className="tr-cartoes">
        {lista.map((x) => (
          <button key={x.t} className={`tr-flip ${viradas[x.t] ? "on" : ""}`} onClick={() => setViradas((v) => ({ ...v, [x.t]: !v[x.t] }))} aria-pressed={!!viradas[x.t]}>
            <span className="tr-flip-frente">{x.t}</span>
            <span className="tr-flip-verso">
              {x.d}
              <small>Onde: {x.o}</small>
            </span>
          </button>
        ))}
        {lista.length === 0 && <p className="tr-vazio">Nenhum termo encontrado.</p>}
      </div>
    </div>
  );
}

/* ───────────── Certificado ou procuração ───────────── */
export function EscolhaCertificado() {
  const [respostas, setRespostas] = useState<boolean[]>([]);
  const r = respostas;
  const resultado = r[0] === true ? "proprio" : r[0] === false && r[1] === true ? "procuracao" : r[0] === false && r[1] === false ? "falta" : null;
  const pergunta = r.length === 0 ? "O cliente (emitente) tem certificado digital A1 em arquivo?" : "O escritório tem procuração eletrônica desse cliente na Receita (e-CAC)?";

  return (
    <div className="tr-arvore">
      <div className="tr-arvore-trilha">
        {r.map((v, i) => (
          <span key={i}>
            {i === 0 ? "Tem A1 próprio?" : "Tem procuração?"} <b>{v ? "Sim" : "Não"}</b>
          </span>
        ))}
      </div>
      {resultado === null ? (
        <>
          <p className="tr-arvore-p">{pergunta}</p>
          <div className="tr-acoes">
            <button className="tr-btn tr-btn-p" onClick={() => setRespostas([...r, true])}>
              Sim
            </button>
            <button className="tr-btn" onClick={() => setRespostas([...r, false])}>
              Não
            </button>
          </div>
        </>
      ) : (
        <div className={`tr-resultado tr-resultado-${resultado}`}>
          {resultado === "proprio" && (
            <>
              <strong>Escolha “Certificado próprio”.</strong>
              <p>Em Configurações &gt; Certificados digitais, envie o .pfx do emitente e a senha. O sistema usa esse arquivo para assinar.</p>
            </>
          )}
          {resultado === "procuracao" && (
            <>
              <strong>Escolha “Procuração”.</strong>
              <p>Cadastre o e-CNPJ A1 do escritório em Configurações &gt; Certificado do sistema. O emitente não precisa enviar arquivo.</p>
            </>
          )}
          {resultado === "falta" && (
            <>
              <strong>Falta um dos dois.</strong>
              <p>Peça o A1 ao cliente ou providencie a procuração eletrônica no e-CAC antes de emitir.</p>
            </>
          )}
        </div>
      )}
      <button className="tr-link" onClick={() => setRespostas([])}>
        Recomeçar
      </button>
    </div>
  );
}

/* ───────────── Simulador de lote ───────────── */
interface Linha {
  n: number;
  tomador: string;
  doc: string;
  valor: string;
  erro?: string;
  correcao?: string;
}
const LINHAS_INICIAIS: Linha[] = [
  { n: 2, tomador: "Padaria Estrela", doc: "11.222.333/0001-81", valor: "1.500,00" },
  { n: 3, tomador: "Maria Souza", doc: "123.456.78", valor: "800,00", erro: "CPF com 8 dígitos. Informe 11.", correcao: "123.456.789-09" },
  { n: 4, tomador: "Oficina Rápida", doc: "44.555.666/0001-81", valor: "", erro: "Valor do serviço em branco.", correcao: "2.300,00" },
  { n: 5, tomador: "Clínica Vida", doc: "55.666.777/0001-81", valor: "950,00" },
];

export function SimuladorLote() {
  const [linhas, setLinhas] = useState(LINHAS_INICIAIS);
  const [conferido, setConferido] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const invalidas = linhas.filter((l) => l.erro).length;

  const corrigir = (n: number) =>
    setLinhas((ls) =>
      ls.map((l) => (l.n === n ? { ...l, erro: undefined, doc: l.erro?.startsWith("CPF") ? l.correcao! : l.doc, valor: l.erro?.startsWith("Valor") ? l.correcao! : l.valor } : l)),
    );
  const reiniciar = () => {
    setLinhas(LINHAS_INICIAIS);
    setConferido(false);
    setEnviado(false);
  };

  return (
    <div>
      <p className="tr-demo-ajuda">Simule o fluxo: clique em <b>Conferir</b>, corrija as linhas com problema e então <b>Enviar</b>.</p>
      <div className="tr-tabela-rolavel">
        <table className="tr-tabela">
          <thead>
            <tr>
              <th>Linha</th>
              <th>Tomador</th>
              <th>Documento</th>
              <th>Valor</th>
              <th>{conferido ? "Conferência" : ""}</th>
            </tr>
          </thead>
          <tbody>
            {linhas.map((l) => (
              <tr key={l.n} className={conferido && l.erro ? "erro" : ""}>
                <td>{l.n}</td>
                <td>{l.tomador}</td>
                <td>{l.doc}</td>
                <td>{l.valor || "—"}</td>
                <td>
                  {conferido &&
                    (l.erro ? (
                      <span>
                        {l.erro}{" "}
                        <button className="tr-link" onClick={() => corrigir(l.n)}>
                          Corrigir
                        </button>
                      </span>
                    ) : (
                      <span className="ok">OK</span>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="tr-acoes">
        <button className="tr-btn" onClick={() => setConferido(true)} disabled={enviado}>
          Conferir
        </button>
        <button className="tr-btn tr-btn-p" onClick={() => setEnviado(true)} disabled={!conferido || invalidas > 0 || enviado}>
          Enviar
        </button>
        <button className="tr-link" onClick={reiniciar}>
          Reiniciar
        </button>
      </div>
      <p className="tr-demo-status" aria-live="polite">
        {enviado
          ? "Lote criado: as 4 notas entraram na fila e o processamento roda em segundo plano."
          : conferido
            ? invalidas === 0
              ? "Tudo certo: nenhuma linha com problema. Pode enviar."
              : `${invalidas} linha(s) com problema. Corrija antes de enviar.`
            : "Ainda não conferido."}
      </p>
    </div>
  );
}

/* ───────────── Ciclo de vida da nota ───────────── */
const ESTADOS = [
  { id: "env", x: 20, y: 80, rot: "DPS enviada", cor: "cinza", txt: "A DPS foi montada, assinada e transmitida ao ADN. Ainda não há resposta." },
  { id: "pen", x: 190, y: 80, rot: "Pendente", cor: "amarelo", txt: "O ADN ainda não confirmou. O sistema consulta a cada 5 minutos; você também pode usar “Consultar situação”. Não reenvie: pode duplicar." },
  { id: "aut", x: 380, y: 20, rot: "Autorizada", cor: "verde", txt: "Nota válida. Dá para baixar XML e DANFSE, enviar por e-mail, substituir ou cancelar." },
  { id: "rej", x: 380, y: 140, rot: "Rejeitada", cor: "vermelho", txt: "O ADN recusou. O detalhe da nota lista os motivos. Corrija os dados e emita de novo (nova DPS)." },
  { id: "can", x: 560, y: 0, rot: "Cancelada", cor: "cinza", txt: "Cancelada com motivo (mínimo de 15 caracteres na explicação). Não entra nos totais do fechamento." },
  { id: "sub", x: 560, y: 80, rot: "Substituída", cor: "azul", txt: "Uma nota corrigida foi autorizada no lugar desta. A antiga mostra “substituída por…”." },
];
const SETAS: [string, string][] = [["env", "pen"], ["pen", "aut"], ["pen", "rej"], ["aut", "can"], ["aut", "sub"]];

export function FluxoNota() {
  const [sel, setSel] = useState("aut");
  const atual = ESTADOS.find((e) => e.id === sel)!;
  const ponto = (id: string, lado: "d" | "e") => {
    const e = ESTADOS.find((s) => s.id === id)!;
    return { x: e.x + (lado === "d" ? 130 : 0), y: e.y + 22 };
  };
  return (
    <div>
      <svg viewBox="0 0 700 190" className="tr-fluxo" role="group" aria-label="Ciclo de vida de uma nota">
        {SETAS.map(([a, b]) => {
          const p1 = ponto(a, "d");
          const p2 = ponto(b, "e");
          const mx = (p1.x + p2.x) / 2;
          return <path key={a + b} d={`M${p1.x} ${p1.y} C${mx} ${p1.y} ${mx} ${p2.y} ${p2.x} ${p2.y}`} className="tr-fluxo-seta" markerEnd="url(#seta)" />;
        })}
        <defs>
          <marker id="seta" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 z" className="tr-fluxo-ponta" />
          </marker>
        </defs>
        {ESTADOS.map((e) => (
          <g key={e.id} className={`tr-fluxo-no tr-fluxo-${e.cor} ${sel === e.id ? "on" : ""}`} onClick={() => setSel(e.id)} tabIndex={0} role="button" aria-pressed={sel === e.id} onKeyDown={(k) => (k.key === "Enter" || k.key === " ") && (k.preventDefault(), setSel(e.id))}>
            <rect x={e.x} y={e.y} width={130} height={44} rx={10} />
            <text x={e.x + 65} y={e.y + 27} textAnchor="middle">
              {e.rot}
            </text>
          </g>
        ))}
      </svg>
      <p className="tr-demo-status" aria-live="polite">
        <strong>{atual.rot}.</strong> {atual.txt}
      </p>
    </div>
  );
}

/* ───────────── Matriz de permissões ───────────── */
const MODS = ["Painel", "Emitentes", "Lotes de emissão", "Notas fiscais", "Fechamento", "Usuários"];
const ACOES = ["Ver", "Criar", "Editar", "Excluir"];
const PAPEIS: Record<string, boolean[][]> = {
  Administrador: MODS.map(() => [true, true, true, true]),
  Operador: [[true, false, false, false], [true, false, false, false], [true, true, false, false], [true, false, false, false], [false, false, false, false], [false, false, false, false]],
  Conferência: [[true, false, false, false], [false, false, false, false], [false, false, false, false], [true, false, false, false], [true, false, false, false], [false, false, false, false]],
};

export function MatrizPermissoes() {
  const [papel, setPapel] = useState("Operador");
  const [matriz, setMatriz] = useState(PAPEIS);
  const m = matriz[papel];
  const alternar = (i: number, j: number) => {
    if (papel === "Administrador") return;
    setMatriz((atual) => ({ ...atual, [papel]: atual[papel].map((linha, a) => (a === i ? linha.map((v, b) => (b === j ? !v : v)) : linha)) }));
  };
  const resumo = useMemo(() => {
    const frases = MODS.flatMap((mod, i) => {
      const acoes = ACOES.filter((_, j) => m[i][j]).map((a) => a.toLowerCase());
      return acoes.length ? [`${mod}: ${acoes.join(", ")}`] : [];
    });
    return frases.length ? frases.join(" · ") : "Sem nenhuma permissão: o usuário nem veria o menu.";
  }, [m]);

  return (
    <div>
      <div className="tr-papeis" role="tablist" aria-label="Papéis">
        {Object.keys(matriz).map((p) => (
          <button key={p} role="tab" aria-selected={papel === p} className={papel === p ? "on" : ""} onClick={() => setPapel(p)}>
            {p}
          </button>
        ))}
      </div>
      <div className="tr-tabela-rolavel">
        <table className="tr-tabela tr-matriz">
          <thead>
            <tr>
              <th>Módulo</th>
              {ACOES.map((a) => (
                <th key={a}>{a}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MODS.map((mod, i) => (
              <tr key={mod}>
                <td>{mod}</td>
                {ACOES.map((a, j) => (
                  <td key={a}>
                    <input type="checkbox" checked={m[i][j]} disabled={papel === "Administrador"} onChange={() => alternar(i, j)} aria-label={`${papel}: ${a} em ${mod}`} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="tr-demo-status" aria-live="polite">
        <strong>{papel} pode:</strong> {resumo}
      </p>
      {papel === "Administrador" && <p className="tr-demo-ajuda">O Administrador sempre tem acesso total; por isso a matriz dele fica travada.</p>}
    </div>
  );
}

/* ───────────── Recorrência ───────────── */
export function SimuladorRecorrencia() {
  const [dia, setDia] = useState(10);
  const proximas = useMemo(() => {
    const hoje = new Date();
    const lista: Date[] = [];
    for (let i = 0; lista.length < 6; i++) {
      const d = new Date(hoje.getFullYear(), hoje.getMonth() + i, dia);
      if (d >= new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())) lista.push(d);
    }
    return lista;
  }, [dia]);
  return (
    <div>
      <p className="tr-demo-ajuda">Escolha o dia do mês (1 a 28) e veja as próximas emissões.</p>
      <div className="tr-calendario" role="group" aria-label="Dia do mês">
        {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
          <button key={d} className={d === dia ? "on" : ""} onClick={() => setDia(d)} aria-pressed={d === dia}>
            {d}
          </button>
        ))}
      </div>
      <ul className="tr-proximas">
        {proximas.map((d) => (
          <li key={d.toISOString()}>{d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })} · 06:00</li>
        ))}
      </ul>
    </div>
  );
}
