import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../../Layouts";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { Can } from "../../../common/usePermission";

interface ModuleRow {
  id: number;
  key: string;
  name: string;
  icon: string | null;
  route: string | null;
  parent_id: number | null;
  order: number;
  is_active: boolean;
  actions: string[] | null;
}

const emptyForm = {
  id: null as number | null,
  key: "",
  name: "",
  icon: "",
  route: "",
  parent_id: "" as number | "",
  order: 0,
  is_active: true,
  actions: "",
};

const ModulosIndex = (props: any) => {
  const modules = props.modules as ModuleRow[];
  const { flash }: any = usePage().props;

  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [toDelete, setToDelete] = useState<ModuleRow | null>(null);

  const { data, setData, post, put, processing, errors, reset, transform } = useForm(emptyForm);

  useEffect(() => {
    if (flash?.success) toast.success(flash.success, { autoClose: 3000 });
    if (flash?.error) toast.error(flash.error, { autoClose: 3000 });
  }, [flash]);

  const openCreate = () => {
    reset();
    setShowModal(true);
  };

  const openEdit = (module: ModuleRow) => {
    setData({
      id: module.id,
      key: module.key,
      name: module.name,
      icon: module.icon ?? "",
      route: module.route ?? "",
      parent_id: module.parent_id ?? "",
      order: module.order,
      is_active: module.is_active,
      actions: (module.actions ?? []).join(", "),
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    transform((current) => ({
      ...current,
      parent_id: current.parent_id === "" ? null : current.parent_id,
      actions: current.actions
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
    }));

    const options = { onSuccess: () => setShowModal(false) };

    if (data.id) {
      put(route("modules.update", data.id), options);
    } else {
      post(route("modules.store"), options);
    }
  };

  const confirmDelete = (module: ModuleRow) => {
    setToDelete(module);
    setShowDelete(true);
  };

  const handleDelete = () => {
    if (toDelete) {
      router.delete(route("modules.destroy", toDelete.id));
    }
    setShowDelete(false);
  };

  const parentName = (parentId: number | null) => modules.find((m) => m.id === parentId)?.name ?? "—";

  return (
    <Layout>
      <Head title="Módulos" />
      <Container fluid>
        <BreadCrumb title="Módulos" pageTitle="Administração" />
        <Row>
          <Col lg={12}>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-end mb-3">
                  <Can permission="modulos.create">
                    <Button variant="primary" onClick={openCreate}>
                      <i className="ri-add-line align-bottom me-1"></i> Novo módulo
                    </Button>
                  </Can>
                </div>
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Chave</th>
                      <th>Grupo</th>
                      <th>Rota</th>
                      <th>Ordem</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map((module) => (
                      <tr key={module.id}>
                        <td>{module.parent_id ? <span className="ms-3">↳ {module.name}</span> : module.name}</td>
                        <td><code>{module.key}</code></td>
                        <td>{parentName(module.parent_id)}</td>
                        <td>{module.route ?? "—"}</td>
                        <td>{module.order}</td>
                        <td>
                          {module.is_active ? (
                            <span className="badge bg-success-subtle text-success">Ativo</span>
                          ) : (
                            <span className="badge bg-secondary-subtle text-secondary">Inativo</span>
                          )}
                        </td>
                        <td className="text-end">
                          <Can permission="modulos.edit">
                            <Button size="sm" variant="light" className="me-1" onClick={() => openEdit(module)}>
                              <i className="ri-pencil-line"></i>
                            </Button>
                          </Can>
                          <Can permission="modulos.delete">
                            <Button size="sm" variant="light" onClick={() => confirmDelete(module)}>
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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{data.id ? "Editar módulo" : "Novo módulo"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label>Chave</Form.Label>
                <Form.Control value={data.key} onChange={(e) => setData("key", e.target.value)} isInvalid={!!errors.key} />
                <Form.Control.Feedback type="invalid">{errors.key}</Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>Nome</Form.Label>
                <Form.Control value={data.name} onChange={(e) => setData("name", e.target.value)} isInvalid={!!errors.name} />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>Ícone (classe Boxicons)</Form.Label>
                <Form.Control placeholder="bx bx-briefcase-alt" value={data.icon} onChange={(e) => setData("icon", e.target.value)} />
              </Col>
              <Col md={6}>
                <Form.Label>Rota (name da rota Inertia)</Form.Label>
                <Form.Control placeholder="emitentes.index" value={data.route} onChange={(e) => setData("route", e.target.value)} />
              </Col>
              <Col md={6}>
                <Form.Label>Grupo (pai)</Form.Label>
                <Form.Select
                  value={data.parent_id}
                  onChange={(e) => setData("parent_id", e.target.value ? Number(e.target.value) : "")}
                >
                  <option value="">Nenhum (item raiz)</option>
                  {modules
                    .filter((m) => m.id !== data.id)
                    .map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label>Ordem</Form.Label>
                <Form.Control type="number" value={data.order} onChange={(e) => setData("order", Number(e.target.value))} />
              </Col>
              <Col md={12}>
                <Form.Label>Ações extras (separadas por vírgula)</Form.Label>
                <Form.Control placeholder="emitir, cancelar" value={data.actions} onChange={(e) => setData("actions", e.target.value)} />
                <Form.Text>Todo módulo já recebe view, create, edit e delete automaticamente.</Form.Text>
              </Col>
              <Col md={12}>
                <Form.Check
                  type="switch"
                  label="Módulo ativo"
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

      <DeleteModal show={showDelete} onCloseClick={() => setShowDelete(false)} onDeleteClick={handleDelete} />

      <ToastContainer />
    </Layout>
  );
};

export default ModulosIndex;
