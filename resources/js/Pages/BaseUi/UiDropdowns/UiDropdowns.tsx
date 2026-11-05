import React, { useState } from 'react';
import { Button, ButtonGroup, Card, Col, Container, Dropdown, Form, Nav, Row, Tab, } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
// Import Content
import UiContent from '../../../Components/Common/UiContent';
//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';

// Import Images
import avatar2 from "../../../../images/users/avatar-2.jpg";
import avatar3 from "../../../../images/users/avatar-3.jpg";
import avatar6 from "../../../../images/users/avatar-6.jpg";
import avatar8 from "../../../../images/users/avatar-8.jpg";

import bell from "../../../../images/svg/bell.svg";


import { SingleButtonDropdownExample, ColorDropdownExample, SplitButtonDropdownExample, SizingDropdownExample, DarkDropdownExample, AlignDropdownExample, OptionDropdownExample, AutoCloseDropdownExample, MenuItemDropdownExample, MenuContentDropdownExample, NotificationDropdownExample } from './UiDropdownsCode';
import { Head, Link } from '@inertiajs/react';
import Layout from '../../../Layouts';

const UiDropdowns = () => {

    return (
        <React.Fragment>
            <Head title='Dropdowns | Velzon - React Admin & Dashboard Template' />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Dropdowns" pageTitle="Base UI" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Single Button Dropdown" />

                                <Card.Body>
                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap gap-3">

                                            <Dropdown>
                                                <Dropdown.Toggle as="button" className="arrow-none btn btn-secondary" id="dropdown.MenuButton">
                                                    Dropdown button <i className="mdi mdi-chevron-down"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item>Action</Dropdown.Item>
                                                    <Dropdown.Item>Another action</Dropdown.Item>
                                                    <Dropdown.Item>Something else here</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Dropdown>
                                                <Dropdown.Toggle as="a" className="arrow-none btn btn-secondary">
                                                    Dropdown link <i className="mdi mdi-chevron-down"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item>Action</Dropdown.Item>
                                                    <Dropdown.Item>Another action</Dropdown.Item>
                                                    <Dropdown.Item>Something else here</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "375px" }}>
                                            <code>
                                                <SingleButtonDropdownExample />
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
                                <PreviewCardHeader title="Dropdown Color Variant" />
                                <Card.Body>
                                    <p className="text-muted">Use <code>btn-</code> class with below mentioned variation to color dropdown toggle.</p>
                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap gap-3">

                                            <Dropdown>
                                                <Dropdown.Toggle variant="primary" className='arrow-none'>
                                                    Primary <i className="mdi mdi-chevron-down"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#"> Action</Dropdown.Item>
                                                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                                                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Dropdown>
                                                <Dropdown.Toggle className='arrow-none' variant="success">
                                                    Success <i className="mdi mdi-chevron-down"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#"> Action</Dropdown.Item>
                                                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                                                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Dropdown>
                                                <Dropdown.Toggle className='arrow-none' variant="light">
                                                    Light <i className="mdi mdi-chevron-down"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#"> Action</Dropdown.Item>
                                                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                                                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <Dropdown>
                                                <Dropdown.Toggle className='arrow-none' variant="info">
                                                    Info <i className="mdi mdi-chevron-down"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#"> Action</Dropdown.Item>
                                                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                                                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Dropdown>
                                                <Dropdown.Toggle className='arrow-none' variant="secondary">
                                                    Secondary <i className="mdi mdi-chevron-down"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#"> Action</Dropdown.Item>
                                                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                                                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Dropdown>
                                                <Dropdown.Toggle className='arrow-none' variant="warning">
                                                    Warning <i className="mdi mdi-chevron-down"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#"> Action</Dropdown.Item>
                                                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                                                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Dropdown>
                                                <Dropdown.Toggle className='arrow-none' variant="danger">
                                                    Danger <i className="mdi mdi-chevron-down"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#"> Action</Dropdown.Item>
                                                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                                                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Dropdown>
                                                <Dropdown.Toggle className='arrow-none' variant="dark">
                                                    Dark <i className="mdi mdi-chevron-down"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#"> Action</Dropdown.Item>
                                                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                                                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "375px" }}>
                                            <code>
                                                <ColorDropdownExample />
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
                                <PreviewCardHeader title="Split Button Dropdown" />
                                <Card.Body>
                                    <p className="text-muted">Use <code>divider</code> attribute to Dropdown.Item to create split button dropdowns as a single button dropdown. </p>
                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap gap-3">
                                            <Dropdown>
                                                <Dropdown as={ButtonGroup}>
                                                    <Button variant="primary">Primary</Button>

                                                    <Dropdown.Toggle className='arrow-none' split variant="primary" id="dropdown-split-basic" >
                                                        <i className="mdi mdi-chevron-down"></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Dropdown>

                                            <Dropdown>
                                                <Dropdown as={ButtonGroup}>
                                                    <Button variant="success">Success</Button>

                                                    <Dropdown.Toggle className='arrow-none' split variant="success" id="dropdown-split-basic" >
                                                        <i className="mdi mdi-chevron-down"></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Dropdown>

                                            <Dropdown>
                                                <Dropdown as={ButtonGroup}>
                                                    <Button variant="light">Light</Button>

                                                    <Dropdown.Toggle className='arrow-none' split variant="light" id="dropdown-split-basic">
                                                        <i className="mdi mdi-chevron-down"></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Dropdown>

                                            <Dropdown>
                                                <Dropdown as={ButtonGroup}>
                                                    <Button variant="info">Info</Button>

                                                    <Dropdown.Toggle className='arrow-none' split variant="info" id="dropdown-split-basic">
                                                        <i className="mdi mdi-chevron-down"></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Dropdown>

                                            <Dropdown>
                                                <Dropdown as={ButtonGroup}>
                                                    <Button variant="secondary">Secondary</Button>

                                                    <Dropdown.Toggle className='arrow-none' split variant="secondary" id="dropdown-split-basic">
                                                        <i className="mdi mdi-chevron-down"></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Dropdown>

                                            <Dropdown>
                                                <Dropdown as={ButtonGroup}>
                                                    <Button variant="warning">Warning</Button>

                                                    <Dropdown.Toggle className='arrow-none' split variant="warning" id="dropdown-split-basic">
                                                        <i className="mdi mdi-chevron-down"></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Dropdown>

                                            <Dropdown>
                                                <Dropdown as={ButtonGroup}>
                                                    <Button variant="danger">Danger</Button>

                                                    <Dropdown.Toggle className='arrow-none' split variant="danger" id="dropdown-split-basic">
                                                        <i className="mdi mdi-chevron-down"></i>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Dropdown>

                                            <Dropdown>
                                                <Dropdown as={ButtonGroup}>
                                                    <Button variant="dark">Dark</Button>

                                                    <Dropdown.Toggle className='arrow-none' split variant="dark" id="dropdown-split-basic">
                                                        <i className="mdi mdi-chevron-down"></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Dropdown>
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "375px" }}>
                                            <code>
                                                <SplitButtonDropdownExample />
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
                                <PreviewCardHeader title="Dropdown Sizing" />


                                <Card.Body>
                                    <p className="text-muted">Use <code>btn-lg</code> class to create a large size dropdown button and <code>btn-sm</code> to create a small size dropdown button.</p>
                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap gap-3 align-items-center">

                                            <Dropdown bsPrefix='btn-group'>
                                                <Dropdown.Toggle className='arrow-none' variant="primary" size='lg'>
                                                    Large button
                                                    <i className="mdi mdi-chevron-down"></i>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#" active> Action</Dropdown.Item>
                                                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                                                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Dropdown bsPrefix='btn-group'>
                                                <Button variant="light" size='lg'>Large split button</Button>

                                                <Dropdown.Toggle className='arrow-none' split variant="light" id="dropdown-split-basic">
                                                    <i className="mdi mdi-chevron-down"></i>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Dropdown>
                                                <Dropdown.Toggle className='arrow-none' variant="primary" size='sm' >
                                                    Small button
                                                    <i className="mdi mdi-chevron-down"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#"> Action</Dropdown.Item>
                                                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                                                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Dropdown>
                                                <Button variant="light" size='sm'>Small split button</Button>

                                                <Dropdown.Toggle split variant="light" className='arrow-none btn btn-sm btn-light' id="dropdown-split-basic">
                                                    <i className="mdi mdi-chevron-down"></i>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "375px" }}>
                                            <code>
                                                <SizingDropdownExample />
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
                                <PreviewCardHeader title="Dark Dropdowns" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>dropdown-menu-dark</code> class onto an existing dropdown-menu to create dropdown items dark.</p>
                                    <div className="live-preview">
                                        <Dropdown>
                                            <Dropdown.Toggle as="button" className="arrow-none btn btn-secondary" id="dropdown.MenuButton2">
                                                Dropdown button <i className="mdi mdi-chevron-down"></i>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu-dark">
                                                <Dropdown.Item active >Action</Dropdown.Item>
                                                <Dropdown.Item>Another action</Dropdown.Item>
                                                <Dropdown.Item>Something else here</Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item>Separated link</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "200px" }}>
                                            <code>
                                                <DarkDropdownExample />
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
                                <PreviewCardHeader title="Alignment options" />

                                <Card.Body>
                                    <p className="text-muted">Dropdown demo with various <code>dropdown alignment</code> options.</p>
                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap gap-3">
                                            <Dropdown>
                                                <Dropdown.Toggle className='arrow-none' variant="secondary">
                                                    Dropdown <i className="mdi mdi-chevron-down"></i></Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#" active>Menu item</Dropdown.Item>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Dropdown align='end'>
                                                <Dropdown.Toggle variant="secondary" className='arrow-none'>
                                                    Right-aligned menu <i className="mdi mdi-chevron-down"></i></Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#" active>Menu item</Dropdown.Item>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Dropdown align='end'>
                                                <Dropdown.Toggle variant="secondary" className='arrow-none'>
                                                    Left-aligned, right-aligned lg <i className="mdi mdi-chevron-down"></i></Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#" active>Menu item</Dropdown.Item>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Dropdown>
                                                <Dropdown.Toggle variant="secondary" className='arrow-none'>
                                                    Right-aligned, left-aligned lg <i className="mdi mdi-chevron-down"></i></Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#" active>Menu item</Dropdown.Item>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Dropdown drop='start'>
                                                <Dropdown.Toggle variant="secondary" className='arrow-none'>
                                                    Dropstart <i className="mdi mdi-chevron-down"></i></Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#" active>Menu item</Dropdown.Item>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Dropdown drop='end'>
                                                <Dropdown.Toggle variant="secondary" className='arrow-none'>
                                                    Dropend <i className="mdi mdi-chevron-down"></i></Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#" active>Menu item</Dropdown.Item>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Dropdown drop='up'>
                                                <Dropdown.Toggle variant="secondary" className='arrow-none'>
                                                    Dropup <i className="mdi mdi-chevron-down"></i> </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#" active>Menu item</Dropdown.Item>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <AlignDropdownExample />
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
                                <PreviewCardHeader title="Dropdown Options" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>data-bs-offset</code> or <code>data-bs-reference</code> to change the position of the dropdown.</p>

                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap gap-3">

                                            <Dropdown>
                                                <Dropdown.Toggle variant="secondary" className='arrow-none'>
                                                    Dropup <i className="mdi mdi-chevron-down"></i></Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#" active>Action</Dropdown.Item>
                                                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                                                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Dropdown bsPrefix='btn-group'>
                                                <Button variant="secondary">Reference</Button>
                                                <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" className='arrow-none'>
                                                    <span className="visually-hidden">Toggle Dropdown</span>
                                                    <i className="mdi mdi-chevron-down"></i>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <OptionDropdownExample />
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
                                <PreviewCardHeader title="Auto Close Behavior" />

                                <Card.Body>
                                    <p className="text-muted">By default, the dropdown menu is closed when clicking inside or outside the dropdown menu. You can use the <code>autoClose</code> option to change this behavior of the dropdown.</p>
                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap gap-3">
                                            <Dropdown>
                                                <Dropdown.Toggle variant="light" className='arrow-none'>
                                                    Default dropdown <i className="mdi mdi-chevron-down"></i>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Dropdown autoClose='outside'>
                                                <Dropdown.Toggle variant="light" className='arrow-none'>
                                                    Clickable outside <i className="mdi mdi-chevron-down"></i>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Dropdown autoClose='inside'>
                                                <Dropdown.Toggle variant="light" className='arrow-none'>
                                                    Clickable inside <i className="mdi mdi-chevron-down"></i>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Dropdown autoClose={false}>
                                                <Dropdown.Toggle variant="light" className='arrow-none'>
                                                    Manual close <i className="mdi mdi-chevron-down"></i>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                    <Dropdown.Item href="#">Menu item</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <AutoCloseDropdownExample />
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
                                <PreviewCardHeader title="Dropdown Menu Item Color" />

                                <Card.Body>
                                    <p className="text-muted">Example of dropdown menu and dropdown item color.</p>
                                    <div className="live-preview">
                                        <Row>
                                            <Col xxl={3}>
                                                <div>
                                                    <h6 className="font-size-13 mb-3">Dropdown Menu Success link example</h6>
                                                    <div className="clearfix">
                                                        <div className="dropdown-menu d-inline-block position-relative dropdownmenu-success" style={{ zIndex: "1" }}>
                                                            <Link className="dropdown-item" href="#">Action</Link>
                                                            <Link className="dropdown-item" href="#">Another action</Link>
                                                            <Link className="dropdown-item active" href="#">Something else here</Link>
                                                            <div className="dropdown-divider"></div>
                                                            <Link className="dropdown-item" href="#">Separated link</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col lg={9}>
                                                <div className="mt-lg-0 mt-3">
                                                    <h6 className="font-size-13 mb-0">Dropdown Menu link Color example</h6>
                                                    <div>
                                                        <Row>
                                                            <Col lg={4} sm={6}>
                                                                <div className="mt-3">
                                                                    <p className="font-size-13 mb-2">Dropdown menu Primary link</p>
                                                                    <Dropdown>
                                                                        <Dropdown.Toggle variant="primary" className='arrow-none'>
                                                                            Primary <i className="mdi mdi-chevron-down"></i>
                                                                        </Dropdown.Toggle>

                                                                        <Dropdown.Menu className='dropdownmenu-primary'>
                                                                            <Dropdown.Item href="#"> Action</Dropdown.Item>
                                                                            <Dropdown.Item href="#">Another action</Dropdown.Item>
                                                                            <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                                                            <Dropdown.Divider />
                                                                            <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </div>
                                                            </Col>
                                                            <Col lg={4} sm={6}>
                                                                <div className="mt-3">
                                                                    <p className="font-size-13 mb-2">Dropdown menu Secondary link</p>
                                                                    <Dropdown>
                                                                        <Dropdown.Toggle variant="secondary" className='arrow-none'>
                                                                            Sacondary <i className="mdi mdi-chevron-down"></i>
                                                                        </Dropdown.Toggle>

                                                                        <Dropdown.Menu className='dropdownmenu-secondary'>
                                                                            <Dropdown.Item href="#"> Action</Dropdown.Item>
                                                                            <Dropdown.Item href="#">Another action</Dropdown.Item>
                                                                            <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                                                            <Dropdown.Divider />
                                                                            <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </div>
                                                            </Col>
                                                            <Col lg={4} sm={6}>
                                                                <div className="mt-3">
                                                                    <p className="font-size-13 mb-2">Dropdown menu Success link</p>
                                                                    <Dropdown>
                                                                        <Dropdown.Toggle variant="success" className='arrow-none'>
                                                                            Success <i className="mdi mdi-chevron-down"></i>
                                                                        </Dropdown.Toggle>

                                                                        <Dropdown.Menu className='dropdownmenu-success'>
                                                                            <Dropdown.Item href="#"> Action</Dropdown.Item>
                                                                            <Dropdown.Item href="#">Another action</Dropdown.Item>
                                                                            <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                                                            <Dropdown.Divider />
                                                                            <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </div>
                                                            </Col>
                                                            <Col lg={4} sm={6}>
                                                                <div className="mt-3">
                                                                    <p className="font-size-13 mb-2">Dropdown menu Warning link</p>
                                                                    <Dropdown>
                                                                        <Dropdown.Toggle variant='warning' className='arrow-none'>
                                                                            Warning <i className="mdi mdi-chevron-down"></i>
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu className="dropdownmenu-warning">
                                                                            <Dropdown.Item>Action</Dropdown.Item>
                                                                            <Dropdown.Item>Another action</Dropdown.Item>
                                                                            <Dropdown.Item>Something else here</Dropdown.Item>
                                                                            <Dropdown.Divider />
                                                                            <Dropdown.Item>Separated link</Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </div>
                                                            </Col>
                                                            <Col lg={4} sm={6}>
                                                                <div className="mt-3">
                                                                    <p className="font-size-13 mb-2">Dropdown menu Info link</p>
                                                                    <Dropdown>
                                                                        <Dropdown.Toggle variant='info' className='arrow-none'>
                                                                            Info <i className="mdi mdi-chevron-down"></i>
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu className="dropdownmenu-info">
                                                                            <Dropdown.Item>Action</Dropdown.Item>
                                                                            <Dropdown.Item>Another action</Dropdown.Item>
                                                                            <Dropdown.Item>Something else here</Dropdown.Item>
                                                                            <Dropdown.Divider />
                                                                            <Dropdown.Item>Separated link</Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </div>
                                                            </Col>
                                                            <Col lg={4} sm={6}>
                                                                <div className="mt-3">
                                                                    <p className="font-size-13 mb-2">Dropdown menu Danger link</p>
                                                                    <Dropdown>
                                                                        <Dropdown.Toggle variant='danger' className='arrow-none'>
                                                                            Danger <i className="mdi mdi-chevron-down"></i>
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu className="dropdownmenu-danger">
                                                                            <Dropdown.Item>Action</Dropdown.Item>
                                                                            <Dropdown.Item>Another action</Dropdown.Item>
                                                                            <Dropdown.Item>Something else here</Dropdown.Item>
                                                                            <Dropdown.Divider />
                                                                            <Dropdown.Item>Separated link</Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <MenuItemDropdownExample />
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
                                <PreviewCardHeader title="Menu Content" />

                                <Card.Body>
                                    <p className="text-muted">Example of dropdown menu containing <code>Headers, Text and Forms</code> content.</p>
                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap gap-2">

                                            <Dropdown>
                                                <Dropdown.Toggle variant='primary' className='arrow-none'>
                                                    Header <i className="mdi mdi-chevron-down"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <div className="dropdown-header noti-title">
                                                        <h5 className="font-size-13 text-muted text-truncate mb-0">Welcome Jessie!</h5>
                                                    </div>
                                                    <Dropdown.Item>Action</Dropdown.Item>
                                                    <Dropdown.Item>Another action</Dropdown.Item>
                                                    <Dropdown.Item>Something else here</Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item>Separated link</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>


                                            <Dropdown>
                                                <Dropdown.Toggle variant='success' className='arrow-none'>
                                                    Text <i className="mdi mdi-chevron-down"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="dropdown-menu-md p-3">
                                                    <p>
                                                        Some example text that's free-flowing within the dropdown menu.
                                                    </p>
                                                    <p className="mb-0">
                                                        And this is more example text.
                                                    </p>
                                                </Dropdown.Menu>
                                            </Dropdown>


                                            <ButtonGroup>
                                                <Dropdown>
                                                    <Dropdown.Toggle className="btn btn-light arrow-none" >
                                                        Forms <i className="mdi mdi-chevron-down"></i>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="dropdown-menu-md p-4">
                                                        <form>
                                                            <div className="mb-2">
                                                                <Form.Label className="form-label" htmlFor="exampleDropdownFormEmail">Email address</Form.Label>
                                                                <Form.Control type="email" className="form-control" id="exampleDropdownFormEmail" placeholder="email@example.com" />
                                                            </div>
                                                            <div className="mb-2">
                                                                <Form.Label className="form-label" htmlFor="exampleDropdownFormPassword">Password</Form.Label>
                                                                <Form.Control type="password" className="form-control" id="exampleDropdownFormPassword" placeholder="Password" />
                                                            </div>
                                                            <div className="mb-2">
                                                                <div className="form-check custom-checkbox">
                                                                    <Form.Check.Input type="checkbox" className="form-check-input" id="rememberdropdownCheck" />
                                                                    <Form.Check.Label className="form-check-label" htmlFor="rememberdropdownCheck">Remember me</Form.Check.Label>
                                                                </div>
                                                            </div>
                                                            <Button type="submit" className='bg-primary'>Sign in</Button>
                                                        </form>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </ButtonGroup>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <MenuContentDropdownExample />
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
                                <PreviewCardHeader title="Notifications" />
                                <Card.Body>
                                    <p className="text-muted">Dropdown with notification containing multiple tabs.</p>
                                    <div className="live-preview">
                                        <Row className="g-3">
                                            <Col xxl={3} lg={5} md={6}>
                                                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 d-inline-block position-relative w-100" aria-labelledby="page-header-notifications-dropdown" style={{ zIndex: "1" }}>
                                                    <Tab.Container defaultActiveKey="1" >
                                                        <div className="dropdown-head bg-primary bg-pattern rounded-top">
                                                            <div className="p-3">
                                                                <Row className="align-items-center">
                                                                    <Col>
                                                                        <h6 className="m-0 fs-16 fw-semibold text-white"> Notifications </h6>
                                                                    </Col>
                                                                    <div className="col-auto dropdown-tabs">
                                                                        <span className="badge bg-light-subtle text-body fs-13"> 4 New</span>
                                                                    </div>
                                                                </Row>
                                                            </div>

                                                            <div className="px-2 pt-2">
                                                                <Nav className="dropdown-tabs nav-tabs-custom">
                                                                    <Nav.Item>
                                                                        <Nav.Link eventKey="1">
                                                                            All (4)
                                                                        </Nav.Link>
                                                                    </Nav.Item>
                                                                    <Nav.Item>
                                                                        <Nav.Link eventKey="2" >
                                                                            Messages
                                                                        </Nav.Link>
                                                                    </Nav.Item>
                                                                    <Nav.Item>
                                                                        <Nav.Link eventKey="3">
                                                                            Alerts
                                                                        </Nav.Link>
                                                                    </Nav.Item>
                                                                </Nav>
                                                            </div>
                                                        </div>

                                                        <Tab.Content>
                                                            <Tab.Pane eventKey="1" id="all-noti-tab1" className="py-2 ps-2">
                                                                <SimpleBar style={{ maxHeight: "300px" }} className="pe-2">
                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <div className="flex-shrink-0 avatar-xs me-3">
                                                                                <span className="avatar-title bg-info-subtle text-info rounded-circle fs-16">
                                                                                    <i className="bx bx-badge-check"></i>
                                                                                </span>
                                                                            </div>
                                                                            <div className="flex-grow-1">
                                                                                <h6 className="mt-0 mb-2 lh-base">Your <b>Elite</b> author Graphic Optimization <span className="text-secondary">reward</span> is ready!</h6>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> Just 30 sec ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <img src={avatar2}
                                                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                                            <div className="flex-grow-1">
                                                                                <Link href="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6></Link>
                                                                                <div className="fs-13 text-muted">
                                                                                    <p className="mb-1">Answered to your comment on the cash flow forecast's graph 🔔.</p>
                                                                                </div>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> 48 min ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <div className="flex-shrink-0 avatar-xs me-3">
                                                                                <span className="avatar-title bg-danger-subtle text-danger rounded-circle fs-16">
                                                                                    <i className='bx bx-message-square-dots' ></i>
                                                                                </span>
                                                                            </div>
                                                                            <div className="flex-grow-1">
                                                                                <h6 className="mt-0 mb-2 fs-13 lh-base">You have received <b className="text-success">20</b> new messages in the conversation</h6>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <img src={avatar8}
                                                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                                            <div className="flex-grow-1">
                                                                                <Link href="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Maureen Gibson</h6></Link>
                                                                                <div className="fs-13 text-muted">
                                                                                    <p className="mb-1">We talked about a project on linkedin.</p>
                                                                                </div>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> 4 hrs ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="my-3 text-center">
                                                                        <button type="button" className="btn btn-soft-success waves-effect waves-light">View All Notifications <i className="ri-arrow-right-line align-middle"></i></button>
                                                                    </div>
                                                                </SimpleBar>
                                                            </Tab.Pane>

                                                            <Tab.Pane eventKey="2" id="messages-tab1" className="py-2 ps-2">
                                                                <SimpleBar style={{ maxHeight: "300px" }} className="pe-2">
                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <img src={avatar3}
                                                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                                            <div className="flex-grow-1">
                                                                                <Link href="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">James Lemire</h6></Link>
                                                                                <div className="fs-13 text-muted">
                                                                                    <p className="mb-1">We talked about a project on linkedin.</p>
                                                                                </div>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> 30 min ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <img src={avatar2}
                                                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                                            <div className="flex-grow-1">
                                                                                <Link href="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6></Link>
                                                                                <div className="fs-13 text-muted">
                                                                                    <p className="mb-1">Answered to your comment on the cash flow forecast's graph 🔔.</p>
                                                                                </div>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <img src={avatar6}
                                                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                                            <div className="flex-grow-1">
                                                                                <Link href="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Kenneth Brown</h6></Link>
                                                                                <div className="fs-13 text-muted">
                                                                                    <p className="mb-1">Mentionned you in his comment on 📃 invoice #12501.</p>
                                                                                </div>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> 10 hrs ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <img src={avatar8}
                                                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                                            <div className="flex-grow-1">
                                                                                <Link href="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Maureen Gibson</h6></Link>
                                                                                <div className="fs-13 text-muted">
                                                                                    <p className="mb-1">We talked about a project on linkedin.</p>
                                                                                </div>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> 3 days ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="my-3 text-center">
                                                                        <button type="button" className="btn btn-soft-success waves-effect waves-light">View All Messages <i className="ri-arrow-right-line align-middle"></i></button>
                                                                    </div>
                                                                </SimpleBar>
                                                            </Tab.Pane>

                                                            <Tab.Pane eventKey="3" id="alerts-tab1" className="p-4">
                                                                <div className="w-50 pt-3 mx-auto">
                                                                    <img src={bell} className="img-fluid" alt="user-pic" />
                                                                </div>
                                                                <div className="text-center pb-5 mt-2">
                                                                    <h6 className="fs-18 fw-semibold lh-base">Hey! You have no any notifications </h6>
                                                                </div>
                                                            </Tab.Pane>
                                                        </Tab.Content>
                                                    </Tab.Container>
                                                </div>
                                            </Col>

                                            <Col xxl={3} lg={5} md={6}>
                                                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 d-inline-block position-relative w-100" aria-labelledby="page-header-notifications-dropdown" style={{ zIndex: "1" }}>
                                                <Tab.Container defaultActiveKey="1" >
                                                        <div className="dropdown-head bg-success bg-pattern rounded-top">
                                                            <div className="p-3">
                                                                <Row className="align-items-center">
                                                                    <Col>
                                                                        <h6 className="m-0 fs-16 fw-semibold text-white"> Notifications </h6>
                                                                    </Col>
                                                                    <div className="col-auto dropdown-tabs">
                                                                        <span className="badge bg-light-subtle text-body fs-13"> 4 New</span>
                                                                    </div>
                                                                </Row>
                                                            </div>

                                                            <div className="px-2 pt-2">
                                                                <Nav className="dropdown-tabs nav-tabs-custom">
                                                                    <Nav.Item>
                                                                        <Nav.Link eventKey="1">
                                                                            All (4)
                                                                        </Nav.Link>
                                                                    </Nav.Item>
                                                                    <Nav.Item>
                                                                        <Nav.Link eventKey="2" >
                                                                            Messages
                                                                        </Nav.Link>
                                                                    </Nav.Item>
                                                                    <Nav.Item>
                                                                        <Nav.Link eventKey="3">
                                                                            Alerts
                                                                        </Nav.Link>
                                                                    </Nav.Item>
                                                                </Nav>
                                                            </div>
                                                        </div>

                                                        <Tab.Content>
                                                            <Tab.Pane eventKey="1" id="all-noti-tab1" className="py-2 ps-2">
                                                                <SimpleBar style={{ maxHeight: "300px" }} className="pe-2">
                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <div className="flex-shrink-0 avatar-xs me-3">
                                                                                <span className="avatar-title bg-info-subtle text-info rounded-circle fs-16">
                                                                                    <i className="bx bx-badge-check"></i>
                                                                                </span>
                                                                            </div>
                                                                            <div className="flex-grow-1">
                                                                                <h6 className="mt-0 mb-2 lh-base">Your <b>Elite</b> author Graphic Optimization <span className="text-secondary">reward</span> is ready!</h6>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> Just 30 sec ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <img src={avatar2}
                                                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                                            <div className="flex-grow-1">
                                                                                <Link href="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6></Link>
                                                                                <div className="fs-13 text-muted">
                                                                                    <p className="mb-1">Answered to your comment on the cash flow forecast's graph 🔔.</p>
                                                                                </div>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> 48 min ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <div className="flex-shrink-0 avatar-xs me-3">
                                                                                <span className="avatar-title bg-danger-subtle text-danger rounded-circle fs-16">
                                                                                    <i className='bx bx-message-square-dots' ></i>
                                                                                </span>
                                                                            </div>
                                                                            <div className="flex-grow-1">
                                                                                <h6 className="mt-0 mb-2 fs-13 lh-base">You have received <b className="text-success">20</b> new messages in the conversation</h6>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <img src={avatar8}
                                                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                                            <div className="flex-grow-1">
                                                                                <Link href="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Maureen Gibson</h6></Link>
                                                                                <div className="fs-13 text-muted">
                                                                                    <p className="mb-1">We talked about a project on linkedin.</p>
                                                                                </div>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> 4 hrs ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="my-3 text-center">
                                                                        <button type="button" className="btn btn-soft-success waves-effect waves-light">View All Notifications <i className="ri-arrow-right-line align-middle"></i></button>
                                                                    </div>
                                                                </SimpleBar>
                                                            </Tab.Pane>

                                                            <Tab.Pane eventKey="2" id="messages-tab1" className="py-2 ps-2">
                                                                <SimpleBar style={{ maxHeight: "300px" }} className="pe-2">
                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <img src={avatar3}
                                                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                                            <div className="flex-grow-1">
                                                                                <Link href="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">James Lemire</h6></Link>
                                                                                <div className="fs-13 text-muted">
                                                                                    <p className="mb-1">We talked about a project on linkedin.</p>
                                                                                </div>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> 30 min ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <img src={avatar2}
                                                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                                            <div className="flex-grow-1">
                                                                                <Link href="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6></Link>
                                                                                <div className="fs-13 text-muted">
                                                                                    <p className="mb-1">Answered to your comment on the cash flow forecast's graph 🔔.</p>
                                                                                </div>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <img src={avatar6}
                                                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                                            <div className="flex-grow-1">
                                                                                <Link href="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Kenneth Brown</h6></Link>
                                                                                <div className="fs-13 text-muted">
                                                                                    <p className="mb-1">Mentionned you in his comment on 📃 invoice #12501.</p>
                                                                                </div>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> 10 hrs ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <img src={avatar8}
                                                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                                            <div className="flex-grow-1">
                                                                                <Link href="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Maureen Gibson</h6></Link>
                                                                                <div className="fs-13 text-muted">
                                                                                    <p className="mb-1">We talked about a project on linkedin.</p>
                                                                                </div>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> 3 days ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="my-3 text-center">
                                                                        <button type="button" className="btn btn-soft-success waves-effect waves-light">View All Messages <i className="ri-arrow-right-line align-middle"></i></button>
                                                                    </div>
                                                                </SimpleBar>
                                                            </Tab.Pane>

                                                            <Tab.Pane eventKey="3" id="alerts-tab1" className="p-4">
                                                                <div className="w-50 pt-3 mx-auto">
                                                                    <img src={bell} className="img-fluid" alt="user-pic" />
                                                                </div>
                                                                <div className="text-center pb-5 mt-2">
                                                                    <h6 className="fs-18 fw-semibold lh-base">Hey! You have no any notifications </h6>
                                                                </div>
                                                            </Tab.Pane>
                                                        </Tab.Content>
                                                    </Tab.Container>
                                                </div>
                                            </Col>

                                            <Col xxl={3} lg={5} md={6}>
                                                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 d-inline-block position-relative w-100" aria-labelledby="page-header-notifications-dropdown" style={{ zIndex: "1" }}>
                                                    <Tab.Container defaultActiveKey="7">
                                                        <div className="dropdown-head bg-secondary bg-pattern rounded-top">
                                                            <div className="p-3">
                                                                <Row className="align-items-center">
                                                                    <Col>
                                                                        <h6 className="m-0 fs-16 fw-semibold text-white"> Notifications </h6>
                                                                    </Col>
                                                                    <div className="col-auto dropdown-tabs">
                                                                        <span className="badge bg-light-subtle text-body fs-13"> 4 New</span>
                                                                    </div>
                                                                </Row>
                                                            </div>

                                                            <div className="px-2 pt-2">
                                                                <Nav className="dropdown-tabs nav-tabs-custom">
                                                                    <Nav.Item>
                                                                        <Nav.Link eventKey="7" >
                                                                            All (4)
                                                                        </Nav.Link>
                                                                    </Nav.Item>
                                                                    <Nav.Item>
                                                                        <Nav.Link eventKey="8">
                                                                            Messages
                                                                        </Nav.Link>
                                                                    </Nav.Item>
                                                                    <Nav.Item>
                                                                        <Nav.Link eventKey="9">
                                                                            Alerts
                                                                        </Nav.Link>
                                                                    </Nav.Item>
                                                                </Nav>
                                                            </div>
                                                        </div>

                                                        <Tab.Content>
                                                            <Tab.Pane eventKey="7" className="py-2 ps-2">
                                                                <SimpleBar style={{ maxHeight: "300px" }} className="pe-2">
                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <div className="flex-shrink-0 avatar-xs me-3">
                                                                                <span className="avatar-title bg-info-subtle text-info rounded-circle fs-16">
                                                                                    <i className="bx bx-badge-check"></i>
                                                                                </span>
                                                                            </div>
                                                                            <div className="flex-grow-1">
                                                                                <h6 className="mt-0 mb-2 lh-base">Your <b>Elite</b> author Graphic Optimization <span className="text-secondary">reward</span> is ready!</h6>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> Just 30 sec ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <img src={avatar2}
                                                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                                            <div className="flex-grow-1">
                                                                                <Link href="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6></Link>
                                                                                <div className="fs-13 text-muted">
                                                                                    <p className="mb-1">Answered to your comment on the cash flow forecast's graph 🔔.</p>
                                                                                </div>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> 48 min ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <div className="flex-shrink-0 avatar-xs me-3">
                                                                                <span className="avatar-title bg-danger-subtle text-danger rounded-circle fs-16">
                                                                                    <i className='bx bx-message-square-dots' ></i>
                                                                                </span>
                                                                            </div>
                                                                            <div className="flex-grow-1">
                                                                                <h6 className="mt-0 mb-2 fs-13 lh-base">You have received <b className="text-success">20</b> new messages in the conversation</h6>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <img src={avatar8}
                                                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                                            <div className="flex-grow-1">
                                                                                <Link href="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Maureen Gibson</h6></Link>
                                                                                <div className="fs-13 text-muted">
                                                                                    <p className="mb-1">We talked about a project on linkedin.</p>
                                                                                </div>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> 4 hrs ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="my-3 text-center">
                                                                        <Button variant="success" className="btn btn-soft-success">View All Notifications <i className="ri-arrow-right-line align-middle"></i></Button>
                                                                    </div>
                                                                </SimpleBar>
                                                            </Tab.Pane>

                                                            <Tab.Pane eventKey="8" className="py-2 ps-2">
                                                                <SimpleBar style={{ maxHeight: "300px" }} className="pe-2">
                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <img src={avatar3}
                                                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                                            <div className="flex-grow-1">
                                                                                <Link href="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">James Lemire</h6></Link>
                                                                                <div className="fs-13 text-muted">
                                                                                    <p className="mb-1">We talked about a project on linkedin.</p>
                                                                                </div>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> 30 min ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <img src={avatar2}
                                                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                                            <div className="flex-grow-1">
                                                                                <Link href="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6></Link>
                                                                                <div className="fs-13 text-muted">
                                                                                    <p className="mb-1">Answered to your comment on the cash flow forecast's graph 🔔.</p>
                                                                                </div>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <img src={avatar6}
                                                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                                            <div className="flex-grow-1">
                                                                                <Link href="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Kenneth Brown</h6></Link>
                                                                                <div className="fs-13 text-muted">
                                                                                    <p className="mb-1">Mentionned you in his comment on 📃 invoice #12501.</p>
                                                                                </div>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> 10 hrs ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="text-reset notification-item d-block dropdown-item">
                                                                        <div className="d-flex">
                                                                            <img src={avatar8}
                                                                                className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                                            <div className="flex-grow-1">
                                                                                <Link href="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Maureen Gibson</h6></Link>
                                                                                <div className="fs-13 text-muted">
                                                                                    <p className="mb-1">We talked about a project on linkedin.</p>
                                                                                </div>
                                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                                    <span><i className="mdi mdi-clock-outline"></i> 3 days ago</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="px-2 fs-16">
                                                                                <Form.Check.Input className="form-check-input" type="checkbox" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="my-3 text-center">
                                                                        <Button variant="success" className="btn btn-soft-success">View All Messages <i className="ri-arrow-right-line align-middle"></i></Button>
                                                                    </div>
                                                                </SimpleBar>
                                                            </Tab.Pane>

                                                            <Tab.Pane eventKey="9" className="p-4">
                                                                <div className="w-50 pt-3 mx-auto">
                                                                    <img src={bell} className="img-fluid" alt="user-pic" />
                                                                </div>
                                                                <div className="text-center pb-5 mt-2">
                                                                    <h6 className="fs-18 fw-semibold lh-base">Hey! You have no any notifications </h6>
                                                                </div>
                                                            </Tab.Pane>
                                                        </Tab.Content>
                                                    </Tab.Container>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <NotificationDropdownExample />
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
UiDropdowns.layout = (page: any) => <Layout children={page} />
export default UiDropdowns;
