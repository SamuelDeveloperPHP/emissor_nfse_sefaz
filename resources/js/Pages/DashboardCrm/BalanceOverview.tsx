import React, { useState, useEffect } from 'react';
import { Card, Col, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { BalanceOverviewCharts } from "./DashboardCrmCharts";
import { createSelector } from 'reselect';
import { ongetBalanceChartsData } from '../../slices/thunk';

const BalanceOverview = () => {
    const dispatch :any= useDispatch();

    const [chartData, setchartData] = useState<any>([]);

    const selectDashboardData = createSelector(
        (state : any) => state.DashboardCRM,
        (balanceOverviewData: any) => balanceOverviewData.balanceOverviewData
      );
    // Inside your component
    const balanceOverviewData : any= useSelector(selectDashboardData);


    useEffect(() => {
        setchartData(balanceOverviewData);
    }, [balanceOverviewData]);

    const [seletedMonth, setSeletedMonth] = useState("Current Year");
    const onChangeChartPeriod = (pType : any) => {
        setSeletedMonth(pType);
        dispatch(ongetBalanceChartsData(pType));
    };

    useEffect(() => {
        dispatch(ongetBalanceChartsData("today"));
    }, [dispatch]);

    return (
        <React.Fragment>
            <Col xxl={6}>
                <Card className="card-height-100">
                    <Card.Header className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Balance Overview</h4>
                        <div className="flex-shrink-0">
                        <Dropdown className="card-header-dropdown">
                                <Dropdown.Toggle className="text-reset dropdown-btn arrow-none" as="a" role="button">
                                    <span className="fw-semibold text-uppercase fs-12 arrow-none">Sort by: </span><span className="text-muted">
                                        {seletedMonth.charAt(0).toUpperCase() + seletedMonth.slice(1)}
                                        <i className="mdi mdi-chevron-down ms-1"></i></span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-end">
                                    <Dropdown.Item 
                                    onClick={() => { onChangeChartPeriod("today"); }} className={seletedMonth === "today" ? "active" : ""}
                                    >Today</Dropdown.Item>
                                    <Dropdown.Item 
                                    onClick={() => { onChangeChartPeriod("lastWeek"); }} className={seletedMonth === "lastWeek" ? "active" : ""}
                                    >Last Week</Dropdown.Item>
                                    <Dropdown.Item 
                                    onClick={() => { onChangeChartPeriod("lastMonth"); }} className={seletedMonth === "lastMonth" ? "active" : ""}
                                    >Last Month</Dropdown.Item>
                                    <Dropdown.Item 
                                    onClick={() => { onChangeChartPeriod("currentYear"); }} className={seletedMonth === "currentYear" ? "active" : ""}
                                    >Current Year</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Card.Header>
                    <Card.Body className="px-0">
                        <ul className="list-inline main-chart text-center mb-0">
                            <li className="list-inline-item chart-border-left me-0 border-0">
                                <h5 className="text-primary">$584k <span className="text-muted d-inline-block fs-13 align-middle ms-2">Revenue</span></h5>
                            </li>
                            <li className="list-inline-item chart-border-left me-0">
                                <h5>$497k<span className="text-muted d-inline-block fs-13 align-middle ms-2">Expenses</span>
                                </h5>
                            </li>
                            <li className="list-inline-item chart-border-left me-0">
                                <h5><span data-plugin="counterup">3.6</span>%<span className="text-muted d-inline-block fs-13 align-middle ms-2">Profit Ratio</span></h5 >
                            </li>
                        </ul>

                        <div id="revenue-expenses-charts" dir="ltr">
                            <BalanceOverviewCharts series={chartData} dataColors='["--vz-success", "--vz-danger"]'/>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default BalanceOverview;