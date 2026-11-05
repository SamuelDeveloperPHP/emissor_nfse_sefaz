import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { featuresData } from '../../../common/data';
import { Link } from '@inertiajs/react';

const Features = () => {
    
    return (
        <React.Fragment>
            <section className="section">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <div className="text-center mb-5">
                            <h2 className="mb-3 fw-bold lh-base">Create and Sell Your NFTs</h2>
                            <p className="text-muted">The process of creating an NFT may cost less than a dollar, but the process of selling it can cost up to a thousand dollars. For example, Allen Gannett, a software developer.</p>
                        </div>
                    </Col>
                </Row>
                
                <Row>
                 {featuresData.map((item, key) => (
                    <Col key={key} lg={3}>
                        <Card className="shadow-none">
                            <Card.Body>
                                <img src={item.img} alt="" className="avatar-sm"/>
                                <h5 className="mt-4">{item.title}</h5>
                                <p className="text-muted fs-14">{item.textConent}</p>
                                <Link href="#" className="link-success fs-14">Read More <i className="ri-arrow-right-line align-bottom"></i></Link>
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

export default Features;