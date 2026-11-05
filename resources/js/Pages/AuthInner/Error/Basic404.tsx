import React from "react";
import GuestLayout from "../../../Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { Col, Container, Row } from 'react-bootstrap';
import error from '../../../../images/error.svg';

export default function Basic404(){
    return(
        <React.Fragment>
            <GuestLayout>
                <Head title="404 Error Basic | Velzon - React Admin & Dashboard Template"/>
                <div className="auth-page-content mt-lg-5">
                        <Container>
                            <Row>
                                <Col lg={12}>
                                    <div className="text-center pt-4">
                                        <div className="">
                                            <img src={error} alt="" className="error-basic-img move-animation" />
                                        </div>
                                        <div className="mt-n4">
                                            <h1 className="display-1 fw-medium">404</h1>
                                            <h3 className="text-uppercase">Sorry, Page not Found 😭</h3>
                                            <p className="text-muted mb-4">The page you are looking for not available!</p>
                                            <Link href="/" className="btn btn-success"><i className="mdi mdi-home me-1"></i>Back to home</Link>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
            </GuestLayout>
        </React.Fragment>
    )
}