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

  const { data, setData, post, processing, errors } = useForm({
    emitente_id: "",
    ambiente: "",
    tomador_documento: "",
    tomador_nome: "",
    tomador_email: "",
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
                      onChange={(e) => {
                        const escolhido = emitentes.find((item) => String(item.id) === e.target.value);
                        setData((atual) => ({ ...atual, emitente_id: e.target.value, ambiente: escolhido?.ambiente ?? "" }));
                      }}
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
                        value={data.ambiente || "homologacao"}
                        onChange={(valor) => setData("ambiente", valor)}
                        error={errors.ambiente}
                      />
                    </Col>
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
