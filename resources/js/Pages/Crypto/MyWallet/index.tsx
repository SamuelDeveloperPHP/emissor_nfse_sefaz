import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Watchlist from './Watchlist';
import PortfolioStatistics from './PortfolioStatistics';
import MarketStatus from './MarketStatus';
import Widgets from './Widgets';
import RecentTransaction from './RecentTransaction';
import { Head } from '@inertiajs/react';
import Layout from '../../../Layouts';


const MyWallet = () => {
    return (
        <React.Fragment>
            <Head title="My Wallet | Velzon - React Admin & Dashboard Template"/>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="My Wallet" pageTitle="Crypto" />
                    <Row>
                        <Col xxl={9}>
                            <PortfolioStatistics dataColors='["--vz-info"]' />
                            <Watchlist />
                            <MarketStatus />
                        </Col>
                        <Col xxl={3}>
                            <Widgets />
                            <RecentTransaction />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
MyWallet.layout = (page:any) => <Layout children={page}/>
export default MyWallet;
