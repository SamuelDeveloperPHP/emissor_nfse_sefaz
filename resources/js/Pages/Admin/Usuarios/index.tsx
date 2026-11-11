import React, { useEffect, useState } from "react";
import { Alert, Badge, Button, Card, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { Head, router, useForm } from "@inertiajs/react";
import Layout from "../../../Layouts";
import { useFlashAlert } from "../../../common/alerta";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";

interface UserRow {
  id: number;
  name: string;
  email: string;
  all_emitentes: boolean;
  roles: string[];
  emitente_ids: number[];
}

interface EmitenteOption {
  id: number;
  razao_social: string;
  cnpj: string;
}

const emptyForm = {
  id: null as number | null,
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  roles: [] as string[],
  all_emitentes: false,
  emitente_ids: [] as number[],
};

const UsuariosIndex = (props: any) => {
  const users = props.users as UserRow[];
  const roleOptions = props.roles as string[];
  const emitentes = props.emitentes as EmitenteOption[];

  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [toDelete, setToDelete] = useState<UserRow | null>(null);

  const { data, setData, post, put, processing, errors, reset } = useForm(emptyForm);

  useFlashAlert();

  const openCreate = () => {
    reset();
    setShowModal(true);
  };

  const openEdit = (user: UserRow) => {
    setData({
      id: user.id,
      name: user.name,
      email: user.email,
      password: "",
      password_confirmation: "",
      roles: user.roles,
      all_emitentes: user.all_emitentes,
      emitente_ids: user.emitente_ids,
    });
    setShowModal(true);
  };

  const toggleRole = (role: string) => {
    setData(
      "roles",
      data.roles.includes(role) ? data.roles.filter((r) => r !== role) : [...data.roles, role]
    );
  };

  const toggleEmitente = (id: number) => {
    setData(
      "emitente_ids",
      data.emitente_ids.includes(id) ? data.emitente_ids.filter((e) => e !== id) : [...data.emitente_ids, id]
    );
  };

  const toggleSelectAllEmitentes = () => {
    setData("emitente_ids", data.emitente_ids.length === emitentes.length ? [] : emitentes.map((e) => e.id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const options = { onSuccess: () => setShowModal(false) };

    if (data.id) {
      put(route("users.update", data.id), options);
    } else {
      post(route("users.store"), options);
    }
  };

  const confirmDelete = (user: UserRow) => {
    setToDelete(user);
    setShowDelete(true);
  };

  const handleDelete = () => {
    if (toDelete) {
      router.delete(route("users.destroy", toDelete.id));
    }
    setShowDelete(false);
  };

  return (
    <Layout>
      <Head title="Usuários" />
      <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Usuários" pageTitle="Administração" />
        <Row>
          <Col lg={12}>
            <Card>
              <Card.Body>
                <Alert variant="info">
                  O cadastro, a edição e a exclusão de usuários estão desativados. Esta página está disponível somente para consulta.
                </Alert>
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>E-mail</th>
                      <th>Papéis</th>
                      <th>Emitentes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.roles.map((role) => (
                            <Badge bg="primary-subtle" text="primary" className="me-1" key={role}>
                              {role}
                            </Badge>
                          ))}
                        </td>
                        <td>
                          {user.all_emitentes ? (
                            <span className="badge bg-success-subtle text-success">Todos</span>
                          ) : (
                            <span className="text-muted">{user.emitente_ids.length} vinculado(s)</span>
                          )}
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
            <Modal.Title>{data.id ? "Editar usuário" : "Novo usuário"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label>Nome</Form.Label>
                <Form.Control value={data.name} onChange={(e) => setData("name", e.target.value)} isInvalid={!!errors.name} />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>{data.id ? "Nova senha (opcional)" : "Senha"}</Form.Label>
                <Form.Control
                  type="password"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>Confirmar senha</Form.Label>
                <Form.Control
                  type="password"
                  value={data.password_confirmation}
                  onChange={(e) => setData("password_confirmation", e.target.value)}
                />
              </Col>

              <Col md={12}>
                <Form.Label>Papéis</Form.Label>
                <div className="d-flex flex-wrap gap-3">
                  {roleOptions.map((role) => (
                    <Form.Check
                      key={role}
                      type="checkbox"
                      label={role}
                      checked={data.roles.includes(role)}
                      onChange={() => toggleRole(role)}
                    />
                  ))}
                </div>
              </Col>

              <Col md={12}>
                <hr />
                <Form.Check
                  type="switch"
                  label="Todos os emitentes (atuais e futuros)"
                  checked={data.all_emitentes}
                  onChange={(e) => setData("all_emitentes", e.target.checked)}
                />
              </Col>

              {!data.all_emitentes && (
                <Col md={12}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Form.Label className="mb-0">Emitentes vinculados</Form.Label>
                    <Form.Check
                      type="checkbox"
                      label="Selecionar todos"
                      checked={emitentes.length > 0 && data.emitente_ids.length === emitentes.length}
                      onChange={toggleSelectAllEmitentes}
                    />
                  </div>
                  <div className="border rounded p-2" style={{ maxHeight: 220, overflowY: "auto" }}>
                    {emitentes.map((emitente) => (
                      <Form.Check
                        key={emitente.id}
                        type="checkbox"
                        label={`${emitente.razao_social} (${emitente.cnpj})`}
                        checked={data.emitente_ids.includes(emitente.id)}
                        onChange={() => toggleEmitente(emitente.id)}
                      />
                    ))}
                    {emitentes.length === 0 && <span className="text-muted">Nenhum emitente cadastrado.</span>}
                  </div>
                </Col>
              )}
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

    </Layout>
  );
};

export default UsuariosIndex;
