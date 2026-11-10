import React, { useEffect, useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { Alert, Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Layout from "../../../Layouts";
import { useFlashAlert } from "../../../common/alerta";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Can } from "../../../common/usePermission";
import { LoteBadge, NotaStatus, PorStatus, moeda } from "./status";
import { AmbienteField, nomeDoAmbiente } from "./AmbienteField";

interface LoteRow {
  id: number;
  arquivo: string;
  status: string;
  total: number;
  emitente: string;
  driver: string;
  created_at: string;
  por_status: Record<NotaStatus, number>;
  ambiente: string | null;
}

interface EmitenteOption {
  id: number;
  razao_social: string;
  cnpj: string;
  ambiente: string;
}

const LotesIndex = (props: any) => {
  const lotes = props.lotes as LoteRow[];
  const emitentes = props.emitentes as EmitenteOption[];
  const permiteAmbiente = !!props.permite_escolher_ambiente;

  const { data, setData, post, processing, errors, reset } = useForm({
    emitente_id: "",
    ambiente: "homologacao",
    arquivo: null as File | null,
  });

  useFlashAlert();

  const temProcessando = lotes.some((lote) => lote.status === "processando");
  useEffect(() => {
    if (!temProcessando) return;
    const timer = setInterval(() => router.reload({ only: ["lotes"] }), 3000);
    return () => clearInterval(timer);
  }, [temProcessando]);

  type Previa = {
    total: number;
    validas: number;
    invalidas: number;
    valor_total: number;
    problemas: { linha: number; tomador: string | null; valor: number | null; erros: string[] }[];
    duplicadas: { linha: number; igual_a: number; tomador: string }[];
    truncado: boolean;
  };
  const [previa, setPrevia] = useState<Previa | null>(null);
  const [erroPrevia, setErroPrevia] = useState<string | null>(null);
  const [conferindo, setConferindo] = useState(false);
  const [erroArquivo, setErroArquivo] = useState<string | null>(null);

  const selecionarArquivo = (arquivos: File[]) => {
    const arquivo = arquivos[0] ?? null;
    setData("arquivo", arquivo);
    setErroArquivo(null);
  };

  const formatarTamanho = (bytes: number) => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  // Dry run: tells what the file would produce before anything is created.
  const conferir = async () => {
    if (!data.arquivo || !data.emitente_id) return;
    setConferindo(true);
    setErroPrevia(null);
    setPrevia(null);

    const form = new FormData();
    form.append("emitente_id", data.emitente_id);
    form.append("arquivo", data.arquivo);

    try {
      const resposta = await axios.post(route("lotes.previa"), form);
      setPrevia(resposta.data);
    } catch (erro: any) {
      const mensagens = erro?.response?.data?.errors;
      setErroPrevia(mensagens ? (Object.values(mensagens).flat() as string[]).join(" ") : "Não foi possível conferir o arquivo.");
    } finally {
      setConferindo(false);
    }
  };

  // A different file or emitente invalidates the last check.
  useEffect(() => {
    setPrevia(null);
    setErroPrevia(null);
  }, [data.arquivo, data.emitente_id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("lotes.store"), { forceFormData: true, onSuccess: () => reset("arquivo") });
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
                <h5 className="card-title mb-0">
                  Novo lote
                  {!permiteAmbiente && <span className="text-muted fs-14 fw-normal"> · Ambiente: Homologação (teste, sem valor fiscal)</span>}
                </h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row className="g-3 align-items-start">
                    <Col md={permiteAmbiente ? 3 : 5}>
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
                    {permiteAmbiente && (
                      <Col md={2}>
                        <AmbienteField
                          value={data.ambiente}
                          onChange={(valor) => setData("ambiente", valor)}
                          error={errors.ambiente}
                        />
                      </Col>
                    )}
                    <Col md={5}>
                      <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
                        <Form.Label className="mb-0">Arquivo Excel ou CSV</Form.Label>
                        <a href={route("lotes.modelo", { formato: "xlsx" })} className="btn btn-sm btn-outline-secondary">
                          <i className="ri-file-excel-2-line me-1" aria-hidden="true"></i>
                          Baixar modelo Excel
                        </a>
                      </div>
                      <Dropzone
                        accept={{
                          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
                          "text/csv": [".csv"],
                          "text/plain": [".txt"],
                        }}
                        maxFiles={1}
                        multiple={false}
                        onDropAccepted={selecionarArquivo}
                        onDropRejected={() => setErroArquivo("Selecione um arquivo Excel (.xlsx) ou CSV válido.")}
                      >
                        {({ getRootProps, getInputProps, isDragActive }) => (
                          <div
                            {...getRootProps()}
                            className={`rounded-2 px-3 py-3 text-center ${isDragActive ? "bg-primary-subtle" : "bg-light"}`}
                            style={{
                              border: `2px dashed ${isDragActive ? "var(--vz-primary)" : "var(--vz-border-color)"}`,
                              cursor: "pointer",
                              minHeight: 92,
                            }}
                          >
                            <input {...getInputProps()} />
                            {data.arquivo ? (
                              <div className="d-flex align-items-center justify-content-center gap-2 text-start">
                                <i className="ri-file-check-line fs-24 text-success" aria-hidden="true"></i>
                                <div>
                                  <div className="fw-semibold text-body">{data.arquivo.name}</div>
                                  <small className="text-muted">{formatarTamanho(data.arquivo.size)} · Clique ou arraste outro arquivo para substituir</small>
                                </div>
                              </div>
                            ) : (
                              <>
                                <i className="ri-upload-cloud-2-line fs-24 text-primary" aria-hidden="true"></i>
                                <div className="fw-semibold text-body">
                                  {isDragActive ? "Solte o arquivo aqui" : "Arraste o arquivo aqui ou clique para selecionar"}
                                </div>
                                <small className="text-muted">Excel (.xlsx) ou CSV · uma nota por linha</small>
                              </>
                            )}
                          </div>
                        )}
                      </Dropzone>
                      {(errors.arquivo || erroArquivo) && <div className="invalid-feedback d-block">{errors.arquivo || erroArquivo}</div>}
                      <div className="mt-1">
                        <a href={route("lotes.modelo")} className="text-muted small">Baixar modelo em CSV</a>
                      </div>
                    </Col>
                    <Col md={2} className="d-flex align-items-end gap-2" style={{ minHeight: 62 }}>
                      <Button type="button" variant="outline-primary" onClick={conferir} disabled={conferindo || !data.emitente_id || !data.arquivo}>
                        {conferindo ? "Conferindo..." : "Conferir"}
                      </Button>
                      <Button type="submit" variant="primary" disabled={processing || !data.emitente_id || !data.arquivo}>
                        {processing ? "Enviando..." : "Enviar"}
                      </Button>
                    </Col>
                  </Row>

                  {erroPrevia && (
                    <Alert variant="danger" className="mt-3 mb-0">
                      {erroPrevia}
                    </Alert>
                  )}

                  {previa && (
                    <div className="mt-3">
                      <Alert variant={previa.invalidas === 0 ? "success" : "warning"}>
                        <strong>{previa.validas}</strong> de {previa.total} {previa.total === 1 ? "linha está" : "linhas estão"} pronta{previa.validas === 1 ? "" : "s"} para emitir
                        {previa.validas > 0 && <> (total de {moeda(previa.valor_total)})</>}.
                        {previa.invalidas > 0 && (
                          <>
                            {" "}
                            <strong>{previa.invalidas}</strong> {previa.invalidas === 1 ? "linha tem problema e será rejeitada" : "linhas têm problema e serão rejeitadas"}; corrija o arquivo e confira de novo, ou envie assim mesmo.
                          </>
                        )}
                      </Alert>
                      {previa.duplicadas.length > 0 && (
                        <Alert variant="warning">
                          <strong>{previa.duplicadas.length}</strong> {previa.duplicadas.length === 1 ? "linha repete" : "linhas repetem"} outra (mesmo tomador, serviço, valor e data) e emitiriam nota em duplicidade:{" "}
                          {previa.duplicadas
                            .slice(0, 10)
                            .map((d) => `${d.linha} (igual à ${d.igual_a})`)
                            .join(", ")}
                          {previa.duplicadas.length > 10 && "…"}
                        </Alert>
                      )}
                      {previa.problemas.length > 0 && (
                        <Table size="sm" responsive>
                          <thead>
                            <tr>
                              <th>Linha</th>
                              <th>Tomador</th>
                              <th>O que corrigir</th>
                            </tr>
                          </thead>
                          <tbody>
                            {previa.problemas.map((problema) => (
                              <tr key={problema.linha}>
                                <td>{problema.linha}</td>
                                <td>{problema.tomador ?? "—"}</td>
                                <td>
                                  <ul className="mb-0 ps-3">
                                    {problema.erros.map((erro, indice) => (
                                      <li key={indice}>{erro}</li>
                                    ))}
                                  </ul>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      )}
                      {previa.truncado && <p className="text-muted small mb-0">Mostrando as primeiras {previa.problemas.length} linhas com problema.</p>}
                    </div>
                  )}
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
                      <th>Ambiente</th>
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
                        <td>{nomeDoAmbiente(lote.ambiente)}</td>
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
    </Layout>
  );
};

export default LotesIndex;
