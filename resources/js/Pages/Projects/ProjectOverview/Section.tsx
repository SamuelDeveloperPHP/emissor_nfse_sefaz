import React from 'react';
import { Card, Col, Nav, Row, Tab, } from 'react-bootstrap';
//import images
import slack from '../../../../images/brands/slack.png';
import OverviewTab from './OverviewTab';
import DocumentsTab from './DocumentsTab';
import ActivitiesTab from './ActivitiesTab';
import TeamTab from './TeamTab';

const Section = () => {
    return (
        <React.Fragment>
            <Tab.Container defaultActiveKey="1">
                <Row>
                    <Col lg={12}>
                        <Card className="mt-n4 mx-n4">
                            <div className="bg-warning-subtle">
                                <Card.Body className="pb-0 px-4">
                                    <Row className="mb-3">
                                        <div className="col-md">
                                            <Row className="align-items-center g-3">
                                                <div className="col-md-auto">
                                                    <div className="avatar-md">
                                                        <div className="avatar-title bg-white rounded-circle">
                                                            <img src={slack} alt="" className="avatar-xs" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div>
                                                        <h4 className="fw-bold">Velzon - Admin & Dashboard</h4>
                                                        <div className="hstack gap-3 flex-wrap">
                                                            <div><i className="ri-building-line align-bottom me-1"></i> Themesbrand</div>
                                                            <div className="vr"></div>
                                                            <div>Create Date : <span className="fw-medium">15 Sep, 2021</span></div>
                                                            <div className="vr"></div>
                                                            <div>Due Date : <span className="fw-medium">29 Dec, 2021</span></div>
                                                            <div className="vr"></div>
                                                            <div className="badge rounded-pill bg-info fs-12">New</div>
                                                            <div className="badge rounded-pill bg-danger fs-12">High</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Row>
                                        </div>
                                        <div className="col-md-auto">
                                            <div className="hstack gap-1 flex-wrap">
                                                <button type="button" className="btn py-0 fs-16 favourite-btn active">
                                                    <i className="ri-star-fill"></i>
                                                </button>
                                                <button type="button" className="btn py-0 fs-16 text-body">
                                                    <i className="ri-share-line"></i>
                                                </button>
                                                <button type="button" className="btn py-0 fs-16 text-body">
                                                    <i className="ri-flag-line"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </Row>

                                    <Nav className="nav-tabs-custom border-bottom-0 " role="tablist">
                                        <Nav.Item>
                                            <Nav.Link eventKey="1" className='text-body fw-semibold'>
                                                Overview
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="2" className='text-body fw-semibold'>
                                                Documents
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="3" className='text-body fw-semibold'>
                                                Activities
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="4" className='text-body fw-semibold'>
                                                Team
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Card.Body>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Tab.Content className="text-muted">
                            <Tab.Pane eventKey="1">
                                <OverviewTab />
                            </Tab.Pane>
                            <Tab.Pane eventKey="2">
                                <DocumentsTab />
                            </Tab.Pane>
                            <Tab.Pane eventKey="3">
                                <ActivitiesTab />
                            </Tab.Pane>
                            <Tab.Pane eventKey="4">
                                <TeamTab />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </React.Fragment>
    );
};

export default Section;