import React from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Head, Link, useForm } from "@inertiajs/react";
import Layout from "../../../Layouts";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { AmbienteField } from "./AmbienteField";

interface EmitenteOption {
  id: number;
  razao_social: string;
  cnpj: string;
  driver: string;
  ambiente: string;
}

const hoje = () => new Date().toISOString().slice(0, 10);

const Emitir = (props: any) => {
  const emitentes = props.emitentes as EmitenteOption[];
  const permiteAmbiente = !!props.permite_escolher_ambiente;
  const tomadores = (props.tomadores ?? []) as any[];
  const servicos = (props.servicos ?? []) as any[];

  const { data, setData, post, processing, errors } = useForm({
    emitente_id: "",
    ambiente: "homologacao",
    tomador_documento: "",
    tomador_nome: "",
    tomador_email: "",
    tomador_cep: "",
    tomador_logradouro: "",
    tomador_numero: "",
    tomador_complemento: "",
    tomador_bairro: "",
    tomador_codigo_municipio: "",
    descricao_servico: "",
    codigo_tributacao_nacional: "",
    valor_servico: "",
    aliquota_iss: "",
    iss_retido: false,
    data_competencia: hoje(),
  });

  const emitente = emitentes.find((e) => String(e.id) === data.emitente_id);
  const errosDaNota = ((errors as Record<string, any>).nota ?? []) as string[] | string;
  const listaDeErros = Array.isArray(errosDaNota) ? errosDaNota : [errosDaNota];

  // Picking a registered tomador or service fills the matching fields; they stay editable.
  const escolherTomador = (id: string) => {
    const t = tomadores.find((item) => String(item.id) === id);
    if (!t) return;
    setData((atual) => ({
      ...atual,
      tomador_documento: t.documento,
      tomador_nome: t.nome,
      tomador_email: t.email ?? "",
      tomador_cep: t.cep ?? "",
      tomador_logradouro: t.logradouro ?? "",
      tomador_numero: t.numero ?? "",
      tomador_complemento: t.complemento ?? "",
      tomador_bairro: t.bairro ?? "",
      tomador_codigo_municipio: t.codigo_municipio ?? "",
    }));
  };

  const escolherServico = (id: string) => {
    const s = servicos.find((item) => String(item.id) === id);
    if (!s) return;
    setData((atual) => ({
      ...atual,
      descricao_servico: s.descricao,
      codigo_tributacao_nacional: s.codigo_tributacao,
      aliquota_iss: s.aliquota !== null ? String(s.aliquota).replace(".", ",") : "",
      iss_retido: !!s.iss_retido,
    }));
  };

  const tomadoresDoEmitente = tomadores.filter((t) => String(t.emitente_id) === data.emitente_id);
  const servicosDoEmitente = servicos.filter((s) => String(s.emitente_id) === data.emitente_id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("lotes.emitir.store"));
  };

  return (
    <Layout>
      <Head title="Emitir NFS-e" />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Emitir NFS-e" pageTitle="Fiscal" />

          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {!permiteAmbiente && (
                  <Alert variant="info" className="fs-14">
                    Ambiente: <strong>Homologação</strong> (teste, sem valor fiscal).
                  </Alert>
                )}
                {errosDaNota.length > 0 && (
                  <Alert variant="danger">
                    <ul className="mb-0 ps-3">
                      {listaDeErros.map((erro, index) => (
                        <li key={index}>{erro}</li>
                      ))}
                    </ul>
                  </Alert>
                )}

                <Row className="g-3">
                  <Col md={permiteAmbiente ? 8 : 12}>
                    <Form.Label>Emitente</Form.Label>
                    <Form.Select
                      value={data.emitente_id}
                      onChange={(e) => setData("emitente_id", e.target.value)}
                      isInvalid={!!errors.emitente_id}
                    >
                      <option value="">Selecione o emitente</option>
                      {emitentes.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.razao_social}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errors.emitente_id}</Form.Control.Feedback>
                    {emitente?.driver === "simulador" && (
                      <Form.Text className="text-muted">
                        Este emitente usa o simulador local: a nota não será emitida de verdade.
                      </Form.Text>
                    )}
                  </Col>
                  {permiteAmbiente && (
                    <Col md={4}>
                      <AmbienteField
                        value={data.ambiente}
                        onChange={(valor) => setData("ambiente", valor)}
                        error={errors.ambiente}
                      />
                    </Col>
                  )}

                  {data.emitente_id && (tomadoresDoEmitente.length > 0 || servicosDoEmitente.length > 0) && (
                    <>
                      <Col md={6}>
                        <Form.Label>Tomador cadastrado</Form.Label>
                        <Form.Select key={"t" + data.emitente_id} defaultValue="" onChange={(e) => escolherTomador(e.target.value)} disabled={tomadoresDoEmitente.length === 0}>
                          <option value="">{tomadoresDoEmitente.length === 0 ? "Nenhum tomador cadastrado" : "Escolher e preencher os dados"}</option>
                          {tomadoresDoEmitente.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.nome}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={6}>
                        <Form.Label>Serviço cadastrado</Form.Label>
                        <Form.Select key={"s" + data.emitente_id} defaultValue="" onChange={(e) => escolherServico(e.target.value)} disabled={servicosDoEmitente.length === 0}>
                          <option value="">{servicosDoEmitente.length === 0 ? "Nenhum serviço cadastrado" : "Escolher e preencher os dados"}</option>
                          {servicosDoEmitente.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.nome}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </>
                  )}

                  <Col md={4}>
                    <Form.Label>CPF ou CNPJ do tomador</Form.Label>
                    <Form.Control
                      value={data.tomador_documento}
                      onChange={(e) => setData("tomador_documento", e.target.value)}
                      isInvalid={!!errors.tomador_documento}
                    />
                    <Form.Control.Feedback type="invalid">{errors.tomador_documento}</Form.Control.Feedback>
                  </Col>
                  <Col md={5}>
                    <Form.Label>Nome ou razão social do tomador</Form.Label>
                    <Form.Control
                      value={data.tomador_nome}
                      onChange={(e) => setData("tomador_nome", e.target.value)}
                      isInvalid={!!errors.tomador_nome}
                    />
                    <Form.Control.Feedback type="invalid">{errors.tomador_nome}</Form.Control.Feedback>
                  </Col>
                  <Col md={3}>
                    <Form.Label>E-mail do tomador</Form.Label>
                    <Form.Control
                      type="email"
                      value={data.tomador_email}
                      onChange={(e) => setData("tomador_email", e.target.value)}
                      isInvalid={!!errors.tomador_email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.tomador_email}</Form.Control.Feedback>
                  </Col>

                  <Col md={12}>
                    <Form.Label>Descrição do serviço</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={data.descricao_servico}
                      onChange={(e) => setData("descricao_servico", e.target.value)}
                      isInvalid={!!errors.descricao_servico}
                    />
                    <Form.Control.Feedback type="invalid">{errors.descricao_servico}</Form.Control.Feedback>
                  </Col>

                  <Col md={3}>
                    <Form.Label>Código de tributação nacional</Form.Label>
                    <Form.Control
                      value={data.codigo_tributacao_nacional}
                      onChange={(e) => setData("codigo_tributacao_nacional", e.target.value)}
                      placeholder="6 dígitos"
                      isInvalid={!!errors.codigo_tributacao_nacional}
                    />
                    <Form.Control.Feedback type="invalid">{errors.codigo_tributacao_nacional}</Form.Control.Feedback>
                  </Col>
                  <Col md={3}>
                    <Form.Label>Valor do serviço (R$)</Form.Label>
                    <Form.Control
                      value={data.valor_servico}
                      onChange={(e) => setData("valor_servico", e.target.value)}
                      placeholder="1.500,00"
                      isInvalid={!!errors.valor_servico}
                    />
                    <Form.Control.Feedback type="invalid">{errors.valor_servico}</Form.Control.Feedback>
                  </Col>
                  <Col md={2}>
                    <Form.Label>Alíquota ISS (%)</Form.Label>
                    <Form.Control
                      value={data.aliquota_iss}
                      onChange={(e) => setData("aliquota_iss", e.target.value)}
                      placeholder="2,00"
                      isInvalid={!!errors.aliquota_iss}
                    />
                    <Form.Control.Feedback type="invalid">{errors.aliquota_iss}</Form.Control.Feedback>
                  </Col>
                  <Col md={2}>
                    <Form.Label>Competência</Form.Label>
                    <Form.Control
                      type="date"
                      value={data.data_competencia}
                      onChange={(e) => setData("data_competencia", e.target.value)}
                      isInvalid={!!errors.data_competencia}
                    />
                    <Form.Control.Feedback type="invalid">{errors.data_competencia}</Form.Control.Feedback>
                  </Col>
                  <Col md={2} className="d-flex align-items-end">
                    <Form.Check
                      type="switch"
                      id="iss_retido"
                      label="ISS retido pelo tomador"
                      checked={data.iss_retido}
                      onChange={(e) => setData("iss_retido", e.target.checked)}
                    />
                  </Col>
                </Row>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Link href={route("lotes.index")} className="btn btn-light">
                    Cancelar
                  </Link>
                  <Button type="submit" variant="primary" disabled={processing || !data.emitente_id}>
                    {processing ? "Emitindo..." : "Emitir nota"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </Layout>
  );
};

export default Emitir;
