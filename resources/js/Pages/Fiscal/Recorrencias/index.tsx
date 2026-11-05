import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../../Layouts";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Can } from "../../../common/usePermission";
import { moeda } from "../Lotes/status";
import { AmbienteField, nomeDoAmbiente } from "../Lotes/AmbienteField";

interface RecorrenciaRow {
  id: number;
  emitente_id: number;
  emitente: string;
  tomador_id: number;
  tomador: string;
  servico_id: number;
  servico: string;
  valor: string;
  dia_do_mes: number;
  ambiente: string;
  ativa: boolean;
  proxima_emissao: string;
  ultima_emissao_em: string | null;
  ultimo_lote_id: number | null;
  ultimo_erro: string | null;
}

const vazio = {
  id: null as number | null,
  emitente_id: "",
  tomador_id: "",
  servico_id: "",
  valor: "",
  dia_do_mes: "5",
  ambiente: "homologacao",
  ativa: true,
};

const RecorrenciasIndex = (props: any) => {
  const recorrencias = props.recorrencias as RecorrenciaRow[];
  const emitentes = props.emitentes as { id: number; razao_social: string }[];
  const tomadores = props.tomadores as { id: number; emitente_id: number; nome: string }[];
  const servicos = props.servicos as { id: number; emitente_id: number; nome: string }[];
  const permiteAmbiente = !!props.permite_escolher_ambiente;
  const { flash }: any = usePage().props;

  const [aberto, setAberto] = useState(false);
  const [excluir, setExcluir] = useState<RecorrenciaRow | null>(null);

  const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm(vazio);

  useEffect(() => {
    if (flash?.success) toast.success(flash.success, { autoClose: 3000 });
    if (flash?.error) toast.error(flash.error, { autoClose: 4000 });
  }, [flash]);

  const tomadoresDoEmitente = tomadores.filter((t) => String(t.emitente_id) === data.emitente_id);
  const servicosDoEmitente = servicos.filter((s) => String(s.emitente_id) === data.emitente_id);

  const nova = () => {
    reset();
    clearErrors();
    setAberto(true);
  };

  const editar = (r: RecorrenciaRow) => {
    clearErrors();
    setData({
      id: r.id,
      emitente_id: String(r.emitente_id),
      tomador_id: String(r.tomador_id),
      servico_id: String(r.servico_id),
      valor: String(r.valor).replace(".", ","),
      dia_do_mes: String(r.dia_do_mes),
      ambiente: r.ambiente,
      ativa: r.ativa,
    });
    setAberto(true);
  };

  const salvar = (e: React.FormEvent) => {
    e.preventDefault();
    const opcoes = { onSuccess: () => setAberto(false) };
    if (data.id) put(route("recorrencias.update", data.id), opcoes);
    else post(route("recorrencias.store"), opcoes);
  };

  return (
    <Layout>
      <Head title="Notas recorrentes" />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Notas recorrentes" pageTitle="Fiscal" />
          <Card>
            <Card.Body>
              <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center mb-3">
                <p className="text-muted mb-0" style={{ maxWidth: 620 }}>
                  Mensalidades e honorários fixos. A nota é emitida sozinha todo mês, no dia escolhido, às 6h. Se o sistema ficar parado, a nota daquele mês não é emitida depois.
                </p>
                <Can permission="recorrencias.create">
                  <Button variant="primary" onClick={nova}>
                    Nova nota recorrente
                  </Button>
                </Can>
              </div>

              {recorrencias.length === 0 ? (
                <p className="text-muted mb-0">Nenhuma nota recorrente. Cadastre antes o tomador e o serviço, depois crie a recorrência aqui.</p>
              ) : (
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>Tomador</th>
                      <th>Serviço</th>
                      <th>Emitente</th>
                      <th className="text-end">Valor</th>
                      <th>Dia</th>
                      <th>Próxima emissão</th>
                      <th>Última</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recorrencias.map((r) => (
                      <tr key={r.id}>
                        <td>
                          {r.tomador}
                          {!r.ativa && (
                            <Badge bg="secondary" className="ms-2">
                              Pausada
                            </Badge>
                          )}
                        </td>
                        <td>{r.servico}</td>
                        <td>
                          {r.emitente}
                          {permiteAmbiente && <div className="text-muted small">{nomeDoAmbiente(r.ambiente)}</div>}
                        </td>
                        <td className="text-end">{moeda(r.valor)}</td>
                        <td>{r.dia_do_mes}</td>
                        <td>{r.ativa ? r.proxima_emissao : "—"}</td>
                        <td>
                          {r.ultima_emissao_em ? (
                            <>
                              {r.ultima_emissao_em}
                              {r.ultimo_lote_id && (
                                <div>
                                  <Link href={route("lotes.show", r.ultimo_lote_id)}>ver lote</Link>
                                </div>
                              )}
                            </>
                          ) : (
                            "—"
                          )}
                          {r.ultimo_erro && <div className="text-danger small">{r.ultimo_erro}</div>}
                        </td>
                        <td className="text-end text-nowrap">
                          <Can permission="recorrencias.edit">
                            <Button size="sm" variant="light" className="me-1" onClick={() => editar(r)}>
                              Editar
                            </Button>
                          </Can>
                          <Can permission="recorrencias.delete">
                            <Button size="sm" variant="outline-danger" onClick={() => setExcluir(r)}>
                              Excluir
                            </Button>
                          </Can>
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

      <Modal show={aberto} onHide={() => setAberto(false)} size="lg" centered>
        <Form onSubmit={salvar}>
          <Modal.Header closeButton>
            <Modal.Title>{data.id ? "Editar nota recorrente" : "Nova nota recorrente"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="g-3">
              <Col md={12}>
                <Form.Label>Emitente</Form.Label>
                <Form.Select
                  value={data.emitente_id}
                  onChange={(e) => setData((atual) => ({ ...atual, emitente_id: e.target.value, tomador_id: "", servico_id: "" }))}
                  isInvalid={!!errors.emitente_id}
                >
                  <option value="">Selecione o emitente</option>
                  {emitentes.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.razao_social}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.emitente_id}</Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>Tomador</Form.Label>
                <Form.Select value={data.tomador_id} onChange={(e) => setData("tomador_id", e.target.value)} isInvalid={!!errors.tomador_id} disabled={!data.emitente_id}>
                  <option value="">{data.emitente_id && tomadoresDoEmitente.length === 0 ? "Nenhum tomador neste emitente" : "Selecione o tomador"}</option>
                  {tomadoresDoEmitente.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nome}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.tomador_id}</Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>Serviço</Form.Label>
                <Form.Select value={data.servico_id} onChange={(e) => setData("servico_id", e.target.value)} isInvalid={!!errors.servico_id} disabled={!data.emitente_id}>
                  <option value="">{data.emitente_id && servicosDoEmitente.length === 0 ? "Nenhum serviço neste emitente" : "Selecione o serviço"}</option>
                  {servicosDoEmitente.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nome}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.servico_id}</Form.Control.Feedback>
              </Col>
              <Col md={4}>
                <Form.Label>Valor (R$)</Form.Label>
                <Form.Control value={data.valor} onChange={(e) => setData("valor", e.target.value)} isInvalid={!!errors.valor} placeholder="1.500,00" />
                <Form.Control.Feedback type="invalid">{errors.valor}</Form.Control.Feedback>
              </Col>
              <Col md={4}>
                <Form.Label>Dia do mês (1 a 28)</Form.Label>
                <Form.Control type="number" min={1} max={28} value={data.dia_do_mes} onChange={(e) => setData("dia_do_mes", e.target.value)} isInvalid={!!errors.dia_do_mes} />
                <Form.Control.Feedback type="invalid">{errors.dia_do_mes}</Form.Control.Feedback>
              </Col>
              {permiteAmbiente && (
                <Col md={4}>
                  <AmbienteField value={data.ambiente} onChange={(valor) => setData("ambiente", valor)} error={errors.ambiente} />
                </Col>
              )}
              <Col md={12}>
                <Form.Check type="switch" id="recorrencia_ativa" label="Ativa (desmarque para pausar)" checked={data.ativa} onChange={(e) => setData("ativa", e.target.checked)} />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={() => setAberto(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={processing}>
              {processing ? "Salvando..." : "Salvar"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={!!excluir} onHide={() => setExcluir(null)} centered>
        <Modal.Body className="py-4 px-4">
          <h5>Excluir nota recorrente?</h5>
          <p className="text-muted mb-0">
            Deixa de emitir {excluir?.servico} para {excluir?.tomador}. As notas já emitidas não mudam.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setExcluir(null)}>
            Voltar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (excluir) router.delete(route("recorrencias.destroy", excluir.id), { preserveScroll: true });
              setExcluir(null);
            }}
          >
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer closeButton={false} limit={1} />
    </Layout>
  );
};

export default RecorrenciasIndex;
