import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import {BasicTreemap,MultiTreemap,DiffColorTreemap,ColorRangeTreemap} from './TreemapCharts'
import { Head } from '@inertiajs/react';
import Layout from '../../../../Layouts';


const TreemapCharts = () => {
   
  return (
    <React.Fragment>
        <Head title="Treemap Charts | Velzon - React Admin & Dashboard Template"/>
            <div className="page-content">
                <Container fluid>                   
                        <BreadCrumb title="Treemap Charts" pageTitle="Apexcharts" />
                        <Row>
                            <Col xl={6}>
                                <Card>
                                    <Card.Header>
                                        <h4 className="card-title mb-0">Basic Treemap Charts</h4>
                                    </Card.Header>

                                    <Card.Body>
                                        <BasicTreemap dataColors='["--vz-success"]'/>
                                    </Card.Body>
                                </Card>
                            </Col>
                            

                            <Col xl={6}>
                                <Card>
                                    <Card.Header>
                                        <h4 className="card-title mb-0">Multi-Dimensional Treemap Chart</h4>
                                    </Card.Header>

                                    <Card.Body>
                                        <MultiTreemap dataColors='["--vz-primary","--vz-success"]'/>
                                    </Card.Body>
                                </Card>
                            </Col>                            
                        </Row>                       

                        <Row>
                            <Col xl={6}>
                                <Card>
                                    <Card.Header>
                                        <h4 className="card-title mb-0">Distributed Treemap Chart (Different Color for  each Cell)</h4>
                                    </Card.Header>

                                    <Card.Body>
                                        <DiffColorTreemap dataColors='["--vz-primary", "--vz-secondary", "--vz-success", "--vz-info","--vz-warning", "--vz-danger"]'/>
                                    </Card.Body>
                                </Card>
                            </Col>                            

                            <Col xl={6}>
                                <Card>
                                    <Card.Header>
                                        <h4 className="card-title mb-0">Treemap Chart with Color Ranges</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <ColorRangeTreemap dataColors='["--vz-info","--vz-danger"]'/>
                                    </Card.Body>
                                </Card>
                            </Col>                            
                        </Row>                     
                    </Container>
            </div>
        </React.Fragment>
  )
}
TreemapCharts.layout = (page:any) => <Layout children={page}/>
export default TreemapCharts