import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import user from "../../../../../images/users/avatar-2.jpg";

import {
    BasicAreaCharts,
    SplineAreaChart,
    AxisChart,
    NegativeAreaChart,
    GithubStyleCharts,
    GithubStyleCharts1,
    StackedAreaChart,
    IrregularAreaCharts,
    AreaNullValueChart
} from "./AreaCharts";
import { Head, Link } from '@inertiajs/react';
import Layout from '../../../../Layouts';


const AreaCharts = () => {
    
    return (
        <React.Fragment>
            <Head title='Area Charts | Velzon - React Admin & Dashboard Template' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Area Charts" pageTitle="Apexcharts" />
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Basic Area Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <BasicAreaCharts dataColors='["--vz-success"]' />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Spline Area Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <SplineAreaChart dataColors='["--vz-primary", "--vz-success"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Area Chart - Datetime X - Axis Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <div>
                                        <div className="toolbar d-flex align-items-start justify-content-center flex-wrap gap-2">
                                            <button type="button" className="btn btn-soft-primary timeline-btn btn-sm" id="one_month">
                                                1M
                                            </button>
                                            <button type="button" className="btn btn-soft-primary timeline-btn btn-sm" id="six_months">
                                                6M
                                            </button>
                                            <button type="button" className="btn btn-soft-primary timeline-btn btn-sm active" id="one_year">
                                                1Y
                                            </button>
                                            <button type="button" className="btn btn-soft-primary timeline-btn btn-sm" id="all">
                                                ALL
                                            </button>
                                        </div>
                                        <AxisChart dataColors='["--vz-info"]'/>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Area with Negative Values Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <NegativeAreaChart dataColors='["--vz-success", "--vz-info"]'/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Area Chart - Github Style</h4>
                                </Card.Header>
                                <Card.Body>
                                    <div>
                                        <div className="bg-light">
                                            <GithubStyleCharts dataColors='["--vz-danger"]'/>
                                        </div>

                                        <div className="github-style d-flex align-items-center my-2">
                                            <div className="flex-shrink-0 me-2">
                                                <img className="avatar-sm rounded" src={user} data-hovercard-user-id="634573" alt="" />
                                            </div>
                                            <div className="flex-grow-1">
                                                <Link href="#" className="font-size-14 text-body fw-medium">coder</Link>
                                                <div className="cmeta text-muted font-size-11">
                                                    <span className="commits text-body fw-medium"></span> commits
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-light">
                                            <GithubStyleCharts1 dataColors='["--vz-success"]'/>
                                        </div>

                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Stacked Area Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <StackedAreaChart dataColors='["--vz-success", "--vz-info", "--vz-light"]'/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Irregular Timeseries Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <IrregularAreaCharts dataColors='["--vz-primary", "--vz-warning", "--vz-success"]'/>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Area Chart With Null Values Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <AreaNullValueChart dataColors='["--vz-success"]'/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div>
        </React.Fragment>
    );
};
AreaCharts.layout = (page:any) => <Layout children={page}/>
export default AreaCharts;