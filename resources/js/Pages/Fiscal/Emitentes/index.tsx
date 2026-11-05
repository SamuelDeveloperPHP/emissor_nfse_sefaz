import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Layout from "../../../Layouts";
import { avisarCamposInvalidos, confirmarExclusao, useFlashAlert } from "../../../common/alerta";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Can } from "../../../common/usePermission";

interface EmitenteRow {
  id: number;
  razao_social: string;
  nome_fantasia: string | null;
  cnpj: string;
  inscricao_municipal: string | null;
  codigo_municipio: string | null;
  municipio: string | null;
  uf: string | null;
  cep: string | null;
  logradouro: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  email: string | null;
  telefone: string | null;
  regime_tributario: string | null;
  ambiente: string;
  driver: string;
  certificado_validade: string | null;
  certificado_proximo_do_vencimento: boolean;
  tem_certificado: boolean;
  rps_serie: string | null;
  rps_numero_atual: number;
  is_active: boolean;
}

const emptyForm = {
  id: null as number | null,
  razao_social: "",
  nome_fantasia: "",
  cnpj: "",
  inscricao_municipal: "",
  codigo_municipio: "",
  municipio: "",
  uf: "",
  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  email: "",
  telefone: "",
  regime_tributario: "",
  ambiente: "homologacao",
  driver: "adn_nacional",
  rps_serie: "",
  rps_numero_atual: 0,
  is_active: true,
};

const formatCnpj = (cnpj: string) =>
  cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");

const EmitentesIndex = (props: any) => {
  const emitentes = props.emitentes as EmitenteRow[];

  const [showModal, setShowModal] = useState(false);

  const { data, setData, post, put, processing, errors, reset, transform } = useForm(emptyForm);

  useFlashAlert();

  const openCreate = () => {
    reset();
    setShowModal(true);
  };

  const openEdit = (emitente: EmitenteRow) => {
    setData({
      id: emitente.id,
      razao_social: emitente.razao_social,
      nome_fantasia: emitente.nome_fantasia ?? "",
      cnpj: emitente.cnpj,
      inscricao_municipal: emitente.inscricao_municipal ?? "",
      codigo_municipio: emitente.codigo_municipio ?? "",
      municipio: emitente.municipio ?? "",
      uf: emitente.uf ?? "",
      cep: emitente.cep ?? "",
      logradouro: emitente.logradouro ?? "",
      numero: emitente.numero ?? "",
      complemento: emitente.complemento ?? "",
      bairro: emitente.bairro ?? "",
      email: emitente.email ?? "",
      telefone: emitente.telefone ?? "",
      regime_tributario: emitente.regime_tributario ?? "",
      ambiente: emitente.ambiente,
      driver: emitente.driver,
      rps_serie: emitente.rps_serie ?? "",
      rps_numero_atual: emitente.rps_numero_atual,
      is_active: emitente.is_active,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const options = { onSuccess: () => setShowModal(false), onError: avisarCamposInvalidos, preserveScroll: true };

    if (data.id) {
      put(route("emitentes.update", data.id), options);
    } else {
      post(route("emitentes.store"), options);
    }
  };

  const confirmDelete = async (emitente: EmitenteRow) => {
    const ok = await confirmarExclusao("Excluir emitente?", `${emitente.razao_social} será removido, com o certificado digital guardado. Não é possível excluir quem já tem notas.`);
    if (ok) router.delete(route("emitentes.destroy", emitente.id), { preserveScroll: true });
  };

  return (
    <Layout>
      <Head title="Emitentes" />
      <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Emitentes" pageTitle="Fiscal" />
        <Row>
          <Col lg={12}>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-end mb-3">
                  <Can permission="emitentes.create">
                    <Button variant="primary" onClick={openCreate}>
                      <i className="ri-add-line align-bottom me-1"></i> Novo emitente
                    </Button>
                  </Can>
                </div>
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>Razão social</th>
                      <th>CNPJ</th>
                      <th>Município/UF</th>
                      <th>Ambiente</th>
                      <th>Driver</th>
                      <th>Certificado</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {emitentes.map((emitente) => (
                      <tr key={emitente.id}>
                        <td>
                          {emitente.razao_social}
                          {emitente.nome_fantasia && <div className="text-muted small">{emitente.nome_fantasia}</div>}
                        </td>
                        <td>{formatCnpj(emitente.cnpj)}</td>
                        <td>
                          {emitente.municipio ? `${emitente.municipio}/${emitente.uf ?? ""}` : "—"}
                        </td>
                        <td>
                          <span className={`badge ${emitente.ambiente === "producao" ? "bg-success-subtle text-success" : "bg-warning-subtle text-warning"}`}>
                            {emitente.ambiente === "producao" ? "Produção" : "Homologação"}
                          </span>
                        </td>
                        <td>{emitente.driver}</td>
                        <td>
                          {!emitente.tem_certificado ? (
                            <span className="badge bg-secondary-subtle text-secondary">Sem certificado</span>
                          ) : emitente.certificado_proximo_do_vencimento ? (
                            <span className="badge bg-danger-subtle text-danger">Expira em breve</span>
                          ) : (
                            <span className="badge bg-success-subtle text-success">OK</span>
                          )}
                        </td>
                        <td>
                          {emitente.is_active ? (
                            <span className="badge bg-success-subtle text-success">Ativo</span>
                          ) : (
                            <span className="badge bg-secondary-subtle text-secondary">Inativo</span>
                          )}
                        </td>
                        <td className="text-end">
                          <Can permission="emitentes.edit">
                            <Button size="sm" variant="light" className="me-1" onClick={() => openEdit(emitente)}>
                              <i className="ri-pencil-line"></i>
                            </Button>
                          </Can>
                          <Can permission="emitentes.delete">
                            <Button size="sm" variant="light" onClick={() => confirmDelete(emitente)}>
                              <i className="ri-delete-bin-line text-danger"></i>
                            </Button>
                          </Can>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{data.id ? "Editar emitente" : "Novo emitente"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="g-3">
              <Col md={8}>
                <Form.Label>Razão social</Form.Label>
                <Form.Control
                  value={data.razao_social}
                  onChange={(e) => setData("razao_social", e.target.value)}
                  isInvalid={!!errors.razao_social}
                />
                <Form.Control.Feedback type="invalid">{errors.razao_social}</Form.Control.Feedback>
              </Col>
              <Col md={4}>
                <Form.Label>CNPJ</Form.Label>
                <Form.Control
                  value={data.cnpj}
                  onChange={(e) => setData("cnpj", e.target.value)}
                  isInvalid={!!errors.cnpj}
                  placeholder="Somente números"
                />
                <Form.Control.Feedback type="invalid">{errors.cnpj}</Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>Nome fantasia</Form.Label>
                <Form.Control value={data.nome_fantasia} onChange={(e) => setData("nome_fantasia", e.target.value)} />
              </Col>
              <Col md={6}>
                <Form.Label>Inscrição municipal</Form.Label>
                <Form.Control
                  value={data.inscricao_municipal}
                  onChange={(e) => setData("inscricao_municipal", e.target.value)}
                />
              </Col>

              <Col md={3}>
                <Form.Label>Código IBGE do município</Form.Label>
                <Form.Control value={data.codigo_municipio} onChange={(e) => setData("codigo_municipio", e.target.value)} />
              </Col>
              <Col md={6}>
                <Form.Label>Município</Form.Label>
                <Form.Control value={data.municipio} onChange={(e) => setData("municipio", e.target.value)} />
              </Col>
              <Col md={3}>
                <Form.Label>UF</Form.Label>
                <Form.Control value={data.uf} maxLength={2} onChange={(e) => setData("uf", e.target.value.toUpperCase())} />
              </Col>

              <Col md={2}>
                <Form.Label>CEP</Form.Label>
                <Form.Control value={data.cep} onChange={(e) => setData("cep", e.target.value)} />
              </Col>
              <Col md={4}>
                <Form.Label>Logradouro</Form.Label>
                <Form.Control value={data.logradouro} onChange={(e) => setData("logradouro", e.target.value)} />
              </Col>
              <Col md={2}>
                <Form.Label>Número</Form.Label>
                <Form.Control value={data.numero} onChange={(e) => setData("numero", e.target.value)} />
              </Col>
              <Col md={2}>
                <Form.Label>Complemento</Form.Label>
                <Form.Control value={data.complemento} onChange={(e) => setData("complemento", e.target.value)} />
              </Col>
              <Col md={2}>
                <Form.Label>Bairro</Form.Label>
                <Form.Control value={data.bairro} onChange={(e) => setData("bairro", e.target.value)} />
              </Col>

              <Col md={4}>
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email" value={data.email} onChange={(e) => setData("email", e.target.value)} />
              </Col>
              <Col md={4}>
                <Form.Label>Telefone</Form.Label>
                <Form.Control value={data.telefone} onChange={(e) => setData("telefone", e.target.value)} />
              </Col>
              <Col md={4}>
                <Form.Label>Regime tributário</Form.Label>
                <Form.Select value={data.regime_tributario} onChange={(e) => setData("regime_tributario", e.target.value)}>
                  <option value="">—</option>
                  <option value="simples_nacional">Simples Nacional</option>
                  <option value="lucro_presumido">Lucro Presumido</option>
                  <option value="lucro_real">Lucro Real</option>
                  <option value="mei">MEI</option>
                </Form.Select>
              </Col>

              <Col md={12}>
                <hr />
              </Col>

              <Col md={4}>
                <Form.Label>Ambiente</Form.Label>
                <Form.Select value={data.ambiente} onChange={(e) => setData("ambiente", e.target.value)}>
                  <option value="homologacao">Homologação</option>
                  <option value="producao">Produção</option>
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Label>Driver de transmissão</Form.Label>
                <Form.Select value={data.driver} onChange={(e) => setData("driver", e.target.value)}>
                  <option value="adn_nacional">NFS-e Nacional (ADN)</option>
                  <option value="prefeitura_legada">Prefeitura legada</option>
                  <option value="gateway">Gateway comercial</option>
                  <option value="simulador">Simulador local (sem emissão real)</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                <Form.Label>Série RPS</Form.Label>
                <Form.Control value={data.rps_serie} onChange={(e) => setData("rps_serie", e.target.value)} />
              </Col>
              <Col md={2}>
                <Form.Label>Próximo nº RPS</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  value={data.rps_numero_atual}
                  onChange={(e) => setData("rps_numero_atual", Number(e.target.value))}
                />
              </Col>

              <Col md={12}>
                <div className="text-muted small">
                  O certificado digital A1 deste emitente é enviado em <Link href={route("configuracoes.index")}>Administração &gt; Configurações</Link>.
                </div>
              </Col>

              <Col md={12}>
                <Form.Check
                  type="switch"
                  label="Emitente ativo"
                  checked={data.is_active}
                  onChange={(e) => setData("is_active", e.target.checked)}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={processing}>
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

    </Layout>
  );
};

export default EmitentesIndex;
