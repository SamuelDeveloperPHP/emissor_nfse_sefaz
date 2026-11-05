import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { closingDeals } from "../../common/data";
import { Link } from '@inertiajs/react';


const ClosingDeals = () => {
    return (
        <React.Fragment>
            <Col xxl={7}>
                <Card className="card-height-100">
                    <Card.Header className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Closing Deals</h4>
                        <div className="flex-shrink-0">
                            <select className="form-select form-select-sm">
                                <option defaultValue="">Closed Deals</option>
                                <option value="1">Active Deals</option>
                                <option value="2">Paused Deals</option>
                                <option value="3">Canceled Deals</option>
                            </select>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div className="table-responsive">
                            <table className="table table-bordered table-nowrap align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ width: "30%" }}>Deal Name</th>
                                        <th scope="col" style={{ width: "30%" }}>Sales Rep</th>
                                        <th scope="col" style={{ width: "20%" }}>Amount</th>
                                        <th scope="col" style={{ width: "20%" }}>Close Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {(closingDeals || []).map((item, key) => (
                                        <tr key={key}>
                                            <td>{item.dealName}</td>
                                            <td><img src={item.img} alt="" className="avatar-xs rounded-circle me-2" />
                                                <Link href="#" className="text-body fw-medium">{item.salesRep}</Link></td>
                                            <td>${item.amount}k</td>
                                            <td>{item.closeDate}</td>
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

export default ClosingDeals;