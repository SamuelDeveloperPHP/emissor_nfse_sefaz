import React, { useEffect } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Head, useForm, usePage } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../../Layouts";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const Configuracoes = (props: any) => {
  const { flash }: any = usePage().props;
  const { data, setData, post, processing } = useForm({
    escolher_ambiente: !!props.escolher_ambiente,
  });
  const salvo = !!props.escolher_ambiente;

  useEffect(() => {
    if (flash?.success) toast.success(flash.success, { autoClose: 3000 });
  }, [flash]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("configuracoes.update"), { preserveScroll: true });
  };

  return (
    <Layout>
      <Head title="Configurações" />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Configurações" pageTitle="Administração" />

          <Card>
            <Card.Header>
              <h4 className="card-title mb-0">Ambiente de emissão</h4>
            </Card.Header>
            <Card.Body>
              <Alert variant={salvo ? "warning" : "info"} className="fs-15">
                {salvo ? (
                  <>
                    <strong>Escolha liberada.</strong> Quem emite escolhe Homologação ou Produção a cada lote e a cada
                    nota avulsa.
                  </>
                ) : (
                  <>
                    <strong>Tudo em Homologação.</strong> Nenhum usuário pode escolher: todas as notas e lotes saem em
                    ambiente de teste, sem valor fiscal.
                  </>
                )}
              </Alert>

              <Form onSubmit={handleSubmit}>
                <Form.Check
                  type="switch"
                  id="escolher_ambiente"
                  className="fs-16"
                  label="Liberar a escolha do ambiente na emissão"
                  checked={data.escolher_ambiente}
                  onChange={(e) => setData("escolher_ambiente", e.target.checked)}
                />

                <ul className="fs-15 mt-4 mb-0 ps-3" style={{ lineHeight: 1.7 }}>
                  <li>
                    <strong>Desligado:</strong> toda emissão usa Homologação.
                  </li>
                  <li>
                    <strong>Ligado:</strong> aparece o campo Ambiente nas telas de lote e de nota avulsa, começando em
                    Homologação. Quem emite pode trocar para Produção.
                  </li>
                  <li>Vale para todos os usuários do sistema. Só o Administrador vê esta tela.</li>
                </ul>

                <div className="mt-4">
                  <Button type="submit" variant="primary" size="lg" disabled={processing}>
                    {processing ? "Salvando..." : "Salvar"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
      <ToastContainer closeButton={false} limit={1} />
    </Layout>
  );
};

export default Configuracoes;
