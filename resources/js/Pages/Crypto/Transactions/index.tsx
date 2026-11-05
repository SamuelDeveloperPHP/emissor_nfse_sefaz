import React from 'react';
import { Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import AllTransactions from './AllTransactions';
import Widgets from './Widgets';
import { Head } from '@inertiajs/react';
import Layout from '../../../Layouts';


const Transactions = () => {
    return (
        <React.Fragment>
            <Head title="Transactions | Velzon - React Admin & Dashboard Template"/>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Transactions" pageTitle="Crypto" />
                    <Row>
                        <Widgets />
                    </Row>
                    <AllTransactions />
                </Container>
            </div>
        </React.Fragment>
    );
};
Transactions.layout = (page:any) => <Layout  children={page}/>
export default Transactions;