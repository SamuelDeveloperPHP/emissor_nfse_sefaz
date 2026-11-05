import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../../Layouts";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";

interface RoleRow {
  id: number;
  name: string;
  is_system: boolean;
  permissions: string[];
}

interface ModuleRow {
  id: number;
  key: string;
  name: string;
  parent_id: number | null;
  actions: string[];
}

const ACTION_LABELS: Record<string, string> = {
  view: "Visualizar",
  create: "Criar",
  edit: "Editar",
  delete: "Excluir",
};

const actionLabel = (action: string) => ACTION_LABELS[action] ?? action;
const permName = (moduleKey: string, action: string) => `${moduleKey}.${action}`;

const PapeisIndex = (props: any) => {
  const roles = props.roles as RoleRow[];
  const modules = props.modules as ModuleRow[];
  const { flash }: any = usePage().props;

  const leafModules = modules.filter((m) => m.actions.length > 0);
  const parents = modules.filter((m) => m.parent_id === null);
  const columns = Array.from(new Set(leafModules.flatMap((m) => m.actions)));

  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(roles[0]?.id ?? null);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const selectedRole = roles.find((r) => r.id === selectedRoleId) ?? null;

  useEffect(() => {
    setChecked(new Set(selectedRole?.permissions ?? []));
  }, [selectedRoleId]);

  useEffect(() => {
    if (flash?.success) toast.success(flash.success, { autoClose: 3000 });
    if (flash?.error) toast.error(flash.error, { autoClose: 3000 });
  }, [flash]);

  const roleForm = useForm({ name: "" });

  const toggle = (name: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  const toggleColumn = (action: string) => {
    const names = leafModules.filter((m) => m.actions.includes(action)).map((m) => permName(m.key, action));
    const allChecked = names.every((n) => checked.has(n));
    setChecked((prev) => {
      const next = new Set(prev);
      names.forEach((n) => (allChecked ? next.delete(n) : next.add(n)));
      return next;
    });
  };

  const toggleRow = (module: ModuleRow) => {
    const names = module.actions.map((a) => permName(module.key, a));
    const allChecked = names.every((n) => checked.has(n));
    setChecked((prev) => {
      const next = new Set(prev);
      names.forEach((n) => (allChecked ? next.delete(n) : next.add(n)));
      return next;
    });
  };

  const savePermissions = () => {
    if (!selectedRole) return;
    router.put(
      route("roles.update", selectedRole.id),
      { name: selectedRole.name, permissions: Array.from(checked) },
      { preserveScroll: true }
    );
  };

  const createRole = (e: React.FormEvent) => {
    e.preventDefault();
    roleForm.post(route("roles.store"), {
      onSuccess: () => {
        setShowRoleModal(false);
        roleForm.reset();
      },
    });
  };

  const deleteRole = () => {
    if (selectedRole) {
      router.delete(route("roles.destroy", selectedRole.id), {
        onSuccess: () => setSelectedRoleId(roles.find((r) => r.id !== selectedRole.id)?.id ?? null),
      });
    }
    setShowDelete(false);
  };

  return (
    <Layout>
      <Head title="Papéis & Permissões" />
      <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Papéis & Permissões" pageTitle="Administração" />
        <Row>
          <Col lg={3}>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Papéis</h5>
                  <Button size="sm" variant="primary" onClick={() => setShowRoleModal(true)}>
                    <i className="ri-add-line"></i>
                  </Button>
                </div>
                <div className="list-group">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                        selectedRoleId === role.id ? "active" : ""
                      }`}
                      onClick={() => setSelectedRoleId(role.id)}
                    >
                      {role.name}
                      {role.is_system && (
                        <Badge bg="light" text="dark">
                          sistema
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={9}>
            <Card>
              <Card.Body>
                {!selectedRole ? (
                  <p className="text-muted mb-0">Selecione um papel.</p>
                ) : selectedRole.is_system ? (
                  <div className="alert alert-info mb-0">
                    O papel <strong>{selectedRole.name}</strong> tem acesso total ao sistema e não pode ser alterado.
                  </div>
                ) : (
                  <>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0">Permissões de {selectedRole.name}</h5>
                      <div>
                        <Button variant="danger" size="sm" className="me-2" onClick={() => setShowDelete(true)}>
                          Excluir papel
                        </Button>
                        <Button variant="primary" size="sm" onClick={savePermissions}>
                          Salvar permissões
                        </Button>
                      </div>
                    </div>
                    <Table bordered responsive>
                      <thead>
                        <tr>
                          <th>Módulo</th>
                          {columns.map((action) => (
                            <th key={action} className="text-center">
                              <Form.Check
                                type="checkbox"
                                label={actionLabel(action)}
                                onChange={() => toggleColumn(action)}
                                checked={leafModules
                                  .filter((m) => m.actions.includes(action))
                                  .every((m) => checked.has(permName(m.key, action)))}
                              />
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {parents.map((parent) => (
                          <React.Fragment key={parent.id}>
                            <tr className="table-light">
                              <td colSpan={columns.length + 1}>
                                <strong>{parent.name}</strong>
                              </td>
                            </tr>
                            {modules
                              .filter((m) => m.parent_id === parent.id && m.actions.length > 0)
                              .map((module) => (
                                <tr key={module.id}>
                                  <td>
                                    <Form.Check
                                      type="checkbox"
                                      label={module.name}
                                      checked={module.actions.every((a) => checked.has(permName(module.key, a)))}
                                      onChange={() => toggleRow(module)}
                                    />
                                  </td>
                                  {columns.map((action) => (
                                    <td key={action} className="text-center">
                                      {module.actions.includes(action) ? (
                                        <Form.Check
                                          type="checkbox"
                                          checked={checked.has(permName(module.key, action))}
                                          onChange={() => toggle(permName(module.key, action))}
                                        />
                                      ) : (
                                        "—"
                                      )}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </Table>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </div>

      <Modal show={showRoleModal} onHide={() => setShowRoleModal(false)} centered>
        <Form onSubmit={createRole}>
          <Modal.Header closeButton>
            <Modal.Title>Novo papel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>Nome do papel</Form.Label>
            <Form.Control
              value={roleForm.data.name}
              onChange={(e) => roleForm.setData("name", e.target.value)}
              isInvalid={!!roleForm.errors.name}
            />
            <Form.Control.Feedback type="invalid">{roleForm.errors.name}</Form.Control.Feedback>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={() => setShowRoleModal(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={roleForm.processing}>
              Criar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <DeleteModal show={showDelete} onCloseClick={() => setShowDelete(false)} onDeleteClick={deleteRole} />

      <ToastContainer />
    </Layout>
  );
};

export default PapeisIndex;
