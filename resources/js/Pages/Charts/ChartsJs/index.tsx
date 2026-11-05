import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { LineChart, BarChart, PieChart, DonutChart, PolarChart, RadarChart } from './ChartsJs';
import { Head } from '@inertiajs/react';
import Layout from '../../../Layouts';


const ChartsJs = () => {

    return (
        <React.Fragment>
            <Head title='Charts Js| Velzon - React Admin & Dashboard Template' />

            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Charts Js" pageTitle="Charts" />
                    <Row>
                        <Col xl={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Line Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <LineChart dataColors='["--vz-primary-rgb, 0.2", "--vz-primary", "--vz-success-rgb, 0.2", "--vz-success"]' />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xl={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Bar Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <BarChart dataColors='["--vz-primary-rgb, 0.8", "--vz-primary-rgb, 0.9"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Pie Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <PieChart dataColors='["--vz-success", "--vz-light"]' />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xl={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Donut Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <DonutChart dataColors='["--vz-primary", "--vz-light"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Polar Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <PolarChart dataColors='["--vz-danger", "--vz-success", "--vz-warning", "--vz-primary"]' />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xl={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Radar Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <RadarChart dataColors='["--vz-success-rgb, 0.2", "--vz-success", "--vz-primary-rgb, 0.2", "--vz-primary"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                </Container>

            </div>
        </React.Fragment>
    )
}
ChartsJs.layout = (page:any) => <Layout children={page}/>
export default ChartsJs