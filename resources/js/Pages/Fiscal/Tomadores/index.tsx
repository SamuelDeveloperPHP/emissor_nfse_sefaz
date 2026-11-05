import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { Head, router, useForm } from "@inertiajs/react";
import Layout from "../../../Layouts";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Can } from "../../../common/usePermission";
import { avisarCamposInvalidos, confirmarExclusao, useFlashAlert } from "../../../common/alerta";

interface TomadorRow {
  id: number;
  emitente_id: number;
  emitente: string;
  documento: string;
  nome: string;
  email: string | null;
  cep: string | null;
  logradouro: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  codigo_municipio: string | null;
}

const vazio = {
  id: null as number | null,
  emitente_id: "",
  documento: "",
  nome: "",
  email: "",
  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  codigo_municipio: "",
};

export const formatarDocumento = (doc: string) =>
  doc.length === 14
    ? doc.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")
    : doc.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");

const TomadoresIndex = (props: any) => {
  const tomadores = props.tomadores as TomadorRow[];
  const emitentes = props.emitentes as { id: number; razao_social: string }[];

  const [aberto, setAberto] = useState(false);
  const [busca, setBusca] = useState("");

  const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm(vazio);

  useFlashAlert();

  const novo = () => {
    reset();
    clearErrors();
    setAberto(true);
  };

  const editar = (t: TomadorRow) => {
    clearErrors();
    setData({
      id: t.id,
      emitente_id: String(t.emitente_id),
      documento: t.documento,
      nome: t.nome,
      email: t.email ?? "",
      cep: t.cep ?? "",
      logradouro: t.logradouro ?? "",
      numero: t.numero ?? "",
      complemento: t.complemento ?? "",
      bairro: t.bairro ?? "",
      codigo_municipio: t.codigo_municipio ?? "",
    });
    setAberto(true);
  };

  const excluirItem = async (t: TomadorRow) => {
    if (!(await confirmarExclusao("Excluir tomador?", `${t.nome} será removido do cadastro. As notas já emitidas não mudam.`))) return;
    router.delete(route("tomadores.destroy", t.id), { preserveScroll: true });
  };

  const salvar = (e: React.FormEvent) => {
    e.preventDefault();
    const opcoes = { onSuccess: () => setAberto(false), onError: avisarCamposInvalidos, preserveScroll: true };
    if (data.id) put(route("tomadores.update", data.id), opcoes);
    else post(route("tomadores.store"), opcoes);
  };

  const filtrados = tomadores.filter((t) => {
    const termo = busca.trim().toLowerCase();
    return termo === "" || t.nome.toLowerCase().includes(termo) || t.documento.includes(termo.replace(/\D/g, "") || "\u0000");
  });

  const campo = (nome: keyof typeof vazio, rotulo: string, extra: Record<string, any> = {}) => (
    <>
      <Form.Label>{rotulo}</Form.Label>
      <Form.Control
        value={(data as any)[nome] ?? ""}
        onChange={(e) => setData(nome as any, e.target.value)}
        isInvalid={!!(errors as any)[nome]}
        {...extra}
      />
      <Form.Control.Feedback type="invalid">{(errors as any)[nome]}</Form.Control.Feedback>
    </>
  );

  return (
    <Layout>
      <Head title="Tomadores" />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Tomadores" pageTitle="Fiscal" />
          <Card>
            <Card.Body>
              <div className="d-flex flex-wrap gap-2 justify-content-between mb-3">
                <Form.Control style={{ maxWidth: 320 }} placeholder="Buscar por nome ou documento" value={busca} onChange={(e) => setBusca(e.target.value)} />
                <Can permission="tomadores.create">
                  <Button variant="primary" onClick={novo}>
                    Novo tomador
                  </Button>
                </Can>
              </div>

              {filtrados.length === 0 ? (
                <p className="text-muted mb-0">
                  {tomadores.length === 0 ? "Nenhum tomador cadastrado. Cadastre os clientes que você fatura com frequência." : "Nenhum tomador encontrado."}
                </p>
              ) : (
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Documento</th>
                      <th>Emitente</th>
                      <th>E-mail</th>
                      <th>Endereço</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtrados.map((t) => (
                      <tr key={t.id}>
                        <td>{t.nome}</td>
                        <td>{formatarDocumento(t.documento)}</td>
                        <td>{t.emitente}</td>
                        <td>{t.email ?? "—"}</td>
                        <td>{t.logradouro ? `${t.logradouro}, ${t.numero} · ${t.bairro}` : "—"}</td>
                        <td className="text-end text-nowrap">
                          <Can permission="tomadores.edit">
                            <Button size="sm" variant="light" className="me-1" onClick={() => editar(t)}>
                              Editar
                            </Button>
                          </Can>
                          <Can permission="tomadores.delete">
                            <Button size="sm" variant="outline-danger" onClick={() => excluirItem(t)}>
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
            <Modal.Title>{data.id ? "Editar tomador" : "Novo tomador"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="g-3">
              <Col md={12}>
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
              <Col md={4}>{campo("documento", "CPF ou CNPJ")}</Col>
              <Col md={8}>{campo("nome", "Nome ou razão social")}</Col>
              <Col md={12}>{campo("email", "E-mail (para enviar a nota)", { type: "email" })}</Col>
              <Col md={12}>
                <div className="text-muted small">O endereço é opcional, mas só vai na nota se estiver completo: CEP, logradouro, número, bairro e código IBGE.</div>
              </Col>
              <Col md={3}>{campo("cep", "CEP")}</Col>
              <Col md={6}>{campo("logradouro", "Logradouro")}</Col>
              <Col md={3}>{campo("numero", "Número")}</Col>
              <Col md={4}>{campo("complemento", "Complemento")}</Col>
              <Col md={5}>{campo("bairro", "Bairro")}</Col>
              <Col md={3}>{campo("codigo_municipio", "Município (IBGE)")}</Col>
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

    </Layout>
  );
};

export default TomadoresIndex;
