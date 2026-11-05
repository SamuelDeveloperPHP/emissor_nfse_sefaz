import React, { useState, useEffect } from 'react';
import { Card, Col, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { PrjectsStatusCharts } from './DashboardProjectCharts';
import { createSelector } from 'reselect';
import { ongetProjectStatusChartsData } from '../../slices/dashboardProject/thunk';

const ProjectsStatus = () => {
    const dispatch: any = useDispatch();

    const [chartData, setchartData] = useState<any>([]);

    const selectprojectstatusData = createSelector(
        (state: any) => state.DashboardProject,
        (projectStatusData: any) => projectStatusData.projectStatusData
    );
    // Inside your component
    const projectStatusData: any = useSelector(selectprojectstatusData);

    useEffect(() => {
        setchartData(projectStatusData);
    }, [projectStatusData]);

    const [seletedMonth, setSeletedMonth] = useState("All Time");
    const onChangeChartPeriod = (pType: any) => {
        setSeletedMonth(pType);
        dispatch(ongetProjectStatusChartsData(pType));
    };

    useEffect(() => {
        dispatch(ongetProjectStatusChartsData("all"));
    }, [dispatch]);

    return (
        <React.Fragment>
            <Col xxl={4} lg={6}>
                <Card className="card-height-100">
                    <Card.Header className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Projects Status</h4>
                        <div className="flex-shrink-0">
                            <Dropdown className="card-header-dropdown">
                                <Dropdown.Toggle as="a" className="dropdown-btn text-muted arrow-none" role="button">
                                    {seletedMonth.charAt(0).toUpperCase() + seletedMonth.slice(1)}
                                    <i className="mdi mdi-chevron-down ms-1"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-end">
                                    <Dropdown.Item
                                        onClick={() => { onChangeChartPeriod("all"); }} className={seletedMonth === "all" ? "active" : ""}
                                    >All Time</Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => { onChangeChartPeriod("week"); }} className={seletedMonth === "week" ? "active" : ""}
                                    >Last 7 Days</Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => { onChangeChartPeriod("month"); }} className={seletedMonth === "month" ? "active" : ""}
                                    >Last 30 Days</Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => { onChangeChartPeriod("quarter"); }} className={seletedMonth === "quarter" ? "active" : ""}
                                    >Last 90 Days</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Card.Header>

                    <Card.Body>
                        <PrjectsStatusCharts series={chartData} dataColors='["--vz-success", "--vz-primary", "--vz-warning", "--vz-danger"]' />
                        <div className="mt-3">
                            <div className="d-flex justify-content-center align-items-center mb-4">
                                <h2 className="me-3 ff-secondary mb-0">{chartData[0] + chartData[1] + chartData[2] + chartData[3] || 784}</h2>
                                <div>
                                    <p className="text-muted mb-0">Total Projects</p>
                                    <p className="text-success fw-medium mb-0">
                                        <span className="badge bg-success-subtle text-success p-1 rounded-circle"><i className="ri-arrow-right-up-line"></i></span> +3 New
                                    </p>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between border-bottom border-bottom-dashed py-2">
                                <p className="fw-medium mb-0"><i className="ri-checkbox-blank-circle-fill text-success align-middle me-2"></i> Completed</p>
                                <div>
                                    <span className="text-muted pe-5">{chartData[0]} Projects</span>
                                    <span className="text-success fw-medium fs-12">15870hrs</span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between border-bottom border-bottom-dashed py-2">
                                <p className="fw-medium mb-0"><i className="ri-checkbox-blank-circle-fill text-primary align-middle me-2"></i> In Progress</p>
                                <div>
                                    <span className="text-muted pe-5">{chartData[1]} Projects</span>
                                    <span className="text-success fw-medium fs-12">243hrs</span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between border-bottom border-bottom-dashed py-2">
                                <p className="fw-medium mb-0"><i className="ri-checkbox-blank-circle-fill text-warning align-middle me-2"></i> Yet to Start</p>
                                <div>
                                    <span className="text-muted pe-5">{chartData[2]} Projects</span>
                                    <span className="text-success fw-medium fs-12">~2050hrs</span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between py-2">
                                <p className="fw-medium mb-0"><i className="ri-checkbox-blank-circle-fill text-danger align-middle me-2"></i> Cancelled</p>
                                <div>
                                    <span className="text-muted pe-5">{chartData[3]} Projects</span>
                                    <span className="text-success fw-medium fs-12">~900hrs</span>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default ProjectsStatus;