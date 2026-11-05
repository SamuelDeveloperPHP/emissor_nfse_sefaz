import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import CountUp from "react-countup";
import { useSelector, useDispatch } from "react-redux";
import { ProjectsOverviewCharts } from './DashboardProjectCharts';
import { createSelector } from 'reselect';
import { ongetProjectChartsData } from '../../slices/dashboardProject/thunk';

const ProjectsOverview = () => {
    const dispatch : any= useDispatch();

    const [chartData, setchartData] = useState<any>([]);

    const selectprojectData = createSelector(
        (state : any) => state.DashboardProject,
        (projectData: any) => projectData.projectData
    );
    // Inside your component
    const projectData: any = useSelector(selectprojectData);

    useEffect(() => {
        setchartData(projectData);
    }, [projectData]);

    const onChangeChartPeriod =( pType : any) => {
        dispatch(ongetProjectChartsData(pType));
    };

    useEffect(() => {
        dispatch(ongetProjectChartsData("all"));
    }, [dispatch]);

    return (
        <React.Fragment>
            <Row>
                <Col xl={12}>
                    <Card>
                        <Card.Header className="border-0 align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Projects Overview</h4>
                            <div className="d-flex gap-1">
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

                        <Card.Header className="p-0 border-0 bg-light-subtle">
                            <Row className="g-0 text-center">
                                <Col xs={6} sm={3}>
                                    <div className="p-3 border border-dashed border-start-0">
                                        <h5 className="mb-1"><span className="counter-value" data-target="9851">
                                            <CountUp
                                                start={0}
                                                end={9851}
                                                separator={","}
                                                duration={4}
                                            />
                                        </span></h5>
                                        <p className="text-muted mb-0">Number of Projects</p>
                                    </div>
                                </Col>
                                <Col xs={6} sm={3}>
                                    <div className="p-3 border border-dashed border-start-0">
                                        <h5 className="mb-1"><span className="counter-value">
                                            <CountUp
                                                start={0}
                                                end={1026}
                                                separator={","}
                                                duration={4}
                                            />
                                        </span></h5>
                                        <p className="text-muted mb-0">Active Projects</p>
                                    </div>
                                </Col>
                                <Col xs={6} sm={3}>
                                    <div className="p-3 border border-dashed border-start-0">
                                        <h5 className="mb-1">$<span className="counter-value" data-target="228.89">
                                            <CountUp
                                                start={0}
                                                end={228.89}
                                                decimals={2}
                                                duration={4}
                                            />
                                        </span>k</h5>
                                        <p className="text-muted mb-0">Revenue</p>
                                    </div>
                                </Col>
                                <Col xs={6} sm={3}>
                                    <div className="p-3 border border-dashed border-start-0 border-end-0">
                                        <h5 className="mb-1 text-success"><span className="counter-value" data-target="10589">
                                            <CountUp
                                                start={0}
                                                end={10589}
                                                separator={","}
                                                duration={4}
                                            />
                                        </span>h</h5>
                                        <p className="text-muted mb-0">Working Hours</p>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body className="p-0 pb-2">
                            <div>
                                <div dir="ltr" className="apex-charts">
                                    <ProjectsOverviewCharts series={chartData} dataColors='["--vz-primary", "--vz-warning", "--vz-success"]' />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ProjectsOverview;