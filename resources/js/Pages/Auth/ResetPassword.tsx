import React, { useEffect } from 'react';
import GuestLayout from '../../Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Alert, Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import logoLight from '../../../images/logo-light.png'

export default function ResetPassword({ token, email }: any) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e: any) => {
        e.preventDefault();

        post(route('password.store'));
    };

    return (
        <React.Fragment>
            <GuestLayout>
                <Head title="Reset Password | Velzon - React Admin & Dashboard Template" />
                <div className="auth-page-content mt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link href="/#" className="d-inline-block auth-logo">
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
                                            <form onSubmit={submit}>
                                                <div>
                                                    <Form.Label htmlFor="email" value="Email" className='form-label'> Email </Form.Label>
                                                    <span className='text-danger ms-1'>*</span>
                                                    <Form.Control
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        placeholder="Enter Email"
                                                        value={data.email}
                                                        className={"mt-1 form-control" + (errors.email) ? 'is-invalid' : ''}
                                                        autoComplete="username"
                                                        onChange={(e: any) => setData('email', e.target.value)}
                                                        required
                                                    />

                                                    <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.email}</Form.Control.Feedback>
                                                </div>


                                                <div className="flex items-center justify-end mt-4">
                                                    <Button type="submit" className="btn btn-success w-100" disabled={processing}>
                                                        Send Reset Link
                                                    </Button>
                                                </div>
                                            </form>
                                        </div>
                                    </Card.Body>
                                </Card>
                                <div className="mt-4 text-center">
                                    <p className="mb-0">Wait, I remember my password... <Link href={route('login')} className="fw-bold text-primary text-decoration-underline"> Click here </Link> </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

            </GuestLayout>
        </React.Fragment>
    );
}
