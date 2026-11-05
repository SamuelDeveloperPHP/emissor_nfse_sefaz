import React from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Accordion,
} from "react-bootstrap";


import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { productDetails } from "../../../common/data/ecommerce";
import EcommerceOrderProduct from "./EcommerceOrderProduct";
import avatar3 from "../../../../images/users/avatar-3.jpg";
import Layout from "../../../Layouts";
import { Head, Link } from "@inertiajs/react";
const EcommerceOrderDetail = () => {
  return (
    <React.Fragment>
      <Head title="Order Details | Velzon - React Admin & Dashboard Template" />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Order Details" pageTitle="Ecommerce" />

          <Row>
            <Col xl={9}>
              <Card>
                <Card.Header>
                  <div className="d-flex align-items-center">
                    <h5 className="card-title flex-grow-1 mb-0">Order #VL2667</h5>
                    <div className="flex-shrink-0">
                      <Link
                        href="/apps-invoices-details"
                        className="btn btn-success btn-sm"
                      >
                        <i className="ri-download-2-fill align-middle me-1"></i>{" "}
                        Invoice
                      </Link>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="table-responsive table-card">
                    <table className="table table-nowrap align-middle table-borderless mb-0">
                      <thead className="table-light text-muted">
                        <tr>
                          <th scope="col">Product Details</th>
                          <th scope="col">Item Price</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Rating</th>
                          <th scope="col" className="text-end">
                            Total Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {productDetails.map((product, key) => (
                          <EcommerceOrderProduct product={product} key={key} />
                        ))}
                        <tr className="border-top border-top-dashed">
                          <td colSpan={3}></td>
                          <td colSpan={2} className="fw-medium p-0">
                            <table className="table table-borderless mb-0">
                              <tbody>
                                <tr>
                                  <td>Sub Total :</td>
                                  <td className="text-end">$359.96</td>
                                </tr>
                                <tr>
                                  <td>
                                    Discount{" "}
                                    <span className="text-muted">(VELZON15)</span>{" "}
                                    : :
                                  </td>
                                  <td className="text-end">-$53.99</td>
                                </tr>
                                <tr>
                                  <td>Shipping Charge :</td>
                                  <td className="text-end">$65.00</td>
                                </tr>
                                <tr>
                                  <td>Estimated Tax :</td>
                                  <td className="text-end">$44.99</td>
                                </tr>
                                <tr className="border-top border-top-dashed">
                                  <th scope="row">Total (USD) :</th>
                                  <th className="text-end">$415.96</th>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header>
                  <div className="d-sm-flex align-items-center">
                    <h5 className="card-title flex-grow-1 mb-0">Order Status</h5>
                    <div className="flex-shrink-0 mt-2 mt-sm-0">
                      <Link
                        href="#"
                        className="btn btn-soft-info btn-sm mt-2 mt-sm-0"
                      >
                        <i className="ri-map-pin-line align-middle me-1"></i>{" "}
                        Change Address
                      </Link>{" "}
                      <Link
                        href="#"
                        className="btn btn-soft-danger btn-sm mt-2 mt-sm-0"
                      >
                        <i className="mdi mdi-archive-remove-outline align-middle me-1"></i>{" "}
                        Cancel Order
                      </Link>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="profile-timeline">
                    <Accordion
                      defaultActiveKey={["1", "2", "3"]}
                      className="accordion-flush"
                      id="accordionFlushExample"
                      flush
                    >
                      <Accordion.Item eventKey="1" className="border-0" >
                        <Accordion.Button className="p-2 shadow-none">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 avatar-xs">
                              <div className="avatar-title bg-success rounded-circle">
                                <i className="ri-shopping-bag-line"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="fs-15 mb-0 fw-semibold">
                                Order Placed -{" "}
                                <span className="fw-normal">
                                  Wed, 15 Dec 2021
                                </span>
                              </h6>
                            </div>
                          </div>
                        </Accordion.Button>
                        <Accordion.Body className="ms-2 ps-5 pt-0">
                          <h6 className="mb-1">An order has been placed.</h6>
                          <p className="text-muted">
                            Wed, 15 Dec 2021 - 05:34PM
                          </p>

                          <h6 className="mb-1">
                            Seller has proccessed your order.
                          </h6>
                          <p className="text-muted mb-0">
                            Thu, 16 Dec 2021 - 5:48AM
                          </p>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2" className="border-0">
                        <Accordion.Button className="p-2 shadow-none">

                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 avatar-xs">
                              <div className="avatar-title bg-success rounded-circle">
                                <i className="mdi mdi-gift-outline"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="fs-15 mb-1 fw-semibold">
                                Packed -{" "}
                                <span className="fw-normal">
                                  Thu, 16 Dec 2021
                                </span>
                              </h6>
                            </div>
                          </div>
                        </Accordion.Button>
                        <Accordion.Body className="ms-2 ps-5 pt-0">
                          <h6 className="mb-1">
                            Your Item has been picked up by courier patner
                          </h6>
                          <p className="text-muted mb-0">
                            Fri, 17 Dec 2021 - 9:45AM
                          </p>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="3" className="border-0">
                        <Accordion.Button
                          className="p-2" >
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 avatar-xs">
                              <div className="avatar-title bg-success rounded-circle">
                                <i className="ri-truck-line"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="fs-15 mb-1 fw-semibold">
                                Shipping -{" "}
                                <span className="fw-normal">
                                  Thu, 16 Dec 2021
                                </span>
                              </h6>
                            </div>
                          </div>

                        </Accordion.Button>
                        <Accordion.Body className="ms-2 ps-5 pt-0">
                          <h6 className="fs-14">
                            RQK Logistics - MFDS1400457854
                          </h6>
                          <h6 className="mb-1">Your item has been shipped.</h6>
                          <p className="text-muted mb-0">
                            Sat, 18 Dec 2021 - 4.54PM
                          </p>

                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="4" className="border-0">
                        <Accordion.Header id="headingFour">
                          <a href="#"
                            className="accordion-button p-2 shadow-none"
                          >
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 avatar-xs">
                                <div className="avatar-title bg-light text-success rounded-circle">
                                  <i className="ri-takeaway-fill"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6 className="fs-14 mb-0 fw-semibold">
                                  Out For Delivery
                                </h6>
                              </div>
                            </div>
                          </a>
                        </Accordion.Header>
                      </Accordion.Item>
                      <Accordion.Item eventKey="5" className="border-0">
                        <Accordion.Header id="headingFive">
                          <a
                            className="accordion-button p-2 shadow-none"
                            href="#"
                          >
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 avatar-xs">
                                <div className="avatar-title bg-light text-success rounded-circle">
                                  <i className="mdi mdi-package-variant"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6 className="fs-14 mb-0 fw-semibold">
                                  Delivered
                                </h6>
                              </div>
                            </div>
                          </a>
                        </Accordion.Header>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={3}>
              <Card>
                <Card.Header>
                  <div className="d-flex">
                    <h5 className="card-title flex-grow-1 mb-0">
                      <i className="mdi mdi-truck-fast-outline align-middle me-1 text-muted"></i>
                      Logistics Details
                    </h5>
                    <div className="flex-shrink-0">
                      <Link href="#" className="badge bg-primary-subtle text-primary fs-11">
                        Track Order
                      </Link>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="text-center">
                    <i className="ri-truck-line display-5 text-danger"></i>
                    <h5 className="fs-16 mt-2">RQK Logistics</h5>
                    <p className="text-muted mb-0">ID: MFDS1400457854</p>
                    <p className="text-muted mb-0">Payment Mode : Debit Card</p>
                  </div>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header>
                  <div className="d-flex">
                    <h5 className="card-title flex-grow-1 mb-0">
                      Customer Details
                    </h5>
                    <div className="flex-shrink-0">
                      <Link href="#" className="link-secondary">
                        View Profile
                      </Link>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <ul className="list-unstyled mb-0 vstack gap-3">
                    <li>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <img
                            src={avatar3}
                            alt=""
                            className="avatar-sm rounded"
                          />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="fs-14 mb-1">Joseph Parkers</h6>
                          <p className="text-muted mb-0">Customer</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <i className="ri-mail-line me-2 align-middle text-muted fs-16"></i>
                      josephparker@gmail.com
                    </li>
                    <li>
                      <i className="ri-phone-line me-2 align-middle text-muted fs-16"></i>
                      +(256) 245451 441
                    </li>
                  </ul>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header>
                  <h5 className="card-title mb-0">
                    <i className="ri-map-pin-line align-middle me-1 text-muted"></i>{" "}
                    Billing Address
                  </h5>
                </Card.Header>
                <Card.Body>
                  <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                    <li className="fw-medium fs-14">Joseph Parker</li>
                    <li>+(256) 245451 451</li>
                    <li>2186 Joyce Street Rocky Mount</li>
                    <li>New York - 25645</li>
                    <li>United States</li>
                  </ul>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header>
                  <h5 className="card-title mb-0">
                    <i className="ri-map-pin-line align-middle me-1 text-muted"></i>{" "}
                    Shipping Address
                  </h5>
                </Card.Header>
                <Card.Body>
                  <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                    <li className="fw-medium fs-14">Joseph Parker</li>
                    <li>+(256) 245451 451</li>
                    <li>2186 Joyce Street Rocky Mount</li>
                    <li>California - 24567</li>
                    <li>United States</li>
                  </ul>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header>
                  <h5 className="card-title mb-0">
                    <i className="ri-secure-payment-line align-bottom me-1 text-muted"></i>{" "}
                    Payment Details
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex align-items-center mb-2">
                    <div className="flex-shrink-0">
                      <p className="text-muted mb-0">Transactions:</p>
                    </div>
                    <div className="flex-grow-1 ms-2">
                      <h6 className="mb-0">#VLZ124561278124</h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <div className="flex-shrink-0">
                      <p className="text-muted mb-0">Payment Method:</p>
                    </div>
                    <div className="flex-grow-1 ms-2">
                      <h6 className="mb-0">Debit Card</h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <div className="flex-shrink-0">
                      <p className="text-muted mb-0">Card Holder Name:</p>
                    </div>
                    <div className="flex-grow-1 ms-2">
                      <h6 className="mb-0">Joseph Parker</h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <div className="flex-shrink-0">
                      <p className="text-muted mb-0">Card Number:</p>
                    </div>
                    <div className="flex-grow-1 ms-2">
                      <h6 className="mb-0">xxxx xxxx xxxx 2456</h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0">
                      <p className="text-muted mb-0">Total Amount:</p>
                    </div>
                    <div className="flex-grow-1 ms-2">
                      <h6 className="mb-0">$415.96</h6>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment >
  );
};
EcommerceOrderDetail.layout = (page: any) => <Layout children={page} />
export default EcommerceOrderDetail;