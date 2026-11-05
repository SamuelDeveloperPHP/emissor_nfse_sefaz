import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Row,
  Col,
  Card,
  Container,
  Dropdown,
} from "react-bootstrap";
import moment from "moment";
import CountUp from "react-countup";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import DeleteModal from "../../Components/Common/DeleteModal";

//Import Icons
import FeatherIcon from "feather-icons-react";
import { invoiceWidgets } from "../../common/data/invoiceList";

//Import actions
import {
  onGetInvoices,
  onDeleteInvoice,
} from "../../slices/thunk";

//redux
import { useSelector, useDispatch } from "react-redux";

import Loader from "../../Components/Common/Loader";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createSelector } from "reselect";
import { Head, Link } from "@inertiajs/react";
import Layout from "../../Layouts";

const InvoiceList = () => {
  const dispatch: any = useDispatch();

  const selectInvoiceListState = (state: any) => state.Invoice;
  const selectinvoiceProperties = createSelector(
    selectInvoiceListState,
    (state: any) => ({
      invoices: state.invoices,
      isInvoiceSuccess: state.isInvoiceSuccess,
      error: state.error,
    })
  );
  // Inside your component
  const {
    invoices, isInvoiceSuccess, error
  }: any = useSelector(selectinvoiceProperties);


  //delete invoice
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);

  const [invoice, setInvoice] = useState<any>(null);

  useEffect(() => {
    if (invoices && !invoices.length) {
      dispatch(onGetInvoices());
    }
  }, [dispatch, invoices]);

  useEffect(() => {
    setInvoice(invoices);
  }, [invoices]);

  // Delete Data
  const onClickDelete = (invoice: any) => {
    setInvoice(invoice);
    setDeleteModal(true);
  };

  const handleDeleteInvoice = () => {
    if (invoice) {
      dispatch(onDeleteInvoice(invoice.id));
      setDeleteModal(false);
    }
  };


  const handleValidDate = (date: any) => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  const handleValidTime = (time: any) => {
    const time1 = new Date(time);
    const getHour = time1.getUTCHours();
    const getMin = time1.getUTCMinutes();
    const getTime = `${getHour}:${getMin}`;
    var meridiem = "";
    if (getHour >= 12) {
      meridiem = "PM";
    } else {
      meridiem = "AM";
    }
    const updateTime = moment(getTime, 'hh:mm').format('hh:mm') + " " + meridiem;
    return updateTime;
  };

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall: any = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".invoiceCheckBox");

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
      dispatch(onDeleteInvoice(element.value));
      setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckbox = () => {
    const ele = document.querySelectorAll(".invoiceCheckBox:checked");
    ele.length > 0 ? setIsMultiDeleteButton(true) : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };

  //Column
  const columns = useMemo(
    () => [
      {
        header: <input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
        cell: (cellProps:any) => {
          return <input type="checkbox" className="invoiceCheckBox form-check-input" value={cellProps.getValue()} onChange={() => deleteCheckbox()} />;
        },
        id: '#',
      },
      {
        header: "ID",
        accessorKey: "invoiceId",
        enableColumnFilter: false,
        cell: (cell:any) => {
          return <Link href="/apps-invoices-details" className="fw-medium link-primary">{cell.getValue()}</Link>;
        },
      },
      {
        header: "Customer",
        cell: (invoice:any) => (
          <>
            <div className="d-flex align-items-center">
              {invoice.row.original.img ? 
              <img
                src={invoice.row.original.img}
                alt=""
                className="avatar-xs rounded-circle me-2"
              /> :
                <div className="flex-shrink-0 avatar-xs me-2">
                  <div className="avatar-title bg-success-subtle text-success rounded-circle fs-13">
                    {invoice.row.original.name.charAt(0) + invoice.row.original.name.split(" ").slice(-1).toString().charAt(0)}
                  </div>
                </div>
                } 
             {invoice.getValue()}
            </div>
          </>
        ),
      },
      {
        header: "EMAIL",
        accessorKey: "email",
        enableColumnFilter: false,
      },
      {
        header: "COUNTRY",
        accessorKey: "country",
        enableColumnFilter: false,
      },
      {
        header: "DATE",
        accessorKey: "date",
        enableColumnFilter: false,
        cell: (invoice:any) => (
          <>
            {handleValidDate(invoice.getValue())},{" "}
            <small className="text-muted">{handleValidTime(invoice.getValue())}</small>
          </>
        ),
      },
      {
        header: "AMOUNT",
        accessorKey: "amount",
        enableColumnFilter: false,
      },
      {
        header: "PAYMENT STATUS",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell:any) => {
          switch (cell.getValue()) {
            case "Paid":
              return <span className="badge text-uppercase bg-success-subtle text-success"> {cell.getValue()} </span>;
            case "Unpaid":
              return <span className="badge text-uppercase bg-warning-subtle text-warning"> {cell.getValue()} </span>;
            case "Cancel":
              return <span className="badge text-uppercase bg-danger-subtle text-danger"> {cell.getValue()} </span>;
            default:
              return <span className="badge text-uppercase bg-primary-subtle text-primary"> {cell.getValue()} </span>;
          }
        }
      },
      {
        header: "Action",
        cell: (cellProps:any) => {
          return (
            <Dropdown >
              <Dropdown.Toggle
                href="#"
                className="btn btn-soft-secondary btn-sm dropdown arrow-none"
                as="button"
              >
                <i className="ri-more-fill align-middle"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-end">
                <Dropdown.Item href="/apps-invoices-details">
                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                  View
                </Dropdown.Item>

                <Dropdown.Item href="/apps-invoices-create">
                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                  Edit
                </Dropdown.Item>

                <Dropdown.Item href="/#">
                  <i className="ri-download-2-line align-bottom me-2 text-muted"></i>{" "}
                  Download
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Item
                  href="#"
                  onClick={() => { const invoiceData = cellProps.row.original; onClickDelete(invoiceData); }}
                >
                  <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          );
        },
      },
    ],
    [checkedAll]
  );



  return (
    <React.Fragment>
      <Head title="Invoice List | Velzon - React Admin & Dashboard Template" />
      <div className="page-content">
        <DeleteModal
          show={deleteModal}
          onDeleteClick={() => handleDeleteInvoice()}
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
          <BreadCrumb title="Invoice List" pageTitle="Invoices" />
          <Row>
            {invoiceWidgets.map((invoicewidget, key) => (
              <React.Fragment key={key}>
                <Col xl={3} md={6}>
                  <Card className="card-animate">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <p className="text-uppercase fw-medium text-muted mb-0">
                            {invoicewidget.label}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <h5
                            className={
                              "fs-14 mb-0 text-" + invoicewidget.percentageClass
                            }
                          >
                            <i className="ri-arrow-right-up-line fs-13 align-middle"></i>{" "}
                            {invoicewidget.percentage}
                          </h5>
                        </div>
                      </div>
                      <div className="d-flex align-items-end justify-content-between mt-4">
                        <div>
                          <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                            <CountUp
                              start={0}
                              prefix={invoicewidget.prefix}
                              suffix={invoicewidget.suffix}
                              end={invoicewidget.counter}
                              duration={4}
                              className="counter-value"
                            />
                          </h4>
                          <span className="badge bg-warning me-1">
                            {invoicewidget.badge}
                          </span>{" "}
                          <span className="text-muted">
                            {" "}
                            {invoicewidget.caption}
                          </span>
                        </div>
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-light rounded fs-3">
                            <FeatherIcon
                              icon={invoicewidget.feaIcon}
                              className="text-success icon-dual-success"
                            />
                          </span>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </React.Fragment>
            ))}
          </Row>

          <Row>
            <Col lg={12}>
              <Card id="invoiceList">
                <Card.Header className="border-0">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1">Invoices</h5>
                    <div className="flex-shrink-0">
                      <div className="d-flex gap-2 flex-wrap">
                        {isMultiDeleteButton && <button className="btn btn-primary me-1"
                          onClick={() => setDeleteModalMulti(true)}
                        ><i className="ri-delete-bin-2-line"></i></button>}
                        <Link
                          href="/apps-invoices-create"
                          className="btn btn-danger"
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Create
                          Invoice
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <div>
                  {invoices && invoices.length ? (
                      <TableContainer
                        columns={columns}
                        data={(invoices || [])}
                        isGlobalFilter={true}
                        customPageSize={10}
                        isInvoiceListFilter={true}
                        theadClass="text-muted text-uppercase"
                        SearchPlaceholder='Search for customer, email, country, status or something...'
                      />
                    ) : (<Loader error={error} />)
                    }
                    <ToastContainer closeButton={false} limit={1} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
InvoiceList.layout = (page:any) => <Layout children={page}/>
export default InvoiceList;