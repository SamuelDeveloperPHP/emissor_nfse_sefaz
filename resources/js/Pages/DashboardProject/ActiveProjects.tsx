import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { activeProjects } from '../../common/data';
import { Link } from '@inertiajs/react';


const ActiveProjects = () => {
    return (
        <React.Fragment>
            <Col xl={7}>
                <Card>
                    <Card.Header className="d-flex align-items-center">
                        <h4 className="card-title flex-grow-1 mb-0">Active Projects</h4>
                        <div className="flex-shrink-0">
                            <Link href="#" className="btn btn-soft-info btn-sm">Export Report</Link>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div className="table-responsive table-card">
                            <table className="table table-nowrap table-centered align-middle">
                                <thead className="bg-light text-muted">
                                    <tr>
                                        <th scope="col">Project Name</th>
                                        <th scope="col">Project Lead</th>
                                        <th scope="col">Progress</th>
                                        <th scope="col">Assignee</th>
                                        <th scope="col">Status</th>
                                        <th scope="col" style={{ width: "10%" }}>Due Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {(activeProjects || []).map((item, key) => (<tr key={key}>
                                        <td className="fw-medium">{item.projectName}</td>
                                        <td>
                                            <img src={item.img} className="avatar-xxs rounded-circle me-1" alt="" />
                                            <Link href="#" className="text-reset">{item.projectLead}</Link>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0 me-1 text-muted fs-13">{item.percentage}</div>
                                                <div className="progress progress-sm  flex-grow-1" style={{ width: "68%" }}>
                                                    <div className="progress-bar bg-primary rounded" role="progressbar" style={{ width: item.percentage }} ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="avatar-group flex-nowrap">
                                                {item.subItem.map((item, key) => (<div className="avatar-group-item" key={key}>
                                                    <Link href="#" className="d-inline-block">
                                                        <img src={item.assImg} alt="" className="rounded-circle avatar-xxs" />
                                                    </Link>
                                                </div>))}
                                            </div>
                                        </td>
                                        <td><span className={"badge bg-" + item.badgeClass + "-subtle text-" + item.badgeClass}>{item.badge}</span></td>
                                        <td className="text-muted">{item.dueDate}</td>
                                    </tr>))}
                                </tbody>
                            </table>
                        </div>
                        <div className="align-items-center mt-xl-3 mt-4 justify-content-between d-flex">
                            <div className="flex-shrink-0">
                                <div className="text-muted">Showing <span className="fw-semibold">5</span> of <span className="fw-semibold">25</span> Results
                                </div>
                            </div>
                            <ul className="pagination pagination-separated pagination-sm mb-0">
                                <li className="page-item disabled">
                                    <Button variant='link' className="page-link">←</Button>
                                </li>
                                <li className="page-item">
                                    <Button variant='link' className="page-link">1</Button>
                                </li>
                                <li className="page-item active">
                                    <Button variant='link' className="page-link">2</Button>
                                </li>
                                <li className="page-item">
                                    <Button variant='link' className="page-link">3</Button>
                                </li>
                                <li className="page-item">
                                    <Button variant='link' className="page-link">→</Button>
                                </li>
                            </ul>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default ActiveProjects;