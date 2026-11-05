import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';

import {
    Basic,
    DifferentColor,
    MultiSeries,
    Advanced,
    MultipleSeries,
    Dumbbell
} from "./TimelineCharts";
import { Head } from '@inertiajs/react';
import Layout from '../../../../Layouts';


const TimelineCharts = () => {
    
    return (
        <React.Fragment>
            <Head title='TimeLine Charts | Velzon - React Admin & Dashboard Template'/>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="TimeLine Charts" pageTitle="Apexcharts" />
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Basic TimeLine Charts</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Basic dataColors='["--vz-primary"]' />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Different Color For Each Bar</h4>
                                </Card.Header>
                                <Card.Body>
                                    <DifferentColor dataColors='["--vz-primary", "--vz-danger", "--vz-success", "--vz-warning", "--vz-info"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Multi Series Timeline</h4>
                                </Card.Header>
                                <Card.Body>
                                    <MultiSeries dataColors='["--vz-primary","--vz-success"]' />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Advanced Timeline (Multiple Range)</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Advanced dataColors='["--vz-primary", "--vz-success", "--vz-warning"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Multiple series � Group rows</h4>
                                </Card.Header>

                                <Card.Body>
                                    <MultipleSeries dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info","--vz-gray","--vz-pink","--vz-purple","--vz-secondary", "--vz-dark"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Dumbbell Chart (Horizontal)</h4>
                                </Card.Header>

                                <Card.Body>
                                    <Dumbbell dataColors='["--vz-primary", "--vz-success"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
TimelineCharts.layout = (page:any) => <Layout children={page}/>
export default TimelineCharts;