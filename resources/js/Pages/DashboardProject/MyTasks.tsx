import React from 'react';
import { Button, Card, Col, Dropdown } from 'react-bootstrap';
import { projectTasks } from '../../common/data';
import { Link } from '@inertiajs/react';

const MyTasks = () => {
    return (
        <React.Fragment>
            <Col xl={5}>
                <Card>
                    <Card.Header className="card-header align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1 py-1">My Tasks</h4>
                        <div className="flex-shrink-0">
                        <Dropdown className="card-header-dropdown">
                                <Dropdown.Toggle className="text-reset dropdown-btn arrow-none" as="a" role="button">
                                    <span className="text-muted">All Tasks <i className="mdi mdi-chevron-down ms-1"></i></span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-end">
                                    <Dropdown.Item>All Tasks</Dropdown.Item>
                                    <Dropdown.Item>Completed </Dropdown.Item>
                                    <Dropdown.Item>Inprogress</Dropdown.Item>
                                    <Dropdown.Item>Pending</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div className="table-responsive table-card">
                            <table className="table table-borderless table-nowrap table-centered align-middle mb-0">
                                <thead className="table-light text-muted">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Dedline</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Assignee</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(projectTasks || []).map((item, key) => (<tr key={key}>
                                        <td>
                                            <div className="form-check">
                                                <input className="form-check-input fs-15" type="checkbox" value="" id={item.forId} />{" "}
                                                <label className="form-check-label ms-1" htmlFor={item.forId}>
                                                    {item.label}
                                                </label>
                                            </div>
                                        </td>
                                        <td className="text-muted">{item.dedline}</td>
                                        <td><span className={"badge bg-" + item.statusClass+"-subtle text-"+item.statusClass}>{item.status}</span></td>
                                        <td>
                                            <Link href="#" className="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Mary Stoner">
                                                <img src={item.img} alt="" className="rounded-circle avatar-xxs" />
                                            </Link>
                                        </td>
                                    </tr>))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-3 text-center">
                        <Button variant='link' href="#" className="p-0 text-muted text-decoration-underline">Load More</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default MyTasks;