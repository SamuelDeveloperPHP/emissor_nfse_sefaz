import React from 'react';
import { Card, Col, Dropdown } from 'react-bootstrap';
import { teamMembers } from '../../common/data';
import { TeamMembersCharts } from './DashboardProjectCharts';

const TeamMembers = () => {
    return (
        <React.Fragment>
            <Col xxl={4}>
                <Card>
                    <Card.Header className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Team Members</h4>
                        <div className="flex-shrink-0">
                        <Dropdown className="card-header-dropdown">
                                <Dropdown.Toggle as="a" className="text-reset dropdown-btn arrow-none" role="button">
                                    <span className="fw-semibold text-uppercase fs-12">Sort by: </span><span className="text-muted">Last 30 Days<i className="mdi mdi-chevron-down ms-1"></i></span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
                                    <Dropdown.Item>Today</Dropdown.Item>
                                    <Dropdown.Item>Yesterday</Dropdown.Item>
                                    <Dropdown.Item>Last 7 Days</Dropdown.Item>
                                    <Dropdown.Item>Last 30 Days</Dropdown.Item>
                                    <Dropdown.Item>This Month</Dropdown.Item>
                                    <Dropdown.Item>Last Month</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Card.Header>

                    <Card.Body>

                        <div className="table-responsive table-card">
                            <table className="table table-borderless table-nowrap align-middle mb-0">
                                <thead className="table-light text-muted">
                                    <tr>
                                        <th scope="col">Member</th>
                                        <th scope="col">Hours</th>
                                        <th scope="col">Tasks</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(teamMembers || []).map((item, key) => (<tr key={key}>
                                        <td className="d-flex">
                                            <img src={item.img} alt="" className="avatar-xs rounded-3 me-2" />
                                            <div>
                                                <h5 className="fs-13 mb-0">{item.name}</h5>
                                                <p className="fs-12 mb-0 text-muted">{item.position}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <h6 className="mb-0">{item.hours}h : <span className="text-muted"> 150h </span></h6>
                                        </td>
                                        <td>
                                            {item.tasks}
                                        </td>
                                        <td style={{ width: "5%" }}>
                                            
                                            {/* <div id="radialBar_chart_1" data-colors='["--vz-primary"]' data-chart-series="50" className="apex-charts" dir="ltr"> */}
                                                <TeamMembersCharts seriesData={item.series} chartsColor={item.chartsColor} />
                                            {/* </div> */}
                                        </td>
                                    </tr>))}
                                </tbody>
                            </table>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default TeamMembers;