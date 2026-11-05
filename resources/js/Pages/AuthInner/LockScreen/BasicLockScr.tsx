import React from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

//import images
import logoLight from "../../../../images/logo-light.png";
import avatar1 from "../../../../images/users/avatar-1.jpg";
import GuestLayout from '../../../Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';


const BasicLockScreen = () => {
    
    return (
        <React.Fragment>
            <GuestLayout>
                <Head title = "Lock Screen | Velzon - React Admin & Dashboard Template"/>
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
                                    <Card.Body className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Lock Screen</h5>
                                            <p className="text-muted">Enter your password to unlock the screen!</p>
                                        </div>
                                        <div className="user-thumb text-center">
                                            <img src={avatar1} className="rounded-circle img-thumbnail avatar-lg" alt="thumbnail" />
                                            <h5 className="font-size-15 mt-3">Anna Adame</h5>
                                        </div>
                                        <div className="p-2 mt-4">
                                            <form>
                                                <div className="mb-3">
                                                    <Form.Label className="form-label" htmlFor="userpassword">Password</Form.Label>
                                                    <Form.Control type="password" className="form-control" id="userpassword" placeholder="Enter password" required />
                                                </div>
                                                <div className="mb-2 mt-4">
                                                    <Button className="w-100 btn-success" type="submit">Unlock</Button>
                                                </div>
                                            </form>
                                        </div>
                                    </Card.Body>
                                </Card>
                                <div className="mt-4 text-center">
                                    <p className="mb-0">Not you ? return <Link href="/auth-signin-basic" className="fw-semibold text-primary text-decoration-underline"> Signin </Link> </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </GuestLayout>
        </React.Fragment>
    );
};

export default BasicLockScreen;