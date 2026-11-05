import React from 'react';
import { Container } from 'react-bootstrap';
import EmailToolbar from './EmailToolbar';
import { Head } from '@inertiajs/react';
import Layout from '../../Layouts';

const MailInbox = () => {
    return (
        <React.Fragment>
             <Head title = "Mailbox | Velzon - React Admin & Dashboard Template"/>
            <div className="page-content">
                <Container fluid>
                    <div className="email-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
                        <EmailToolbar />
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};
MailInbox.layout = (page:any) => <Layout children={page}/>
export default MailInbox;