import React from 'react';
import { Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import BalanceOverview from './BalanceOverview';
import ClosingDeals from './ClosingDeals';
import DealsStatus from './DealsStatus';
import DealType from './DealType';
import MyTasks from './MyTasks';
import SalesForecast from './SalesForecast';
import UpcomingActivities from './UpcomingActivities';
import Widgets from './Widgets';
import { Head } from '@inertiajs/react';
import Layout from '../../Layouts';


const DashboardCrm = () => {
    return (
        <React.Fragment>
             <Head title="CRM | Velzon - React Admin & Dashboard Template"/>
            <div className="page-content">
                <Container fluid>  
                    <BreadCrumb title="CRM" pageTitle="Dashboards" />
                    <Row>
                        <Widgets />
                    </Row>
                    <Row>
                        <SalesForecast />
                        <DealType />
                        <BalanceOverview />
                    </Row>
                    <Row>
                        <DealsStatus />
                        <MyTasks />
                    </Row>
                    <Row>
                        <UpcomingActivities />
                        <ClosingDeals />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
DashboardCrm.layout =(page:any) => <Layout children={page}/>
export default DashboardCrm;