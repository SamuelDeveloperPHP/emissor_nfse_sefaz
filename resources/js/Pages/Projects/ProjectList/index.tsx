import React from 'react';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Container } from 'react-bootstrap';

import List from './List';
import { Head } from '@inertiajs/react';
import Layout from '../../../Layouts';

const ProjectList = () => {
    return (
        <React.Fragment>
            <Head title = "Project List | Velzon - React Admin & Dashboard Template"/>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Project List" pageTitle="Projects" />
                    <List />
                </Container>
            </div>
        </React.Fragment>
    );
};
ProjectList.layout =(page:any) => <Layout children={page}/>
export default ProjectList;