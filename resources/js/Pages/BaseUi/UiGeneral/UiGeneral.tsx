import React from 'react';
import { Button, Card, Col, Container, Row, Popover, Tooltip, Spinner, Pagination, Breadcrumb, BreadcrumbItem, OverlayTrigger } from 'react-bootstrap';

// Import Content
import UiContent from '../../../Components/Common/UiContent';
//import Components
import BreadCrumbpage from '../../../Components/Common/BreadCrumb';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';

import { PopoversExample, TooltipsExample, BreadcrumbExample, PaginationExample, SpinnersExample } from './UiGeneralCode';
import { Head } from '@inertiajs/react';
import Layout from '../../../Layouts';


const UiGeneral = () => {

    return (
        <React.Fragment>
            <Head title='General | Velzon - React Admin & Dashboard Template' />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumbpage title="General" pageTitle="Base UI" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Popovers" />
                                <Card.Body>
                                    <p className="text-muted">Popovers example are available with follwing options , Directions are mirrored when using Bootstrap in RTL.</p>
                                    <div className="live-preview">
                                        <div className="hstack flex-wrap gap-2">
                                            <OverlayTrigger trigger="click" placement="top" overlay={<Popover id="popover-positioned-top"> <Popover.Header as="h3">"Popover top"</Popover.Header> <Popover.Body> Vivamus sagittis lacus vel augue laoreet rutrum faucibus. </Popover.Body> </Popover>}>
                                                <Button variant="light">Popover on top</Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger trigger="click" placement="right" overlay={<Popover id="popover-positioned-right"> <Popover.Header as="h3">"Popover right"</Popover.Header> <Popover.Body> Vivamus sagittis lacus vel augue laoreet rutrum faucibus. </Popover.Body> </Popover>}>
                                                <Button variant="light">Popover on right</Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger trigger="click" placement="bottom" overlay={<Popover id="popover-positioned-bottom"> <Popover.Header as="h3">"Popover bottom"</Popover.Header> <Popover.Body> Vivamus sagittis lacus vel augue laoreet rutrum faucibus. </Popover.Body> </Popover>}>
                                                <Button variant="light">Popover on bottom</Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger trigger="click" placement="left" overlay={<Popover id="popover-positioned-left"> <Popover.Header as="h3">"Popover left"</Popover.Header> <Popover.Body> Vivamus sagittis lacus vel augue laoreet rutrum faucibus. </Popover.Body> </Popover>}>
                                                <Button variant="light">Popover on left</Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger trigger="click" placement="right" overlay={<Popover id="popover-positioned-right"> <Popover.Header as="h3">"Dismissible popover"</Popover.Header> <Popover.Body> And here's some amazing content. It's very engaging. Right?" </Popover.Body> </Popover>}>
                                                <Button variant="success">Dismissible popover</Button>
                                            </OverlayTrigger>
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <PopoversExample />
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
                                <PreviewCardHeader title="Tooltips" />

                                <Card.Body>
                                    <p className="text-muted">Tooltip example are available with follwing options, Directions are mirrored when using Bootstrap in RTL.</p>
                                    <div className="live-preview">
                                        <div className="hstack flex-wrap gap-2">
                                            <OverlayTrigger placement='top' overlay={<Tooltip id="tooltip-top"> Tooltip on Top. </Tooltip>}>
                                                <Button variant="light">Tooltip on top</Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger placement='right' overlay={<Tooltip id="tooltip-right"> Tooltip on right. </Tooltip>}>
                                                <Button variant="light">Tooltip on right</Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger placement='bottom' overlay={<Tooltip id="tooltip-bottom"> Tooltip on bottom. </Tooltip>}>
                                                <Button variant="light">Tooltip on bottom</Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger placement='left' overlay={<Tooltip id="tooltip-left"> Tooltip on left. </Tooltip>}>
                                                <Button variant="light">Tooltip on left</Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger placement='top' overlay={<Tooltip id="tooltip-top"> <em>Tooltip</em> <u>with</u> <b>HTML</b> </Tooltip>}>
                                                <Button variant="primary">Tooltip with HTML</Button>
                                            </OverlayTrigger>

                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <TooltipsExample />
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
                                <PreviewCardHeader title="Breadcrumb" />

                                <Card.Body>
                                    <p className="text-muted">Indicate the current page’s location within a navigational hierarchy</p>
                                    <div className="live-preview">
                                        <Breadcrumb listProps={{ className: 'p-3 py-2 bg-light' }}>
                                            <Breadcrumb.Item href="#" className='breadcrumb-general'>Home</Breadcrumb.Item>
                                        </Breadcrumb>

                                        <Breadcrumb listProps={{ className: 'p-3 py-2 bg-light' }} >
                                            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                                            <Breadcrumb.Item className='breadcrumb-general'> Library </Breadcrumb.Item>
                                        </Breadcrumb>
                                        <Breadcrumb listProps={{ className: 'p-3 py-2 bg-light' }}>
                                            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                                            <Breadcrumb.Item href="#">Base UI</Breadcrumb.Item>
                                            <Breadcrumb.Item className='breadcrumb-general'> General </Breadcrumb.Item>
                                        </Breadcrumb>

                                        <Breadcrumb listProps={{ className: 'p-3 py-2 bg-light' }}>
                                            <Breadcrumb.Item href="#"><i className="ri-home-5-fill" /></Breadcrumb.Item>
                                            <Breadcrumb.Item href="#">Base UI</Breadcrumb.Item>
                                            <Breadcrumb.Item className='breadcrumb-general'> General </Breadcrumb.Item>
                                        </Breadcrumb>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <BreadcrumbExample />
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
                                <PreviewCardHeader title="Pagination" />

                                <Card.Body>

                                    <div className="live-preview">
                                        <Row>
                                            <Col lg={6}>
                                                <h5 className="fs-15">Default Pagination</h5>
                                                <p className="text-muted">Use <code>Pagination</code> attribute to ul element to indicate a series of related content exists across multiple pages.</p>
                                                <Pagination>
                                                    <Pagination.Item>Previous</Pagination.Item>
                                                    <Pagination.Item>{1}</Pagination.Item>
                                                    <Pagination.Item>{2}</Pagination.Item>
                                                    <Pagination.Item>{3}</Pagination.Item>
                                                    <Pagination.Item>Next</Pagination.Item>
                                                </Pagination>

                                                <Pagination>
                                                    <Pagination.Item>←  Prev</Pagination.Item>
                                                    <Pagination.Item>{1}</Pagination.Item>
                                                    <Pagination.Item>{2}</Pagination.Item>
                                                    <Pagination.Item>{3}</Pagination.Item>
                                                    <Pagination.Item>Next →</Pagination.Item>
                                                </Pagination>
                                            </Col>


                                            <Col lg={6}>
                                                <div className="mt-4 mt-lg-0">
                                                    <h5 className="fs-15">Disabled and Active states</h5>
                                                    <p className="text-muted">Use <code>disabled</code> attribute to Pagination.Item to links that appear
                                                        un-clickable and <code>active</code> class to
                                                        indicate the current page.</p>
                                                    <Pagination>
                                                        <Pagination.Item className="disabled">← Prev</Pagination.Item>
                                                        <Pagination.Item>{1}</Pagination.Item>
                                                        <Pagination.Item active>{2}</Pagination.Item>
                                                        <Pagination.Item>{3}</Pagination.Item>
                                                        <Pagination.Item>Next →</Pagination.Item>
                                                    </Pagination>

                                                    <Pagination>
                                                        <Pagination.Item disabled>
                                                            <span><i className="mdi mdi-chevron-left" /></span>
                                                        </Pagination.Item>
                                                        <Pagination.Item>{1}</Pagination.Item>
                                                        <Pagination.Item active>{2}</Pagination.Item>
                                                        <Pagination.Item>{3}</Pagination.Item>
                                                        <Pagination.Item>
                                                            <i className="mdi mdi-chevron-right" />
                                                        </Pagination.Item>
                                                    </Pagination>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg={6}>
                                                <div className="mt-4">
                                                    <h5 className="fs-15">Sizing</h5>
                                                    <p className="text-muted">Use <code>pagination-lg</code> or <code>pagination-sm</code> to set different pagination sizes.</p>

                                                    {/* <!-- Pagination Large --> */}
                                                    <Pagination size='lg'>
                                                        <Pagination.Item disabled> ← &nbsp; Prev </Pagination.Item>
                                                        <Pagination.Item> {1} </Pagination.Item>
                                                        <Pagination.Item> {2} </Pagination.Item>
                                                        <Pagination.Item> {3} </Pagination.Item>
                                                        <Pagination.Item> Next &nbsp; → </Pagination.Item>
                                                    </Pagination>

                                                    {/* <!-- Pagination Small --> */}
                                                    <Pagination size='sm'>
                                                        <Pagination.Item disabled> ← &nbsp; Prev </Pagination.Item>
                                                        <Pagination.Item> {1} </Pagination.Item>
                                                        <Pagination.Item> {2} </Pagination.Item>
                                                        <Pagination.Item> {3} </Pagination.Item>
                                                        <Pagination.Item> Next &nbsp; → </Pagination.Item>
                                                    </Pagination>
                                                </div>

                                            </Col>

                                            <Col lg={6}>
                                                <div className="mt-4">
                                                    <h5 className="fs-15">Alignment</h5>

                                                    <p className="text-muted">Use <code>justify-content-start</code>, <code>justify-content-start</code>, or <code>justify-content-start</code>, class to pagination class to
                                                        change the alignment of pagination respectively.</p>

                                                    {/* <!-- Pagination Alignment --> */}


                                                    {/* <!-- Center Alignment --> */}
                                                    <Pagination className="justify-content-center">
                                                        <Pagination.Item disabled> ← &nbsp; Prev </Pagination.Item>
                                                        <Pagination.Item> {1} </Pagination.Item>
                                                        <Pagination.Item> {2} </Pagination.Item>
                                                        <Pagination.Item> {3} </Pagination.Item>
                                                        <Pagination.Item> Next &nbsp; → </Pagination.Item>
                                                    </Pagination>


                                                    {/* <!-- Right Alignment --> */}
                                                    <Pagination className="justify-content-end">
                                                        <Pagination.Item disabled> ← &nbsp; Prev </Pagination.Item>
                                                        <Pagination.Item> {1} </Pagination.Item>
                                                        <Pagination.Item> {2} </Pagination.Item>
                                                        <Pagination.Item> {3} </Pagination.Item>
                                                        <Pagination.Item> Next &nbsp; → </Pagination.Item>
                                                    </Pagination>

                                                </div>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg={6}>
                                                <div className="mt-4">
                                                    <h5 className="fs-15">Custom Separated Pagination</h5>
                                                    <p className="text-muted">Use <code>pagination-separated</code> class to pagination class to set custom separated pagination.</p>

                                                    {/* <!-- Custom Separated Pagination Large --> */}
                                                    <Pagination size='lg' className="pagination-lg pagination-separated">
                                                        <Pagination.Item disabled> ← </Pagination.Item>
                                                        <Pagination.Item> {1} </Pagination.Item>
                                                        <Pagination.Item active> {2} </Pagination.Item>
                                                        <Pagination.Item> {3} </Pagination.Item>
                                                        <Pagination.Item> {4} </Pagination.Item>
                                                        <Pagination.Item> {5} </Pagination.Item>
                                                        <Pagination.Item> → </Pagination.Item>
                                                    </Pagination>

                                                    <Pagination className="pagination-separated">
                                                        <Pagination.Item disabled> ← </Pagination.Item>
                                                        <Pagination.Item> {1} </Pagination.Item>
                                                        <Pagination.Item active> {2} </Pagination.Item>
                                                        <Pagination.Item> {3} </Pagination.Item>
                                                        <Pagination.Item> {4} </Pagination.Item>
                                                        <Pagination.Item> {5} </Pagination.Item>
                                                        <Pagination.Item> → </Pagination.Item>
                                                    </Pagination>

                                                    <Pagination size='sm' className="pagination-sm pagination-separated">
                                                        <Pagination.Item disabled> ← </Pagination.Item>
                                                        <Pagination.Item> {1} </Pagination.Item>
                                                        <Pagination.Item active> {2} </Pagination.Item>
                                                        <Pagination.Item> {3} </Pagination.Item>
                                                        <Pagination.Item> {4} </Pagination.Item>
                                                        <Pagination.Item> {5} </Pagination.Item>
                                                        <Pagination.Item> → </Pagination.Item>
                                                    </Pagination>
                                                </div>
                                            </Col>

                                            <Col lg={6}>
                                                <div className="mt-4">
                                                    <h5 className="fs-15">Custom Rounded Pagination</h5>
                                                    <p className="text-muted">Use <code>pagination-rounded</code> class to pagination class to set custom rounded pagination.</p>

                                                    {/* <!-- Pagination rounded --> */}

                                                    <Pagination size='lg' className="pagination-lg pagination-rounded">
                                                        <Pagination.Item disabled> ← </Pagination.Item>
                                                        <Pagination.Item> {1} </Pagination.Item>
                                                        <Pagination.Item active> {2} </Pagination.Item>
                                                        <Pagination.Item> {3} </Pagination.Item>
                                                        <Pagination.Item> {4} </Pagination.Item>
                                                        <Pagination.Item> {5} </Pagination.Item>
                                                        <Pagination.Item> → </Pagination.Item>
                                                    </Pagination>

                                                    <Pagination className="pagination-rounded">
                                                        <Pagination.Item disabled> ← </Pagination.Item>
                                                        <Pagination.Item> {1} </Pagination.Item>
                                                        <Pagination.Item active> {2} </Pagination.Item>
                                                        <Pagination.Item> {3} </Pagination.Item>
                                                        <Pagination.Item> {4} </Pagination.Item>
                                                        <Pagination.Item> {5} </Pagination.Item>
                                                        <Pagination.Item> → </Pagination.Item>
                                                    </Pagination>

                                                    <Pagination size='sm' className="pagination-sm pagination-rounded">
                                                        <Pagination.Item disabled> ← </Pagination.Item>
                                                        <Pagination.Item> {1} </Pagination.Item>
                                                        <Pagination.Item active> {2} </Pagination.Item>
                                                        <Pagination.Item> {3} </Pagination.Item>
                                                        <Pagination.Item> {4} </Pagination.Item>
                                                        <Pagination.Item> {5} </Pagination.Item>
                                                        <Pagination.Item> → </Pagination.Item>
                                                    </Pagination>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <PaginationExample />
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
                                <PreviewCardHeader title="Spinners" />

                                <Card.Body>

                                    <div className="live-preview">
                                        <Row>
                                            <Col lg={6}>
                                                <div>
                                                    <h5 className="fs-15">Border spinner</h5>
                                                    <p className="text-muted">Use <code>Spinner</code> attribute for a lightweight loading indicator.</p>
                                                    <div className="d-flex flex-wrap gap-3 mb-2">
                                                        {/* <!-- Border spinner --> */}
                                                        <Spinner animation='border' variant="primary" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>
                                                        <Spinner animation='border' variant="secondary" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>
                                                        <Spinner animation='border' variant="success" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>
                                                        <Spinner animation='border' variant="info" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>
                                                        <Spinner animation='border' variant="warning" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>
                                                        <Spinner animation='border' variant="danger" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>
                                                        <Spinner animation='border' variant="dark" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>
                                                        <Spinner animation='border' variant="light" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>
                                                    </div>
                                                </div>
                                            </Col>


                                            <Col lg={6}>
                                                <div>
                                                    <h5 className="fs-15">Growing spinner</h5>
                                                    <p className="text-muted">Use <code>spinner-grow</code> class for a lightweight spinner with growing effect.</p>
                                                    <div className="d-flex flex-wrap gap-3 mb-2">

                                                        {/* <!-- Growing spinner --> */}
                                                        <Spinner animation='grow' variant="primary" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>
                                                        <Spinner animation='grow' variant="secondary" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>
                                                        <Spinner animation='grow' variant="success" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>
                                                        <Spinner animation='grow' variant="info" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>
                                                        <Spinner animation='grow' variant="warning" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>
                                                        <Spinner animation='grow' variant="danger" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>
                                                        <Spinner animation='grow' variant="dark" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>
                                                        <Spinner animation='grow' variant="light" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>
                                                    </div>
                                                </div>
                                            </Col>

                                        </Row>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <SpinnersExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment >
    );
};
UiGeneral.layout = (page: any) => <Layout children={page} />
export default UiGeneral;
