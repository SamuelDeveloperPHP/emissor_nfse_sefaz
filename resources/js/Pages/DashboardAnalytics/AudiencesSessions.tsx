import React, { useState, useEffect } from 'react';
import { Card, Col, Dropdown, } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';
import { ongetAudiencesSessionsChartsData } from '../../slices/thunk';
import { AudiencesSessionsCharts } from './DashboardAnalyticsCharts';

const AudiencesSessions = () => {
    const dispatch:any = useDispatch();

    const [chartData, setchartData] = useState<any>([]);

    const sessionsData = createSelector(
        (state:any) => state.DashboardAnalytics,
        (audiencesSessionsData:any) => audiencesSessionsData.audiencesSessionsData
      );
    // Inside your component
    const audiencesSessionsData:any = useSelector(sessionsData);

    useEffect(() => {
        setchartData(audiencesSessionsData);
    }, [audiencesSessionsData]);

    const [seletedMonth, setSeletedMonth] = useState("today");
    const onChangeChartPeriod = (pType:any) => {
        setSeletedMonth(pType);
        dispatch(ongetAudiencesSessionsChartsData(pType));
    };

    useEffect(() => {
        dispatch(ongetAudiencesSessionsChartsData("today"));
    }, [dispatch]);

    return (
        <React.Fragment>
            <Col xl={6}>
                <Card className="card-height-100">
                    <Card.Header className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Audiences Sessions by Country</h4>
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
                    <div className="card-body p-0">
                        <div>
                            <AudiencesSessionsCharts 
                            series={chartData} 
                            dataColors='["--vz-success", "--vz-info"]' />
                        </div>
                    </div>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default AudiencesSessions;