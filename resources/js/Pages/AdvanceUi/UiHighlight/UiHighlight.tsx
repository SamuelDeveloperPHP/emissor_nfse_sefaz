import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';

import { HtmlHighlightExample, CssHighlightExample, JavaScriptExample } from './UiHighlightCode';
import Layout from '../../../Layouts';
import { Head } from '@inertiajs/react';


const UiHighlight = () => {
  
    return (
        <React.Fragment>
                <Head title='Highlight | Velzon - React Admin & Dashboard Template' />
                <div className="page-content">
                    <Container fluid>
                        <BreadCrumb title="Highlight" pageTitle="Advanced UI" />

                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <Card.Header className="align-items-center d-flex">
                                        <div className="flex-grow-1">
                                            <h4 className="card-title mb-0">HTML Highlight</h4>
                                        </div>
                                    </Card.Header>

                                    <Card.Body>
                                        <p className="text-muted">HTML highlight is used to mark or highlight text that is of property, relevance, or special interest to an HTML document. here is the example shown below.</p>

                                        <div className="live-preview">
                                            <pre>
                                                <code className="language-markup">
                                                    <HtmlHighlightExample />
                                                </code>
                                            </pre>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <Card.Header className="align-items-center d-flex">
                                        <div className="flex-grow-1">
                                            <h4 className="card-title mb-0">CSS Highlight</h4>
                                        </div>
                                    </Card.Header>

                                    <Card.Body>
                                        <p className="text-muted">CSS highlight is used to mark or highlight text that is of property, relevance, or special interest to a CSS document. Here is the example shown below.</p>
                                        <div className="live-preview">
                                            <pre>
                                                <code className="language-css">
                                                    <CssHighlightExample />
                                                </code>
                                            </pre>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <Card.Header className="align-items-center d-flex">
                                        <div className="flex-grow-1">
                                            <h4 className="card-title mb-0">Javascript Highlight</h4>
                                        </div>
                                    </Card.Header>

                                    <Card.Body>
                                        <p className="text-muted">Javascript highlight is used to mark or highlight text that is of property, relevance, or special interest to a Javascript document. Here is the example shown below.</p>
                                        <div className="live-preview">
                                            <pre>
                                                <code className="language-js">
                                                    <JavaScriptExample />
                                                </code>
                                            </pre>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
        </React.Fragment>
    );
};
UiHighlight.layout = (page:any) => <Layout children={page}/>
export default UiHighlight;