import React, { useState } from 'react';
import { Card, Col, Dropdown, } from 'react-bootstrap';
import { topPages } from "../../common/data";
import { Link } from '@inertiajs/react';

const TopPages = () => {
    const [isTopPageDropdown, setTopPageDropdown] = useState<boolean>(false);
    const toggleDropdown = () => { setTopPageDropdown(!isTopPageDropdown); };
    return (
        <React.Fragment>
            <Col xl={4} md={6}>
                <Card className="card-height-100">
                    <Card.Header className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Top Pages</h4>
                        <div className="flex-shrink-0">
                            <Dropdown show={isTopPageDropdown} onClick={toggleDropdown} className="card-header-dropdown">
                                <Dropdown.Toggle as="a" className="text-reset dropdown-btn arrow-none" role="button">
                                    <span className="text-muted fs-16"><i className="mdi mdi-dots-vertical align-middle"></i></span>
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
                            <table className="table align-middle table-borderless table-centered table-nowrap mb-0">
                                <thead className="text-muted table-light">
                                    <tr>
                                        <th scope="col" style={{ width: "62" }}>Active Page</th>
                                        <th scope="col">Active</th>
                                        <th scope="col">Users</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(topPages || []).map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <a href="#" >{item.page}</a>
                                            </td>
                                            <td>{item.active}</td>
                                            <td>{item.user}</td>
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

export default TopPages;