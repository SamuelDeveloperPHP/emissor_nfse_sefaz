import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { Head, router } from "@inertiajs/react";
import Layout from "../../../Layouts";
import { useFlashAlert } from "../../../common/alerta";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Can } from "../../../common/usePermission";
import { moeda } from "../Lotes/status";

type Filtros = { mes: string; emitente_id: string; ambiente: string };

const Numero = ({ rotulo, valor, destaque = false }: { rotulo: string; valor: React.ReactNode; destaque?: boolean }) => (
  <Col sm={6} xl={3}>
    <Card className="mb-3">
      <Card.Body>
        <div className="text-muted fs-13">{rotulo}</div>
        <div className={destaque ? "fs-3 fw-semibold" : "fs-4 fw-semibold"}>{valor}</div>
      </Card.Body>
    </Card>
  </Col>
);

const FechamentoIndex = (props: any) => {
  const emitentes = props.emitentes as { id: number; razao_social: string }[];
  const resumo = props.resumo as { autorizadas: number; canceladas: number; valor: number; iss_retido: number; tem_notas: boolean };
  const [filtros, setFiltros] = useState<Filtros>(props.filtros);

  useFlashAlert();

  const aplicar = (novos: Filtros) => {
    setFiltros(novos);
    router.get(route("fechamento.index"), Object.fromEntries(Object.entries(novos).filter(([, v]) => v !== "")), { preserveState: true, replace: true });
  };

  const consulta = new URLSearchParams(Object.entries(filtros).filter(([, v]) => v !== "") as [string, string][]).toString();

  return (
    <Layout>
      <Head title="Fechamento do mês" />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Fechamento do mês" pageTitle="Fiscal" />

          <Card>
            <Card.Body>
              <Row className="g-3">
                <Col md={3}>
                  <Form.Label>Mês</Form.Label>
                  <Form.Control type="month" value={filtros.mes} onChange={(e) => e.target.value && aplicar({ ...filtros, mes: e.target.value })} />
                </Col>
                <Col md={5}>
                  <Form.Label>Emitente</Form.Label>
                  <Form.Select value={filtros.emitente_id} onChange={(e) => aplicar({ ...filtros, emitente_id: e.target.value })}>
                    <option value="">Todos os emitentes</option>
                    {emitentes.map((emitente) => (
                      <option key={emitente.id} value={emitente.id}>
                        {emitente.razao_social}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={4}>
                  <Form.Label>Ambiente</Form.Label>
                  <Form.Select value={filtros.ambiente} onChange={(e) => aplicar({ ...filtros, ambiente: e.target.value })}>
                    <option value="producao">Produção</option>
                    <option value="homologacao">Homologação (teste)</option>
                  </Form.Select>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Row>
            <Numero rotulo="Notas autorizadas" valor={resumo.autorizadas} />
            <Numero rotulo="Valor dos serviços" valor={moeda(resumo.valor)} destaque />
            <Numero rotulo="ISS retido pelos tomadores" valor={moeda(resumo.iss_retido)} />
            <Numero rotulo="Notas canceladas" valor={resumo.canceladas} />
          </Row>

          <Card>
            <Card.Body>
              {resumo.tem_notas ? (
                <Can permission="fechamento.exportar">
                  <div className="d-flex flex-wrap gap-2">
                    <a className="btn btn-primary" href={route("fechamento.excel") + "?" + consulta}>
                      Baixar planilha (Excel)
                    </a>
                    <a className="btn btn-outline-primary" href={route("fechamento.zip") + "?" + consulta}>
                      Baixar XMLs (ZIP)
                    </a>
                  </div>
                </Can>
              ) : (
                <p className="mb-0 text-muted">Nenhuma nota autorizada ou cancelada neste mês, para este emitente e ambiente.</p>
              )}
              <p className="text-muted small mt-3 mb-0">
                A planilha traz uma aba com todas as notas, outra com os totais por tomador e outra por emitente. Notas canceladas aparecem na lista, mas não entram nos totais.
                Notas do simulador local nunca entram no fechamento, porque não foram emitidas de verdade. O ISS é calculado pela alíquota informada na nota; empresas do Simples
                Nacional não informam alíquota, então aparece zero.
              </p>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </Layout>
  );
};

export default FechamentoIndex;
