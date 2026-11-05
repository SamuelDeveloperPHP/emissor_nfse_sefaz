import React from 'react';
import { Card, Col, Dropdown } from 'react-bootstrap';
import { dealsStatus } from "../../common/data";
import { Link } from '@inertiajs/react';

const DealsStatus = () => {
    return (
        <React.Fragment>
            <Col xl={7}>
                <Card>
                    <Card.Header className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Deals Status</h4>
                        <div className="flex-shrink-0">
                        <Dropdown className="card-header-dropdown">
                                <Dropdown.Toggle as="a" className="text-reset dropdown-btn arrow-none" role="button">
                                    <span className="text-muted">02 Nov 2021 to 31 Dec 2021<i className="mdi mdi-chevron-down ms-1"></i></span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-end">
                                    <Dropdown.Item>Today</Dropdown.Item>
                                    <Dropdown.Item>Last Week</Dropdown.Item>
                                    <Dropdown.Item>Last Month</Dropdown.Item>
                                    <Dropdown.Item>Current Year</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Card.Header>

                    <Card.Body>
                        <div className="table-responsive table-card">
                            <table className="table table-borderless table-hover table-nowrap align-middle mb-0">
                                <thead className="table-light">
                                    <tr className="text-muted">
                                        <th scope="col">Name</th>
                                        <th scope="col" style={{ width: "20%" }}>Last Contacted</th>
                                        <th scope="col" >Sales Representative</th>
                                        <th scope="col" style={{ width: "16%" }}>Status</th>
                                        <th scope="col" style={{ width: "12%" }}>Deal Value</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {(dealsStatus || []).map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.date}</td>
                                            <td><img src={item.img} alt="" className="avatar-xs rounded-circle me-2" />
                                                <Link href="#" className="text-body fw-medium">{item.representativeName}</Link></td>
                                            <td><span className={"badge bg-" + item.badgeClass + "-subtle text-"+item.badgeClass + " p-2"}>{item.status}</span></td>
                                            <td><div className="text-nowrap">{item.statusValue}</div></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default DealsStatus;