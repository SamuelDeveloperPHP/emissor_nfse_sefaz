import React from 'react';
import { Card, Col, Container, Row ,Button, Form} from 'react-bootstrap';
import AuthSlider from '../authCarousel';
import { Head, Link } from '@inertiajs/react';


const CoverSignIn = () => {

    return (
        <React.Fragment>
            <Head title="Cover SignIn | Velzon - React Admin & Dashboard Template"/>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card className="overflow-hidden">
                                    <Row className="g-0">
                                        <AuthSlider />

                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4">
                                                <div>
                                                    <h5 className="text-primary">Welcome Back !</h5>
                                                    <p className="text-muted">Sign in to continue to Velzon.</p>
                                                </div>

                                                <div className="mt-4">
                                                    <form action="/">

                                                        <div className="mb-3">
                                                            <Form.Label htmlFor="username" className="form-label">Username</Form.Label>
                                                            <Form.Control type="text" className="form-control" id="username" placeholder="Enter username" />
                                                        </div>

                                                        <div className="mb-3">
                                                            <div className="float-end">
                                                                <Link href="/auth-pass-reset-cover" className="text-muted">Forgot password?</Link>
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
                                                            <Button className="w-100 btn-success" href='/dashboard' type="submit">Sign In</Button>
                                                        </div>

                                                        <div className="mt-4 text-center">
                                                            <div className="signin-other-title">
                                                                <h5 className="fs-13 mb-4 title">Sign In with</h5>
                                                            </div>

                                                            <div>
                                                                <Button variant="primary" className="btn-icon me-1"><i className="ri-facebook-fill fs-16"></i></Button>
                                                                <Button variant="danger" className="btn-icon me-1"><i className="ri-google-fill fs-16"></i></Button>
                                                                <Button variant="dark" className="btn-icon me-1"><i className="ri-github-fill fs-16"></i></Button>
                                                                <Button variant="info" className="btn-icon"><i className="ri-twitter-fill fs-16"></i></Button>
                                                            </div>
                                                        </div>

                                                    </form>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p className="mb-0">Don't have an account ? <a href="/auth-signup-cover" className="fw-semibold text-primary text-decoration-underline"> Signup</a> </p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <footer className="footer">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center">
                                    <p className="mb-0">&copy; {new Date().getFullYear()} Velzon. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </footer>

            </div>
        </React.Fragment>
    );
};

export default CoverSignIn;