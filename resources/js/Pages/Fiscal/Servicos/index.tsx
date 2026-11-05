import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../../Layouts";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Can } from "../../../common/usePermission";

interface ServicoRow {
  id: number;
  emitente_id: number;
  emitente: string;
  nome: string;
  descricao: string;
  codigo_tributacao: string;
  aliquota: string | null;
  iss_retido: boolean;
  ibscbs_codigo_operacao: string | null;
  ibscbs_cst: string | null;
  ibscbs_classificacao: string | null;
}

const vazio = {
  id: null as number | null,
  emitente_id: "",
  nome: "",
  descricao: "",
  codigo_tributacao: "",
  aliquota: "",
  iss_retido: false,
  ibscbs_codigo_operacao: "",
  ibscbs_cst: "",
  ibscbs_classificacao: "",
};

const ServicosIndex = (props: any) => {
  const servicos = props.servicos as ServicoRow[];
  const emitentes = props.emitentes as { id: number; razao_social: string }[];
  const { flash }: any = usePage().props;

  const [aberto, setAberto] = useState(false);
  const [excluir, setExcluir] = useState<ServicoRow | null>(null);

  const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm(vazio);

  useEffect(() => {
    if (flash?.success) toast.success(flash.success, { autoClose: 3000 });
    if (flash?.error) toast.error(flash.error, { autoClose: 4000 });
  }, [flash]);

  const novo = () => {
    reset();
    clearErrors();
    setAberto(true);
  };

  const editar = (s: ServicoRow) => {
    clearErrors();
    setData({
      id: s.id,
      emitente_id: String(s.emitente_id),
      nome: s.nome,
      descricao: s.descricao,
      codigo_tributacao: s.codigo_tributacao,
      aliquota: s.aliquota ?? "",
      iss_retido: s.iss_retido,
      ibscbs_codigo_operacao: s.ibscbs_codigo_operacao ?? "",
      ibscbs_cst: s.ibscbs_cst ?? "",
      ibscbs_classificacao: s.ibscbs_classificacao ?? "",
    });
    setAberto(true);
  };

  const salvar = (e: React.FormEvent) => {
    e.preventDefault();
    const opcoes = { onSuccess: () => setAberto(false) };
    if (data.id) put(route("servicos.update", data.id), opcoes);
    else post(route("servicos.store"), opcoes);
  };

  return (
    <Layout>
      <Head title="Serviços" />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Serviços" pageTitle="Fiscal" />
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-end mb-3">
                <Can permission="servicos.create">
                  <Button variant="primary" onClick={novo}>
                    Novo serviço
                  </Button>
                </Can>
              </div>

              {servicos.length === 0 ? (
                <p className="text-muted mb-0">Nenhum serviço cadastrado. Cadastre os serviços que você emite com frequência para escolher na hora de emitir.</p>
              ) : (
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Emitente</th>
                      <th>Código</th>
                      <th className="text-end">ISS</th>
                      <th>Descrição</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicos.map((s) => (
                      <tr key={s.id}>
                        <td>{s.nome}</td>
                        <td>{s.emitente}</td>
                        <td>{s.codigo_tributacao}</td>
                        <td className="text-end">
                          {s.aliquota !== null ? `${String(s.aliquota).replace(".", ",")}%` : "—"}
                          {s.iss_retido && <div className="text-muted small">retido</div>}
                        </td>
                        <td style={{ maxWidth: 320 }} className="text-truncate">
                          {s.descricao}
                        </td>
                        <td className="text-end text-nowrap">
                          <Can permission="servicos.edit">
                            <Button size="sm" variant="light" className="me-1" onClick={() => editar(s)}>
                              Editar
                            </Button>
                          </Can>
                          <Can permission="servicos.delete">
                            <Button size="sm" variant="outline-danger" onClick={() => setExcluir(s)}>
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
            <Modal.Title>{data.id ? "Editar serviço" : "Novo serviço"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label>Emitente</Form.Label>
                <Form.Select value={data.emitente_id} onChange={(e) => setData("emitente_id", e.target.value)} isInvalid={!!errors.emitente_id}>
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
                <Form.Label>Nome na lista</Form.Label>
                <Form.Control value={data.nome} onChange={(e) => setData("nome", e.target.value)} isInvalid={!!errors.nome} placeholder="Ex.: Honorários contábeis" />
                <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
              </Col>
              <Col md={12}>
                <Form.Label>Descrição que vai na nota</Form.Label>
                <Form.Control as="textarea" rows={3} value={data.descricao} onChange={(e) => setData("descricao", e.target.value)} isInvalid={!!errors.descricao} />
                <Form.Control.Feedback type="invalid">{errors.descricao}</Form.Control.Feedback>
              </Col>
              <Col md={4}>
                <Form.Label>Código de tributação nacional</Form.Label>
                <Form.Control value={data.codigo_tributacao} onChange={(e) => setData("codigo_tributacao", e.target.value)} isInvalid={!!errors.codigo_tributacao} placeholder="6 dígitos" />
                <Form.Control.Feedback type="invalid">{errors.codigo_tributacao}</Form.Control.Feedback>
              </Col>
              <Col md={4}>
                <Form.Label>Alíquota do ISS (%)</Form.Label>
                <Form.Control value={data.aliquota} onChange={(e) => setData("aliquota", e.target.value)} isInvalid={!!errors.aliquota} placeholder="2,00" />
                <Form.Control.Feedback type="invalid">{errors.aliquota}</Form.Control.Feedback>
              </Col>
              <Col md={4} className="d-flex align-items-end">
                <Form.Check type="switch" id="servico_retido" label="ISS retido pelo tomador" checked={data.iss_retido} onChange={(e) => setData("iss_retido", e.target.checked)} />
              </Col>
              <Col md={12}>
                <div className="fw-semibold">IBS e CBS (reforma tributária)</div>
                <div className="text-muted small">
                  Opcional. Use os códigos das tabelas oficiais do Sistema Nacional NFS-e. A nota só leva o grupo IBS/CBS se os três campos estiverem preenchidos; o sistema confere o formato, e quem valida o conteúdo é o ADN.
                </div>
              </Col>
              <Col md={4}>
                <Form.Label>Indicador de operação (6 dígitos)</Form.Label>
                <Form.Control value={data.ibscbs_codigo_operacao} onChange={(e) => setData("ibscbs_codigo_operacao", e.target.value)} isInvalid={!!errors.ibscbs_codigo_operacao} />
                <Form.Control.Feedback type="invalid">{errors.ibscbs_codigo_operacao}</Form.Control.Feedback>
              </Col>
              <Col md={4}>
                <Form.Label>CST (3 dígitos)</Form.Label>
                <Form.Control value={data.ibscbs_cst} onChange={(e) => setData("ibscbs_cst", e.target.value)} isInvalid={!!errors.ibscbs_cst} />
                <Form.Control.Feedback type="invalid">{errors.ibscbs_cst}</Form.Control.Feedback>
              </Col>
              <Col md={4}>
                <Form.Label>Classificação tributária (6 dígitos)</Form.Label>
                <Form.Control value={data.ibscbs_classificacao} onChange={(e) => setData("ibscbs_classificacao", e.target.value)} isInvalid={!!errors.ibscbs_classificacao} />
                <Form.Control.Feedback type="invalid">{errors.ibscbs_classificacao}</Form.Control.Feedback>
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
          <h5>Excluir serviço?</h5>
          <p className="text-muted mb-0">{excluir?.nome} será removido da lista. As notas já emitidas não mudam.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setExcluir(null)}>
            Voltar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (excluir) router.delete(route("servicos.destroy", excluir.id), { preserveScroll: true });
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

export default ServicosIndex;
