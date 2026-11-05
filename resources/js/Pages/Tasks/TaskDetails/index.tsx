import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Comments from './Comments';
import Summary from './Summary';
import TimeTracking from "./TimeTracking";
import { Head } from '@inertiajs/react';
import Layout from '../../../Layouts';


const TaskDetails = () => {
    return (
        <React.Fragment>
            <Head title="Tasks Details | Velzon - React Admin & Dashboard Template"/>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Tasks Details" pageTitle="Tasks" />
                    <Row>
                        <Col xxl={3}>
                            <TimeTracking />
                        </Col>
                        <Col xxl={9}>
                            <Summary />
                            <Comments />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
TaskDetails.layout = (page:any) => <Layout children={page}/>
export default TaskDetails;