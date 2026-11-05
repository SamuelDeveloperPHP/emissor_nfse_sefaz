import React from 'react';
import { Button, Card, Col, Dropdown } from 'react-bootstrap';
import { bestSellingProducts } from "../../common/data";
import { Link } from '@inertiajs/react';

const BestSellingProducts = () => {
    return (
        <React.Fragment>
            <Col xl={6}>
                <Card>
                    <Card.Header className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Best Selling Products</h4>
                        <div className="flex-shrink-0">
                        <Dropdown className="card-header-dropdown">
                                <Dropdown.Toggle as="a" className="text-reset arrow-none" role="button">
                                    <span className="fw-semibold text-uppercase fs-12">Sort by: </span><span className="text-muted">Today<i className="mdi mdi-chevron-down ms-1"></i></span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-end">
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
                            <table className="table table-hover table-centered align-middle table-nowrap mb-0">
                                <tbody>
                                    {(bestSellingProducts || []).map((item, key) => (
                                        <tr key={key}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar-sm bg-light rounded p-1 me-2">
                                                        <img src={item.img} alt="" className="img-fluid d-block" />
                                                    </div>
                                                    <div>
                                                        <h5 className="fs-14 my-1"><Link href="/apps-ecommerce-product-details" className="text-reset">{item.label}</Link></h5>
                                                        <span className="text-muted">{item.date}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h5 className="fs-14 my-1 fw-normal">${(item.price).toFixed(2)}</h5>
                                                <span className="text-muted">Price</span>
                                            </td>
                                            <td>
                                                <h5 className="fs-14 my-1 fw-normal">{item.orders}</h5>
                                                <span className="text-muted">Orders</span>
                                            </td>
                                            <td>
                                                <h5 className="fs-14 my-1 fw-normal">{item.stock ? item.stock : <span className="badge bg-danger-subtle text-danger">Out of stock</span>} </h5>
                                                <span className="text-muted">Stock</span>
                                            </td>
                                            <td>
                                                <h5 className="fs-14 my-1 fw-normal">${item.amount}</h5>
                                                <span className="text-muted">Amount</span>
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

export default BestSellingProducts;