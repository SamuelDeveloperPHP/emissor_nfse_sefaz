import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '../../../Layouts/GuestLayout';

//import images
import logoLight from "../../../../images/logo-light.png";

const BasicLogout = () => {
    return (
        <React.Fragment>
            <GuestLayout>
                <Head title='Log Out | Velzon - React Admin & Dashboard Template'/>
                <div className="auth-page-content mt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link href="/" className="d-inline-block auth-logo">
                                            <img src={logoLight} alt="" height="20" />
                                        </Link>
                                    </div>
                                    <p className="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">
                                    <Card.Body className="p-4 text-center">
                                        <i className="ri-cup-line display-5 text-success"></i>

                                        <div className="mt-4 pt-2">
                                            <h5>You are Logged Out</h5>
                                            <p className="text-muted">Thank you for using <span className="fw-semibold">velzon</span> admin template</p>
                                            <div className="mt-4">
                                                <Link href="/auth-signin-basic" className="btn btn-success w-100">Sign In</Link>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
                </GuestLayout>
        </React.Fragment >
    );
};

export default BasicLogout;