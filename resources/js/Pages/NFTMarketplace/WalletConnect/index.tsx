import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

// Import Images
import metaMask from "../../../../images/nft/wallet/metamask.png";

import { walletConnectData } from "../../../common/data/index";
import { Head, Link } from "@inertiajs/react";
import Layout from "../../../Layouts";

const WalletConnect = () => {
    return (
        <React.Fragment>
            <Head title = "Wallet Connect | Velzon - React Admin & Dashboard Template"/>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Wallet Connect" pageTitle="NFT Marketplace" />
                    <Row className="justify-content-center">
                        <Col xl={5}>
                            <div className="text-center mb-4">
                                <h4>Your current wallet</h4>
                                <p className="text-muted fs-13">WalletConnect is a convenient open source tool that enables a mobile wallet to easily connect to decentralized web applications, and interact with them from your phone.</p>
                            </div>
                        </Col>
                    </Row>

                    <Row className="justify-content-center mb-4">
                        <Col lg={3}>
                            <Card className="text-center">
                                <Card.Body className="py-5 px-4">
                                    <img src={metaMask} alt="" height="55" className="mb-3 pb-2" />
                                    <h5>Metamask</h5>
                                    <p className="text-muted pb-1">MetaMask is a software cryptocurrency wallet used to interact with the Ethereum blockchain.</p>
                                    <Link href="#" className="btn btn-danger">Change Wallet</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col xl={5}>
                            <div className="text-center mb-4">
                                <h4>Connect with one of our other available wallet providers.</h4>
                            </div>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        {walletConnectData.map((item, key) => (
                            <Col key={key} lg={3}>
                                <Card className="text-center">
                                    <Card.Body className="py-5 px-4">
                                        <img src={item.img} alt="" height="55" className="mb-3 pb-2" />
                                        <h5>{item.title}</h5>
                                        <p className="text-muted pb-1">{item.textContent}</p>
                                        <Link href="#" className="btn btn-soft-info">Connect Wallet</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
WalletConnect.layout = (page:any) => <Layout children={page}/>
export default WalletConnect;