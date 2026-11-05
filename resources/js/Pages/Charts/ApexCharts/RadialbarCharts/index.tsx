import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import { SimpleRadialbar, MultipleRadialbar, CircleRadialbar, GradientCircleRadialbar, StrokedCircleRadial, SemiCircularRadial, ImageRadialbar } from './RadialbarCharts';
import { Head } from '@inertiajs/react';
import Layout from '../../../../Layouts';


const RadialbarCharts = () => {
    
    return (
        <React.Fragment>
            <Head title='Radialbar Charts | Velzon - React Admin & Dashboard Template'/>
        <div className="page-content">
            <Container fluid>
                <BreadCrumb title="Radialbar Charts" pageTitle="Apexcharts" />
                <Row>
                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <h4 className="card-title mb-0">Simple Radialbar Chart</h4>
                            </Card.Header>
                            <Card.Body>
                                <SimpleRadialbar dataColors='["--vz-success"]' />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <h4 className="card-title mb-0">Multiple Radialbar</h4>
                            </Card.Header>
                            <Card.Body>
                                <MultipleRadialbar dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger"]' />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <h4 className="card-title mb-0">Circle Chart - Custom Angle</h4>
                            </Card.Header>
                            <Card.Body>
                                <CircleRadialbar dataColors='["--vz-primary", "--vz-info", "--vz-danger", "--vz-success"]' />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <h4 className="card-title mb-0">Gradient Circle Chart</h4>
                            </Card.Header>
                            <Card.Body>
                                <GradientCircleRadialbar dataColors='["--vz-success"]' />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <h4 className="card-title mb-0">Stroked Circle Chart</h4>
                            </Card.Header>
                            <Card.Body>
                                <StrokedCircleRadial dataColors='["--vz-success"]' />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <h4 className="card-title mb-0">Radialbars with Image</h4>
                            </Card.Header>

                            <Card.Body>
                                <ImageRadialbar/>
                                {/* dataColors='["--vz-success"]' */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <h4 className="card-title mb-0">Semi Circular Chart</h4>
                            </Card.Header>
                            <Card.Body>
                                <SemiCircularRadial dataColors='["--vz-primary"]' />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
        </React.Fragment>
    );
};
RadialbarCharts.layout = (page:any) => <Layout children={page}/>
export default RadialbarCharts;