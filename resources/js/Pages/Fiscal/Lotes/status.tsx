import React from "react";

export type NotaStatus = "autorizada" | "pendente" | "rejeitada" | "cancelada";

export const NOTA_STATUS: Record<NotaStatus, { label: string; badge: string }> = {
  autorizada: { label: "Autorizada", badge: "bg-success-subtle text-success" },
  pendente: { label: "Pendente", badge: "bg-warning-subtle text-warning" },
  rejeitada: { label: "Rejeitada", badge: "bg-danger-subtle text-danger" },
  cancelada: { label: "Cancelada", badge: "bg-secondary-subtle text-secondary" },
};

const LOTE_STATUS: Record<string, { label: string; badge: string }> = {
  processando: { label: "Processando", badge: "bg-info-subtle text-info" },
  aguardando_transmissao: { label: "Aguardando transmissão", badge: "bg-warning-subtle text-warning" },
  concluido: { label: "Concluído", badge: "bg-success-subtle text-success" },
  concluido_com_erros: { label: "Concluído com erros", badge: "bg-danger-subtle text-danger" },
};

export const LoteBadge = ({ status }: { status: string }) => {
  const meta = LOTE_STATUS[status] ?? { label: status, badge: "bg-secondary-subtle text-secondary" };
  return <span className={`badge ${meta.badge}`}>{meta.label}</span>;
};

export const NotaBadge = ({ status }: { status: NotaStatus }) => (
  <span className={`badge ${NOTA_STATUS[status].badge}`}>{NOTA_STATUS[status].label}</span>
);

export const PorStatus = ({ counts }: { counts: Record<NotaStatus, number> }) => (
  <span className="d-inline-flex flex-wrap gap-1">
    {(Object.keys(NOTA_STATUS) as NotaStatus[])
      .filter((status) => counts[status] > 0)
      .map((status) => (
        <span key={status} className={`badge ${NOTA_STATUS[status].badge}`}>
          {counts[status]} {NOTA_STATUS[status].label.toLowerCase()}
          {counts[status] === 1 ? "" : "s"}
        </span>
      ))}
  </span>
);

export const moeda = (value: number | string) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value));
