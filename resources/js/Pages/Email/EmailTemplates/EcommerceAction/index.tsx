import React from 'react';
import { Container } from 'react-bootstrap';
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import InvoiceAction from "./InvoiceAction";
import FeedbackAction from "./FeedbackAction";
import RatingTemplate from "./RatingTemplate";
import { Head } from '@inertiajs/react';
import Layout from '../../../../Layouts';

const index = () => {
   
    return (
        <React.Fragment>
              <Head title = "Invoice Action | Velzon - React Admin & Dashboard Template"/>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Ecommerce Action" pageTitle="Email" />
                    <InvoiceAction />
                    <FeedbackAction />
                    <RatingTemplate />
                </Container>
            </div>
        </React.Fragment>
    );
}
index.layout = (page:any) => <Layout children={page}/>
export default index;