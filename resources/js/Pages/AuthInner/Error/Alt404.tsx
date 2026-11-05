import { Head, Link } from '@inertiajs/react';
import GuestLayout from '../../../Layouts/GuestLayout';
import { Card, Col, Container, Row } from 'react-bootstrap';
import React from 'react';

export default function Alt404(){
return(
    <React.Fragment>
        <Head title="404 Error Alt | Velzon - React Admin & Dashboard Template"/>
        <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-overlay"></div>
        <div className="auth-page-content overflow-hidden pt-lg-5">
            <Container>
                <Row className="justify-content-center">
                    <Col xl={5}>
                        <Card className="overflow-hidden">
                            <Card.Body className="p-4">
                                <div className="text-center">
                                    <i className="ri-bard-line display-5 text-success"></i>
                                    <h1 className="text-primary mb-4">Oops !</h1>
                                    <h4 className="text-uppercase">Sorry, Page not Found 😭</h4>
                                    <p className="text-muted mb-4">The page you are looking for not available!</p>
                                    <Link href="/" className="btn btn-success"><i className="mdi mdi-home me-1"></i>Back to home</Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
    </React.Fragment >
)
}