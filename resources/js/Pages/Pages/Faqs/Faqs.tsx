import React, { useState } from 'react';
import { Accordion, Card, Col, Container, Row } from 'react-bootstrap';

// Import Images
import faqImg from "../../../../images/faq-img.png";
import { Head } from '@inertiajs/react';
import Layout from '../../../Layouts';

const Faqs = () => {
    return (
        <React.Fragment>
            <Head title='FAQs | Velzon - React Admin & Dashboard Template' />
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card className="rounded-0 bg-success-subtle mx-n4 mt-n4 border-top">
                                <div className="px-4">
                                    <Row>
                                        <Col xxl={5} className="align-self-center">
                                            <div className="py-4">
                                                <h4 className="display-6 coming-soon-text">Frequently asked questions</h4>
                                                <p className="text-success fs-15 mt-3">If you can not find answer to your question in our FAQ, you can always contact us or email us. We will answer you shortly!</p>
                                                <div className="hstack flex-wrap gap-2">
                                                    <button type="button" className="btn btn-primary btn-label rounded-pill"><i className="ri-mail-line label-icon align-middle rounded-pill fs-16 me-2"></i> Email Us</button>
                                                    <button type="button" className="btn btn-info btn-label rounded-pill"><i className="ri-twitter-line label-icon align-middle rounded-pill fs-16 me-2"></i> Send Us Tweet</button>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xxl={3} className=" ms-auto">
                                            <div className="mb-n5 pb-1 faq-img d-none d-xxl-block">
                                                <img src={faqImg} alt="" className="img-fluid" />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                            <Row className="justify-content-evenly mb-4">
                                <Col lg={4}>
                                    <div className="mt-3">
                                        <div className="d-flex align-items-center mb-2">
                                            <div className="flex-shrink-0 me-1">
                                                <i className="ri-question-line fs-24 align-middle text-success me-1"></i>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h5 className="fs-16 mb-0 fw-semibold">General Questions</h5>
                                            </div>
                                        </div>

                                        <Accordion className="accordion-border-box" defaultActiveKey="0">

                                            <Accordion.Item eventKey='0'>
                                                <Accordion.Header id="genques-headingOne">
                                                    What is Lorem Ipsum ?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages. It will be as simple their most common words.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='1'>
                                                <Accordion.Header id="genques-headingTwo">
                                                    Why do we use it ?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    The new common language will be more simple and regular than the existing European languages. It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='2'>
                                                <Accordion.Header id="genques-headingThree">
                                                    Where does it come from ?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    he wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='3'>
                                                <Accordion.Header id="genques-headingFour">
                                                    Where can I get some ?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis aliquam ultrices mauris.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                </Col>


                                <Col lg={4}>
                                    <div className="mt-3">
                                        <div className="d-flex align-items-center mb-2">
                                            <div className="flex-shrink-0 me-1">
                                                <i className="ri-user-settings-line fs-24 align-middle text-success me-1"></i>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h5 className="fs-16 mb-0 fw-semibold">Manage Account</h5>
                                            </div>
                                        </div>

                                        <Accordion defaultActiveKey="1" className="accordion-border-box">
                                            <Accordion.Item eventKey='0'>
                                                <Accordion.Header id="manageaccount-headingOne">
                                                    Where can I get some ?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages. It will be as simple their most common words.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='1'>
                                                <Accordion.Header id="manageaccount-headingTwo">
                                                    Where does it come from ?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    The new common language will be more simple and regular than the existing European languages. It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='2'>
                                                <Accordion.Header id="manageaccount-headingThree">
                                                    Why do we use it ?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    he wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='3'>
                                                <Accordion.Header id="manageaccount-headingFour">
                                                    What is Lorem Ipsum ?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis aliquam ultrices mauris.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                </Col>

                                <Col lg={4}>
                                    <div className="mt-3">
                                        <div className="d-flex align-items-center mb-2">
                                            <div className="flex-shrink-0 me-1">
                                                <i className="ri-shield-keyhole-line fs-24 align-middle text-success me-1"></i>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h5 className="fs-16 mb-0 fw-semibold">Privacy &amp; Security</h5>
                                            </div>
                                        </div>

                                        <Accordion defaultActiveKey="0" className="accordion-border-box">
                                            <Accordion.Item eventKey='0'>
                                                <Accordion.Header id="privacy-headingOne">
                                                    Why do we use it ?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages. It will be as simple their most common words.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='1'>
                                                <Accordion.Header id="privacy-headingTwo">
                                                    Where can I get some ?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    The new common language will be more simple and regular than the existing European languages. It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='2'>
                                                <Accordion.Header id="privacy-headingThree">
                                                    What is Lorem Ipsum ?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    he wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='3'>
                                                <Accordion.Header id="privacy-headingFour">
                                                    Where does it come from ?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis aliquam ultrices mauris.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment >
    )
}
Faqs.layout = (page:any) => <Layout children={page} />
export default Faqs