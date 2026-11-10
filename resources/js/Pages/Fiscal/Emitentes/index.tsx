import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Layout from "../../../Layouts";
import { avisarCamposInvalidos, confirmarExclusao, useFlashAlert } from "../../../common/alerta";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Can } from "../../../common/usePermission";
import { cnpjValido, mascararCep, mascararCnpj, mascararTelefone, sanitizarCnpj, somenteDigitos } from "../../../common/mascaras";

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
  modo_certificado: string;
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
  modo_certificado: "certificado",
  rps_serie: "",
  rps_numero_atual: 0,
  is_active: true,
};

const EmitentesIndex = (props: any) => {
  const emitentes = props.emitentes as EmitenteRow[];

  const [showModal, setShowModal] = useState(false);
  const [consultandoCnpj, setConsultandoCnpj] = useState(false);
  const [consultaCnpj, setConsultaCnpj] = useState("");
  const [ultimoCnpjConsultado, setUltimoCnpjConsultado] = useState("");

  const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm(emptyForm);

  useFlashAlert();

  const openCreate = () => {
    reset();
    clearErrors();
    setConsultaCnpj("");
    setUltimoCnpjConsultado("");
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
      modo_certificado: emitente.modo_certificado ?? "certificado",
      rps_serie: emitente.rps_serie ?? "",
      rps_numero_atual: emitente.rps_numero_atual,
      is_active: emitente.is_active,
    });
    clearErrors();
    setConsultaCnpj("");
    setUltimoCnpjConsultado(sanitizarCnpj(emitente.cnpj));
    setShowModal(true);
  };

  const consultarCnpj = async (cnpjInformado = data.cnpj) => {
    const cnpj = sanitizarCnpj(cnpjInformado);
    if (!cnpjValido(cnpj) || consultandoCnpj || cnpj === ultimoCnpjConsultado) return;

    setConsultandoCnpj(true);
    setConsultaCnpj("Consultando os dados cadastrais...");
    try {
      const resposta = await axios.get(route("emitentes.consultar-cnpj", cnpj));
      const cadastro = resposta.data;
      setData({
        ...data,
        cnpj,
        razao_social: cadastro.razao_social || data.razao_social,
        nome_fantasia: cadastro.nome_fantasia || data.nome_fantasia,
        cep: cadastro.cep || data.cep,
        logradouro: cadastro.logradouro || data.logradouro,
        numero: cadastro.numero || data.numero,
        complemento: cadastro.complemento || data.complemento,
        bairro: cadastro.bairro || data.bairro,
        municipio: cadastro.municipio || data.municipio,
        uf: cadastro.uf || data.uf,
        email: cadastro.email || data.email,
        telefone: cadastro.telefone || data.telefone,
      });
      setConsultaCnpj("Dados cadastrais preenchidos. Confira antes de salvar.");
      setUltimoCnpjConsultado(cnpj);
    } catch (erro: any) {
      setConsultaCnpj(erro?.response?.data?.message || "Não foi possível consultar o CNPJ agora. Preencha os dados manualmente.");
    } finally {
      setConsultandoCnpj(false);
    }
  };

  useEffect(() => {
    const cnpj = sanitizarCnpj(data.cnpj);
    if (!showModal || !cnpjValido(cnpj) || cnpj === ultimoCnpjConsultado) return;
    const atraso = window.setTimeout(() => consultarCnpj(cnpj), 650);
    return () => window.clearTimeout(atraso);
  }, [data.cnpj, showModal, ultimoCnpjConsultado]);

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
                        <td>{mascararCnpj(emitente.cnpj)}</td>
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
                  value={mascararCnpj(data.cnpj)}
                  onChange={(e) => {
                    setData("cnpj", sanitizarCnpj(e.target.value));
                    setConsultaCnpj("");
                  }}
                  onBlur={() => consultarCnpj()}
                  isInvalid={!!errors.cnpj}
                  placeholder="00.000.000/0000-00"
                  maxLength={18}
                  autoComplete="off"
                />
                <Form.Control.Feedback type="invalid">{errors.cnpj}</Form.Control.Feedback>
                <Form.Text className={consultaCnpj.startsWith("Dados") ? "text-success" : "text-muted"}>
                  {consultandoCnpj ? "Consultando..." : consultaCnpj || "Aceita CNPJ numérico e alfanumérico."}
                </Form.Text>
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
                <Form.Control value={data.codigo_municipio} maxLength={7} inputMode="numeric" onChange={(e) => setData("codigo_municipio", somenteDigitos(e.target.value, 7))} />
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
                <Form.Control value={mascararCep(data.cep)} inputMode="numeric" maxLength={9} onChange={(e) => setData("cep", somenteDigitos(e.target.value, 8))} isInvalid={!!errors.cep} placeholder="00000-000" />
                <Form.Control.Feedback type="invalid">{errors.cep}</Form.Control.Feedback>
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
                <Form.Control value={mascararTelefone(data.telefone)} inputMode="tel" maxLength={15} onChange={(e) => setData("telefone", somenteDigitos(e.target.value, 11))} isInvalid={!!errors.telefone} placeholder="(00) 00000-0000" />
                <Form.Control.Feedback type="invalid">{errors.telefone}</Form.Control.Feedback>
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
              <Col md={12}>
                <Form.Label>Como este emitente assina as notas</Form.Label>
                <Form.Check
                  type="radio"
                  id="modo_certificado_proprio"
                  name="modo_certificado"
                  label="Certificado A1 do próprio emitente"
                  checked={data.modo_certificado === "certificado"}
                  onChange={() => setData("modo_certificado", "certificado")}
                />
                <Form.Check
                  type="radio"
                  id="modo_certificado_procuracao"
                  name="modo_certificado"
                  label="Procuração: o certificado do escritório emite em nome deste emitente"
                  checked={data.modo_certificado === "procuracao"}
                  onChange={() => setData("modo_certificado", "procuracao")}
                />
                <Form.Text className="text-muted">
                  {data.modo_certificado === "procuracao"
                    ? "Não envie o certificado deste cliente. O escritório precisa ter a procuração eletrônica ativa na Receita Federal (serviço NFS-e) e o certificado do escritório cadastrado em Configurações > Certificado do sistema."
                    : "Envie o arquivo .pfx e a senha deste emitente em Configurações > Certificados digitais."}
                </Form.Text>
                {errors.modo_certificado && <div className="text-danger small">{errors.modo_certificado}</div>}
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
