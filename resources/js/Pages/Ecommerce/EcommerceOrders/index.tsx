import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Card,
  Col,
  Container,
  Nav,
  Row,
  Modal,
  Form,
  Tab,
  Button,
} from "react-bootstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { isEmpty } from "lodash";
// Export Modal
import ExportCSVModal from "../../../Components/Common/ExportCSVModal";
import classnames from "classnames";
import 'react-toastify/dist/ReactToastify.css';
//redux
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Head, Link, usePage } from "@inertiajs/react";
import Layout from "../../../Layouts";
import { useForm } from '@inertiajs/react'
import { orders } from "../../../common/data";

const EcommerceOrders = (props: any) => {
  const [modal, setModal] = useState<boolean>(false);
  const [order, setOrder] = useState<any>([]);
  const { flash }: any = usePage().props


  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setOrder(null);
    } else {
      setModal(true);
    }
  }, [modal]);



  const { data, setData, post, processing, errors, reset } = useForm({
    id: "",
    order_id: "",
    customer_name: "",
    product: "",
    amount: "",
    payment_method: "",
    delivery_status: "",
  })

  const [values, setValues] = useState({
    order_id: order ? order.order_id : '',
    customer_name: order ? order.customer_name : '',
    product: order ? order.product : '',
    amount: order ? order.amount : '',
    payment_method: order ? order.payment_method : '',
    delivery_status: order ? order.delivery_status : '',
  });


  function handleSubmit(e: any) {
    e.preventDefault();

    const values = data;
    if (isEdit) {
      const updateOrder = {
        id: order ? order.id : 0,
        order_id: values.order_id,
        customer_name: values.customer_name,
        product: values.product,
        amount: values.amount,
        payment_method: values.payment_method,
        delivery_status: values.delivery_status,
      };
      post('order-update', {
        preserveScroll: true,
        onSuccess: () => {
          setModal(false);
          reset();
        },
      })
    }
    else {
      const newOrder = {
        id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
        order_id: values.order_id,
        customer_name: values.customer_name,
        product: values.product,
        amount: values.amount,
        payment_method: values.payment_method,
        delivery_status: values.delivery_status,
      };
      post('order-create', {
        preserveScroll: true,
        onSuccess: () => {
          setModal(false);
          reset();
        },
      })
    }
  }


  const handleOrderClicks = () => {
    setOrder("");
    setIsEdit(false);
    toggle();
  };

  // update
  const handleOrderClick = useCallback((arg: any) => {
    const order = arg;

    setData({ ...order })

    setIsEdit(true);
    toggle();
  }, [toggle]);

  // delete

  const onClickDelete = (order: any) => {
    setOrder(order);
    setDeleteModal(true);
    data.id = order.id;
  };

  const handleDeleteOrder = () => {
    post('order-delete', {
      preserveScroll: true,
      onSuccess: () => {
        setDeleteModal(false);
      },
    })

  };

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [productList, setProductList] = useState<any>([]);
  const [activeTab, setActiveTab] = useState<any>("1");
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    setProductList(orders);
  }, [orders]);

  useEffect(() => {
    if (!isEmpty(orders)) setProductList(orders);
  }, [orders]);

  const toggleTab = (tab: any, type: any) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      let filteredorder = orders;
      if (type !== "all") {
        filteredorder = orders.filter((product: any) => product.status === type);
      }
      setProductList(filteredorder);
    }
  };
  // Column
  const columns = useMemo(
    () => [

      {
        header: "Order Id",
        accessorKey: "order_id",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return <Link href="/apps-ecommerce-order-details" className="fw-medium link-primary">{cell.getValue()}</Link>;
        },
      },
      {
        header: "Customer",
        accessorKey: "customer_name",
        enableColumnFilter: false,
      },
      {
        header: "Product",
        accessorKey: "product",
        enableColumnFilter: false,
      },
      {
        header: "Amount",
        accessorKey: "amount",
        enableColumnFilter: false,
      },
      {
        header: "Payment Method",
        accessorKey: "payment_method",
        enableColumnFilter: false,
      },
      {
        header: 'Delivery Status',
        accessorKey: 'delivery_status',
        enableColumnFilter: false,
        cell: (cell: any) => {
          switch (cell.getValue()) {
            case "Pending":
              return <span className="badge text-uppercase bg-warning-subtle text-warning"> {cell.getValue()} </span>;
            case "Cancelled":
              return <span className="badge text-uppercase bg-danger-subtle text-danger"> {cell.getValue()} </span>;
            case "Inprogress":
              return <span className="badge text-uppercase bg-secondary-subtle text-secondary"> {cell.getValue()} </span>;
            case "Pickups":
              return <span className="badge text-uppercase bg-info-subtle text-info"> {cell.getValue()} </span>;
            case "Returns":
              return <span className="badge text-uppercase bg-primary-subtle text-primary"> {cell.getValue()} </span>;
            case "Delivered":
              return <span className="badge text-uppercase bg-success-subtle text-success"> {cell.getValue()} </span>;
            default:
              return <span className="badge text-uppercase bg-warning-subtle text-warning"> {cell.getValue()} </span>;
          }
        }
      },

      {
        header: "Action",
        cell: (cellProps: any) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item">
                <Button
                  variant="link"
                  href="/apps-ecommerce-order-details"
                  className="text-primary d-inline-block p-0"
                >
                  <i className="ri-eye-fill fs-16"></i>
                </Button>
              </li>
              <li className="list-inline-item edit">
                <Button
                  variant="link"
                  className="text-primary d-inline-block edit-item-btn p-0"
                  onClick={() => {
                    const orderData = cellProps.row.original;
                    handleOrderClick(orderData);
                  }}
                >
                  <i className="ri-pencil-fill fs-16"></i>
                </Button>
              </li>
              <li className="list-inline-item">
                <Button
                  variant="link"
                  className="text-danger d-inline-block remove-item-btn p-0"
                  onClick={() => {
                    const orderData = cellProps.row.original;
                    onClickDelete(orderData);
                  }}
                >
                  <i className="ri-delete-bin-5-fill fs-16"></i>
                </Button>
              </li>
            </ul>
          );
        },
      },
    ], []
  );

  // Export Modal
  const [isExportCSV, setIsExportCSV] = useState<boolean>(false);

  useEffect(() => {
    if(flash) {
    if (flash.success && flash.success != null) {
      toast.success(flash.success, { autoClose: 3000 });
    }

    if (flash.error && flash.error != null) {
      toast.error(flash.error, { autoClose: 3000 });
    }
  }
  }, [flash])
  return (
    <React.Fragment>
      <Head title="Orders | Velzon - React Admin & Dashboard Template" />
      <div className="page-content">
        <ExportCSVModal
          show={isExportCSV}
          onCloseClick={() => setIsExportCSV(false)}
          data={orders}
        />
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteOrder}
          onCloseClick={() => setDeleteModal(false)}
        />
        <Container fluid>
          <BreadCrumb title="Orders" pageTitle="Ecommerce" />
          <Row>
            <Col lg={12}>
              <Card id="orderList">
                <Card.Header className="card-header border-0">
                  <Row className="align-items-center gy-3">
                    <div className="col-sm">
                      <h5 className="card-title mb-0">Order History</h5>
                    </div>
                    <div className="col-sm-auto">
                      <div className="d-flex gap-1 flex-wrap">
                        <button
                          type="button"
                          className="btn btn-success add-btn"
                          id="create-btn"
                          onClick={() => { setIsEdit(false); toggle(); }}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Create
                          Order
                        </button>{" "}
                        <button type="button" className="btn btn-info" onClick={() => setIsExportCSV(true)}>
                          <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                          Export
                        </button>

                      </div>
                    </div>
                  </Row>
                </Card.Header>

                <Card.Body className="pt-0">
                  <div>
                    <Tab.Container defaultActiveKey="1">
                      <Nav
                        className="nav-tabs nav-tabs-custom nav-success"
                        role="tablist"
                      >
                        <Nav.Item>
                          <Nav.Link eventKey="all"
                           className={classnames({ active: activeTab === "all" }, "all py-3")} onClick={() => { toggleTab("all", "1"); }}
                          >
                            <i className="ri-store-2-fill me-1 align-bottom"></i>{" "}
                            All Orders
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="deliverd"
                            className={classnames({ active: activeTab === "deliverd" }, "deliverd py-3")} onClick={() => { toggleTab("deliverd", "2"); }}
                            href="#"
                          >
                            <i className="ri-checkbox-circle-line me-1 align-bottom"></i>{" "}
                            Delivered
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="pickups"
                            className={classnames({ active: activeTab === "pickups" }, "pickups py-3")} onClick={() => { toggleTab("pickups", "3"); }}
                          >
                            <i className="ri-truck-line me-1 align-bottom"></i>{" "}
                            Pickups{" "}
                            <span className="badge bg-danger align-middle ms-1">
                              2
                            </span>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="returns"
                            href="#"
                            className={classnames({ active: activeTab === "returns" }, "returns py-3")} onClick={() => { toggleTab("returns", "4"); }}
                          >
                            <i className="ri-arrow-left-right-fill me-1 align-bottom"></i>{" "}
                            Returns
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="cancelled"
                            href="#"
                            className={classnames({ active: activeTab === "cancelled" }, "cancelled py-3")} onClick={() => { toggleTab("cancelled", "5"); }}
                          >
                            <i className="ri-close-circle-line me-1 align-bottom"></i>{" "}
                            Cancelled
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>

                      <TableContainer
                        columns={columns}
                        data={(props.orders || [])}
                        isGlobalFilter={true}
                        customPageSize={8}
                        divClass="table-responsive table-card mb-1 mt-0"
                        tableClass="align-middle table-nowrap"
                        theadClass="table-light text-muted text-uppercase"
                        isOrderFilter={true}
                        SearchPlaceholder='Search for order ID, customer, order status or something...'
                      />
                    </Tab.Container>
                  </div>
                  <Modal id="showModal"
                    show={modal}
                    onHide={toggle}
                    centered>
                    <Modal.Header className="bg-light p-3" closeButton>
                      <h5 className="modal-title">
                        {!!isEdit ? "Edit Order" : "Add Order"}
                      </h5>
                    </Modal.Header>
                    <Form className="tablelist-form" onSubmit={handleSubmit}>
                      <Modal.Body>

                        <div className="mb-3">
                          <Form.Label
                            htmlFor="order_id"
                            className="form-label"
                          >
                            Order Id
                          </Form.Label>
                          <Form.Control
                            name="orderId"
                            id="order_id"
                            className="form-control"
                            placeholder="Enter Order Id"
                            type="text"
                            value={data.order_id}
                            onChange={e => setData('order_id', e.target.value)}
                          />
                          <Form.Control.Feedback type="invalid" className="d-block">
                            {props.errors.order_id}
                          </Form.Control.Feedback>

                        </div>

                        <div className="mb-3">
                          <Form.Label
                            htmlFor="customer_name"
                            className="form-label"
                          >
                            Customer Name
                          </Form.Label>
                          <Form.Control
                            name="customer"
                            id="customer_name"
                            className="form-control"
                            placeholder="Enter Name"
                            type="text"
                            value={data.customer_name}
                            onChange={e => setData('customer_name', e.target.value)}
                          />
                          <Form.Control.Feedback type="invalid" className="d-block">
                            {props.errors.customer_name}
                          </Form.Control.Feedback>

                        </div>

                        <div className="mb-3">
                          <Form.Label
                            htmlFor="product"
                            className="form-label"
                          >
                            Product
                          </Form.Label>

                          <Form.Select name="product" id="product" value={data.product}
                            onChange={(e: any) => {
                              setData("product", e.target.value);
                            }}>
                            <option value="Product">Product </option>
                            <option value="Puma Tshirt">Puma Tshirt </option>
                            <option value="Adidas Sneakers">Adidas Sneakers </option>
                            <option value="350 ml Glass Grocery Container">350 ml Glass Grocery Container </option>
                            <option value="American egale outfitters Shirt">American egale outfitters Shirt </option>
                            <option value="Galaxy Watch4">Galaxy Watch4 </option>
                            <option value="Apple iPhone 12">Apple iPhone 12 </option>
                            <option value="Funky Prints T-shirt">Funky Prints T-shirt </option>
                            <option value="USB Flash Drive Personalized with 3D Print">USB Flash Drive Personalized with 3D Print </option>
                            <option value="Oxford Button-Down Shirt">Oxford Button-Down Shirt </option>
                            <option value="Classic Short Sleeve Shirt">Classic Short Sleeve Shirt </option>
                            <option value="Half Sleeve T-Shirts (Blue)">Half Sleeve T-Shirts (Blue) </option>
                            <option value="Noise Evolve Smartwatch">Noise Evolve Smartwatch </option>

                          </Form.Select>

                          <Form.Control.Feedback type="invalid" className="d-block">
                            {props.errors.product}
                          </Form.Control.Feedback>
                        </div>

                        <Row className="gy-4 mb-3">
                          <Col md={6}>
                            <div>
                              <Form.Label
                                htmlFor="amount-field"
                                className="form-label"
                              >
                                Amount
                              </Form.Label>
                              <Form.Control
                                name="amount"
                                type="text"
                                value={data.amount}
                                onChange={e => setData('amount', e.target.value)}
                              />
                              <Form.Control.Feedback type="invalid" className="d-block">
                                {props.errors.amount}
                              </Form.Control.Feedback>

                            </div>
                          </Col>
                          <Col md={6}>
                            <div>
                              <Form.Label
                                htmlFor="payment_method"
                                className="form-label"
                              >
                                Payment Method
                              </Form.Label>

                              <Form.Select name="payment_method" id="payment_method" value={data.payment_method}
                                onChange={(e: any) => {
                                  setData("payment_method", e.target.value);
                                }}>
                                <option value="All">All </option>
                                <option value="Mastercard">Mastercard </option>
                                <option value="Paypal">Paypal </option>
                                <option value="Visa">Visa </option>
                                <option value="COD">COD </option>
                              </Form.Select>
                              <Form.Control.Feedback type="invalid" className="d-block">
                                {props.errors.payment_method}
                              </Form.Control.Feedback>
                            </div>
                          </Col>
                        </Row>

                        <div>
                          <Form.Label
                            htmlFor="delivery_status"
                            className="form-label"
                          >
                            Delivery Status
                          </Form.Label>

                          <Form.Select name="delivery_status" id="delivery_status" value={data.delivery_status}
                            onChange={(e: any) => {
                              setData("delivery_status", e.target.value);
                            }}>
                            <option value="Status">Status </option>
                            <option value="All">All </option>
                            <option value="Pending">Pending </option>
                            <option value="Inprogress">Inprogress </option>
                            <option value="Cancelled">Cancelled </option>
                            <option value="Pickups">Pickups </option>
                            <option value="Returns">Returns </option>
                            <option value="Delivered">Delivered </option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid" className="d-block">
                            {props.errors.delivery_status}
                          </Form.Control.Feedback>
                        </div>
                      </Modal.Body>
                      <div className="modal-footer">
                        <div className="hstack gap-2 justify-content-end">
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => {
                              setModal(false);
                            }}
                          >
                            Close
                          </button>

                          <button type="submit" className="btn btn-success">
                            {!!isEdit
                              ? "Update"
                              : "Add Customer"}
                          </button>
                        </div>
                      </div>
                    </Form>
                  </Modal>
                  <ToastContainer closeButton={false} limit={1} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
EcommerceOrders.layout = (page: any) => <Layout children={page} />
export default EcommerceOrders;


