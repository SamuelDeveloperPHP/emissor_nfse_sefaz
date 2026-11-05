import React from "react";
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Head, Link, router } from "@inertiajs/react";
import Layout from "../../../Layouts";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { NotaBadge, NotaStatus, moeda } from "../Lotes/status";
import { nomeDoAmbiente } from "../Lotes/AmbienteField";

interface NotaRow {
  id: number;
  status: NotaStatus;
  emitente: string;
  tomador: string | null;
  numero_nfse: string | null;
  numero_dps: string | null;
  valor: string;
  ambiente: string | null;
  simulada: boolean;
  data: string;
}

interface Paginated<T> {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
  prev_page_url: string | null;
  next_page_url: string | null;
}

type Filtros = { emitente_id?: string; status?: string; de?: string; ate?: string; q?: string };

const STATUS_OPCOES = [
  { value: "", label: "Todas as situações" },
  { value: "autorizada", label: "Autorizadas" },
  { value: "pendente", label: "Pendentes" },
  { value: "rejeitada", label: "Rejeitadas" },
  { value: "cancelada", label: "Canceladas" },
];

const NotasIndex = (props: any) => {
  const notas = props.notas as Paginated<NotaRow>;
  const emitentes = props.emitentes as { id: number; razao_social: string }[];
  const [filtros, setFiltros] = React.useState<Filtros>({
    emitente_id: props.filtros?.emitente_id ?? "",
    status: props.filtros?.status ?? "",
    de: props.filtros?.de ?? "",
    ate: props.filtros?.ate ?? "",
    q: props.filtros?.q ?? "",
  });

  const buscar = (e: React.FormEvent) => {
    e.preventDefault();
    const limpos = Object.fromEntries(Object.entries(filtros).filter(([, v]) => v !== "" && v !== undefined));
    router.get(route("notas.index"), limpos, { preserveState: true });
  };

  const limpar = () => {
    setFiltros({ emitente_id: "", status: "", de: "", ate: "", q: "" });
    router.get(route("notas.index"));
  };

  const mudar = (campo: keyof Filtros) => (e: React.ChangeEvent<any>) => setFiltros({ ...filtros, [campo]: e.target.value });

  return (
    <Layout>
      <Head title="Notas fiscais" />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Notas fiscais" pageTitle="Fiscal" />

          <Card>
            <Card.Body>
              <Form onSubmit={buscar}>
                <Row className="g-3 align-items-end">
                  <Col md={3}>
                    <Form.Label>Emitente</Form.Label>
                    <Form.Select value={filtros.emitente_id} onChange={mudar("emitente_id")}>
                      <option value="">Todos os emitentes</option>
                      {emitentes.map((emitente) => (
                        <option key={emitente.id} value={emitente.id}>
                          {emitente.razao_social}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Form.Label>Situação</Form.Label>
                    <Form.Select value={filtros.status} onChange={mudar("status")}>
                      {STATUS_OPCOES.map((opcao) => (
                        <option key={opcao.value} value={opcao.value}>
                          {opcao.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Form.Label>De</Form.Label>
                    <Form.Control type="date" value={filtros.de} onChange={mudar("de")} />
                  </Col>
                  <Col md={2}>
                    <Form.Label>Até</Form.Label>
                    <Form.Control type="date" value={filtros.ate} onChange={mudar("ate")} />
                  </Col>
                  <Col md={3}>
                    <Form.Label>Tomador, número ou chave</Form.Label>
                    <Form.Control value={filtros.q} onChange={mudar("q")} />
                  </Col>
                  <Col md={12} className="d-flex gap-2">
                    <Button type="submit" variant="primary">
                      Filtrar
                    </Button>
                    <Button type="button" variant="light" onClick={limpar}>
                      Limpar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h5 className="card-title mb-0">{notas.total} {notas.total === 1 ? "nota" : "notas"}</h5>
            </Card.Header>
            <Card.Body>
              {notas.data.length === 0 ? (
                <p className="text-muted mb-0">Nenhuma nota encontrada com estes filtros.</p>
              ) : (
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Emitente</th>
                      <th>Tomador</th>
                      <th>Nº NFS-e</th>
                      <th>Ambiente</th>
                      <th className="text-end">Valor</th>
                      <th>Situação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notas.data.map((nota) => (
                      <tr key={nota.id}>
                        <td>
                          <Link href={route("notas.show", nota.id)}>{nota.data}</Link>
                        </td>
                        <td>{nota.emitente}</td>
                        <td>{nota.tomador ?? "—"}</td>
                        <td>
                          {nota.numero_nfse ?? "—"}
                          {nota.simulada && <div className="text-muted small">Simulador local</div>}
                        </td>
                        <td>{nomeDoAmbiente(nota.ambiente)}</td>
                        <td className="text-end">{moeda(nota.valor)}</td>
                        <td>
                          <NotaBadge status={nota.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}

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

export default NotasIndex;
