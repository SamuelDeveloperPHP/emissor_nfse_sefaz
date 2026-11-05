import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Head } from '@inertiajs/react';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Layout from '../../../Layouts';

const Starter = () => {

  return (
    <React.Fragment>
      <Head title='Starter | Velzon - React Admin & Dashboard Template'/>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Starter" pageTitle="Pages" />
          <Row>
            <Col xs={12}>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
Starter.layout = (page:any) => <Layout children={page} />
export default Starter;