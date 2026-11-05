import React, { useState } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  Nav,
  Row,
  ProgressBar,
  Tab,
  Button,
} from "react-bootstrap";
//Import images
import dummyUser from "../../../../images/users/user-dummy-img.jpg";
import logoDark from "../../../../images/logo-dark.png";
import logoLight from "../../../../images/logo-light.png";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Head } from "@inertiajs/react";
import Layout from "../../../Layouts";

const FormWizard = () => {
  const [activeTab, setactiveTab] = useState<any>(1);
  const [activeArrowTab, setactiveArrowTab] = useState<any>(1);
  const [activeVerticalTab, setactiveVerticalTab] = useState<any>(1);

  return (
    <React.Fragment>
      <Head title="Wizard | Velzon - React Admin & Dashboard Template" />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Forms" pageTitle="Wizard" />
          <Row>
            <Col xl={6}>
              <Card>
                <Card.Header>
                  <h4 className="card-title mb-0">Progress Nav Steps</h4>
                </Card.Header>
                <Card.Body>
                  <Form action="#" className="form-steps">
                    <div className="text-center pt-3 pb-4 mb-1">
                      <h5>Signup Your Account</h5>
                    </div>
                    <Tab.Container activeKey={activeTab}>
                      <div className="progress-nav mb-4">
                        <ProgressBar
                          now={activeTab * 50}
                          style={{ height: "1px" }}
                        />

                        <Nav
                          className="nav-pills progress-bar-tab custom-nav"
                        >
                          <Nav.Item>
                            <Nav.Link
                              eventKey="1"
                              as="button"
                              className="rounded-pill"
                              onClick={() => setactiveTab(1)}
                            >
                              1
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey="2"
                              as="button"
                              className="rounded-pill"
                              onClick={() => setactiveTab(2)}
                            >
                              2
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey="3"
                              as="button"
                              className="rounded-pill"
                              onClick={() => setactiveTab(3)}
                            >
                              3
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </div>

                      <Tab.Content>
                        <Tab.Pane eventKey="1">
                          <div>
                            <div className="mb-4">
                              <div>
                                <h5 className="mb-1">General Information</h5>
                                <p className="text-muted">
                                  Fill all Information as below
                                </p>
                              </div>
                            </div>
                            <Row>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <Form.Label
                                    className="form-label"
                                    htmlFor="gen-info-email-input"
                                  >
                                    Email
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="gen-info-email-input"
                                    placeholder="Enter Email"
                                  />
                                </div>
                              </Col>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <Form.Label
                                    className="form-label"
                                    htmlFor="gen-info-username-input"
                                  >
                                    User Name
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="gen-info-username-input"
                                    placeholder="Enter User Name"
                                  />
                                </div>
                              </Col>
                            </Row>
                            <div className="mb-3">
                              <Form.Label
                                className="form-label"
                                htmlFor="gen-info-password-input"
                              >
                                Password
                              </Form.Label>
                              <Form.Control
                                type="password"
                                className="form-control"
                                id="gen-info-password-input"
                                placeholder="Enter Password"
                              />
                            </div>
                          </div>
                          <div className="d-flex align-items-start gap-3 mt-4">
                            <button
                              type="button"
                              className="btn btn-success btn-label right ms-auto nexttab nexttab"
                              onClick={() => setactiveTab(2)}
                            >
                              <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                              Go to more info
                            </button>
                          </div>
                        </Tab.Pane>

                        <Tab.Pane eventKey="2">
                          <div>
                            <div className="text-center">
                              <div className="profile-user position-relative d-inline-block mx-auto mb-2">
                                <img
                                  src={dummyUser}
                                  className="rounded-circle avatar-lg img-thumbnail user-profile-image"
                                  alt=""
                                />
                                <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                                  <Form.Control
                                    id="profile-img-file-input"
                                    type="file"
                                    className="profile-img-file-input"
                                    accept="image/png, image/jpeg"
                                  />
                                  <Form.Label
                                    htmlFor="profile-img-file-input"
                                    className="profile-photo-edit avatar-xs"
                                  >
                                    <span className="avatar-title rounded-circle bg-light text-body">
                                      <i className="ri-camera-fill"></i>
                                    </span>
                                  </Form.Label>
                                </div>
                              </div>
                              <h5 className="fs-14">Add Image</h5>
                            </div>
                            <div>
                              <Form.Label
                                className="form-label"
                                htmlFor="gen-info-description-input"
                              >
                                Description
                              </Form.Label>
                              <Form.Control
                                type="textarea"
                                className="form-control"
                                placeholder="Enter Description"
                                id="gen-info-description-input"
                              // rows={2}
                              />
                            </div>
                          </div>
                          <div className="d-flex align-items-start gap-3 mt-4">
                            <button
                              type="button"
                              className="btn btn-link text-decoration-none btn-label previestab"
                              onClick={() => setactiveTab(1)}
                            >
                              <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                              Back to General
                            </button>
                            <Button
                              type="button"
                              variant="success"
                              className="btn btn-success btn-label right ms-auto nexttab nexttab"
                              onClick={() => setactiveTab(3)}
                            >
                              <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                              Submit
                            </Button>
                          </div>
                        </Tab.Pane>

                        <Tab.Pane eventKey="3">
                          <div>
                            <div className="text-center">
                              <div className="mb-4">
                                <i className="bx bx-party display-4 text-success"></i>
                              </div>
                              <h5>Well Done !</h5>
                              <p className="text-muted">
                                You have Successfully Signed Up
                              </p>
                            </div>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <Card.Header>
                  <h4 className="card-title mb-0">Arrow Nav Steps</h4>
                </Card.Header>
                <Card.Body>
                  <Form className="form-steps">
                    <div className="text-center pt-3 pb-4 mb-1">
                      <img src={logoDark} className="card-logo mx-auto card-logo-dark" alt="logo dark" height="17" />
                      <img src={logoLight} className="card-logo mx-auto card-logo-light" alt="logo light" height="17" />
                    </div>
                    <Tab.Container activeKey={activeArrowTab}>
                      <div className="step-arrow-nav mb-4">
                        <Nav
                          className="nav-pills custom-nav nav-justified"
                          role="tablist"
                        >
                          <Nav.Item>
                            <Nav.Link
                              eventKey="1"
                              onClick={() => setactiveArrowTab(1)}
                            >
                              General
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey="2"
                              onClick={() => setactiveArrowTab(2)}
                            >
                              Description
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey="3"
                              onClick={() => setactiveArrowTab(3)}
                            >
                              Finish
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </div>

                      <Tab.Content>
                        <Tab.Pane eventKey="1">
                          <div>
                            <Row>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <Form.Label
                                    className="form-label"
                                    htmlFor="steparrow-gen-info-email-input"
                                  >
                                    Email
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="steparrow-gen-info-email-input"
                                    placeholder="Enter Email"
                                  />
                                </div>
                              </Col>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <Form.Label
                                    className="form-label"
                                    htmlFor="steparrow-gen-info-username-input"
                                  >
                                    User Name
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="steparrow-gen-info-username-input"
                                    placeholder="Enter User Name"
                                  />
                                </div>
                              </Col>
                            </Row>
                            <div className="mb-3">
                              <Form.Label
                                className="form-label"
                                htmlFor="steparrow-gen-info-password-input"
                              >
                                Password
                              </Form.Label>
                              <Form.Control
                                type="password"
                                className="form-control"
                                id="steparrow-gen-info-password-input"
                                placeholder="Enter Password"
                              />
                            </div>
                            <div>
                              <Form.Label
                                className="form-label"
                                htmlFor="steparrow-gen-info-confirm-password-input"
                              >
                                Confirm Password
                              </Form.Label>
                              <Form.Control
                                type="password"
                                className="form-control"
                                id="steparrow-gen-info-confirm-password-input"
                                placeholder="Enter Confirm Password"
                              />
                            </div>
                          </div>
                          <div className="d-flex align-items-start gap-3 mt-4">
                            <button
                              type="button"
                              className="btn btn-success btn-label right ms-auto nexttab nexttab"
                              onClick={() => setactiveArrowTab(2)}
                            >
                              <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                              Go to more info
                            </button>
                          </div>
                        </Tab.Pane>

                        <Tab.Pane eventKey="2">
                          <div>
                            <div className="mb-3">
                              <Form.Label htmlFor="formFile" className="form-label">
                                Upload Image
                              </Form.Label>
                              <Form.Control
                                className="form-control"
                                type="file"
                                id="formFile"
                              />
                            </div>
                            <div>
                              <Form.Label
                                className="form-label"
                                htmlFor="des-info-description-input"
                              >
                                Description
                              </Form.Label>
                              <textarea
                                className="form-control"
                                placeholder="Enter Description"
                                id="des-info-description-input"
                                rows={3}
                              ></textarea>
                            </div>
                          </div>
                          <div className="d-flex align-items-start gap-3 mt-4">
                            <button
                              type="button"
                              className="btn btn-light btn-label previestab"
                              onClick={() => setactiveArrowTab(1)}
                            >
                              <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                              Back to General
                            </button>
                            <button
                              type="button"
                              className="btn btn-success btn-label right ms-auto nexttab nexttab"
                              onClick={() => setactiveArrowTab(3)}
                            >
                              <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                              Submit
                            </button>
                          </div>
                        </Tab.Pane>

                        <Tab.Pane eventKey="3">
                          <div className="text-center">
                            <div className="avatar-md mt-5 mb-4 mx-auto">
                              <div className="avatar-title bg-light text-success display-4 rounded-circle">
                                <i className="ri-checkbox-circle-fill"></i>
                              </div>
                            </div>
                            <h5>Well Done !</h5>
                            <p className="text-muted">
                              You have Successfully Signed Up
                            </p>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={12}>
              <Card>
                <Card.Header>
                  <h4 className="card-title mb-0">Vertical nav Steps</h4>
                </Card.Header>
                <Card.Body>
                  <form className="vertical-navs-step form-steps">
                    <Tab.Container activeKey={activeVerticalTab}>
                      <Row className="gy-5">
                        <Col lg={3}>
                          <Nav
                            className="flex-column custom-nav nav-pills"
                          >
                            <Nav.Item>
                              <Nav.Link
                                eventKey="1"
                                onClick={() => setactiveVerticalTab(1)}
                                className="nav-link done"
                              >
                                <span className="step-title me-2">
                                  <i className="ri-close-circle-fill step-icon me-2"></i>
                                  Step 1
                                </span>
                                Billing Info
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link
                                className={activeVerticalTab > 2 ? "nav-link done" : "nav-link"} eventKey="2" onClick={() => setactiveVerticalTab(2)}
                              >
                                <span className="step-title me-2">
                                  <i className="ri-close-circle-fill step-icon me-2"></i>
                                  Step 2
                                </span>
                                Address
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link className={activeVerticalTab > 3 ? "nav-link done" : "nav-link"} eventKey="3" onClick={() => setactiveVerticalTab(3)}
                              >
                                <span className="step-title me-2">
                                  <i className="ri-close-circle-fill step-icon me-2"></i>
                                  Step 3
                                </span>
                                Payment
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link className={activeVerticalTab > 4 ? "nav-link done" : "nav-link"} eventKey="4" onClick={() => setactiveVerticalTab(4)}
                              >
                                <span className="step-title me-2">
                                  <i className="ri-close-circle-fill step-icon me-2"></i>
                                  Step 4
                                </span>
                                Finish
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>
                        <Col lg={6}>
                          <div className="px-lg-4">
                            <Tab.Content >
                              <Tab.Pane eventKey="1">
                                <div>
                                  <h5>Billing Info</h5>
                                  <p className="text-muted">
                                    Fill all information below
                                  </p>
                                </div>

                                <div>
                                  <Row className="g-3">
                                    <Col sm={6}>
                                      <Form.Label
                                        htmlFor="firstName"
                                        className="form-label"
                                      >
                                        First name
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        placeholder="Enter First Name"
                                        defaultValue=""
                                      />
                                    </Col>

                                    <Col sm={6}>
                                      <Form.Label
                                        htmlFor="lastName"
                                        className="form-label"
                                      >
                                        Last name
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        placeholder="Enter Last Name"
                                        defaultValue=""
                                      />
                                    </Col>

                                    <Col xs={12}>
                                      <Form.Label
                                        htmlFor="username"
                                        className="form-label"
                                      >
                                        Username
                                      </Form.Label>
                                      <div className="input-group">
                                        <span className="input-group-text">
                                          @
                                        </span>
                                        <Form.Control
                                          type="text"
                                          className="form-control"
                                          id="username"
                                          placeholder="Username"
                                        />
                                      </div>
                                    </Col>

                                    <Col xs={12}>
                                      <Form.Label
                                        htmlFor="email"
                                        className="form-label"
                                      >
                                        Email{" "}
                                        <span className="text-muted">
                                          (Optional)
                                        </span>
                                      </Form.Label>
                                      <Form.Control
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter Email"
                                      />
                                    </Col>
                                  </Row>
                                </div>

                                <div className="d-flex align-items-start gap-3 mt-4">
                                  <button
                                    type="button"
                                    className="btn btn-success btn-label right ms-auto nexttab nexttab"
                                    onClick={() => setactiveVerticalTab(2)}
                                  >
                                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                    Go to Shipping
                                  </button>
                                </div>
                              </Tab.Pane>

                              <Tab.Pane eventKey="2">
                                <div>
                                  <h5>Shipping Address</h5>
                                  <p className="text-muted">
                                    Fill all information below
                                  </p>
                                </div>

                                <div>
                                  <Row className="g-3">
                                    <Col xs={12}>
                                      <Form.Label
                                        htmlFor="address"
                                        className="form-label"
                                      >
                                        Address
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        placeholder="1234 Main St"
                                      />
                                    </Col>

                                    <Col xs={12}>
                                      <Form.Label
                                        htmlFor="address2"
                                        className="form-label"
                                      >
                                        Address 2{" "}
                                        <span className="text-muted">
                                          (Optional)
                                        </span>
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="address2"
                                        placeholder="Apartment or suite"
                                      />
                                    </Col>

                                    <Col md={5}>
                                      <Form.Label
                                        htmlFor="country"
                                        className="form-label"
                                      >
                                        Country
                                      </Form.Label>
                                      <select
                                        className="form-select"
                                        id="country"
                                      >
                                        <option defaultValue="">Choose...</option>
                                        <option>United States</option>
                                      </select>
                                    </Col>

                                    <Col md={4}>
                                      <Form.Label
                                        htmlFor="state"
                                        className="form-label"
                                      >
                                        State
                                      </Form.Label>
                                      <select className="form-select" id="state">
                                        <option defaultValue="">Choose...</option>
                                        <option>California</option>
                                      </select>
                                    </Col>

                                    <Col md={3}>
                                      <Form.Label htmlFor="zip" className="form-label">
                                        Zip
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="zip"
                                        placeholder=""
                                      />
                                    </Col>
                                  </Row>

                                  <hr className="my-4 text-muted" />

                                  <div className="form-check mb-2">
                                    <Form.Check.Input
                                      type="checkbox"
                                      className="form-check-input"
                                      id="same-address"
                                    />
                                    <Form.Check.Label
                                      className="form-check-label"
                                      htmlFor="same-address"
                                    >
                                      Shipping address is the same as my billing
                                      address
                                    </Form.Check.Label>
                                  </div>

                                  <div className="form-check">
                                    <Form.Check.Input
                                      type="checkbox"
                                      className="form-check-input"
                                      id="save-info"
                                    />
                                    <Form.Check.Label
                                      className="form-check-label"
                                      htmlFor="save-info"
                                    >
                                      Save this information for next time
                                    </Form.Check.Label>
                                  </div>
                                </div>
                                <div className="d-flex align-items-start gap-3 mt-4">
                                  <button
                                    type="button"
                                    className="btn btn-light btn-label previestab"
                                    onClick={() => setactiveVerticalTab(1)}
                                  >
                                    <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                    Back to Billing Info
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-success btn-label right ms-auto nexttab"
                                    onClick={() => setactiveVerticalTab(3)}
                                  >
                                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                    Go to Payment
                                  </button>
                                </div>
                              </Tab.Pane>

                              <Tab.Pane eventKey="3">
                                <div>
                                  <h5>Payment</h5>
                                  <p className="text-muted">
                                    Fill all information below
                                  </p>
                                </div>

                                <div>
                                  <div className="my-3">
                                    <div className="form-check form-check-inline">
                                      <Form.Check.Input
                                        id="credit"
                                        name="paymentMethod"
                                        type="radio"
                                        className="form-check-input"
                                        defaultChecked
                                        required
                                      />
                                      <Form.Check.Label
                                        className="form-check-label"
                                        htmlFor="credit"
                                      >
                                        Credit card
                                      </Form.Check.Label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <Form.Check.Input
                                        id="debit"
                                        name="paymentMethod"
                                        type="radio"
                                        className="form-check-input"
                                        required
                                      />
                                      <Form.Check.Label
                                        className="form-check-label"
                                        htmlFor="debit"
                                      >
                                        Debit card
                                      </Form.Check.Label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <Form.Check.Input
                                        id="paypal"
                                        name="paymentMethod"
                                        type="radio"
                                        className="form-check-input"
                                        required
                                      />
                                      <Form.Check.Label
                                        className="form-check-label"
                                        htmlFor="paypal"
                                      >
                                        PayPal
                                      </Form.Check.Label>
                                    </div>
                                  </div>

                                  <Row className="gy-3">
                                    <Col md={12}>
                                      <Form.Label
                                        htmlFor="cc-name"
                                        className="form-label"
                                      >
                                        Name on card
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="cc-name"
                                        placeholder=""
                                        required
                                      />
                                      <small className="text-muted">
                                        Full name as displayed on card
                                      </small>
                                      <div className="invalid-feedback">
                                        Name on card is required
                                      </div>
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
                                        placeholder=""
                                        required
                                      />
                                      <div className="invalid-feedback">
                                        Credit card number is required
                                      </div>
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
                                        placeholder=""
                                        required
                                      />
                                      <div className="invalid-feedback">
                                        Expiration date required
                                      </div>
                                    </Col>

                                    <Col md={3}>
                                      <Form.Label
                                        htmlFor="cc-cvv"
                                        className="form-label"
                                      >
                                        CVV
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="cc-cvv"
                                        placeholder=""
                                        required
                                      />
                                      <div className="invalid-feedback">
                                        Security code required
                                      </div>
                                    </Col>
                                  </Row>
                                </div>

                                <div className="d-flex align-items-start gap-3 mt-4">
                                  <button
                                    type="button"
                                    className="btn btn-light btn-label previestab"
                                    onClick={() => setactiveVerticalTab(2)}
                                  >
                                    <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                    Back to Shipping Info
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-success btn-label right ms-auto nexttab"
                                    onClick={() => setactiveVerticalTab(4)}
                                  >
                                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>{" "}
                                    Order Complete
                                  </button>
                                </div>
                              </Tab.Pane>

                              <Tab.Pane eventKey="4">
                                <div className="text-center pt-4 pb-2">
                                  <div className="mb-4">
                                    <i className="bx bx-party display-4 text-success"></i>
                                  </div>
                                  <h5>Your Order is Completed !</h5>
                                  <p className="text-muted">
                                    You Will receive an order confirmation email
                                    with details of your order.
                                  </p>
                                </div>
                              </Tab.Pane>
                            </Tab.Content>
                          </div>
                        </Col>
                        <Col lg={3}>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="fs-14 text-primary mb-0">
                              <i className="ri-shopping-cart-fill align-middle me-2"></i>{" "}
                              Your cart
                            </h5>
                            <span className="badge bg-danger rounded-pill">
                              3
                            </span>
                          </div>
                          <ul className="list-group mb-3">
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                              <div>
                                <h6 className="my-0">Product name</h6>
                                <small className="text-muted">
                                  Brief description
                                </small>
                              </div>
                              <span className="text-muted">$12</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                              <div>
                                <h6 className="my-0">Second product</h6>
                                <small className="text-muted">
                                  Brief description
                                </small>
                              </div>
                              <span className="text-muted">$8</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                              <div>
                                <h6 className="my-0">Third item</h6>
                                <small className="text-muted">
                                  Brief description
                                </small>
                              </div>
                              <span className="text-muted">$5</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between bg-light">
                              <div className="text-success">
                                <h6 className="my-0">Discount code</h6>
                                <small>−$5 Discount</small>
                              </div>
                              <span className="text-success">−$5</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                              <span>Total (USD)</span>
                              <strong>$20</strong>
                            </li>
                          </ul>
                        </Col>

                      </Row>
                    </Tab.Container>
                  </form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
FormWizard.layout = (page: any) => <Layout children={page} />
export default FormWizard;
