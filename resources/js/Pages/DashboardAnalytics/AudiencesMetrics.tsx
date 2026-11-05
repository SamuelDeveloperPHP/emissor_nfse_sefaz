import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import CountUp from "react-countup";
import { useSelector, useDispatch } from "react-redux";
import { AudiencesCharts } from './DashboardAnalyticsCharts';
import { createSelector } from 'reselect';
import { ongetAudiencesMetricsChartsData } from '../../slices/thunk';

const AudiencesMetrics = () => {

    const dispatch:any = useDispatch();

    const [chartData, setchartData] = useState<any>([]);

    const audiencesData = createSelector(
        (state:any) => state.DashboardAnalytics,
        (audiencesMetricsData:any) => audiencesMetricsData.audiencesMetricsData
      );
    // Inside your component
    const audiencesMetricsData:any = useSelector(audiencesData);

    useEffect(() => {
        setchartData(audiencesMetricsData);
    }, [audiencesMetricsData]);

    const onChangeChartPeriod = (pType:any) => {
        dispatch(ongetAudiencesMetricsChartsData(pType));
    };

    useEffect(() => {
        dispatch(ongetAudiencesMetricsChartsData("all"));
    }, [dispatch]);



    return (
        <React.Fragment>
            <Col xl={6}>
                <Card>
                    <Card.Header className="border-0 align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Audiences Metrics</h4>
                        <div className="d-flex gap-1">
                            <button type="button" className="btn btn-soft-secondary btn-sm" onClick={() => { onChangeChartPeriod("all"); }}>
                                ALL
                            </button>
                            <button type="button" className="btn btn-soft-secondary btn-sm" onClick={() => { onChangeChartPeriod("monthly"); }}>
                                1M
                            </button>
                            <button type="button" className="btn btn-soft-secondary btn-sm" onClick={() => { onChangeChartPeriod("halfyearly"); }}>
                                6M
                            </button>
                            <button type="button" className="btn btn-soft-primary btn-sm" onClick={() => { onChangeChartPeriod("yearly"); }}>
                                1Y
                            </button>
                        </div>
                    </Card.Header>
                    <Card.Header className="p-0 border-0 bg-light-subtle">
                        <Row className="g-0 text-center">
                            <Col xs={6} sm={4}>
                                <div className="p-3 border border-dashed border-start-0">
                                    <h5 className="mb-1"><span className="counter-value" data-target="854">
                                        <CountUp
                                            start={0}
                                            end={854}
                                            duration={3}
                                        />
                                    </span>
                                        <span className="text-success ms-1 fs-12"> 49%<i className="ri-arrow-right-up-line ms-1 align-middle"></i></span>
                                    </h5>
                                    <p className="text-muted mb-0">Avg. Session</p>
                                </div>
                            </Col>
                            <Col xs={6} sm={4}>
                                <div className="p-3 border border-dashed border-start-0">
                                    <h5 className="mb-1"><span className="counter-value" data-target="1278">
                                        <CountUp
                                            start={0}
                                            end={1278}
                                            duration={3}
                                            separator=","
                                        />
                                    </span>
                                        <span className="text-success ms-1 fs-12"> 60%<i className="ri-arrow-right-up-line ms-1 align-middle"></i></span>
                                    </h5>
                                    <p className="text-muted mb-0">Conversion Rate</p>
                                </div>
                            </Col>
                            <Col xs={6} sm={4}>
                                <div className="p-3 border border-dashed border-start-0 border-end-0">
                                    <h5 className="mb-1"><span className="counter-value" data-target="3">
                                        <CountUp
                                            start={0}
                                            end={3}
                                            duration={3}
                                        />
                                    </span>m <span className="counter-value" data-target="40">
                                            <CountUp
                                                start={0}
                                                end={40}
                                                duration={3}
                                            />
                                        </span>sec
                                        <span className="text-success ms-1 fs-12"> 37%<i className="ri-arrow-right-up-line ms-1 align-middle"></i></span>
                                    </h5>
                                    <p className="text-muted mb-0">Avg. Session Duration</p>
                                </div>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body className="p-0 pb-2">
                        <div>
                            <AudiencesCharts series={chartData} dataColors='["--vz-success", "--vz-light"]' />
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default AudiencesMetrics;