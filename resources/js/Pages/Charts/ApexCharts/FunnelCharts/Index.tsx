import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import { FunnelChartCode, PyramidChartCode } from './Funnellchart';
import { Head } from '@inertiajs/react';
import Layout from '../../../../Layouts';

const FunnelChart = () => {
    
    return (
        <React.Fragment>
            <Head title='Apex Funnel Charts | Velzon - React Admin & Dashboard Template' />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Funnel Charts" pageTitle="Apexcharts" />
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Funnel Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <FunnelChartCode dataColors='["--vz-success"]' />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Pyramid</h4>
                                </Card.Header>
                                <Card.Body>
                                    <PyramidChartCode dataColors='["--vz-info", "--vz-danger", "--vz-primary", "--vz-secondary", "--vz-success", "--vz-dark", "--vz-warning"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}
FunnelChart.layout = (page:any) => <Layout children={page}/>
export default FunnelChart