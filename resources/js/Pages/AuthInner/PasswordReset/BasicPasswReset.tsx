import React from 'react';
import { Alert, Card, Col, Container, Row, Form, } from 'react-bootstrap';
import logoLight from "../../../../images/logo-light.png";

//formik
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GuestLayout from '../../../Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';

const BasicPasswReset = () => {

    const validation: any = useFormik({
        enableReinitialize: true,

        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Please Enter Your Email")
                .email("Please include an @ in the email address"),
        }),
        onSubmit: (values) => {
            // console.log(values);
        }
    });

    return (
        <React.Fragment>
            <GuestLayout>
                <Head title = "Reset Password | Velzon - React Admin & Dashboard Template"/>
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
                                    <p className="mt-3 fs-15 fw-semibold">Premium Admin & Dashboard Template</p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">
                                    <Card.Body className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Forgot Password?</h5>
                                            <p className="text-muted">Reset password with velzon</p>
                                            <i className="ri-mail-send-line display-5 text-success"></i>
                                        </div>

                                        <Alert className="border-0 alert-warning text-center mb-2 mx-2" role="alert">
                                            Enter your email and instructions will be sent to you!
                                        </Alert>
                                        <div className="p-2">
                                            <Form onSubmit={validation.handleSubmit}>
                                                <div className="mb-4">
                                                    <Form.Label className="form-label">Email</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        className="form-control"
                                                        id="email"
                                                        placeholder="Enter Email"
                                                        name="email"
                                                        value={validation.values.email}
                                                        onBlur={validation.handleBlur}
                                                        onChange={validation.handleChange}
                                                        isInvalid={validation.errors.email && validation.touched.email ? true : false}
                                                    />
                                                    {validation.errors.email && validation.touched.email ? (
                                                        <Form.Control.Feedback type="invalid">{validation.errors.email}</Form.Control.Feedback>
                                                    ) : null}
                                                </div>

                                                <div className="text-center mt-4">
                                                    <button className="btn btn-success w-100" type="submit">Send Reset Link</button>
                                                </div>
                                            </Form>
                                        </div>
                                    </Card.Body>
                                </Card>

                                <div className="mt-4 text-center">
                                    <p className="mb-0">Wait, I remember my password... <Link href="/auth-signin-basic" className="fw-bold text-primary text-decoration-underline"> Click here </Link> </p>
                                </div>

                            </Col>
                        </Row>
                    </Container>
                </div>
            </GuestLayout>
        </React.Fragment>
    );
};

export default BasicPasswReset;