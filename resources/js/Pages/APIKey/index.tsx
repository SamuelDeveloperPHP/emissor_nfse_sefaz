import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Dropdown,
  Form,
} from "react-bootstrap";
import DeleteModal from "../../Components/Common/DeleteModal";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Widgets from "./Widgets";
import TableContainer from "../../Components/Common/TableContainer";
import { APIKeys, CreatedBy, CreatedDate, ExpiryDate, Name, Status } from "./APIKeyCol";
import { useDispatch, useSelector } from "react-redux";
import { Head } from "@inertiajs/react";
import Layout from "../../Layouts";
import { fetchData } from "../../slices/thunk";
import { createSelector } from "@reduxjs/toolkit";

const APIKey = () => {

  const dispatch: any = useDispatch();
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const apikeyData = createSelector(
    (state: any) => state.APIKey,
    (apiKey: any) => apiKey.apiKey
  );
  const APIKey = useSelector(apikeyData);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);


  const checkedAll = () => {
    const checkAll: any = document.getElementById("checkBoxAll");
    const elements = document.querySelectorAll(".orderCheckBox");

    if (checkAll.checked) {
      elements.forEach((element: any) => {
        element.checked = true;
      });
    } else {
      elements.forEach((element: any) => {
        element.checked = false;
      });
    }
  };
  const columns = useMemo(
    () => [
      {
        header: (
          <Form.Check.Input
            type="checkbox"
            id="checkBoxAll"
            className="form-check-input"
            onClick={() => checkedAll()}
          />
        ),
        cell: (cellProps: any) => {
          return (
            <Form.Check.Input
              type="checkbox"
              className="orderCheckBox form-check-input"
              value={cellProps.row.original._id}
            />
          );
        },
        id: "#",
      },
      {
        header: "Name",
        accessorKey: "name",
        enableColumnFilter: false,
        cell: (cellProps: any) => {
          return <Name {...cellProps} />;
        },
      },
      {
        header: "Created By",
        accessorKey: "createBy",
        enableColumnFilter: false,
        cell: (cellProps: any) => {
          return <CreatedBy {...cellProps} />;
        },
      },
      {
        header: "API Key",
        accessorKey: "apikey",
        enableColumnFilter: false,
        border: "1px solid black",
        cell: (cellProps: any) => {
          return <APIKeys {...cellProps} />;
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cellProps: any) => {
          return <Status {...cellProps} />;
        },
      },
      {
        header: "Created Date",
        accessorKey: "create_date",
        enableColumnFilter: false,
        cell: (cellProps: any) => {
          return <CreatedDate {...cellProps} />;
        },
      },
      {
        header: "Expiry Date",
        accessorKey: "expiry_date",
        enableColumnFilter: false,
        cell: (cellProps: any) => {
          return <ExpiryDate {...cellProps} />;
        },
      },
      {
        header: "Action",
        accessorKey: "action",
        disableFilters: true,
        enableColumnFilter: false,
        cell: (cellProps: any) => {
          return (
            <Dropdown className="dropdown">
              <Dropdown.Toggle
                role="button"
                as="button"
                className="btn btn-soft-secondary btn-sm dropdown arrow-none"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="ri-more-fill align-middle"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
                <li>
                  <Dropdown.Item
                    className="edit-item-btn"
                    href="#api-key-modal"
                    data-bs-toggle="modal"
                  >
                    Rename
                  </Dropdown.Item>
                </li>
                <li>
                  <Dropdown.Item
                    className="regenerate-api-btn"
                    href="#api-key-modal"
                    data-bs-toggle="modal"
                  >
                    Regenerate Key
                  </Dropdown.Item>
                </li>
                <li>
                  <Dropdown.Item className="disable-btn" href="">
                    Disable
                  </Dropdown.Item>
                </li>
                <li>
                  <Dropdown.Item
                    className="remove-item-btn"
                    // onClick={() => {
                    //   onClickDelete();
                    // }}
                    href="#deleteApiKeyModal"
                  >
                    Delete
                  </Dropdown.Item>
                </li>
              </Dropdown.Menu>
            </Dropdown>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <Head title="API Key | Velzon -  Admin & Dashboard Template" />
      <div className="page-content">
        <DeleteModal
        />
        <DeleteModal
        />
        <Container fluid>
          <BreadCrumb title="API Key" pageTitle="Apps" />

          <Row>
            <Widgets />
          </Row>

          <Row>
            <Col lg={12}>
              <Card id="apiKeyList">
                <Card.Header className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">API Keys</h5>
                  <div className="d-flex gap-1 flex-wrap">
                    <Button
                      type="button"
                      variant="primary"
                      className="btn create-btn"
                      data-bs-toggle="modal"
                      onClick={handleShow}
                      data-bs-target="#api-key-modal"
                    >
                      <i className="ri-add-line align-bottom me-1"></i> Add API
                      Key
                    </Button>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div>
                    <TableContainer
                      columns={columns}
                      data={APIKey || []}
                      customPageSize={8}
                      divClass="table-responsive table-card mb-3  "
                      tableClass="table align-middle table-nowrap mb-0"
                      theadClass="table-light"
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <div
        className="modal fade"
        id="api-key-modal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <Modal
            show={show}
            onHide={handleClose}
          >
            <Modal.Header closeButton>
              <h5 className="modal-title">
              Create API Key
              </h5>
              </Modal.Header>
            <Modal.Body >
              <form autoComplete="off">
                <div
                  id="api-key-error-msg"
                  className="alert alert-danger py-2 d-none"
                ></div>
                <Form.Control type="hidden" id="apikeyId" />
                <div className="mb-3">
                  <Form.Label htmlFor="api-key-name" className="form-label">
                    API Key Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="api-key-name"
                    placeholder="Enter api key name"
                  />
                </div>
                <div
                  className="mb-3"
                  id="apikey-element"
                  style={{ display: "none" }}
                >
                  <Form.Label htmlFor="api-key" className="form-label">
                    API Key
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="api-key"
                    disabled
                    value="b5815DE8A7224438932eb296Z5"
                  />
                </div>
              </form>
            </Modal.Body>
            <div className="modal-footer">
              <div className="hstack gap-2 justify-content-end">
                <Button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  id="createApi-btn"
                >
                  Create API
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
};
APIKey.layout = (page: any) => <Layout children={page} />
export default APIKey;
