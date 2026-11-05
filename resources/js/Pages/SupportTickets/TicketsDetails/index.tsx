import React from 'react';
import { Container, Row } from 'react-bootstrap';

import Section from './Section';
import TicketDescription from './TicketDescription';
import TicketDetails from './TicketDetails';
import { Head } from '@inertiajs/react';
import Layout from '../../../Layouts';


const TicketsDetails = () => {
    return (
        <React.Fragment>
            <Head title="Ticket Details | Velzon - React Admin & Dashboard Template"/>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Section />
                    </Row>
                    <Row>
                        <TicketDescription />
                        <TicketDetails />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
TicketsDetails.layout = (page:any) => <Layout children={page}/>
export default TicketsDetails;