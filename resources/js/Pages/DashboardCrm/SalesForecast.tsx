import React, { useState, useEffect } from 'react';
import { Card, Col, Dropdown } from 'react-bootstrap';
import { SalesForecastCharts } from './DashboardCrmCharts';
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';
import { ongetSalesChartsData } from '../../slices/thunk';

const SalesForecast = () => {
    
    const dispatch : any= useDispatch();

    const [chartData, setchartData] = useState<any>([]);

    const selectDashboardData = createSelector(
        (state : any) => state.DashboardCRM,
        (salesForecastData:any) => salesForecastData.salesForecastData
      );
    // Inside your component
    const salesForecastData:any = useSelector(selectDashboardData);

    useEffect(() => {
        setchartData(salesForecastData);
    }, [salesForecastData]);

    const [seletedMonth, setSeletedMonth] = useState("Nov 2021");
    const onChangeChartPeriod = (pType : any) => {
        setSeletedMonth(pType);
        dispatch(ongetSalesChartsData(pType));
    };

    useEffect(() => {
        dispatch(ongetSalesChartsData("nov"));
    }, [dispatch]);

    return (
        <React.Fragment>
            <Col xxl={3} md={6}>
                <Card>
                    <Card.Header className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Sales Forecast</h4>
                        <div className="flex-shrink-0">
                        <Dropdown className="card-header-dropdown">
                                <Dropdown.Toggle as="a" className="text-reset dropdown-btn arrow-none" role="button">
                                    <span className="fw-semibold text-uppercase fs-12">Sort by: </span><span className="text-muted">
                                        {seletedMonth.charAt(0).toUpperCase() + seletedMonth.slice(1)}
                                        <i className="mdi mdi-chevron-down ms-1"></i></span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-start">
                                    <Dropdown.Item 
                                    onClick={() => { onChangeChartPeriod("oct"); }} className={seletedMonth === "oct" ? "active" : ""}
                                    >Oct 2021</Dropdown.Item>
                                    <Dropdown.Item 
                                    onClick={() => { onChangeChartPeriod("nov"); }} className={seletedMonth === "nov" ? "active" : ""}
                                    >Nov 2021</Dropdown.Item>
                                    <Dropdown.Item 
                                    onClick={() => { onChangeChartPeriod("dec"); }} className={seletedMonth === "dec" ? "active" : ""}
                                    >Dec 2021</Dropdown.Item>
                                    <Dropdown.Item 
                                    onClick={() => { onChangeChartPeriod("jan"); }} className={seletedMonth === "jan" ? "active" : ""}
                                    >Jan 2022</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Card.Header>
                    <div className="card-body pb-0">
                        <div id="sales-forecast-chart" className="apex-charts">
                            <SalesForecastCharts series={chartData} dataColors='["--vz-primary", "--vz-success", "--vz-warning"]'/>
                        </div>
                    </div>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default SalesForecast;