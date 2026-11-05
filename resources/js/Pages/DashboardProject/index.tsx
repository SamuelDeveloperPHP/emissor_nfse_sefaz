import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import ActiveProjects from './ActiveProjects';
import Chat from './Chat';
import MyTasks from './MyTasks';
import ProjectsOverview from './ProjectsOverview';
import ProjectsStatus from './ProjectsStatus';
import TeamMembers from './TeamMembers';
import UpcomingSchedules from './UpcomingSchedules';
import Widgets from './Widgets';
import { Head } from '@inertiajs/react';
import Layout from '../../Layouts';


const DashboardProject = () => {
    return (
        <React.Fragment>
              <Head title="Projects | Velzon - React Admin & Dashboard Template"/>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Projects" pageTitle="Dashboards" />
                    <Row className="project-wrapper">
                        <Col xxl={8}>
                            <Widgets />
                            <ProjectsOverview />
                        </Col>
                        <UpcomingSchedules />
                    </Row>
                    <Row>
                        <ActiveProjects />
                        <MyTasks />
                    </Row>
                    <Row>
                        <TeamMembers />
                        <Chat />
                        <ProjectsStatus />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
DashboardProject.layout = (page:any) => <Layout children={page}/>
export default DashboardProject;