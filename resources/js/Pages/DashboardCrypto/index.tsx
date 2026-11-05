import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import MarketGraph from './MarketGraph';
import MyCurrencies from './MyCurrencies';
import MyPortfolio from './MyPortfolio';
import NewsFeed from './NewsFeed';
import RecentActivity from './RecentActivity';
import TopPerformers from './TopPerformers';
import Trading from './Trading';
import Widgets from './Widgets';
import Widgets1 from './Widgets1';
import { Head } from '@inertiajs/react';
import Layout from '../../Layouts';


const DashboardCrypto = () => {
    return (
        <React.Fragment>
             <Head title="Crypto Dashboard | Velzon - React Admin & Dashboard Template"/>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Crypto" pageTitle="Dashboards" />
                    <Row>
                        <MyPortfolio />
                        <Col className="col-xxl-9 order-xxl-0 order-first">
                            <Row>
                                <Widgets />
                            </Row>
                                <MarketGraph />
                        </Col>
                    </Row>
                    <Row>
                        <Widgets1 />
                    </Row>
                    <Row>
                        <MyCurrencies />
                        <Trading />
                    </Row>
                    <Row>
                        <RecentActivity />
                        <TopPerformers />
                        <NewsFeed />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
DashboardCrypto.layout = (page:any) => <Layout children={page}/>
export default DashboardCrypto;