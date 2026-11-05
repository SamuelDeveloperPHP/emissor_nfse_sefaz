import React from 'react';
import { Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import KYC from './KYCVerification';
import { Head } from '@inertiajs/react';
import Layout from '../../../Layouts';

const KYCVerification = () => {
    return (
        <React.Fragment>
            <Head title ="KYC  Application | Velzon - React Admin & Dashboard Template"/>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="KYC Application" pageTitle="Crypto" />
                    <Row>
                        <KYC />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
KYCVerification.layout = (page:any) => <Layout children={page}/>
export default KYCVerification;