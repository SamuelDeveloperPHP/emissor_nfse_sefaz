import React from 'react';
import { Container } from 'react-bootstrap';
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import BasicAction from "./BasicAction";
import SubscribeAction from "./SubscribeAction";
import EmailVerifyAction from "./EmailVerifyAction";
import PasswordChangeAction from "./PasswordChangeAction";
import { Head } from '@inertiajs/react';
import Layout from '../../../../Layouts';


const index = () => {
    
    return (
        <React.Fragment>
             <Head title = "Basic Action | Velzon - React Admin & Dashboard Template"/>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Basic Action" pageTitle="Basic Action" />
                    <BasicAction />
                    <SubscribeAction />
                    <EmailVerifyAction />
                    <PasswordChangeAction />
                </Container>
            </div>
        </React.Fragment>
    );
}
index.layout = (page:any) => <Layout children={page}/>
export default index;