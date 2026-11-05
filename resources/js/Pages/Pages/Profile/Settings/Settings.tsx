import React from 'react';
import { Card, Col, Container, Form, Nav, Row, Tab, } from 'react-bootstrap';
import Flatpickr from "react-flatpickr";

//import images
import progileBg from '../../../../../images/profile-bg.jpg';
import avatar1 from '../../../../../images/users/avatar-1.jpg';
import { Head, Link } from '@inertiajs/react';
import Layout from '../../../../Layouts';

const Settings = () => {
    return (
        <React.Fragment>
            <Head title='Profile Settings | Velzon - React Admin & Dashboard Template' />
            <div className="page-content">
                <Container fluid>
                    <div className="position-relative mx-n4 mt-n4">
                        <div className="profile-wid-bg profile-setting-img">
                            <img src={progileBg} className="profile-wid-img" alt="" />
                            <div className="overlay-content">
                                <div className="text-end p-3">
                                    <div className="p-0 ms-auto rounded-circle profile-photo-edit">
                                        <Form.Control id="profile-foreground-img-file-input" type="file"
                                            className="profile-foreground-img-file-input" />
                                        <Form.Label htmlFor="profile-foreground-img-file-input"
                                            className="profile-photo-edit btn btn-light">
                                            <i className="ri-image-edit-line align-bottom me-1"></i> Change Cover
                                        </Form.Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Row>
                        <Col xxl={3}>
                            <Card className="mt-n5">
                                <Card.Body className="p-4">
                                    <div className="text-center">
                                        <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                                            <img src={avatar1}
                                                className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                                alt="user-profile" />
                                            <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                                                <Form.Control id="profile-img-file-input" type="file"
                                                    className="profile-img-file-input" />
                                                <Form.Label htmlFor="profile-img-file-input"
                                                    className="profile-photo-edit avatar-xs">
                                                    <span className="avatar-title rounded-circle bg-light text-body">
                                                        <i className="ri-camera-fill"></i>
                                                    </span>
                                                </Form.Label>
                                            </div>
                                        </div>
                                        <h5 className="fs-16 mb-1">Anna Adame</h5>
                                        <p className="text-muted mb-0">Lead Designer / Developer</p>
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Body>
                                    <div className="d-flex align-items-center mb-5">
                                        <div className="flex-grow-1">
                                            <h5 className="card-title mb-0">Complete Your Profile</h5>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <Link href="#" className="badge bg-light text-primary fs-12"><i
                                                className="ri-edit-box-line align-bottom me-1"></i> Edit</Link>
                                        </div>
                                    </div>
                                    <div className="progress animated-progress custom-progress progress-label">
                                        <div className="progress-bar bg-danger" role="progressbar" style={{ "width": "30%" }}>
                                            <div className="label">30%</div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body>
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="flex-grow-1">
                                            <h5 className="card-title mb-0">Portfolio</h5>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <Link href="#" className="badge bg-light text-primary fs-12"><i
                                                className="ri-add-fill align-bottom me-1"></i> Add</Link>
                                        </div>
                                    </div>
                                    <div className="mb-3 d-flex">
                                        <div className="avatar-xs d-block flex-shrink-0 me-3">
                                            <span className="avatar-title rounded-circle fs-16 bg-dark text-light">
                                                <i className="ri-github-fill"></i>
                                            </span>
                                        </div>
                                        <Form.Control type="email" className="form-control" id="gitUsername" placeholder="Username"
                                            defaultValue="@daveadame" />
                                    </div>
                                    <div className="mb-3 d-flex">
                                        <div className="avatar-xs d-block flex-shrink-0 me-3">
                                            <span className="avatar-title rounded-circle fs-16 bg-primary">
                                                <i className="ri-global-fill"></i>
                                            </span>
                                        </div>
                                        <Form.Control type="text" className="form-control" id="websiteInput"
                                            placeholder="www.example.com" defaultValue="www.velzon.com" />
                                    </div>
                                    <div className="mb-3 d-flex">
                                        <div className="avatar-xs d-block flex-shrink-0 me-3">
                                            <span className="avatar-title rounded-circle fs-16 bg-success">
                                                <i className="ri-dribbble-fill"></i>
                                            </span>
                                        </div>
                                        <Form.Control type="text" className="form-control" id="dribbleName" placeholder="Username"
                                            defaultValue="@dave_adame" />
                                    </div>
                                    <div className="d-flex">
                                        <div className="avatar-xs d-block flex-shrink-0 me-3">
                                            <span className="avatar-title rounded-circle fs-16 bg-danger">
                                                <i className="ri-pinterest-fill"></i>
                                            </span>
                                        </div>
                                        <Form.Control type="text" className="form-control" id="pinterestName"
                                            placeholder="Username" defaultValue="Advance Dave" />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xxl={9}>
                            <Card className="mt-xxl-n5">
                                <Tab.Container defaultActiveKey="personal-details">
                                    <Card.Header>
                                        <Nav className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
                                            role="tablist">
                                            <Nav.Item>
                                                <Nav.Link eventKey="personal-details">
                                                    <i className="fas fa-home"></i>
                                                    Personal Details
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="change-password">
                                                    <i className="far fa-user"></i>
                                                    Change Password
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item >
                                                <Nav.Link eventKey="experience">
                                                    <i className="far fa-envelope"></i>
                                                    Experience
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="privacy-policy">
                                                    <i className="far fa-envelope"></i>
                                                    Privacy Policy
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Card.Header>
                                    <Card.Body className="p-4">
                                        <Tab.Content>
                                            <Tab.Pane eventKey="personal-details">
                                                <Form>
                                                    <Row>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <Form.Label htmlFor="firstnameInput" className="form-label">First
                                                                    Name</Form.Label>
                                                                <Form.Control type="text" className="form-control" id="firstnameInput"
                                                                    placeholder="Enter your firstname" defaultValue="Dave" />
                                                            </div>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <Form.Label htmlFor="lastnameInput" className="form-label">Last
                                                                    Name</Form.Label>
                                                                <Form.Control type="text" className="form-control" id="lastnameInput"
                                                                    placeholder="Enter your lastname" defaultValue="Adame" />
                                                            </div>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <Form.Label htmlFor="phonenumberInput" className="form-label">Phone
                                                                    Number</Form.Label>
                                                                <Form.Control type="text" className="form-control"
                                                                    id="phonenumberInput"
                                                                    placeholder="Enter your phone number"
                                                                    defaultValue="+(1) 987 6543" />
                                                            </div>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <Form.Label htmlFor="emailInput" className="form-label">Email
                                                                    Address</Form.Label>
                                                                <Form.Control type="email" className="form-control" id="emailInput"
                                                                    placeholder="Enter your email"
                                                                    defaultValue="daveadame@velzon.com" />
                                                            </div>
                                                        </Col>
                                                        <Col lg={12}>
                                                            <div className="mb-3">
                                                                <Form.Label htmlFor="JoiningdatInput" className="form-label">Joining
                                                                    Date</Form.Label>
                                                                <Flatpickr
                                                                    className="form-control"
                                                                    options={{
                                                                        dateFormat: "d M, Y"
                                                                    }}
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col lg={12}>
                                                            <div className="mb-3">
                                                                <Form.Label htmlFor="skillsInput" className="form-label">Skills</Form.Label>
                                                                <select className="form-select mb-3">
                                                                    <option >Select your Skill </option>
                                                                    <option value="Choices1">CSS</option>
                                                                    <option value="Choices2">HTML</option>
                                                                    <option value="Choices3">PYTHON</option>
                                                                    <option value="Choices4">JAVA</option>
                                                                    <option value="Choices5">ASP.NET</option>
                                                                </select>
                                                            </div>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <Form.Label htmlFor="designationInput"
                                                                    className="form-label">Designation</Form.Label>
                                                                <Form.Control type="text" className="form-control"
                                                                    id="designationInput" placeholder="Designation"
                                                                    defaultValue="Lead Designer / Developer" />
                                                            </div>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <Form.Label htmlFor="websiteInput1"
                                                                    className="form-label">Website</Form.Label>
                                                                <Form.Control type="text" className="form-control" id="websiteInput1"
                                                                    placeholder="www.example.com" defaultValue="www.velzon.com" />
                                                            </div>
                                                        </Col>
                                                        <Col lg={4}>
                                                            <div className="mb-3">
                                                                <Form.Label htmlFor="cityInput" className="form-label">City</Form.Label>
                                                                <Form.Control type="text" className="form-control" id="cityInput"
                                                                    placeholder="City" defaultValue="California" />
                                                            </div>
                                                        </Col>
                                                        <Col lg={4}>
                                                            <div className="mb-3">
                                                                <Form.Label htmlFor="countryInput" className="form-label">Country</Form.Label>
                                                                <Form.Control type="text" className="form-control" id="countryInput"
                                                                    placeholder="Country" defaultValue="United States" />
                                                            </div>
                                                        </Col>
                                                        <Col lg={4}>
                                                            <div className="mb-3">
                                                                <Form.Label htmlFor="zipcodeInput" className="form-label">Zip
                                                                    Code</Form.Label>
                                                                <Form.Control type="text" className="form-control" minLength={5}
                                                                    maxLength={6} id="zipcodeInput"
                                                                    placeholder="Enter zipcode" defaultValue="90011" />
                                                            </div>
                                                        </Col>
                                                        <Col lg={12}>
                                                            <div className="mb-3 pb-2">
                                                                <Form.Label htmlFor="exampleFormControlTextarea"
                                                                    className="form-label">Description</Form.Label>
                                                                <textarea className="form-control"
                                                                    id="exampleFormControlTextarea"
                                                                    rows={3} defaultValue="Hi I'm Anna Adame, It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is European languages are members of the same family."></textarea>
                                                            </div>
                                                        </Col>
                                                        <Col lg={12}>
                                                            <div className="hstack gap-2 justify-content-end">
                                                                <button type="button"
                                                                    className="btn btn-primary">Updates</button>
                                                                <button type="button"
                                                                    className="btn btn-soft-success">Cancel</button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Tab.Pane>

                                            <Tab.Pane eventKey="change-password">
                                                <Form>
                                                    <Row className="g-2">
                                                        <Col lg={4}>
                                                            <div>
                                                                <Form.Label htmlFor="oldpasswordInput" className="form-label">Old
                                                                    Password*</Form.Label>
                                                                <Form.Control type="password" className="form-control"
                                                                    id="oldpasswordInput"
                                                                    placeholder="Enter current password" />
                                                            </div>
                                                        </Col>

                                                        <Col lg={4}>
                                                            <div>
                                                                <Form.Label htmlFor="newpasswordInput" className="form-label">New
                                                                    Password*</Form.Label>
                                                                <Form.Control type="password" className="form-control"
                                                                    id="newpasswordInput" placeholder="Enter new password" />
                                                            </div>
                                                        </Col>

                                                        <Col lg={4}>
                                                            <div>
                                                                <Form.Label htmlFor="confirmpasswordInput" className="form-label">Confirm
                                                                    Password*</Form.Label>
                                                                <Form.Control type="password" className="form-control"
                                                                    id="confirmpasswordInput"
                                                                    placeholder="Confirm password" />
                                                            </div>
                                                        </Col>

                                                        <Col lg={12}>
                                                            <div className="mb-3">
                                                                <Link href="#"
                                                                    className="link-primary text-decoration-underline">Forgot
                                                                    Password ?</Link>
                                                            </div>
                                                        </Col>

                                                        <Col lg={12}>
                                                            <div className="text-end">
                                                                <button type="button" className="btn btn-secondary">Change
                                                                    Password</button>
                                                            </div>
                                                        </Col>

                                                    </Row>

                                                </Form>
                                                <div className="mt-4 mb-3 border-bottom pb-2">
                                                    <div className="float-end">
                                                        <Link href="#" className="link-primary">All Logout</Link>
                                                    </div>
                                                    <h5 className="card-title">Login History</h5>
                                                </div>
                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="flex-shrink-0 avatar-sm">
                                                        <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                            <i className="ri-smartphone-line"></i>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <h6>iPhone 12 Pro</h6>
                                                        <p className="text-muted mb-0">Los Angeles, United States - March 16 at
                                                            2:47PM</p>
                                                    </div>
                                                    <div>
                                                        <Link href="#">Logout</Link>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="flex-shrink-0 avatar-sm">
                                                        <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                            <i className="ri-tablet-line"></i>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <h6>Apple iPad Pro</h6>
                                                        <p className="text-muted mb-0">Washington, United States - November 06
                                                            at 10:43AM</p>
                                                    </div>
                                                    <div>
                                                        <Link href="#">Logout</Link>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="flex-shrink-0 avatar-sm">
                                                        <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                            <i className="ri-smartphone-line"></i>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <h6>Galaxy S21 Ultra 5G</h6>
                                                        <p className="text-muted mb-0">Conneticut, United States - June 12 at
                                                            3:24PM</p>
                                                    </div>
                                                    <div>
                                                        <Link href="#">Logout</Link>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-shrink-0 avatar-sm">
                                                        <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                            <i className="ri-macbook-line"></i>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <h6>Dell Inspiron 14</h6>
                                                        <p className="text-muted mb-0">Phoenix, United States - July 26 at
                                                            8:10AM</p>
                                                    </div>
                                                    <div>
                                                        <Link href="#">Logout</Link>
                                                    </div>
                                                </div>
                                            </Tab.Pane>

                                            <Tab.Pane eventKey="experience">
                                                <form>
                                                    <div id="newlink">
                                                        <div id="1">
                                                            <Row>
                                                                <Col lg={12}>
                                                                    <div className="mb-3">
                                                                        <Form.Label htmlFor="jobTitle" className="form-label">Job
                                                                            Title</Form.Label>
                                                                        <Form.Control type="text" className="form-control"
                                                                            id="jobTitle" placeholder="Job title"
                                                                            defaultValue="Lead Designer / Developer" />
                                                                    </div>
                                                                </Col>

                                                                <Col lg={6}>
                                                                    <div className="mb-3">
                                                                        <Form.Label htmlFor="companyName" className="form-label">Company
                                                                            Name</Form.Label>
                                                                        <Form.Control type="text" className="form-control"
                                                                            id="companyName" placeholder="Company name"
                                                                            defaultValue="Themesbrand" />
                                                                    </div>
                                                                </Col>

                                                                <Col lg={6}>
                                                                    <div className="mb-3">
                                                                        <Form.Label htmlFor="experienceYear"
                                                                            className="form-label">Experience Years</Form.Label>
                                                                        <Row>
                                                                            <Col lg={5}>
                                                                                <select className="form-control" data-choices
                                                                                    data-choices-search-false
                                                                                    name="experienceYear"
                                                                                    id="experienceYear">
                                                                                    <option defaultValue="">Select years</option>
                                                                                    <option value="Choice 1">2001</option>
                                                                                    <option value="Choice 2">2002</option>
                                                                                    <option value="Choice 3">2003</option>
                                                                                    <option value="Choice 4">2004</option>
                                                                                    <option value="Choice 5">2005</option>
                                                                                    <option value="Choice 6">2006</option>
                                                                                    <option value="Choice 7">2007</option>
                                                                                    <option value="Choice 8">2008</option>
                                                                                    <option value="Choice 9">2009</option>
                                                                                    <option value="Choice 10">2010</option>
                                                                                    <option value="Choice 11">2011</option>
                                                                                    <option value="Choice 12">2012</option>
                                                                                    <option value="Choice 13">2013</option>
                                                                                    <option value="Choice 14">2014</option>
                                                                                    <option value="Choice 15">2015</option>
                                                                                    <option value="Choice 16">2016</option>
                                                                                    <option value="Choice 17" >2017</option>
                                                                                    <option value="Choice 18">2018</option>
                                                                                    <option value="Choice 19">2019</option>
                                                                                    <option value="Choice 20">2020</option>
                                                                                    <option value="Choice 21">2021</option>
                                                                                    <option value="Choice 22">2022</option>
                                                                                </select>
                                                                            </Col>

                                                                            <div className="col-auto align-self-center">
                                                                                to
                                                                            </div>

                                                                            <Col lg={5}>
                                                                                <select className="form-control" data-choices
                                                                                    data-choices-search-false
                                                                                    name="choices-single-default2">
                                                                                    <option defaultValue="">Select years</option>
                                                                                    <option value="Choice 1">2001</option>
                                                                                    <option value="Choice 2">2002</option>
                                                                                    <option value="Choice 3">2003</option>
                                                                                    <option value="Choice 4">2004</option>
                                                                                    <option value="Choice 5">2005</option>
                                                                                    <option value="Choice 6">2006</option>
                                                                                    <option value="Choice 7">2007</option>
                                                                                    <option value="Choice 8">2008</option>
                                                                                    <option value="Choice 9">2009</option>
                                                                                    <option value="Choice 10">2010</option>
                                                                                    <option value="Choice 11">2011</option>
                                                                                    <option value="Choice 12">2012</option>
                                                                                    <option value="Choice 13">2013</option>
                                                                                    <option value="Choice 14">2014</option>
                                                                                    <option value="Choice 15">2015</option>
                                                                                    <option value="Choice 16">2016</option>
                                                                                    <option value="Choice 17">2017</option>
                                                                                    <option value="Choice 18">2018</option>
                                                                                    <option value="Choice 19">2019</option>
                                                                                    <option value="Choice 20">2020</option>
                                                                                    <option value="Choice 21">2021</option>
                                                                                    <option value="Choice 22">2022</option>
                                                                                </select>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                </Col>

                                                                <Col lg={12}>
                                                                    <div className="mb-3">
                                                                        <Form.Label htmlFor="jobDescription" className="form-label">Job
                                                                            Description</Form.Label>
                                                                        <Form.Control type='textarea'
                                                                            className="form-control" id="jobDescription"
                                                                            // rows={3}
                                                                            placeholder='Enter description'
                                                                            defaultValue="You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you're working with reputable font websites."
                                                                        />
                                                                    </div>
                                                                </Col>

                                                                <div className="hstack gap-2 justify-content-end">
                                                                    <Link className="btn btn-success"
                                                                        href="#">Delete</Link>
                                                                </div>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                    <div id="newForm" style={{ "display": "none" }}>
                                                    </div>

                                                    <Col lg={12}>
                                                        <div className="hstack gap-2">
                                                            <button type="submit" className="btn btn-success">Update</button>
                                                            <Link href="#" className="btn btn-primary">Add
                                                                New</Link>
                                                        </div>
                                                    </Col>
                                                </form>
                                            </Tab.Pane>

                                            <Tab.Pane eventKey="privacy-policy">
                                                <div className="mb-4 pb-2">
                                                    <h5 className="card-title text-decoration-underline mb-3">Security:</h5>
                                                    <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0">
                                                        <div className="flex-grow-1">
                                                            <h6 className="fs-14 mb-1">Two-factor Authentication</h6>
                                                            <p className="text-muted">Two-factor authentication is an enhanced
                                                                security meansur. Once enabled, you'll be required to give
                                                                two types of identification when you log into Google
                                                                Authentication and SMS are Supported.</p>
                                                        </div>
                                                        <div className="flex-shrink-0 ms-sm-3">
                                                            <Link href="#"
                                                                className="btn btn-sm btn-primary">Enable Two-facor
                                                                Authentication</Link>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                                                        <div className="flex-grow-1">
                                                            <h6 className="fs-14 mb-1">Secondary Verification</h6>
                                                            <p className="text-muted">The first factor is a password and the
                                                                second commonly includes a text with a code sent to your
                                                                smartphone, or biometrics using your fingerprint, face, or
                                                                retina.</p>
                                                        </div>
                                                        <div className="flex-shrink-0 ms-sm-3">
                                                            <Link href="#" className="btn btn-sm btn-primary">Set
                                                                up secondary method</Link>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                                                        <div className="flex-grow-1">
                                                            <h6 className="fs-14 mb-1">Backup Codes</h6>
                                                            <p className="text-muted mb-sm-0">A backup code is automatically
                                                                generated for you when you turn on two-factor authentication
                                                                through your iOS or Android Twitter app. You can also
                                                                generate a backup code on twitter.com.</p>
                                                        </div>
                                                        <div className="flex-shrink-0 ms-sm-3">
                                                            <Link href="#"
                                                                className="btn btn-sm btn-primary">Generate backup codes</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <h5 className="card-title text-decoration-underline mb-3">Application Notifications:</h5>
                                                    <ul className="list-unstyled mb-0">
                                                        <li className="d-flex">
                                                            <div className="flex-grow-1">
                                                                <Form.Label htmlFor="directMessage"
                                                                    className="form-check-label fs-14">Direct messages</Form.Label>
                                                                <p className="text-muted">Messages from people you follow</p>
                                                            </div>
                                                            <div className="flex-shrink-0">
                                                                <div className="form-check form-switch">
                                                                    <Form.Control className="form-check-input" type="checkbox"
                                                                        role="switch" id="directMessage" defaultChecked />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="d-flex mt-2">
                                                            <div className="flex-grow-1">
                                                                <Form.Label className="form-check-label fs-14"
                                                                    htmlFor="desktopNotification">
                                                                    Show desktop notifications
                                                                </Form.Label>
                                                                <p className="text-muted">Choose the option you want as your
                                                                    default setting. Block a site: Next to "Not allowed to
                                                                    send notifications," click Add.</p>
                                                            </div>
                                                            <div className="flex-shrink-0">
                                                                <div className="form-check form-switch">
                                                                    <Form.Control className="form-check-input" type="checkbox"
                                                                        role="switch" id="desktopNotification" defaultChecked />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="d-flex mt-2">
                                                            <div className="flex-grow-1">
                                                                <Form.Label className="form-check-label fs-14"
                                                                    htmlFor="emailNotification">
                                                                    Show email notifications
                                                                </Form.Label>
                                                                <p className="text-muted"> Under Settings, choose Notifications.
                                                                    Under Select an account, choose the account to enable
                                                                    notifications for. </p>
                                                            </div>
                                                            <div className="flex-shrink-0">
                                                                <div className="form-check form-switch">
                                                                    <Form.Control className="form-check-input" type="checkbox"
                                                                        role="switch" id="emailNotification" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="d-flex mt-2">
                                                            <div className="flex-grow-1">
                                                                <Form.Label className="form-check-label fs-14"
                                                                    htmlFor="chatNotification">
                                                                    Show chat notifications
                                                                </Form.Label>
                                                                <p className="text-muted">To prevent duplicate mobile
                                                                    notifications from the Gmail and Chat apps, in settings,
                                                                    turn off Chat notifications.</p>
                                                            </div>
                                                            <div className="flex-shrink-0">
                                                                <div className="form-check form-switch">
                                                                    <Form.Control className="form-check-input" type="checkbox"
                                                                        role="switch" id="chatNotification" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="d-flex mt-2">
                                                            <div className="flex-grow-1">
                                                                <Form.Label className="form-check-label fs-14"
                                                                    htmlFor="purchaesNotification">
                                                                    Show purchase notifications
                                                                </Form.Label>
                                                                <p className="text-muted">Get real-time purchase alerts to
                                                                    protect yourself from fraudulent charges.</p>
                                                            </div>
                                                            <div className="flex-shrink-0">
                                                                <div className="form-check form-switch">
                                                                    <Form.Control className="form-check-input" type="checkbox"
                                                                        role="switch" id="purchaesNotification" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h5 className="card-title text-decoration-underline mb-3">Delete This
                                                        Account:</h5>
                                                    <p className="text-muted">Go to the Data & Privacy section of your profile
                                                        Account. Scroll to "Your data & privacy options." Delete your
                                                        Profile Account. Follow the instructions to delete your account :
                                                    </p>
                                                    <div>
                                                        <Form.Control type="password" className="form-control" id="passwordInput"
                                                            placeholder="Enter your password" defaultValue="make@321654987"
                                                            style={{ maxWidth: "265px" }} />
                                                    </div>
                                                    <div className="hstack gap-2 mt-3">
                                                        <Link href="#" className="btn btn-soft-danger">Close &
                                                            Delete This Account</Link>
                                                        <Link href="#" className="btn btn-light">Cancel</Link>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Card.Body>
                                </Tab.Container>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment >
    );
};
Settings.layout = (page:any) => <Layout children={page} />

export default Settings;