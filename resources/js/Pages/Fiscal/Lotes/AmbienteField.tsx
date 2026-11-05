import React from "react";
import { Form } from "react-bootstrap";

export const AMBIENTES = [
  { value: "homologacao", label: "Homologação (teste)" },
  { value: "producao", label: "Produção" },
];

export const nomeDoAmbiente = (ambiente?: string | null) =>
  ambiente === "producao" ? "Produção" : ambiente === "homologacao" ? "Homologação" : "—";

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

/** Environment picker, rendered only while the Administrador has the option switched on. */
export const AmbienteField = ({ value, onChange, error }: Props) => (
  <>
    <Form.Label>Ambiente</Form.Label>
    <Form.Select value={value} onChange={(e) => onChange(e.target.value)} isInvalid={!!error}>
      {AMBIENTES.map((ambiente) => (
        <option key={ambiente.value} value={ambiente.value}>
          {ambiente.label}
        </option>
      ))}
    </Form.Select>
    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    {value === "producao" && <Form.Text className="text-danger">Em produção a nota tem valor fiscal.</Form.Text>}
  </>
);
