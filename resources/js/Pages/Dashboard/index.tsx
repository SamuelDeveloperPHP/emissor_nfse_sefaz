import React, { Suspense, lazy, useEffect, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { Card, Col, Container, Row } from "react-bootstrap";

import Layout from "../../Layouts";
import { STATUS_META, Status } from "./status";
import "./dashboard.css";

// Chart.js is heavy and only this page uses it, so it loads on demand.
const NotasChart = lazy(() => import("./Charts").then((m) => ({ default: m.NotasChart })));
const StatusDonut = lazy(() => import("./Charts").then((m) => ({ default: m.StatusDonut })));
const EmitentesDonut = lazy(() => import("./Charts").then((m) => ({ default: m.EmitentesDonut })));

const CarregandoGrafico = () => (
  <div className="fiscal-empty" role="status">
    <span>Carregando gráfico...</span>
  </div>
);

const REFRESH_MS = 60_000;

type PeriodoKey = "dia" | "semana" | "mes" | "ano";

type Periodo = {
  rotulo: string;
  intervalo: string;
  total: number;
  valor: number;
  por_status: Record<Status, number>;
  taxa_rejeicao: number;
  labels: string[];
  serie: Record<Status, number[]>;
};

type Certificado = { id: number; razao_social: string; validade: string; dias: number };

type Props = {
  emitentes: {
    total: number;
    ativos: number;
    inativos: number;
    sem_certificado: number;
    certificados: Certificado[];
  };
  periodos: Record<PeriodoKey, Periodo>;
  gerado_em: string;
};

const PERIODOS: { key: PeriodoKey; agrupamento: string }[] = [
  { key: "dia", agrupamento: "por hora" },
  { key: "semana", agrupamento: "por dia" },
  { key: "mes", agrupamento: "por dia" },
  { key: "ano", agrupamento: "por mês" },
];

const inteiro = (value: number) => new Intl.NumberFormat("pt-BR").format(value);
const moeda = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);
const percentual = (value: number) => `${value.toFixed(1).replace(".", ",")}%`;
const dataBr = (iso: string) => iso.split("-").reverse().join("/");

const prazoDoCertificado = (dias: number) => {
  if (dias < 0) {
    const atraso = Math.abs(dias);
    return { texto: `Venceu há ${atraso} ${atraso === 1 ? "dia" : "dias"}`, classe: "bg-danger-subtle text-danger" };
  }
  if (dias === 0) {
    return { texto: "Vence hoje", classe: "bg-danger-subtle text-danger" };
  }
  return {
    texto: `Vence em ${dias} ${dias === 1 ? "dia" : "dias"}`,
    classe: dias <= 10 ? "bg-danger-subtle text-danger" : "bg-warning-subtle text-warning",
  };
};

const SemDados = ({ titulo, texto }: { titulo: string; texto: string }) => (
  <div className="fiscal-empty">
    <strong>{titulo}</strong>
    <span>{texto}</span>
  </div>
);

export default function Dashboard({ emitentes, periodos, gerado_em }: Props) {
  const [selecionado, setSelecionado] = useState<PeriodoKey>("dia");
  const periodo = periodos[selecionado];
  const agrupamento = PERIODOS.find((p) => p.key === selecionado)!.agrupamento;

  // Keeps the numbers current while the page stays open, without polling a hidden tab.
  useEffect(() => {
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") {
        router.reload({ only: ["emitentes", "periodos", "gerado_em"] });
      }
    }, REFRESH_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <React.Fragment>
      <Head title="Painel fiscal" />
      <div className="page-content fiscal">
        <Container fluid>
          <div className="fiscal-head">
            <h4 className="mb-0">Painel fiscal</h4>
            <span className="fiscal-head__stamp">Atualizado às {gerado_em}</span>
          </div>

          <div className="fiscal-periods" role="group" aria-label="Período das notas fiscais">
            {PERIODOS.map(({ key }) => {
              const p = periodos[key];

              return (
                <button
                  key={key}
                  type="button"
                  className="fiscal-period"
                  aria-pressed={selecionado === key}
                  onClick={() => setSelecionado(key)}
                >
                  <span className="fiscal-period__name">{p.rotulo}</span>
                  <span className="fiscal-period__range">{p.intervalo}</span>
                  <span className="fiscal-period__total">
                    {inteiro(p.total)}
                    <small>{p.total === 1 ? "nota" : "notas"}</small>
                  </span>
                  <span className="fiscal-period__meta">{moeda(p.valor)} autorizados</span>
                  <span className="fiscal-period__meta">{percentual(p.taxa_rejeicao)} rejeitadas</span>
                  <span className="fiscal-period__bar" aria-hidden="true">
                    {STATUS_META.map((status) => (
                      <span
                        key={status.key}
                        style={{
                          width: p.total > 0 ? `${(p.por_status[status.key] / p.total) * 100}%` : 0,
                          background: status.color,
                        }}
                      />
                    ))}
                  </span>
                </button>
              );
            })}
          </div>

          <Row>
            <Col xl={8}>
              <Card>
                <Card.Header>
                  <h5 className="card-title mb-0">
                    Notas fiscais {agrupamento} · {periodo.rotulo.toLowerCase()}
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div
                    className="fiscal-chart"
                    role="img"
                    aria-label={`Notas fiscais ${agrupamento}, ${periodo.rotulo.toLowerCase()}: ${inteiro(periodo.total)} no total`}
                  >
                    {periodo.total > 0 ? (
                      <Suspense fallback={<CarregandoGrafico />}>
                        <NotasChart labels={periodo.labels} serie={periodo.serie} />
                      </Suspense>
                    ) : (
                      <SemDados
                        titulo="Nenhuma nota neste período"
                        texto="Os totais aparecem aqui assim que um lote for transmitido."
                      />
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={4}>
              <Card>
                <Card.Header>
                  <h5 className="card-title mb-0">Situação das notas · {periodo.rotulo.toLowerCase()}</h5>
                </Card.Header>
                <Card.Body>
                  <div className="fiscal-chart" role="img" aria-label="Distribuição das notas por situação">
                    {periodo.total > 0 ? (
                      <Suspense fallback={<CarregandoGrafico />}>
                        <StatusDonut porStatus={periodo.por_status} />
                      </Suspense>
                    ) : (
                      <SemDados titulo="Sem notas para classificar" texto="Escolha outro período ou aguarde a primeira emissão." />
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={5}>
              <Card>
                <Card.Header className="d-flex align-items-center justify-content-between">
                  <h5 className="card-title mb-0">Emitentes</h5>
                  <span className="text-muted fs-13">{inteiro(emitentes.total)} cadastrados</span>
                </Card.Header>
                <Card.Body>
                  <div className="fiscal-chart fiscal-chart--short" role="img" aria-label={`${emitentes.ativos} emitentes ativos e ${emitentes.inativos} inativos`}>
                    {emitentes.total > 0 ? (
                      <Suspense fallback={<CarregandoGrafico />}>
                        <EmitentesDonut ativos={emitentes.ativos} inativos={emitentes.inativos} />
                      </Suspense>
                    ) : (
                      <SemDados titulo="Nenhum emitente disponível" texto="Cadastre uma empresa em Fiscal > Emitentes para começar." />
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={7}>
              <Card>
                <Card.Header className="d-flex align-items-center justify-content-between">
                  <h5 className="card-title mb-0">Certificados A1 para renovar</h5>
                  <Link href={route("emitentes.index")} className="fs-13">
                    Ver emitentes
                  </Link>
                </Card.Header>
                <Card.Body>
                  {emitentes.certificados.length > 0 ? (
                    <ul className="fiscal-certs">
                      {emitentes.certificados.map((cert) => {
                        const prazo = prazoDoCertificado(cert.dias);

                        return (
                          <li key={cert.id}>
                            <span className="fiscal-certs__name">
                              {cert.razao_social}
                              <span className="fiscal-certs__date">Validade {dataBr(cert.validade)}</span>
                            </span>
                            <span className={`badge ${prazo.classe}`}>{prazo.texto}</span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <SemDados titulo="Nenhum certificado vence em 30 dias" texto="Os emitentes ativos com certificado cadastrado estão em dia." />
                  )}
                  {emitentes.sem_certificado > 0 && (
                    <p className="mt-3 mb-0 text-muted fs-13">
                      {inteiro(emitentes.sem_certificado)}{" "}
                      {emitentes.sem_certificado === 1 ? "emitente ativo está" : "emitentes ativos estão"} sem certificado A1 e não conseguem transmitir.
                    </p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

Dashboard.layout = (page: any) => <Layout children={page} />;
