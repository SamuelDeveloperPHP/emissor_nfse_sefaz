import React from 'react';
import { Card, Col, Container, Form, ListGroup, ListGroupItem, Row, } from 'react-bootstrap';

import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import SimpleBar from 'simplebar-react';
// Import Content
import UiContent from '../../../Components/Common/UiContent';
//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';

// Import Images
import avatar1 from "../../../../images/users/avatar-1.jpg";
import avatar2 from "../../../../images/users/avatar-2.jpg";
import avatar3 from "../../../../images/users/avatar-3.jpg";
import avatar4 from "../../../../images/users/avatar-4.jpg";

import { DefaultListExample, ActiveItemExample, DisabledItemExample, ListlinkExample, ListButtonExample, FlushListExample, HorizontalListExample, ContextualClassExample, ContextualLinkExample, ColoredListExample, CustomContentExample, ListBadgeExample, ListCheckboxExample, ListRadioExample, ListIconExample, ListNumberedExample, CustomListExample } from './UiListCode';
import { Head, Link } from '@inertiajs/react';
import Layout from '../../../Layouts';


const UiList = () => {
    return (
        <React.Fragment>
            <Head title='List | Velzon - React Admin & Dashboard Template'/>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="List" pageTitle="Base UI" />
                    <Row>
                        <Col xxl={4} xl={6}>
                            <Card>
                                <PreviewCardHeader title="Default List" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>ListGroup</code> attribute in an unordered list and <code>ListGroupItem</code> attribute to create a default list group.</p>
                                    <div className="live-preview">
                                        <ListGroup>
                                            <ListGroupItem><i className="ri-bill-line align-middle me-2"></i> Send the billing agreement</ListGroupItem>
                                            <ListGroupItem><i className="ri-file-copy-2-line align-middle me-2"></i>Send over all the documentation.</ListGroupItem>
                                            <ListGroupItem><i className="ri-question-answer-line align-middle me-2"></i>Meeting with daron to review the intake form</ListGroupItem>
                                            <ListGroupItem><i className="ri-secure-payment-line align-middle me-2"></i>Check uikings theme and give customer support</ListGroupItem>
                                        </ListGroup>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <DefaultListExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>


                        <Col xxl={4} xl={6}>
                            <Card>
                                <PreviewCardHeader title="Active Item" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>active</code> attribute to <code>ListGroupItem</code> to indicate the current active selection.</p>
                                    <div className="live-preview">
                                        <ListGroup>
                                            <ListGroupItem active>Send the billing agreement</ListGroupItem>
                                            <ListGroupItem>Send over all the documentation.</ListGroupItem>
                                            <ListGroupItem>Meeting with daron to review the intake form</ListGroupItem>
                                            <ListGroupItem>Check uikings theme and give customer support</ListGroupItem>
                                            <ListGroupItem>Start making a presentation</ListGroupItem>
                                        </ListGroup>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <ActiveItemExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>


                        <Col xxl={4} xl={6}>
                            <Card>
                                <PreviewCardHeader title="Disabled Items" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>disabled</code> attribute to <code>ListGroupItem</code> to make it <em>appear</em> disabled.</p>
                                    <div className="live-preview">
                                        <ListGroup>
                                            <ListGroupItem disabled>
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-shrink-0">
                                                        <img src={avatar1} alt="" className="avatar-xs rounded-circle" />
                                                    </div>
                                                    <div className="flex-grow-1 ms-2">
                                                        James Ballard
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-shrink-0">
                                                        <img src={avatar2} alt="" className="avatar-xs rounded-circle" />
                                                    </div>
                                                    <div className="flex-grow-1 ms-2">
                                                        Nancy Martino
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-shrink-0">
                                                        <img src={avatar3} alt="" className="avatar-xs rounded-circle" />
                                                    </div>
                                                    <div className="flex-grow-1 ms-2">
                                                        Henry Baird
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-shrink-0">
                                                        <img src={avatar3} alt="" className="avatar-xs rounded-circle" />
                                                    </div>
                                                    <div className="flex-grow-1 ms-2">
                                                        Erica Kernan
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                        </ListGroup>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "215px" }}>
                                            <code>
                                                <DisabledItemExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>


                        <Col xxl={4} xl={6}>
                            <Card>
                                <PreviewCardHeader title="List with Link" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>as="a"</code> to create actionable list group items with hover, disabled, and active states by adding list-group-item-action.</p>
                                    <div className="live-preview">
                                        <ListGroup className="list-group-fill-success">
                                            <ListGroupItem as="a" href="#" className="list-group-item-action active"><i className="ri-download-2-fill align-middle me-2"></i>Category Download</ListGroupItem>
                                            <ListGroupItem as="a" href="#" className="list-group-item-action"><i className="ri-shield-check-line align-middle me-2"></i>Security Access</ListGroupItem>
                                            <ListGroupItem as="a" href="#" className="list-group-item-action"><i className="ri-database-2-line align-middle me-2"></i>Storage folder</ListGroupItem>
                                            <ListGroupItem as="a" href="#" className="list-group-item-action"><i className="ri-notification-3-line align-middle me-2"></i>Push Notification</ListGroupItem>
                                            <ListGroupItem as="a" href="#" className="list-group-item-action disabled" tabIndex={1}><i className="ri-moon-fill align-middle me-2"></i>Dark Mode</ListGroupItem>
                                        </ListGroup>
                                    </div>


                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <ListlinkExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>


                        <Col xxl={4} xl={6}>
                            <Card>
                                <PreviewCardHeader title="List with Button" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>as="button"</code> to create actionable list group items with hover, disabled, and active states by adding list-group-item-action.</p>
                                    <div className="live-preview">
                                        <ListGroup>
                                            <ListGroupItem as="button" className="list-group-item-action active"><i className="ri-reply-fill align-middle me-2"></i>Reply</ListGroupItem>
                                            <ListGroupItem as="button" className="list-group-item-action"><i className="ri-share-forward-fill align-middle me-2"></i>Forward Message</ListGroupItem>
                                            <ListGroupItem as="button" className="list-group-item-action"><i className="ri-equalizer-line align-middle me-2"></i>Filter Message</ListGroupItem>
                                            <ListGroupItem as="button" className="list-group-item-action"><i className="ri-delete-bin-5-line align-middle me-2"></i>Delete Message</ListGroupItem>
                                            <ListGroupItem as="button" className="list-group-item-action" disabled><i className="ri-forbid-line align-middle me-2"></i>Block "Mark Spencer</ListGroupItem>
                                        </ListGroup>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <ListButtonExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>


                        <Col xxl={4} xl={6}>
                            <Card>
                                <PreviewCardHeader title="Flush List" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>flush</code> attribute to ListGroup to remove some borders and rounded corners to render list group items.</p>
                                    <div className="live-preview">
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>Send the billing agreement</ListGroup.Item>
                                        <ListGroup.Item>Send over all the documentation.</ListGroup.Item>
                                        <ListGroup.Item>Meeting with daron to review the intake form</ListGroup.Item>
                                        <ListGroup.Item>Check uikings theme and give customer support</ListGroup.Item>
                                        <ListGroup.Item>Start making a presentation</ListGroup.Item>
                                    </ListGroup>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <FlushListExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>


                    <Row>
                        <Col xl={12}>
                            <Card>
                                <PreviewCardHeader title="Horizontal List" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>horizontal</code> attribute to ListGroup to change the layout of list group items from vertical to horizontal across all breakpoints.</p>
                                    <div className="live-preview">
                                        <ListGroup className="mb-3" horizontal>
                                            <ListGroupItem>Inbox</ListGroupItem>
                                            <ListGroupItem>Work</ListGroupItem>
                                            <ListGroupItem>Shopping</ListGroupItem>
                                        </ListGroup>
                                        <ListGroup className="justify-content-center mb-3" horizontal>
                                            <ListGroupItem>Inbox</ListGroupItem>
                                            <ListGroupItem>Work</ListGroupItem>
                                            <ListGroupItem>Shopping</ListGroupItem>
                                        </ListGroup>
                                        <ListGroup className="justify-content-end" horizontal>
                                            <ListGroupItem>Inbox</ListGroupItem>
                                            <ListGroupItem>Work</ListGroupItem>
                                            <ListGroupItem>Shopping</ListGroupItem>
                                        </ListGroup>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <HorizontalListExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>


                    <Row>
                        <Col xxl={4} xl={6}>
                            <Card>
                                <PreviewCardHeader title="Contextual Classes" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>variant="Required color"</code> to style list items with a stateful background and color.</p>
                                    <div className="live-preview">
                                        <ListGroup>
                                            <ListGroupItem >Dapibus ac facilisis in</ListGroupItem>
                                            <ListGroupItem variant="primary">A simple primary list group item</ListGroupItem>
                                            <ListGroupItem variant="secondary">A simple secondary list group item</ListGroupItem>
                                            <ListGroupItem variant="success">A simple success list group item</ListGroupItem>
                                            <ListGroupItem variant="danger">A simple danger list group item</ListGroupItem>
                                            <ListGroupItem variant="warning">A simple warning list group item</ListGroupItem>
                                            <ListGroupItem variant="info">A simple info list group item</ListGroupItem>
                                            <ListGroupItem variant="light">A simple light list group item</ListGroupItem>
                                            <ListGroupItem variant="dark">A simple dark list group item</ListGroupItem>
                                        </ListGroup>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <ContextualClassExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>


                        <Col xxl={4} xl={6}>
                            <Card>
                                <PreviewCardHeader title="Contextual Classes with Link" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>as="a" href="#"</code> to add link. Note the addition of the hover styles here not present in the previous example.</p>
                                    <div className="live-preview">
                                        <ListGroup>
                                            <ListGroupItem as="a" href="#" className="list-group-item-action">A simple default list group item</ListGroupItem>
                                            <ListGroupItem variant="primary" as="a" href="#" className="list-group-item-action">A simple primary list group item</ListGroupItem>
                                            <ListGroupItem variant="secondary" as="a" href="#" className="list-group-item-action">A simple secondary list group item</ListGroupItem>
                                            <ListGroupItem variant="success" as="a" href="#" className="list-group-item-action">A simple success list group item</ListGroupItem>
                                            <ListGroupItem variant="danger" as="a" href="#" className="list-group-item-action">A simple danger list group item</ListGroupItem>
                                            <ListGroupItem variant="warning" as="a" href="#" className="list-group-item-action">A simple warning list group item</ListGroupItem>
                                            <ListGroupItem variant="info" as="a" href="#" className="list-group-item-action">A simple info list group item</ListGroupItem>
                                            <ListGroupItem variant="light" as="a" href="#" className="list-group-item-action">A simple light list group item</ListGroupItem>
                                            <ListGroupItem variant="dark" as="a" href="#" className="list-group-item-action">A simple dark list group item</ListGroupItem>
                                        </ListGroup>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <ContextualLinkExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>


                        <Col xxl={4} xl={6}>
                            <Card>
                                <PreviewCardHeader title="Colored Lists" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>list-group-fill-</code> with modifier class to style list items with a stateful background and color.</p>
                                    <div className="live-preview">
                                        <ListGroup>
                                            <ListGroupItem >Dapibus ac facilisis in</ListGroupItem>
                                            <ListGroupItem className="list-group-fill-primary">A simple primary list group item</ListGroupItem>
                                            <ListGroupItem className="list-group-fill-secondary">A simple secondary list group item</ListGroupItem>
                                            <ListGroupItem className="list-group-fill-success">A simple success list group item</ListGroupItem>
                                            <ListGroupItem className="list-group-fill-danger">A simple danger list group item</ListGroupItem>
                                            <ListGroupItem className="list-group-fill-warning">A simple warning list group item</ListGroupItem>
                                            <ListGroupItem className="list-group-fill-info">A simple info list group item</ListGroupItem>
                                            <ListGroupItem className="list-group-fill-light">A simple light list group item</ListGroupItem>
                                            <ListGroupItem className="list-group-fill-dark">A simple dark list group item</ListGroupItem>
                                        </ListGroup>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <ColoredListExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>


                    <Row>
                        <Col xl={12}>
                            <Card>
                                <PreviewCardHeader title="Custom Content" />

                                <Card.Body>
                                    <p className="text-muted">Add nearly any HTML within, even for linked list groups like the one below, with the help of <Link href="https://getbootstrap.com/docs/5.1/utilities/flex/">flexbox utilities</Link>.</p>
                                    <div className="live-preview">
                                        <ListGroup>
                                            <ListGroupItem as="a" href="#" className="list-group-item-action active">
                                                <div className="float-end">
                                                    Pending
                                                </div>
                                                <div className="d-flex mb-2 align-items-center">
                                                    <div className="flex-shrink-0">
                                                        <img src={avatar1} alt="" className="avatar-sm rounded-circle" />
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <h5 className="list-title fs-15 mb-1">Charlie Pritchard</h5>
                                                        <p className="list-text mb-0 fs-12">12 min Ago</p>
                                                    </div>
                                                </div>
                                                <p className="list-text mb-0">They all have something to say beyond the words on the page. They can come across as casual or neutral, exotic or graphic. That's why it's important to think about your message, then choose a font that fits. Cosby sweater eu banh mi, qui irure terry richardson ex squid.</p>
                                            </ListGroupItem>
                                            <ListGroupItem as="a" href="#" className="list-group-item-action">
                                                <div className="float-end">
                                                    Pending
                                                </div>
                                                <div className="d-flex mb-2 align-items-center">
                                                    <div className="flex-shrink-0">
                                                        <img src={avatar2} alt="" className="avatar-sm rounded-circle" />
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <h5 className="list-title fs-15 mb-1">Dominic Charlton</h5>
                                                        <p className="list-text mb-0 fs-12">12 min Ago</p>
                                                    </div>
                                                </div>
                                                <p className="list-text mb-0">Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY, art party locavore wolf cliche high life echo park Austin.</p>
                                            </ListGroupItem>
                                            <ListGroupItem as="a" href="#" className="list-group-item-action">
                                                <div className="float-end">
                                                    Rejected
                                                </div>
                                                <div className="d-flex mb-2 align-items-center">
                                                    <div className="flex-shrink-0">
                                                        <img src={avatar3} alt="" className="avatar-sm rounded-circle" />
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <h5 className="list-title fs-15 mb-1">Declan Long</h5>
                                                        <p className="list-text mb-0 fs-12">12 min Ago</p>
                                                    </div>
                                                </div>
                                                <p className="list-text mb-0">Big July earthquakes confound zany experimental vow. My girl wove six dozen plaid jackets before she quit. Six big devils from Japan quickly forgot how to waltz. try again until it looks right, and each assumenda labore aes Homo nostrud organic, assumenda labore aesthetic magna elements, buttons, everything.</p>
                                            </ListGroupItem>
                                            <ListGroupItem as="a" href="#" className="list-group-item-action">
                                                <div className="float-end">
                                                    Successful
                                                </div>
                                                <div className="d-flex mb-2 align-items-center">
                                                    <div className="flex-shrink-0">
                                                        <img src={avatar4} alt="" className="avatar-sm rounded-circle" />
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <h5 className="list-title fs-15 mb-1">Angela Bernier</h5>
                                                        <p className="list-text mb-0 fs-12">5 days Ago</p>
                                                    </div>
                                                </div>
                                                <p className="list-text mb-0">Just like in the image where we talked about using multiple fonts, you can see that the background in this graphic design is blurred. Whenever you put text on top of an image, it’s important that your viewers can understand the text, and sometimes that means applying a gaussian readable.</p>
                                            </ListGroupItem>
                                        </ListGroup>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "300px" }}>
                                            <code>
                                                <CustomContentExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xxl={4} xl={6}>
                            <Card>
                                <PreviewCardHeader title="List with Badges" />
                                <Card.Body>
                                    <p className="text-muted">Use badges to any list group item to show unread counts, activity, and more with the help of some <Link href="https://getbootstrap.com/docs/5.1/utilities/">utilities</Link>.</p>
                                    <div className="live-preview">
                                        <ListGroup>
                                            <ListGroupItem className="d-flex justify-content-between align-items-center">
                                                Send the billing agreement <span className="badge bg-success">High</span>
                                            </ListGroupItem>
                                            <ListGroupItem className="d-flex justify-content-between align-items-center">
                                                Send over all the documentation
                                            </ListGroupItem>
                                            <ListGroupItem className="d-flex justify-content-between align-items-center">
                                                Meeting with daron to review the intake form <span className="badge bg-danger">Low</span>
                                            </ListGroupItem>
                                            <ListGroupItem className="d-flex justify-content-between align-items-center">
                                                Check uikings theme and give customer support <span className="badge bg-secondary">Medium</span>
                                            </ListGroupItem>
                                            <ListGroupItem className="d-flex justify-content-between align-items-center">
                                                Start making a presentation <span className="badge bg-success">High</span>
                                            </ListGroupItem>
                                        </ListGroup>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "200px" }}>
                                            <code>
                                                <ListBadgeExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xxl={4} xl={6}>
                            <Card>
                                <PreviewCardHeader title="List with Checkboxs" />

                                <Card.Body>
                                    <p className="text-muted">Use Bootstrap’s checkboxes within list group items and customize as needed. </p>
                                    <div className="live-preview">
                                        <ListGroup>
                                            <ListGroupItem as="label">
                                                <Form.Check.Input className="form-check-input me-1" type="checkbox" value="" />
                                                Declined Payment
                                            </ListGroupItem>
                                            <ListGroupItem as="label">
                                                <Form.Check.Input className="form-check-input me-1" type="checkbox" value="" defaultChecked />
                                                Delivery Error
                                            </ListGroupItem>
                                            <ListGroupItem as="label">
                                                <Form.Check.Input className="form-check-input me-1" type="checkbox" value="" defaultChecked />
                                                Wrong Amount
                                            </ListGroupItem>
                                            <ListGroupItem as="label">
                                                <Form.Check.Input className="form-check-input me-1" type="checkbox" value="" />
                                                Wrong Address
                                            </ListGroupItem>
                                            <ListGroupItem as="label">
                                                <Form.Check.Input className="form-check-input me-1" type="checkbox" value="" />
                                                Wrong UX/UI Solution
                                            </ListGroupItem>
                                        </ListGroup>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <ListCheckboxExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xxl={4} xl={6}>
                            <Card>
                                <PreviewCardHeader title="List with Radios" />
                                <Card.Body>
                                    <p className="text-muted">Use Bootstrap’s radios within list group items and customize as needed. </p>
                                    <div className="live-preview">
                                        <ListGroup>
                                            <ListGroupItem as="label">
                                                <Form.Check.Input className="form-check-input fs-14 mt-0 align-middle me-1" name="exampleRadios" type="radio" value="" />
                                                Declined Payment
                                            </ListGroupItem>
                                            <ListGroupItem as="label">
                                                <Form.Check.Input className="form-check-input fs-14 mt-0 align-middle me-1" name="exampleRadios" type="radio" value="" defaultChecked />
                                                Delivery Error
                                            </ListGroupItem>
                                            <ListGroupItem as="label">
                                                <Form.Check.Input className="form-check-input fs-14 mt-0 align-middle me-1" name="exampleRadios" type="radio" value="" />
                                                Wrong Amount
                                            </ListGroupItem>
                                            <ListGroupItem as="label">
                                                <Form.Check.Input className="form-check-input fs-14 mt-0 align-middle me-1" name="exampleRadios" type="radio" value="" />
                                                Wrong Address
                                            </ListGroupItem>
                                            <ListGroupItem as="label">
                                                <Form.Check.Input className="form-check-input fs-14 mt-0 align-middle me-1" name="exampleRadios" type="radio" value="" />
                                                Wrong UX/UI Solution
                                            </ListGroupItem>
                                        </ListGroup>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <ListRadioExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xxl={4} xl={6}>
                            <Card>
                                <PreviewCardHeader title="List with Icon" />
                                <Card.Body>
                                    <p className="text-muted">Use icons to any list group item to show icons to list group items.</p>
                                    <div className="live-preview">
                                        <ListGroup>
                                            <ListGroupItem><i className="mdi mdi-check-bold align-middle lh-1 me-2"></i> Send the billing agreement</ListGroupItem>
                                            <ListGroupItem><i className="mdi mdi-check-bold align-middle lh-1 me-2"></i> Send over all the documentation.</ListGroupItem>
                                            <ListGroupItem><i className="mdi mdi-check-bold align-middle lh-1 me-2"></i> Meeting with daron to review the intake form</ListGroupItem>
                                            <ListGroupItem><i className="mdi mdi-check-bold align-middle lh-1 me-2"></i> Check uikings theme and give customer support</ListGroupItem>
                                            <ListGroupItem><i className="mdi mdi-check-bold align-middle lh-1 me-2"></i> Start making a presentation</ListGroupItem>
                                        </ListGroup>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <ListIconExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xxl={4} xl={6}>
                            <Card>
                                <PreviewCardHeader title="List with Numbered" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>list-group-numbered</code> class (optionally use an <code>&lt;ol&gt;</code> element) to show numbered list group items. </p>
                                    <div className="live-preview">
                                        <ListGroup className="list-group-numbered">
                                            <ListGroupItem>Send the billing agreement</ListGroupItem>
                                            <ListGroupItem>Send over all the documentation.</ListGroupItem>
                                            <ListGroupItem>Meeting with daron to review the intake form</ListGroupItem>
                                            <ListGroupItem>Check uikings theme and give customer support</ListGroupItem>
                                            <ListGroupItem>Start making a presentation</ListGroupItem>
                                        </ListGroup>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <ListNumberedExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xxl={4} xl={6}>
                            <Card>
                                <PreviewCardHeader title="Custom Content Lists" />
                                <Card.Body>
                                    <p>Add nearly any HTML within, even for linked list groups like the one below, with the help of <Link href="https://getbootstrap.com/docs/5.1/utilities/flex/">flexbox utilities</Link>.</p>                           <div className="live-preview">
                                        <SimpleBar style={{ maxHeight: "215px" }}>
                                            <ListGroup className="mb-1">
                                                <ListGroupItem>
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-grow-1">
                                                            <div className="d-flex">
                                                                <div className="flex-shrink-0 avatar-xs">
                                                                    <div className="avatar-title bg-danger-subtle text-danger rounded">
                                                                        <i className="ri-netflix-fill"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-shrink-0 ms-2">
                                                                    <h6 className="fs-14 mb-0">Netfilx</h6>
                                                                    <small className="text-muted">2 min Ago</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <span className="text-danger">-$25.50</span>
                                                        </div>
                                                    </div>
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-grow-1">
                                                            <div className="d-flex">
                                                                <div className="flex-shrink-0 avatar-xs">
                                                                    <div className="avatar-title bg-success-subtle text-success rounded">
                                                                        <i className="ri-spotify-fill"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-shrink-0 ms-2">
                                                                    <h6 className="fs-14 mb-0">Spotify</h6>
                                                                    <small className="text-muted">5 days Ago</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <span className="text-success">$48.25</span>
                                                        </div>
                                                    </div>
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-grow-1">
                                                            <div className="d-flex">
                                                                <div className="flex-shrink-0">
                                                                    <img src={avatar2} alt="" className="avatar-xs rounded" />
                                                                </div>
                                                                <div className="flex-shrink-0 ms-2">
                                                                    <h6 className="fs-14 mb-0">Emily Slater</h6>
                                                                    <small className="text-muted">8 days Ago</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <span className="text-success">$354.90</span>
                                                        </div>
                                                    </div>
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-grow-1">
                                                            <div className="d-flex">
                                                                <div className="flex-shrink-0 avatar-xs">
                                                                    <div className="avatar-title bg-secondary-subtle text-secondary rounded">
                                                                        <i className="ri-paypal-fill"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-shrink-0 ms-2">
                                                                    <h6 className="fs-14 mb-0">Paypal</h6>
                                                                    <small className="text-muted">1 month Ago</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <span className="text-danger">-$12.22</span>
                                                        </div>
                                                    </div>
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-grow-1">
                                                            <div className="d-flex">
                                                                <div className="flex-shrink-0">
                                                                    <img src={avatar3} alt="" className="avatar-xs rounded" />
                                                                </div>
                                                                <div className="flex-shrink-0 ms-2">
                                                                    <h6 className="fs-14 mb-0">Harvey Wells</h6>
                                                                    <small className="text-muted">4 month Ago</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <span className="text-success">-$459.78</span>
                                                        </div>
                                                    </div>
                                                </ListGroupItem>
                                            </ListGroup>
                                        </SimpleBar>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "215px" }}>
                                            <code>
                                                <CustomListExample />
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
UiList.layout = (page:any) => <Layout children={page}/>
export default UiList;
