import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { popularityData } from "../../common/data/dashboardNFT";

// Import Chart
import { PopularityChart } from "./DashboardNFTCharts";

//SimpleBar
import SimpleBar from "simplebar-react";
import { Link } from '@inertiajs/react';
const Popularity = () => {

    return (
        <React.Fragment>
            <Col xxl={3}>
                <Card>
                    <Card.Header className="border-0 pb-0">
                        <h6 className="card-title mb-0">Popularity</h6>
                    </Card.Header>
                    <div>
                        <PopularityChart dataColors='["--vz-success", "--vz-warning"]' />
                    </div>
                </Card>

                <Card>
                    <Card.Header className="d-flex align-items-center">
                        <h6 className="card-title mb-0 flex-grow-1">History of Bids</h6>
                        <Link className="text-muted" href="/apps-nft-item-details">
                            See All <i className="ri-arrow-right-line align-bottom"></i>
                        </Link>
                    </Card.Header>
                    <Card.Body>
                        <div className="table-responsive table-card">
                            <SimpleBar style={{ maxHeight: "365px" }}>
                                <ul className="list-group list-group-flush">
                                    {popularityData.map((item:any, key:any) => (
                                        <li key={key} className="list-group-item list-group-item-action">
                                            <div className="d-flex align-items-center">
                                                <img src={item.img} alt="" className="avatar-xs object-fit-cover rounded-circle" />
                                                <div className="ms-3 flex-grow-1">
                                                    <Link href="#" className="stretched-link">
                                                        <h6 className="fs-14 mb-1">{item.author}</h6>
                                                    </Link>
                                                    <p className="mb-0 text-muted">{item.username}</p>
                                                </div>
                                                <div>
                                                    <h6>{item.price}</h6>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </SimpleBar>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default Popularity;