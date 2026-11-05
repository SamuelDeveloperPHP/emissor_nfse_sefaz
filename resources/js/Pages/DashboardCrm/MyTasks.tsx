import React from 'react';
import { tasks } from "../../common/data";
import { Button, Card, Col, Dropdown } from 'react-bootstrap';

//SimpleBar
import SimpleBar from "simplebar-react";


const MyTasks = () => {
    return (
        <React.Fragment>
            <Col xl={5}>
                <Card className="card-height-100">
                    <Card.Header className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">My Tasks</h4>
                        <div className="flex-shrink-0">
                            <Dropdown className="card-header-dropdown">
                                <Dropdown.Toggle className="text-reset dropdown-btn arrow-none" as="a" role="button">
                                    <span className="text-muted"><i className="ri-settings-4-line align-middle me-1 fs-15"></i>Settings</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-end">
                                    <Dropdown.Item>Edit</Dropdown.Item>
                                    <Dropdown.Item>Remove</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Card.Header>

                    <Card.Body className="p-0">

                        <div className="align-items-center p-3 justify-content-between d-flex">
                            <div className="flex-shrink-0">
                                <div className="text-muted"><span className="fw-semibold">4</span> of <span className="fw-semibold">10</span> remaining</div>
                            </div>
                            <button type="button" className="btn btn-sm btn-success"><i className="ri-add-line align-middle me-1"></i> Add Task</button>
                        </div>

                        <SimpleBar style={{ maxHeight: "219px" }}>
                            <ul className="list-group list-group-flush border-dashed px-3">
                                {(tasks || []).map((item, index) => (
                                    <li className="list-group-item ps-0" key={index}>
                                        <div className="d-flex align-items-start">
                                            <div className="form-check ps-0 flex-sharink-0">
                                                <input type="checkbox" className="form-check-input ms-0" id={item.forId} />
                                            </div>
                                            <div className="flex-grow-1">
                                                <label className="form-check-label mb-0 ps-2" htmlFor={item.forId}>{item.text}</label>
                                            </div>
                                            <div className="flex-shrink-0 ms-2">
                                                <p className="text-muted fs-12 mb-0">{item.date}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </SimpleBar>
                        <div className="p-3 pt-2">
                            <Button variant="link" className="p-0 text-muted text-decoration-underline">Show more...</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default MyTasks;