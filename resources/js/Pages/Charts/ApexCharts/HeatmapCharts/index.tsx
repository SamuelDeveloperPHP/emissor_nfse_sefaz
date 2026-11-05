import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';

import {
    BasicHeatmap,
    MultipleHeatmap,
    ColorRange,
    RangeWithoutShades
} from "./HeatmapCharts";
import { Head } from '@inertiajs/react';
import Layout from '../../../../Layouts';


const HeatmapCharts = () => {
    
    return (
        <React.Fragment>
            <Head title='Heatmap Charts | Velzon - React Admin & Dashboard Template' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Heatmap Charts" pageTitle="Apexcharts" />
                    <Row>
                        <Col xl={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Basic Heatmap Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <div className="live-preview">
                                        <BasicHeatmap dataColors='["--vz-success", "--vz-card-custom"]'/>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xl={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Heatmap - Multiple Series</h4>
                                </Card.Header>

                                <Card.Body>
                                    <MultipleHeatmap dataColors='["--vz-primary", "--vz-secondary", "--vz-success", "--vz-info", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-primary", "--vz-card-custom"]'/>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>

                    <Row>
                        <Col xl={6}>
                            <Card>
                                <div className="card-header">
                                    <h4 className="card-title mb-0">Heatmap Color Range</h4>
                                </div>

                                <div className="card-body">
                                    <ColorRange dataColors='["--vz-info", "--vz-success", "--vz-primary", "--vz-warning"]'/>
                                </div>
                            </Card>
                        </Col>

                        <Col xl={6}>
                            <Card>
                                <div className="card-header">
                                    <h4 className="card-title mb-0">Heatmap - Range Without Shades</h4>
                                </div>

                                <div className="card-body">
                                <RangeWithoutShades dataColors='["--vz-info", "--vz-primary"]'/>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
HeatmapCharts.layout =(page:any) => <Layout children={page}/>
export default HeatmapCharts;