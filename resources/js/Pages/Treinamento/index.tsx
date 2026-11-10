import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Head } from "@inertiajs/react";
import "./treinamento.css";
import { GRUPOS, MODULOS, Modulo } from "./modulos";
import Tela from "./Tela";
import Hero3D from "./Hero3D";
import { EscolhaCertificado, FluxoNota, Glossario, MatrizPermissoes, SimuladorLote, SimuladorRecorrencia } from "./Demos";

const CHAVE = "treinamento-nfse-concluidos";
const CHAVE_TEMA = "treinamento-nfse-tema";

const guardar = {
  ler<T>(chave: string, padrao: T): T {
    try {
      const v = window.localStorage.getItem(chave);
      return v ? (JSON.parse(v) as T) : padrao;
    } catch {
      return padrao;
    }
  },
  gravar(chave: string, valor: unknown) {
    try {
      window.localStorage.setItem(chave, JSON.stringify(valor));
    } catch {
      /* navegador sem armazenamento: o treinamento continua funcionando, só não lembra o progresso */
    }
  },
};

const idDaUrl = () => {
  const id = decodeURIComponent(window.location.hash.replace(/^#\/?/, ""));
  return MODULOS.some((m) => m.id === id) ? id : MODULOS[0].id;
};

function Demo({ modulo }: { modulo: Modulo }) {
  switch (modulo.demo) {
    case "hero":
      return <Hero3D />;
    case "glossario":
      return <Glossario />;
    case "certificado":
      return <EscolhaCertificado />;
    case "lote":
      return <SimuladorLote />;
    case "fluxo":
      return <FluxoNota />;
    case "matriz":
      return <MatrizPermissoes />;
    case "recorrencia":
      return <SimuladorRecorrencia />;
    default:
      return null;
  }
}

const TITULO_DEMO: Record<string, string> = {
  hero: "Como uma nota nasce (3D)",
  glossario: "Glossário interativo",
  certificado: "Qual opção escolher?",
  lote: "Simulador de lote",
  fluxo: "Ciclo de vida da nota",
  matriz: "Teste a matriz de permissões",
  recorrencia: "Próximas emissões",
};

export default function Treinamento() {
  const [id, setId] = useState<string>(MODULOS[0].id);
  const [passo, setPasso] = useState(0);
  const [resposta, setResposta] = useState<number | null>(null);
  const [concluidos, setConcluidos] = useState<string[]>([]);
  const [busca, setBusca] = useState("");
  const [menu, setMenu] = useState(false);
  const [escuro, setEscuro] = useState<boolean | null>(null);
  const topo = useRef<HTMLDivElement>(null);

  // estado salvo e endereço (#/id) só existem no navegador
  useEffect(() => {
    setId(idDaUrl());
    setConcluidos(guardar.ler<string[]>(CHAVE, []));
    setEscuro(guardar.ler<boolean | null>(CHAVE_TEMA, null));
    const aoMudar = () => setId(idDaUrl());
    window.addEventListener("hashchange", aoMudar);
    return () => window.removeEventListener("hashchange", aoMudar);
  }, []);

  const indice = Math.max(0, MODULOS.findIndex((m) => m.id === id));
  const modulo = MODULOS[indice];
  const anterior = MODULOS[indice - 1];
  const proximo = MODULOS[indice + 1];

  useEffect(() => {
    setPasso(0);
    setResposta(null);
    setMenu(false);
    topo.current?.scrollIntoView({ block: "start" });
  }, [id]);

  const ir = useCallback((destino: string) => {
    window.location.hash = `/${destino}`;
  }, []);

  const marcar = useCallback((alvo: string, feito: boolean) => {
    setConcluidos((atual) => {
      const novo = feito ? Array.from(new Set([...atual, alvo])) : atual.filter((x) => x !== alvo);
      guardar.gravar(CHAVE, novo);
      return novo;
    });
  }, []);

  const responder = (i: number) => {
    if (resposta !== null) return;
    setResposta(i);
    if (i === modulo.quiz.correta) marcar(modulo.id, true);
  };

  // setas do teclado percorrem os passos (sem atrapalhar campos de texto)
  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      const alvo = e.target as HTMLElement;
      if (alvo.closest("input, textarea, select, button, [role=button], [role=tab]")) return;
      if (e.key === "ArrowRight") setPasso((p) => Math.min(modulo.passos.length - 1, p + 1));
      if (e.key === "ArrowLeft") setPasso((p) => Math.max(0, p - 1));
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [modulo]);

  const alternarTema = () => {
    const proximoValor = !(escuro ?? window.matchMedia("(prefers-color-scheme: dark)").matches);
    setEscuro(proximoValor);
    guardar.gravar(CHAVE_TEMA, proximoValor);
  };

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return MODULOS.filter((m) => !q || `${m.titulo} ${m.grupo} ${m.rota}`.toLowerCase().includes(q));
  }, [busca]);

  const pct = Math.round((concluidos.length / MODULOS.length) * 100);
  const feito = concluidos.includes(modulo.id);
  const passoAtual = modulo.passos[passo];

  return (
    <>
      <Head title="Treinamento do sistema" />
      <div className="tr-app" data-tema={escuro === null ? undefined : escuro ? "escuro" : "claro"}>
        <a className="tr-pular" href="#conteudo">
          Pular para o conteúdo
        </a>

        <header className="tr-topo-app">
          <button className="tr-hamb" onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-controls="tr-menu" aria-label="Abrir menu de módulos">
            <span />
            <span />
            <span />
          </button>
          <div className="tr-marca">
            <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
              <rect width="26" height="26" rx="7" fill="var(--tr-acento)" />
              <path d="M8 7h7l3 3v9H8z" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M11 14h4M11 17h4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span>
              Treinamento <small>Emissor de NFS-e</small>
            </span>
          </div>
          <div className="tr-progresso" title={`${concluidos.length} de ${MODULOS.length} módulos concluídos`}>
            <div className="tr-barra-prog">
              <span style={{ width: `${pct}%` }} />
            </div>
            <b>{pct}%</b>
          </div>
          <button className="tr-tema" onClick={alternarTema} aria-label="Alternar tema claro/escuro">
            ◐
          </button>
          <a className="tr-entrar" href="/login">
            Entrar no sistema
          </a>
        </header>

        <div className="tr-corpo">
          <nav id="tr-menu" className={`tr-menu ${menu ? "aberto" : ""}`} aria-label="Módulos do treinamento">
            <input className="tr-busca" type="search" placeholder="Buscar tela ou módulo…" value={busca} onChange={(e) => setBusca(e.target.value)} aria-label="Buscar módulo" />
            {GRUPOS.map((g) => {
              const itens = filtrados.filter((m) => m.grupo === g);
              if (!itens.length) return null;
              return (
                <div key={g} className="tr-grupo">
                  <h2>{g}</h2>
                  <ul>
                    {itens.map((m) => (
                      <li key={m.id}>
                        <a href={`#/${m.id}`} className={m.id === id ? "ativo" : ""} aria-current={m.id === id ? "page" : undefined}>
                          <span className={`tr-ok ${concluidos.includes(m.id) ? "on" : ""}`} aria-hidden="true">
                            {concluidos.includes(m.id) ? "✓" : ""}
                          </span>
                          {m.titulo}
                          {concluidos.includes(m.id) && <span className="tr-sr"> (concluído)</span>}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            {filtrados.length === 0 && <p className="tr-vazio">Nada encontrado.</p>}
          </nav>
          {menu && <div className="tr-fundo-menu" onClick={() => setMenu(false)} />}

          <main id="conteudo" className="tr-main" tabIndex={-1}>
            <div ref={topo} />
            <p className="tr-trilha">
              {modulo.grupo} · módulo {indice + 1} de {MODULOS.length}
            </p>
            <h1>{modulo.titulo}</h1>
            <div className="tr-chips">
              <span>
                Endereço: <code>{modulo.rota}</code>
              </span>
              <span>Quem acessa: {modulo.quem}</span>
            </div>
            <p className="tr-resumo">{modulo.resumo}</p>

            {modulo.demo === "hero" && (
              <section className="tr-secao">
                <h2>{TITULO_DEMO.hero}</h2>
                <Hero3D />
              </section>
            )}

            <section className="tr-secao">
              <h2>Tela passo a passo</h2>
              <p className="tr-ajuda">Clique nos pinos numerados da tela ou use os botões. As setas do teclado também funcionam.</p>
              <div className="tr-duplo">
                <div className="tr-tela">
                  <Tela modulo={modulo} ativo={passoAtual.alvo} indice={passo} onSelecionar={(alvo) => setPasso(Math.max(0, modulo.passos.findIndex((p) => p.alvo === alvo)))} />
                </div>
                <div className="tr-passos">
                  <ol>
                    {modulo.passos.map((p, i) => (
                      <li key={i} className={i === passo ? "ativo" : i < passo ? "feito" : ""}>
                        <button onClick={() => setPasso(i)} aria-current={i === passo ? "step" : undefined}>
                          <span className="tr-num">{i + 1}</span>
                          <span>
                            <b>{p.titulo.replace(/^\d+\.\s*/, "")}</b>
                            {i === passo && <em>{p.texto}</em>}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ol>
                  <div className="tr-acoes">
                    <button className="tr-btn" disabled={passo === 0} onClick={() => setPasso(passo - 1)}>
                      ← Anterior
                    </button>
                    <button className="tr-btn tr-btn-p" disabled={passo === modulo.passos.length - 1} onClick={() => setPasso(passo + 1)}>
                      Próximo →
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {modulo.demo && modulo.demo !== "hero" && (
              <section className="tr-secao tr-demo">
                <h2>Experimente: {TITULO_DEMO[modulo.demo]}</h2>
                <Demo modulo={modulo} />
              </section>
            )}

            <section className="tr-secao tr-duas-col">
              <div className="tr-nota tr-dica">
                <h3>Dicas</h3>
                <ul>
                  {modulo.dicas.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              {modulo.cuidados && (
                <div className="tr-nota tr-cuidado">
                  <h3>Atenção</h3>
                  <ul>
                    {modulo.cuidados.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            <section className="tr-secao tr-quiz">
              <h2>Teste o que aprendeu</h2>
              <p className="tr-pergunta">{modulo.quiz.pergunta}</p>
              <div className="tr-opcoes" role="group" aria-label="Alternativas">
                {modulo.quiz.opcoes.map((o, i) => {
                  const estado = resposta === null ? "" : i === modulo.quiz.correta ? "certa" : i === resposta ? "errada" : "neutra";
                  return (
                    <button key={o} className={estado} onClick={() => responder(i)} disabled={resposta !== null}>
                      {o}
                    </button>
                  );
                })}
              </div>
              {resposta !== null && (
                <p className={`tr-feedback ${resposta === modulo.quiz.correta ? "ok" : "no"}`} role="status">
                  {resposta === modulo.quiz.correta ? "Correto! " : "Não foi dessa vez. "}
                  {modulo.quiz.explicacao}{" "}
                  {resposta !== modulo.quiz.correta && (
                    <button className="tr-link" onClick={() => setResposta(null)}>
                      Tentar de novo
                    </button>
                  )}
                </p>
              )}
            </section>

            <div className="tr-rodape-mod">
              <label className="tr-concluir">
                <input type="checkbox" checked={feito} onChange={(e) => marcar(modulo.id, e.target.checked)} /> Marcar este módulo como concluído
              </label>
              <div className="tr-acoes">
                {anterior && (
                  <button className="tr-btn" onClick={() => ir(anterior.id)}>
                    ← {anterior.titulo}
                  </button>
                )}
                {proximo && (
                  <button className="tr-btn tr-btn-p" onClick={() => ir(proximo.id)}>
                    {proximo.titulo} →
                  </button>
                )}
              </div>
            </div>
            {pct === 100 && <p className="tr-parabens">Você concluiu todos os módulos do treinamento.</p>}
          </main>
        </div>
      </div>
    </>
  );
}
