import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';

import {
    Basic,
    Scatter,
    Horizontal
} from "./BoxplotCharts";
import Layout from '../../../../Layouts';
import { Head } from '@inertiajs/react';


const BoxplotCharts = () => {
    
    return (
        <React.Fragment>
            <Head title = "Boxplot Charts | Velzon - React Admin & Dashboard Template"/>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Boxplot Charts" pageTitle="Apexcharts" />
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Basic Box Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Basic dataColors='["--vz-primary", "--vz-info"]' />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Boxplot with Scatter Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Scatter dataColors='["--vz-danger", "--vz-info", "--vz-danger", "--vz-primary"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Horizontal BoxPlot</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Horizontal dataColors='["--vz-light", "--vz-secondary-bg"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
BoxplotCharts.layout = (page:any) => <Layout children={page}/>
export default BoxplotCharts;