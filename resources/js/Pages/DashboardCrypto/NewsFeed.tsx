import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { newsFeed } from '../../common/data';
import { Link } from '@inertiajs/react';


const NewsFeed = () => {
    return (
        <React.Fragment>
            <Col xxl={4}>
                <Card>
                    <Card.Header className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">News Feed</h4>
                        <div>
                            <button type="button" className="btn btn-soft-primary btn-sm">
                                View all
                            </button>
                        </div>
                    </Card.Header>

                    <Card.Body>
                        {(newsFeed || []).map((item, key) => (
                            <div className={item.id === 1 ? "d-flex align-middle" : "d-flex mt-4"} key={key}>
                                <div className="flex-shrink-0">
                                    <img src={item.img} className="rounded img-fluid" style={{ height: "60px" }} alt="" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1 lh-base"><Link href="#" className="text-reset">{item.caption}</Link></h6>
                                    <p className="text-muted fs-12 mb-0">{item.date} <i className="mdi mdi-circle-medium align-middle mx-1"></i>{item.time}</p>
                                </div>
                            </div>
                        ))}
                        <div className="mt-3 text-center">
                        <Button variant='link' className="text-muted text-decoration-underline">View all News</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default NewsFeed;