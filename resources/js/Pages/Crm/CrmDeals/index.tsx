import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import moment from "moment";

import {
  Col,
  Container,
  Row,
  Card,
  Button,
  Dropdown,
  Modal,
  Form,
  Accordion,
} from "react-bootstrap";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Select from "react-select";
import LeadDiscover from "./leadDiscover";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

// redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { Head } from "@inertiajs/react";
import Layout from "../../../Layouts";
import { onGetDeals } from "../../../slices/thunk";

const CrmDeals = () => {
  const dispatch: any = useDispatch();

  const crmdealsData = createSelector(
    (state: any) => state.Crm,
    (deals: any) => deals.deals
  );
  // Inside your component
  const deals : any= useSelector(crmdealsData);

  useEffect(() => {
    if (deals && !deals.length) {
      dispatch(onGetDeals());
    }
  }, [dispatch, deals]);

  const [sortBy, setsortBy] = useState<string>("Owner");
  const [modal, setModal] = useState<boolean>(false);

  const handlesortBy = (sortBy: any) => {
    setsortBy(sortBy);
  };

  const sortbyname = [
    {
      options: [
        { label: "Owner", value: "Owner" },
        { label: "Company", value: "Company" },
        { label: "Location", value: "Location" },
      ],
    },
  ];

  const toggle = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
      validation.resetForm();
    }
  };

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      id: '',
      title: '',
      price: '',
      date: '',
      subTitle: '',
      email: '',
      contact: '',
      description: '',
      dealType: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your Title"),
      price: Yup.string().required("Please Enter Your Price"),
      date: Yup.string().required("Please Enter Your Date"),
      email: Yup.string().required("Please Enter Your email"),
      contact: Yup.string().required("Please Enter Your contact"),
      description: Yup.string().required("Please Enter Your description"),
      subTitle: Yup.string().required("Please Enter Your Title"),
      dealType: Yup.string().required("Please Enter Your Deal Type")
    }),
    onSubmit: (values) => {
      // console.log(values);
      toggle()
    }
  });


  return (
    <React.Fragment>
      <Head title="Deals | Velzon - React Admin & Dashboard Template" />
      <div className="page-content">

        <Container fluid>
          <BreadCrumb title="Deals" pageTitle="CRM" />
          <Card>
            <Card.Body>
              <Row className="g-3">
                <Col md={3}>
                  <div className="search-box">
                  <Form.Control
                      type="text"
                      className="form-control search"
                      placeholder="Search for deals..."
                    />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </Col>
                <div className="col-md-auto ms-auto">
                  <div className="d-flex hastck gap-2 flex-wrap">
                    <div className="d-flex align-items-center gap-2">
                      <span className="text-muted">Sort by: </span>
                      <Select
                        className="mb-0"
                        value={sortBy}
                        onChange={(sortBy: any) => {
                          handlesortBy(sortBy);
                        }}
                        options={sortbyname}
                        id="choices-single-default"
                        defaultInputValue="Owner"
                      ></Select>
                    </div>
                    <button className="btn btn-success" onClick={toggle}>
                      <i className="ri-add-fill align-bottom me-1"></i> Add
                      Deals
                    </button>
                    <Dropdown>
                      <Dropdown.Toggle
                        href="#"
                        className="btn btn-soft-info btn-icon fs-14 arrow-none"
                        as="button"
                      >
                        <i className="ri-settings-4-line"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu-end">
                        <Dropdown.Item className="dropdown-item" href="#">
                          Copy
                        </Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" href="#">
                          Move to pipline
                        </Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" href="#">
                          Add to exceptions
                        </Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" href="#">
                          Switch to common form view
                        </Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" href="#">
                          Reset form view to default
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </Row>
            </Card.Body>
          </Card>

          <Row className="row-cols-xxl-5 row-cols-lg-3 row-cols-md-2 row-cols-1">
            {deals.map((deals: any, key: any) => (
              <React.Fragment key={key}>
                <LeadDiscover deal={deals} index={key} />
              </React.Fragment>
            ))}
          </Row>
        </Container>
      </div>

      <Modal id="adddeals" show={modal} onHide={toggle} centered>
        <Modal.Header className="bg-light p-3" closeButton>
          <h5 className="modal-title">
          Create Deals
          </h5>
        </Modal.Header>
        <Form onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
          return false;
        }}>
          <Modal.Body>
            <div className="mb-3">
              <Form.Label htmlFor="deatType" className="form-label">Deals Type</Form.Label>
              <select className="form-select" id="deatType"
                name="dealType"
                value={validation.values.dealType || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                >
                <option value=""
                >Select deals type</option>
                <option value="Lead Disovered">Lead Disovered</option>
                <option value="Contact Initiated">Contact Initiated</option>
                <option value="Need Identified">Need Identified</option>
                <option value="Meeting Arranged">Meeting Arranged</option>
                <option value="Offer Accepted">Offer Accepted</option>
              </select>
              {validation.touched.dealType && validation.errors.dealType ? (
                <Form.Control.Feedback type="invalid">{validation.errors.dealType}</Form.Control.Feedback>
              ) : null}

            </div>

            <div className="mb-3">
              <Form.Label htmlFor="dealTitle" className="form-label">Deal Title</Form.Label>
              <Form.Control type="text" className="form-control" id="dealTitle"
                placeholder="Enter title"
                name="title"
                value={validation.values.title || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
              />
              {validation.touched.title && validation.errors.title ? (
                <Form.Control.Feedback type="invalid">{validation.errors.title}</Form.Control.Feedback>
              ) : null}
            </div>

            <div className="mb-3">
              <Form.Label htmlFor="dealValue" className="form-label">Value (USD)</Form.Label>
              <Form.Control type="number" className="form-control" id="dealValue" step="0.01" placeholder="Enter value"
                name="price"
                value={validation.values.price || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
              />
              {validation.touched.price && validation.errors.price ? (
                <Form.Control.Feedback type="invalid">{validation.errors.price}</Form.Control.Feedback>
              ) : null}
            </div>

            <div className="mb-3">
              <Form.Label htmlFor="dealOwner" className="form-label">Deals Owner</Form.Label>
              <Form.Control type="text" className="form-control" id="dealOwner" placeholder="Enter owner name"
                name="subTitle"
                value={validation.values.subTitle || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
              />
              {validation.touched.subTitle && validation.errors.subTitle ? (
                <Form.Control.Feedback type="invalid">{validation.errors.subTitle}</Form.Control.Feedback>
              ) : null}
            </div>
            <div className="mb-3">
              <Form.Label htmlFor="dueDate" className="form-label">Due Date</Form.Label>
              <Flatpickr
                name="date"
                className="form-control"
                id="customerdate"
                placeholder="Select date"
                options={{
                  mode: "single",
                  dateFormat: 'd M, Y',
                }}
                onChange={(date: any) => validation.setFieldValue("date", moment(date[0]).format("DD MMMM ,YYYY"))}
                value={validation.values.date || ''}
              />
              {validation.errors.date && validation.touched.date ? (
                <Form.Control.Feedback type="invalid" className='d-block'>{validation.errors.date}</Form.Control.Feedback>
              ) : null}
            </div>

            <div className="mb-3">
              <Form.Label htmlFor="dealEmail" className="form-label">Email</Form.Label>
              <Form.Control type="email" className="form-control" id="dealEmail" placeholder="Enter email"
                name="email"
                value={validation.values.email || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
              />
              {validation.touched.email && validation.errors.email ? (
                <Form.Control.Feedback type="invalid">{validation.errors.email}</Form.Control.Feedback>
              ) : null}
            </div>

            <div className="mb-3">
              <Form.Label htmlFor="contactNumber" className="form-label">Contact</Form.Label>
              <Form.Control type="text" className="form-control" id="contactNumber" placeholder="Enter contact number"
                name="contact"
                value={validation.values.contact || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
              />
              {validation.touched.contact && validation.errors.contact ? (
                <Form.Control.Feedback type="invalid">{validation.errors.contact}</Form.Control.Feedback>
              ) : null}
            </div>
            <div className="mb-3">
              <Form.Label htmlFor="contactDescription" className="form-label">Description</Form.Label>
              <textarea className="form-control" id="contactDescription" rows={3} placeholder="Enter description"
                name="description"
                value={validation.values.description || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
              />
              {validation.touched.description && validation.errors.description ? (
                <Form.Control.Feedback type="invalid">{validation.errors.description}</Form.Control.Feedback>
              ) : null}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant="light" id="close-modal" onClick={() => { setModal(false); }}>
              Close
            </Button>
            <Button type="submit" variant="success">
              <i className="ri-save-line align-bottom me-1"></i> Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </React.Fragment>
  );
};
CrmDeals.layout = (page:any) => <Layout children={page}/>
export default CrmDeals;
