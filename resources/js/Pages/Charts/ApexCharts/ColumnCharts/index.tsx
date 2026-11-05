import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';

import {
    BasicColumn,
    ColumnWithLable,
    StackedColumn,
    StackedColumn2,
    ColumnMarker,
    RotateLable,
    NagetiveLable,
    RangeColumn,
    DynamicColumn,
    Quarter,
    DistributedColumn,
    ColumnGroupLabels,
    GroupStacked,
    DumbbellChartColors
} from "./ColumnCharts";
import { Head } from '@inertiajs/react';
import Layout from '../../../../Layouts';


const ColumnCharts = () => {
   
    return (
        <React.Fragment>
            <Head title='Column Charts | Velzon - React Admin & Dashboard Template' />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Column Charts" pageTitle="Apexcharts" />
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Basic Column Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <BasicColumn dataColors='["--vz-danger", "--vz-primary", "--vz-success"]' />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Column with Data Labels</h4>
                                </Card.Header>
                                <Card.Body>
                                    <ColumnWithLable dataColors='["--vz-success"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Stacked Column Charts</h4>
                                </Card.Header>
                                <Card.Body>
                                    <StackedColumn dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger"]' />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Stacked Column 100</h4>
                                </Card.Header>
                                <Card.Body>
                                    <StackedColumn2 dataColors='["--vz-primary", "--vz-success", "--vz-warning"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Grouped Stacked Columns</h4>
                                </Card.Header>
                                <Card.Body>
                                    <GroupStacked 
                                    dataColors='["--vz-success", "--vz-primary","--vz-secondary", "--vz-danger"]' />
                                </Card.Body>
                            </Card>
                        </Col><Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Dumbbell Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <DumbbellChartColors 
                                    dataColors='["--vz-success", "--vz-primary"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Column with Markers</h4>
                                </Card.Header>
                                <Card.Body>
                                    <ColumnMarker dataColors='["--vz-success", "--vz-primary"]' />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Column with Rotated Labels</h4>
                                </Card.Header>
                                <Card.Body>
                                    <RotateLable dataColors='["--vz-info"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Column with Nagetive Values</h4>
                                </Card.Header>
                                <Card.Body>
                                    <NagetiveLable dataColors='["--vz-success", "--vz-danger", "--vz-warning"]' />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Range Column Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <RangeColumn dataColors='["--vz-primary", "--vz-success"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Dynamic Loaded Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <div id="dynamicloadedchart-wrap" dir="ltr">
                                        <div id="chart-year" className="apex-charts">
                                            <DynamicColumn dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-info"]' />
                                        </div>
                                        <div id="chart-quarter" className="apex-charts">
                                            <Quarter />
                                            {/* dataColors='["--vz-primary"]'  */}
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Distributed Columns Chart</h4>
                                </Card.Header>
                                <Card.Body>
                                    <DistributedColumn dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-info"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={6}>
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">Column with Group Label</h4>
                                </Card.Header>
                                <Card.Body>
                                    <ColumnGroupLabels dataColors='["--vz-info"]' />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
ColumnCharts.layout = (page:any) => <Layout children={page}/>
export default ColumnCharts;