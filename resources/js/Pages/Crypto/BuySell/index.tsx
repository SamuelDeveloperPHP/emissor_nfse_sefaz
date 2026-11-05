import React from 'react';
import { Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import MarketGraph from './MarketGraph';
import Widgets from './Widgets';
import BuySellCoin from './BuySellCoin';
import Market from './Market';
import { Head } from '@inertiajs/react';
import Layout from '../../../Layouts';


const BuySell = () => {
    return (
        <React.Fragment>
            <Head title="Buy & Sell | Velzon - React Admin & Dashboard Template"/>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Buy & Sell" pageTitle="Crypto" />
                    <Row>
                        <Widgets />
                    </Row>
                    <Row>
                        <MarketGraph dataColors='["--vz-success", "--vz-danger"]' />
                        <BuySellCoin />
                    </Row>
                    <Market />
                </Container>
            </div>
        </React.Fragment>
    );
};
BuySell.layout =(page:any) => <Layout children={page}/>
export default BuySell;