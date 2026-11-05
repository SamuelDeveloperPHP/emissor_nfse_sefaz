import React, { useState } from "react";
import {
  Offcanvas,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import Select from "react-select";

const CrmFilter = ({ show, onCloseClick } :any) => {
  const [selectCountry, setselectCountry] = useState<any>(null);

const handleselectCountry = (selectCountry :any) => {
    setselectCountry(selectCountry);
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
        { label: "United States of America", value: "United States of America"},
      ],
    },
  ];

  return (
    <Offcanvas
      direction="end"
      show={show}
      id="offcanvasExample"
      onHide={onCloseClick}
    >
      <Offcanvas.Header className="bg-light" onClick={onCloseClick}>
        Leads Fliters
      </Offcanvas.Header>
      <form action="" className="d-flex flex-column justify-content-end h-100">
        <Offcanvas.Body>
          <div className="mb-4">
            <Form.Label
              htmlFor="datepicker-range"
              className="form-label text-muted text-uppercase fw-semibold mb-3"
            >
              Date
            </Form.Label>
            <Flatpickr
              className="form-control"
              id="datepicker-publish-input"
              placeholder="Select a date"
              options={{
                altInput: true,
                altFormat: "F j, Y",
                mode: "multiple",
                dateFormat: "d.m.y",
              }}
            />
          </div>
          <div className="mb-4">
            <Form.Label
              htmlFor="country-select"
              className="form-label text-muted text-uppercase fw-semibold mb-3"
            >
              Country
            </Form.Label>

            <Select
              className="mb-0"
              value={selectCountry}
              onChange={(selectCountry :any) => {
                handleselectCountry(selectCountry);
              }}
              options={country}
              id="country-select"
            ></Select>
          </div>
          <div className="mb-4">
            <Form.Label
              htmlFor="status-select"
              className="form-label text-muted text-uppercase fw-semibold mb-3"
            >
              Status
            </Form.Label>
            <Row className="g-2">
              <Col lg={6}>
                <div className="form-check">
                  <Form.Check.Input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox1"
                    defaultValue="option1"
                  />
                  <Form.Check.Label className="form-check-label" htmlFor="inlineCheckbox1">
                    New Leads
                  </Form.Check.Label>
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-check">
                  <Form.Check.Input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox2"
                    defaultValue="option2"
                  />
                  <Form.Check.Label className="form-check-label" htmlFor="inlineCheckbox2">
                    Old Leads
                  </Form.Check.Label>
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-check">
                  <Form.Check.Input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox3"
                    defaultValue="option3"
                  />
                  <Form.Check.Label className="form-check-label" htmlFor="inlineCheckbox3">
                    Loss Leads
                  </Form.Check.Label>
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-check">
                  <Form.Check.Input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox4"
                    defaultValue="option4"
                  />
                  <Form.Check.Label className="form-check-label" htmlFor="inlineCheckbox4">
                    Follow Up
                  </Form.Check.Label>
                </div>
              </Col>
            </Row>
          </div>
          <div className="mb-4">
            <Form.Label
              htmlFor="leadscore"
              className="form-label text-muted text-uppercase fw-semibold mb-3"
            >
              Lead Score
            </Form.Label>
            <Row className="g-2 align-items-center">
              <div className="col-lg">
                <Form.Control
                  type="number"
                  className="form-control"
                  id="leadscore"
                  placeholder="0"
                />
              </div>
              <div className="col-lg-auto">To</div>
              <div className="col-lg">
                <Form.Control
                  type="number"
                  className="form-control"
                  id="leadscore"
                  placeholder="0"
                />
              </div>
            </Row>
          </div>
          <div>
            <Form.Label
              htmlFor="leads-tags"
              className="form-label text-muted text-uppercase fw-semibold mb-3"
            >
              Tags
            </Form.Label>
            <Row className="g-3">
              <Col lg={6}>
                <div className="form-check">
                  <Form.Check.Input
                    className="form-check-input"
                    type="checkbox"
                    id="marketing"
                    defaultValue="marketing"
                  />
                  <Form.Check.Label className="form-check-label" htmlFor="marketing">
                    Marketing
                  </Form.Check.Label>
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-check">
                  <Form.Check.Input
                    className="form-check-input"
                    type="checkbox"
                    id="management"
                    defaultValue="management"
                  />
                  <Form.Check.Label className="form-check-label" htmlFor="management">
                    Management
                  </Form.Check.Label>
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-check">
                  <Form.Check.Input
                    className="form-check-input"
                    type="checkbox"
                    id="business"
                    defaultValue="business"
                  />
                  <Form.Check.Label className="form-check-label" htmlFor="business">
                    Business
                  </Form.Check.Label>
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-check">
                  <Form.Check.Input
                    className="form-check-input"
                    type="checkbox"
                    id="investing"
                    defaultValue="investing"
                  />
                  <Form.Check.Label className="form-check-label" htmlFor="investing">
                    Investing
                  </Form.Check.Label>
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-check">
                  <Form.Check.Input
                    className="form-check-input"
                    type="checkbox"
                    id="partner"
                    defaultValue="partner"
                  />
                  <Form.Check.Label className="form-check-label" htmlFor="partner">
                    Partner
                  </Form.Check.Label>
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-check">
                  <Form.Check.Input
                    className="form-check-input"
                    type="checkbox"
                    id="lead"
                    defaultValue="lead"
                  />
                  <Form.Check.Label className="form-check-label" htmlFor="lead">
                    Leads
                  </Form.Check.Label>
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-check">
                  <Form.Check.Input
                    className="form-check-input"
                    type="checkbox"
                    id="sale"
                    defaultValue="sale"
                  />
                  <Form.Check.Label className="form-check-label" htmlFor="sale">
                    Sale
                  </Form.Check.Label>
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-check">
                  <Form.Check.Input
                    className="form-check-input"
                    type="checkbox"
                    id="owner"
                    defaultValue="owner"
                  />
                  <Form.Check.Label className="form-check-label" htmlFor="owner">
                    Owner
                  </Form.Check.Label>
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-check">
                  <Form.Check.Input
                    className="form-check-input"
                    type="checkbox"
                    id="banking"
                    defaultValue="banking"
                  />
                  <Form.Check.Label className="form-check-label" htmlFor="banking">
                    Banking
                  </Form.Check.Label>
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-check">
                  <Form.Check.Input
                    className="form-check-input"
                    type="checkbox"
                    id="banking"
                    defaultValue="banking"
                  />
                  <Form.Check.Label className="form-check-label" htmlFor="banking">
                    Exiting
                  </Form.Check.Label>
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-check">
                  <Form.Check.Input
                    className="form-check-input"
                    type="checkbox"
                    id="banking"
                    defaultValue="banking"
                  />
                  <Form.Check.Label className="form-check-label" htmlFor="banking">
                    Finance
                  </Form.Check.Label>
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-check">
                  <Form.Check.Input
                    className="form-check-input"
                    type="checkbox"
                    id="banking"
                    defaultValue="banking"
                  />
                  <Form.Check.Label className="form-check-label" htmlFor="banking">
                    Fashion
                  </Form.Check.Label>
                </div>
              </Col>
            </Row>
          </div>
        </Offcanvas.Body>
        <div className="offcanvas-footer border-top p-3 text-center hstack gap-2">
          <button
            className="btn btn-light w-100"
            onClick={onCloseClick}
          >
            Clear Filter
          </button>
          <button
            type="submit"
            className="btn btn-success w-100"
            onClick={onCloseClick}
          >
            Filters
          </button>
        </div>
      </form>
    </Offcanvas>
  );
};

export default CrmFilter;
