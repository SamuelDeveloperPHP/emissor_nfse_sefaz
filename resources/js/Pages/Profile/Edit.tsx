import React from 'react';
import Layout from '../../Layouts';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { Col, Container } from 'react-bootstrap';

export default function Edit({ auth, mustVerifyEmail, status }: any) {
    return (
        <React.Fragment>
            <Layout
            >
                <Head title="Profile | Velzon - React Admin & Dashboard Template" />
                <div className='page-content'>
                    <Container fluid>
                        <Col>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </Col>
                        <Col>
                            <UpdatePasswordForm className="max-w-xl" />
                        </Col>
                        <Col>
                            <DeleteUserForm className="max-w-xl" />
                        </Col>
                    </Container>
                </div>
            </Layout>
        </React.Fragment >
    );
}