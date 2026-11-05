import { useEffect } from 'react';
import GuestLayout from '../../Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import logoLight from '../../../images/logo-light.png';
import avatar1 from '../../../images/users/avatar-1.jpg'
export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e: any) => {
        e.preventDefault();

        post(route('password.confirm'));
    };

    return (
        <GuestLayout>
            <Head title="Lock Screen | Velzon - React Admin & Dashboard Template" />
            <div className="auth-page-content mt-lg-5">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="text-center mt-sm-5 mb-4 text-white-50">
                                <div>
                                    <Link href={route("/dashboard")} className="d-inline-block auth-logo">
                                        <img src={logoLight} alt="" height="20" />
                                    </Link>
                                </div>
                                <p className="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

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
                                <form onSubmit={submit}>
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
                                            autoFocus
                                            onChange={(e: any) => setData('password', e.target.value)}
                                            required
                                        />

                                        <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.password}</Form.Control.Feedback>
                                    </div>

                                    <div className="flex items-center justify-end mt-4">
                                        <Button type='submit' className="ml-4 btn btn-success w-100" disabled={processing}>
                                            Confirm
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Card.Body>
                    </Card>
                    <div className="mt-4 text-center">
                        <p className="mb-0">Not you ? return <Link href={route('login')} className="fw-semibold text-primary text-decoration-underline"> Signin </Link> </p>
                    </div>
                </Col>
            </Row>
        </GuestLayout>
    );
}
