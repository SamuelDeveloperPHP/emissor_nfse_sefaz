import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import AllOrders from './AllOrders';

import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';
import { Head } from '@inertiajs/react';
import { ongetOrderList } from '../../../slices/thunk';
import Layout from '../../../Layouts';


const CryproOrder = () => {
    const dispatch:any = useDispatch();

    const cryptoorderData = createSelector(
        (state:any) => state.Crypto,
        (orderList:any) => orderList.orderList
      );
    // Inside your component
    const orderList = useSelector(cryptoorderData);

    useEffect(() => {
        dispatch(ongetOrderList());
    }, [dispatch]);

    return (
        <React.Fragment>
            <Head title = "Orders | Velzon - React Admin & Dashboard Template"/>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Orders" pageTitle="Crypto" />
                    <Row>
                        <AllOrders orderList={orderList} />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
CryproOrder.layout = (page:any) => <Layout children={page}/>
export default CryproOrder;