import React, { useEffect } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
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
              <h5 className="card-title mb-0">Emissão</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Check
                  type="switch"
                  id="escolher_ambiente"
                  label="Permitir escolher o ambiente (homologação ou produção) ao emitir"
                  checked={data.escolher_ambiente}
                  onChange={(e) => setData("escolher_ambiente", e.target.checked)}
                />
                <p className="text-muted small mt-2 mb-0">
                  Vale para todos os usuários do sistema. Ligado, quem emite escolhe o ambiente de cada lote ou nota,
                  começando pelo ambiente cadastrado no emitente. Desligado, toda emissão usa o ambiente do próprio
                  emitente. Só o Administrador vê esta tela.
                </p>
                <div className="mt-4">
                  <Button type="submit" variant="primary" disabled={processing}>
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
