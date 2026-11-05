import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';

import {
    Basic,
    ComboCandlestick,
    ComboCandlestick1,
    Category,
    CandlestickLine
} from "./CandlestickChart";
import { Head } from '@inertiajs/react';
import Layout from '../../../../Layouts';


const CandlestickChart = () => {
   
    return (
        <React.Fragment>
            <Head title='Candlestick Charts | Velzon - React Admin & Dashboard Template'/>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Candlestick Charts" pageTitle="Apexcharts" />
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Basic Candlestick Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Basic dataColors='["--vz-success", "--vz-danger"]' />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Candlestick Synced with Brush Chart (Combo)</h4>
                                </Card.Header>
                                <Card.Body>
                                    <div>
                                        <div id="combo_candlestick">
                                            <ComboCandlestick dataColors='["--vz-info", "--vz-danger"]' />
                                        </div>
                                        <div id="combo_candlestick_chart">
                                            <ComboCandlestick1 dataColors='["--vz-warning", "--vz-danger"]' />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Category X-Axis</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Category dataColors='["--vz-success", "--vz-danger"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Candlestick with line</h4>
                                </Card.Header>

                                <Card.Body>
                                    <CandlestickLine dataColors='["--vz-success", "--vz-danger", "--vz-info", "--vz-warning"]'/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
CandlestickChart.layout = (page:any) => <Layout children={page}/>
export default CandlestickChart;