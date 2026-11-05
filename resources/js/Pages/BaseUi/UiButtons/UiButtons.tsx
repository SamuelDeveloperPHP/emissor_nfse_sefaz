import React from 'react';
import { Button, ButtonGroup, ButtonToolbar, Card, Col, Container, Dropdown, Row, } from 'react-bootstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';

// Import Content
import UiContent from '../../../Components/Common/UiContent';
//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';

import { DefaultButtonsExample, OutlineButtonsExample, RoundedButtonsExample, SoftButtonsExample, GradientButtonsExample, AnimationButtonsExample, LabelButtonsExample, SizeButtonsExample, WidthButtonsExample, TagButtonsExample, GridButtonsExample, CheckButtonsExample, GroupButtonsExample, IconButtonsExample, ToolbarButtonsExample, GroupsizingButtonsExample, VerticalButtonsExample, GhostButtonsExample, LoadingbuttonsExample, BorderButtonsExample, CustomToggleButtonsExample, BaseClassExample, CustomSizeExample, FocusRingExample, FocusRingUtilityExample } from './UiButtonCode';
import { Head, Link } from '@inertiajs/react';
import Layout from '../../../Layouts';


const UiButtons = () => {

    const favouriteBtn = (ele: any) => {
        if (ele.closest("button").classList.contains("active")) {
            ele.closest("button").classList.remove("active");
        } else {
            ele.closest("button").classList.add("active");
        }
    };


    return (
        <React.Fragment>
            <Head title='Buttons | Velzon - React Admin & Dashboard Template' />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Buttons" pageTitle="Base UI" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Default Buttons" />

                                <Card.Body>
                                    <p className="text-muted">Use the <code>Button</code> tag to show the default button style.</p>
                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap gap-2">
                                            <Button variant="primary"> Primary </Button>
                                            <Button variant="secondary"> Secondary </Button>
                                            <Button variant="success"> Success </Button>
                                            <Button variant="info"> Info </Button>
                                            <Button variant="warning"> Warning </Button>
                                            <Button variant="danger"> Danger </Button>
                                            <Button variant="dark"> Dark </Button>
                                            <Button variant="link"> Link </Button>
                                            <Button variant="light"> Light </Button>
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <DefaultButtonsExample />
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
                                <PreviewCardHeader title="Outline Buttons" />
                                <Card.Body>
                                    <p className="text-muted">Use <code>outline</code>  atrribute with the below-mentioned variation to create a button with the outline.</p>
                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap gap-2">
                                            <Button variant="outline-primary"> primary </Button>
                                            <Button variant="outline-secondary"> Secondary </Button>
                                            <Button variant="outline-success"> Success </Button>
                                            <Button variant="outline-info"> Info </Button>
                                            <Button variant="outline-warning"> Warning </Button>
                                            <Button variant="outline-danger"> Danger </Button>
                                            <Button variant="outline-dark"> Dark </Button>
                                            <Button variant="outline-light"> Light </Button>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <OutlineButtonsExample />
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
                                <PreviewCardHeader title="Rounded Buttons" />
                                <Card.Body>
                                    <p className="text-muted">Use the <code >rounded-pill </code>class to make a rounded button.</p>
                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap gap-2">
                                            <Button variant="primary" className="rounded-pill"> Primary </Button>
                                            <Button variant="secondary" className="rounded-pill"> Secondary </Button>
                                            <Button variant="success" className="rounded-pill"> Success </Button>
                                            <Button variant="info" className="rounded-pill"> Info </Button>
                                            <Button variant="warning" className="rounded-pill"> Warning </Button>
                                            <Button variant="danger" className="rounded-pill"> Danger </Button>
                                            <Button variant="dark" className="rounded-pill"> Dark </Button>
                                            <Button variant="light" className="rounded-pill"> Light </Button>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <RoundedButtonsExample />
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
                                <PreviewCardHeader title="Soft Buttons" />
                                <Card.Body>
                                    <p className="text-muted">Use <code>btn-subtle-</code>  class with the below-mentioned variation to create a button with the soft background.</p>                                        <div className="live-preview">
                                        <div className="d-flex flex-wrap gap-2">
                                            <button className="btn btn-soft-primary waves-effect waves-light"> Primary </button>
                                            <button className="btn btn-soft-secondary waves-effect waves-light"> Secondary </button>
                                            <button className="btn btn-soft-success waves-effect waves-light"> Success </button>
                                            <button className="btn btn-soft-info waves-effect waves-light"> Info </button>
                                            <button className="btn btn-soft-warning waves-effect waves-light"> Warning </button>
                                            <button className="btn btn-soft-danger waves-effect waves-light"> Danger </button>
                                            <button className="btn btn-soft-dark waves-effect waves-light"> Dark </button>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <SoftButtonsExample />
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
                                <PreviewCardHeader title="Ghost Buttons" />
                                <Card.Body>
                                    <p className="text-muted">Use <code>btn-ghost-</code>  class with the below-mentioned variation to create a button with the transparent background.</p>
                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap gap-2">
                                            <Button variant="outline-primary" className="btn btn-ghost-primary">Primary</Button>
                                            <Button variant="outline-secondary" className="btn btn-ghost-secondary">Secondary</Button>
                                            <Button variant="outline-success" className="btn btn-ghost-success">Success</Button>
                                            <Button variant="outline-info" className="btn btn-ghost-info">Info</Button>
                                            <Button variant="outline-warning" className="btn btn-ghost-warning">Warning</Button>
                                            <Button variant="outline-danger" className="btn btn-ghost-danger">Danger</Button>
                                            <Button variant="outline-dark" className="btn btn-ghost-dark">Dark</Button>
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <GhostButtonsExample />
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
                                <PreviewCardHeader title="Gradient Buttons" />

                                <Card.Body>
                                    <p className="text-muted">Use <code >bg-gradient </code>class to create a gradient button.</p>
                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap gap-2">
                                            <Button variant="primary" className="bg-gradient"> Primary </Button>
                                            <Button variant="secondary" className="bg-gradient"> Secondary </Button>
                                            <Button variant="success" className="bg-gradient"> Success </Button>
                                            <Button variant="info" className="bg-gradient"> Info </Button>
                                            <Button variant="warning" className="bg-gradient"> Warning </Button>
                                            <Button variant="danger" className="bg-gradient"> Danger </Button>
                                            <Button variant="dark" className="bg-gradient"> Dark </Button>
                                            <Button variant="light" className="bg-gradient"> Light </Button>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <GradientButtonsExample />
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
                                <PreviewCardHeader title="Animation Buttons" />
                                <Card.Body>
                                    <p className="text-muted">Use <code >bg-animation </code>class to create an animated button.</p>
                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap gap-2">
                                            <Button variant="primary" className="btn-animation" data-text="Primary"> <span>Primary</span> </Button>
                                            <Button variant="secondary" className="btn-animation" data-text="Secondary"> <span>Secondary</span> </Button>
                                            <Button variant="success" className="btn-animation" data-text="Success"> <span>Success</span> </Button>
                                            <Button variant="info" className="btn-animation" data-text="Info"> <span>Info</span> </Button>
                                            <Button variant="warning" className="btn-animation" data-text="Warning"> <span>Warning</span> </Button>
                                            <Button variant="danger" className="btn-animation" data-text="Danger"> <span>Danger</span> </Button>
                                            <Button variant="dark" className="btn-animation" data-text="Dark"> <span>Dark</span> </Button>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <AnimationButtonsExample />
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
                                <PreviewCardHeader title="Buttons with Label" />

                                <Card.Body>
                                    <p className="text-muted">Use <code >btn-label </code>class to create a button with the label.</p>
                                    <div className="live-preview">
                                        <Row>
                                            <Col lg={4}>
                                                <div className="d-flex flex-wrap gap-2 mb-3 mb-lg-0">
                                                    <Button variant="primary" className="btn-label"> <i className="ri-user-smile-line label-icon align-middle fs-16 me-2"></i> Primary </Button>
                                                    <Button variant="success" className="btn-label"> <i className="ri-check-double-line label-icon align-middle fs-16 me-2"></i> Success </Button>
                                                    <Button variant="warning" className="btn-label"> <i className="ri-error-warning-line label-icon align-middle fs-16 me-2"></i> Warning </Button>
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div className="d-flex flex-wrap gap-2 mb-3 mb-lg-0">
                                                    <Button variant="primary" className="btn-label rounded-pill"> <i className="ri-user-smile-line label-icon align-middle fs-16 me-2"></i> Primary </Button>
                                                    <Button variant="success" className="btn-label rounded-pill"> <i className="ri-check-double-line label-icon align-middle fs-16 me-2"></i> Success </Button>
                                                    <Button variant="warning" className="btn-label rounded-pill"> <i className="ri-error-warning-line label-icon align-middle fs-16 me-2"></i> Warning </Button>
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div className="d-flex flex-wrap gap-2">
                                                    <Button variant="primary" className="btn-label right"> <i className="ri-user-smile-line label-icon align-middle fs-16 ms-2"></i> Primary </Button>
                                                    <Button variant="success" className="btn-label right rounded-pill"> <i className="ri-check-double-line label-icon align-middle rounded-pill fs-16 ms-2"></i> Success </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <LabelButtonsExample />
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
                                <PreviewCardHeader title="Load More Buttons" />
                                <Card.Body>
                                    <p className="text-muted">Example of loading buttons.</p>
                                    <div className="live-preview">
                                        <Row>
                                            <Col lg={6}>
                                                <div className="hstack flex-wrap gap-2 mb-3 mb-lg-0">
                                                    <Button variant="outline-primary" className="btn-load">
                                                        <span className="d-flex align-items-center">
                                                            <span className="spinner-border flex-shrink-0" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </span>
                                                            <span className="flex-grow-1 ms-2">
                                                                Loading...
                                                            </span>
                                                        </span>
                                                    </Button>
                                                    <Button variant="success" className="btn-load">
                                                        <span className="d-flex align-items-center">
                                                            <span className="spinner-border flex-shrink-0" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </span>
                                                            <span className="flex-grow-1 ms-2">
                                                                Loading...
                                                            </span>
                                                        </span>
                                                    </Button>
                                                    <Button variant="outline-secondary" className="btn-load">
                                                        <span className="d-flex align-items-center">
                                                            <span className="spinner-grow flex-shrink-0" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </span>
                                                            <span className="flex-grow-1 ms-2">
                                                                Loading...
                                                            </span>
                                                        </span>
                                                    </Button>
                                                    <Button variant="danger" className="btn-load">
                                                        <span className="d-flex align-items-center">
                                                            <span className="spinner-grow flex-shrink-0" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </span>
                                                            <span className="flex-grow-1 ms-2">
                                                                Loading...
                                                            </span>
                                                        </span>
                                                    </Button>
                                                </div>
                                            </Col>

                                            <Col lg={6}>
                                                <div className="d-flex flex-wrap gap-2 mb-3 mb-lg-0">
                                                    <Button variant="outline-primary" className="btn-load">
                                                        <span className="d-flex align-items-center">
                                                            <span className="flex-grow-1 me-2">
                                                                Loading...
                                                            </span>
                                                            <span className="spinner-border flex-shrink-0" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </span>
                                                        </span>
                                                    </Button>
                                                    <Button variant="success" className="btn-load">
                                                        <span className="d-flex align-items-center">
                                                            <span className="flex-grow-1 me-2">
                                                                Loading...
                                                            </span>
                                                            <span className="spinner-border flex-shrink-0" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </span>
                                                        </span>
                                                    </Button>
                                                    <Button variant="outline-warning" className="btn-load">
                                                        <span className="d-flex align-items-center">
                                                            <span className="flex-grow-1 me-2">
                                                                Loading...
                                                            </span>
                                                            <span className="spinner-grow flex-shrink-0" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </span>
                                                        </span>
                                                    </Button>
                                                    <Button variant="info" className="btn-load">
                                                        <span className="d-flex align-items-center">
                                                            <span className="flex-grow-1 me-2">
                                                                Loading...
                                                            </span>
                                                            <span className="spinner-grow flex-shrink-0" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </span>
                                                        </span>
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <LoadingbuttonsExample />
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
                                <PreviewCardHeader title="Border Buttons" />
                                <Card.Body>
                                    <p className="text-muted">Example of simple bottom borderd buttons.</p>
                                    <div className="live-preview">
                                        <Row>
                                            <Col lg={6}>
                                                <div className="hstack flex-wrap gap-2 mb-3 mb-lg-0">
                                                    <Button variant="primary" className="btn-border">Primary</Button>
                                                    <Button variant="secondary" className="btn-border">Secondary</Button>
                                                    <Button variant="success" className="btn-border">Success</Button>
                                                    <Button variant="warning" className="btn-border">Warning</Button>
                                                    <Button variant="danger" className="btn-border">Danger</Button>
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className="hstack flex-wrap gap-2 mb-3 mb-lg-0">
                                                    <Button variant="outline-primary" className="btn-border">Primary</Button>
                                                    <Button variant="outline-secondary" className="btn-border">Secondary</Button>
                                                    <Button variant="outline-success" className="btn-border">Success</Button>
                                                    <Button className="btn-soft-warning btn-border">Warning</Button>
                                                    <Button className="btn-soft-danger btn-border">Danger</Button>
                                                    <Button className="btn-soft-dark btn-border">Dark</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <BorderButtonsExample />
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
                                <PreviewCardHeader title="Custom Toggle Buttons" />
                                <Card.Body>
                                    <p className="text-muted">Example of toggle buttons.</p>
                                    <div className="live-preview">
                                        <Row>
                                            <Col lg={6}>
                                                <div className="d-flex flex-wrap align-items-center gap-2">
                                                    <Button variant='primary' className="custom-toggle active" onClick={(e) => favouriteBtn(e.target)}>
                                                        <span className="icon-on"><i className="ri-alarm-line align-bottom"></i> Active</span>
                                                        <span className="icon-off">Unactive</span>
                                                    </Button>
                                                    <Button variant='secondary' className="custom-toggle active" onClick={(e) => favouriteBtn(e.target)}>
                                                        <span className="icon-on"><i className="ri-user-add-line align-bottom me-1"></i> Connect</span>
                                                        <span className="icon-off"><i className="ri-check-fill align-bottom me-1"></i> Unconnect</span>
                                                    </Button>
                                                    <Button variant='success' className="custom-toggle" onClick={(e) => favouriteBtn(e.target)}>
                                                        <span className="icon-on"><i className="ri-thumb-up-line align-bottom me-1"></i> Yes</span>
                                                        <span className="icon-off"><i className="ri-thumb-down-line align-bottom me-1"></i> No</span>
                                                    </Button>
                                                    <Button variant='warning' className="custom-toggle active" onClick={(e) => favouriteBtn(e.target)}>
                                                        <span className="icon-on"><i className="ri-add-line align-bottom me-1"></i> Follow</span>
                                                        <span className="icon-off"><i className="ri-user-unfollow-line align-bottom me-1"></i> Unfollow</span>
                                                    </Button>
                                                    <Button variant='danger' className="custom-toggle" onClick={(e) => favouriteBtn(e.target)}>
                                                        <span className="icon-on">On</span>
                                                        <span className="icon-off">Off</span>
                                                    </Button>
                                                    <Button variant='dark' className="custom-toggle" onClick={(e) => favouriteBtn(e.target)}>
                                                        <span className="icon-on"><i className="ri-bookmark-line align-bottom me-1"></i> Bookmark</span>
                                                        <span className="icon-off"><i className="ri-bookmark-3-fill align-bottom me-1"></i> Unbookmark</span>
                                                    </Button>
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className="d-flex flex-wrap align-items-center gap-2">
                                                    <Button variant="outline-primary" className="custom-toggle" onClick={(e) => favouriteBtn(e.target)}>
                                                        <span className="icon-on">Active</span>
                                                        <span className="icon-off">Unactive</span>
                                                    </Button>
                                                    <Button variant="outline-secondary" className="custom-toggle" onClick={(e) => favouriteBtn(e.target)}>
                                                        <span className="icon-on"><i className="ri-add-line align-bottom me-1"></i> Follow</span>
                                                        <span className="icon-off"><i className="ri-user-unfollow-line align-bottom me-1"></i> Unfollow</span>
                                                    </Button>
                                                    <Button variant="outline-success" className="custom-toggle active" onClick={(e) => favouriteBtn(e.target)}>
                                                        <span className="icon-on">On</span>
                                                        <span className="icon-off">Off</span>
                                                    </Button>
                                                    <Button variant="outline-warning" className="custom-toggle active" onClick={(e) => favouriteBtn(e.target)}>
                                                        <span className="icon-on">Follow</span>
                                                        <span className="icon-off">Unfollow</span>
                                                    </Button>
                                                    <Button variant="outline-danger" className="custom-toggle" onClick={(e) => favouriteBtn(e.target)}>
                                                        <span className="icon-on">On</span>
                                                        <span className="icon-off">Off</span>
                                                    </Button>
                                                    <Button variant="outline-dark" className="custom-toggle active" onClick={(e) => favouriteBtn(e.target)}>
                                                        <span className="icon-on"><i className="ri-bookmark-line align-bottom"></i></span>
                                                        <span className="icon-off"><i className="ri-bookmark-3-fill align-bottom"></i></span>
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <CustomToggleButtonsExample />
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
                                <PreviewCardHeader title="Buttons Sizes" />
                                <Card.Body>
                                    <p className="text-muted">Use <code >btn-lg</code> class to create a large size button and <code >btn-sm</code> class to create a small size button.</p>
                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap align-items-center gap-2">
                                            <Button size="lg" variant="primary"> Large button </Button>
                                            <Button size="lg" variant="light"> Large button </Button>

                                            <Button size="sm" variant="primary"> Small button </Button>
                                            <Button size="sm" variant="light"> Small button </Button>
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <SizeButtonsExample />
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
                                <PreviewCardHeader title="Buttons Width" />

                                <Card.Body>
                                    <p className="text-muted">Use <code >w-xs,w-sm,w-md,w-lg</code> class to make different sized buttons respectively.</p>
                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap gap-2">
                                            <Button variant="primary" className="w-xs"> Xs </Button>
                                            <Button variant="danger" className="w-sm"> Small </Button>
                                            <Button variant="warning" className="w-md"> Medium </Button>
                                            <Button variant="success" className="w-lg"> Large </Button>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <WidthButtonsExample />
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
                                <PreviewCardHeader title="Buttons Tag" />

                                <Card.Body>
                                    <p className="text-muted">Use <code >btn</code> class with different HTML elements. (though some browsers may apply a slightly different rendering)</p>
                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap gap-2">
                                            <Link href="#" className="btn btn-primary"> Link </Link>
                                            <Button variant="success" type="submit"> Button </Button>
                                            <Button variant="info" type="button"> Input </Button>
                                            <Button variant="success" type="submit"> Submit </Button>
                                            <Button variant="warning" type="reset"> Reset </Button>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" >
                                            <code>
                                                <TagButtonsExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <PreviewCardHeader title="Base class" />
                                <Card.Body>
                                    <p className="text-muted">
                                        Bootstrap has a base <code>.btn</code> class that sets up basic styles such as padding and content alignment. By default, <code>.btn</code> controls have a transparent border and background color, and lack any explicit focus and hover styles.
                                    </p>
                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap gap-2">
                                            <button type="button" className="btn">Base class</button>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" >
                                            <code>
                                                <BaseClassExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={6}>
                            <Card>
                                <PreviewCardHeader title="Custom sizing with CSS variables" />
                                <Card.Body>
                                    <p className="text-muted">
                                        You can even roll your own custom sizing with CSS variables:
                                    </p>
                                    <div className="live-preview">
                                        <button type="button" className="btn btn-primary" style={{ paddingTop: '.25rem', paddingBottom: '.25rem', paddingLeft: '.5rem', paddingRight: '.5rem', fontSize: '.75rem' }}>
                                            Custom button
                                        </button>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" >
                                            <code>
                                                <CustomSizeExample />
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
                                <PreviewCardHeader title="Buttons Toggle Status" />

                                <Card.Body>
                                    <p className="text-muted">
                                        Use <code>data-bs-toggle="button"</code> to toggle a button’s active state.
                                    </p>
                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap gap-2">
                                            <Button variant="primary" data-bs-toggle="button" aria-pressed="false">
                                                Single toggle
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>&lt;!-- Toggle Button Status --&gt;
                                                &lt;button type=&quot;button&quot; className=&quot;btn btn-primary waves-effect waves-light&quot; data-bs-toggle=&quot;button&quot; aria-pressed=&quot;false&quot;&gt;
                                                Single toggle
                                                &lt;/button&gt;</code></pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Buttons Grid" />

                                <Card.Body>

                                    <p className="text-muted">
                                        Use <code>d-grid</code> class to create a full-width block button.
                                    </p>
                                    <div className="live-preview">
                                        <div className="d-grid gap-2">
                                            <Button variant="primary"> Button </Button>
                                            <Button variant="primary"> Button </Button>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <GridButtonsExample />
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
                                <PreviewCardHeader title="Checkbox & Radio Buttons" />

                                <Card.Body>
                                    <p className="text-muted">
                                        Combine button-like <code>checkbox and radio</code> <a href="https://getbootstrap.com/docs/5.1/forms/checks-radios/">toggle buttons</a> into a seamless looking button group.
                                    </p>
                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap align-items-center gap-2">
                                            <ButtonGroup aria-label="Basic checkbox toggle button group">

                                                <input type="checkbox" className="btn-check" id="btncheck1" defaultChecked defaultValue='' />
                                                <Button as='label' variant='primary' className="mb-0" htmlFor="btncheck1">Checkbox 1</Button>

                                                <input type="checkbox" className="btn-check" id="btncheck2" defaultValue='' />
                                                <Button as='label' variant='primary' className="mb-0" htmlFor="btncheck2">Checkbox 2</Button>

                                                <input type="checkbox" className="btn-check" id="btncheck3" defaultValue='' />

                                                <Button as='label' variant='primary' className="mb-0" htmlFor="btncheck3">Checkbox 3</Button>
                                            </ButtonGroup>

                                            <ButtonGroup aria-label="Basic radio toggle button group">
                                                <input type="radio" className="btn-check" name="btnradio" id="btnradio1" defaultChecked defaultValue='' />
                                                <Button as='label' variant='outline-secondary' className="mb-0" htmlFor="btnradio1">Radio 1</Button>

                                                <input type="radio" className="btn-check" name="btnradio" id="btnradio2" defaultValue='' />
                                                <Button as='label' variant='outline-secondary' className="mb-0" htmlFor="btnradio2">Radio 2</Button>

                                                <input type="radio" className="btn-check" name="btnradio" id="btnradio3" defaultValue='' />

                                                <Button as='label' variant='outline-secondary' className="mb-0" htmlFor="btnradio3">Radio 3</Button>
                                            </ButtonGroup>
                                        </div>
                                    </div>
                                    <div className="d-none code-view" >
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <CheckButtonsExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <PreviewCardHeader title="Buttons Group" />

                                <Card.Body>

                                    <p className="text-muted">Use the <code>btn-group </code> class in the parent class to wrap a series of buttons.</p>
                                    <div className="live-preview">
                                        <Row>
                                            <Col sm={6}>
                                                <ButtonGroup>
                                                    <Button variant="primary"> Left </Button>
                                                    <Button variant="primary"> Middle </Button>
                                                    <Button variant="primary"> Right </Button>
                                                </ButtonGroup>
                                            </Col>
                                            <Col sm={6}>
                                                <ButtonGroup className="mt-4 mt-sm-0">
                                                    <Button variant="light" className="btn-icon"> <i className="ri-align-right" /> </Button>
                                                    <Button variant="light" className="btn-icon"> <i className="ri-align-center" /> </Button>
                                                    <Button variant="light" className="btn-icon"> <i className="ri-align-left" /> </Button>
                                                </ButtonGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <GroupButtonsExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <PreviewCardHeader title="Icon Buttons" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>btn-icon</code> class to wrap icon in button</p>
                                    <div className="live-preview">
                                        <Row>
                                            <Col sm={6}>
                                                <div className="hstack gap-2 ">
                                                    <Button variant="primary" className="btn-icon"> <i className="ri-map-pin-line" /> </Button>
                                                    <Button variant="danger" className="btn-icon"> <i className="ri-delete-bin-5-line" /> </Button>
                                                    <Button variant="success" className="btn-icon"> <i className="ri-check-double-line" /> </Button>
                                                    <Button variant="light" className="btn-icon"> <i className="ri-brush-2-fill" /> </Button>
                                                </div>
                                            </Col>
                                            <Col sm={6}>
                                                <div className="hstack gap-2 mt-4 mt-sm-0">
                                                    <Button variant="outline-primary" className="btn-icon"> <i className="ri-24-hours-fill" /> </Button>
                                                    <Button variant="outline-danger" className="btn-icon"> <i className="ri-customer-service-2-line" /> </Button>
                                                    <Button variant="outline-success" className="btn-icon"> <i className="ri-mail-send-line" /> </Button>
                                                    <Button variant="outline-warning" className="btn-icon"> <i className="ri-menu-2-line" /> </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" >
                                            <code>
                                                <IconButtonsExample />
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
                                <PreviewCardHeader title="Buttons Toolbar" />
                                <Card.Body>
                                    <p className="text-muted">Use <code>btn-toolbar</code> class to combine sets of button groups into more complex components.</p>
                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap gap-3">
                                            <ButtonToolbar>
                                                <ButtonGroup className="me-2">
                                                    <Button variant="light">1</Button>
                                                    <Button variant="light">2</Button>
                                                    <Button variant="light">3</Button>
                                                    <Button variant="light">4</Button>
                                                </ButtonGroup>
                                                <ButtonGroup className="me-2">
                                                    <Button variant="light">5</Button>
                                                    <Button variant="light">6</Button>
                                                    <Button variant="light">7</Button>

                                                </ButtonGroup>
                                                <ButtonGroup>
                                                    <Button variant="light">8</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <ToolbarButtonsExample />
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
                                <PreviewCardHeader title="Button Group Sizing" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>btn-group-</code> class with the below-mentioned variation to set the different sizes of button groups.</p>

                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap align-items-center gap-2">
                                            <ButtonGroup size="lg">
                                                <Button variant="primary">Left</Button>
                                                <Button variant="primary">Middle</Button>
                                                <Button variant="primary">Right</Button>
                                            </ButtonGroup>
                                            <ButtonGroup className="mt-2">
                                                <Button variant="light">Left</Button>
                                                <Button variant="light">Middle</Button>
                                                <Button variant="light">Right</Button>
                                            </ButtonGroup>
                                            <ButtonGroup size="sm" className="mt-2">
                                                <Button variant="secondary">Left</Button>
                                                <Button variant="secondary">Middle</Button>
                                                <Button variant="secondary">Right</Button>
                                            </ButtonGroup>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <GroupsizingButtonsExample />
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
                                <PreviewCardHeader title="Vertical Variation" />

                                <Card.Body>
                                    <p className="text-muted">Make a set of buttons appear <code>vertically</code> stacked .Split button dropdowns are not supported here.</p>
                                    <div className="live-preview">
                                        <Row>
                                            <div className="col-auto">
                                                <ButtonGroup aria-label="Button group with nested dropdown">
                                                    <Button variant="primary">1</Button>
                                                    <Button variant="primary">2</Button>
                                                    <Dropdown bsPrefix="btn-group">
                                                        <Dropdown.Toggle id="btnGroupDrop1" variant="primary" data-bs-toggle="dropdown" aria-expanded="false">
                                                            Dropdown </Dropdown.Toggle>
                                                        <Dropdown.Menu as="ul" aria-labelledby="btnGroupDrop1">
                                                            <li><Dropdown.Item href="#">Dropdown link</Dropdown.Item></li>
                                                            <li><Dropdown.Item href="#">Dropdown link</Dropdown.Item></li>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </ButtonGroup>
                                            </div>
                                            <div className="col-auto">
                                                <ButtonGroup vertical role="group" aria-label="Vertical button group">
                                                    <Button variant="light">Button</Button>
                                                    <Dropdown>
                                                        <Dropdown.Toggle id="btnGroupDrop1" variant="light">
                                                            Dropdown </Dropdown.Toggle>
                                                        <Dropdown.Menu as="ul" className="dropdown-menu" aria-labelledby="btnGroupVerticalDrop1">
                                                            <li><Dropdown.Item href="#">Dropdown link</Dropdown.Item></li>
                                                            <li><Dropdown.Item href="#">Dropdown link</Dropdown.Item></li>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                    <Button variant='light'>Button</Button>
                                                    <Button variant='light'>Button</Button>
                                                </ButtonGroup>
                                            </div>
                                            <div className="col-auto">
                                                <ButtonGroup vertical aria-label="Vertical radio toggle button group">
                                                    <input type="radio" className="btn-check" name="vbtn" id="vbtn-radio1" defaultChecked defaultValue='' />
                                                    <Button as='label' variant="outline-secondary" htmlFor="vbtn-radio1">Radio 1</Button>
                                                    <input type="radio" className="btn-check" name="vbtn" id="vbtn-radio2" defaultValue='' />
                                                    <Button as='label' variant="outline-secondary" htmlFor="vbtn-radio2">Radio 2</Button>
                                                    <input type="radio" className="btn-check" name="vbtn" id="vbtn-radio3" defaultValue='' />
                                                    <Button as='label' variant="outline-secondary" htmlFor="vbtn-radio3">Radio 3</Button>
                                                </ButtonGroup>
                                            </div>
                                        </Row>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <VerticalButtonsExample />
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
                                <PreviewCardHeader title="Focus Ring" />
                                <Card.Body>
                                    <p className="text-muted">Click directly on the link below to see the focus ring in action, or into the example below and then press <kbd>Tab</kbd>.</p>
                                    <div className="live-preview">
                                        <div className="d-flex gap-3">
                                            <Button variant='link' className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2">
                                                Focus ring
                                            </Button>
                                            <Button variant='link' className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2" style={{ boxShadow: '0 0 0 .25rem rgba(118, 93, 255, .25)' }}>
                                                Custom focus ring
                                            </Button>
                                            <Button variant='link' className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2" style={{ boxShadow: '10px 10px 4px 0 rgba(0, 0, 0, 0.25)' }}>
                                                Blurry offset focus ring
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <FocusRingExample />
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
                                <PreviewCardHeader title="Focus Ring Utilities" />
                                <Card.Body>
                                    <p className="text-muted">In addition to <code>.focus-ring</code>, we have several <code>.focus-ring-*</code> utilities to modify the helper class defaults. Modify the color with any of our <Link href="/ui-colors">theme colors</Link>. Note that the light and dark variants may not be visible on all background colors given current color mode support.</p>
                                    <div className="live-preview">
                                        <Row>
                                            <Col lg={6}>
                                                <p><Button variant='link'  className="d-inline-flex focus-ring focus-ring-primary py-1 px-2 text-decoration-none border rounded-2">Primary focus</Button></p>
                                                <p><Button variant='link'  className="d-inline-flex focus-ring focus-ring-secondary py-1 px-2 text-decoration-none border rounded-2">Secondary focus</Button></p>
                                                <p><Button variant='link'  className="d-inline-flex focus-ring focus-ring-success py-1 px-2 text-decoration-none border rounded-2">Success focus</Button></p>
                                                <p className="mb-lg-0"><Button variant='link' className="d-inline-flex focus-ring focus-ring-danger py-1 px-2 text-decoration-none border rounded-2">Danger focus</Button></p>
                                            </Col>
                                            <Col lg={6}>
                                                <p><Button variant='link' className="d-inline-flex focus-ring focus-ring-warning py-1 px-2 text-decoration-none border rounded-2">Warning focus</Button></p>
                                                <p><Button variant='link' className="d-inline-flex focus-ring focus-ring-info py-1 px-2 text-decoration-none border rounded-2">Info focus</Button></p>
                                                <p><Button variant='link' className="d-inline-flex focus-ring focus-ring-light py-1 px-2 text-decoration-none border rounded-2">Light focus</Button></p>
                                                <p className="mb-0"><Button variant='link' className="d-inline-flex focus-ring focus-ring-dark py-1 px-2 text-decoration-none border rounded-2">Dark focus</Button></p>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <FocusRingUtilityExample />
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
UiButtons.layout = (page:any) => <Layout children={page}/>
export default UiButtons;