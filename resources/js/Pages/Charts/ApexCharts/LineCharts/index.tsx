import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';

import {
    BasicLineCharts,
    ZoomableTimeseries,
    LinewithDataLabels,
    DashedLine,
    LinewithAnnotations,
    BrushChart,
    BrushChart1,
    SteplineChart,
    GradientCharts,
    MissingData,
    ChartSyncingLine,
    ChartSyncingLine2,
    ChartSyncingArea
} from "./LineCharts";
import { Head } from '@inertiajs/react';
import Layout from '../../../../Layouts';


const LineCharts = () => {
   
    return (
        <React.Fragment>
            <Head title='Line Charts | Velzon - React Admin & Dashboard Template' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Line Charts" pageTitle="Apexcharts" />
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Basic Line Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <div>
                                        <BasicLineCharts dataColors='["--vz-primary"]' />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Zoomable Timeseries</h4>
                                </Card.Header>
                                <Card.Body>
                                    <ZoomableTimeseries dataColors='["--vz-success"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Line with Data Labels</h4>
                                </Card.Header>
                                <Card.Body>
                                    <LinewithDataLabels dataColors='["--vz-primary", "--vz-success"]' />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Dashed Line</h4>
                                </Card.Header>
                                <Card.Body>
                                    <DashedLine dataColors='["--vz-primary", "--vz-danger", "--vz-success"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Line with Annotations</h4>
                                </Card.Header>
                                <Card.Body>
                                    <LinewithAnnotations dataColors='["--vz-primary"]' />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Brush Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <div>
                                        <BrushChart dataColors='["--vz-danger"]' />
                                    </div>
                                    <div>
                                        <BrushChart1 dataColors='["--vz-info"]' />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Stepline Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <SteplineChart dataColors='["--vz-success"]' />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Gradient Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <div>
                                        <GradientCharts dataColors='["--vz-success"]' />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Missing Data/ Null Value Charts</h4>
                                </Card.Header>
                                <Card.Body>
                                    <MissingData dataColors='["--vz-primary", "--vz-danger", "--vz-success"]' />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Syncing Charts</h4>
                                </Card.Header>
                                <Card.Body>
                                    <div>
                                        <ChartSyncingLine dataColors='["--vz-primary"]' />
                                        <ChartSyncingLine2 dataColors='["--vz-warning"]' />
                                        <ChartSyncingArea dataColors='["--vz-success"]' />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
LineCharts.layout = (page:any) => <Layout children={page}/>
export default LineCharts;