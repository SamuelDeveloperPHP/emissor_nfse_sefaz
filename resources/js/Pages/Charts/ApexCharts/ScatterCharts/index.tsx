import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';

import {
    Basic,
    Datetime,
    ImagesChart
} from "./ScatterCharts";
import { Head } from '@inertiajs/react';
import Layout from '../../../../Layouts';


const ScatterCharts = () => {
   
    return (
        <React.Fragment>
            <Head title='Scatter Charts | Velzon - React Admin & Dashboard Template'/>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Scatter Charts" pageTitle="Apexcharts" />
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Basic Scatter Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Basic dataColors='["--vz-primary", "--vz-success", "--vz-warning"]'/>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Scatter - Datetime Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Datetime dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-warning", "--vz-info"]'/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>        
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Scatter Images Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <ImagesChart dataColors='["--vz-primary", "--vz-danger"]'/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
ScatterCharts.layout = (page:any) => <Layout children={page}/>
export default ScatterCharts;