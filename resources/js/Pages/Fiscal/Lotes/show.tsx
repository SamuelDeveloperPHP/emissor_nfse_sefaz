import React, { useEffect } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { Head, Link, router } from "@inertiajs/react";
import Layout from "../../../Layouts";
import { useFlashAlert } from "../../../common/alerta";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { LoteBadge, NotaBadge, NotaStatus, PorStatus, moeda } from "./status";
import { nomeDoAmbiente } from "./AmbienteField";

interface NotaRow {
  id: number;
  linha: number;
  numero: string | null;
  status: NotaStatus;
  valor: string;
  tomador: string | null;
  erros: string[];
}

interface Paginated<T> {
  data: T[];
  current_page: number;
  last_page: number;
  prev_page_url: string | null;
  next_page_url: string | null;
}

const LoteShow = (props: any) => {
  const lote = props.lote;
  const notas = props.notas as Paginated<NotaRow>;

  useFlashAlert();

  useEffect(() => {
    if (lote.status !== "processando") return;
    const timer = setInterval(() => router.reload({ only: ["lote", "notas"] }), 3000);
    return () => clearInterval(timer);
  }, [lote.status]);

  return (
    <Layout>
      <Head title={`Lote ${lote.arquivo}`} />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={lote.arquivo} pageTitle="Lotes de emissão" />

          <Card>
            <Card.Body>
              <div className="d-flex flex-wrap align-items-center gap-3">
                <LoteBadge status={lote.status} />
                <PorStatus counts={lote.por_status} />
                <span className="text-muted">
                  {lote.total} {lote.total === 1 ? "nota" : "notas"} · {lote.emitente} · {nomeDoAmbiente(lote.ambiente)} · enviado em {lote.created_at}
                </span>
                {lote.por_status.rejeitada > 0 && (
                  <a className="btn btn-outline-primary btn-sm ms-auto" href={route("lotes.rejeitadas", lote.id)}>
                    Baixar linhas rejeitadas (CSV)
                  </a>
                )}
                <Link href={route("lotes.index")} className={lote.por_status.rejeitada > 0 ? "" : "ms-auto"}>
                  Voltar aos lotes
                </Link>
              </div>
              {lote.driver === "simulador" && (
                <p className="text-muted small mt-3 mb-0">
                  Este emitente usa o simulador local: as notas aprovadas aqui não foram emitidas de verdade.
                </p>
              )}
              {lote.status === "aguardando_transmissao" && (
                <p className="text-muted small mt-3 mb-0">
                  As DPS foram geradas e validadas no XSD oficial, mas o driver deste emitente ainda não transmite.
                </p>
              )}
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Linha</th>
                    <th>Nº DPS</th>
                    <th>Tomador</th>
                    <th className="text-end">Valor</th>
                    <th>Situação</th>
                    <th>Observações</th>
                  </tr>
                </thead>
                <tbody>
                  {notas.data.map((nota) => (
                    <tr key={nota.id}>
                      <td>{nota.linha}</td>
                      <td>{nota.numero ?? "—"}</td>
                      <td>{nota.tomador ?? "—"}</td>
                      <td className="text-end">{moeda(nota.valor)}</td>
                      <td>
                        <NotaBadge status={nota.status} />
                      </td>
                      <td>
                        {nota.erros.length === 0 ? (
                          "—"
                        ) : (
                          <ul className="mb-0 ps-3 small">
                            {nota.erros.map((erro, index) => (
                              <li key={index}>{erro}</li>
                            ))}
                          </ul>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {notas.last_page > 1 && (
                <div className="d-flex justify-content-between align-items-center">
                  <Button variant="light" disabled={!notas.prev_page_url} onClick={() => notas.prev_page_url && router.get(notas.prev_page_url)}>
                    Anterior
                  </Button>
                  <span className="text-muted">
                    Página {notas.current_page} de {notas.last_page}
                  </span>
                  <Button variant="light" disabled={!notas.next_page_url} onClick={() => notas.next_page_url && router.get(notas.next_page_url)}>
                    Próxima
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>
    </Layout>
  );
};

export default LoteShow;
