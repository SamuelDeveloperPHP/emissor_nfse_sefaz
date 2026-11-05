import React from 'react';
import { Container } from 'react-bootstrap';
import Section from './Section';
import { Head } from '@inertiajs/react';
import Layout from '../../../Layouts';


const ProjectOverview = () => {
    return (
        <React.Fragment>
            <Head title="Project Overview | Velzon - React Admin & Dashboard Template"/>
            <div className="page-content">
                <Container fluid>                    
                <Section />
                </Container>
            </div>
        </React.Fragment>
    );
};
ProjectOverview.layout =(page:any) => <Layout children={page}/>
export default ProjectOverview;