import React, { useState } from "react";
import { Alert, Badge, Button, Card, Container, Form, Modal, Tab, Table, Tabs } from "react-bootstrap";
import { Head, router, useForm } from "@inertiajs/react";
import Layout from "../../../Layouts";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { avisarCamposInvalidos, confirmarExclusao, useFlashAlert } from "../../../common/alerta";

interface CertificadoRow {
  id: number;
  razao_social: string;
  cnpj: string;
  is_active: boolean;
  driver: string;
  tem_certificado: boolean;
  validade: string | null;
  dias: number | null;
  titular: string | null;
  cnpj_certificado: string | null;
  enviado_em: string | null;
  enviado_por: string | null;
  impressao: string | null;
}

const formatarCnpj = (cnpj: string) => cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");

const SituacaoCertificado = ({ c }: { c: CertificadoRow }) => {
  if (!c.tem_certificado) return <Badge bg="secondary">Sem certificado</Badge>;
  if (c.dias === null) return <Badge bg="secondary">Validade desconhecida</Badge>;
  if (c.dias < 0) return <Badge bg="danger">Vencido em {c.validade}</Badge>;
  if (c.dias <= 30) return <Badge bg="warning" text="dark">Vence em {c.dias} {c.dias === 1 ? "dia" : "dias"} ({c.validade})</Badge>;
  return <Badge bg="success">Válido até {c.validade}</Badge>;
};

const Configuracoes = (props: any) => {
  const certificados = props.certificados as CertificadoRow[];
  const salvo = !!props.escolher_ambiente;

  useFlashAlert();

  const ambiente = useForm({ escolher_ambiente: salvo });
  const [alvo, setAlvo] = useState<CertificadoRow | null>(null);
  const envio = useForm<{ certificado: File | null; certificado_senha: string }>({ certificado: null, certificado_senha: "" });

  const salvarAmbiente = (e: React.FormEvent) => {
    e.preventDefault();
    ambiente.post(route("configuracoes.update"), { preserveScroll: true, onError: avisarCamposInvalidos });
  };

  const abrirEnvio = (c: CertificadoRow) => {
    envio.reset();
    envio.clearErrors();
    setAlvo(c);
  };

  const fecharEnvio = () => {
    envio.reset();
    setAlvo(null);
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alvo) return;
    envio.post(route("certificados.store", alvo.id), {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: fecharEnvio,
      onError: avisarCamposInvalidos,
      // The password never stays in the page, whatever the outcome.
      onFinish: () => envio.setData("certificado_senha", ""),
    });
  };

  const testar = (c: CertificadoRow) => router.post(route("certificados.testar", c.id), {}, { preserveScroll: true });

  const remover = async (c: CertificadoRow) => {
    const ok = await confirmarExclusao(
      "Remover o certificado?",
      `${c.razao_social} não conseguirá mais emitir notas reais até receber outro certificado. O arquivo e a senha guardados são apagados.`
    );
    if (ok) router.delete(route("certificados.destroy", c.id), { preserveScroll: true });
  };

  return (
    <Layout>
      <Head title="Configurações" />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Configurações" pageTitle="Administração" />

          <Tabs defaultActiveKey="certificados" className="mb-3">
            <Tab eventKey="certificados" title="Certificados digitais">
              <Card>
                <Card.Header>
                  <h4 className="card-title mb-0">Certificado A1 de cada emitente</h4>
                </Card.Header>
                <Card.Body>
                  <Alert variant="info" className="fs-14">
                    <strong>Como funciona.</strong> Cada emitente assina as próprias notas com o certificado A1 (arquivo .pfx ou .p12) do CNPJ dele. Envie o arquivo e a senha aqui; o
                    sistema abre o certificado na hora e só guarda se a senha estiver certa, se ele estiver dentro da validade e se for da mesma empresa.
                  </Alert>
                  <ul className="text-muted fs-13 ps-3">
                    <li>O arquivo é guardado criptografado e a senha também. Nenhuma das duas aparece de volta na tela, nos logs ou nos downloads.</li>
                    <li>Só o Administrador acessa esta tela. Cada envio e cada remoção ficam registrados com o usuário e a data.</li>
                    <li>Certificados A3 (token ou cartão) não funcionam em emissão automática; use o A1.</li>
                  </ul>

                  {certificados.length === 0 ? (
                    <p className="text-muted mb-0">Nenhum emitente cadastrado. Cadastre o emitente em Fiscal &gt; Emitentes primeiro.</p>
                  ) : (
                    <Table hover responsive className="align-middle">
                      <thead>
                        <tr>
                          <th>Emitente</th>
                          <th>Situação do certificado</th>
                          <th>Titular</th>
                          <th>Enviado</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {certificados.map((c) => (
                          <tr key={c.id}>
                            <td>
                              {c.razao_social}
                              {!c.is_active && <Badge bg="secondary" className="ms-2">Inativo</Badge>}
                              <div className="text-muted small">{formatarCnpj(c.cnpj)}</div>
                            </td>
                            <td>
                              <SituacaoCertificado c={c} />
                              {c.driver === "simulador" && <div className="text-muted small">Emitente em modo simulador</div>}
                            </td>
                            <td style={{ maxWidth: 280 }}>
                              {c.titular ?? "—"}
                              {c.impressao && <div className="text-muted small">Impressão {c.impressao}</div>}
                            </td>
                            <td>
                              {c.enviado_em ?? "—"}
                              {c.enviado_por && <div className="text-muted small">por {c.enviado_por}</div>}
                            </td>
                            <td className="text-end text-nowrap">
                              <Button size="sm" variant={c.tem_certificado ? "light" : "primary"} className="me-1" onClick={() => abrirEnvio(c)}>
                                {c.tem_certificado ? "Substituir" : "Enviar certificado"}
                              </Button>
                              {c.tem_certificado && (
                                <>
                                  <Button size="sm" variant="light" className="me-1" onClick={() => testar(c)}>
                                    Testar
                                  </Button>
                                  <Button size="sm" variant="outline-danger" onClick={() => remover(c)}>
                                    Remover
                                  </Button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="ambiente" title="Ambiente de emissão">
              <Card>
                <Card.Header>
                  <h4 className="card-title mb-0">Ambiente de emissão</h4>
                </Card.Header>
                <Card.Body>
                  <Alert variant={salvo ? "warning" : "info"} className="fs-15">
                    {salvo ? (
                      <>
                        <strong>Escolha liberada.</strong> Quem emite escolhe Homologação ou Produção a cada lote e a cada nota avulsa.
                      </>
                    ) : (
                      <>
                        <strong>Tudo em Homologação.</strong> Nenhum usuário pode escolher: todas as notas e lotes saem em ambiente de teste, sem valor fiscal.
                      </>
                    )}
                  </Alert>

                  <Form onSubmit={salvarAmbiente}>
                    <Form.Check
                      type="switch"
                      id="escolher_ambiente"
                      className="fs-16"
                      label="Liberar a escolha do ambiente na emissão"
                      checked={ambiente.data.escolher_ambiente}
                      onChange={(e) => ambiente.setData("escolher_ambiente", e.target.checked)}
                    />

                    <ul className="fs-15 mt-4 mb-0 ps-3" style={{ lineHeight: 1.7 }}>
                      <li>
                        <strong>Desligado:</strong> toda emissão usa Homologação.
                      </li>
                      <li>
                        <strong>Ligado:</strong> aparece o campo Ambiente nas telas de lote e de nota avulsa, começando em Homologação. Quem emite pode trocar para Produção.
                      </li>
                      <li>Vale para todos os usuários do sistema. Só o Administrador vê esta tela.</li>
                    </ul>

                    <div className="mt-4">
                      <Button type="submit" variant="primary" size="lg" disabled={ambiente.processing}>
                        {ambiente.processing ? "Salvando..." : "Salvar"}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Container>
      </div>

      <Modal show={!!alvo} onHide={fecharEnvio} centered>
        <Form onSubmit={enviar} autoComplete="off">
          <Modal.Header closeButton>
            <Modal.Title>{alvo?.tem_certificado ? "Substituir certificado" : "Enviar certificado"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted">
              Emitente: <strong>{alvo?.razao_social}</strong>
              <br />
              CNPJ {alvo ? formatarCnpj(alvo.cnpj) : ""}
            </p>
            <Form.Label>Arquivo do certificado (.pfx ou .p12)</Form.Label>
            <Form.Control
              type="file"
              accept=".pfx,.p12"
              className="mb-3"
              onChange={(e) => envio.setData("certificado", (e.target as HTMLInputElement).files?.[0] ?? null)}
              isInvalid={!!envio.errors.certificado}
            />
            <Form.Control.Feedback type="invalid">{envio.errors.certificado}</Form.Control.Feedback>
            <Form.Label>Senha do certificado</Form.Label>
            <Form.Control
              type="password"
              autoComplete="new-password"
              value={envio.data.certificado_senha}
              onChange={(e) => envio.setData("certificado_senha", e.target.value)}
              isInvalid={!!envio.errors.certificado_senha}
            />
            <Form.Control.Feedback type="invalid">{envio.errors.certificado_senha}</Form.Control.Feedback>
            {alvo?.tem_certificado && <Form.Text className="d-block mt-2">O certificado atual só é trocado se o novo passar nas verificações.</Form.Text>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={fecharEnvio}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={envio.processing || !envio.data.certificado || envio.data.certificado_senha === ""}>
              {envio.processing ? "Verificando..." : "Verificar e guardar"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Configuracoes;
