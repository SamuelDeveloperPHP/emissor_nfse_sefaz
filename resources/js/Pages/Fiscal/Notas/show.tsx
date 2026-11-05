import React, { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Layout from "../../../Layouts";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Can } from "../../../common/usePermission";
import { avisarCamposInvalidos, useFlashAlert } from "../../../common/alerta";
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
  const [cancelando, setCancelando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [consultando, setConsultando] = useState(false);

  useFlashAlert();

  const { data, setData, post, processing, errors, reset } = useForm({ motivo_codigo: "1", motivo: "" });
  const email = useForm({ email: nota.tomador_email ?? "" });

  const enviarEmail = (e: React.FormEvent) => {
    e.preventDefault();
    email.post(route("notas.email", nota.id), { preserveScroll: true, onSuccess: () => setEnviando(false), onError: avisarCamposInvalidos });
  };

  const consultar = () =>
    router.post(route("notas.consultar", nota.id), {}, { preserveScroll: true, onStart: () => setConsultando(true), onFinish: () => setConsultando(false) });

  const cancelar = async (e: React.FormEvent) => {
    e.preventDefault();

    const resposta = await Swal.fire({
      icon: "warning",
      title: "Cancelar esta nota?",
      text: "O cancelamento é registrado no ADN e não pode ser desfeito.",
      showCancelButton: true,
      confirmButtonText: "Cancelar a nota",
      cancelButtonText: "Voltar",
      confirmButtonColor: "#d63939",
      focusCancel: true,
      reverseButtons: true,
    });
    if (!resposta.isConfirmed) return;

    post(route("notas.cancelar", nota.id), {
      preserveScroll: true,
      onSuccess: () => {
        setCancelando(false);
        reset();
      },
      onError: avisarCamposInvalidos,
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
              {nota.substituida_por && (
                <Alert variant="secondary" className="mt-3 mb-0">
                  Esta nota foi <strong>substituída</strong> pela{" "}
                  <Link href={route("notas.show", nota.substituida_por.id)}>NFS-e {nota.substituida_por.numero_nfse ?? `nº ${nota.substituida_por.id}`}</Link>.
                </Alert>
              )}
              {nota.substitui && (
                <Alert variant="info" className="mt-3 mb-0">
                  Esta nota <strong>substitui</strong> a <Link href={route("notas.show", nota.substitui.id)}>NFS-e {nota.substitui.numero_nfse ?? `nº ${nota.substitui.id}`}</Link>
                  {nota.status === "autorizada" ? "." : ". A nota anterior continua valendo até esta ser autorizada."}
                </Alert>
              )}
              {nota.status === "pendente" && (
                <Alert variant="info" className="mt-3 mb-0">
                  Esta nota ainda não tem resposta confirmada. O sistema consulta o ADN a cada 5 minutos; você também pode usar <strong>Consultar situação</strong>. Não emita outra igual:
                  reenviar pode duplicar a nota.
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
                      <Campo rotulo="Lote">{nota.lote_id && <Link href={route("lotes.show", nota.lote_id)}>Lote {nota.lote_id}</Link>}</Campo>
                    </Col>
                  </Row>
                  <Campo rotulo="Descrição do serviço">{nota.descricao}</Campo>
                  {nota.substituicao_motivo && <Campo rotulo="Motivo da substituição">{nota.substituicao_motivo}</Campo>}
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
                      <Campo rotulo={nota.substituida_por ? "Substituída em" : "Cancelada em"}>{nota.cancelada_em}</Campo>
                      <Campo rotulo={nota.substituida_por ? "Motivo" : "Motivo do cancelamento"}>{nota.cancelamento_motivo}</Campo>
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
                  {nota.pode_enviar_email && (
                    <Can permission="notas-fiscais.enviar">
                      <Button variant="outline-primary" onClick={() => setEnviando(true)}>
                        Enviar por e-mail
                      </Button>
                      {nota.email_enviado_em && (
                        <div className="text-muted small">
                          Último envio: {nota.email_enviado_em} para {nota.email_enviado_para}
                        </div>
                      )}
                    </Can>
                  )}
                  {nota.pode_consultar && (
                    <Button variant="primary" onClick={consultar} disabled={consultando}>
                      {consultando ? "Consultando..." : "Consultar situação"}
                    </Button>
                  )}
                  {nota.pode_substituir && (
                    <Can permission="notas-fiscais.substituir">
                      <Link className="btn btn-outline-warning" href={route("notas.substituir", nota.id)}>
                        Substituir por nota corrigida
                      </Link>
                    </Can>
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
            <p className="text-muted">Para corrigir um valor ou um dado da nota, prefira a substituição: ela emite a nota certa e retira a errada de uma vez.</p>
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

      <Modal show={enviando} onHide={() => setEnviando(false)} centered>
        <Form onSubmit={enviarEmail}>
          <Modal.Header closeButton>
            <Modal.Title>Enviar nota por e-mail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted">O e-mail leva o XML da NFS-e{nota.pode_danfse ? " e o DANFSE em PDF, quando o ADN fornecer" : ""}.</p>
            <Form.Label>E-mail de quem vai receber</Form.Label>
            <Form.Control type="email" value={email.data.email} onChange={(e) => email.setData("email", e.target.value)} isInvalid={!!email.errors.email} autoFocus />
            <Form.Control.Feedback type="invalid">{email.errors.email}</Form.Control.Feedback>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={() => setEnviando(false)}>
              Voltar
            </Button>
            <Button type="submit" variant="primary" disabled={email.processing || email.data.email.trim() === ""}>
              {email.processing ? "Enviando..." : "Enviar"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Layout>
  );
};

export default NotaShow;
