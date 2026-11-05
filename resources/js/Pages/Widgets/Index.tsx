import React from 'react';
import { Container } from 'react-bootstrap';

// import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';

import TileBoxs from './TileBoxs';
import OtherWidgets from './OtherWidgets';
import UpcomingActivity from './UpcomingActivities';
import ChartMapWidgets from './Chart&MapWidgets';
import EcommerceWidgets from './EcommerceWidgets';
import CreditCard from './CreditCard';
import Layout from '../../Layouts';
import { Head } from '@inertiajs/react';

const Widgets = () => {

    return (
        <React.Fragment>
                <Head title='Widgets | Velzon - React Admin & Dashboard Template' />
                <div className="page-content">
                    <Container fluid>
                        <BreadCrumb title="Widgets" pageTitle="Velzon" />
                        {/* Tile Boxs Widgets */}
                        <TileBoxs />

                        {/* Other Widgets */}
                        <OtherWidgets />

                        {/* Upcoming Activity */}
                        <UpcomingActivity />

                        {/* Chart & Map Widgets */}
                        <ChartMapWidgets />

                        {/* Chart & EcommerceWidgets  */}
                        <EcommerceWidgets />

                        {/* CreditCard */}
                        <CreditCard />

                    </Container>
                </div>
        </React.Fragment>
    );
};
Widgets.layout = (page:any) => <Layout children={page}/>
export default Widgets;
