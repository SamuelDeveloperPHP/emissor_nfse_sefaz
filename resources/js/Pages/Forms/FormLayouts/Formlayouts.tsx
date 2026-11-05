import React from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { FormGrid, Gutters, VerticalForm, HorizontalForm, HorizontalFormLabelSizing, ColumnSizing, AutoSizing, InlineForms, FloatingLabels } from './FormlayoutsCode';

//Import Flatepicker
import Flatpickr from "react-flatpickr";
import { Head, Link } from '@inertiajs/react';
import Layout from '../../../Layouts';

const Formlayouts = () => {
    
    return (
        <React.Fragment>
            <Head title='Form Layouts | Velzon - React Admin & Dashboard Template' />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Form Layouts" pageTitle="Forms" />
                    <Row>
                        <Col xxl={6}>
                            <Card >
                                <PreviewCardHeader title="Form Grid" />
                                <Card.Body>
                                    <p className="text-muted">More complex forms can be built using our grid classes. Use these for form layouts that require multiple columns, varied widths, and additional alignment options. <span className="fw-medium">Requires the <code>$enable-grid-classes</code> Sass variable to be enabled</span> (on by default).</p>
                                    <div className="live-preview">
                                        <Form >
                                            <Row>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label htmlFor="firstNameinput" className="form-label">First Name</Form.Label>
                                                        <Form.Control type="text" className="form-control" placeholder="Enter your firstname" id="firstNameinput" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label htmlFor="lastNameinput" className="form-label">Last Name</Form.Label>
                                                        <Form.Control type="text" className="form-control" placeholder="Enter your lastname" id="lastNameinput" />
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className="mb-3">
                                                        <Form.Label htmlFor="compnayNameinput" className="form-label">Company Name</Form.Label>
                                                        <Form.Control type="text" className="form-control" placeholder="Enter company name" id="compnayNameinput" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label htmlFor="phonenumberInput" className="form-label">Phone Number</Form.Label>
                                                        <Form.Control type="tel" className="form-control" placeholder="+(245) 451 45123" id="phonenumberInput" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label htmlFor="emailidInput" className="form-label">Email Address</Form.Label>
                                                        <Form.Control type="email" className="form-control" placeholder="example@gamil.com" id="emailidInput" />
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className="mb-3">
                                                        <Form.Label htmlFor="address1ControlTextarea" className="form-label">Address</Form.Label>
                                                        <Form.Control type="text" className="form-control" placeholder="Address 1" id="address1ControlTextarea" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label htmlFor="citynameInput" className="form-label">City</Form.Label>
                                                        <Form.Control type="email" className="form-control" placeholder="Enter your city" id="citynameInput" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label htmlFor="ForminputState" className="form-label">State</Form.Label>
                                                        <select id="ForminputState" className="form-select" data-choices data-choices-sorting="true" >
                                                            <option>Choose...</option>
                                                            <option>...</option>
                                                        </select>
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className="text-end">
                                                        <button type="submit" className="btn btn-primary">Submit</button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ "height": "375px" }}>
                                            <code>
                                                <FormGrid />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Gutters" />
                                <div className="card-body">
                                    <p className="text-muted">By adding <Link href="/docs/5.1/layout/gutters/" className="text-decoration-underline">gutter modifier classes</Link>, you can have control over the gutter width in as well the inline as block direction. <span className="fw-medium">Also requires the <code>$enable-grid-classes</code> Sass variable to be enabled</span> (on by default).</p>
                                    <div className="live-preview">
                                        <form action="#" className="row g-3">
                                            <Col md={12}>
                                                <Form.Label htmlFor="fullnameInput" className="form-label">Name</Form.Label>
                                                <Form.Control type="text" className="form-control" id="fullnameInput" placeholder="Enter your name" />
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label htmlFor="inputEmail4" className="form-label">Email</Form.Label>
                                                <Form.Control type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label htmlFor="inputPassword4" className="form-label">Password</Form.Label>
                                                <Form.Control type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                                            </Col>
                                            <Col xs={12}>
                                                <Form.Label htmlFor="inputAddress" className="form-label">Address</Form.Label>
                                                <Form.Control type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                                            </Col>
                                            <Col xs={12}>
                                                <Form.Label htmlFor="inputAddress2" className="form-label">Address 2</Form.Label>
                                                <Form.Control type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label htmlFor="inputCity" className="form-label">City</Form.Label>
                                                <Form.Control type="text" className="form-control" id="inputCity" placeholder="Enter your city" />
                                            </Col>
                                            <Col md={4}>
                                                <Form.Label htmlFor="inputState" className="form-label">State</Form.Label>
                                                <select id="inputState" className="form-select" data-choices data-choices-sorting="true">
                                                    <option >Choose...</option>
                                                    <option>...</option>
                                                </select>
                                            </Col>
                                            <Col md={2}>
                                                <Form.Label htmlFor="inputZip" className="form-label">Zip</Form.Label>
                                                <Form.Control type="text" className="form-control" id="inputZip" placeholder="Zin code" />
                                            </Col>
                                            <Col xs={12}>
                                                <div className="form-check">
                                                    <Form.Check.Input className="form-check-input" type="checkbox" id="gridCheck" />
                                                    <Form.Check.Label className="form-check-label" htmlFor="gridCheck">
                                                        Check me out
                                                    </Form.Check.Label>
                                                </div>
                                            </Col>
                                            <Col xs={12}>
                                                <div className="text-end">
                                                    <button type="submit" className="btn btn-primary">Sign in</button>
                                                </div>
                                            </Col>
                                        </form>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ "height": "375px" }}>
                                            <code>
                                                <Gutters />
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Row >
                        <Col xxl={6}>
                            <Card >
                                <PreviewCardHeader title="Vertical Form" />
                                <Card.Body>
                                    <div className="live-preview">
                                        <Form action="#">
                                            <div className="mb-3">
                                                <Form.Label htmlFor="employeeName" className="form-label">Employee Name</Form.Label>
                                                <Form.Control type="text" className="form-control" id="employeeName" placeholder="Enter emploree name" />
                                            </div>
                                            <div className="mb-3">
                                                <Form.Label htmlFor="employeeUrl" className="form-label">Employee Department URL</Form.Label>
                                                <Form.Control type="url" className="form-control" id="employeeUrl" placeholder="Enter emploree url" />
                                            </div>
                                            <div className="mb-3">
                                                <Form.Label htmlFor="StartleaveDate" className="form-label">Start Leave Date</Form.Label>
                                                <Flatpickr
                                                    className="form-control"
                                                    options={{
                                                        dateFormat: "d M, Y"
                                                    }}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <Form.Label htmlFor="EndleaveDate" className="form-label">End Leave Date</Form.Label>
                                                <Flatpickr
                                                    className="form-control"
                                                    options={{
                                                        dateFormat: "d M, Y"
                                                    }}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <Form.Label htmlFor="VertimeassageInput" className="form-label">Message</Form.Label>
                                                <textarea className="form-control" id="VertimeassageInput" rows={3} placeholder="Enter your message"></textarea>
                                            </div>
                                            <div className="text-end">
                                                <button type="submit" className="btn btn-primary">Add Leave</button>
                                            </div>
                                        </Form>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ "height": "375px" }}>
                                            <code>
                                                <VerticalForm />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Horizontal Form" />
                                <Card.Body>
                                    <div className="live-preview">
                                        <form action="#">
                                            <Row className="mb-3">
                                                <Col lg={3} >
                                                    <Form.Label htmlFor="nameInput" className="form-label">Name</Form.Label>
                                                </Col>
                                                <Col lg={9} >
                                                    <Form.Control type="text" className="form-control" id="nameInput" placeholder="Enter your name" />
                                                </Col>
                                            </Row>
                                            <Row className="mb-3">
                                                <Col lg={3} >
                                                    <Form.Label htmlFor="websiteUrl" className="form-label">Website URL</Form.Label>
                                                </Col>
                                                <Col lg={9} >
                                                    <Form.Control type="url" className="form-control" id="websiteUrl" placeholder="Enter your url" />
                                                </Col>
                                            </Row>
                                            <Row className="mb-3">
                                                <Col lg={3} >
                                                    <Form.Label htmlFor="dateInput" className="form-label">Date</Form.Label>
                                                </Col>
                                                <Col lg={9} >
                                                    <Flatpickr
                                                        className="form-control"
                                                        options={{
                                                            dateFormat: "d M, Y"
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="mb-3">
                                                <Col lg={3} >
                                                    <Form.Label htmlFor="timeInput" className="form-label">Time</Form.Label>
                                                </Col>
                                                <Col lg={9} >
                                                    <Flatpickr
                                                        className="form-control"
                                                        options={{
                                                            enableTime: true,
                                                            noCalendar: true,
                                                            dateFormat: "H:i",
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="mb-3">
                                                <Col lg={3} >
                                                    <Form.Label htmlFor="leaveemails" className="form-label">Email Id</Form.Label>
                                                </Col>
                                                <Col lg={9} >
                                                    <Form.Control type="email" className="form-control" id="leaveemails" placeholder="Enter your email" />
                                                </Col>
                                            </Row>
                                            <Row className="mb-3">
                                                <Col lg={3} >
                                                    <Form.Label htmlFor="contactNumber" className="form-label">Contact Number</Form.Label>
                                                </Col>
                                                <Col lg={9} >
                                                    <Form.Control type="number" className="form-control" id="contactNumber" placeholder="+91 9876543210" />
                                                </Col>
                                            </Row>
                                            <Row className="mb-3">
                                                <Col lg={3} >
                                                    <Form.Label htmlFor="meassageInput" className="form-label">Message</Form.Label>
                                                </Col>
                                                <Col lg={9} >
                                                    <textarea className="form-control" id="meassageInput" rows={3} placeholder="Enter your message"></textarea>
                                                </Col>
                                            </Row>
                                            <div className="text-end">
                                                <button type="submit" className="btn btn-primary">Add Leave</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ "height": "375px" }}>
                                            <code>
                                                <HorizontalForm />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Horizontal Form Label Sizing" />
                                <Card.Body>
                                    <p className="text-muted">Use <code>col-form-label-sm</code> class to set small size form label or <code>col-form-label-lg</code> class to set large size form label to &lt;label&gt;. No such class is required for the default size form label.</p>
                                    <div className="live-preview">
                                        <Row className="align-items-center g-3">
                                            <Col xxl={4}>
                                                <Row>
                                                    <Form.Label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Email</Form.Label>
                                                    <Col sm={10}>
                                                        <Form.Control type="email" className="form-control form-control-sm" id="colFormLabelSm" placeholder="col-form-label-sm" />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xxl={4}>
                                                <Row>
                                                    <Form.Label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Email</Form.Label>
                                                    <Col sm={10}>
                                                        <Form.Control type="email" className="form-control" id="colFormLabel" placeholder="col-form-label" />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xxl={4}>
                                                <Row>
                                                    <Form.Label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">Email</Form.Label>
                                                    <Col sm={10}>
                                                        <Form.Control type="email" className="form-control form-control-lg" id="colFormLabelLg" placeholder="col-form-label-lg" />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ "height": "275px" }}>
                                            <code>
                                                <HorizontalFormLabelSizing />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={12}>
                            <Card >
                                <PreviewCardHeader title="Column Sizing" />
                                <div className="card-body">
                                    <p className="text-muted">Use <code>sm={`required size`}</code>  size value to set column size as per your requirement.</p>
                                    <div className="live-preview">
                                        <Row className="g-3">
                                            <Col sm={6}>
                                                <Form.Control type="text" className="form-control" placeholder="Firstname" aria-label="First-Name" />
                                            </Col>
                                            <Col sm={6}>
                                                <Form.Control type="text" className="form-control" placeholder="Lastname" aria-label="Last-Name" />
                                            </Col>
                                            <Col sm={4}>
                                                <Form.Control type="text" className="form-control" placeholder="Email id" aria-label="Email Id" />
                                            </Col>
                                            <Col sm={4}>
                                                <Form.Control type="password" className="form-control" placeholder="Password" aria-label="Password" />
                                            </Col>
                                            <Col sm={4}>
                                                <Form.Control type="password" className="form-control" placeholder="Confirm Password" aria-label="confirm-password" />
                                            </Col>
                                            <Col sm={7}>
                                                <Form.Control type="text" className="form-control" placeholder="City" aria-label="City" />
                                            </Col>
                                            <Col sm>
                                                <Form.Control type="text" className="form-control" placeholder="State" aria-label="State" />
                                            </Col>
                                            <Col sm>
                                                <Form.Control type="text" className="form-control" placeholder="Zip" aria-label="Zip" />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ "height": "275px" }}>
                                            <code>
                                                <ColumnSizing />
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Auto Sizing" />
                                <Card.Body>
                                    <div className="live-preview">
                                        <Form action="#">
                                            <Row className="gy-2 gx-3 mb-3 align-items-center">
                                                <Col sm>
                                                    <Form.Label className="visually-hidden" htmlFor="autoSizingInput">Name</Form.Label>
                                                    <Form.Control type="text" className="form-control" id="autoSizingInput" placeholder="Jane Doe" />
                                                </Col>
                                                <Col sm>
                                                    <Form.Label className="visually-hidden" htmlFor="autoSizingInputGroup">Username</Form.Label>
                                                    <div className="input-group">
                                                        <div className="input-group-text">@</div>
                                                        <Form.Control type="text" className="form-control" id="autoSizingInputGroup" placeholder="Username" />
                                                    </div>
                                                </Col>
                                                <Col sm>
                                                    <Form.Label className="visually-hidden" htmlFor="autoSizingSelect">Preference</Form.Label>
                                                    <select className="form-select" data-choices data-choices-sorting="true" id="autoSizingSelect">
                                                        <option >Choose...</option>
                                                        <option defaultValue="1">One</option>
                                                        <option defaultValue="2">Two</option>
                                                        <option defaultValue="3">Three</option>
                                                    </select>
                                                </Col>
                                                <Col className="sm-auto">
                                                    <div className="form-check">
                                                        <Form.Check.Input className="form-check-input" type="checkbox" id="autoSizingCheck" />
                                                        <Form.Check.Label className="form-check-label" htmlFor="autoSizingCheck">
                                                            Remember me
                                                        </Form.Check.Label>
                                                    </div>
                                                </Col>
                                                <Col className="sm-auto">
                                                    <button type="submit" className="btn btn-primary">Submit</button>
                                                </Col>
                                            </Row>
                                        </Form>

                                        <Form>
                                            <Row className="gx-3 gy-2 align-items-center">
                                                <Col sm={3}>
                                                    <Form.Label className="visually-hidden" htmlFor="specificSizeInputName">Name</Form.Label>
                                                    <Form.Control type="text" className="form-control" id="specificSizeInputName" placeholder="Jane Doe" />
                                                </Col>
                                                <Col sm={3}>
                                                    <Form.Label className="visually-hidden" htmlFor="specificSizeInputGroupUsername">Username</Form.Label>
                                                    <InputGroup>
                                                        <div className="input-group-text">@</div>
                                                        <Form.Control type="text" className="form-control" id="specificSizeInputGroupUsername" placeholder="Username" />
                                                    </InputGroup>
                                                </Col>
                                                <Col sm={3}>
                                                    <Form.Label className="visually-hidden" htmlFor="specificSizeSelect">Preference</Form.Label>
                                                    <select className="form-select" data-choices data-choices-sorting="true" id="specificSizeSelect">
                                                        <option >Choose...</option>
                                                        <option defaultValue="1">One</option>
                                                        <option defaultValue="2">Two</option>
                                                        <option defaultValue="3">Three</option>
                                                    </select>
                                                </Col>
                                                <div className="col-auto">
                                                    <div className="form-check">
                                                        <Form.Check.Input className="form-check-input" type="checkbox" id="autoSizingCheck2" />
                                                        <Form.Check.Label className="form-check-label" htmlFor="autoSizingCheck2">
                                                            Remember me
                                                        </Form.Check.Label>
                                                    </div>
                                                </div>
                                                <Col >
                                                    <button type="submit" className="btn btn-primary">Submit</button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ "height": "275px" }}>
                                            <code>
                                                <AutoSizing />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Inline Forms" />
                                <Card.Body >
                                    <p className="text-muted">Use <code>row-cols-*</code> class to set form inline.</p>
                                    <div className="live-preview">
                                        <Form action="#">
                                            <Row className="row-cols-lg-auto g-3 align-items-center">
                                                <Col xs={12}>
                                                    <Form.Label className="visually-hidden" htmlFor="inlineFormInputGroupUsername">Username</Form.Label>
                                                    <div className="input-group">
                                                        <div className="input-group-text">@</div>
                                                        <Form.Control type="text" className="form-control" id="inlineFormInputGroupUsername" placeholder="Username" />
                                                    </div>
                                                </Col>
                                                <Col xs={12}>
                                                    <Form.Label className="visually-hidden" htmlFor="inlineFormSelectPref">Preference</Form.Label>
                                                    <select className="form-select" data-choices data-choices-sorting="true" id="inlineFormSelectPref">
                                                        <option >Choose... </option>
                                                        <option defaultValue="1">One</option>
                                                        <option defaultValue="2">Two</option>
                                                        <option defaultValue="3">Three</option>
                                                    </select>
                                                </Col>
                                                <Col xs={12}>
                                                    <div className="form-check">
                                                        <Form.Check.Input className="form-check-input" type="checkbox" id="inlineFormCheck" />
                                                        <Form.Check.Label className="form-check-label" htmlFor="inlineFormCheck">
                                                            Remember me
                                                        </Form.Check.Label>
                                                    </div>
                                                </Col>
                                                <Col xs={12}>
                                                    <button type="submit" className="btn btn-primary">Submit</button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ "height": "275px" }}>
                                            <code>
                                            </code>
                                            <InlineForms />
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Floating Labels" />
                                <Card.Body>
                                    <p className="text-muted">Use <code>form-floating</code> class to enable floating labels with Bootstrap’s textual form fields.</p>
                                    <div className="live-preview">
                                        <Form action="#">
                                            <Row className="g-3">
                                                <Col lg={6}>
                                                    <div className="form-floating">
                                                        <Form.Control type="text" className="form-control" id="firstnamefloatingInput" placeholder="Enter your firstname" />
                                                        <Form.Label htmlFor="firstnamefloatingInput">First Name</Form.Label>
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="form-floating">
                                                        <Form.Control type="text" className="form-control" id="lastnamefloatingInput" placeholder="Enter your Lastname" />
                                                        <Form.Label htmlFor="lastnamefloatingInput">Last Name</Form.Label>
                                                    </div>
                                                </Col>
                                                <Col lg={4}>
                                                    <div className="form-floating">
                                                        <Form.Control type="email" className="form-control" id="emailfloatingInput" placeholder="Enter your email" />
                                                        <Form.Label htmlFor="emailfloatingInput">Email Address</Form.Label>
                                                    </div>
                                                </Col>
                                                <Col lg={4}>
                                                    <div className="form-floating">
                                                        <Form.Control type="password" className="form-control" id="passwordfloatingInput" placeholder="Enter your password" />
                                                        <Form.Label htmlFor="passwordfloatingInput">Password</Form.Label>
                                                    </div>
                                                </Col>
                                                <Col lg={4}>
                                                    <div className="form-floating">
                                                        <Form.Control type="password" className="form-control" id="passwordfloatingInput1" placeholder="Confirm password" />
                                                        <Form.Label htmlFor="passwordfloatingInput1">Confirm Password</Form.Label>
                                                    </div>
                                                </Col>
                                                <Col lg={4}>
                                                    <div className="form-floating">
                                                        <Form.Control type="text" className="form-control" id="cityfloatingInput" placeholder="Enter your city" />
                                                        <Form.Label htmlFor="cityfloatingInput">City</Form.Label>
                                                    </div>
                                                </Col>
                                                <Col lg={4}>
                                                    <div className="form-floating">
                                                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                                                            <option >Choose...</option>
                                                            <option defaultValue="1">USA</option>
                                                            <option defaultValue="2">Brazil</option>
                                                            <option defaultValue="3">France</option>
                                                            <option defaultValue="4">Germany</option>
                                                        </select>
                                                        <Form.Label htmlFor="floatingSelect">Country</Form.Label>
                                                    </div>
                                                </Col>
                                                <Col lg={4}>
                                                    <div className="form-floating">
                                                        <Form.Control type="number" className="form-control" id="zipfloatingInput" placeholder="Enter your zipcode" />
                                                        <Form.Label htmlFor="zipfloatingInput">Zipcode</Form.Label>
                                                    </div>
                                                </Col>
                                                <Col lg={12}>
                                                    <div className="text-end">
                                                        <button type="submit" className="btn btn-primary">Submit</button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ "height": "275px" }}>
                                            <code>
                                                <FloatingLabels />
                                            </code>
                                        </pre>
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
Formlayouts.layout = (page:any) => <Layout children={page}/>
export default Formlayouts;