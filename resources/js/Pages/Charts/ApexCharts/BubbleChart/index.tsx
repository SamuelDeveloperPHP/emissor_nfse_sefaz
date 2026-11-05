import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import {
    Simple,
    ThreeDBubble
} from './BubbleChart';
import { Head } from '@inertiajs/react';
import Layout from '../../../../Layouts';


const BubbleChart = () => {
    
    return (
        <React.Fragment> 
            <Head title='Bubble Charts | Velzon - React Admin & Dashboard Template'/>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Bubble Charts" pageTitle="Apexcharts" />
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Basic Candlestick Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Simple dataColors='["--vz-primary", "--vz-info", "--vz-warning", "--vz-success"]'/>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">3D Bubble Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <ThreeDBubble dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger"]'/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
BubbleChart.layout = (page:any) => <Layout children={page}/>
export default BubbleChart;