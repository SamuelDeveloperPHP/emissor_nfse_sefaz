import React from 'react';
import { Alert, Card, Col, Row } from 'react-bootstrap';

//Import Icons
import FeatherIcon from "feather-icons-react";

import { otherWidgets2 } from "../../common/data/index";

// Import Images
import illustarator1 from "../../../images/user-illustarator-1.png";
import illustarator2 from "../../../images/user-illustarator-2.png";
import { Link } from '@inertiajs/react';

const OtherWidgets = () => {
    return (
        <React.Fragment>
            <Row>
                <Col className="col-12">
                    <h5 className="text-decoration-underline mb-3 mt-2 pb-3">Other Widgets</h5>
                </Col>
            </Row>

            <Row>
                <Col xl={4}>
                    <Card>
                        <Card.Body className="p-0">
                            <Alert variant='warning' className="border-0 rounded-top rounded-0 m-0 d-flex align-items-center">
                                <FeatherIcon
                                    icon="alert-triangle"
                                    className="text-warning me-2 icon-sm"
                                />
                                <div className="flex-grow-1 text-truncate">
                                    Your free trial expired in <b>17</b> days.
                                </div>
                                <div className="flex-shrink-0">
                                    <Link href="/pages-pricing" className="text-reset text-decoration-underline"><b>Upgrade</b></Link>
                                </div>
                            </Alert>

                            <Row className="align-items-end">
                                <Col sm={8}>
                                    <div className="p-3">
                                        <p className="fs-16 lh-base">Upgrade your plan from a <span className="fw-semibold">Free
                                            trial</span>, to ‘Premium Plan’ <i className="mdi mdi-arrow-right"></i></p>
                                        <div className="mt-3">
                                            <Link href="/pages-pricing" className="btn btn-success">Upgrade Account!</Link>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={4}>
                                    <div className="px-3">
                                        <img src={illustarator2} className="img-fluid" alt="" />
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={4}>
                    <Card className="bg-primary">
                        <Card.Body className="p-0">
                            <Alert variant="danger" className="rounded-top alert-solid alert-label-icon border-0 rounded-0 m-0 d-flex align-items-center">
                                <i className="ri-error-warning-line label-icon"></i>
                                <div className="flex-grow-1 text-truncate">
                                    Your free trial expired in <b>17</b> days.
                                </div>
                                <div className="flex-shrink-0">
                                    <Link href="/pages-pricing" className="text-reset text-decoration-underline"><b>Upgrade</b></Link>
                                </div>
                            </Alert>

                            <Row className="align-items-end">
                                <Col sm={8}>
                                    <div className="p-3">
                                        <p className="fs-16 lh-base text-white">Upgrade your plan from a <span className="fw-semibold">Free
                                            trial</span>, to ‘Premium Plan’ <i className="mdi mdi-arrow-right"></i></p>
                                        <div className="mt-3">
                                            <Link href="/pages-pricing" className="btn btn-info">Upgrade Account!</Link>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={4}>
                                    <div className="px-3">
                                        <img src={illustarator1} className="img-fluid" alt="" />
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xl={4}>
                    <Card>
                        <Card.Body className="p-0">
                            <Alert variant="warning" className="border-0 rounded-top rounded-0 m-0 d-flex align-items-center">
                                <div className="flex-grow-1 text-truncate">
                                    We will choose a gift for you in <b>5</b> days.
                                </div>
                                <div className="flex-shrink-0">
                                    <Link href="/pages-pricing" className="text-reset text-decoration-underline"><b>Get Free Gift</b></Link>
                                </div>
                            </Alert>
                            <div className="d-flex p-3">
                                <div className="flex-shrink-0">
                                    <div className="avatar-md me-3">
                                        <span className="avatar-title bg-danger-subtle rounded-circle fs-1">
                                            <i className="ri-gift-2-line text-danger"></i>
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <p className="fs-16 lh-base">Personalized <span className="fw-semibold">Gift Boxes</span>, with attitude, Let's collect your Xmas box <i className="mdi mdi-arrow-right"></i></p>
                                    <div className="mt-3">
                                        <Link href="/pages-pricing" className="btn btn-secondary">Get a Free Gift</Link>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>

                {(otherWidgets2 || []).map((item: any, key: any) => (<Col lg={4} key={key}>
                    <Card>
                        <Card.Body>
                            <h5 className="fs-15 fw-semibold">{item.title}</h5>
                            <p className="text-muted">{item.subTitle}</p>
                            <div className="d-flex flex-wrap justify-content-evenly">
                                {item.subItem.map((item: any, key: any) => (<p className="text-muted mb-0" key={key}><i className={"fs-18 align-middle me-2 " + item.icon + " text-" + item.iconClass}></i>{item.label}</p>))}
                            </div>
                        </Card.Body>
                        <div className="progress animated-progess rounded-bottom rounded-0" style={{ height: "6px" }}>
                            {item.progressBar.map((item: any, key: any) => (
                                <div
                                    className={"progress-bar rounded-0 " + item.bgColor}
                                    role="progressbar"
                                    style={{ width: item.width }}
                                    key={key}>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>))}
            </Row>
        </React.Fragment>
    );
};

export default OtherWidgets;