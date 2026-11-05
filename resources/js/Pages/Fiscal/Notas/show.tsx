import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../../Layouts";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Can } from "../../../common/usePermission";
import { NotaBadge, moeda } from "../Lotes/status";
import { nomeDoAmbiente } from "../Lotes/AmbienteField";

const Campo = ({ rotulo, children }: { rotulo: string; children: React.ReactNode }) => (
  <div className="mb-3">
    <div className="text-muted fs-13">{rotulo}</div>
    <div className="fs-15" style={{ wordBreak: "break-all" }}>
      {children || "—"}
    </div>
  </div>
);

const NotaShow = (props: any) => {
  const nota = props.nota;
  const motivos = props.motivos as { codigo: string; rotulo: string }[];
  const { flash, errors: errosGerais }: any = usePage().props;
  const [cancelando, setCancelando] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({ motivo_codigo: "1", motivo: "" });
  const erroCancelamento = (errors as Record<string, string>).cancelamento ?? errosGerais?.cancelamento;

  useEffect(() => {
    if (flash?.success) toast.success(flash.success, { autoClose: 4000 });
    if (flash?.error) toast.error(flash.error, { autoClose: 6000 });
  }, [flash]);

  const consultar = () => router.post(route("notas.consultar", nota.id), {}, { preserveScroll: true });

  const cancelar = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("notas.cancelar", nota.id), {
      preserveScroll: true,
      onSuccess: () => {
        setCancelando(false);
        reset();
      },
    });
  };

  return (
    <Layout>
      <Head title="Nota fiscal" />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={nota.numero_nfse ? `NFS-e ${nota.numero_nfse}` : `Nota ${nota.id}`} pageTitle="Notas fiscais" />

          <Card>
            <Card.Body>
              <div className="d-flex flex-wrap align-items-center gap-3">
                <NotaBadge status={nota.status} />
                <span className="text-muted">
                  {nota.emitente} · {nomeDoAmbiente(nota.ambiente)}
                </span>
                <Link href={route("notas.index")} className="ms-auto">
                  Voltar às notas
                </Link>
              </div>
              {nota.simulada && (
                <Alert variant="warning" className="mt-3 mb-0">
                  Nota do simulador local: não foi emitida de verdade e não tem valor fiscal.
                </Alert>
              )}
              {nota.status === "pendente" && (
                <Alert variant="info" className="mt-3 mb-0">
                  Esta nota ainda não tem resposta confirmada. Use <strong>Consultar situação</strong> antes de emitir outra; reenviar pode duplicar a nota.
                </Alert>
              )}
              {nota.status === "rejeitada" && nota.erros.length > 0 && (
                <Alert variant="danger" className="mt-3 mb-0">
                  <ul className="mb-0 ps-3">
                    {nota.erros.map((erro: string, index: number) => (
                      <li key={index}>{erro}</li>
                    ))}
                  </ul>
                </Alert>
              )}
              {nota.status === "pendente" && nota.erros.length > 0 && <p className="text-muted small mt-3 mb-0">Última resposta: {nota.erros[0]}</p>}
            </Card.Body>
          </Card>

          <Row>
            <Col lg={7}>
              <Card>
                <Card.Header>
                  <h5 className="card-title mb-0">Dados da nota</h5>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <Campo rotulo="Tomador">{nota.tomador}</Campo>
                      <Campo rotulo="CPF / CNPJ do tomador">{nota.tomador_documento}</Campo>
                      <Campo rotulo="Valor do serviço">{moeda(nota.valor)}</Campo>
                      <Campo rotulo="Competência">{nota.competencia}</Campo>
                    </Col>
                    <Col md={6}>
                      <Campo rotulo="Nº da NFS-e">{nota.numero_nfse}</Campo>
                      <Campo rotulo="Nº da DPS">{nota.numero_dps}</Campo>
                      <Campo rotulo="Chave de acesso">{nota.chave_acesso}</Campo>
                      <Campo rotulo="Lote">
                        {nota.lote_id && <Link href={route("lotes.show", nota.lote_id)}>Lote {nota.lote_id}</Link>}
                      </Campo>
                    </Col>
                  </Row>
                  <Campo rotulo="Descrição do serviço">{nota.descricao}</Campo>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={5}>
              <Card>
                <Card.Header>
                  <h5 className="card-title mb-0">Histórico</h5>
                </Card.Header>
                <Card.Body>
                  <Campo rotulo="Recebida no sistema">{nota.criada_em}</Campo>
                  <Campo rotulo="Autorizada em">{nota.emitida_em}</Campo>
                  <Campo rotulo="Última consulta ao ADN">{nota.consultada_em}</Campo>
                  {nota.status === "cancelada" && (
                    <>
                      <Campo rotulo="Cancelada em">{nota.cancelada_em}</Campo>
                      <Campo rotulo="Motivo do cancelamento">{nota.cancelamento_motivo}</Campo>
                    </>
                  )}
                </Card.Body>
              </Card>

              <Card>
                <Card.Header>
                  <h5 className="card-title mb-0">Arquivos e ações</h5>
                </Card.Header>
                <Card.Body className="d-flex flex-column gap-2">
                  {nota.tem_nfse && (
                    <a className="btn btn-outline-primary" href={route("notas.xml", [nota.id, "nfse"])}>
                      Baixar XML da NFS-e
                    </a>
                  )}
                  {nota.pode_danfse && (
                    <a className="btn btn-outline-primary" href={route("notas.danfse", nota.id)}>
                      Baixar DANFSE (PDF)
                    </a>
                  )}
                  {nota.tem_dps && (
                    <a className="btn btn-outline-secondary" href={route("notas.xml", [nota.id, "dps"])}>
                      Baixar XML da DPS enviada
                    </a>
                  )}
                  {nota.tem_cancelamento && (
                    <a className="btn btn-outline-secondary" href={route("notas.xml", [nota.id, "cancelamento"])}>
                      Baixar XML do cancelamento
                    </a>
                  )}
                  {nota.pode_consultar && (
                    <Button variant="primary" onClick={consultar}>
                      Consultar situação
                    </Button>
                  )}
                  {nota.pode_cancelar && (
                    <Can permission="notas-fiscais.cancelar">
                      <Button variant="outline-danger" onClick={() => setCancelando(true)}>
                        Cancelar nota
                      </Button>
                    </Can>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <Modal show={cancelando} onHide={() => setCancelando(false)} centered>
        <Form onSubmit={cancelar}>
          <Modal.Header closeButton>
            <Modal.Title>Cancelar nota</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>O cancelamento é registrado no ADN e não pode ser desfeito.</p>
            {erroCancelamento && <Alert variant="danger">{erroCancelamento}</Alert>}
            <Form.Label>Motivo</Form.Label>
            <Form.Select className="mb-3" value={data.motivo_codigo} onChange={(e) => setData("motivo_codigo", e.target.value)}>
              {motivos.map((motivo) => (
                <option key={motivo.codigo} value={motivo.codigo}>
                  {motivo.rotulo}
                </option>
              ))}
            </Form.Select>
            <Form.Label>Explique o motivo (mínimo de 15 caracteres)</Form.Label>
            <Form.Control as="textarea" rows={3} value={data.motivo} onChange={(e) => setData("motivo", e.target.value)} isInvalid={!!errors.motivo} />
            <Form.Control.Feedback type="invalid">{errors.motivo}</Form.Control.Feedback>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={() => setCancelando(false)}>
              Voltar
            </Button>
            <Button type="submit" variant="danger" disabled={processing || data.motivo.trim().length < 15}>
              {processing ? "Cancelando..." : "Cancelar nota"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ToastContainer closeButton={false} limit={1} />
    </Layout>
  );
};

export default NotaShow;
