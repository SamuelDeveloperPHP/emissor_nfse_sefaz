export type Status = "autorizada" | "pendente" | "rejeitada" | "cancelada";

export const STATUS_META: { key: Status; label: string; color: string; ink: string }[] = [
  { key: "autorizada", label: "Autorizadas", color: "#1f8a5b", ink: "#ffffff" },
  { key: "pendente", label: "Pendentes", color: "#e0a526", ink: "#2b2100" },
  { key: "rejeitada", label: "Rejeitadas", color: "#c8452f", ink: "#ffffff" },
  { key: "cancelada", label: "Canceladas", color: "#6b778c", ink: "#ffffff" },
];
