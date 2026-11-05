import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import { RangeAreaBasicChartCode, RangeAreaChartCode } from './RangeChart';
import { Head } from '@inertiajs/react';
import Layout from '../../../../Layouts';

const RangeArea = () => {
  
  return (
      <React.Fragment>
        <Head title='Apex Range Area Charts | Velzon - React Admin & Dashboard Template'/>
          <div className="page-content">

              <Container fluid>
                  <BreadCrumb title="Range Area Charts" pageTitle="Apexcharts" />
                  <Row>
                      <Col lg={6}>
                          <Card>
                              <Card.Header>
                                  <h4 className="card-title mb-0">Basic Range Area Chart</h4>
                              </Card.Header>
                              <Card.Body>
                                  <RangeAreaChartCode dataColors='["--vz-primary"]' />
                              </Card.Body>
                          </Card>
                      </Col>

                      <Col lg={6}>
                          <Card>
                              <Card.Header>
                                  <h4 className="card-title mb-0">Combo</h4>
                              </Card.Header>
                              <Card.Body>
                                  <RangeAreaBasicChartCode 
                                  />
                                     {/* dataColors='["--vz-info", "--vz-danger"]'  */}
                              </Card.Body>
                          </Card>
                      </Col>
                  </Row>
              </Container>
          </div>
      </React.Fragment>
  )
}
RangeArea.layout = (page:any) => <Layout children={page}/>
export default RangeArea