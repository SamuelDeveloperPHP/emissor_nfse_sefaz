import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import { SimpleRadar, MultipleRadar, PolygonRadar } from './RadarCharts';
import { Head } from '@inertiajs/react';
import Layout from '../../../../Layouts';


const RadarCharts = () => {
    
    return (
        <React.Fragment>
            <Head title='Radar Charts | Velzon - React Admin & Dashboard Template'/>
            <div className="page-content">
                <Container fluid>

                    <BreadCrumb title="Radar Charts" pageTitle="Apexcharts" />
                    <Row>
                        <Col xl={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Basic Radar Chart</h4>
                                </Card.Header>

                                <Card.Body>
                                    <SimpleRadar dataColors='["--vz-success"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Radar Chart - Multiple series</h4>
                                </Card.Header>
                                <Card.Body>
                                    <MultipleRadar dataColors='["--vz-danger", "--vz-success", "--vz-primary"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Radar Chart - Polygon Fill</h4>
                                </Card.Header>
                                <Card.Body>
                                    <PolygonRadar dataColors='["--vz-info"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}
RadarCharts.layout = (page:any) => <Layout children={page}/>
export default RadarCharts