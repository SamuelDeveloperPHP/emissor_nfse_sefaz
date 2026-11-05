import React, { useState, useEffect } from 'react';
import { Card, Col, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { DealTypeCharts } from "./DashboardCrmCharts";
import { createSelector } from 'reselect';
import { ongetDialChartsData } from '../../slices/thunk';


const DealType = () => {
    const dispatch: any = useDispatch();

    const [chartData, setchartData] = useState<any>([]);

    const selectDashboardData = createSelector(
        (state: any) => state.DashboardCRM,
        (dialTypeData: any) => dialTypeData.dialTypeData
    );
    // Inside your component
    const dialTypeData: any = useSelector(selectDashboardData);

    useEffect(() => {
        setchartData(dialTypeData);
    }, [dialTypeData]);

    const [seletedMonth, setSeletedMonth] = useState("Monthly");
    const onChangeChartPeriod = (pType: any) => {
        setSeletedMonth(pType);
        dispatch(ongetDialChartsData(pType));
    };

    useEffect(() => {
        dispatch(ongetDialChartsData("monthly"));
    }, [dispatch]);

    return (
        <React.Fragment>
            <Col xxl={3} md={6}>
                <Card className="card-height-100">
                    <div className="card-header align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Deal Type</h4>
                        <div className="flex-shrink-0">
                            <Dropdown className="card-header-dropdown">
                                <Dropdown.Toggle as="a" className="text-reset dropdown-btn arrow-none" role="button">
                                    <span className="fw-semibold text-uppercase fs-12">Sort by: </span><span className="text-muted">
                                        {seletedMonth.charAt(0).toUpperCase() + seletedMonth.slice(1)}
                                        <i className="mdi mdi-chevron-down ms-1"></i></span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-end">
                                    <Dropdown.Item
                                        onClick={() => { onChangeChartPeriod("today"); }} className={seletedMonth === "today" ? "active" : ""}
                                    >Today</Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => { onChangeChartPeriod("weekly"); }} className={seletedMonth === "weekly" ? "active" : ""}
                                    >Weekly</Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => { onChangeChartPeriod("monthly"); }} className={seletedMonth === "monthly" ? "active" : ""}
                                    >Monthly</Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => { onChangeChartPeriod("yearly"); }} className={seletedMonth === "yearly" ? "active" : ""}
                                    >Yearly</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="card-body pb-0">
                        <div id="deal-type-charts" dir="ltr">
                            <DealTypeCharts series={chartData} dataColors='["--vz-warning", "--vz-danger", "--vz-success"]' />
                        </div>
                    </div>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default DealType;