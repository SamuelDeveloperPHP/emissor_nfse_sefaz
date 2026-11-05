import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import { BasicPolar, PolarMonochrome } from './PolarCharts'
import { Head } from '@inertiajs/react';
import Layout from '../../../../Layouts';


const Polarcharts = () => {
    return (
        <React.Fragment>
            <Head title='Polar Charts | Velzon - React Admin & Dashboard Template'/>
            <div className="page-content">
                <Container fluid>

                    <BreadCrumb title="Polar Charts" pageTitle="Apexcharts" />
                    <Row>
                        <Col xl={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Basic Polararea Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <BasicPolar dataColors='["--vz-primary", "--vz-success", "--vz-warning","--vz-danger", "--vz-info", "--vz-success", "--vz-primary", "--vz-dark", "--vz-secondary"]' />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xl={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">PolarArea Monochrome</h4>
                                </Card.Header>
                                <Card.Body>
                                    <PolarMonochrome />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}
Polarcharts.layout =(page:any) => <Layout children={page}/>
export default Polarcharts