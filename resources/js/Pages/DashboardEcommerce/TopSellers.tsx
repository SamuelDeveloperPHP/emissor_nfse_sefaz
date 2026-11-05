import React from 'react';
import { Button, Card, Col, Dropdown } from 'react-bootstrap';
import { topSellers } from "../../common/data";
import { Link } from '@inertiajs/react';


const TopSellers = () => {
    return (
        <React.Fragment>
            <Col xl={6}>
                <Card className="card-height-100">
                    <Card.Header className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Top Sellers</h4>
                        <div className="flex-shrink-0">
                        <Dropdown className="card-header-dropdown" >
                                <Dropdown.Toggle as="a" className="text-reset dropdown-btn arrow-none" role="button">
                                    <span className="text-muted">Report<i className="mdi mdi-chevron-down ms-1"></i></span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
                                    <Dropdown.Item>Download Report</Dropdown.Item>
                                    <Dropdown.Item>Export</Dropdown.Item>
                                    <Dropdown.Item>Import</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Card.Header>

                    <Card.Body>
                        <div className="table-responsive table-card">
                            <table className="table table-centered table-hover align-middle table-nowrap mb-0">
                                <tbody>
                                    {topSellers.map((item, key) => (
                                        <tr key={key}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-shrink-0 me-2">
                                                        <img src={item.img} alt="" className="avatar-sm p-2" />
                                                    </div>
                                                    <div>
                                                        <h5 className="fs-14 my-1 fw-medium"><Link href="/apps-ecommerce-seller-details" className="text-reset">{item.label}</Link></h5>
                                                        <span className="text-muted">{item.name}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="text-muted">{item.product}</span>
                                            </td>
                                            <td>
                                                <p className="mb-0">{item.stock}</p>
                                                <span className="text-muted">Stock</span>
                                            </td>
                                            <td>
                                                <span className="text-muted">${item.amount}</span>
                                            </td>
                                            <td>
                                                <h5 className="fs-14 mb-0">{item.percentage}%<i className="ri-bar-chart-fill text-success fs-16 align-middle ms-2"></i></h5>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="align-items-center mt-4 pt-2 justify-content-between row text-center text-sm-start">
                            <div className="col-sm">
                                <div className="text-muted">Showing <span className="fw-semibold">5</span> of <span className="fw-semibold">25</span> Results
                                </div>
                            </div>
                            <div className="col-sm-auto mt-3 mt-sm-0">
                                <ul className="pagination pagination-separated pagination-sm mb-0 justify-content-center">
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

export default TopSellers;