import React from 'react';
import { Card, Col, Row, Dropdown, Button } from 'react-bootstrap';
import { activities } from "../../common/data";
import { Link } from '@inertiajs/react';


const UpcomingActivities = () => {
    return (
        <React.Fragment>
            <Col xxl={5}>
                <Card>
                    <Card.Header className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Upcoming Activities</h4>
                        <div className="flex-shrink-0">
                        <Dropdown className="card-header-dropdown" >
                                <Dropdown.Toggle className="text-reset dropdown-btn arrow-none" as="a" role="button">
                                    <span className="text-muted fs-18"><i className="mdi mdi-dots-vertical"></i></span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
                                    <Dropdown.Item>Edit</Dropdown.Item>
                                    <Dropdown.Item>Remove</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Card.Header>
                    <Card.Body className="card-body pt-0">
                        <ul className="list-group list-group-flush border-dashed">
                            {(activities || []).map((item, key) => (
                                <li className="list-group-item ps-0" key={key}>
                                    <Row className="align-items-center g-3">
                                        <div className="col-auto">
                                            <div className="avatar-sm p-1 py-2 h-auto bg-light rounded-3">
                                                <div className="text-center">
                                                    <h5 className="mb-0">{item.date}</h5>
                                                    <div className="text-muted">{item.weekDay}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <h5 className="text-muted mt-0 mb-1 fs-13">{item.time}</h5>
                                            <Link href="#" className="text-reset fs-14 mb-0">{item.caption}</Link>
                                        </div>
                                        <div className="col-sm-auto">
                                            <div className="avatar-group">
                                                {(item.subItem || []).map((subItem, key) => (
                                                    <React.Fragment key={key}>
                                                        <div className="avatar-group-item">
                                                            <Link href="#" className="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Stine Nielsen">
                                                                <img src={subItem.img} alt="" className="rounded-circle avatar-xxs" />
                                                            </Link>
                                                        </div>
                                                    </React.Fragment>
                                                ))}
                                                <div className="avatar-group-item">
                                                    <Link href="#">
                                                        <div className="avatar-xxs">
                                                            <span className={"avatar-title rounded-circle " + item.bgcolor + " text-white"}>
                                                                {item.imgNumber}
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                </li>
                            ))}
                        </ul>
                        <div className="align-items-center mt-2 row g-3 text-center text-sm-start">
                            <div className="col-sm">
                                <div className="text-muted">Showing <span className="fw-semibold"> 4</span> of <span className="fw-semibold">125</span> Results
                                </div>
                            </div>
                            <div className="col-sm-auto">
                                <ul className="pagination pagination-separated pagination-sm justify-content-center justify-content-sm-start mb-0">
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
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default UpcomingActivities;