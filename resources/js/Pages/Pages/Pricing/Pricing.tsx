import React, { useState } from 'react';
import { Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';

import { pricing1, pricing2, pricing3 } from '../../../common/data';
import { Head, Link } from '@inertiajs/react';
import Layout from '../../../Layouts';

const Pricing = () => {


    return (
        <React.Fragment>
            <Head title='Pricing | Velzon - React Admin & Dashboard Template' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Pricing" pageTitle="Pages" />
                    <Tab.Container defaultActiveKey="1">
                        <Row className="justify-content-center mt-4">
                            <Col lg={5}>
                                <div className="text-center mb-4">
                                    <h4 className="fs-22">Plans & Pricing</h4>
                                    <p className="text-muted mb-4 fs-15">Simple pricing. No hidden fees. Advanced features for you business.</p>

                                    <div className="d-inline-flex">
                                        <Nav className="nav-pills arrow-navtabs plan-nav rounded mb-3 p-1" id="pills-tab" role="tablist">
                                            <Nav.Item>
                                                <Nav.Link
                                                    href="#"
                                                    className='fw-semibold'
                                                    eventKey="1"
                                                >
                                                    Monthly
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link
                                                    href="#"
                                                    className='fw-semibold'
                                                    eventKey="2"
                                                >Annually <span className="badge bg-success">25% Off</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row >
                            {(pricing1 || []).map((price1: any, key: any) => (
                                <Col xxl={3} lg={6} key={key}>

                                    <Card className="pricing-box ribbon-box right" >
                                        {price1.ribbon === true ? <div className="ribbon-two ribbon-two-danger"><span>Popular</span></div> : ""}
                                        <Card.Body className="bg-light m-2 p-4">
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="flex-grow-1">
                                                    <h5 className="mb-0 fw-semibold">{price1.type}</h5>
                                                </div>
                                                <div className="ms-auto">
                                                    <Tab.Content >
                                                        <Tab.Pane eventKey="1">
                                                            <h2 className="month mb-0">${price1.rate} <small className="fs-13 text-muted">/Month</small></h2>
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="2">
                                                            <h2 className="annual mb-0"><small className="fs-16"><del>${price1.delrateYear}</del></small> ${price1.rateYear} <small className="fs-13 text-muted">/Year</small></h2>
                                                        </Tab.Pane>
                                                    </Tab.Content>
                                                </div>
                                            </div>

                                            <p className="text-muted">{price1.description}</p>
                                            <ul className="list-unstyled vstack gap-3">
                                                <li>
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0 text-success me-1">
                                                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <b>{price1.projects}</b> Projects
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0 text-success me-1">
                                                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <b>{price1.Customers}</b> Customers
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0 text-success me-1">
                                                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            Scalable Bandwidth
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0 text-success me-1">
                                                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <b>{price1.FTP}</b> FTP Login
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex">
                                                        <div className={`flex-shrink-0 text-${price1.supportClass} me-1`}>
                                                            <i className={`ri-${price1.supportClassSymbol}-circle-fill fs-15 align-middle`}></i>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <b>24/7</b> Support
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex">
                                                        <div className={`flex-shrink-0 text-${price1.storageClass} me-1`}>
                                                            <i className={`ri-${price1.storageClassSymbol}-circle-fill fs-15 align-middle`}></i>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <b>{price1.storage}</b> Storage
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex">
                                                        <div className={`flex-shrink-0 text-${price1.domainClass} me-1`}>
                                                            <i className={`ri-${price1.domainClassSymbol}-circle-fill fs-15 align-middle`}></i>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            Domain
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className="mt-3 pt-2">
                                                <Link href="#" className={`btn btn-${price1.planButtonClassname} ${price1.btnstatus} w-100`}>{price1.btntxt}</Link>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Tab.Container>
                    <Row className="justify-content-center mt-5">
                        <Col lg={5}>
                            <div className="text-center mb-4 pb-2">
                                <h4 className="fs-22">Choose the plan that's right for you</h4>
                                <p className="text-muted mb-4 fs-15">Simple pricing. No hidden fees. Advanced features for you business.</p>
                            </div>
                        </Col>
                    </Row>


                    <Row className="justify-content-center">

                        <Col xl={9}>
                            <Row>
                                {(pricing2 || []).map((price2: any, key: any) => (
                                    <Col lg={4} key={key}>
                                        <Card className="pricing-box ribbon-box right">
                                            {price2.ribbon === true ? <div className="ribbon-two ribbon-two-danger"><span>Popular</span></div> : ""}
                                            <Card.Body className="p-4 m-2">
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-grow-1">
                                                        <h5 className="mb-1 fw-semibold">{price2.type}</h5>
                                                        <p className="text-muted mb-0">{price2.purpose}</p>
                                                    </div>
                                                    <div className="avatar-sm">
                                                        <div className="avatar-title bg-light rounded-circle text-primary">
                                                            <i className={"fs-20 " + price2.icon}></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pt-4">
                                                    <h2><sup><small>$ </small></sup>{price2.rate}<span className="fs-13 text-muted">/Month</span></h2>
                                                </div>
                                                <hr className="my-4 text-muted" />
                                                <div>
                                                    <ul className="list-unstyled text-muted vstack gap-3">
                                                        <li>
                                                            <div className="d-flex">
                                                                <div className="flex-shrink-0 text-success me-1">
                                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    Upto <b>{price2.projects}</b> Projects
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="d-flex">
                                                                <div className="flex-shrink-0 text-success me-1">
                                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    Upto <b>{price2.Customers}</b> Customers
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="d-flex">
                                                                <div className="flex-shrink-0 text-success me-1">
                                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    Scalable Bandwidth
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="d-flex">
                                                                <div className="flex-shrink-0 text-success me-1">
                                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <b>{price2.FTP}</b> FTP Login
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="d-flex">
                                                                <div className={`flex-shrink-0 text-${price2.supportClass} me-1`}>
                                                                    <i className={`ri-${price2.supportClassSymbol}-circle-fill fs-15 align-middle`}></i>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <b>24/7</b> Support
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="d-flex">
                                                                <div className={`flex-shrink-0 text-${price2.storageClass} me-1`}>
                                                                    <i className={`ri-${price2.storageClassSymbol}-circle-fill fs-15 align-middle`}></i>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <b>Unlimited</b> Storage
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="d-flex">
                                                                <div className={`flex-shrink-0 text-${price2.domainClass} me-1`}>
                                                                    <i className={`ri-${price2.domainClassSymbol}-circle-fill fs-15 align-middle`}></i>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    Domain
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <div className="mt-4">
                                                        <Link href="#" className={`btn btn-${price2.planButtonClassname} w-100 waves-effect waves-light`}>{price2.btntxt}</Link>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>

                    <Row className="justify-content-center mt-5">
                        <Col lg={4}>
                            <div className="text-center mb-4 pb-2">
                                <h4 className="fs-22">Simple Pricing Plan</h4>
                                <p className="text-muted mb-4 fs-15">Simple pricing. No hidden fees. Advanced features for you business.</p>

                            </div>
                        </Col>
                    </Row>

                    <Row>
                        {(pricing3 || []).map((price3: any, key: any) => (
                            <Col lg={6} key={key}>
                                <Card className="pricing-box ribbon-box ribbon-fill text-center">
                                    {price3.ribbon === true ?
                                        <div className="ribbon ribbon-primary">New</div> : ""}
                                    <Row className="g-0">
                                        <Col lg={6}>
                                            <Card.Body className="h-100">

                                                <div>
                                                    <h5 className="mb-1">{price3.type}</h5>
                                                    <p className="text-muted">{price3.purpose}</p>
                                                </div>

                                                <div className="py-4">
                                                    <h2><sup><small>$</small></sup>{price3.rate} <span className="fs-13 text-muted"> /Per month</span></h2>
                                                </div>

                                                <div className="text-center plan-btn mt-2">
                                                    <Link href="#" className="btn btn-success w-sm waves-effect waves-light">Sign up</Link>
                                                </div>
                                            </Card.Body>
                                        </Col>
                                        <Col lg={6}>
                                            <Card.Body className="border-start mt-4 mt-lg-0">
                                                <Card.Header className="bg-light">
                                                    <h5 className="fs-15 mb-0">Plan Features:</h5>
                                                </Card.Header>
                                                <Card.Body className="pb-0">
                                                    <ul className="list-unstyled vstack gap-3 mb-0">
                                                        <li>Users: <span className="text-success fw-semibold">{price3.users}</span></li>
                                                        <li>Storage: <span className="text-success fw-semibold">{price3.storage} GB</span></li>
                                                        <li>Domain: <span className="text-success fw-semibold">{price3.domain}</span></li>
                                                        <li>Support: <span className="text-success fw-semibold">{price3.support}</span></li>
                                                    </ul>
                                                </Card.Body>
                                            </Card.Body>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ))}

                    </Row>

                </Container>

            </div>
        </React.Fragment>
    );
};

Pricing.layout = (page:any) => <Layout children={page} />

export default Pricing;