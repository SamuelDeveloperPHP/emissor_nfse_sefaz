import React from 'react';
import { Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Widgets from './Widgets';
import TicketsData from './TicketsData';
import { Head } from '@inertiajs/react';
import Layout from '../../../Layouts';


const ListView = () => {
    return (
        <React.Fragment>
            <Head title="Tickets List | Velzon - React Admin & Dashboard Template"/>
            <div className="page-content">
                <Container fluid>                    
                    <BreadCrumb title="Tickets List" pageTitle="Tickets" />
                    <Row>
                        <Widgets />
                    </Row>
                    <TicketsData />
                </Container>
            </div>
        </React.Fragment>
    );
};
ListView.layout = (page:any) => <Layout children={page}/>
export default ListView;