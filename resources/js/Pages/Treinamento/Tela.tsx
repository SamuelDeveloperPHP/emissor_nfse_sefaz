import React from "react";
import { Bloco, Modulo } from "./modulos";

const OX = 150; // início da área de conteúdo dentro do SVG
const OY = 44;

const MENU = ["Painel", "Emitentes", "Tomadores", "Serviços", "Lotes", "Notas", "Fechamento", "Admin"];

/** Desenha um bloco da tela fictícia. Tudo é SVG, então escala sem perder nitidez. */
function Desenho({ b }: { b: Bloco }) {
  const { x, y, w, h, rotulo, extra = [] } = b;
  switch (b.tipo) {
    case "titulo":
      return (
        <text x={x} y={y + 16} className="tr-t-titulo">
          {rotulo}
        </text>
      );
    case "texto":
      return (
        <text x={x} y={y + 13} className="tr-t-texto">
          {rotulo}
        </text>
      );
    case "botao":
    case "botao2":
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx={6} className={b.tipo === "botao" ? "tr-sbtn" : "tr-sbtn2"} />
          <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" className={b.tipo === "botao" ? "tr-t-btn" : "tr-t-btn2"}>
            {rotulo}
          </text>
        </g>
      );
    case "campo":
      return (
        <g>
          <text x={x} y={y + 9} className="tr-t-rotulo">
            {rotulo}
          </text>
          <rect x={x} y={y + 14} width={w} height={h - 16} rx={5} className="tr-campo" />
        </g>
      );
    case "chave":
      return (
        <g>
          <rect x={x} y={y + 3} width={30} height={16} rx={8} className="tr-chave" />
          <circle cx={x + 22} cy={y + 11} r={6} className="tr-chave-bola" />
          <text x={x + 40} y={y + 15} className="tr-t-texto">
            {rotulo}
          </text>
        </g>
      );
    case "selo":
      return (
        <g>
          <rect x={x} y={y} width={w + 28} height={h} rx={10} className={`tr-selo tr-selo-${extra[0]}`} />
          <text x={x + (w + 28) / 2} y={y + 14} textAnchor="middle" className={`tr-t-selo tr-t-selo-${extra[0]}`}>
            {rotulo}
          </text>
        </g>
      );
    case "aviso":
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx={6} className={`tr-aviso tr-aviso-${extra[0] ?? "info"}`} />
          <text x={x + 10} y={y + h / 2 + 4} className="tr-t-aviso">
            {rotulo}
          </text>
        </g>
      );
    case "abas":
      return (
        <g>
          {extra.map((item, i) => {
            const largura = 20 + item.length * 6.4;
            const antes = extra.slice(0, i).reduce((s, t) => s + 20 + t.length * 6.4 + 6, 0);
            const ativa = Number(rotulo) === i;
            return (
              <g key={item}>
                <rect x={x + antes} y={y} width={largura} height={h} rx={6} className={ativa ? "tr-aba tr-aba-on" : "tr-aba"} />
                <text x={x + antes + largura / 2} y={y + 18} textAnchor="middle" className={ativa ? "tr-t-aba-on" : "tr-t-aba"}>
                  {item}
                </text>
              </g>
            );
          })}
        </g>
      );
    case "tabela": {
      const colunas = extra.length || 1;
      const larg = w / colunas;
      const linhas = Math.max(2, Math.floor((h - 26) / 22));
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx={6} className="tr-card" />
          {rotulo && (
            <text x={x + 10} y={y + 16} className="tr-t-rotulo">
              {rotulo}
            </text>
          )}
          <rect x={x} y={y + (rotulo ? 22 : 0)} width={w} height={22} className="tr-th" />
          {extra.map((c, i) => (
            <text key={c} x={x + 8 + i * larg} y={y + (rotulo ? 22 : 0) + 15} className="tr-t-th">
              {c}
            </text>
          ))}
          {Array.from({ length: linhas - (rotulo ? 1 : 0) }).map((_, r) => (
            <g key={r}>
              <line x1={x} x2={x + w} y1={y + (rotulo ? 44 : 22) + (r + 1) * 22} y2={y + (rotulo ? 44 : 22) + (r + 1) * 22} className="tr-linha" />
              {extra.map((_c, i) => (
                <rect key={i} x={x + 8 + i * larg} y={y + (rotulo ? 44 : 22) + r * 22 + 7} width={Math.max(18, larg * (0.35 + ((r + i) % 3) * 0.18))} height={6} rx={3} className="tr-barra" />
              ))}
            </g>
          ))}
        </g>
      );
    }
    case "lista":
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx={6} className="tr-card" />
          {rotulo && (
            <text x={x + 10} y={y + 17} className="tr-t-rotulo">
              {rotulo}
            </text>
          )}
          {extra.slice(0, Math.floor((h - 26) / 22)).map((item, i) => (
            <g key={item}>
              <rect x={x + 10} y={y + 28 + i * 22} width={11} height={11} rx={3} className="tr-check" />
              <text x={x + 28} y={y + 38 + i * 22} className="tr-t-texto">
                {item}
              </text>
            </g>
          ))}
        </g>
      );
    case "cartao":
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx={8} className="tr-card" />
          <text x={x + 12} y={y + 20} className="tr-t-card">
            {rotulo}
          </text>
          {extra.map((item, i) => (
            <text key={item} x={x + 12} y={y + 40 + i * 18} className={h < 90 ? "tr-t-grande" : "tr-t-texto"}>
              {item}
            </text>
          ))}
        </g>
      );
    case "grafico": {
      const barras = [0.4, 0.7, 0.55, 0.9, 0.62, 0.8, 0.45, 0.7];
      const bw = (w - 28) / barras.length;
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx={8} className="tr-card" />
          <text x={x + 12} y={y + 18} className="tr-t-card">
            {rotulo}
          </text>
          {barras.map((v, i) => (
            <rect key={i} x={x + 14 + i * bw + 2} y={y + h - 10 - (h - 44) * v} width={bw - 5} height={(h - 44) * v} rx={2} className={i % 3 === 0 ? "tr-barra-g tr-barra-g2" : "tr-barra-g"} />
          ))}
        </g>
      );
    }
    case "upload":
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx={8} className="tr-upload" />
          <path d={`M${x + w / 2} ${y + 18} v22 m-8 -14 l8 -8 l8 8`} className="tr-seta" />
          <text x={x + w / 2} y={y + h - 10} textAnchor="middle" className="tr-t-texto">
            {rotulo}
          </text>
        </g>
      );
  }
}

interface Props {
  modulo: Modulo;
  ativo: string | null;
  indice: number;
  onSelecionar: (alvo: string) => void;
}

export default function Tela({ modulo, ativo, indice, onSelecionar }: Props) {
  const alvos = new Map(modulo.passos.map((p, i) => [p.alvo, i]));
  const alvoAtivo = modulo.tela.find((b) => b.id === ativo);
  const larguraAlvo = (b: Bloco) => (b.tipo === "selo" ? b.w + 28 : b.w);

  return (
    <svg className="tr-svg" viewBox="0 0 760 420" role="img" aria-label={`Desenho esquemático da tela ${modulo.titulo}`}>
      {/* moldura do sistema */}
      <rect x="0" y="0" width="760" height="420" rx="12" className="tr-fundo" />
      <rect x="0" y="0" width="140" height="420" rx="12" className="tr-lateral" />
      <rect x="0" y="0" width="760" height="34" rx="12" className="tr-topo" />
      <circle cx="18" cy="17" r="4" fill="#ff6b6b" />
      <circle cx="32" cy="17" r="4" fill="#ffd166" />
      <circle cx="46" cy="17" r="4" fill="#06d6a0" />
      <text x="380" y="21" textAnchor="middle" className="tr-t-url">
        {modulo.rota}
      </text>
      {MENU.map((m, i) => (
        <g key={m}>
          <rect x="10" y={50 + i * 30} width="120" height="24" rx="6" className={i === 0 ? "tr-smenu tr-smenu-on" : "tr-smenu"} />
          <text x="22" y={66 + i * 30} className="tr-t-menu">
            {m}
          </text>
        </g>
      ))}

      <g transform={`translate(${OX} ${OY})`}>
        {modulo.tela.map((b) => {
          const passo = alvos.get(b.id);
          const clicavel = passo !== undefined;
          return (
            <g
              key={b.id}
              className={`tr-bloco ${clicavel ? "tr-bloco-clicavel" : ""} ${ativo === b.id ? "tr-bloco-ativo" : ""}`}
              onClick={clicavel ? () => onSelecionar(b.id) : undefined}
              onKeyDown={clicavel ? (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onSelecionar(b.id)) : undefined}
              tabIndex={clicavel ? 0 : undefined}
              role={clicavel ? "button" : undefined}
              aria-label={clicavel ? `Passo ${passo + 1}: ${modulo.passos[passo].titulo}` : undefined}
            >
              <Desenho b={b} />
              {clicavel && <rect x={b.x - 3} y={b.y - 3} width={larguraAlvo(b) + 6} height={b.h + 6} rx={8} className="tr-hit" />}
              {clicavel && (
                <g>
                  <circle cx={b.x - 3} cy={b.y - 3} r={9} className="tr-pino" />
                  <text x={b.x - 3} y={b.y + 0.5} textAnchor="middle" className="tr-t-pino">
                    {passo + 1}
                  </text>
                </g>
              )}
            </g>
          );
        })}
        {alvoAtivo && (
          <rect x={alvoAtivo.x - 5} y={alvoAtivo.y - 5} width={larguraAlvo(alvoAtivo) + 10} height={alvoAtivo.h + 10} rx={9} className="tr-foco" key={`${modulo.id}-${indice}`} />
        )}
      </g>
    </svg>
  );
}
