import React from 'react';
import { Card, Col, Row, Dropdown } from 'react-bootstrap';
import CountUp from "react-countup";

// Import Images
import Bgd from "../../../images/bg-d.png";
import { Link } from '@inertiajs/react';
const Widgets = () => {
    return (
        <React.Fragment>
            <Row>
                <Col xl={6}>
                    <Card className="overflow-hidden">
                        <Card.Body className="bg-marketplace d-flex">
                            <div className="flex-grow-1">
                                <h4 className="fs-18 lh-base mb-0">Discover, Collect, Sell and Create <br /> your own <span className="text-success">NFTs.</span> </h4>
                                <p className="mb-0 mt-2 pt-1 text-muted">The world's first and largest digital marketplace.</p>
                                <div className="d-flex gap-3 mt-4">
                                    <Link href="/#" className="btn btn-secondary">Discover Now </Link>
                                    <Link href="/#" className="btn btn-success">Create Your Own</Link>
                                </div>
                            </div>
                            <img src={Bgd} alt="" className="img-fluid" />
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} md={6}>
                    <Card className="card-height-100">
                        <Card.Body>
                            <div className="float-end">
                            <Dropdown className="card-header-dropdown">
                                    <Dropdown.Toggle as="a" className="text-reset dropdown-btn arrow-none" role="button">
                                        <span className="text-muted fs-18"><i className="mdi mdi-dots-vertical align-middle"></i></span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-menu-end">
                                        <Dropdown.Item>Today</Dropdown.Item>
                                        <Dropdown.Item>Last Week</Dropdown.Item>
                                        <Dropdown.Item>Last Month</Dropdown.Item>
                                        <Dropdown.Item>Current Year</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title bg-warning-subtle rounded fs-3">
                                        <i className="bx bx-dollar-circle text-warning"></i>
                                    </span>
                                </div>
                                <div className="flex-grow-1 ps-3">
                                    <h5 className="text-muted text-uppercase fs-13 mb-0">Total Revenue</h5>
                                </div>
                            </div>
                            <div className="mt-4 pt-1">
                                <h4 className="fs-22 fw-semibold ff-secondary mb-0">$
                                    <span className="counter-value">
                                        <CountUp start={0} end={559526.564} separator={","} decimals={3} duration={4} />
                                    </span>
                                </h4>
                                <p className="mt-4 mb-0 text-muted"><span className="badge bg-danger-subtle text-danger mb-0 me-1"> <i className="ri-arrow-down-line align-middle"></i> 3.96 % </span> vs. previous month</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} md={6}>
                    <Card className="card-height-100">
                        <Card.Body>
                            <div className="float-end">
                            <Dropdown className="card-header-dropdown">
                                    <Dropdown.Toggle as="a" className="text-reset dropdown-btn arrow-none" role="button">
                                        <span className="text-muted fs-18"><i className="mdi mdi-dots-vertical align-middle"></i></span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-menu-end">
                                        <Dropdown.Item>Today</Dropdown.Item>
                                        <Dropdown.Item>Last Week</Dropdown.Item>
                                        <Dropdown.Item>Last Month</Dropdown.Item>
                                        <Dropdown.Item>Current Year</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title bg-primary-subtle rounded fs-3">
                                        <i className="bx bx-wallet text-primary"></i>
                                    </span>
                                </div>
                                <div className="flex-grow-1 ps-3">
                                    <h5 className="text-muted text-uppercase fs-13 mb-0">Estimated</h5>
                                </div>
                            </div>
                            <div className="mt-4 pt-1">
                                <h4 className="fs-22 fw-semibold ff-secondary mb-0">$
                                    <span className="counter-value">
                                        <CountUp start={0} end={624562.564} separator={","} decimals={3} duration={4} />
                                    </span>
                                </h4>
                                <p className="mt-4 mb-0 text-muted"><span className="badge bg-success-subtle text-success mb-0"> <i className="ri-arrow-up-line align-middle"></i> 16.24 % </span> vs. previous month</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Widgets;