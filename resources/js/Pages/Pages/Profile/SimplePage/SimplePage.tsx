import React from 'react';
import { Card, Col, Container, Nav, Pagination, Row, Tab, Dropdown, Form, Table, Accordion } from 'react-bootstrap';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
//Images
import profileBg from '../../../../../images/profile-bg.jpg';
import avatar1 from '../../../../../images/users/avatar-1.jpg';
import avatar2 from '../../../../../images/users/avatar-2.jpg';
import avatar3 from '../../../../../images/users/avatar-3.jpg';
import avatar4 from '../../../../../images/users/avatar-4.jpg';
import avatar5 from '../../../../../images/users/avatar-5.jpg';
import avatar6 from '../../../../../images/users/avatar-6.jpg';
import avatar7 from '../../../../../images/users/avatar-7.jpg';
import avatar8 from '../../../../../images/users/avatar-8.jpg';

import smallImage2 from '../../../../../images/small/img-2.jpg';
import smallImage3 from '../../../../../images/small/img-3.jpg';
import smallImage4 from '../../../../../images/small/img-4.jpg';
import smallImage5 from '../../../../../images/small/img-5.jpg';
import smallImage6 from '../../../../../images/small/img-6.jpg';
import smallImage7 from '../../../../../images/small/img-7.jpg';
import smallImage9 from '../../../../../images/small/img-9.jpg';

import { projects, documents } from '../../../../common/data';
import { Head, Link } from '@inertiajs/react';
import Layout from '../../../../Layouts';

const SimplePage = () => {

    const allAccordionItems = ['item1', 'item2', 'item3', 'item4', 'item5'];
    const allAccordionItems2 = ['item1', 'item2', 'item3', 'item4', 'item5'];
    const allAccordionItems3 = ['item1', 'item2', 'item3', 'item4', 'item5'];

    return (
        <React.Fragment>
            <Head title='Profile | Velzon - React Admin & Dashboard Template' />
            <div className="page-content">
                <Container fluid>
                    <div className="profile-foreground position-relative mx-n4 mt-n4">
                        <div className="profile-wid-bg">
                            <img src={profileBg} alt="" className="profile-wid-img" />
                        </div>
                    </div>
                    <div className="pt-4 mb-4 mb-lg-3 pb-lg-4">
                        <Row className="g-4">
                            <div className="col-auto">
                                <div className="avatar-lg">
                                    <img src={avatar1} alt="user-img"
                                        className="img-thumbnail rounded-circle" />
                                </div>
                            </div>

                            <Col>
                                <div className="p-2">
                                    <h3 className="text-white mb-1">Anna Adame</h3>
                                    <p className="text-white text-opacity-75">Owner & Founder</p>
                                    <div className="hstack text-white-50 gap-1">
                                        <div className="me-2"><i
                                            className="ri-map-pin-user-line me-1 text-white text-opacity-75 fs-16 align-middle"></i>California,
                                            United States</div>
                                        <div><i
                                            className="ri-building-line me-1 text-white text-opacity-75 fs-16 align-middle"></i>Themesbrand
                                        </div>
                                    </div>
                                </div>
                            </Col>

                            <Col xs={12} className="col-lg-auto order-last order-lg-0">
                                <Row className="text text-white-50 text-center">
                                    <Col lg={6} xs={4}>
                                        <div className="p-2">
                                            <h4 className="text-white mb-1">24.3K</h4>
                                            <p className="fs-14 mb-0">Followers</p>
                                        </div>
                                    </Col>
                                    <Col lg={6} xs={4}>
                                        <div className="p-2">
                                            <h4 className="text-white mb-1">1.3K</h4>
                                            <p className="fs-14 mb-0">Following</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        <Col lg={12}>
                            <div>
                                <Tab.Container defaultActiveKey="overview">
                                    <div className="d-flex">
                                        <Nav className="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1 mx-3"
                                            role="tablist" as="ul">
                                            <Nav.Item className="fs-14">
                                                <Nav.Link eventKey="overview">
                                                    <i className="ri-airplay-fill d-inline-block d-md-none"></i> <span
                                                        className="d-none d-md-inline-block">Overview</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className="fs-14">
                                                <Nav.Link eventKey="activities">
                                                    <i className="ri-list-unordered d-inline-block d-md-none"></i> <span
                                                        className="d-none d-md-inline-block">Activities</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className="fs-14">
                                                <Nav.Link eventKey="projects">
                                                    <i className="ri-price-tag-line d-inline-block d-md-none"></i> <span
                                                        className="d-none d-md-inline-block">Projects</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className="fs-14">
                                                <Nav.Link eventKey="documents">
                                                    <i className="ri-folder-4-line d-inline-block d-md-none"></i> <span
                                                        className="d-none d-md-inline-block">Documents</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                        <div className="flex-shrink-0">
                                            <a href="/pages-profile-settings" className="btn btn-success mx-3"><i
                                                className="ri-edit-box-line align-bottom"></i> Edit Profile</a>
                                        </div>
                                    </div>

                                    <Tab.Content className="pt-4">
                                        <Tab.Pane eventKey="overview">
                                            <Row>
                                                <Col xxl={3}>
                                                    <Card>
                                                        <Card.Body>
                                                            <h5 className="card-title mb-5">Complete Your Profile</h5>
                                                            <div className="progress animated-progress custom-progress progress-label">
                                                                <div className="progress-bar bg-danger" role="progressbar" style={{ "width": "30%" }}>
                                                                    <div className="label">30%</div>
                                                                </div>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>

                                                    <Card>
                                                        <Card.Body>
                                                            <h5 className="card-title mb-3">Info</h5>
                                                            <div className="table-responsive">
                                                                <Table className="table-borderless mb-0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <th className="ps-0" scope="row">Full Name :</th>
                                                                            <td className="text-muted">Anna Adame</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th className="ps-0" scope="row">Mobile :</th>
                                                                            <td className="text-muted">+(1) 987 6543</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th className="ps-0" scope="row">E-mail :</th>
                                                                            <td className="text-muted">daveadame@velzon.com</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th className="ps-0" scope="row">Location :</th>
                                                                            <td className="text-muted">California, United States
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th className="ps-0" scope="row">Joining Date</th>
                                                                            <td className="text-muted">24 Nov 2021</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </Table>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>

                                                    <Card>
                                                        <Card.Body>
                                                            <h5 className="card-title mb-4">Portfolio</h5>
                                                            <div className="d-flex flex-wrap gap-2">
                                                                <div>
                                                                    <Link href="#" className="avatar-xs d-block">
                                                                        <span
                                                                            className="avatar-title rounded-circle fs-16 bg-dark text-light">
                                                                            <i className="ri-github-fill"></i>
                                                                        </span>
                                                                    </Link>
                                                                </div>
                                                                <div>
                                                                    <Link href="#" className="avatar-xs d-block">
                                                                        <span
                                                                            className="avatar-title rounded-circle fs-16 bg-primary">
                                                                            <i className="ri-global-fill"></i>
                                                                        </span>
                                                                    </Link>
                                                                </div>
                                                                <div>
                                                                    <Link href="#" className="avatar-xs d-block">
                                                                        <span
                                                                            className="avatar-title rounded-circle fs-16 bg-success">
                                                                            <i className="ri-dribbble-fill"></i>
                                                                        </span>
                                                                    </Link>
                                                                </div>
                                                                <div>
                                                                    <Link href="#" className="avatar-xs d-block">
                                                                        <span
                                                                            className="avatar-title rounded-circle fs-16 bg-danger">
                                                                            <i className="ri-pinterest-fill"></i>
                                                                        </span>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>

                                                    <Card>
                                                        <Card.Body>
                                                            <h5 className="card-title mb-4">Skills</h5>
                                                            <div className="d-flex flex-wrap gap-2 fs-15">
                                                                <Link href="#"
                                                                    className="badge bg-primary-subtle text-primary">Photoshop</Link>
                                                                <Link href="#"
                                                                    className="badge bg-primary-subtle text-primary">illustrator</Link>
                                                                <Link href="#"
                                                                    className="badge bg-primary-subtle text-primary">HTML</Link>
                                                                <Link href="#"
                                                                    className="badge bg-primary-subtle text-primary">CSS</Link>
                                                                <Link href="#"
                                                                    className="badge bg-primary-subtle text-primary">Javascript</Link>
                                                                <Link href="#"
                                                                    className="badge bg-primary-subtle text-primary">Php</Link>
                                                                <Link href="#"
                                                                    className="badge bg-primary-subtle text-primary">Python</Link>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>

                                                    <Card>
                                                        <Card.Body>
                                                            <div className="d-flex align-items-center mb-4">
                                                                <div className="flex-grow-1">
                                                                    <h5 className="card-title mb-0">Suggestions</h5>
                                                                </div>
                                                                <div className="flex-shrink-0">

                                                                    <Dropdown dir='start'>
                                                                        <Dropdown.Toggle as="a" id="dropdown.MenuLink2" role="button" className='arrow-none'>
                                                                            <i className="ri-more-2-fill fs-14"></i>
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu>
                                                                            <Dropdown.Item>View</Dropdown.Item>
                                                                            <Dropdown.Item>Edit</Dropdown.Item>
                                                                            <Dropdown.Item>Delete</Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>

                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="d-flex align-items-center py-3">
                                                                    <div className="avatar-xs flex-shrink-0 me-3">
                                                                        <img src={avatar3} alt=""
                                                                            className="img-fluid rounded-circle" />
                                                                    </div>
                                                                    <div className="flex-grow-1">
                                                                        <div>
                                                                            <h5 className="fs-14 mb-1">Esther James</h5>
                                                                            <p className="fs-13 text-muted mb-0">Frontend
                                                                                Developer</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex-shrink-0 ms-2">
                                                                        <button type="button"
                                                                            className="btn btn-sm btn-outline-success"><i
                                                                                className="ri-user-add-line align-middle"></i></button>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex align-items-center py-3">
                                                                    <div className="avatar-xs flex-shrink-0 me-3">
                                                                        <img src={avatar4} alt=""
                                                                            className="img-fluid rounded-circle" />
                                                                    </div>
                                                                    <div className="flex-grow-1">
                                                                        <div>
                                                                            <h5 className="fs-14 mb-1">Jacqueline Steve</h5>
                                                                            <p className="fs-13 text-muted mb-0">UI/UX Designer
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex-shrink-0 ms-2">
                                                                        <button type="button"
                                                                            className="btn btn-sm btn-outline-success"><i
                                                                                className="ri-user-add-line align-middle"></i></button>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex align-items-center py-3">
                                                                    <div className="avatar-xs flex-shrink-0 me-3">
                                                                        <img src={avatar5} alt=""
                                                                            className="img-fluid rounded-circle" />
                                                                    </div>
                                                                    <div className="flex-grow-1">
                                                                        <div>
                                                                            <h5 className="fs-14 mb-1">George Whalen</h5>
                                                                            <p className="fs-13 text-muted mb-0">Backend
                                                                                Developer</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex-shrink-0 ms-2">
                                                                        <button type="button"
                                                                            className="btn btn-sm btn-outline-success"><i
                                                                                className="ri-user-add-line align-middle"></i></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>


                                                    <Card>
                                                        <Card.Body>
                                                            <div className="d-flex align-items-center mb-4">
                                                                <div className="flex-grow-1">
                                                                    <h5 className="card-title mb-0">Popular Posts</h5>
                                                                </div>
                                                                <div className="flex-shrink-0">
                                                                    <Dropdown dir='start'>
                                                                        <Dropdown.Toggle as="a" id="dropdown.MenuLink1" role="button" className='arrow-none'>
                                                                            <i className="ri-more-2-fill fs-14"></i>
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu>
                                                                            <Dropdown.Item>View</Dropdown.Item>
                                                                            <Dropdown.Item>Edit</Dropdown.Item>
                                                                            <Dropdown.Item>Delete</Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex mb-4">
                                                                <div className="flex-shrink-0">
                                                                    <img src={smallImage4} alt=""
                                                                        height="50" className="rounded" />
                                                                </div>
                                                                <div className="flex-grow-1 ms-3 overflow-hidden">
                                                                    <Link href="#">
                                                                        <h6 className="text-truncate fs-14">Design your apps in
                                                                            your own way</h6>
                                                                    </Link>
                                                                    <p className="text-muted mb-0">15 Dec 2021</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex mb-4">
                                                                <div className="flex-shrink-0">
                                                                    <img src={smallImage5} alt=""
                                                                        height="50" className="rounded" />
                                                                </div>
                                                                <div className="flex-grow-1 ms-3 overflow-hidden">
                                                                    <Link href="#">
                                                                        <h6 className="text-truncate fs-14">Smartest
                                                                            Applications for Business</h6>
                                                                    </Link>
                                                                    <p className="text-muted mb-0">28 Nov 2021</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex">
                                                                <div className="flex-shrink-0">
                                                                    <img src={smallImage6} alt=""
                                                                        height="50" className="rounded" />
                                                                </div>
                                                                <div className="flex-grow-1 ms-3 overflow-hidden">
                                                                    <Link href="#">
                                                                        <h6 className="text-truncate fs-14">How to get creative
                                                                            in your work</h6>
                                                                    </Link>
                                                                    <p className="text-muted mb-0">21 Nov 2021</p>
                                                                </div>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col xxl={9}>
                                                    <Card>
                                                        <Card.Body>
                                                            <h5 className="card-title mb-3">About</h5>
                                                            <p>Hi I'm Anna Adame, It will be as simple as Occidental; in
                                                                fact, it will be Occidental. To an English person, it will
                                                                seem like simplified English, as a skeptical Cambridge
                                                                friend of mine told me what Occidental is European languages
                                                                are members of the same family.</p>
                                                            <p>You always want to make sure that your fonts work well
                                                                together and try to limit the number of fonts you use to
                                                                three or less. Experiment and play around with the fonts
                                                                that you already have in the software you’re working with
                                                                reputable font websites. This may be the most commonly
                                                                encountered tip I received from the designers I spoke with.
                                                                They highly encourage that you use different fonts in one
                                                                design, but do not over-exaggerate and go overboard.</p>
                                                            <Row>
                                                                <Col xs={6} md={4}>
                                                                    <div className="d-flex mt-4">
                                                                        <div
                                                                            className="flex-shrink-0 avatar-xs align-self-center me-3">
                                                                            <div
                                                                                className="avatar-title bg-light rounded-circle fs-16 text-primary">
                                                                                <i className="ri-user-2-fill"></i>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex-grow-1 overflow-hidden">
                                                                            <p className="mb-1">Designation :</p>
                                                                            <h6 className="text-truncate mb-0">Lead Designer /
                                                                                Developer</h6>
                                                                        </div>
                                                                    </div>
                                                                </Col>

                                                                <Col xs={6} md={4}>
                                                                    <div className="d-flex mt-4">
                                                                        <div
                                                                            className="flex-shrink-0 avatar-xs align-self-center me-3">
                                                                            <div
                                                                                className="avatar-title bg-light rounded-circle fs-16 text-primary">
                                                                                <i className="ri-global-line"></i>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex-grow-1 overflow-hidden">
                                                                            <p className="mb-1">Website :</p>
                                                                            <Link href="#" className="fw-semibold">www.velzon.com</Link>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Card.Body>
                                                    </Card>

                                                    <Row>
                                                        <Col lg={12}>
                                                            <Card>
                                                                <Tab.Container defaultActiveKey="today">
                                                                    <Card.Header className="align-items-center d-flex">
                                                                        <h4 className="card-title mb-0  me-2">Recent Activity</h4>
                                                                        <div className="flex-shrink-0 ms-auto">
                                                                            <Nav className="justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0"
                                                                                role="tablist">
                                                                                <Nav.Item>
                                                                                    <Nav.Link eventKey="today">
                                                                                        Today
                                                                                    </Nav.Link>
                                                                                </Nav.Item>
                                                                                <Nav.Item>
                                                                                    <Nav.Link eventKey="weekly">
                                                                                        Weekly
                                                                                    </Nav.Link>
                                                                                </Nav.Item>
                                                                                <Nav.Item>
                                                                                    <Nav.Link eventKey="monthly">
                                                                                        Monthly
                                                                                    </Nav.Link>
                                                                                </Nav.Item>
                                                                            </Nav>
                                                                        </div>
                                                                    </Card.Header>
                                                                    <Card.Body>
                                                                        <Tab.Content className="text-muted">
                                                                            <Tab.Pane eventKey="today">
                                                                                <div className="profile-timeline">
                                                                                    <Accordion defaultActiveKey={allAccordionItems} className="accordion-flush" id="todayExample" alwaysOpen>
                                                                                        <Accordion.Item className="border-0" eventKey='item1'>
                                                                                            <Accordion.Header>
                                                                                                <button className="accordion-button p-2 shadow-none" type="button" id="headingOne" >
                                                                                                    <div className="d-flex">
                                                                                                        <div className="flex-shrink-0">
                                                                                                            <img src={avatar2} alt="" className="avatar-xs rounded-circle" />
                                                                                                        </div>
                                                                                                        <div
                                                                                                            className="flex-grow-1 ms-3">
                                                                                                            <h6
                                                                                                                className="fs-14 mb-1">
                                                                                                                Jacqueline Steve
                                                                                                            </h6>
                                                                                                            <small className="text-muted">We has changed 2 attributes on 05:16PM</small>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </button>
                                                                                            </Accordion.Header>
                                                                                            <Accordion.Body
                                                                                                className="ms-2 ps-5">
                                                                                                In an awareness campaign, it
                                                                                                is vital for people to begin
                                                                                                put 2 and 2 together and
                                                                                                begin to recognize your
                                                                                                cause. Too much or too
                                                                                                little spacing, as in the
                                                                                                example below, can make
                                                                                                things unpleasant for the
                                                                                                reader. The goal is to make
                                                                                                your text as comfortable to
                                                                                                read as possible. A
                                                                                                wonderful serenity has taken
                                                                                                possession of my entire
                                                                                                soul, like these sweet
                                                                                                mornings of spring which I
                                                                                                enjoy with my whole heart.
                                                                                            </Accordion.Body>
                                                                                        </Accordion.Item>
                                                                                        <Accordion.Item eventKey='item2' className="border-0">
                                                                                            <Accordion.Header id="headingTwo">
                                                                                                <Link href="#" className="accordion-button p-2 shadow-none" id="collapseTwo">
                                                                                                    <div className="d-flex">
                                                                                                        <div
                                                                                                            className="flex-shrink-0 avatar-xs">
                                                                                                            <div
                                                                                                                className="avatar-title bg-light text-success rounded-circle">
                                                                                                                M
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div
                                                                                                            className="flex-grow-1 ms-3">
                                                                                                            <h6
                                                                                                                className="fs-14 mb-1">
                                                                                                                Megan Elmore
                                                                                                            </h6>
                                                                                                            <small
                                                                                                                className="text-muted">Adding
                                                                                                                a new event with
                                                                                                                attachments -
                                                                                                                04:45PM</small>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </Link>
                                                                                            </Accordion.Header>
                                                                                            <Accordion.Body
                                                                                                className="ms-2 ps-5">
                                                                                                <Row className="g-2">
                                                                                                    <div className="col-auto">
                                                                                                        <div
                                                                                                            className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                                            <div
                                                                                                                className="flex-shrink-0">
                                                                                                                <i
                                                                                                                    className="ri-image-2-line fs-17 text-danger"></i>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                className="flex-grow-1 ms-2">
                                                                                                                <h6><Link href="#"
                                                                                                                    className="stretched-link">Business
                                                                                                                    Template
                                                                                                                    -
                                                                                                                    UI/UX
                                                                                                                    design</Link>
                                                                                                                </h6>
                                                                                                                <small>685
                                                                                                                    KB</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="col-auto">
                                                                                                        <div
                                                                                                            className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                                            <div
                                                                                                                className="flex-shrink-0">
                                                                                                                <i
                                                                                                                    className="ri-file-zip-line fs-17 text-info"></i>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                className="flex-grow-1 ms-2">
                                                                                                                <h6><Link href="#"
                                                                                                                    className="stretched-link">Bank
                                                                                                                    Management
                                                                                                                    System
                                                                                                                    -
                                                                                                                    PSD</Link>
                                                                                                                </h6>
                                                                                                                <small>8.78
                                                                                                                    MB</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </Row>
                                                                                            </Accordion.Body>
                                                                                        </Accordion.Item>
                                                                                        <Accordion.Item eventKey='item3' className="border-0">
                                                                                            <Accordion.Header
                                                                                                id="headingThree">
                                                                                                <Link href="#" className="accordion-button p-2 shadow-none">
                                                                                                    <div className="d-flex">
                                                                                                        <div
                                                                                                            className="flex-shrink-0">
                                                                                                            <img src={avatar5}
                                                                                                                alt=""
                                                                                                                className="avatar-xs rounded-circle" />
                                                                                                        </div>
                                                                                                        <div
                                                                                                            className="flex-grow-1 ms-3">
                                                                                                            <h6
                                                                                                                className="fs-14 mb-1">
                                                                                                                New ticket
                                                                                                                received</h6>
                                                                                                            <small
                                                                                                                className="text-muted mb-2">User
                                                                                                                <span
                                                                                                                    className="text-secondary">Erica245</span>
                                                                                                                submitted a
                                                                                                                ticket -
                                                                                                                02:33PM</small>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </Link>
                                                                                            </Accordion.Header>
                                                                                        </Accordion.Item>
                                                                                        <Accordion.Item eventKey='item4' className="border-0">
                                                                                            <Accordion.Header
                                                                                                id="headingFour">
                                                                                                <Link href="#" className="accordion-button p-2 shadow-none" id="collapseFour" >
                                                                                                    <div className="d-flex">
                                                                                                        <div
                                                                                                            className="flex-shrink-0 avatar-xs">
                                                                                                            <div
                                                                                                                className="avatar-title bg-light text-muted rounded-circle">
                                                                                                                <i
                                                                                                                    className="ri-user-3-fill"></i>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div
                                                                                                            className="flex-grow-1 ms-3">
                                                                                                            <h6
                                                                                                                className="fs-14 mb-1">
                                                                                                                Nancy Martino
                                                                                                            </h6>
                                                                                                            <small
                                                                                                                className="text-muted">Commented
                                                                                                                on
                                                                                                                12:57PM</small>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </Link>
                                                                                            </Accordion.Header>
                                                                                            <Accordion.Body
                                                                                                className="ms-2 ps-5">
                                                                                                " A wonderful serenity has
                                                                                                taken possession of my
                                                                                                entire soul, like these
                                                                                                sweet mornings of spring
                                                                                                which I enjoy with my whole
                                                                                                heart. Each design is a new,
                                                                                                unique piece of art birthed
                                                                                                into this world, and while
                                                                                                you have the opportunity to
                                                                                                be creative and make your
                                                                                                own style choices. "
                                                                                            </Accordion.Body>
                                                                                        </Accordion.Item>
                                                                                        <Accordion.Item eventKey='item5' className="border-0">
                                                                                            <Accordion.Header
                                                                                                id="headingFive">
                                                                                                <Link href="#" className="accordion-button p-2 shadow-none" id="collapseFive" >
                                                                                                    <div className="d-flex">
                                                                                                        <div
                                                                                                            className="flex-shrink-0">
                                                                                                            <img src={avatar7}
                                                                                                                alt=""
                                                                                                                className="avatar-xs rounded-circle" />
                                                                                                        </div>
                                                                                                        <div
                                                                                                            className="flex-grow-1 ms-3">
                                                                                                            <h6
                                                                                                                className="fs-14 mb-1">
                                                                                                                Lewis Arnold
                                                                                                            </h6>
                                                                                                            <small
                                                                                                                className="text-muted">Create
                                                                                                                new project
                                                                                                                buildng product
                                                                                                                -
                                                                                                                10:05AM</small>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </Link>
                                                                                            </Accordion.Header>
                                                                                            <Accordion.Body
                                                                                                className="ms-2 ps-5">
                                                                                                <p className="text-muted mb-2">
                                                                                                    Every team project can
                                                                                                    have a velzon. Use the
                                                                                                    velzon to share
                                                                                                    information with your
                                                                                                    team to understand and
                                                                                                    contribute to your
                                                                                                    project.</p>
                                                                                                <div className="avatar-group">
                                                                                                    <Link href="#"
                                                                                                        className="avatar-group-item"
                                                                                                        data-bs-toggle="tooltip"
                                                                                                        data-bs-trigger="hover"
                                                                                                        data-bs-placement="top"
                                                                                                        title=""
                                                                                                        data-bs-original-title="Christi">
                                                                                                        <img src={avatar4}
                                                                                                            alt=""
                                                                                                            className="rounded-circle avatar-xs" />
                                                                                                    </Link>
                                                                                                    <Link href="#"
                                                                                                        className="avatar-group-item"
                                                                                                        data-bs-toggle="tooltip"
                                                                                                        data-bs-trigger="hover"
                                                                                                        data-bs-placement="top"
                                                                                                        title=""
                                                                                                        data-bs-original-title="Frank Hook">
                                                                                                        <img src={avatar3}
                                                                                                            alt=""
                                                                                                            className="rounded-circle avatar-xs" />
                                                                                                    </Link>
                                                                                                    <Link href="#"
                                                                                                        className="avatar-group-item"
                                                                                                        data-bs-toggle="tooltip"
                                                                                                        data-bs-trigger="hover"
                                                                                                        data-bs-placement="top"
                                                                                                        title=""
                                                                                                        data-bs-original-title=" Ruby">
                                                                                                        <div
                                                                                                            className="avatar-xs">
                                                                                                            <div
                                                                                                                className="avatar-title rounded-circle bg-light text-primary">
                                                                                                                R
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </Link>
                                                                                                    <Link href="#"
                                                                                                        className="avatar-group-item"
                                                                                                        data-bs-toggle="tooltip"
                                                                                                        data-bs-trigger="hover"
                                                                                                        data-bs-placement="top"
                                                                                                        title=""
                                                                                                        data-bs-original-title="more">
                                                                                                        <div
                                                                                                            className="avatar-xs">
                                                                                                            <div
                                                                                                                className="avatar-title rounded-circle">
                                                                                                                2+
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </Link>
                                                                                                </div>
                                                                                            </Accordion.Body>
                                                                                        </Accordion.Item>
                                                                                    </Accordion>
                                                                                </div>
                                                                            </Tab.Pane>
                                                                            <Tab.Pane eventKey="weekly">
                                                                                <div className="profile-timeline">
                                                                                    <Accordion defaultActiveKey={allAccordionItems2} className="accordion-flush"
                                                                                        id="weeklyExample">
                                                                                        <Accordion.Item eventKey='item1' className="border-0">
                                                                                            <Accordion.Header
                                                                                                id="heading6">
                                                                                                <Link href="#" className="accordion-button p-2 shadow-none" id="collapse6">
                                                                                                    <div className="d-flex">
                                                                                                        <div
                                                                                                            className="flex-shrink-0">
                                                                                                            <img src={avatar3}
                                                                                                                alt=""
                                                                                                                className="avatar-xs rounded-circle" />
                                                                                                        </div>
                                                                                                        <div
                                                                                                            className="flex-grow-1 ms-3">
                                                                                                            <h6
                                                                                                                className="fs-14 mb-1">
                                                                                                                Joseph Parker
                                                                                                            </h6>
                                                                                                            <small
                                                                                                                className="text-muted">New
                                                                                                                people joined
                                                                                                                with our company
                                                                                                                -
                                                                                                                Yesterday</small>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </Link>
                                                                                            </Accordion.Header>
                                                                                            <Accordion.Body
                                                                                                className="ms-2 ps-5">
                                                                                                It makes a statement, it’s
                                                                                                impressive graphic design.
                                                                                                Increase or decrease the
                                                                                                letter spacing depending on
                                                                                                the situation and try, try
                                                                                                again until it looks right,
                                                                                                and each letter has the
                                                                                                perfect spot of its own.
                                                                                            </Accordion.Body>
                                                                                        </Accordion.Item>
                                                                                        <Accordion.Item eventKey='item2' className="border-0">
                                                                                            <Accordion.Header
                                                                                                id="heading7">
                                                                                                <Link className="accordion-button p-2 shadow-none"
                                                                                                    data-bs-toggle="collapse"
                                                                                                    href="#collapse7"
                                                                                                    aria-expanded="false">
                                                                                                    <div className="d-flex">
                                                                                                        <div className="avatar-xs">
                                                                                                            <div
                                                                                                                className="avatar-title rounded-circle bg-light text-danger">
                                                                                                                <i
                                                                                                                    className="ri-shopping-bag-line"></i>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div
                                                                                                            className="flex-grow-1 ms-3">
                                                                                                            <h6
                                                                                                                className="fs-14 mb-1">
                                                                                                                Your order is
                                                                                                                placed <span
                                                                                                                    className="badge bg-success-subtle text-success align-middle">Completed</span>
                                                                                                            </h6>
                                                                                                            <small
                                                                                                                className="text-muted">These
                                                                                                                customers can
                                                                                                                rest assured
                                                                                                                their order has
                                                                                                                been placed - 1
                                                                                                                week Ago</small>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </Link>
                                                                                            </Accordion.Header>
                                                                                        </Accordion.Item>
                                                                                        <Accordion.Item eventKey="item3" className="border-0">
                                                                                            <Accordion.Header
                                                                                                id="heading8">
                                                                                                <Link href="#" className="accordion-button p-2 shadow-none"
                                                                                                    id="collapse8" >
                                                                                                    <div className="d-flex">
                                                                                                        <div
                                                                                                            className="flex-shrink-0 avatar-xs">
                                                                                                            <div
                                                                                                                className="avatar-title bg-light text-success rounded-circle">
                                                                                                                <i
                                                                                                                    className="ri-home-3-line"></i>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div
                                                                                                            className="flex-grow-1 ms-3">
                                                                                                            <h6
                                                                                                                className="fs-14 mb-1">
                                                                                                                Velzon admin
                                                                                                                dashboard
                                                                                                                templates layout
                                                                                                                upload</h6>
                                                                                                            <small
                                                                                                                className="text-muted">We
                                                                                                                talked about a
                                                                                                                project on
                                                                                                                linkedin - 1
                                                                                                                week Ago</small>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </Link>
                                                                                            </Accordion.Header>
                                                                                            <Accordion.Body
                                                                                                className="ms-2 ps-5 fst-italic">
                                                                                                Powerful, clean & modern
                                                                                                responsive bootstrap 5 admin
                                                                                                template. The maximum file
                                                                                                size for uploads in this
                                                                                                demo :
                                                                                                <Row className="mt-2">
                                                                                                    <Col xxl={6}>
                                                                                                        <Row
                                                                                                            className="border border-dashed gx-2 p-2">
                                                                                                            <Col xs={3}>
                                                                                                                <img src={smallImage3} alt="" className="img-fluid rounded" />
                                                                                                            </Col>

                                                                                                            <Col xs={3}>
                                                                                                                <img src={smallImage5} alt="" className="img-fluid rounded" />
                                                                                                            </Col>

                                                                                                            <Col xs={3}>
                                                                                                                <img src={smallImage7} alt="" className="img-fluid rounded" />
                                                                                                            </Col>

                                                                                                            <Col xs={3}>
                                                                                                                <img src={smallImage9} alt="" className="img-fluid rounded" />
                                                                                                            </Col>

                                                                                                        </Row>

                                                                                                    </Col>
                                                                                                </Row>
                                                                                            </Accordion.Body>
                                                                                        </Accordion.Item>
                                                                                        <Accordion.Item eventKey='item4' className="border-0">
                                                                                            <Accordion.Header
                                                                                                id="heading9">
                                                                                                <Link className="accordion-button p-2 shadow-none"
                                                                                                    data-bs-toggle="collapse"
                                                                                                    href="#collapse9"
                                                                                                    aria-expanded="false">
                                                                                                    <div className="d-flex">
                                                                                                        <div
                                                                                                            className="flex-shrink-0">
                                                                                                            <img src={avatar6}
                                                                                                                alt=""
                                                                                                                className="avatar-xs rounded-circle" />
                                                                                                        </div>
                                                                                                        <div
                                                                                                            className="flex-grow-1 ms-3">
                                                                                                            <h6
                                                                                                                className="fs-14 mb-1">
                                                                                                                New ticket
                                                                                                                created <span
                                                                                                                    className="badge bg-info-subtle text-info align-middle">Inprogress</span>
                                                                                                            </h6>
                                                                                                            <small
                                                                                                                className="text-muted mb-2">User
                                                                                                                <span
                                                                                                                    className="text-secondary">Jack365</span>
                                                                                                                submitted a
                                                                                                                ticket - 2 week
                                                                                                                Ago</small>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </Link>
                                                                                            </Accordion.Header>
                                                                                        </Accordion.Item>
                                                                                        <Accordion.Item eventKey='item5' className="border-0">
                                                                                            <Accordion.Header
                                                                                                id="heading10">
                                                                                                <Link href="#" className="accordion-button p-2 shadow-none" id="collapse10">
                                                                                                    <div className="d-flex">
                                                                                                        <div
                                                                                                            className="flex-shrink-0">
                                                                                                            <img src={avatar5} alt="" className="avatar-xs rounded-circle" />
                                                                                                        </div>
                                                                                                        <div
                                                                                                            className="flex-grow-1 ms-3">
                                                                                                            <h6
                                                                                                                className="fs-14 mb-1">
                                                                                                                Jennifer Carter
                                                                                                            </h6>
                                                                                                            <small
                                                                                                                className="text-muted">Commented
                                                                                                                - 4 week
                                                                                                                Ago</small>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </Link>
                                                                                            </Accordion.Header>
                                                                                            <Accordion.Body
                                                                                                className="ms-2 ps-5">
                                                                                                <p
                                                                                                    className="text-muted fst-italic mb-2">
                                                                                                    " This is an awesome
                                                                                                    admin dashboard
                                                                                                    template. It is
                                                                                                    extremely well
                                                                                                    structured and uses
                                                                                                    state of the art
                                                                                                    components (e.g. one of
                                                                                                    the only templates using
                                                                                                    boostrap 5.1.3 so far).
                                                                                                    I integrated it into a
                                                                                                    Rails 6 project. Needs
                                                                                                    manual integration work
                                                                                                    of course but the
                                                                                                    template structure made
                                                                                                    it easy. "</p>
                                                                                            </Accordion.Body>
                                                                                        </Accordion.Item>
                                                                                    </Accordion>
                                                                                </div>
                                                                            </Tab.Pane>
                                                                            <Tab.Pane eventKey="monthly">
                                                                                <div className="profile-timeline">
                                                                                    <Accordion defaultActiveKey={allAccordionItems3} className="accordion-flush"
                                                                                        id="monthlyExample">
                                                                                        <Accordion.Item eventKey='item1' className="border-0">
                                                                                            <Accordion.Header
                                                                                                id="heading11">
                                                                                                <Link href="#" className="accordion-button p-2 shadow-none" id="collapse11" >
                                                                                                    <div className="d-flex">
                                                                                                        <div
                                                                                                            className="flex-shrink-0 avatar-xs">
                                                                                                            <div
                                                                                                                className="avatar-title bg-light text-success rounded-circle">
                                                                                                                M
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div
                                                                                                            className="flex-grow-1 ms-3">
                                                                                                            <h6
                                                                                                                className="fs-14 mb-1">
                                                                                                                Megan Elmore
                                                                                                            </h6>
                                                                                                            <small
                                                                                                                className="text-muted">Adding
                                                                                                                a new event with
                                                                                                                attachments - 1
                                                                                                                month
                                                                                                                Ago.</small>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </Link>
                                                                                            </Accordion.Header>
                                                                                            <Accordion.Body
                                                                                                className="ms-2 ps-5">
                                                                                                <div className="row g-2">
                                                                                                    <div className="col-auto">
                                                                                                        <div
                                                                                                            className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                                            <div
                                                                                                                className="flex-shrink-0">
                                                                                                                <i
                                                                                                                    className="ri-image-2-line fs-17 text-danger"></i>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                className="flex-grow-1 ms-2">
                                                                                                                <h6><Link href="#"
                                                                                                                    className="stretched-link">Business
                                                                                                                    Template
                                                                                                                    -
                                                                                                                    UI/UX
                                                                                                                    design</Link>
                                                                                                                </h6>
                                                                                                                <small>685
                                                                                                                    KB</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="col-auto">
                                                                                                        <div
                                                                                                            className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                                            <div
                                                                                                                className="flex-shrink-0">
                                                                                                                <i
                                                                                                                    className="ri-file-zip-line fs-17 text-info"></i>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                className="flex-grow-1 ms-2">
                                                                                                                <h6><Link href="#"
                                                                                                                    className="stretched-link">Bank
                                                                                                                    Management
                                                                                                                    System
                                                                                                                    -
                                                                                                                    PSD</Link>
                                                                                                                </h6>
                                                                                                                <small>8.78
                                                                                                                    MB</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="col-auto">
                                                                                                        <div
                                                                                                            className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                                            <div
                                                                                                                className="flex-shrink-0">
                                                                                                                <i
                                                                                                                    className="ri-file-zip-line fs-17 text-info"></i>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                className="flex-grow-1 ms-2">
                                                                                                                <h6><Link href="#"
                                                                                                                    className="stretched-link">Bank
                                                                                                                    Management
                                                                                                                    System
                                                                                                                    -
                                                                                                                    PSD</Link>
                                                                                                                </h6>
                                                                                                                <small>8.78
                                                                                                                    MB</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </Accordion.Body>
                                                                                        </Accordion.Item>
                                                                                        <Accordion.Item eventKey='item2' className="border-0">
                                                                                            <Accordion.Header
                                                                                                id="heading12">
                                                                                                <Link href="#" className="accordion-button p-2 shadow-none"
                                                                                                    id="collapse12"
                                                                                                    aria-expanded="true">
                                                                                                    <div className="d-flex">
                                                                                                        <div
                                                                                                            className="flex-shrink-0">
                                                                                                            <img src={avatar2}
                                                                                                                alt=""
                                                                                                                className="avatar-xs rounded-circle" />
                                                                                                        </div>
                                                                                                        <div
                                                                                                            className="flex-grow-1 ms-3">
                                                                                                            <h6
                                                                                                                className="fs-14 mb-1">
                                                                                                                Jacqueline Steve
                                                                                                            </h6>
                                                                                                            <small
                                                                                                                className="text-muted">We
                                                                                                                has changed 2
                                                                                                                attributes on 3
                                                                                                                month
                                                                                                                Ago</small>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </Link>
                                                                                            </Accordion.Header>
                                                                                            <Accordion.Body
                                                                                                className="ms-2 ps-5">
                                                                                                In an awareness campaign, it
                                                                                                is vital for people to begin
                                                                                                put 2 and 2 together and
                                                                                                begin to recognize your
                                                                                                cause. Too much or too
                                                                                                little spacing, as in the
                                                                                                example below, can make
                                                                                                things unpleasant for the
                                                                                                reader. The goal is to make
                                                                                                your text as comfortable to
                                                                                                read as possible. A
                                                                                                wonderful serenity has taken
                                                                                                possession of my entire
                                                                                                soul, like these sweet
                                                                                                mornings of spring which I
                                                                                                enjoy with my whole heart.
                                                                                            </Accordion.Body>
                                                                                        </Accordion.Item>
                                                                                        <Accordion.Item eventKey='item3' className="border-0">
                                                                                            <Accordion.Header
                                                                                                id="heading13">
                                                                                                <Link className="accordion-button p-2 shadow-none"
                                                                                                    data-bs-toggle="collapse"
                                                                                                    href="#collapse13"
                                                                                                    aria-expanded="false">
                                                                                                    <div className="d-flex">
                                                                                                        <div
                                                                                                            className="flex-shrink-0">
                                                                                                            <img src={avatar6}
                                                                                                                alt=""
                                                                                                                className="avatar-xs rounded-circle" />
                                                                                                        </div>
                                                                                                        <div
                                                                                                            className="flex-grow-1 ms-3">
                                                                                                            <h6
                                                                                                                className="fs-14 mb-1">
                                                                                                                New ticket
                                                                                                                received</h6>
                                                                                                            <small
                                                                                                                className="text-muted mb-2">User
                                                                                                                <span
                                                                                                                    className="text-secondary">Erica245</span>
                                                                                                                submitted a
                                                                                                                ticket - 5 month
                                                                                                                Ago</small>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </Link>
                                                                                            </Accordion.Header>
                                                                                        </Accordion.Item>
                                                                                        <Accordion.Item eventKey='item4' className="border-0">
                                                                                            <Accordion.Header
                                                                                                id="heading14">
                                                                                                <Link href="#" className="accordion-button p-2 shadow-none" id="collapse14">
                                                                                                    <div className="d-flex">
                                                                                                        <div
                                                                                                            className="flex-shrink-0 avatar-xs">
                                                                                                            <div
                                                                                                                className="avatar-title bg-light text-muted rounded-circle">
                                                                                                                <i
                                                                                                                    className="ri-user-3-fill"></i>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div
                                                                                                            className="flex-grow-1 ms-3">
                                                                                                            <h6
                                                                                                                className="fs-14 mb-1">
                                                                                                                Nancy Martino
                                                                                                            </h6>
                                                                                                            <small
                                                                                                                className="text-muted">Commented
                                                                                                                on 24 Nov,
                                                                                                                2021.</small>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </Link>
                                                                                            </Accordion.Header>
                                                                                            <Accordion.Body
                                                                                                className="ms-2 ps-5 fst-italic">
                                                                                                " A wonderful serenity has
                                                                                                taken possession of my
                                                                                                entire soul, like these
                                                                                                sweet mornings of spring
                                                                                                which I enjoy with my whole
                                                                                                heart. Each design is a new,
                                                                                                unique piece of art birthed
                                                                                                into this world, and while
                                                                                                you have the opportunity to
                                                                                                be creative and make your
                                                                                                own style choices. "
                                                                                            </Accordion.Body>
                                                                                        </Accordion.Item>
                                                                                        <Accordion.Item eventKey='item5' className="border-0">
                                                                                            <Accordion.Header
                                                                                                id="heading15">
                                                                                                <Link href="#" className="accordion-button p-2 shadow-none" id="collapse15">
                                                                                                    <div className="d-flex">
                                                                                                        <div
                                                                                                            className="flex-shrink-0">
                                                                                                            <img src={avatar7}
                                                                                                                alt=""
                                                                                                                className="avatar-xs rounded-circle" />
                                                                                                        </div>
                                                                                                        <div
                                                                                                            className="flex-grow-1 ms-3">
                                                                                                            <h6
                                                                                                                className="fs-14 mb-1">
                                                                                                                Lewis Arnold
                                                                                                            </h6>
                                                                                                            <small
                                                                                                                className="text-muted">Create
                                                                                                                new project
                                                                                                                buildng product
                                                                                                                - 8 month
                                                                                                                Ago</small>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </Link>
                                                                                            </Accordion.Header>
                                                                                            <Accordion.Body
                                                                                                className="ms-2 ps-5">
                                                                                                <p className="text-muted mb-2">
                                                                                                    Every team project can
                                                                                                    have a velzon. Use the
                                                                                                    velzon to share
                                                                                                    information with your
                                                                                                    team to understand and
                                                                                                    contribute to your
                                                                                                    project.</p>
                                                                                                <div className="avatar-group">
                                                                                                    <Link href="#"
                                                                                                        className="avatar-group-item"
                                                                                                        data-bs-toggle="tooltip"
                                                                                                        data-bs-trigger="hover"
                                                                                                        data-bs-placement="top"
                                                                                                        title=""
                                                                                                        data-bs-original-title="Christi">
                                                                                                        <img src={avatar4}
                                                                                                            alt=""
                                                                                                            className="rounded-circle avatar-xs" />
                                                                                                    </Link>
                                                                                                    <Link href="#"
                                                                                                        className="avatar-group-item"
                                                                                                        data-bs-toggle="tooltip"
                                                                                                        data-bs-trigger="hover"
                                                                                                        data-bs-placement="top"
                                                                                                        title=""
                                                                                                        data-bs-original-title="Frank Hook">
                                                                                                        <img src={avatar3}
                                                                                                            alt=""
                                                                                                            className="rounded-circle avatar-xs" />
                                                                                                    </Link>
                                                                                                    <Link href="#"
                                                                                                        className="avatar-group-item"
                                                                                                        data-bs-toggle="tooltip"
                                                                                                        data-bs-trigger="hover"
                                                                                                        data-bs-placement="top"
                                                                                                        title=""
                                                                                                        data-bs-original-title=" Ruby">
                                                                                                        <div
                                                                                                            className="avatar-xs">
                                                                                                            <div
                                                                                                                className="avatar-title rounded-circle bg-light text-primary">
                                                                                                                R
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </Link>
                                                                                                    <Link href="#"
                                                                                                        className="avatar-group-item"
                                                                                                        data-bs-toggle="tooltip"
                                                                                                        data-bs-trigger="hover"
                                                                                                        data-bs-placement="top"
                                                                                                        title=""
                                                                                                        data-bs-original-title="more">
                                                                                                        <div
                                                                                                            className="avatar-xs">
                                                                                                            <div
                                                                                                                className="avatar-title rounded-circle">
                                                                                                                2+
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </Link>
                                                                                                </div>
                                                                                            </Accordion.Body>
                                                                                        </Accordion.Item>
                                                                                    </Accordion>
                                                                                </div>
                                                                            </Tab.Pane>
                                                                        </Tab.Content>
                                                                    </Card.Body>
                                                                </Tab.Container>
                                                            </Card>
                                                        </Col>
                                                    </Row>

                                                    <Card>
                                                        <Card.Body>
                                                            <div className="d-flex justify-content-end gap-2 mb-2">
                                                                <div className="slider-button-prev">
                                                                    <div className="avatar-title fs-18 rounded px-1">
                                                                        <i className="ri-arrow-left-s-line"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="slider-button-next">
                                                                    <div className="avatar-title fs-18 rounded px-1">
                                                                        <i className="ri-arrow-right-s-line"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Swiper className="project-swiper"
                                                                slidesPerView={3}
                                                                spaceBetween={20}
                                                                direction='horizontal'
                                                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                                                                pagination={{ clickable: true }}
                                                                modules={[Autoplay]}
                                                            >

                                                                <SwiperSlide>
                                                                    <Card
                                                                        className="profile-project-card shadow-none profile-project-success mb-0">
                                                                        <Card.Body className="p-4">
                                                                            <div className="d-flex">
                                                                                <div
                                                                                    className="flex-grow-1 text-muted overflow-hidden">
                                                                                    <h5
                                                                                        className="fs-14 text-truncate mb-1">
                                                                                        <Link href="#"
                                                                                            className="text-body">ABC
                                                                                            Project Customization</Link>
                                                                                    </h5>
                                                                                    <p className="text-muted text-truncate mb-0">
                                                                                        Last Update : <span className="fw-semibold text-body">4 hr Ago</span></p>
                                                                                </div>
                                                                                <div className="flex-shrink-0 ms-2">
                                                                                    <div className="badge bg-warning-subtle  text-warning fs-10">
                                                                                        Inprogress</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-grow-1">
                                                                                    <div
                                                                                        className="d-flex align-items-center gap-2">
                                                                                        <div>
                                                                                            <h5 className="fs-12 text-muted mb-0">
                                                                                                Members :</h5>
                                                                                        </div>
                                                                                        <div className="avatar-group">
                                                                                            <div
                                                                                                className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src={avatar4}
                                                                                                        alt=""
                                                                                                        className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src={avatar5}
                                                                                                        alt=""
                                                                                                        className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <div
                                                                                                        className="avatar-title rounded-circle bg-light text-primary">
                                                                                                        A
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src={avatar2}
                                                                                                        alt=""
                                                                                                        className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Card.Body>
                                                                    </Card>
                                                                </SwiperSlide>

                                                                <SwiperSlide>
                                                                    <Card className="profile-project-card shadow-none profile-project-danger mb-0">
                                                                        <Card.Body className="p-4">
                                                                            <div className="d-flex">
                                                                                <div
                                                                                    className="flex-grow-1 text-muted overflow-hidden">
                                                                                    <h5 className="fs-14 text-truncate mb-1">
                                                                                        <Link href="#" className="text-body">Client - John</Link></h5>
                                                                                    <p className="text-muted text-truncate mb-0">
                                                                                        Last Update : <span
                                                                                            className="fw-semibold text-body">1
                                                                                            hr Ago</span></p>
                                                                                </div>
                                                                                <div className="flex-shrink-0 ms-2">
                                                                                    <div
                                                                                        className="badge bg-success-subtle text-success fs-10">
                                                                                        Completed</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-grow-1">
                                                                                    <div
                                                                                        className="d-flex align-items-center gap-2">
                                                                                        <div>
                                                                                            <h5
                                                                                                className="fs-12 text-muted mb-0">
                                                                                                Members :</h5>
                                                                                        </div>
                                                                                        <div className="avatar-group">
                                                                                            <div
                                                                                                className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src={avatar2}
                                                                                                        alt=""
                                                                                                        className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <div
                                                                                                        className="avatar-title rounded-circle bg-light text-primary">
                                                                                                        C
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Card.Body>
                                                                    </Card>
                                                                </SwiperSlide>

                                                                <SwiperSlide>
                                                                    <Card
                                                                        className="profile-project-card shadow-none profile-project-info mb-0">
                                                                        <Card.Body className="p-4">
                                                                            <div className="d-flex">
                                                                                <div
                                                                                    className="flex-grow-1 text-muted overflow-hidden">
                                                                                    <h5
                                                                                        className="fs-14 text-truncate mb-1">
                                                                                        <Link href="#" className="text-body">Brand logo Design</Link></h5>
                                                                                    <p className="text-muted text-truncate mb-0">
                                                                                        Last Update : <span
                                                                                            className="fw-semibold text-body">2
                                                                                            hr Ago</span></p>
                                                                                </div>
                                                                                <div className="flex-shrink-0 ms-2">
                                                                                    <div
                                                                                        className="badge bg-warning-subtle  text-warning fs-10">
                                                                                        Inprogress</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-grow-1">
                                                                                    <div
                                                                                        className="d-flex align-items-center gap-2">
                                                                                        <div>
                                                                                            <h5
                                                                                                className="fs-12 text-muted mb-0">
                                                                                                Members :</h5>
                                                                                        </div>
                                                                                        <div className="avatar-group">
                                                                                            <div
                                                                                                className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src={avatar5}
                                                                                                        alt=""
                                                                                                        className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Card.Body>
                                                                    </Card>
                                                                </SwiperSlide>

                                                                <SwiperSlide>
                                                                    <Card
                                                                        className="profile-project-card shadow-none profile-project-danger mb-0">
                                                                        <Card.Body className="p-4">
                                                                            <div className="d-flex">
                                                                                <div
                                                                                    className="flex-grow-1 text-muted overflow-hidden">
                                                                                    <h5
                                                                                        className="fs-14 text-truncate mb-1">
                                                                                        <Link href="#"
                                                                                            className="text-body">Project
                                                                                            update</Link></h5>
                                                                                    <p
                                                                                        className="text-muted text-truncate mb-0">
                                                                                        Last Update : <span
                                                                                            className="fw-semibold text-body">4
                                                                                            hr Ago</span></p>
                                                                                </div>
                                                                                <div className="flex-shrink-0 ms-2">
                                                                                    <div
                                                                                        className="badge bg-success-subtle text-success fs-10">
                                                                                        Completed</div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-grow-1">
                                                                                    <div
                                                                                        className="d-flex align-items-center gap-2">
                                                                                        <div>
                                                                                            <h5
                                                                                                className="fs-12 text-muted mb-0">
                                                                                                Members :</h5>
                                                                                        </div>
                                                                                        <div className="avatar-group">
                                                                                            <div
                                                                                                className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src={avatar4}
                                                                                                        alt=""
                                                                                                        className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src={avatar5}
                                                                                                        alt=""
                                                                                                        className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Card.Body>

                                                                    </Card>

                                                                </SwiperSlide>

                                                                <SwiperSlide>
                                                                    <Card className="profile-project-card shadow-none profile-project-warning mb-0">
                                                                        <Card.Body className="p-4">
                                                                            <div className="d-flex">
                                                                                <div className="flex-grow-1 text-muted overflow-hidden">
                                                                                    <h5 className="fs-14 text-truncate mb-1">
                                                                                        <Link href="#" className="text-body">Chat App</Link></h5>
                                                                                    <p
                                                                                        className="text-muted text-truncate mb-0">
                                                                                        Last Update : <span
                                                                                            className="fw-semibold text-body">1
                                                                                            hr Ago</span></p>
                                                                                </div>
                                                                                <div className="flex-shrink-0 ms-2">
                                                                                    <div
                                                                                        className="badge bg-warning-subtle  text-warning fs-10">
                                                                                        Inprogress</div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-grow-1">
                                                                                    <div
                                                                                        className="d-flex align-items-center gap-2">
                                                                                        <div>
                                                                                            <h5
                                                                                                className="fs-12 text-muted mb-0">
                                                                                                Members :</h5>
                                                                                        </div>
                                                                                        <div className="avatar-group">
                                                                                            <div
                                                                                                className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src={avatar4}
                                                                                                        alt=""
                                                                                                        className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src={avatar5}
                                                                                                        alt=""
                                                                                                        className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <div
                                                                                                        className="avatar-title rounded-circle bg-light text-primary">
                                                                                                        A
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Card.Body>
                                                                    </Card>
                                                                </SwiperSlide>
                                                            </Swiper>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="activities">
                                            <Card>
                                                <Card.Body>
                                                    <h5 className="card-title mb-3">Activities</h5>
                                                    <div className="acitivity-timeline">
                                                        <div className="acitivity-item d-flex">
                                                            <div className="flex-shrink-0">
                                                                <img src={avatar1} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                                            </div>
                                                            <div className="flex-grow-1 ms-3">
                                                                <h6 className="mb-1">Oliver Phillips <span
                                                                    className="badge bg-primary-subtle text-primary align-middle">New</span>
                                                                </h6>
                                                                <p className="text-muted mb-2">We talked about a project on linkedin.</p>
                                                                <small className="mb-0 text-muted">Today</small>
                                                            </div>
                                                        </div>
                                                        <div className="acitivity-item py-3 d-flex">
                                                            <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                                                                <div className="avatar-title bg-success-subtle text-success rounded-circle"> N </div>
                                                            </div>
                                                            <div className="flex-grow-1 ms-3">
                                                                <h6 className="mb-1">Nancy Martino <span
                                                                    className="badge bg-secondary-subtle text-secondary align-middle">In
                                                                    Progress</span></h6>
                                                                <p className="text-muted mb-2"><i
                                                                    className="ri-file-text-line align-middle ms-2"></i>
                                                                    Create new project Buildng product</p>
                                                                <div className="avatar-group mb-2">
                                                                    <Link href="#" className="avatar-group-item"
                                                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                                                        title="" data-bs-original-title="Christi">
                                                                        <img src={avatar4} alt=""
                                                                            className="rounded-circle avatar-xs" />
                                                                    </Link>
                                                                    <Link href="#" className="avatar-group-item"
                                                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                                                        title="" data-bs-original-title="Frank Hook">
                                                                        <img src={avatar3} alt=""
                                                                            className="rounded-circle avatar-xs" />
                                                                    </Link>
                                                                    <Link href="#" className="avatar-group-item"
                                                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                                                        title="" data-bs-original-title=" Ruby">
                                                                        <div className="avatar-xs">
                                                                            <div className="avatar-title rounded-circle bg-light text-primary">R</div>
                                                                        </div>
                                                                    </Link>
                                                                    <Link href="#" className="avatar-group-item"
                                                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                                                        title="" data-bs-original-title="more">
                                                                        <div className="avatar-xs">
                                                                            <div className="avatar-title rounded-circle">
                                                                                2+
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                                <small className="mb-0 text-muted">Yesterday</small>
                                                            </div>
                                                        </div>
                                                        <div className="acitivity-item py-3 d-flex">
                                                            <div className="flex-shrink-0">
                                                                <img src={avatar2} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                                            </div>
                                                            <div className="flex-grow-1 ms-3">
                                                                <h6 className="mb-1">Natasha Carey <span className="badge bg-success-subtle text-success align-middle">Completed</span>
                                                                </h6>
                                                                <p className="text-muted mb-2">Adding a new event with
                                                                    attachments</p>
                                                                <Row >
                                                                    <Col xxl={4}>
                                                                        <div className="row border border-dashed gx-2 p-2 mb-2">
                                                                            <div className="col-4">
                                                                                <img src={smallImage2}
                                                                                    alt="" className="img-fluid rounded" />
                                                                            </div>

                                                                            <div className="col-4">
                                                                                <img src={smallImage3}
                                                                                    alt="" className="img-fluid rounded" />
                                                                            </div>

                                                                            <div className="col-4">
                                                                                <img src={smallImage4}
                                                                                    alt="" className="img-fluid rounded" />
                                                                            </div>

                                                                        </div>

                                                                    </Col>
                                                                </Row>
                                                                <small className="mb-0 text-muted">25 Nov</small>
                                                            </div>
                                                        </div>
                                                        <div className="acitivity-item py-3 d-flex">
                                                            <div className="flex-shrink-0">
                                                                <img src={avatar6} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                                            </div>
                                                            <div className="flex-grow-1 ms-3">
                                                                <h6 className="mb-1">Bethany Johnson</h6>
                                                                <p className="text-muted mb-2">added a new member to velzon
                                                                    dashboard</p>
                                                                <small className="mb-0 text-muted">19 Nov</small>
                                                            </div>
                                                        </div>
                                                        <div className="acitivity-item py-3 d-flex">
                                                            <div className="flex-shrink-0">
                                                                <div className="avatar-xs acitivity-avatar">
                                                                    <div
                                                                        className="avatar-title rounded-circle bg-danger-subtle text-danger">
                                                                        <i className="ri-shopping-bag-line"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow-1 ms-3">
                                                                <h6 className="mb-1">Your order is placed <span
                                                                    className="badge bg-danger-subtle text-danger align-middle ms-1">Out
                                                                    of Delivery</span></h6>
                                                                <p className="text-muted mb-2">These customers can rest assured
                                                                    their order has been placed.</p>
                                                                <small className="mb-0 text-muted">16 Nov</small>
                                                            </div>
                                                        </div>
                                                        <div className="acitivity-item py-3 d-flex">
                                                            <div className="flex-shrink-0">
                                                                <img src={avatar7} alt=""
                                                                    className="avatar-xs rounded-circle acitivity-avatar" />
                                                            </div>
                                                            <div className="flex-grow-1 ms-3">
                                                                <h6 className="mb-1">Lewis Pratt</h6>
                                                                <p className="text-muted mb-2">They all have something to say
                                                                    beyond the words on the page. They can come across as
                                                                    casual or neutral, exotic or graphic. </p>
                                                                <small className="mb-0 text-muted">22 Oct</small>
                                                            </div>
                                                        </div>
                                                        <div className="acitivity-item py-3 d-flex">
                                                            <div className="flex-shrink-0">
                                                                <div className="avatar-xs acitivity-avatar">
                                                                    <div
                                                                        className="avatar-title rounded-circle bg-info-subtle text-info">
                                                                        <i className="ri-line-chart-line"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow-1 ms-3">
                                                                <h6 className="mb-1">Monthly sales report</h6>
                                                                <p className="text-muted mb-2"><span className="text-danger">2 days
                                                                    left</span> notification to submit the monthly sales
                                                                    report. <Link href="#" className="link-warning text-decoration-underline">Reports
                                                                        Builder</Link></p>
                                                                <small className="mb-0 text-muted">15 Oct</small>
                                                            </div>
                                                        </div>
                                                        <div className="acitivity-item d-flex">
                                                            <div className="flex-shrink-0">
                                                                <img src={avatar8} alt=""
                                                                    className="avatar-xs rounded-circle acitivity-avatar" />
                                                            </div>
                                                            <div className="flex-grow-1 ms-3">
                                                                <h6 className="mb-1">New ticket received <span
                                                                    className="badge bg-success-subtle text-success align-middle">Completed</span>
                                                                </h6>
                                                                <p className="text-muted mb-2">User <span
                                                                    className="text-secondary">Erica245</span> submitted a
                                                                    ticket.</p>
                                                                <small className="mb-0 text-muted">26 Aug</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Tab.Pane>

                                        <Tab.Pane eventKey="projects">
                                            <Card>
                                                <Card.Body>
                                                    <Row>
                                                        {(projects || []).map((item, key) => (
                                                            <Col xxl={3} sm={6} key={key}>
                                                                <Card className={`profile-project-card shadow-none profile-project-${item.cardBorderColor}`}>
                                                                    <Card.Body className="p-4">
                                                                        <div className="d-flex">
                                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                                <h5 className="fs-14 text-truncate"><Link href="#"
                                                                                    className="text-body">{item.title}</Link>
                                                                                </h5>
                                                                                <p className="text-muted text-truncate mb-0">Last
                                                                                    Update : <span
                                                                                        className="fw-semibold text-body">{item.updatedTime}</span></p>
                                                                            </div>
                                                                            <div className="flex-shrink-0 ms-2">
                                                                                <div className={`badge bg-${item.badgeClass}-subtle text-${item.badgeClass} fs-10`}>
                                                                                    {item.badgeText}</div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="d-flex mt-4">
                                                                            <div className="flex-grow-1">
                                                                                <div className="d-flex align-items-center gap-2">
                                                                                    <div>
                                                                                        <h5 className="fs-12 text-muted mb-0">
                                                                                            Members :</h5>
                                                                                    </div>
                                                                                    <div className="avatar-group">
                                                                                        {(item.member || []).map((subitem, key) => (
                                                                                            <div className="avatar-group-item" key={key}>
                                                                                                <div className="avatar-xs">
                                                                                                    <img src={subitem.img} alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                        ))}

                                                                                        {(item.memberName || []).map((element, key) => (
                                                                                            <div className="avatar-group-item" key={key}>
                                                                                                <div className="avatar-xs">
                                                                                                    <div
                                                                                                        className="avatar-title rounded-circle bg-light text-primary">
                                                                                                        {element.memberText}
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Card.Body>
                                                                </Card>
                                                            </Col>
                                                        ))}
                                                        <Col lg={12}>
                                                            <Pagination className="justify-content-center pagination-separated mb-0">
                                                                <Pagination.Item disabled> <i className="mdi mdi-chevron-left" /> </Pagination.Item>
                                                                <Pagination.Item active> 1 </Pagination.Item>
                                                                <Pagination.Item> 2 </Pagination.Item>
                                                                <Pagination.Item> 3 </Pagination.Item>
                                                                <Pagination.Item> 4 </Pagination.Item>
                                                                <Pagination.Item> 5 </Pagination.Item>
                                                                <Pagination.Item> <i className="mdi mdi-chevron-right" /> </Pagination.Item>
                                                            </Pagination>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Tab.Pane>

                                        <Tab.Pane eventKey="documents">
                                            <Card>
                                                <Card.Body>
                                                    <div className="d-flex align-items-center mb-4">
                                                        <h5 className="card-title flex-grow-1 mb-0">Documents</h5>
                                                        <div className="flex-shrink-0">
                                                            <Form.Control className="form-control d-none" type="file" id="formFile" />
                                                            <Form.Label htmlFor="formFile" className="btn btn-danger"><i className="ri-upload-2-fill me-1 align-bottom"></i> Upload
                                                                File</Form.Label>
                                                        </div>
                                                    </div>
                                                    <Row>
                                                        <Col lg={12}>
                                                            <div className="table-responsive">
                                                                <Table className="table-borderless align-middle mb-0">
                                                                    <thead className="table-light">
                                                                        <tr>
                                                                            <th scope="col">File Name</th>
                                                                            <th scope="col">Type</th>
                                                                            <th scope="col">Size</th>
                                                                            <th scope="col">Upload Date</th>
                                                                            <th scope="col">Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {(documents || []).map((item, key) => (
                                                                            <tr key={key}>
                                                                                <td>
                                                                                    <div className="d-flex align-items-center">
                                                                                        <div className="avatar-sm">
                                                                                            <div
                                                                                                className={`avatar-title bg-${item.iconBackgroundClass}-subtle text-${item.iconBackgroundClass} rounded fs-20`}>
                                                                                                <i className={item.icon}></i>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="ms-3 flex-grow-1">
                                                                                            <h6 className="fs-15 mb-0"><Link href="#">{item.fileName}</Link>
                                                                                            </h6>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td>{item.fileType}</td>
                                                                                <td>{item.fileSize}</td>
                                                                                <td>{item.updatedDate}</td>
                                                                                <td>
                                                                                    <Dropdown dir='start'>
                                                                                        <Dropdown.Toggle as="a" className="btn btn-light btn-icon arrow-none" id="dropdown.MenuLink15" role="button">
                                                                                            <i className="ri-equalizer-fill"></i>
                                                                                        </Dropdown.Toggle>
                                                                                        <Dropdown.Menu>
                                                                                            <Dropdown.Item><i className="ri-eye-fill me-2 align-middle text-muted" />View</Dropdown.Item>
                                                                                            <Dropdown.Item><i className="ri-download-2-fill me-2 align-middle text-muted" />Download</Dropdown.Item>
                                                                                            <Dropdown.Divider />
                                                                                            <Dropdown.Item><i className="ri-delete-bin-5-line me-2 align-middle text-muted" />Delete</Dropdown.Item>
                                                                                        </Dropdown.Menu>
                                                                                    </Dropdown>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </Table>
                                                            </div>
                                                            <div className="text-center mt-3">
                                                                <Link href="#" className="text-success "><i
                                                                    className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>
                                                                    Load more </Link>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div >
        </React.Fragment >
    );
};

SimplePage.layout = (page: any) => <Layout children={page} />

export default SimplePage;