import React, { useEffect, useState } from "react";
//Import Flatepicker
import Flatpickr from "react-flatpickr";

//Import Breadcrumb
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import {
  Container,
  Card,
  Row,
  Col,
  Modal,
  Nav,
  Form,
  Tab,
  Button,
} from "react-bootstrap";
import { isEmpty } from "lodash";
import Select from "react-select";

//redux
import { useSelector, useDispatch } from "react-redux";
import SellerChats from "./SellerChats";
import { createSelector } from "reselect";
import { Head, Link } from "@inertiajs/react";
import Layout from "../../../Layouts";
import { onGetSellers } from "../../../slices/thunk";

const EcommerceSellers = () => {
  const dispatch: any = useDispatch();
  const [sellerList, setSellerList] = useState<any>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [companyType, setcompanyType] = useState<any>(null);

  const selectsellerData = createSelector(
    (state: any) => state.Ecommerce,
    (sellers: any) => sellers.sellers
  );
  // Inside your component
  const sellers: any = useSelector(selectsellerData);

  useEffect(() => {
    setSellerList(sellers);
  }, [sellers]);

  useEffect(() => {
    dispatch(onGetSellers());
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(sellers)) setSellerList(sellers);
  }, [sellers]);

  const toggle = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  //Tab
  const [activeTab, setActiveTab] = useState<any>("1");
  const toggleTab = (tab: any) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const companytypes = [
    {
      options: [
        { label: "Select type", value: "Select type" },
        { label: "All", value: "All" },
        { label: "Merchandising", value: "Merchandising" },
        { label: "Manufacturing", value: "Manufacturing" },
        { label: "Partnership", value: "Partnership" },
        { label: "Corporation", value: "Corporation" },
      ],
    },
  ];

  function handlecompanyType(companyType: any) {
    setcompanyType(companyType);
  }

  const category = (e: any) => {
    if (e === "All") {
      var filter = sellers.filter((item: any) => item.category !== e);
    } else {
      filter = sellers.filter((item: any) => item.category === e);
    }
    setSellerList(filter);
  };

  return (
    <React.Fragment>
      <Head title="Sellers | Velzon - React Admin & Dashboard Template" />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Sellers" pageTitle="Ecommerce" />
          <Card>
            <Card.Header className="border-0 rounded">
              <Row className="g-2">
                <Col xl={3}>
                  <div className="search-box">
                    <Form.Control
                      type="text"
                      className="form-control search"
                      placeholder="Search for sellers & owner name or something..."
                    />{" "}
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </Col>
                <Col xxl={3} className="ms-auto">
                  <div>
                    <select className="form-control"
                      onChange={(e) => category(e.target.value)}
                    >
                      <option value="All">Select Categories</option>
                      <option value="All">All</option>
                      <option value="Retailer">Retailer</option>
                      <option value="Health & Medicine">
                        Health & Medicine
                      </option>
                      <option value="Manufacturer">Manufacturer</option>
                      <option value="Food Service">Food Service</option>
                      <option value="Computers & Electronics">
                        Computers & Electronics
                      </option>
                    </select>
                  </div>
                </Col>
                <div className="col-lg-auto">
                  <div className="hstack gap-2">
                    <button type="button" className="btn btn-danger">
                      <i className="ri-equalizer-fill me-1 align-bottom"></i>{" "}
                      Filters
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        setModal(true);
                      }}
                    >
                      <i className="ri-add-fill me-1 align-bottom"></i> Add
                      Seller
                    </button>
                  </div>
                </div>
              </Row>
            </Card.Header>
          </Card>

          <Row className="mt-4">
            {sellerList.map((seller: any, key: any) => (
              <React.Fragment key={key}>
                <Col xl={3} lg={6}>
                  <Card className="ribbon-box right overflow-hidden">
                    <Card.Body className="text-center p-4">
                      {seller.isTrending && (
                        <div className="ribbon ribbon-info ribbon-shape trending-ribbon">
                          <i className="ri-flashlight-fill text-white align-bottom"></i>{" "}
                          <span className="trending-ribbon-text">Trending</span>
                        </div>
                      )}
                      <img src={seller.img} alt="" height="45" />
                      <h5 className="mb-1 mt-4">
                        <Link
                          href="/apps-ecommerce-seller-details"
                          className="text-reset"
                        >
                          {seller.label}
                        </Link>
                      </h5>
                      <p className="text-muted mb-4">{seller.name}</p>
                      <Row className="justify-content-center">
                        <Col lg={8}>
                          <SellerChats
                            color={seller.color}
                            data={seller.chartdata}
                          />
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col lg={6} className="border-end-dashed border-end">
                          <h5>{seller.stock}</h5>
                          <span className="text-muted">Item Stock</span>
                        </Col>
                        <Col lg={6}>
                          <h5>{seller.balance}</h5>
                          <span className="text-muted">Wallet Balance</span>
                        </Col>
                      </Row>
                      <div className="mt-4">
                        <Link
                          href="/apps-ecommerce-seller-details"
                          className="btn btn-light w-100"
                        >
                          View Details
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </React.Fragment>
            ))}
          </Row>

          <Row className="g-0 text-center text-sm-start align-items-center mb-3">
            <Col sm={6}>
              <div>
                <p className="mb-sm-0">Showing 1 to 8 of 12 entries</p>
              </div>
            </Col>
            <Col sm={6}>
              <ul className="pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
                <li className="page-item disabled">
                  {" "}
                  <Button variant="link" className="page-link">
                    <i className="mdi mdi-chevron-left"></i>
                  </Button>{" "}
                </li>
                <li className="page-item active">
                  {" "}
                  <Button variant="link" className="page-link">
                    1
                  </Button>{" "}
                </li>
                <li className="page-item ">
                  {" "}
                  <Button variant="link" className="page-link">
                    2
                  </Button>{" "}
                </li>
                <li className="page-item">
                  {" "}
                  <Button variant="link" className="page-link">
                    3
                  </Button>{" "}
                </li>
                <li className="page-item">
                  {" "}
                  <Button variant="link" className="page-link">
                    4
                  </Button>{" "}
                </li>
                <li className="page-item">
                  {" "}
                  <Button variant="link" className="page-link">
                    5
                  </Button>{" "}
                </li>
                <li className="page-item">
                  {" "}
                  <Button variant="link" className="page-link">
                    <i className="mdi mdi-chevron-right"></i>
                  </Button>{" "}
                </li>
              </ul>
            </Col>
          </Row>

          <Modal
            dialogClassName="zoomIn"
            id="addSeller"
            size="lg"
            show={modal}
            onHide={toggle}
            centered
          >
            <Tab.Container defaultActiveKey="1">
              <Modal.Header closeButton>
                <h5 className="modal-title">Add Seller</h5>
              </Modal.Header>
              <div className="modal-content border-0 mt-3">
                <Nav className="nav-tabs nav-tabs-custom nav-success p-2 pb-0 bg-light">
                  <Nav.Item>
                    <Nav.Link
                      href="#"
                      eventKey="1"
                    >
                      Personal Details
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      href="#"
                      eventKey="2"
                    >
                      Business Details
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      href="#"
                      eventKey="3"
                    >
                      Bank Details
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <Modal.Body>
                <Tab.Content>
                  <Tab.Pane eventKey="1">
                    <Form action="#">
                      <Row>
                        <Col lg={6}>
                          <div className="mb-3">
                          <Form.Label htmlFor="firstnameInput" className="form-label">
                            First Name
                          </Form.Label>
                          <Form.Control
                              type="text"
                              className="form-control"
                              id="firstnameInput"
                              placeholder="Enter your firstname"
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                          <Form.Label htmlFor="lastnameInput" className="form-label">
                            Last Name
                          </Form.Label>
                          <Form.Control
                              type="text"
                              className="form-control"
                              id="lastnameInput"
                              placeholder="Enter your lastname"
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                          <Form.Label
                            htmlFor="contactnumberInput"
                            className="form-label"
                          >
                            Contact Number
                          </Form.Label>
                          <Form.Control
                              type="number"
                              className="form-control"
                              id="contactnumberInput"
                              placeholder="Enter your number"
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                          <Form.Label htmlFor="phonenumberInput" className="form-label">
                            Phone Number
                          </Form.Label>
                          <Form.Control
                              type="number"
                              className="form-control"
                              id="phonenumberInput"
                              placeholder="Enter your number"
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                          <Form.Label htmlFor="emailidInput" className="form-label">
                            Email
                          </Form.Label>
                          <Form.Control
                              type="email"
                              className="form-control"
                              id="emailidInput"
                              placeholder="Enter your email"
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                          <Form.Label htmlFor="birthdayidInput" className="form-label">
                            Date of Birth
                          </Form.Label>
                            <Flatpickr
                              className="form-control"
                              options={{
                                dateFormat: "d M, Y"
                              }}
                              placeholder="Select Date"
                            />
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                          <Form.Label htmlFor="cityidInput" className="form-label">
                            City
                          </Form.Label>
                          <Form.Control
                              type="text"
                              className="form-control"
                              id="cityidInput"
                              placeholder="Enter your city"
                            />
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                          <Form.Label htmlFor="countryidInput" className="form-label">
                            Country
                          </Form.Label>
                          <Form.Control
                              type="text"
                              className="form-control"
                              id="countryidInput"
                              placeholder="Enter your country"
                            />
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                          <Form.Label htmlFor="zipcodeidInput" className="form-label">
                            Zip Code
                          </Form.Label>
                          <Form.Control
                              type="text"
                              className="form-control"
                              id="zipcodeidInput"
                              placeholder="Enter your zipcode"
                            />
                          </div>
                        </Col>
                        <Col lg={12}>
                          <div className="mb-3">
                          <Form.Label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label"
                          >
                            Description
                          </Form.Label>
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows={3}
                              placeholder="Enter description"
                            ></textarea>
                          </div>
                        </Col>
                        <Col lg={12}>
                          <div className="hstack gap-2 justify-content-end">
                            <button
                              className="btn btn-link link-success text-decoration-none fw-medium"
                              data-bs-dismiss="modal"
                            >
                              <i className="ri-close-line me-1 align-middle"></i>{" "}
                              Close
                            </button>
                            <button type="submit" className="btn btn-primary">
                              <i className="ri-save-3-line align-bottom me-1"></i>{" "}
                              Save
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </Tab.Pane>
                  <Tab.Pane eventKey="2">
                    <form action="#">
                      <Row>
                        <Col lg={12}>
                          <div className="mb-3">
                          <Form.Label htmlFor="companynameInput" className="form-label">
                            Company Name
                          </Form.Label>
                          <Form.Control
                              type="text"
                              className="form-control"
                              id="companynameInput"
                              placeholder="Enter your company name"
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                          <Form.Label
                            htmlFor="choices-single-default"
                            className="form-label"
                          >
                            Company Type
                          </Form.Label>
                            <Select
                              name="choices-single-default"
                              id="choices-single-default"
                              value={companyType}
                              onChange={(companyType: any) => {
                                handlecompanyType(companyType);
                              }}
                              options={companytypes}
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                          <Form.Label htmlFor="pancardInput" className="form-label">
                            Pan Card Number
                          </Form.Label>
                          <Form.Control
                              type="text"
                              className="form-control"
                              id="pancardInput"
                              placeholder="Enter your pan-card number"
                            />
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                          <Form.Label htmlFor="websiteInput" className="form-label">
                            Website
                          </Form.Label>
                          <Form.Control
                              type="url"
                              className="form-control"
                              id="websiteInput"
                              placeholder="Enter your URL"
                            />
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                          <Form.Label htmlFor="faxInput" className="form-label">
                            Fax
                          </Form.Label>
                          <Form.Control
                              type="text"
                              className="form-control"
                              id="faxInput"
                              placeholder="Enter your fax"
                            />
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                          <Form.Label htmlFor="companyemailInput" className="form-label">
                            Email
                          </Form.Label>
                          <Form.Control
                              type="email"
                              className="form-control"
                              id="companyemailInput"
                              placeholder="Enter your email"
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                          <Form.Label htmlFor="worknumberInput" className="form-label">
                            Number
                          </Form.Label>
                          <Form.Control
                              type="number"
                              className="form-control"
                              id="worknumberInput"
                              placeholder="Enter your number"
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                          <Form.Label htmlFor="companylogoInput" className="form-label">
                            Company Logo
                          </Form.Label>
                          <Form.Control
                              type="file"
                              className="form-control"
                              id="companylogoInput"
                            />
                          </div>
                        </Col>
                        <Col lg={12}>
                          <div className="hstack gap-2 justify-content-end">
                            <button
                              className="btn btn-link link-success text-decoration-none fw-medium"
                              data-bs-dismiss="modal"
                            >
                              <i className="ri-close-line me-1 align-middle"></i>{" "}
                              Close
                            </button>
                            <button type="submit" className="btn btn-primary">
                              <i className="ri-save-3-line align-bottom me-1"></i>{" "}
                              Save
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </form>
                  </Tab.Pane>
                  <Tab.Pane eventKey="3">
                    <form action="#">
                      <div className="row">
                        <Col lg={6}>
                          <div className="mb-3">
                          <Form.Label htmlFor="banknameInput" className="form-label">
                            Bank Name
                          </Form.Label>
                          <Form.Control
                              type="text"
                              className="form-control"
                              id="banknameInput"
                              placeholder="Enter your bank name"
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                          <Form.Label htmlFor="branchInput" className="form-label">
                            Branch
                          </Form.Label>
                          <Form.Control
                              type="text"
                              className="form-control"
                              id="branchInput"
                              placeholder="Branch"
                            />
                          </div>
                        </Col>
                        <Col lg={12}>
                          <div className="mb-3">
                          <Form.Label htmlFor="accountnameInput" className="form-label">
                            Account Holder Name
                          </Form.Label>
                          <Form.Control
                              type="text"
                              className="form-control"
                              id="accountnameInput"
                              placeholder="Enter account holder name"
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                          <Form.Label
                            htmlFor="accountnumberInput"
                            className="form-label"
                          >
                            Account Number
                          </Form.Label>
                          <Form.Control
                              type="number"
                              className="form-control"
                              id="accountnumberInput"
                              placeholder="Enter account number"
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                          <Form.Label htmlFor="ifscInput" className="form-label">
                            IFSC
                          </Form.Label>
                          <Form.Control
                              type="number"
                              className="form-control"
                              id="ifscInput"
                              placeholder="IFSC"
                            />
                          </div>
                        </Col>
                        <Col lg={12}>
                          <div className="hstack gap-2 justify-content-end">
                            <button
                              className="btn btn-link link-success text-decoration-none fw-medium"
                              data-bs-dismiss="modal"
                            >
                              <i className="ri-close-line me-1 align-middle"></i>{" "}
                              Close
                            </button>
                            <button type="submit" className="btn btn-primary">
                              <i className="ri-save-3-line align-bottom me-1"></i>{" "}
                              Save
                            </button>
                          </div>
                        </Col>
                      </div>
                    </form>
                  </Tab.Pane>
                </Tab.Content>
              </Modal.Body>
              </Tab.Container>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};
EcommerceSellers.layout = (page:any) => <Layout children={page}/>
export default EcommerceSellers;