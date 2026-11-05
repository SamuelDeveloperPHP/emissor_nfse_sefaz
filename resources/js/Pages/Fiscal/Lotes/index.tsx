import React, { useEffect } from "react";
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../../Layouts";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Can } from "../../../common/usePermission";
import { LoteBadge, NotaStatus, PorStatus } from "./status";

interface LoteRow {
  id: number;
  arquivo: string;
  status: string;
  total: number;
  emitente: string;
  driver: string;
  created_at: string;
  por_status: Record<NotaStatus, number>;
}

interface EmitenteOption {
  id: number;
  razao_social: string;
  cnpj: string;
}

const LotesIndex = (props: any) => {
  const lotes = props.lotes as LoteRow[];
  const emitentes = props.emitentes as EmitenteOption[];
  const { flash }: any = usePage().props;

  const { data, setData, post, processing, errors, reset } = useForm({
    emitente_id: "",
    arquivo: null as File | null,
  });

  useEffect(() => {
    if (flash?.success) toast.success(flash.success, { autoClose: 3000 });
    if (flash?.error) toast.error(flash.error, { autoClose: 3000 });
  }, [flash]);

  const temProcessando = lotes.some((lote) => lote.status === "processando");
  useEffect(() => {
    if (!temProcessando) return;
    const timer = setInterval(() => router.reload({ only: ["lotes"] }), 3000);
    return () => clearInterval(timer);
  }, [temProcessando]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("lotes.store"), { forceFormData: true, onSuccess: () => reset() });
  };

  return (
    <Layout>
      <Head title="Lotes de emissão" />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Lotes de emissão" pageTitle="Fiscal" />

          <Can permission="nfse-avulsa.view">
            <div className="d-flex justify-content-end mb-3">
              <Link href={route("lotes.emitir")} className="btn btn-outline-primary">
                Emitir uma nota
              </Link>
            </div>
          </Can>

          <Can permission="lotes-emissao.create">
            <Card>
              <Card.Header>
                <h5 className="card-title mb-0">Novo lote</h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row className="g-3 align-items-start">
                    <Col md={5}>
                      <Form.Label>Emitente</Form.Label>
                      <Form.Select
                        value={data.emitente_id}
                        onChange={(e) => setData("emitente_id", e.target.value)}
                        isInvalid={!!errors.emitente_id}
                      >
                        <option value="">Selecione o emitente</option>
                        {emitentes.map((emitente) => (
                          <option key={emitente.id} value={emitente.id}>
                            {emitente.razao_social}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.emitente_id}</Form.Control.Feedback>
                    </Col>
                    <Col md={5}>
                      <Form.Label>Arquivo CSV</Form.Label>
                      <Form.Control
                        type="file"
                        accept=".csv,.txt"
                        onChange={(e) => setData("arquivo", (e.target as HTMLInputElement).files?.[0] ?? null)}
                        isInvalid={!!errors.arquivo}
                      />
                      <Form.Control.Feedback type="invalid">{errors.arquivo}</Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        Uma nota por linha. <a href={route("lotes.modelo")}>Baixar modelo</a>
                      </Form.Text>
                    </Col>
                    <Col md={2} className="d-flex align-items-end" style={{ minHeight: 62 }}>
                      <Button type="submit" variant="primary" disabled={processing || !data.emitente_id || !data.arquivo}>
                        {processing ? "Enviando..." : "Enviar lote"}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Can>

          <Card>
            <Card.Header>
              <h5 className="card-title mb-0">Lotes enviados</h5>
            </Card.Header>
            <Card.Body>
              {lotes.length === 0 ? (
                <p className="text-muted mb-0">Nenhum lote enviado ainda. Escolha um emitente e envie um CSV para começar.</p>
              ) : (
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>Arquivo</th>
                      <th>Emitente</th>
                      <th>Enviado em</th>
                      <th className="text-end">Notas</th>
                      <th>Situação</th>
                      <th>Resultado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lotes.map((lote) => (
                      <tr key={lote.id}>
                        <td>
                          <Link href={route("lotes.show", lote.id)}>{lote.arquivo}</Link>
                          {lote.driver === "simulador" && <div className="text-muted small">Simulador local</div>}
                        </td>
                        <td>{lote.emitente}</td>
                        <td>{lote.created_at}</td>
                        <td className="text-end">{lote.total}</td>
                        <td>
                          <LoteBadge status={lote.status} />
                        </td>
                        <td>
                          <PorStatus counts={lote.por_status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>
      <ToastContainer closeButton={false} limit={1} />
    </Layout>
  );
};

export default LotesIndex;
