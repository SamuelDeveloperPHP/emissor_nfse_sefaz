import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import { SimplePie, SimpleDonut, UpdateDonut, MonochromePie, GradientDonut, PatternedDonut, ImagePieChart } from './PieCharts'
import { Head } from '@inertiajs/react';
import Layout from '../../../../Layouts';


const PieCharts = () => {
    
    return (
        <React.Fragment>
            <Head title='Pie Charts | Velzon - React Admin & Dashboard Template'/>
        <div className="page-content">
            <Container fluid>
                <BreadCrumb title="Pie Charts" pageTitle="Apexcharts" />
                <Row>
                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <h4 className="card-title mb-0">Simple Pie Chart</h4>
                            </Card.Header>

                            <Card.Body>
                                <SimplePie dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]' />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <h4 className="card-title mb-0">Simple Donut Chart</h4>
                            </Card.Header>
                            <Card.Body>
                                <SimpleDonut dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]' />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="row">
                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <h4 className="card-title mb-0">Updating Donut Chart</h4>
                            </Card.Header>
                            <Card.Body>
                                <div>
                                    <UpdateDonut dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]' />
                                    <div className="d-flex align-items-start flex-wrap gap-2 justify-content-center mt-4">
                                        <button id="add" className="btn btn-light btn-sm">
                                            + ADD
                                        </button>

                                        <button id="remove" className="btn btn-light btn-sm">
                                            - REMOVE
                                        </button>

                                        <button id="randomize" className="btn btn-light btn-sm">
                                            RANDOMIZE
                                        </button>

                                        <button id="reset" className="btn btn-light btn-sm">
                                            RESET
                                        </button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <h4 className="card-title mb-0">Monochrome Pie Chart</h4>
                            </Card.Header>

                            <Card.Body>
                                <MonochromePie />
                                {/* // dataColors='["--vz-primary"]'  */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <h4 className="card-title mb-0">Gradient Donut Chart</h4>
                            </Card.Header>

                            <Card.Body>
                                <GradientDonut dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]' />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <h4 className="card-title mb-0">Patterned Donut Chart</h4>
                            </Card.Header>
                            <Card.Body>
                                <PatternedDonut dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]' />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <h4 className="card-title mb-0">Pie Chart with Image Fill</h4>
                            </Card.Header>

                            <Card.Body>
                                <ImagePieChart dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-info"]' />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </div>
        </React.Fragment>
    )
}
PieCharts.layout = (page:any) => <Layout children={page}/>
export default PieCharts