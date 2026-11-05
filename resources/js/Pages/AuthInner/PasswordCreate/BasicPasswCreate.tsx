import React, { useState } from 'react';
import { Button, Card, Col, Container, Row, Form,} from 'react-bootstrap';
import logoLight from "../../../../images/logo-light.png";

//formik
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GuestLayout from '../../../Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';

const BasicPasswCreate = () => {

    const [passwordShow, setPasswordShow] = useState<boolean>(false);
    const [confrimPasswordShow, setConfrimPasswordShow] = useState<boolean>(false);

    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            password: "",
            confirm_password: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .matches(RegExp('(.*[a-z].*)'), 'At least lowercase letter')
                .matches(RegExp('(.*[A-Z].*)'), 'At least uppercase letter')
                .matches(RegExp('(.*[0-9].*)'), 'At least one number')
                .required("This field is required"),
            confirm_password: Yup.string()
                .oneOf([Yup.ref('password'), ""],)
                .required('Confirm Password is required')
        }),
        onSubmit: (values) => {
            // console.log(values);
        }
    });
    return (
        <GuestLayout>
            <Head title = "Create New Password | Velzon - React Admin & Dashboard Template"/>
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
                                        <h5 className="text-primary">Create new password</h5>
                                        <p className="text-muted">Your new password must be different from previous used password.</p>
                                    </div>

                                    <div className="p-2">
                                        <Form onSubmit={validation.handleSubmit} action="/auth-signin-basic">
                                            <div className="mb-3">
                                                <Form.Label className="form-label" htmlFor="password-input">Password</Form.Label>
                                                <div className="position-relative auth-pass-inputgroup">
                                                    <Form.Control
                                                        type={passwordShow ? "text" : "password"}
                                                        className="form-control pe-5 password-input"
                                                        placeholder="Enter password"
                                                        id="password-input"
                                                        name="password"
                                                        value={validation.values.password}
                                                        onBlur={validation.handleBlur}
                                                        onChange={validation.handleChange}
                                                        isInvalid={validation.errors.password && validation.touched.password ? true : false}
                                                    />
                                                    {validation.errors.password && validation.touched.password ? (
                                                        <Form.Control.Feedback type="invalid">{validation.errors.password}</Form.Control.Feedback>
                                                    ) : null}
                                                    <Button variant="link" onClick={() => setPasswordShow(!passwordShow)} className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button"
                                                        id="password-addon"><i className="ri-eye-fill align-middle"></i></Button>
                                                </div>
                                                {/* <div id="passwordInput" className="form-text">Must be at least 8 characters.</div> */}
                                            </div>

                                            <div className="mb-3">
                                                <Form.Label className="form-label" htmlFor="confirm-password-input">Confirm Password</Form.Label>
                                                <div className="position-relative auth-pass-inputgroup mb-3">
                                                    <Form.Control
                                                        type={confrimPasswordShow ? "text" : "password"}
                                                        className="form-control pe-5 password-input"
                                                        placeholder="Confirm password"
                                                        id="confirm-password-input"
                                                        name="confirm_password"
                                                        value={validation.values.confirm_password}
                                                        onBlur={validation.handleBlur}
                                                        onChange={validation.handleChange}
                                                        isInvalid={validation.errors.confirm_password && validation.touched.confirm_password ? true : false}
                                                    />
                                                    {validation.errors.confirm_password && validation.touched.confirm_password ? (
                                                        <Form.Control.Feedback type="invalid">{validation.errors.confirm_password}</Form.Control.Feedback>
                                                    ) : null}
                                                    <Button variant="link" onClick={() => setConfrimPasswordShow(!confrimPasswordShow)} className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button">
                                                        <i className="ri-eye-fill align-middle"></i></Button>
                                                </div>
                                            </div>

                                            <div id="password-contain" className="p-3 bg-light mb-2 rounded">
                                                <h5 className="fs-13">Password must contain:</h5>
                                                <p id="pass-length" className="invalid fs-12 mb-2">Minimum <b>8 characters</b></p>
                                                <p id="pass-lower" className="invalid fs-12 mb-2">At <b>lowercase</b> letter (a-z)</p>
                                                <p id="pass-upper" className="invalid fs-12 mb-2">At least <b>uppercase</b> letter (A-Z)</p>
                                                <p id="pass-number" className="invalid fs-12 mb-0">A least <b>number</b> (0-9)</p>
                                            </div>

                                            <div className="form-check">
                                                <Form.Check.Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                                <Form.Check.Label className="form-check-label" htmlFor="auth-remember-check">Remember me</Form.Check.Label>
                                            </div>

                                            <div className="mt-4">
                                                <Button className="w-100 btn-success" type="submit">Reset Password</Button>
                                            </div>
                                        </Form>
                                    </div>
                                </Card.Body>
                            </Card>
                            <div className="mt-4 text-center">
                                <p className="mb-0">Wait, I remember my password... <Link href="/auth-signin-basic" className="fw-semibold text-primary text-decoration-underline"> Click here </Link> </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </GuestLayout>
    );
};

export default BasicPasswCreate;