import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Dropdown } from 'react-bootstrap';
import CountUp from "react-countup";
import Countdown from "react-countdown";
import { useSelector, useDispatch } from "react-redux";

// Import Chart
import {MarketplaceChart} from "./DashboardNFTCharts";
import { createSelector } from 'reselect';
import { Link } from '@inertiajs/react';
import { ongetMarketChartsDatas } from '../../slices/thunk';

const Marketplace = () => {
    const dispatch : any= useDispatch();

    const [chartData, setchartData] = useState<any>([]);

    const selectmarketData = createSelector(
        (state : any) => state.DashboardNFT,
        (marketplaceData: any) => marketplaceData.marketplaceData
    );
    // Inside your component
    const marketplaceData : any= useSelector(selectmarketData);

    useEffect(() => {
        setchartData(marketplaceData);
    }, [marketplaceData]);

    const onChangeChartPeriod = (pType : any) => {
        dispatch(ongetMarketChartsDatas(pType));
    };

    useEffect(() => {
        dispatch(ongetMarketChartsDatas("all"));
    }, [dispatch]);

    const renderer = ({ days, hours, minutes, seconds, completed } : any) => {
        if (completed) {
            // Render a completed state
            return <span>You are good to go!</span>;
        } else {
            return (
                <>
                    <div className="countdownlist">
                        <div className="countdownlist-item">
                            <div className="count-title">Days</div>
                            <div className="count-num">{days}</div></div>
                        <div className="countdownlist-item">
                            <div className="count-title">Hours</div>
                            <div className="count-num">{hours}</div></div>
                        <div className="countdownlist-item"><div className="count-title">Minutes</div>
                            <div className="count-num">{minutes}</div></div><div className="countdownlist-item">
                            <div className="count-title">Seconds</div>
                            <div className="count-num">{seconds}</div></div>
                    </div>
                </>
            );
        }
    };

    return (
        <React.Fragment>
            <Row>
                <Col xxl={12}>
                    <Card>
                        <Card.Body className="p-0">
                            <Row className="g-0">
                                <Col xxl={8}>
                                    <div className="">
                                        <Card.Header className="border-0 align-items-center d-flex">
                                            <h4 className="card-title mb-0 flex-grow-1">Marketplace</h4>
                                            <div className='d-flex gap-1'>
                                                <button type="button" className="btn btn-soft-secondary btn-sm" onClick={() => { onChangeChartPeriod("all"); }}>
                                                    ALL
                                                </button>
                                                <button type="button" className="btn btn-soft-secondary btn-sm" onClick={() => { onChangeChartPeriod("month"); }}>
                                                    1M
                                                </button>
                                                <button type="button" className="btn btn-soft-secondary btn-sm" onClick={() => { onChangeChartPeriod("halfyear"); }}>
                                                    6M
                                                </button>
                                                <button type="button" className="btn btn-soft-primary btn-sm" onClick={() => { onChangeChartPeriod("year"); }}>
                                                    1Y
                                                </button>
                                            </div>
                                        </Card.Header>
                                        <Row className="g-0 text-center">
                                            <Col sm={4} className="col-6">
                                                <div className="p-3 border border-dashed border-start-0">
                                                    <h5 className="mb-1">
                                                        <span className="counter-value" data-target="36.48">
                                                            <CountUp start={0} end={36.48} decimals={2} suffix={"k"} duration={4} />
                                                        </span>
                                                    </h5>
                                                    <p className="text-muted mb-0">Aetworks</p>
                                                </div>
                                            </Col>
                                            <Col sm={4} className="col-6">
                                                <div className="p-3 border border-dashed border-start-0">
                                                    <h5 className="mb-1">
                                                        <span className="counter-value" data-target="92.54">
                                                            <CountUp start={0} end={92.54} decimals={2} suffix={"k"} duration={4} />
                                                        </span>
                                                    </h5>
                                                    <p className="text-muted mb-0">Auction</p>
                                                </div>
                                            </Col>
                                            <Col sm={4} className="col-6">
                                                <div className="p-3 border border-dashed border-end-0">
                                                    <h5 className="mb-1">
                                                        <span className="counter-value" data-target="8.62">
                                                            <CountUp start={0} end={8.62} decimals={2} suffix={"k"} duration={4} />
                                                        </span>
                                                    </h5>
                                                    <p className="text-muted mb-0">Creators</p>
                                                </div>
                                            </Col>
                                        </Row>
                                        <MarketplaceChart series={chartData} dataColors='["--vz-primary","--vz-success", "--vz-gray-300"]' />
                                    </div>
                                </Col>

                                <Col xxl={4}>
                                    <div className="border-start p-4 h-100 d-flex flex-column">

                                        <div className="w-100">
                                            <div className="d-flex align-items-center">
                                                <img src={"https://img.themesbrand.com/velzon/images/img-2.gif"} className="img-fluid avatar-xs rounded-circle object-fit-cover" alt="" />
                                                <div className="ms-3 flex-grow-1">
                                                    <h5 className="fs-16 mb-1">Trendy Fashion Portraits</h5>
                                                    <p className="text-muted mb-0">Artwork</p>
                                                </div>

                                                 <Dropdown>
                                                    <Dropdown.Toggle as="a" className="align-middle text-muted arrow-none" role="button">
                                                        <i className="ri-share-line fs-18"></i>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="dropdown-menu-end">
                                                        <Dropdown.Item href="#"><i className="ri-twitter-fill text-primary align-bottom me-1"></i> Twitter</Dropdown.Item>
                                                        <Dropdown.Item href="#"><i className="ri-facebook-circle-fill text-info align-bottom me-1"></i> Facebook</Dropdown.Item>
                                                        <Dropdown.Item href="#"><i className="ri-google-fill text-danger align-bottom me-1"></i> Google</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>

                                            </div>

                                            <h3 className="ff-secondary fw-bold mt-4"><i className="mdi mdi-ethereum text-primary"></i> 346.12 ETH</h3>
                                            <p className="text-success mb-3">+586.85 (40.6%)</p>

                                            <p className="text-muted">NFT art is a digital asset that is collectable, unique, and non-transferrable, Cortes explained Every NFT is unique duplicated.</p>

                                            <div className="d-flex align-items-end justify-content-between mt-4">
                                                <div>
                                                    <p className="fs-14 text-muted mb-1">Current Bid</p>
                                                    <h4 className="fs-20 ff-secondary fw-semibold mb-0">342.74 ETH</h4>
                                                </div>

                                                <div>
                                                    <p className="fs-14 text-muted mb-1">Highest Bid</p>
                                                    <h4 className="fs-20 ff-secondary fw-semibold mb-0">346.67 ETH</h4>
                                                </div>
                                            </div>

                                            <div className="dash-countdown mt-4 pt-1">
                                                <Countdown date="2025/01/01" renderer={renderer} />
                                            </div>

                                            <Row className="mt-4 pt-2">
                                                <Col>
                                                    <Link href="/apps-nft-item-details" className="btn btn-primary w-100">View Details</Link>
                                                </Col>
                                                <Col>
                                                    <button className="btn btn-info w-100">Bid Now</button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Marketplace;