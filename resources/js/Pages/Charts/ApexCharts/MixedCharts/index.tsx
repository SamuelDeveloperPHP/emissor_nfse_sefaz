import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';


import {
    Line,
    YAxis,
    Area,
    LineColumnArea
} from "./MixedCharts";
import { Head } from '@inertiajs/react';
import Layout from '../../../../Layouts';


const MixedCharts = () => {
    
    return (
        <React.Fragment>
            <Head title='Mixed Charts | Velzon - React Admin & Dashboard Template'/>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Mixed Charts" pageTitle="Apexcharts" />
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Line & Column Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Line dataColors='["--vz-primary", "--vz-success"]'/>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Multiple Y-Axis Charts</h4>
                                </Card.Header>
                                <Card.Body>
                                    <YAxis dataColors='["--vz-primary", "--vz-info", "--vz-success"]'/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Line & Area Charts</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Area dataColors='["--vz-primary", "--vz-success"]'/>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Line, Column & Area Charts</h4>
                                </Card.Header>
                                <Card.Body>
                                    <LineColumnArea dataColors='["--vz-primary", "--vz-success", "--vz-danger"]'/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
MixedCharts.layout = (page:any) => <Layout children={page}/>
export default MixedCharts;