import React from 'react';
import { Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import AllTasks from './AllTasks';
import Widgets from './Widgets';
import { Head } from '@inertiajs/react';
import Layout from '../../../Layouts';


const TaskList = () => {
   
    return (
        <React.Fragment>
            <Head title="Tasks List | Velzon - React Admin & Dashboard Template"/>
            <div className="page-content">
            
                <Container fluid>
                    <BreadCrumb title="Tasks List" pageTitle="Tasks" />
                    <Row>
                        <Widgets />
                    </Row>
                    <AllTasks />
                </Container>
            </div>
        </React.Fragment>
    );
};
TaskList.layout = (page:any) => <Layout children={page}/>
export default TaskList;