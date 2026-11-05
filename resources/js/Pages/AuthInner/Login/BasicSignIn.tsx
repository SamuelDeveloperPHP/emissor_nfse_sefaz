import React from 'react';
import { Card, Col, Container, Row, Button, Form } from 'react-bootstrap';


//import images
import logoLight from "../../../../images/logo-light.png";
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '../../../Layouts/GuestLayout';


const BasicSignIn = () => {

    return (
        <React.Fragment>
            <GuestLayout>
                <Head title="Basic SignIn | Velzon - React Admin & Dashboard Template"/>
                <div className="auth-page-content mt-lg-5">                
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link href="/dashboard" className="d-inline-block auth-logo">
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
                                    <Card.Body className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Welcome Back !</h5>
                                            <p className="text-muted">Sign in to continue to Velzon.</p>
                                        </div>
                                        <div className="p-2 mt-4">
                                            <form action="#">

                                                <div className="mb-3">
                                                    <Form.Label htmlFor="username" className="form-label">Username</Form.Label>
                                                    <Form.Control type="text" className="form-control" id="username" placeholder="Enter username" />
                                                </div>

                                                <div className="mb-3">
                                                    <div className="float-end">
                                                        <Link href="/auth-pass-reset-basic" className="text-muted">Forgot password?</Link>
                                                    </div>
                                                    <Form.Label className="form-label" htmlFor="password-input">Password</Form.Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Form.Control type="password" className="form-control pe-5 password-input" placeholder="Enter password" id="password-input" />
                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon"><i className="ri-eye-fill align-middle"></i></button>
                                                    </div>
                                                </div>

                                                <div className="form-check">
                                                    <Form.Check.Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                                    <Form.Check.Label className="form-check-label" htmlFor="auth-remember-check">Remember me</Form.Check.Label>
                                                </div>

                                                <div className="mt-4">
                                                    <Button variant="link" href="/dashboard" className="text-white btn btn-success w-100" type="submit">Sign In</Button>
                                                </div>

                                                <div className="mt-4 text-center">
                                                    <div className="signin-other-title">
                                                        <h5 className="fs-13 mb-4 title">Sign In with</h5>
                                                    </div>
                                                    <div>
                                                        <Button variant="primary" className="btn-icon"><i className="ri-facebook-fill fs-16"></i></Button>{" "}
                                                        <Button variant="danger" className="btn-icon"><i className="ri-google-fill fs-16"></i></Button>{" "}
                                                        <Button variant="dark" className="btn-icon"><i className="ri-github-fill fs-16"></i></Button>{" "}
                                                        <Button variant="info" className="btn-icon"><i className="ri-twitter-fill fs-16"></i></Button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </Card.Body>
                                </Card>

                                <div className="mt-4 text-center">
                                    <p className="mb-0">Don't have an account ? <Link href="/auth-signup-basic" className="fw-semibold text-primary text-decoration-underline"> Signup </Link> </p>
                                </div>

                            </Col>
                        </Row>
                    </Container>
                </div>
            </GuestLayout>
        </React.Fragment>
    );
};

export default BasicSignIn;