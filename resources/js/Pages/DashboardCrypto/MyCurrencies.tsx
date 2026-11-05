import React from 'react';
import { Card, Col, Dropdown } from 'react-bootstrap';
import { currencies } from '../../common/data';
import { Link } from '@inertiajs/react';

const MyCurrencies = () => {
    return (
        <React.Fragment>
            <Col xl={8}>
                <Card>
                    <Card.Header className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">My Currencies</h4>
                        <div className="flex-shrink-0">
                            <button className="btn btn-soft-primary btn-sm">24H</button>
                        </div>
                        <div className="flex-shrink-0 ms-2">
                        <Dropdown className="card-header-dropdown" dir='start'>
                                <Dropdown.Toggle className="btn btn-soft-primary btn-sm arrow-none" role="button" as="a">
                                    Get Report<i className="mdi mdi-chevron-down align-middle ms-1"></i>
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
                            <table className="table table-hover table-borderless table-centered align-middle table-nowrap mb-0">
                                <thead className="text-muted bg-light-subtle">
                                    <tr>
                                        <th>Coin Name</th>
                                        <th>Price</th>
                                        <th>24h Change</th>
                                        <th>Total Balance</th>
                                        <th>Total Coin</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(currencies || []).map((item, key) => (
                                        <tr key={key}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="me-2">
                                                        <img src={item.img} alt="" className="avatar-xxs" />
                                                    </div>
                                                    <div>
                                                        <h6 className="fs-14 mb-0">{item.coinName}</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>${item.price}</td>
                                            <td><h6 className={"fs-13 mb-0 text-" + item.iconClass}><i className={"align-middle me-1 " + item.icon}></i>{item.change}</h6></td>
                                            <td>${item.balance}</td>
                                            <td>{item.totalCoin}</td>
                                            <td><Link href="/apps-crypto-buy-sell" className="btn btn-sm btn-soft-secondary">Trade</Link></td>
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

export default MyCurrencies;