import React from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { Head, Link, useForm } from "@inertiajs/react";
import Layout from "../../../Layouts";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { avisarCamposInvalidos, useFlashAlert } from "../../../common/alerta";
import { nomeDoAmbiente } from "../Lotes/AmbienteField";

const Substituir = (props: any) => {
  const nota = props.nota as { id: number; emitente: string; numero_nfse: string | null; ambiente: string; simulada: boolean };
  const motivos = props.motivos as { codigo: string; rotulo: string }[];

  useFlashAlert();

  const { data, setData, post, processing, errors } = useForm<Record<string, any>>({
    ...(props.dados as Record<string, any>),
    motivo_codigo: "99",
    motivo: "",
  });

  const erro = (campo: string) => (errors as Record<string, string>)[campo];

  const campo = (nome: string, rotulo: string, extra: Record<string, any> = {}) => (
    <>
      <Form.Label>{rotulo}</Form.Label>
      <Form.Control value={data[nome] ?? ""} onChange={(e) => setData(nome, e.target.value)} isInvalid={!!erro(nome)} {...extra} />
      <Form.Control.Feedback type="invalid">{erro(nome)}</Form.Control.Feedback>
    </>
  );

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();

    const resposta = await Swal.fire({
      icon: "question",
      title: "Emitir a nota substituta?",
      text: "A nova nota é enviada ao ADN. A nota anterior só é retirada quando a nova for autorizada.",
      showCancelButton: true,
      confirmButtonText: "Emitir substituta",
      cancelButtonText: "Voltar",
      reverseButtons: true,
    });
    if (!resposta.isConfirmed) return;

    post(route("notas.substituir.store", nota.id), { preserveScroll: true, onError: avisarCamposInvalidos });
  };

  const listaDeErros = ((errors as Record<string, any>).nota ?? []) as string[] | string;

  return (
    <Layout>
      <Head title="Substituir NFS-e" />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Substituir NFS-e" pageTitle="Notas fiscais" />

          <Card>
            <Card.Body>
              <Form onSubmit={enviar}>
                <Alert variant="info" className="fs-14">
                  Você está corrigindo a <strong>NFS-e {nota.numero_nfse ?? `nº ${nota.id}`}</strong> de {nota.emitente} ({nomeDoAmbiente(nota.ambiente)}). Confira e ajuste os dados abaixo; a nova nota
                  usa o mesmo emitente e o mesmo ambiente.
                </Alert>
                {nota.simulada && <Alert variant="warning">Emitente em modo simulador: a substituição também é só de teste.</Alert>}
                {listaDeErros.length > 0 && (
                  <Alert variant="danger">
                    <ul className="mb-0 ps-3">{(Array.isArray(listaDeErros) ? listaDeErros : [listaDeErros]).map((e, i) => <li key={i}>{e}</li>)}</ul>
                  </Alert>
                )}

                <Row className="g-3">
                  <Col md={4}>{campo("tomador_documento", "CPF ou CNPJ do tomador")}</Col>
                  <Col md={5}>{campo("tomador_nome", "Nome ou razão social do tomador")}</Col>
                  <Col md={3}>{campo("tomador_email", "E-mail do tomador", { type: "email" })}</Col>

                  <Col md={3}>{campo("tomador_cep", "CEP")}</Col>
                  <Col md={6}>{campo("tomador_logradouro", "Logradouro")}</Col>
                  <Col md={3}>{campo("tomador_numero", "Número")}</Col>
                  <Col md={4}>{campo("tomador_complemento", "Complemento")}</Col>
                  <Col md={5}>{campo("tomador_bairro", "Bairro")}</Col>
                  <Col md={3}>{campo("tomador_codigo_municipio", "Município (IBGE)")}</Col>

                  <Col md={12}>
                    <Form.Label>Descrição do serviço</Form.Label>
                    <Form.Control as="textarea" rows={3} value={data.descricao_servico} onChange={(e) => setData("descricao_servico", e.target.value)} isInvalid={!!erro("descricao_servico")} />
                    <Form.Control.Feedback type="invalid">{erro("descricao_servico")}</Form.Control.Feedback>
                  </Col>

                  <Col md={3}>{campo("codigo_tributacao_nacional", "Código de tributação nacional", { placeholder: "6 dígitos" })}</Col>
                  <Col md={3}>{campo("valor_servico", "Valor do serviço (R$)", { placeholder: "1.500,00" })}</Col>
                  <Col md={2}>{campo("aliquota_iss", "Alíquota ISS (%)", { placeholder: "2,00" })}</Col>
                  <Col md={2}>{campo("data_competencia", "Competência", { type: "date" })}</Col>
                  <Col md={2} className="d-flex align-items-end">
                    <Form.Check type="switch" id="iss_retido" label="ISS retido" checked={!!data.iss_retido} onChange={(e) => setData("iss_retido", e.target.checked)} />
                  </Col>

                  <Col md={12}>
                    <div className="fw-semibold">IBS e CBS (reforma tributária) — opcional</div>
                    <div className="text-muted small">Os três campos juntos, ou os três em branco.</div>
                  </Col>
                  <Col md={4}>{campo("ibscbs_codigo_operacao", "Indicador de operação (6 dígitos)")}</Col>
                  <Col md={4}>{campo("ibscbs_cst", "CST (3 dígitos)")}</Col>
                  <Col md={4}>{campo("ibscbs_classificacao", "Classificação tributária (6 dígitos)")}</Col>

                  <Col md={12}>
                    <hr />
                    <div className="fw-semibold mb-2">Motivo da substituição</div>
                  </Col>
                  <Col md={4}>
                    <Form.Label>Motivo</Form.Label>
                    <Form.Select value={data.motivo_codigo} onChange={(e) => setData("motivo_codigo", e.target.value)} isInvalid={!!erro("motivo_codigo")}>
                      {motivos.map((m) => (
                        <option key={m.codigo} value={m.codigo}>
                          {m.rotulo}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{erro("motivo_codigo")}</Form.Control.Feedback>
                  </Col>
                  <Col md={8}>
                    <Form.Label>Explique o motivo (mínimo de 15 caracteres)</Form.Label>
                    <Form.Control as="textarea" rows={2} value={data.motivo} onChange={(e) => setData("motivo", e.target.value)} isInvalid={!!erro("motivo")} />
                    <Form.Control.Feedback type="invalid">{erro("motivo")}</Form.Control.Feedback>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Link href={route("notas.show", nota.id)} className="btn btn-light">
                    Cancelar
                  </Link>
                  <Button type="submit" variant="primary" disabled={processing || data.motivo.trim().length < 15}>
                    {processing ? "Emitindo..." : "Emitir nota substituta"}
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

export default Substituir;
