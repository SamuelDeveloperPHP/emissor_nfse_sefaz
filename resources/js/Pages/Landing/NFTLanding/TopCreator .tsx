import React from 'react';
import { Container, Row, Col, Card, Dropdown} from 'react-bootstrap';
import { topCreatorData } from '../../../common/data';
import { Link } from '@inertiajs/react';

const TopCreator = () => {
    
    return (
        <React.Fragment>
            <section className="section bg-light" id="creators">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <div className="text-center mb-5">
                                <h2 className="mb-3 fw-bold lh-base">Top Creator This Week</h2>
                                <p className="text-muted">NFTs are valuable because they verify the authenticity of a non-fungible asset. This makes these assets unique and one of a kind.</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                    {topCreatorData.map((item, key) => (
                        <Col key={key} xl={4} md={6}>
                            <Card>
                                <Card.Body>
                                    <div className="d-flex">
                                        <div className="flex-shink-0">
                                            <img src={item.img} alt="" className="avatar-sm object-fit-cover rounded" />
                                        </div>
                                        <div className="ms-3 flex-grow-1">
                                            <Link href="pages-profile">
                                                <h5 className="mb-1">{item.title}</h5>
                                            </Link>
                                            <p className="text-muted mb-0"><i className="mdi mdi-ethereum text-primary fs-14"></i> {item.price}</p>
                                        </div>
                                        <div>
                                        <Dropdown dir="start" className="float-end">
                                                <Dropdown.Toggle as="button" className="btn btn-ghost-primary btn-icon arrow-none">
                                                <i className="ri-more-fill align-middle fs-16"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="dropdown-menu-end">
                                                    <Dropdown.Item className="view-item-btn">Share</Dropdown.Item>
                                                    <Dropdown.Item className="edit-item-btn">Report</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}                        
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
}

export default TopCreator;