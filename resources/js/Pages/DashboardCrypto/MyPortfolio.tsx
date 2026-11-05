import React, { useState, useEffect } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";

//import Images
import btc from "../../../images/svg/crypto-icons/btc.svg";
import eth from "../../../images/svg/crypto-icons/eth.svg";
import ltc from "../../../images/svg/crypto-icons/ltc.svg";
import dash from "../../../images/svg/crypto-icons/dash.svg";

import { PortfolioCharts } from './DashboardCryptoCharts';
import { createSelector } from 'reselect';
import { ongetPortfolioChartsData } from '../../slices/dashboardCrypto/thunk';

const MyPortfolio = () => {
    const dispatch: any = useDispatch();

    const [chartData, setchartData] = useState<any>([]);

    const selectDashboardData = createSelector(
        (state: any) => state.DashboardCrypto,
        (portfolioData: any) => portfolioData.portfolioData
    );
    // Inside your component
    const portfolioData: any = useSelector(selectDashboardData);


    useEffect(() => {
        setchartData(portfolioData);
    }, [portfolioData]);

    const [seletedMonth, setSeletedMonth] = useState<any>("Btc");
    const onChangeChartPeriod = (pType: any) => {
        setSeletedMonth(pType);
        dispatch(ongetPortfolioChartsData(pType));
    };

    useEffect(() => {
        dispatch(ongetPortfolioChartsData("btc"));
    }, [dispatch]);

    return (
        <React.Fragment>
            <div className="col-xxl-3">
                <Card className="card-height-100">
                    <Card.Header className="border-0 align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">My Portfolio</h4>
                        <div>
                            <Dropdown >
                                <Dropdown.Toggle as="button" className="btn btn-soft-primary btn-sm arrow-none" >
                                    <span className="text-uppercase">
                                        {seletedMonth}
                                        <i className="mdi mdi-chevron-down align-middle ms-1"></i></span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
                                    <Dropdown.Item
                                        onClick={() => { onChangeChartPeriod("btc"); }} className={seletedMonth === "Btc" ? "active" : ""}
                                    >BTC</Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => { onChangeChartPeriod("usd"); }} className={seletedMonth === "usd" ? "active" : ""}
                                    >USD</Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => { onChangeChartPeriod("euro"); }} className={seletedMonth === "euro" ? "active" : ""}
                                    >Euro</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <PortfolioCharts series={chartData} dataColors='["--vz-primary", "--vz-info", "--vz-warning", "--vz-success"]' />

                        <ul className="list-group list-group-flush border-dashed mb-0 mt-3 pt-2">
                            <li className="list-group-item px-0">
                                <div className="d-flex">
                                    <div className="flex-shrink-0 avatar-xs">
                                        <span className="avatar-title bg-light p-1 rounded-circle">
                                            <img src={btc} className="img-fluid" alt="" />
                                        </span>
                                    </div>
                                    <div className="flex-grow-1 ms-2">
                                        <h6 className="mb-1">Bitcoin</h6>
                                        <p className="fs-12 mb-0 text-muted"><i className="mdi mdi-circle fs-10 align-middle text-primary me-1"></i>BTC</p>
                                    </div>
                                    <div className="flex-shrink-0 text-end">
                                        <h6 className="mb-1">BTC 0.00584875</h6>
                                        <p className="text-success fs-12 mb-0">${chartData[0]}.12</p>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item px-0">
                                <div className="d-flex">
                                    <div className="flex-shrink-0 avatar-xs">
                                        <span className="avatar-title bg-light p-1 rounded-circle">
                                            <img src={eth} className="img-fluid" alt="" />
                                        </span>
                                    </div>
                                    <div className="flex-grow-1 ms-2">
                                        <h6 className="mb-1">Ethereum</h6>
                                        <p className="fs-12 mb-0 text-muted"><i className="mdi mdi-circle fs-10 align-middle text-info me-1"></i>ETH</p>
                                    </div>
                                    <div className="flex-shrink-0 text-end">
                                        <h6 className="mb-1">ETH 2.25842108</h6>
                                        <p className="text-danger fs-12 mb-0">${chartData[1]}.18</p>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item px-0">
                                <div className="d-flex">
                                    <div className="flex-shrink-0 avatar-xs">
                                        <span className="avatar-title bg-light p-1 rounded-circle">
                                            <img src={ltc} className="img-fluid" alt="" />
                                        </span>
                                    </div>
                                    <div className="flex-grow-1 ms-2">
                                        <h6 className="mb-1">Litecoin</h6>
                                        <p className="fs-12 mb-0 text-muted"><i className="mdi mdi-circle fs-10 align-middle text-warning me-1"></i>LTC</p>
                                    </div>
                                    <div className="flex-shrink-0 text-end">
                                        <h6 className="mb-1">LTC 10.58963217</h6>
                                        <p className="text-success fs-12 mb-0">${chartData[2]}.58</p>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item px-0 pb-0">
                                <div className="d-flex">
                                    <div className="flex-shrink-0 avatar-xs">
                                        <span className="avatar-title bg-light p-1 rounded-circle">
                                            <img src={dash} className="img-fluid" alt="" />
                                        </span>
                                    </div>
                                    <div className="flex-grow-1 ms-2">
                                        <h6 className="mb-1">Dash</h6>
                                        <p className="fs-12 mb-0 text-muted"><i className="mdi mdi-circle fs-10 align-middle text-success me-1"></i>DASH</p>
                                    </div>
                                    <div className="flex-shrink-0 text-end">
                                        <h6 className="mb-1">DASH 204.28565885</h6>
                                        <p className="text-success fs-12 mb-0">${chartData[3]}.84</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </Card.Body>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default MyPortfolio;