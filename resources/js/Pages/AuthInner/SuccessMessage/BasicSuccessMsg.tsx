import { Head, Link } from "@inertiajs/react";
import GuestLayout from "../../../Layouts/GuestLayout";
import { Col, Container, Row, Card, } from 'react-bootstrap';
import logoLight from '../../../../images/logo-light.png';
export default function BasicSuccessMsg() {
    return (
        <GuestLayout>
            <Head title="Success Message | Velzon - React Admin & Dashboard Template" />
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
                                    <div className="avatar-lg mx-auto mt-2">
                                        <div className="avatar-title bg-light text-success display-3 rounded-circle">
                                            <i className="ri-checkbox-circle-fill"></i>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-2">
                                        <h4>Well done !</h4>
                                        <p className="text-muted mx-4">Aww yeah, you successfully read this important message.</p>
                                        <div className="mt-4">
                                            <Link href="/" className="btn btn-success w-100">Back to Dashboard</Link>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </GuestLayout>
    )
}