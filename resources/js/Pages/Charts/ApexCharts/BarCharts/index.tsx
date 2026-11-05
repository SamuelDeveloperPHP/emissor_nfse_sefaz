import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import {
    Basic,
    CustomDataLabel,
    Stacked,
    Stacked2,
    Negative,
    Markers,
    Reversed,
    Patterned,
    Groupes,
    BarwithImages
} from "./BarCharts";
import { Head } from '@inertiajs/react';
import Layout from '../../../../Layouts';


const BarCharts = () => {
    return (
        <React.Fragment>
            <Head title='Apex Bar Charts | Velzon - React Admin & Dashboard Template'/>
            <div className="page-content">            
                <Container fluid>
                    <BreadCrumb title="Bar Charts" pageTitle="Apexcharts" />
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Basic Bar Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Basic dataColors='["--vz-success"]'/>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Custom DataLabels Bar</h4>
                                </Card.Header>
                                <Card.Body>
                                    <CustomDataLabel dataColors='["--vz-primary", "--vz-secondary", "--vz-success", "--vz-info", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-primary", "--vz-success", "--vz-secondary"]'/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Stacked Bar Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Stacked dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'/>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Stacked Bars 100</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Stacked2 dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Bar with Negative Values</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Negative dataColors='["--vz-primary", "--vz-success"]'/>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Bar with Markers</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Markers dataColors='["--vz-success", "--vz-primary"]'/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Reversed Bar Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Reversed dataColors='["--vz-info"]'/>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Patterned Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Patterned dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger"]'/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Grouped Bar Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Groupes dataColors='["--vz-primary", "--vz-success"]'/>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Bar with Images</h4>
                                </Card.Header>
                                <Card.Body>
                                    <BarwithImages />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
BarCharts.layout = (page:any) => <Layout children={page}/>
export default BarCharts;