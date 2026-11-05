import React from 'react';
import { Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Widgets from './Widgets';
import ICO from './ICO';
import { Head } from '@inertiajs/react';
import Layout from '../../../Layouts';

const ICOList = () => {
    return (
        <React.Fragment>
            <Head title="ICO LIST | Velzon - React Admin & Dashboard Template"/>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="ICO LIST" pageTitle="Crypto" />
                    <Row>
                        <Widgets />
                    </Row>
                    <ICO />
                </Container>
            </div>
        </React.Fragment>
    );
};
ICOList.layout = (page:any) => <Layout children={page}/>
export default ICOList;