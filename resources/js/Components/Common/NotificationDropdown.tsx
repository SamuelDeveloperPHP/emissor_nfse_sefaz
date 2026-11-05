import React, { useState } from 'react';
import { Button, Col, Dropdown, Nav, Row, Tab } from 'react-bootstrap';

//import images
import avatar2 from "../../../images/users/avatar-2.jpg";
import avatar8 from "../../../images/users/avatar-8.jpg";
import avatar3 from "../../../images/users/avatar-3.jpg";
import avatar6 from "../../../images/users/avatar-6.jpg";
import bell from "../../../images/svg/bell.svg";

//SimpleBar
import SimpleBar from "simplebar-react";

const NotificationDropdown = () => {
    //Dropdown Toggle
    const [isNotificationDropdown, setIsNotificationDropdown] = useState<boolean>(false);
    const toggleNotificationDropdown = () => {
        setIsNotificationDropdown(!isNotificationDropdown);
    };

    return (
        <React.Fragment>
            <Dropdown show={isNotificationDropdown} onClick={toggleNotificationDropdown} className="topbar-head-dropdown ms-1 header-item">
                <Dropdown.Toggle type="button" as="button" className="arrow-none btn btn-icon btn-topbar btn-ghost-secondary rounded-circle">
                    <i className='bx bx-bell fs-22'></i>
                    <span
                        className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">3<span
                            className="visually-hidden">unread messages</span></span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-lg dropdown-menu-end p-0">
                    {/* <div className="dropdown-head bg-primary bg-pattern rounded-top"> */}
                    <div className="p-3 bg-primary bg-pattern rounded-top">
                        <Row className="align-items-center">
                            <Col>
                                <h6 className="m-0 fs-16 fw-semibold text-white"> Notifications </h6>
                            </Col>
                            <div className="col-auto dropdown-tabs">
                                <span className="badge bg-light-subtle fs-13 text-body"> 4 New</span>
                            </div>
                        </Row>
                    </div>

                    <Tab.Container defaultActiveKey="all">
                    <div className="px-2 pt-2 bg-primary bg-pattern ">
                        <Nav className="nav-tabs nav-tabs-custom" role='tablist'>
                            <Nav.Item>
                                <Nav.Link eventKey="all"> All (4) </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="messages" tabIndex={1}> Meassages </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="alerts" tabIndex={2}> Alerts </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </div>

                        {/* </div> */}

                        <Tab.Content>
                            <Tab.Pane id="all" eventKey="all" className="py-2 ps-2">
                                <SimpleBar style={{ maxHeight: "300px" }} className="pe-2">
                                    <div className="text-reset notification-item d-block dropdown-item position-relative">
                                        <div className="d-flex">
                                            <div className="avatar-xs me-3 flex-shrink-0">
                                                <span className="avatar-title bg-info-subtle text-info rounded-circle fs-16">
                                                    <i className="bx bx-badge-check"></i>
                                                </span>
                                            </div>
                                            <div className="flex-grow-1">
                                                <Button variant="link" href="#" className="stretched-link p-0">
                                                    <h6 className="mt-0 mb-2 lh-base">Your <b>Elite</b> author Graphic
                                                        Optimization <span className="text-secondary">reward</span> is ready!
                                                    </h6>
                                                </Button>
                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                    <span><i className="mdi mdi-clock-outline"></i> Just 30 sec ago</span>
                                                </p>
                                            </div>
                                            <div className="px-2 fs-15">
                                                <div className="form-check notification-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="all-notification-check01" />
                                                    <label className="form-check-label" htmlFor="all-notification-check01"></label>
                                                </div>
                                                {/* <input className="form-check-input" type="checkbox" /> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-reset notification-item d-block dropdown-item position-relative active">
                                        <div className="d-flex">
                                            <img src={avatar2}
                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                            <div className="flex-grow-1">
                                                <Button variant="link" href="#" className="stretched-link p-0"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6></Button>
                                                <div className="fs-13 text-muted">
                                                    <p className="mb-1">Answered to your comment on the cash flow forecast's
                                                        graph 🔔.</p>
                                                </div>
                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                    <span><i className="mdi mdi-clock-outline"></i> 48 min ago</span>
                                                </p>
                                            </div>
                                            <div className="px-2 fs-15">
                                                <div className="form-check notification-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="all-notification-check02" />
                                                    <label className="form-check-label" htmlFor="all-notification-check02"></label>
                                                </div>
                                                {/* <input className="form-check-input" type="checkbox" /> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-reset notification-item d-block dropdown-item position-relative">
                                        <div className="d-flex">
                                            <div className="avatar-xs me-3 flex-shrink-0">
                                                <span
                                                    className="avatar-title bg-danger-subtle text-danger rounded-circle fs-16">
                                                    <i className='bx bx-message-square-dots'></i>
                                                </span>
                                            </div>
                                            <div className="flex-grow-1">
                                                <Button variant="link" href="#" className="stretched-link p-0">
                                                    <h6 className="mt-0 mb-2 fs-13 lh-base">You have received <b className="text-success">20</b> new messages in the conversation</h6>
                                                </Button>
                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                    <span><i className="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                                                </p>
                                            </div>
                                            <div className="px-2 fs-15">
                                                <div className="form-check notification-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="all-notification-check03" />
                                                    <label className="form-check-label" htmlFor="all-notification-check03"></label>
                                                </div>
                                                {/* <input className="form-check-input" type="checkbox" /> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-reset notification-item d-block dropdown-item position-relative">
                                        <div className="d-flex">
                                            <img src={avatar8} className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                            <div className="flex-grow-1">
                                                <Button variant="link" href="#" className="stretched-link p-0"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Maureen Gibson</h6></Button>
                                                <div className="fs-13 text-muted">
                                                    <p className="mb-1">We talked about a project on linkedin.</p>
                                                </div>
                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                    <span><i className="mdi mdi-clock-outline"></i> 4 hrs ago</span>
                                                </p>
                                            </div>
                                            <div className="px-2 fs-15">
                                                <div className="form-check notification-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="all-notification-check04" />
                                                    <label className="form-check-label" htmlFor="all-notification-check04"></label>
                                                </div>
                                                {/* <input className="form-check-input" type="checkbox" /> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="my-3 text-center">
                                        <button type="button" className="btn btn-soft-success waves-effect waves-light">View
                                            All Notifications <i className="ri-arrow-right-line align-middle"></i></button>
                                    </div>
                                </SimpleBar>

                            </Tab.Pane>

                            <Tab.Pane id="messages" eventKey="messages" className="py-2 ps-2">
                                <SimpleBar style={{ maxHeight: "300px" }} className="pe-2">
                                    <div className="text-reset notification-item d-block dropdown-item">
                                        <div className="d-flex">
                                            <img src={avatar3}
                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                            <div className="flex-grow-1">
                                                <Button variant="link" href="#" className="stretched-link p-0"><h6 className="mt-0 mb-1 fs-13 fw-semibold">James Lemire</h6></Button>
                                                <div className="fs-13 text-muted">
                                                    <p className="mb-1">We talked about a project on linkedin.</p>
                                                </div>
                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                    <span><i className="mdi mdi-clock-outline"></i> 30 min ago</span>
                                                </p>
                                            </div>
                                            <div className="px-2 fs-15">
                                                <div className="form-check notification-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="messages-notification-check01" />
                                                    <label className="form-check-label" htmlFor="messages-notification-check01"></label>
                                                </div>
                                                {/* <input className="form-check-input" type="checkbox" /> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-reset notification-item d-block dropdown-item">
                                        <div className="d-flex">
                                            <img src={avatar2}
                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                            <div className="flex-grow-1">
                                                <Button variant="link" href="#" className="stretched-link p-0"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6></Button>
                                                <div className="fs-13 text-muted">
                                                    <p className="mb-1">Answered to your comment on the cash flow forecast's
                                                        graph 🔔.</p>
                                                </div>
                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                    <span><i className="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                                                </p>
                                            </div>
                                            <div className="px-2 fs-15">
                                                <div className="form-check notification-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="messages-notification-check02" />
                                                    <label className="form-check-label" htmlFor="messages-notification-check02"></label>
                                                </div>
                                                {/* <input className="form-check-input" type="checkbox" /> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-reset notification-item d-block dropdown-item">
                                        <div className="d-flex">
                                            <img src={avatar6}
                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                            <div className="flex-grow-1">
                                                <Button variant="link" href="#" className="stretched-link p-0"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Kenneth Brown</h6></Button>
                                                <div className="fs-13 text-muted">
                                                    <p className="mb-1">Mentionned you in his comment on 📃 invoice #12501. </p>
                                                </div>
                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                    <span><i className="mdi mdi-clock-outline"></i> 10 hrs ago</span>
                                                </p>
                                            </div>
                                            <div className="px-2 fs-15">
                                                <div className="form-check notification-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="messages-notification-check03" />
                                                    <label className="form-check-label" htmlFor="messages-notification-check03"></label>
                                                </div>
                                                {/* <input className="form-check-input" type="checkbox" /> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-reset notification-item d-block dropdown-item">
                                        <div className="d-flex">
                                            <img src={avatar8}
                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                            <div className="flex-grow-1">
                                                <Button variant="link" href="#" className="stretched-link p-0"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Maureen Gibson</h6></Button>
                                                <div className="fs-13 text-muted">
                                                    <p className="mb-1">We talked about a project on linkedin.</p>
                                                </div>
                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                    <span><i className="mdi mdi-clock-outline"></i> 3 days ago</span>
                                                </p>
                                            </div>
                                            <div className="px-2 fs-15">
                                                <div className="form-check notification-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="messages-notification-check04" />
                                                    <label className="form-check-label" htmlFor="messages-notification-check04"></label>
                                                </div>
                                                {/* <input className="form-check-input" type="checkbox" /> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="my-3 text-center">
                                        <button type="button" className="btn btn-soft-success waves-effect waves-light">View
                                            All Messages <i className="ri-arrow-right-line align-middle"></i></button>
                                    </div>
                                </SimpleBar>
                            </Tab.Pane>

                            <Tab.Pane id='alerts' eventKey="alerts" className="p-4">
                                <div className="w-25 w-sm-50 pt-3 mx-auto">
                                    <img src={bell} className="img-fluid" alt="user-pic" />
                                </div>
                                <div className="text-center pb-5 mt-2">
                                    <h6 className="fs-18 fw-semibold lh-base">Hey! You have no any notifications </h6>
                                </div>
                            </Tab.Pane>

                        </Tab.Content>
                    </Tab.Container>
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment >
    );
};

export default NotificationDropdown;