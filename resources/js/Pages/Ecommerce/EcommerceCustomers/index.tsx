import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import { isEmpty } from "lodash";
import moment from "moment";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";


//Import Breadcrumb
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";

//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../../Components/Common/Loader";

// Export Modal
import ExportCSVModal from "../../../Components/Common/ExportCSVModal";
import { createSelector } from "reselect";
import { Head, Link } from "@inertiajs/react";
import Layout from "../../../Layouts";
import { onAddNewCustomer, onDeleteCustomer, onGetCustomers, onUpdateCustomer } from "../../../slices/thunk";

const EcommerceCustomers = () => {
  const dispatch: any = useDispatch();

  const selectCustomerState = (state: any) => state.Ecommerce;
  const ecomCustomerProperties = createSelector(
    selectCustomerState,
    (ecom: any) => ({
      customers: ecom.customers,
      isCustomerSuccess: ecom.isCustomerSuccess,
      error: ecom.error,
    })
  );
  // Inside your component
  const {
    customers, isCustomerSuccess, error
  }: any = useSelector(ecomCustomerProperties)


  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [customer, setCustomer] = useState<any>([]);

  // Delete customer
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setCustomer(null);
    } else {
      setModal(true);
      // setDate(dateFormat());
    }
  }, [modal]);

  const customermocalstatus = [
    {
      options: [
        { label: "Status", value: "Status" },
        { label: "Active", value: "Active" },
        { label: "Block", value: "Block" },
      ],
    },
  ];

  // Delete Data
  const onClickDelete = (customer: any) => {
    setCustomer(customer);
    setDeleteModal(true);
  };

  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      customer: (customer && customer.customer) || '',
      email: (customer && customer.email) || '',
      phone: (customer && customer.phone) || '',
      date: (customer && customer.date) || '',
      status: (customer && customer.status) || '',
    },
    validationSchema: Yup.object({
      customer: Yup.string().required("Please Enter Customer Name"),
      email: Yup.string().required("Please Enter Your Email"),
      phone: Yup.string().required("Please Enter Your Phone"),
      date: Yup.string().required("Please Enter date"),
      status: Yup.string().required("Please Enter Your Status")
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateCustomer = {
          id: customer ? customer.id : 0,
          customer: values.customer,
          email: values.email,
          phone: values.phone,
          date: values.date,
          status: values.status,
        };
        // update customer
        dispatch(onUpdateCustomer(updateCustomer));
        validation.resetForm();
      } else {
        const newCustomer = {
          id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          customer: values["customer"],
          email: values["email"],
          phone: values["phone"],
          date: values["date"],
          status: values["status"]
        };
        // save new customer
        dispatch(onAddNewCustomer(newCustomer));
        validation.resetForm();
      }
      toggle();
    },
  });

  // Delete Data
  const handleDeleteCustomer = () => {
    if (customer) {
      dispatch(onDeleteCustomer(customer.id));
      setDeleteModal(false);
    }
  };

  // Update Data
  const handleCustomerClick = useCallback((arg: any) => {
    const customer = arg;

    setCustomer({
      id: customer.id,
      customer: customer.customer,
      email: customer.email,
      phone: customer.phone,
      date: customer.date,
      status: customer.status
    });

    setIsEdit(true);
    toggle();
  }, [toggle]);


  useEffect(() => {
    if (customers && !customers.length) {
      dispatch(onGetCustomers());
    }
  }, [dispatch, customers]);


  useEffect(() => {
    setCustomer(customers);
  }, [customers]);

  useEffect(() => {
    if (!isEmpty(customers)) {
      setCustomer(customers);
      setIsEdit(false);
    }
  }, [customers]);

  // Add Data
  const handleCustomerClicks = () => {
    setCustomer("");
    setIsEdit(false);
    toggle();
  };

  // Node API 
  // useEffect(() => {
  //   if (isCustomerCreated) {
  //     setCustomer(null);
  //     dispatch(onGetCustomers());
  //   }
  // }, [
  //   dispatch,
  //   isCustomerCreated,
  // ]);

  const handleValidDate = (date: any) => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall: any = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".customerCheckBox");

    if (checkall.checked) {
      ele.forEach((ele: any) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele: any) => {
        ele.checked = false;
      });
    }
    deleteCheckbox();
  }, []);

  // Delete Multiple
  const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState<any>([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] = useState<boolean>(false);

  const deleteMultiple = () => {
    const checkall: any = document.getElementById("checkBoxAll");
    selectedCheckBoxDelete.forEach((element: any) => {
      dispatch(onDeleteCustomer(element.value));
      setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckbox = () => {
    const ele = document.querySelectorAll(".customerCheckBox:checked");
    ele.length > 0 ? setIsMultiDeleteButton(true) : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };

  // Customers Column
  const columns = useMemo(
    () => [
      {
        header: <input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
        cell: (cellProps: any) => {
          return <input type="checkbox" className="customerCheckBox form-check-input" value={cellProps.getValue()} onChange={() => deleteCheckbox()} />;
        },
        id: '#',
      },
      {
        header: '',
        accessorKey: 'id',
        enableColumnFilter: false,
        hiddenColumns: true,
        cell: (cell: any) => {
          return <input type="hidden" value={cell.getValue()} />;
        }
      },
      {
        header: "Customer",
        accessorKey: "customer",
        enableColumnFilter: false,
      },
      {
        header: "Email",
        accessorKey: "email",
        enableColumnFilter: false,
      },
      {
        header: "Phone",
        accessorKey: "phone",
        enableColumnFilter: false,
      },
      {
        header: "Joining Date",
        accessorKey: "date",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <>
            {handleValidDate(cell.getValue())}
          </>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell: any) => {
          switch (cell.getValue()) {
            case "Active":
              return <span className="badge text-uppercase bg-success-subtle text-success"> {cell.getValue()} </span>;
            case "Block":
              return <span className="badge text-uppercase bg-danger-subtle text-danger"> {cell.getValue()} </span>;
            default:
              return <span className="badge text-uppercase bg-info-subtle text-info"> {cell.getValue()} </span>;
          }
        }
      },
      {
        header: "Action",
        cell: (cellProps: any) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item edit" title="Edit">
                <Button
                variant="link"
                  href="#"
                  className="text-primary d-inline-block edit-item-btn p-0"
                  onClick={() => { const customerData = cellProps.row.original; handleCustomerClick(customerData); }}
                >

                  <i className="ri-pencil-fill fs-16"></i>
                </Button>
              </li>
              <li className="list-inline-item" title="Remove">
                <Button
                variant="link"
                  href="#"
                  className="text-danger d-inline-block remove-item-btn p-0"
                  onClick={() => { const customerData = cellProps.row.original; onClickDelete(customerData); }}
                >
                  <i className="ri-delete-bin-5-fill fs-16"></i>
                </Button>
              </li>
            </ul>
          );
        },
      },
    ],
    [handleCustomerClick, checkedAll]
  );

  // Export Modal
  const [isExportCSV, setIsExportCSV] = useState<boolean>(false);
  return (
    <React.Fragment>
      <Head title="Customers | Velzon - React Admin & Dashboard Template" />
      <div className="page-content">
        <ExportCSVModal
          show={isExportCSV}
          onCloseClick={() => setIsExportCSV(false)}
          data={customers}
        />
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteCustomer}
          onCloseClick={() => setDeleteModal(false)}
        />
        <DeleteModal
          show={deleteModalMulti}
          onDeleteClick={() => {
            deleteMultiple();
            setDeleteModalMulti(false);
          }}
          onCloseClick={() => setDeleteModalMulti(false)}
        />
        <Container fluid>
          <BreadCrumb title="Customers" pageTitle="Ecommerce" />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <Card.Header className="border-0">
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0">Customer List</h5>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div>
                        {isMultiDeleteButton && <button className="btn btn-soft-danger me-1"
                          onClick={() => setDeleteModalMulti(true)}
                        ><i className="ri-delete-bin-2-line"></i></button>}
                        <button
                          type="button"
                          className="btn btn-primary add-btn me-1"
                          id="create-btn"
                          onClick={() => { setIsEdit(false); toggle(); }}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          Customer
                        </button>{" "}
                        <button type="button" className="btn btn-secondary" onClick={() => setIsExportCSV(true)}>
                          <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                          Import
                        </button>
                      </div>
                    </div>
                  </Row>
                </Card.Header>
                <div className="card-body pt-0">
                  <div>
                    {isCustomerSuccess && customers.length ? (
                      <TableContainer
                        columns={columns}
                        data={(customers || [])}
                        isGlobalFilter={true}
                        customPageSize={10}
                        isCustomerFilter={true}
                        theadClass="table-light text-muted"
                        SearchPlaceholder='Search for customer, email, phone, status or something...'
                      />
                    ) : (<Loader error={error} />)
                    }
                  </div>

                  <Modal id="showModal" show={modal} onHide={toggle} centered>
                    <Modal.Header className="bg-light p-3" closeButton>
                      <h5 className="modal-title">
                        {!!isEdit ? "Edit Customer" : "Add Customer"}
                      </h5>
                    </Modal.Header>
                    <Form className="tablelist-form" onSubmit={(e: any) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}>
                      <Modal.Body>
                        <input type="hidden" id="id-field" />

                        <div
                          className="mb-3"
                          id="modal-id"
                          style={{ display: "none" }}
                        >
                          <Form.Label htmlFor="id-field1" className="form-label">
                            ID
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="id-field1"
                            className="form-control"
                            placeholder="ID"
                            readOnly
                          />
                        </div>

                        <div className="mb-3">
                          <Form.Label
                            htmlFor="customername-field"
                            className="form-label"
                          >
                            Customer Name
                          </Form.Label>
                          <Form.Control
                            name="customer"
                            id="customername-field"
                            className="form-control"
                            placeholder="Enter Name"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.customer || ""}
                          />
                          {validation.touched.customer && validation.errors.customer ? (
                            <Form.Control.Feedback type="invalid">{validation.errors.customer}</Form.Control.Feedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Form.Label htmlFor="email-field" className="form-label">
                            Email
                          </Form.Label>
                          <Form.Control
                            name="email"
                            type="email"
                            id="email-field"
                            placeholder="Enter Email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                          />
                          {validation.touched.email && validation.errors.email ? (
                            <Form.Control.Feedback type="invalid">{validation.errors.email}</Form.Control.Feedback>
                          ) : null}

                        </div>

                        <div className="mb-3">
                          <Form.Label htmlFor="phone-field" className="form-label">
                            Phone
                          </Form.Label>
                          <Form.Control
                            name="phone"
                            type="text"
                            id="phone-field"
                            placeholder="Enter Phone no."
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.phone || ""}
                          />
                          {validation.touched.phone && validation.errors.phone ? (
                            <Form.Control.Feedback type="invalid">{validation.errors.phone}</Form.Control.Feedback>
                          ) : null}

                        </div>

                        <div className="mb-3">
                          <Form.Label htmlFor="date-field" className="form-label">
                            Joining Date
                          </Form.Label>

                          <Flatpickr
                            name="date"
                            id="date-field"
                            className="form-control"
                            placeholder="Select a date"
                            options={{
                              altInput: true,
                              altFormat: "d M, Y",
                              dateFormat: "d M, Y",
                            }}

                            onChange={(date: any) => validation.setFieldValue("date", moment(date[0]).format("DD MMMM ,YYYY"))}
                            value={validation.values.date || ''}
                          />
                          {validation.errors.date && validation.touched.date ? (
                            <Form.Control.Feedback type="invalid" className='d-block'>{validation.errors.date}</Form.Control.Feedback>
                          ) : null}
                        </div>

                        <div>
                        <Form.Label htmlFor="status-field" className="form-label">
                            Status
                          </Form.Label>

                          <select
                            name="status"
                            className="form-select"
                            id="status-field"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={
                              validation.values.status || ""
                            }
                          >
                            {customermocalstatus.map((item, key) => (
                              <React.Fragment key={key}>
                                {item.options.map((item, key) => (<option value={item.value} key={key}>{item.label}</option>))}
                              </React.Fragment>
                            ))}
                          </select>
                          {validation.touched.status &&
                            validation.errors.status ? (
                            <Form.Control.Feedback type="invalid">
                              {validation.errors.status}
                            </Form.Control.Feedback>
                          ) : null}
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <div className="hstack gap-2 justify-content-end">
                          <button type="button" className="btn btn-light" onClick={() => { setModal(false); }}> Close </button>

                          <button type="submit" className="btn btn-success"> {!!isEdit ? "Update" : "Add Customer"} </button>
                        </div>
                      </Modal.Footer>
                    </Form>
                  </Modal>
                  <ToastContainer closeButton={false} limit={1} />
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
EcommerceCustomers.layout = (page:any) => <Layout children={page}/>
export default EcommerceCustomers;
