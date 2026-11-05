import React, { useEffect } from 'react';
import GuestLayout from '../../Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import logoLight from '../../../images/logo-light.png';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
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
        console.log('here')
        post(route('register'));
    };

    return (
        <React.Fragment>
            <GuestLayout>
                <Head title="Basic SignUp | Velzon - React Admin & Dashboard Template" />
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
                                            <h5 className="text-primary">Create New Account</h5>
                                            <p className="text-muted">Get your free velzon account now</p>
                                        </div>
                                        <div className="p-2 mt-4">
                                            <form onSubmit={submit}>
                                                <div>
                                                    <Form.Label htmlFor="email" value="Email" className='form-label'> Email </Form.Label>
                                                    <span className="text-danger ms-1">*</span>
                                                    <Form.Control
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        placeholder="Enter Email address"
                                                        value={data.email}
                                                        className={'mt-1 form-control' + (errors.email ? 'is-invalid' : '')}
                                                        autoComplete="username"
                                                        onChange={(e: any) => setData('email', e.target.value)}
                                                        required
                                                    />

                                                    <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.email}</Form.Control.Feedback>

                                                </div>

                                                <div className="mt-4">
                                                    <Form.Label htmlFor="name" value="Username" > Username </Form.Label>
                                                    <span className="text-danger ms-1">*</span>

                                                    <Form.Control
                                                        id="name"
                                                        name="name"
                                                        placeholder="Enter username"
                                                        value={data.name}
                                                        className={"mt-1 form-control" + (errors.name ? 'is-invalid' : '')}
                                                        autoComplete="name"
                                                        autoFocus
                                                        onChange={(e: any) => setData('name', e.target.value)}
                                                        required
                                                    />

                                                    <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.name}</Form.Control.Feedback>
                                                </div>

                                                <div className="mt-4">
                                                    <Form.Label htmlFor="password" value="Password" className='form-label'> Password </Form.Label>
                                                    <span className="text-danger ms-1">*</span>
                                                    <Form.Control
                                                        id="password"
                                                        type="password"
                                                        name="password"
                                                        placeholder="Enter Password"
                                                        value={data.password}
                                                        className={"mt-1 form-control" + (errors.password ? 'is-invalid' : '')}
                                                        autoComplete="new-password"
                                                        onChange={(e: any) => setData('password', e.target.value)}
                                                        required
                                                    />

                                                    <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.password}</Form.Control.Feedback>
                                                </div>

                                                <div className="mt-4">
                                                    <Form.Label htmlFor="password_confirmation" value="Confirm Password" className='form-label'> Confirm Password </Form.Label>
                                                    <span className="text-danger ms-1">*</span>

                                                    <Form.Control
                                                        id="password_confirmation"
                                                        type="password"
                                                        placeholder="Confirm password"
                                                        name="password_confirmation"
                                                        value={data.password_confirmation}
                                                        className={"mt-1 form-control" + (errors.password_confirmation ? 'is-invalid' : '')}
                                                        autoComplete="new-password"
                                                        onChange={(e: any) => setData('password_confirmation', e.target.value)}
                                                        required
                                                    />

                                                    <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.password_confirmation}</Form.Control.Feedback>
                                                </div>

                                                <div className="mb-4 mt-4">
                                                    <p className="mb-0 fs-12 text-muted fst-italic">By registering you agree to the Velzon 
                                                        <Link href="#" className="text-primary text-decoration-underline fst-normal fw-medium ms-2"> Terms of Use</Link></p>
                                                </div>

                                                <Button type="submit" className="btn btn-success w-100" disabled={processing}>
                                                    Sign Up
                                                </Button>

                                                <div className="mt-4 text-center">
                                                    <div className="signin-other-title">
                                                        <h5 className="fs-13 mb-4 title text-muted">Create account with</h5>
                                                    </div>

                                                    <div>
                                                        <button type="button" className="btn btn-primary btn-icon waves-effect waves-light"><i className="ri-facebook-fill fs-16"></i></button>{" "}
                                                        <button type="button" className="btn btn-danger btn-icon waves-effect waves-light"><i className="ri-google-fill fs-16"></i></button>{" "}
                                                        <button type="button" className="btn btn-dark btn-icon waves-effect waves-light"><i className="ri-github-fill fs-16"></i></button>{" "}
                                                        <button type="button" className="btn btn-info btn-icon waves-effect waves-light"><i className="ri-twitter-fill fs-16"></i></button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </Card.Body>
                                </Card>
                                <div className="mt-4 text-center">
                                    <p className="mb-0">Already have an account ? <Link href={route('login')} className="fw-semibold text-primary text-decoration-underline"> Signin </Link> </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </GuestLayout>
        </React.Fragment>
    );
}
