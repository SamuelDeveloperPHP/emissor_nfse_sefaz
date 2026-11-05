import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

import Layout from "../../Layouts";
import { Head } from "@inertiajs/react";

import Widgets from "./Widgets";
import Marketplace from "./Marketplace";
import Popularity from "./Popularity";
import FeaturedNFT from "./FeaturedNFT";
import RecentNFTs from "./RecentNFTs";

const DashboardNFT = () => {
    return (
        <React.Fragment>
             <Head title = "NFT Dashboard | Velzon - React Admin & Dashboard Template"/>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="NFT Dashboard" pageTitle="Dashboard" />
                    <Row className="dash-nft">
                        <Col xxl={9}>
                            <Widgets />
                            <Marketplace />
                        </Col>
                        <Popularity />
                    </Row>
                    <FeaturedNFT />
                    <RecentNFTs />
                </Container>
            </div>
        </React.Fragment>
    );
};
DashboardNFT.layout = (page:any) => <Layout children={page}/>
export default DashboardNFT;
