import React, { useState } from "react";
import {
  Card,
  Col,
  Form,
  Modal,
  Nav,
  Row,
  Tab
} from "react-bootstrap";
import vertication from "../../../../images/verification-img.png";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import Dropzone from "react-dropzone";
import { Link } from "@inertiajs/react";

const KYCVerification = () => {
  const [isKycVerification, setIsKycVerification] = useState<boolean>(false);
  const toggleKycVerification = () => setIsKycVerification(!isKycVerification);
  const [activeTab, setActiveTab] = useState<any>(1);
  const [passedSteps, setPassedSteps] = useState<any>([1]);
  const [selectedFiles, setselectedFiles] = useState<any>([]);

  function toggleTab(tab: any) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];

      if (tab >= 1 && tab <= 4) {
        setActiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
  }

  const [selectCountry, setselectCountry] = useState<any>(null);

  function handleselectCountry(selectCountry: any) {
    setselectCountry(selectCountry);
  }
  /**
   * Formats the size
   */
  function formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  function handleAcceptedFiles(files: any) {
    files.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  const country = [
    {
      options: [
        { label: "Select country", value: "Select country" },
        { label: "Argentina", value: "Argentina" },
        { label: "Belgium", value: "Belgium" },
        { label: "Brazil", value: "Brazil" },
        { label: "Colombia", value: "Colombia" },
        { label: "Denmark", value: "Denmark" },
        { label: "France", value: "France" },
        { label: "Germany", value: "Germany" },
        { label: "Mexico", value: "Mexico" },
        { label: "Russia", value: "Russia" },
        { label: "Spain", value: "Spain" },
        { label: "Syria", value: "Syria" },
        { label: "United Kingdom", value: "United Kingdom" },
        {
          label: "United States of America",
          value: "United States of America",
        },
      ],
    },
  ];

  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <Col lg={6}>
          <Card>
            <Card.Body>
              <div className="text-center">
                <Row className="justify-content-center">
                  <Col lg={9}>
                    <h4 className="mt-4 fw-semibold">KYC Verification</h4>
                    <p className="text-muted mt-3">
                      When you get your KYC verification process done, you have
                      given the crypto exchange in this case, information.{" "}
                    </p>
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={toggleKycVerification}
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Click here for Verification
                      </button>
                    </div>
                  </Col>
                </Row>

                <Row className="justify-content-center mt-5 mb-2">
                  <Col sm={7} xs={8}>
                    <img src={vertication} alt="" className="img-fluid" />
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal
        show={isKycVerification}
        onHide={toggleKycVerification}
        centered={true}
        size="lg"
      >
        <Modal.Header
          className="p-3 text-uppercase"
          closeButton
        >
          <h5 className="modal-title">

            Verify your Account
          </h5>
        </Modal.Header>
        <form action="#" className="checkout-tab">
          <Tab.Container defaultActiveKey="1">
            <Modal.Body className="p-0">
              <div className="step-arrow-nav">
                <Nav
                  className="nav-pills nav-justified custom-nav"
                  role="tablist"
                >
                  <Nav.Item>
                    <Nav.Link
                      href="#"
                      eventKey="1"
                    >
                      Personal Info
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      href="#"
                      eventKey="2"
                    >
                      Bank Details
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      href="#"
                      eventKey="3"
                    >
                      Document Verification
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      href="#"
                      eventKey="4"
                    >
                      Verified
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </Modal.Body>
            <div className="modal-body">
              <Tab.Content>
                <Tab.Pane eventKey="1">
                  <Row className="g-3">
                    <Col lg={6}>
                      <div>
                        <Form.Label htmlFor="firstName" className="form-label">
                          First Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          id="firstName"
                          placeholder="Enter your firstname"
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div>
                        <Form.Label htmlFor="lastName" className="form-label">
                          Last Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter your lastname"
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div>
                        <Form.Label htmlFor="phoneNumber" className="form-label">
                          Phone
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          id="phoneNumber"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div>
                        <Form.Label htmlFor="dateofBirth" className="form-label">
                          Date of Birth
                        </Form.Label>
                        <Flatpickr
                          className="form-control"
                          options={{
                            dateFormat: "d M, Y",
                          }}
                          placeholder="Enter your date of birth"
                        />
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div>
                        <Form.Label htmlFor="emailID" className="form-label">
                          Email ID
                        </Form.Label>
                        <Form.Control
                          type="email"
                          className="form-control"
                          id="emailID"
                          placeholder="Enter your email"
                        />
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div>
                        <Form.Label htmlFor="password" className="form-label">
                          Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Enter your password"
                        />
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div>
                        <Form.Label htmlFor="confirmPassword" className="form-label">
                          Confirm Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          placeholder="Enter your confirm password"
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div>
                        <Form.Label htmlFor="vatNo" className="form-label">
                          VAT/TIN No.
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          id="vatNo"
                          placeholder="Enter your VAT/TIN no"
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div>
                        <Form.Label htmlFor="serviceTax" className="form-label">
                          Service Tax No.
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          id="serviceTax"
                          placeholder="Enter your service tax no"
                        />
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div>
                        <Form.Label htmlFor="country-select" className="form-label">
                          Country
                        </Form.Label>
                        <Select
                          className="mb-0"
                          value={selectCountry}
                          onChange={(selectCountry: any) => {
                            handleselectCountry(selectCountry);
                          }}
                          options={country}
                          id="country-select"
                        ></Select>
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="d-flex align-items-start gap-3 mt-3">
                        <button
                          onClick={() => {
                            toggleTab(activeTab + 1);
                          }}
                          type="button"
                          className="btn btn-primary btn-label right ms-auto nexttab"
                        >
                          <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>{" "}
                          Next Step
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Tab.Pane>

                <Tab.Pane eventKey="2">
                  <Row>
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
                        <Form.Label htmlFor="accountnumberInput" className="form-label">
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
                      <div className="hstack align-items-start gap-3 mt-4">
                        <button
                          onClick={() => {
                            toggleTab(activeTab - 1);
                          }}
                          type="button"
                          className="btn btn-light btn-label previestab"
                          data-previous="pills-bill-info-tab"
                        >
                          <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                          Back to Personal Info
                        </button>
                        <button
                          onClick={() => {
                            toggleTab(activeTab + 1);
                          }}
                          type="button"
                          className="btn btn-primary btn-label right ms-auto nexttab"
                          data-nexttab="pills-payment-tab"
                        >
                          <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                          Next Step
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Tab.Pane>

                <Tab.Pane eventKey="3">
                  <h5 className="mb-3">Choose Document Type</h5>

                  <div className="d-flex gap-2">
                    <div>
                      <Form.Control
                        type="radio"
                        className="btn-check"
                        id="passport"
                        defaultChecked
                        name="choose-document"
                      />
                      <Form.Label className="btn btn-outline-primary" htmlFor="passport">
                        Passport
                      </Form.Label>
                    </div>
                    <div>
                      <Form.Control
                        type="radio"
                        className="btn-check"
                        id="aadhar-card"
                        name="choose-document"
                      />
                      <Form.Label className="btn btn-outline-primary" htmlFor="aadhar-card">
                        Aadhar Card
                      </Form.Label>
                    </div>
                    <div>
                      <Form.Control
                        type="radio"
                        className="btn-check"
                        id="pan-card"
                        name="choose-document"
                      />
                      <Form.Label className="btn btn-outline-primary" htmlFor="pan-card">
                        Pan Card
                      </Form.Label>
                    </div>
                    <div>
                      <Form.Control
                        type="radio"
                        className="btn-check"
                        id="other"
                        name="choose-document"
                      />
                      <Form.Label className="btn btn-outline-primary" htmlFor="other">
                        Other
                      </Form.Label>
                    </div>
                  </div>

                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      handleAcceptedFiles(acceptedFiles);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="dropzone dz-clickable">
                        <div
                          className="dz-message needsclick pt-4"
                          {...getRootProps()}
                        >
                          <div className="mb-3">
                            <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                          </div>
                          <h4>Drop files here or click to upload.</h4>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  <div className="list-unstyled mb-0" id="file-previews">
                    {selectedFiles.map((f: any, i: any) => {
                      return (
                        <Card
                          className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                          key={i + "-file"}
                        >
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col className="col-auto">
                                <img
                                  data-dz-thumbnail=""
                                  height="80"
                                  className="avatar-sm rounded bg-light"
                                  alt={f.name}
                                  src={f.preview}
                                />
                              </Col>
                              <Col>
                                <Link
                                  href="#"
                                  className="text-muted font-weight-bold"
                                >
                                  {f.name}
                                </Link>
                                <p className="mb-0">
                                  <strong>{f.formattedSize}</strong>
                                </p>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      );
                    })}
                  </div>

                  <div className="d-flex align-items-start gap-3 mt-4">
                    <button
                      onClick={() => {
                        toggleTab(activeTab - 1);
                      }}
                      type="button"
                      className="btn btn-light btn-label previestab"
                      data-previous="pills-bill-address-tab"
                    >
                      <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                      Back to Bank Details
                    </button>
                    <button
                      onClick={() => {
                        toggleTab(activeTab + 1);
                      }}
                      type="button"
                      className="btn btn-primary btn-label right ms-auto nexttab"
                      data-nexttab="pills-finish-tab"
                    >
                      <i className="ri-save-line label-icon align-middle fs-16 ms-2"></i>
                      Submit
                    </button>
                  </div>
                </Tab.Pane>

                <Tab.Pane eventKey="4">
                  <Row className="text-center justify-content-center">
                    <Col lg={12}>
                      <div className="mb-4">
                        <i className="bx bx-party display-4 text-success"></i>
                      </div>
                      <h5>Verification Completed</h5>
                      <p className="text-muted mb-4">
                        To stay verified, don't remove the meta tag form your
                        site's home page. To avoid losing verification, you may
                        want to add multiple methods form the{" "}
                        <span className="fw-medium">Crypto KYC Application.</span>
                      </p>

                      <div className="hstack justify-content-center gap-2">
                        <button
                          onClick={toggleKycVerification}
                          type="button"
                          className="btn btn-ghost-success"
                          data-bs-dismiss="modal"
                        >
                          Done{" "}
                          <i className="ri-thumb-up-fill align-bottom me-1"></i>
                        </button>
                        <button
                          onClick={() => {
                            toggleTab(activeTab + 1);
                          }}
                          type="button"
                          className="btn btn-primary"
                        >
                          <i className="ri-home-4-line align-bottom ms-1"></i>{" "}
                          Back to Home
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default KYCVerification;
