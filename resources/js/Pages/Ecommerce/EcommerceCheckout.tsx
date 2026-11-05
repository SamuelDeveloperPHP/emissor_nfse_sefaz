import React, { useState } from "react";

//Import Breadcrumb
import BreadCrumb from "../../Components/Common/BreadCrumb";

import {
  Container,
  Form,
  Row,
  Col,
  Card,
  Nav,
  Modal,
  Tab,
} from "react-bootstrap";

import Select from "react-select";
import { orderSummary } from "../../common/data/ecommerce";
import { Head, Link } from "@inertiajs/react";
import Layout from "../../Layouts";

const EcommerceCheckout = () => {
  const [selectedCountry, setselectedCountry] = useState<any>(null);
  const [selectedState, setselectedState] = useState<any>(null);
  const [activeTab, setactiveTab] = useState<any>(1);
  const [passedSteps, setPassedSteps] = useState<any>([1]);
  const [modal, setModal] = useState<boolean>(false);
  const [deletemodal, setDeleteModal] = useState<boolean>(false);

  const toggledeletemodal = () => {
    setDeleteModal(!deletemodal);
  };

  const togglemodal = () => {
    setModal(!modal);
  };

  function handleSelectCountry(selectedCountry: any) {
    setselectedCountry(selectedCountry);
  }

  function handleSelectState(selectedState: any) {
    setselectedState(selectedState);
  }

  function toggleTab(tab: any) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];

      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
  }

  const productState = [
    {
      options: [
        { label: "Select State...", value: "Select State" },
        { label: "Alabama", value: "Alabama" },
        { label: "Alaska", value: "Alaska" },
        { label: "American Samoa", value: "American Samoa" },
        { label: "California", value: "California" },
        { label: "Colorado", value: "Colorado" },
        { label: "District Of Columbia", value: "District Of Columbia" },
        { label: "Florida", value: "Florida" },
        { label: "Georgia", value: "Georgia" },
        { label: "Guam", value: "Guam" },
        { label: "Hawaii", value: "Hawaii" },
        { label: "Idaho", value: "Idaho" },
        { label: "Kansas", value: "Kansas" },
        { label: "Louisiana", value: "Louisiana" },
        { label: "Montana", value: "Montana" },
        { label: "Nevada", value: "Nevada" },
        { label: "New Jersey", value: "New Jersey" },
        { label: "New Mexico", value: "New Mexico" },
        { label: "New York", value: "New York" },
      ],
    },
  ];

  const productCountry = [
    {
      options: [
        { label: "Select Country...", value: "Select Country" },
        { label: "United States", value: "United States" },
      ],
    },
  ];


  return (
    <React.Fragment>
      <Head title="Checkout | Velzon - React Admin & Dashboard Template" />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Checkout" pageTitle="Ecommerce" />

          <Row>
            <Col xl="8">
              <Card>
                <Card.Body className="checkout-tab">
                  <Form action="#">
                    <Tab.Container defaultActiveKey="1" activeKey={activeTab}>
                      <div className="step-arrow-nav mt-n3 mx-n3 mb-3">
                        <Nav
                          className="nav-pills nav-justified custom-nav"
                          role="tablist"
                        >
                          <Nav.Item role="presentation" as="li">
                            <Nav.Link
                              href="#"
                              eventKey="1"
                              className="p-3 fs-15"
                              onClick={() => setactiveTab(1)}
                            >
                              <i className="ri-user-2-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"></i>
                              Personal Info
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item role="presentation">
                            <Nav.Link
                              href="#"
                              eventKey="2"
                              className="p-3 fs-15"
                              onClick={() => setactiveTab(2)}
                            >
                              <i className="ri-truck-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"></i>
                              Shipping Info
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item role="presentation">
                            <Nav.Link
                              href="#"
                              eventKey="3"
                              className="p-3 fs-15"
                              onClick={() => setactiveTab(3)}
                            >
                              <i className="ri-bank-card-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"></i>
                              Payment Info
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item role="presentation">
                            <Nav.Link
                              href="#"
                              eventKey="4"
                              className="p-3 fs-15"
                              onClick={() => setactiveTab(4)}
                            >
                              <i className="ri-checkbox-circle-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"></i>
                              Finish
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </div>

                      <Tab.Content >
                        <Tab.Pane eventKey="1" id="pills-bill-info">
                          <div>
                            <h5 className="mb-1">Billing Information</h5>
                            <p className="text-muted mb-4">
                              Please fill all information below
                            </p>
                          </div>

                          <div>
                            <Row>
                              <Col sm={6}>
                                <div className="mb-3">
                                  <Form.Label
                                    htmlFor="billinginfo-firstName"
                                    className="form-label"
                                  >
                                    First Name
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="billinginfo-firstName"
                                    placeholder="Enter first name"
                                  />
                                </div>
                              </Col>

                              <Col sm={6}>
                                <div className="mb-3">
                                  <Form.Label
                                    htmlFor="billinginfo-lastName"
                                    className="form-label"
                                  >
                                    Last Name
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="billinginfo-lastName"
                                    placeholder="Enter last name"
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col sm={6}>
                                <div className="mb-3">
                                  <Form.Label
                                    htmlFor="billinginfo-email"
                                    className="form-label"
                                  >
                                    Email
                                    <span className="text-muted"> (Optional)</span>
                                  </Form.Label>
                                  <Form.Control
                                    type="email"
                                    className="form-control"
                                    id="billinginfo-email"
                                    placeholder="Enter email"
                                  />
                                </div>
                              </Col>

                              <Col sm={6}>
                                <div className="mb-3">
                                  <Form.Label
                                    htmlFor="billinginfo-phone"
                                    className="form-label"
                                  >
                                    Phone
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="billinginfo-phone"
                                    placeholder="Enter phone no."
                                  />
                                </div>
                              </Col>
                            </Row>

                            <div className="mb-3">
                              <Form.Label
                                htmlFor="billinginfo-address"
                                className="form-label"
                              >
                                Address
                              </Form.Label>
                              <textarea
                                className="form-control"
                                id="billinginfo-address"
                                placeholder="Enter address"
                                rows={3}
                              ></textarea>
                            </div>

                            <Row>
                              <Col md={4}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="country" className="form-label">
                                    Country
                                  </Form.Label>
                                  <Select
                                    value={selectedCountry}
                                    onChange={(selectedCountry: any) => {
                                      handleSelectCountry(selectedCountry);
                                    }}
                                    options={productCountry}
                                    id="country"
                                    defaultInputValue="United States"
                                  ></Select>
                                </div>
                              </Col>

                              <Col md={4}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="state" className="form-label">
                                    State
                                  </Form.Label>
                                  <Select
                                    id="state"
                                    value={selectedState}
                                    onChange={(selectedState: any) => {
                                      handleSelectState(selectedState);
                                    }}
                                    options={productState}
                                    defaultInputValue="California"
                                  ></Select>
                                </div>
                              </Col>

                              <Col md={4}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="zip" className="form-label">
                                    Zip Code
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="zip"
                                    placeholder="Enter zip code"
                                  />
                                </div>
                              </Col>
                            </Row>

                            <div className="d-flex align-items-start gap-3 mt-3">
                              <button
                                type="button"
                                className="btn btn-primary btn-label right ms-auto nexttab"
                                onClick={() => setactiveTab(2)}
                              >
                                <i className="ri-truck-line label-icon align-middle fs-16 ms-2"></i>
                                Proceed to Shipping
                              </button>
                            </div>
                          </div>
                        </Tab.Pane>

                        <Tab.Pane eventKey="2">
                          <div>
                            <h5 className="mb-1">Shipping Information</h5>
                            <p className="text-muted mb-4">
                              Please fill all information below
                            </p>
                          </div>

                          <div className="mt-4">
                            <div className="d-flex align-items-center mb-2">
                              <div className="flex-grow-1">
                                <h5 className="fs-14 mb-0">Saved Address</h5>
                              </div>
                              <div className="flex-shrink-0">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-info mb-3"
                                  onClick={togglemodal}
                                >
                                  Add Address
                                </button>
                              </div>
                            </div>
                            <Row className="gy-3">
                              <Col lg={4} sm={6}>
                                <div className="form-check card-radio">
                                  <Form.Check.Input
                                    id="shippingAddress01"
                                    name="shippingAddress"
                                    type="radio"
                                    className="form-check-input"
                                    defaultChecked
                                  />
                                  <Form.Check.Label
                                    className="form-check-label"
                                    htmlFor="shippingAddress01"
                                  >
                                    <span className="mb-4 fw-semibold d-block text-muted text-uppercase">
                                      Home Address
                                    </span>

                                    <span className="fs-14 mb-2 d-block">
                                      Marcus Alfaro
                                    </span>
                                    <span className="text-muted fw-normal text-wrap mb-1 d-block">
                                      4739 Bubby Drive Austin, TX 78729
                                    </span>
                                    <span className="text-muted fw-normal d-block">
                                      Mo. 012-345-6789
                                    </span>
                                  </Form.Check.Label>
                                </div>
                                <div className="d-flex flex-wrap p-2 py-1 bg-light rounded-bottom border mt-n1">
                                  <div>
                                    <Link
                                      href="#"
                                      className="d-block text-body p-1 px-2"
                                      onClick={togglemodal}
                                    >
                                      <i className="ri-pencil-fill text-muted align-bottom me-1"></i>
                                      Edit
                                    </Link>
                                  </div>
                                  <div>
                                    <Link
                                      href="#"
                                      className="d-block text-body p-1 px-2"
                                      onClick={toggledeletemodal}
                                    >
                                      <i className="ri-delete-bin-fill text-muted align-bottom me-1"></i>
                                      Remove
                                    </Link>
                                  </div>
                                </div>
                              </Col>
                              <Col lg={4} sm={6}>
                                <div className="form-check card-radio">
                                  <Form.Check.Input
                                    id="shippingAddress02"
                                    name="shippingAddress"
                                    type="radio"
                                    className="form-check-input"
                                  />
                                  <Form.Check.Label
                                    className="form-check-label"
                                    htmlFor="shippingAddress02"
                                  >
                                    <span className="mb-4 fw-semibold d-block text-muted text-uppercase">
                                      Office Address
                                    </span>

                                    <span className="fs-14 mb-2 d-block">
                                      James Honda
                                    </span>
                                    <span className="text-muted fw-normal text-wrap mb-1 d-block">
                                      1246 Virgil Street Pensacola, FL 32501
                                    </span>
                                    <span className="text-muted fw-normal d-block">
                                      Mo. 012-345-6789
                                    </span>
                                  </Form.Check.Label>
                                </div>
                                <div className="d-flex flex-wrap p-2 py-1 bg-light rounded-bottom border mt-n1">
                                  <div>
                                    <Link
                                      href="#"
                                      className="d-block text-body p-1 px-2"
                                      onClick={togglemodal}
                                    >
                                      <i className="ri-pencil-fill text-muted align-bottom me-1"></i>
                                      Edit
                                    </Link>
                                  </div>
                                  <div>
                                    <Link
                                      href="#"
                                      className="d-block text-body p-1 px-2"
                                      onClick={toggledeletemodal}
                                    >
                                      <i className="ri-delete-bin-fill text-muted align-bottom me-1"></i>
                                      Remove
                                    </Link>
                                  </div>
                                </div>
                              </Col>
                            </Row>

                            <div className="mt-4">
                              <h5 className="fs-14 mb-3">Shipping Method</h5>

                              <Row className="g-4">
                                <Col lg={6}>
                                  <div className="form-check card-radio">
                                    <Form.Check.Input
                                      id="shippingMethod01"
                                      name="shippingMethod"
                                      type="radio"
                                      className="form-check-input"
                                    />
                                    <Form.Check.Label
                                      className="form-check-label"
                                      htmlFor="shippingMethod01"
                                    >
                                      <span className="fs-20 float-end mt-2 text-wrap d-block fw-semibold">
                                        Free
                                      </span>
                                      <span className="fs-14 mb-1 text-wrap d-block">
                                        Free Delivery
                                      </span>
                                      <span className="text-muted fw-normal text-wrap d-block">
                                        Expected Delivery 3 to 5 Days
                                      </span>
                                    </Form.Check.Label>
                                  </div>
                                </Col>
                                <Col lg={6}>
                                  <div className="form-check card-radio">
                                    <Form.Check.Input
                                      id="shippingMethod02"
                                      name="shippingMethod"
                                      type="radio"
                                      className="form-check-input"
                                      defaultChecked
                                    />
                                    <Form.Check.Label
                                      className="form-check-label"
                                      htmlFor="shippingMethod02"
                                    >
                                      <span className="fs-20 float-end mt-2 text-wrap d-block fw-semibold">
                                        $24.99
                                      </span>
                                      <span className="fs-14 mb-1 text-wrap d-block">
                                        Express Delivery
                                      </span>
                                      <span className="text-muted fw-normal text-wrap d-block">
                                        Delivery within 24hrs.
                                      </span>
                                    </Form.Check.Label>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </div>

                          <div className="d-flex align-items-start gap-3 mt-4">
                            <button
                              type="button"
                              className="btn btn-light btn-label previestab"
                              onClick={() => setactiveTab(1)}
                            >
                              <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                              Back to Personal Info
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary btn-label right ms-auto nexttab"
                              onClick={() => setactiveTab(3)}
                            >
                              <i className="ri-bank-card-line label-icon align-middle fs-16 ms-2"></i>
                              Continue to Payment
                            </button>
                          </div>
                        </Tab.Pane>

                        <Tab.Pane eventKey="3">
                          <div>
                            <h5 className="mb-1">Payment Selection</h5>
                            <p className="text-muted mb-4">
                              Please select and enter your billing information
                            </p>
                          </div>

                          <Row className="g-4">
                            <Col lg={4} sm={6}>
                              <div>
                                <div className="form-check card-radio">
                                  <Form.Check.Input
                                    id="paymentMethod01"
                                    name="paymentMethod"
                                    type="radio"
                                    className="form-check-input"
                                  />
                                  <Form.Check.Label
                                    className="form-check-label"
                                    htmlFor="paymentMethod01"
                                  >
                                    <span className="fs-16 text-muted me-2">
                                      <i className="ri-paypal-fill align-bottom"></i>
                                    </span>
                                    <span className="fs-14 text-wrap">
                                      Paypal
                                    </span>
                                  </Form.Check.Label>
                                </div>
                              </div>
                            </Col>
                            <Col lg={4} sm={6}>
                              <div>
                                <div className="form-check card-radio">
                                  <Form.Check.Input
                                    id="paymentMethod02"
                                    name="paymentMethod"
                                    type="radio"
                                    className="form-check-input"
                                    defaultChecked
                                  />
                                  <Form.Check.Label
                                    className="form-check-label"
                                    htmlFor="paymentMethod02"
                                  >
                                    <span className="fs-16 text-muted me-2">
                                      <i className="ri-bank-card-fill align-bottom"></i>
                                    </span>
                                    <span className="fs-14 text-wrap">
                                      Credit / Debit Card
                                    </span>
                                  </Form.Check.Label>
                                </div>
                              </div>
                            </Col>

                            <Col lg={4} sm={6}>
                              <div>
                                <div className="form-check card-radio">
                                  <Form.Check.Input
                                    id="paymentMethod03"
                                    name="paymentMethod"
                                    type="radio"
                                    className="form-check-input"
                                  />
                                  <Form.Check.Label
                                    className="form-check-label"
                                    htmlFor="paymentMethod03"
                                  >
                                    <span className="fs-16 text-muted me-2">
                                      <i className="ri-money-dollar-box-fill align-bottom"></i>
                                    </span>
                                    <span className="fs-14 text-wrap">
                                      Cash on Delivery
                                    </span>
                                  </Form.Check.Label>
                                </div>
                              </div>
                            </Col>
                          </Row>

                          <div
                            className="collapse show"
                            id="paymentmethodCollapse"
                          >
                            <Card className="p-4 border shadow-none mb-0 mt-4">
                              <Row className="gy-3">
                                <Col md={12}>
                                  <Form.Label htmlFor="cc-name" className="form-label">
                                    Name on card
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="cc-name"
                                    placeholder="Enter name"
                                  />
                                  <small className="text-muted">
                                    Full name as displayed on card
                                  </small>
                                </Col>

                                <Col md={6}>
                                  <Form.Label
                                    htmlFor="cc-number"
                                    className="form-label"
                                  >
                                    Credit card number
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="cc-number"
                                    placeholder="xxxx xxxx xxxx xxxx"
                                  />
                                </Col>

                                <Col md={3}>
                                  <Form.Label
                                    htmlFor="cc-expiration"
                                    className="form-label"
                                  >
                                    Expiration
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="cc-expiration"
                                    placeholder="MM/YY"
                                  />
                                </Col>

                                <Col md={3}>
                                  <Form.Label htmlFor="cc-cvv" className="form-label">
                                    CVV
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="cc-cvv"
                                    placeholder="xxx"
                                  />
                                </Col>
                              </Row>
                            </Card>
                            <div className="text-muted mt-2 fst-italic">
                              <i
                                data-feather="lock"
                                className="text-muted icon-xs"
                              ></i>{" "}
                              Your transaction is secured with SSL encryption
                            </div>
                          </div>

                          <div className="d-flex align-items-start gap-3 mt-4">
                            <button
                              type="button"
                              className="btn btn-light btn-label previestab"
                              onClick={() => setactiveTab(2)}
                            >
                              <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                              Back to Shipping
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary btn-label right ms-auto nexttab"
                              onClick={() => setactiveTab(4)}
                            >
                              <i className="ri-shopping-basket-line label-icon align-middle fs-16 ms-2"></i>
                              Complete Order
                            </button>
                          </div>
                        </Tab.Pane>

                        <Tab.Pane eventKey="4" id="pills-finish">
                          <div className="text-center py-5">
                            <div className="mb-4">
                              <i className="bx bx-party display-4 text-success"></i>
                            </div>
                            <h5>Thank you ! Your Order is Completed !</h5>
                            <p className="text-muted">
                              You will receive an order confirmation email with
                              details of your order.
                            </p>

                            <h3 className="fw-semibold">
                              Order ID:{" "}
                              <a
                                href="apps-ecommerce-order-details"
                                className="text-decoration-underline"
                              >
                                VZ2451
                              </a>
                            </h3>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={4}>
              <Card>
                <Card.Header>
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-0">Order Summary</h5>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="table-responsive table-card">
                    <table className="table table-borderless align-middle mb-0">
                      <thead className="table-light text-muted">
                        <tr>
                          <th style={{ width: "90px" }} scope="col">
                            Product
                          </th>
                          <th scope="col">Product Info</th>
                          <th scope="col" className="text-end">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderSummary.map((product, key) => (
                          <React.Fragment key={key}>
                            <tr>
                              <td>
                                <div className="avatar-md bg-light rounded p-1">
                                  <img
                                    src={product.img}
                                    alt=""
                                    className="img-fluid d-block"
                                  />
                                </div>
                              </td>
                              <td>
                                <h5 className="fs-14">
                                  <Link
                                    href="/apps-ecommerce-product-details"
                                    className="text-body"
                                  >
                                    {product.name}
                                  </Link>
                                </h5>
                                <p className="text-muted mb-0">
                                  $ {product.price} x {product.quantity}
                                </p>
                              </td>
                              <td className="text-end">$ {product.total}</td>
                            </tr>
                          </React.Fragment>
                        ))}

                        <tr>
                          <td className="fw-semibold" colSpan={2}>
                            Sub Total :
                          </td>
                          <td className="fw-semibold text-end">$ 359.96</td>
                        </tr>
                        <tr>
                          <td colSpan={2}>
                            Discount{" "}
                            <span className="text-muted">(VELZON15)</span>:{" "}
                          </td>
                          <td className="text-end">- $ 50.00</td>
                        </tr>
                        <tr>
                          <td colSpan={2}>Shipping Charge :</td>
                          <td className="text-end">$ 24.99</td>
                        </tr>
                        <tr>
                          <td colSpan={2}>Estimated Tax (12%): </td>
                          <td className="text-end">$ 18.20</td>
                        </tr>
                        <tr className="table-active">
                          <th colSpan={2}>Total (USD) :</th>
                          <td className="text-end">
                            <span className="fw-semibold">$353.15</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {/* modal Delete Address */}
      <Modal
        show={deletemodal}
        role="dialog"
        autoFocus={true}
        centered
        id="removeItemModal"
        onHide={toggledeletemodal}
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-2 text-center">
            <i className="ri-delete-bin-5-line display-5 text-danger"></i>
            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
              <h4>Are you sure ?</h4>
              <p className="text-muted mx-4 mb-0">
                Are you Sure You want to Remove this Address ?
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            <button
              type="button"
              className="btn w-sm btn-light"
              onClick={() => {
                setDeleteModal(!deletemodal);
              }}
            >
              Close
            </button>
            <button type="button" className="btn w-sm btn-danger" onClick={() => {
              setDeleteModal(!deletemodal);
            }}>
              Yes, Delete It!
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* modal Add Address */}
      <Modal
        show={modal}
        role="dialog"
        autoFocus={true}
        centered
        id="addAddressModal"
        onHide={togglemodal}
      >
        <Modal.Header closeButton
        >
          <h5 className="modal-title" id="addAddressModalLabel">
            Address
          </h5>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
            <Form.Label htmlFor="addaddress-Name" className="form-label">
                Name
              </Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                id="addaddress-Name"
                placeholder="Enter Name"
              />
            </div>

            <div className="mb-3">
            <Form.Label htmlFor="addaddress-textarea" className="form-label">
                Address
              </Form.Label>
              <textarea
                className="form-control"
                id="addaddress-textarea"
                placeholder="Enter Address"
                rows={2}
              ></textarea>
            </div>

            <div className="mb-3">
            <Form.Label htmlFor="addaddress-Name" className="form-label">
                Phone
              </Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                id="addaddress-Name"
                placeholder="Enter Phone No."
              />
            </div>

            <div className="mb-3">
            <Form.Label htmlFor="state" className="form-label">
                Address Type
              </Form.Label>
              <select className="form-select" id="state" data-plugin="choices">
                <option value="homeAddress">Home (7am to 10pm)</option>
                <option value="officeAddress">Office (11am to 7pm)</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              setModal(!modal);
            }}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              setModal(!modal);
            }}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
EcommerceCheckout.layout = (page: any) => <Layout children={page} />
export default EcommerceCheckout;
