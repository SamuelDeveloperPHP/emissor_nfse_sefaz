import React, { useState } from 'react';
import { Alert, Button, Card, Col, Container, Modal, Row, Popover, Tooltip, Form, OverlayTrigger } from 'react-bootstrap';

// Import Content
import UiContent from '../../../Components/Common/UiContent';
//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { DefaultModalExample, CenteredModalExample, GridsModalExample, StaticBackdropModalExample, TooltipModalExample, ScrollableModalExample, VaryingModalExample, OptionalModalExample, FullscreenResponsiveExample, AnimationModalExample, PositionModalExample, TogglebetweenExample } from './UiModalCode';

// Import Images
import loginImg from "../../../../images/modals/login.png";
import signupImg from "../../../../images/modals/signup.png";
import subscribeImg from "../../../../images/modals/subscribe.png";
import paymentImg from "../../../../images/modals/success-payment.png";
import authbg from "../../../../images/auth-one-bg.jpg";
import { Head, Link } from '@inertiajs/react';
import Layout from '../../../Layouts';



const UiModals = () => {

    const [modal_standard, setmodal_standard] = useState<boolean>(false);
    function tog_standard() {
        setmodal_standard(!modal_standard);
    }

    const [modal_center, setmodal_center] = useState<boolean>(false);
    function tog_center() {
        setmodal_center(!modal_center);
    }

    const [modal_grid, setmodal_grid] = useState<boolean>(false);
    function tog_grid() {
        setmodal_grid(!modal_grid);
    }

    const [modal_tooltip, setmodal_tooltip] = useState<boolean>(false);
    function tog_tooltip() {
        setmodal_tooltip(!modal_tooltip);
    }


    const [modal_fullscreen, setmodal_fullscreen] = useState<boolean>(false);
    function tog_fullscreen() {
        setmodal_fullscreen(!modal_fullscreen);
    }

    const [modal_xlarge, setmodal_xlarge] = useState<boolean>(false);
    function tog_xlarge() {
        setmodal_xlarge(!modal_xlarge);
    }

    const [modal_large, setmodal_large] = useState<boolean>(false);
    function tog_large() {
        setmodal_large(!modal_large);
    }

    const [modal_small, setmodal_small] = useState<boolean>(false);
    function tog_small() {
        setmodal_small(!modal_small);
    }

    const [modal_fullscreen1, setmodal_fullscreen1] = useState<boolean>(false);
    function tog_fullscreen1() {
        setmodal_fullscreen1(!modal_fullscreen1);
    }

    const [modal_fullscreen_sm, setmodal_fullscreen_sm] = useState<boolean>(false);
    function tog_fullscreen_sm() {
        setmodal_fullscreen_sm(!modal_fullscreen_sm);
    }

    const [modal_fullscreen_md, setmodal_fullscreen_md] = useState<boolean>(false);
    function tog_fullscreen_md() {
        setmodal_fullscreen_md(!modal_fullscreen_md);
    }

    const [modal_fullscreen_lg, setmodal_fullscreen_lg] = useState<boolean>(false);
    function tog_fullscreen_lg() {
        setmodal_fullscreen_lg(!modal_fullscreen_lg);
    }

    const [modal_fullscreen_xl, setmodal_fullscreen_xl] = useState<boolean>(false);
    function tog_fullscreen_xl() {
        setmodal_fullscreen_xl(!modal_fullscreen_xl);
    }

    const [modal_fullscreen_xxl, setmodal_fullscreen_xxl] = useState<boolean>(false);
    function tog_fullscreen_xxl() {
        setmodal_fullscreen_xxl(!modal_fullscreen_xxl);
    }

    const [modal_scroll, setmodal_scroll] = useState<boolean>(false);
    function tog_scroll() {
        setmodal_scroll(!modal_scroll);
    }

    const [modal_backdrop, setmodal_backdrop] = useState<boolean>(false);
    function tog_backdrop() {
        setmodal_backdrop(!modal_backdrop);
    }

    const [modal_varying1, setmodal_varying1] = useState<boolean>(false);
    function tog_varying1() {
        setmodal_varying1(!modal_varying1);
    }

    const [modal_varying2, setmodal_varying2] = useState<boolean>(false);
    function tog_varying2() {
        setmodal_varying2(!modal_varying2);
    }

    const [modal_varying3, setmodal_varying3] = useState<boolean>(false);
    function tog_varying3() {
        setmodal_varying3(!modal_varying3);
    }

    const [modal_togFirst, setmodal_togFirst] = useState<boolean>(false);
    function tog_togFirst() {
        setmodal_togFirst(!modal_togFirst);
    }

    const [modal_togSecond, setmodal_togSecond] = useState<boolean>(false);
    function tog_togSecond() {
        setmodal_togSecond(!modal_togSecond);
    }

    const [modal_animationRight, setmodal_animationRight] = useState<boolean>(false);
    const tog_animationRight = () => setmodal_animationRight(!modal_animationRight)

    const [modal_animationLeft, setmodal_animationLeft] = useState<boolean>(false);
    const tog_animationLeft = () => setmodal_animationLeft(!modal_animationLeft)

    const [modal_animationUp, setmodal_animationUp] = useState<boolean>(false);
    const tog_animationUp = () => setmodal_animationUp(!modal_animationUp)

    const [modal_animationFlip, setmodal_animationFlip] = useState<boolean>(false);
    const tog_animationFlip = () => setmodal_animationFlip(!modal_animationFlip)

    const [modal_animationZoom, setmodal_animationZoom] = useState<boolean>(false);
    const tog_animationZoom = () => setmodal_animationZoom(!modal_animationZoom)

    const [modal_positionTop, setmodal_positionTop] = useState<boolean>(false);
    const tog_positionTop = () => setmodal_positionTop(!modal_positionTop);

    const [modal_positionTopRight, setmodal_positionTopRight] = useState<boolean>(false);
    const tog_positionTopRight = () => setmodal_positionTopRight(!modal_positionTopRight);


    const [modal_positionBottom, setmodal_positionBottom] = useState<boolean>(false);
    const tog_positionBottom = () => setmodal_positionBottom(!modal_positionBottom);


    const [modal_positionBottomRight, setmodal_positionBottomRight] = useState<boolean>(false);
    const tog_positionBottomRight = () => setmodal_positionBottomRight(!modal_positionBottomRight);

    // Custom Modals Example
    const [modal_successMessage, setmodal_successMessage] = useState<boolean>(false);
    function tog_successMessage() {
        setmodal_successMessage(!modal_successMessage);
    }

    const [modal_loginModals, setmodal_loginModals] = useState<boolean>(false);
    function tog_loginModals() {
        setmodal_loginModals(!modal_loginModals);
    }

    const [subscribeModals, set_subscribeModals] = useState<boolean>(false);
    function tog_subscribeModals() {
        set_subscribeModals(!subscribeModals);
    }

    const [modal_signUpModals, setmodal_signUpModals] = useState<boolean>(false);
    function tog_signUpModals() {
        setmodal_signUpModals(!modal_signUpModals);
    }


    return (
        <React.Fragment>
            <Head title = "Modals | Velzon - React Admin & Dashboard Template"/>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Modals" pageTitle="Base UI" />
                    <Row>
                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Default Modal" />

                                <Card.Body>
                                    <p className="text-muted text-muted">A default modal Example.</p>
                                    <div className="live-preview">
                                        <div>
                                            <Button variant="primary" onClick={() => tog_standard()}>Standard Modal</Button>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <DefaultModalExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Vertically Centered Modal" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>modal-dialog-centered</code> class to show vertically center the modal.</p>
                                    <div className="live-preview">
                                        <div>
                                            <Button variant="primary" onClick={() => tog_center()}>Center Modal</Button>
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <CenteredModalExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Grids in Modals" />
                                <Card.Body>
                                    <div className="live-preview">
                                        <Button variant="primary" onClick={() => tog_grid()}>
                                            Launch Demo Modal
                                        </Button>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <GridsModalExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Static Backdrop Modal" />
                                <Card.Body>
                                    <div className="live-preview">
                                        <div>
                                            <Button variant="primary" onClick={() => tog_backdrop()}>
                                                Static Backdrop Modal
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <StaticBackdropModalExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Toggle Between Modal" />
                                <Card.Body>
                                    <div className="live-preview">
                                        <div>
                                            <Button variant="primary" onClick={() => tog_togFirst()}>Open First Modal</Button>
                                        </div>

                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <TogglebetweenExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Tooltips and Popovers" />
                                <Card.Body>

                                    <div className="live-preview">
                                        <Button variant="primary" onClick={() => tog_tooltip()}>
                                            Launch Demo Modal
                                        </Button>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <TooltipModalExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Scrollable Modal" />
                                <Card.Body>
                                    <div className="live-preview">
                                        <div>
                                            <Button variant="primary" onClick={() => tog_scroll()}>Scrollable Modal</Button>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <ScrollableModalExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Varying Modal Content" />
                                <Card.Body>
                                    <div className="live-preview">
                                        <div>
                                            <div className="hstack gap-2 flex-wrap">
                                                <Button variant="primary" onClick={() => tog_varying1()} >Open Modal for Mary</Button>
                                                <Button variant="primary" onClick={() => tog_varying2()} >Open Modal for Jennifer</Button>
                                                <Button variant="primary" onClick={() => tog_varying3()}>Open Modal for Roderick</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <VaryingModalExample />
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
                                <PreviewCardHeader title="Optional Sizes" />
                                <Card.Body>
                                    <p className="text-muted">Use <code>modal-fullscreen</code>, <code>modal-xl</code>, <code>modal-lg</code>, or <code>modal-sm</code> class to modal-dialog class to set different size modal respectively.</p>
                                    <div className="live-preview">
                                        <div>
                                            <div className="hstack flex-wrap gap-2">

                                                {/* 
                                                // <!-- Fullscreen modal --> */}
                                                <Button variant="primary" onClick={() => tog_fullscreen()}>Fullscreen Modal</Button>


                                                {/* 
                                                // <!-- Extra Large modal --> */}
                                                <Button variant="info" onClick={() => tog_xlarge()}>Extra large Modal</Button>


                                                {/* 
                                                // <!-- Large modal --> */}
                                                <Button variant="success" onClick={() => tog_large()}>Large Modal</Button>


                                                {/* 
                                                // <!-- Small modal --> */}
                                                <Button variant="danger" onClick={() => tog_small()}>Small Modal</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <OptionalModalExample />
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
                                <PreviewCardHeader title="Fullscreen Responsive Modals" />
                                <Card.Body>
                                    <p className="text-muted text-muted">Below mentioned modifier classes are used to show fullscreen modal as per minimum screen requirement.</p>
                                    <div className="live-preview">
                                        <div>
                                            <div className="hstack gap-2 flex-wrap">
                                                <Button variant="primary" onClick={() => tog_fullscreen1()}> Fullscreen modal </Button>
                                                <Button variant="primary" onClick={() => tog_fullscreen_sm()}>Full Screen Below sm</Button>
                                                <Button variant="primary" onClick={() => tog_fullscreen_md()}>Full Screen Below md</Button>
                                                <Button variant="primary" onClick={() => tog_fullscreen_lg()}>Full Screen Below lg</Button>
                                                <Button variant="primary" onClick={() => tog_fullscreen_xl()}>Full Screen Below xl</Button>
                                                <Button variant="primary" onClick={() => tog_fullscreen_xxl()}>Full Screen Below xxl</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <FullscreenResponsiveExample />
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
                                <PreviewCardHeader title="Animation Modals" />
                                <Card.Body>
                                    <p className="text-muted">Use <code>fadeInRight</code>, <code>fadeInLeft</code>, <code>fadeInUp</code>, <code>flip</code>, or <code>zoomIn</code> class to modal class to set different modal with animation effect respectively.</p>
                                    <div className="live-preview">
                                        <div>
                                            <div className="hstack gap-2 flex-wrap">
                                                <Button variant="primary" onClick={() => tog_animationRight()}>Fade In Right Modal</Button>
                                                <Button variant="primary" onClick={() => tog_animationLeft()} >Fade In Left Modal</Button>
                                                <Button variant="primary" onClick={() => tog_animationUp()} >Fade In Up Modal</Button>
                                                <Button variant="primary" onClick={() => tog_animationFlip()} >Flip Modal</Button>
                                                <Button variant="primary" onClick={() => tog_animationZoom()} >Zoom In Modal</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <AnimationModalExample />
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
                                <PreviewCardHeader title="Modal Positions" />
                                <Card.Body>
                                    <p className="text-muted text-muted">Use <code>modal-dialog-right</code>, <code>modal-dialog-bottom</code>, or <code>modal-dialog-bottom-right</code> class to modal-dialog class to set modal at different positions respectively.</p>
                                    <div className="live-preview">
                                        <div>
                                            <div className="hstack gap-2 flex-wrap">
                                                <Button variant="primary" onClick={() => tog_positionTop()}>Top Modal</Button>
                                                <Button variant="secondary" onClick={() => tog_positionTopRight()}>Top Right Modal</Button>
                                                <Button variant="success" onClick={() => tog_positionBottom()}>Bottom Modal</Button>
                                                <Button variant="danger" onClick={() => tog_positionBottomRight()}>Bottom Right Modal</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <PositionModalExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col lg={12}>
                            <div className="justify-content-between d-flex align-items-center mb-3">
                                <h5 className="mb-0 pb-1 text-decoration-underline">Custom Modals Example</h5>
                            </div>
                            <Row>
                                <Col xl={4} md={6}>
                                    <Card className="text-center border">
                                        <Card.Body className="p-4 pb-0">
                                            <h5 className="mb-4">Success Message</h5>
                                            <p className="text-muted">Here is an example of a sweet alert with a success message.</p>
                                            <div>
                                                <Button variant="primary" data-bs-toggle="modal" data-bs-target="#success-Payment" onClick={() => tog_successMessage()} >Click me</Button>
                                            </div>

                                            <Row className="justify-content-center mt-2">
                                                <Col lg={10}>
                                                    <div>
                                                        <img src={paymentImg} alt="Mac" className="img-fluid" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col xl={4} md={6}>
                                    <Card className="text-center border">
                                        <Card.Body className="p-4 pb-0">
                                            <h5 className="mb-4">Login Modals</h5>
                                            <p className="text-muted">Here is an example of a sweet alert with a error message.</p>
                                            <div>
                                                <Button variant='primary' onClick={() => tog_loginModals()} data-bs-toggle="modal" data-bs-target="#loginModals">Click me</Button>
                                            </div>

                                            <Row className="justify-content-center mt-2">
                                                <Col lg={10}>
                                                    <div>
                                                        <img src={loginImg} alt="Mac" className="img-fluid" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col xl={4} md={6}>
                                    <Card className="text-center border">
                                        <Card.Body className="p-4 pb-0">
                                            <h5 className="mb-4">Subscribe Modals</h5>
                                            <p className="text-muted">Here is an example of a sweet alert with a warning message.</p>
                                            <div>
                                                <Button variant='primary' onClick={() => tog_subscribeModals()} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#subscribeModals">Click me</Button>
                                            </div>

                                            <Row className="justify-content-center mt-2">
                                                <Col lg={10}>
                                                    <div>
                                                        <img src={subscribeImg} alt="Mac" className="img-fluid" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col xl={4} md={6}>
                                    <Card className="text-center border">
                                        <Card.Body className="p-4 pb-0">
                                            <h5 className="mb-4">Sign Up Modals</h5>
                                            <p className="text-muted">Here is an example of a sweet alert with a community registration field. </p>

                                            <div>
                                                <Button variant='primary' onClick={() => tog_signUpModals()} data-bs-toggle="modal" data-bs-target="#signupModals">Click me</Button>
                                            </div>

                                            <Row className="justify-content-center mt-2">
                                                <Col lg={10}>
                                                    <div>
                                                        <img src={signupImg} alt="Mac" className="img-fluid" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Default Modal */}
            <Modal id="myModal"
                show={modal_standard}
                onHide={tog_standard}
            >
                <Modal.Header closeButton>
                    <h5 className='modal-title'>
                        Modal Heading
                    </h5>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="fs-15">
                        Overflowing text to show scroll behavior
                    </h5>
                    <p className="text-muted">One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</p>
                    <p className="text-muted">The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought.</p>
                    <p className="text-muted">It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="light"
                        onClick={tog_standard}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                    >
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Vertically Centered */}
            <Modal
                show={modal_center}
                onHide={tog_center}
                centered
            >
                <Modal.Header className="modal-title" />

                <Modal.Body className="text-center p-5">
                    <i className="ri-thumb-down-line display-5 text-danger"></i>
                    <div className="mt-4">
                        <h4 className="mb-3">Oops something went wrong!</h4>
                        <p className="text-muted mb-4"> The transfer was not successfully received by us. the email of the recipient wasn't correct.</p>
                        <div className="hstack gap-2 justify-content-center">
                            <Button variant="light" onClick={tog_center}>Close</Button>
                            <Link href="#" className="btn btn-danger">Try Again</Link>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Grids in Modals */}
            <Modal
                show={modal_grid}
                onHide={tog_grid}
            >
                <Modal.Header closeButton>
                    <h5 className='modal-title'>
                        Grid Modals
                    </h5>
                </Modal.Header>
                <Modal.Body>
                    <form action="#">
                        <div className="row g-3">
                            <Col xxl={6}>
                                <div>
                                    <Form.Label htmlFor="firstName" className="form-label">First Name</Form.Label>
                                    <Form.Control type="text" className="form-control" id="firstName" placeholder="Enter firstname" />
                                </div>
                            </Col>
                            <Col xxl={6}>
                                <div>
                                    <Form.Label htmlFor="lastName" className="form-label">Last Name</Form.Label>
                                    <Form.Control type="text" className="form-control" id="lastName" placeholder="Enter lastname" />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <Form.Label className="form-label">Gender</Form.Label>
                                <div>
                                    <div className="form-check form-check-inline">
                                        <Form.Check.Input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                        <Form.Check.Label className="form-check-label" htmlFor="inlineRadio1">Male</Form.Check.Label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Form.Check.Input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                        <Form.Check.Label className="form-check-label" htmlFor="inlineRadio2">Female</Form.Check.Label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Form.Check.Input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                                        <Form.Check.Label className="form-check-label" htmlFor="inlineRadio3">Others</Form.Check.Label>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={6}>
                                <Form.Label htmlFor="emailInput" className="form-label">Email</Form.Label>
                                <Form.Control type="email" className="form-control" id="emailInput" placeholder="Enter your email" />
                            </Col>
                            <Col xxl={6}>
                                <Form.Label htmlFor="passwordInput" className="form-label">Password</Form.Label>
                                <Form.Control type="password" className="form-control" id="passwordInput" value="451326546" placeholder="Enter password" />
                            </Col>
                            <Col lg={12}>
                                <div className="hstack gap-2 justify-content-end">
                                    <Button variant="light" onClick={tog_grid}>Close</Button>
                                    <Button variant="primary" >Submit</Button>
                                </div>
                            </Col>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            {/* Static Backdrop Modal */}
            <Modal
                show={modal_backdrop}
                onHide={tog_backdrop}
                backdrop={'static'}
                id="staticBackdrop"
                centered
            >
                <Modal.Header closeButton>
                    <h5 className='modal-title'>
                        Modal title
                    </h5>
                </Modal.Header>
                <Modal.Body className="text-center p-5">
                    <i className="bx bx-party display-4 text-success"></i>

                    <div className="mt-4">
                        <h4 className="mb-3">You've made it!</h4>
                        <p className="text-muted mb-4"> The transfer was not successfully received by us. the email of the recipient wasn't correct.</p>
                        <div className="hstack gap-2 justify-content-center">
                            <Link href="#" className="btn btn-link link-success fw-medium" onClick={tog_backdrop}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                            <Link href="#" className="btn btn-success" onClick={tog_backdrop}>Completed</Link>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Toggle Between Modal */}

            <Modal
                show={modal_togFirst}
                onHide={tog_togFirst}
                id="firstmodal"
                centered
            >
                <Modal.Header closeButton>
                    <h5 className='modal-title'>
                        Modal 1
                    </h5>
                </Modal.Header>
                <Modal.Body className="text-center p-5">
                    <i className="ri-error-warning-line display-2 text-warning"></i>
                    <div className="mt-4 pt-4">
                        <h4>Uh oh, something went wrong!</h4>
                        <p className="text-muted"> The transfer was not successfully received by us. the email of the recipient wasn't correct.</p>

                        <Button variant="warning" onClick={() => { tog_togSecond(); tog_togFirst(); }}>
                            Continue
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                show={modal_togSecond}
                toggle={tog_togSecond}
                id="secondmodal"
                centered
            >
                <Modal.Header closeButton>
                    <h5 className='modal-title'>
                        Modal 2
                    </h5>
                </Modal.Header>
                <Modal.Body className="text-center p-5">
                    <i className="ri-chat-smile-2-line display-2 text-success"></i>
                    <div className="mt-4 pt-3">
                        <h4 className="mb-3">Follow-Up Email</h4>
                        <p className="text-muted mb-4">Hide this modal and show the first with the button below Automatically Send your invitees a follow -Up email.</p>
                        <div className="hstack gap-2 justify-content-center">
                            <Button variant="danger" onClick={tog_togFirst}>
                                Back to First
                            </Button>
                            <Button variant="light" onClick={tog_togSecond}>Close</Button>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>

            {/* Tooltips and Popovers */}
            <Modal show={modal_tooltip} onHide={tog_tooltip}>
                <Modal.Header closeButton>
                    <Modal.Title>Tooltips and Popovers Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="fs-17">Popover in a Modal</h5>
                    <p className="text-muted">You only need to know a little to make a big <OverlayTrigger trigger="click" placement="right" overlay={<Popover id="popover-positioned-right"> <Popover.Header as="h3">"Popover on Click"</Popover.Header> <Popover.Body> Vivamus sagittis lacus vel augue laoreet rutrum faucibus. </Popover.Body> </Popover>}>
                        <Link href="#" className="popover-test fw-medium text-decoration-underline link-success" id="UncontrolledPopover">
                            Popover on Click
                        </Link></OverlayTrigger> you do every day. So let's get started. First, some common types of fonts and what you need to know about them triggers a popover on click.</p>

                    <h5 className="fs-17">Tooltips in a Modal</h5>
                    <p className="text-muted">Opposites attract, and that’s a fact. It’s in our <OverlayTrigger placement='top' overlay={<Tooltip id="tooltip-top"> graphic design </Tooltip>}>
                        <Link href="#" className="tooltip-test text-decoration-underline fw-medium" id="UncontrolledTooltip1">
                            graphic design
                        </Link>
                    </OverlayTrigger> to be interested in the unusual, and that’s why using <OverlayTrigger placement='top' overlay={<Tooltip id="tooltip-top"> design </Tooltip>}>
                            <Link href="#" className="tooltip-test text-decoration-underline" id="UncontrolledTooltip2">
                                design
                            </Link>
                        </OverlayTrigger> contrasting colors in Graphic Design is a must.</p>
                </Modal.Body>
                <Modal.Footer>
                    <div className="mx-auto">
                        <Link href="#" className="btn btn-link fw-medium">Read More <i className="ri-arrow-right-line ms-1 align-middle"></i></Link>
                    </div>
                </Modal.Footer>
            </Modal>

            {/* Scrollable Modal  */}
            <Modal
                show={modal_scroll}
                onHide={tog_scroll}
                scrollable={true}
                id="exampleModalScrollable"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Scrollable modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="fs-15">Give your text a good structure</h6>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin.
                                Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">You've probably heard that opposites attract. The same is true for fonts. Don't be afraid to combine font styles that are different but complementary, like sans serif with serif, short with tall, or decorative with simple. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.</p>
                        </div>
                    </div>
                    <h6 className="fs-16 my-3">Graphic Design</h6>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Opposites attract, and that’s a fact. It’s in our nature to be interested in the unusual, and that’s why using contrasting colors in Graphic Design is a must. It’s eye-catching, it makes a statement, it’s impressive graphic design. Increase or decrease the letter spacing depending.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Just like in the image where we talked about using multiple fonts, you can see that the background in this graphic design is blurred. Whenever you put text on top of an image, it’s important that your viewers can understand.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater.</p>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="light"
                        onClick={tog_scroll}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                    >
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* Full Screen Modal */}
            <Modal
                fullscreen={true}
                show={modal_fullscreen}
                onHide={tog_fullscreen}
                className="modal-fullscreen"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Fullscreen Modal Heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="fs-15">Give your text a good structure</h6>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin.
                                Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">You've probably heard that opposites attract. The same is true for fonts. Don't be afraid to combine font styles that are different but complementary, like sans serif with serif, short with tall, or decorative with simple. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.</p>
                        </div>
                    </div>
                    <h6 className="fs-16 my-3">Graphic Design</h6>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Opposites attract, and that’s a fact. It’s in our nature to be interested in the unusual, and that’s why using contrasting colors in Graphic Design is a must. It’s eye-catching, it makes a statement, it’s impressive graphic design. Increase or decrease the letter spacing depending.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Just like in the image where we talked about using multiple fonts, you can see that the background in this graphic design is blurred. Whenever you put text on top of an image, it’s important that your viewers can understand.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater.</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='link' href='#'
                        onClick={tog_fullscreen}
                        className="btn btn-link link-success fw-medium"
                    ><i className="ri-close-line me-1 align-middle" />
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        className="btn btn-primary "
                    >
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Extra Large Modal */}
            <Modal
                size="xl"
                show={modal_xlarge}
                onHide={tog_xlarge}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Extra large modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="fs-15">Give your text a good structure</h6>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin.
                                Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">You've probably heard that opposites attract. The same is true for fonts. Don't be afraid to combine font styles that are different but complementary, like sans serif with serif, short with tall, or decorative with simple. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.</p>
                        </div>
                    </div>
                    <h6 className="fs-16 my-3">Graphic Design</h6>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Opposites attract, and that’s a fact. It’s in our nature to be interested in the unusual, and that’s why using contrasting colors in Graphic Design is a must. It’s eye-catching, it makes a statement, it’s impressive graphic design. Increase or decrease the letter spacing depending.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Just like in the image where we talked about using multiple fonts, you can see that the background in this graphic design is blurred. Whenever you put text on top of an image, it’s important that your viewers can understand.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater.</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Link href="#" className="btn btn-link link-success fw-medium" onClick={() => setmodal_xlarge(false)}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal>


            {/* Large Modal */}
            <Modal
                size='lg'
                show={modal_large}
                onHide={tog_large}
            >
                <Modal.Header closeButton> <Modal.Title>Large Modal</Modal.Title></Modal.Header>
                <Modal.Body>
                    <h6 className="fs-15">Give your text a good structure</h6>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin.
                                Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">You've probably heard that opposites attract. The same is true for fonts. Don't be afraid to combine font styles that are different but complementary, like sans serif with serif, short with tall, or decorative with simple. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.</p>
                        </div>
                    </div>
                    <h6 className="fs-16 my-3">Graphic Design</h6>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Opposites attract, and that’s a fact. It’s in our nature to be interested in the unusual, and that’s why using contrasting colors in Graphic Design is a must. It’s eye-catching, it makes a statement, it’s impressive graphic design. Increase or decrease the letter spacing depending.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Just like in the image where we talked about using multiple fonts, you can see that the background in this graphic design is blurred. Whenever you put text on top of an image, it’s important that your viewers can understand.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater.</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Link href="#" className="btn btn-link link-success fw-medium" onClick={() => setmodal_large(false)}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal>

            {/* Small Modal */}
            <Modal
                size="sm"
                show={modal_small}
                onHide={tog_small}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Small Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="fs-15">Give your text a good structure</h6>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin.
                                Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Link href="#" className="btn btn-link link-success fw-medium" onClick={() => setmodal_small(false)}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal>

            {/* Fullscreen Responsive Modals */}
            <Modal
                size="xl"
                fullscreen
                show={modal_fullscreen1}
                onHide={tog_fullscreen1}
                className="modal-fullscreen"
                id="fullscreeexampleModal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Full screen modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="fs-15">Give your text a good structure</h6>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin.
                                Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.</p>
                        </div>
                    </div>
                    <h6 className="fs-16 my-3">Graphic Design</h6>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Opposites attract, and that’s a fact. It’s in our nature to be interested in the unusual, and that’s why using contrasting colors in Graphic Design is a must. It’s eye-catching, it makes a statement, it’s impressive graphic design. Increase or decrease the letter spacing depending.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater.</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Link href='#'
                        type="button"
                        onClick={() => {
                            tog_fullscreen1();
                        }}
                        className="btn btn-link link-success fw-medium"
                    ><i className="ri-close-line me-1 align-middle" />
                        Close
                    </Link>
                    <Button
                        variant="primary"
                        className="btn btn-primary "
                    >
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* FullscreenSm */}
            <Modal id="exampleModalFullscreenSm" show={modal_fullscreen_sm} onHide={() => { tog_fullscreen_sm(); }} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Full screen below sm
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="fs-15">Give your text a good structure</h6>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin.
                                Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Link href="#" className="btn btn-link link-success fw-medium" onClick={() => { tog_fullscreen_sm(); }}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                    <Button variant="primary"> Save changes </Button>
                </Modal.Footer>
            </Modal>

            {/* FullscreenMd */}
            <Modal id="exampleModalFullscreenMd" show={modal_fullscreen_md} onHide={() => { tog_fullscreen_md(); }} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Full screen below md
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="fs-15">Give your text a good structure</h6>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin.
                                Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Link href="#" className="btn btn-link link-success fw-medium" onClick={() => { tog_fullscreen_md(); }}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                    <Button variant="primary" > Save changes </Button>
                </Modal.Footer>
            </Modal>

            {/* FullscreenLg */}
            <Modal id="exampleModalFullscreenLg" show={modal_fullscreen_lg} onHide={() => { tog_fullscreen_lg(); }} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Full screen below lg
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="fs-15">Give your text a good structure</h6>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin.
                                Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Link href="#" className="btn btn-link link-success fw-medium" onClick={() => { tog_fullscreen_lg(); }}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                    <Button variant="primary" > Save changes </Button>
                </Modal.Footer>
            </Modal>

            {/* FullscreenXl */}
            <Modal id="exampleModalFullscreenXl" show={modal_fullscreen_xl} onHide={() => { tog_fullscreen_xl(); }} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Full screen below xl
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="fs-15">Give your text a good structure</h6>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin.
                                Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Link href="#" className="btn btn-link link-success fw-medium" onClick={() => { tog_fullscreen_xl(); }}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                    <Button variant="primary" > Save changes </Button>
                </Modal.Footer>
            </Modal>

            {/* FullscreenXxl */}
            <Modal id="exampleModalFullscreenXxl" show={modal_fullscreen_xxl} onHide={() => { tog_fullscreen_xxl(); }} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Modal Heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="fs-15">Give your text a good structure</h6>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin.
                                Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Link href="#" className="btn btn-link link-success fw-medium" onClick={() => { tog_fullscreen_xxl(); }}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                    <Button variant="primary" > Save changes </Button>
                </Modal.Footer>
            </Modal>

            {/* modal for Mary */}
            <Modal
                show={modal_varying1}
                onHide={() => {
                    tog_varying1();
                }}
                id="exampleModal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        New message to Mary
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <Form.Label htmlFor="customer-name" className="col-form-label">Customer Name:</Form.Label>
                            <Form.Control type="text" className="form-control" id="customer-name" value="Mary" readOnly />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="message-text" className="col-form-label">Message:</Form.Label>
                            <textarea className="form-control" id="message-text" rows={4}></textarea>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="light"
                        onClick={() => {
                            setmodal_varying1(false);
                        }}
                    >
                        Back
                    </Button>
                    <Button variant="primary">
                        Send message
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* modal for Jennifer */}
            <Modal
                show={modal_varying2}
                onHide={() => {
                    tog_varying2();
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        New message to Jennifer
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <Form.Label htmlFor="customer-name" className="col-form-label">Customer Name:</Form.Label>
                            <Form.Control type="text" className="form-control" id="customer-name" value="Jennifer" readOnly />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="message-text" className="col-form-label">Message:</Form.Label>
                            <textarea className="form-control" id="message-text" rows={4}></textarea>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="light"
                        onClick={() => {
                            setmodal_varying2(false);
                        }}
                    >
                        Back
                    </Button>
                    <Button variant="primary">
                        Send message
                    </Button>
                </Modal.Footer>
            </Modal>;

            {/* modal for Roderick */}
            <Modal
                show={modal_varying3}
                onHide={() => {
                    tog_varying3();
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        New message to Roderick
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <Form.Label htmlFor="customer-name" className="col-form-label">Customer Name:</Form.Label>
                            <Form.Control type="text" className="form-control" id="customer-name" value="Roderick" readOnly />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="message-text" className="col-form-label">Message:</Form.Label>
                            <textarea className="form-control" id="message-text" rows={4}></textarea>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="light"
                        onClick={() => {
                            setmodal_varying3(false);
                        }}
                    >
                        Back
                    </Button>
                    <Button variant="primary">
                        Send message
                    </Button>
                </Modal.Footer>
            </Modal>;

            {/* Animation Modals */}

            {/* RightSide Animation */}
            <Modal id="fadeInRightModal" show={modal_animationRight} onHide={() => { tog_animationRight(); }} className="fadeInRight" centered >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Modal Heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="fs-16">
                        Overflowing text to show scroll behavior
                    </h5>
                    <p className="text-muted">One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</p>
                    <p className="text-muted">The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={() => { tog_animationRight(); }}>
                        Close
                    </Button>
                    <Button variant="primary"> Save changes </Button>
                </Modal.Footer>
            </Modal>

            {/* LeftSide Animation */}
            <Modal id="fadeInleftModal" show={modal_animationLeft} onHide={() => { tog_animationLeft(); }} className="fadeInLeft" centered >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Modal Heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="fs-16">
                        Overflowing text to show scroll behavior
                    </h5>
                    <p className="text-muted">One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</p>
                    <p className="text-muted">The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={() => { tog_animationLeft(); }}> Close </Button>
                    <Button variant="primary" > Save changes </Button>
                </Modal.Footer>
            </Modal>

            {/* UpSide Animation */}
            <Modal id="fadeInUpModal" show={modal_animationUp} onHide={() => { tog_animationUp(); }} className="fadeInUp" >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Modal Heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="fs-16">
                        Overflowing text to show scroll behavior
                    </h5>
                    <p className="text-muted">One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</p>
                    <p className="text-muted">The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={() => { tog_animationUp(); }}> Close </Button>
                    <Button variant="primary" > Save changes </Button>
                </Modal.Footer>
            </Modal>

            {/* Flip Animation */}
            <Modal id="flipModal" show={modal_animationFlip} onHide={() => { tog_animationFlip(); }} className="flip" >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Modal Heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="fs-16">
                        Overflowing text to show scroll behavior
                    </h5>
                    <p className="text-muted">One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</p>
                    <p className="text-muted">The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={() => { tog_animationFlip(); }}> Close </Button>
                    <Button variant="primary" > Save changes </Button>
                </Modal.Footer>
            </Modal>

            {/* ZoomIn Animation */}
            <Modal id="flipModal" show={modal_animationZoom} onHide={() => { tog_animationZoom(); }} dialogClassName="zoomIn">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Modal Heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="fs-16">
                        Overflowing text to show scroll behavior
                    </h5>
                    <p className="text-muted">One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</p>
                    <p className="text-muted">The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={() => { tog_animationZoom(); }}> Close </Button>
                    <Button variant="primary" > Save changes </Button>
                </Modal.Footer>
            </Modal>

            {/* Position Top */}
            <Modal id="topmodal" show={modal_positionTop} onHide={() => { tog_positionTop(); }} >
                <Modal.Header closeButton>
                <Modal.Title>
                    Modal Heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center p-5">
                    <i className="ri-emotion-happy-line display-2 text-success"></i>
                    <div className="mt-4">
                        <h4 className="mb-3">Your event has been created.</h4>
                        <p className="text-muted mb-4"> The transfer was not successfully received by us. the email of the recipient wasn't correct.</p>
                        <div className="hstack gap-2 justify-content-center">
                            <Link href="#" className="btn btn-link link-success fw-medium" onClick={() => { tog_positionTop(); }}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                            <Link href="#" className="btn btn-success">Completed</Link>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Position Top Right */}

            <Modal id="top-rightmodal" show={modal_positionTopRight} onHide={() => { tog_positionTopRight(); }} dialogClassName="modal-dialog-right" >
                <Modal.Header closeButton >
                <Modal.Title>
                    Modal Heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center p-5">
                    <i className="ri-emotion-happy-line display-2 text-success"></i>
                    <div className="mt-4">
                        <h4 className="mb-3">Your event has been created.</h4>
                        <p className="text-muted mb-4"> The transfer was not successfully received by us. the email of the recipient wasn't correct.</p>
                        <div className="hstack gap-2 justify-content-center">
                            <Link href="#" className="btn btn-link link-success fw-medium" onClick={() => { tog_positionTopRight(); }}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                            <Link href="#" className="btn btn-success">Completed</Link>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Position Bottom */}

            <Modal id="bottomModal" show={modal_positionBottom} onHide={() => { tog_positionBottom(); }} dialogClassName="modal-dialog-bottom" >
                <Modal.Header closeButton>
                <Modal.Title>
                    Modal Heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center p-5">
                    <i className="ri-emotion-happy-line display-2 text-success"></i>
                    <div className="mt-4">
                        <h4 className="mb-3">Your event has been created.</h4>
                        <p className="text-muted mb-4">The transfer was not successfully received by us. the email of the recipient wasn't correct.</p>
                        <div className="hstack gap-2 justify-content-center">
                            <Link href="#" className="btn btn-link link-success fw-medium" onClick={() => setmodal_positionBottom(false)}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                            <Link href="#" className="btn btn-success">Completed</Link>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Position Bottom Right */}

            <Modal id="bottom-rightModal" show={modal_positionBottomRight} onHide={() => { tog_positionBottomRight(); }} dialogClassName="modal-dialog-bottom-right" >
                <Modal.Header closeButton>
                <Modal.Title>
                    Modal Heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center p-5">
                    <i className="ri-emotion-happy-line display-2 text-success"></i>
                    <div className="mt-4">
                        <h4 className="mb-3">Your event has been created.</h4>
                        <p className="text-muted mb-4"> The transfer was not successfully received by us. the email of the recipient wasn't correct.</p>
                        <div className="hstack gap-2 justify-content-center">
                            <Link href="#" className="btn btn-link link-success fw-medium" onClick={() => setmodal_positionBottomRight(false)}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                            <Link href="#" className="btn btn-success">Completed</Link>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


            {/* Custom Modals Example */}

            {/* Success Message */}

            <Modal id="success-Payment" tabIndex={1} show={modal_successMessage} onHide={() => { tog_successMessage(); }} centered>
                <Modal.Body className='text-center p-5'>
                    <div className="text-end">
                        <button type="button" onClick={() => { tog_successMessage(); }} className="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="mt-2">
                        <i className="ri-chat-smile-2-line display-2 text-success"></i>
                        <h4 className="mb-3 mt-4">Your Transaction is Successfull !</h4>
                        <p className="text-muted fs-15 mb-4">Successful transaction is the status of operation whose result is the payment of the amount paid by the customer in favor of the merchant.</p>
                        <div className="hstack gap-2 justify-content-center">
                            <button className="btn btn-primary">New transaction</button>
                            <button className="btn btn-soft-success"><i className="ri-links-line align-bottom"></i> Copy tracking link</button>
                        </div>
                    </div>
                </Modal.Body>
                <div className="modal-footer bg-light p-3 justify-content-center" >
                    <p className="mb-0 text-muted">You like our service? <Link href="#" className="link-secondary fw-semibold">Invite Friends</Link></p>
                </div>
            </Modal>


            {/* Login Modals */}

            <Modal id="loginModals" tabIndex={1} show={modal_loginModals} onHide={() => { tog_loginModals(); }} centered>
                <div className="modal-content border-0 overflow-hidden">
                    <Modal.Body className='login-modal p-5'>
                        <h5 className="text-white fs-20">Login</h5>
                        <p className="text-white-50 mb-4">Don't have an account? <Link href="/#" className="text-white">Sign Up.</Link></p>
                        <div className="vstack gap-2 justify-content-center">
                            <button className="btn btn-light"><i className="ri-google-fill align-bottom text-danger"></i> Google</button>
                            <button className="btn btn-info"><i className="ri-facebook-fill align-bottom"></i> Facebook</button>
                        </div>
                    </Modal.Body>
                    <Modal.Body className="p-5">
                        <h5 className="mb-3">Login with Email</h5>
                        <form>
                            <div className="mb-2">
                                <Form.Control type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter your email/username" />
                            </div>
                            <div className="mb-3">
                                <Form.Control type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter your password" />
                                <div className="mt-1 text-end">
                                    <Link href="/auth-pass-reset-basic">Forgot password ?</Link>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Submit</button>
                        </form>
                    </Modal.Body>
                </div>
            </Modal>


            {/* Subscribe Modals */}

            <Modal id="subscribeModals" tabIndex={1} show={subscribeModals} onHide={() => { tog_subscribeModals(); }} centered size='lg'>
                <Row className="g-0">
                    <Col lg={7}>
                        <div className="modal-body p-5">
                            <h2 className="lh-base">Subscribe now today to get <span className="text-danger">20% off</span> experiences!</h2>
                            <p className="text-muted mb-4">A free bet is a bet which is provided by a betting
                                site for a customer to place and then benefit from the winnings. Free bets are commonly used as welcome offers.</p>
                            <div className="input-group mb-3">

                                <Form.Control type="text" className="form-control" placeholder="Enter your email" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                <button className="btn btn-primary" type="button" id="button-addon1">Subscript Now</button>
                            </div>

                            <div className="form-check">
                                <Form.Control type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <Form.Label className="form-check-label" htmlFor="exampleCheck1">By subscribing to a particular channel or user on YouTube, you can receive instant updates.</Form.Label>
                            </div>
                        </div>
                    </Col>
                    <Col lg={5}>
                        <div className="subscribe-modals-cover h-100">
                            <img src={authbg} alt="" className="h-100 w-100 object-fit-cover" style={{ clipPath: "polygon(100% 0%, 100% 100%, 100% 100%, 0% 100%, 25% 50%, 0% 0%)" }} />
                        </div>
                    </Col>
                </Row>
            </Modal>


            {/* Subscribe Modals */}

            <Modal id="signupModals" tabIndex={1} show={modal_signUpModals} onHide={() => { tog_signUpModals(); }} centered>
                <Modal.Header className='p-3' closeButton>
                    <h5 className='modal-title'>
                        Sign Up
                    </h5>
                </Modal.Header>
                <Alert variant="success" className="rounded-0 mb-0">
                    <p className="mb-0">Up to <span className="fw-semibold">50% OFF</span>, Hurry up before the stock ends</p>
                </Alert>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <Form.Label htmlFor="fullName" className="form-label">Full Name</Form.Label>
                            <Form.Control type="email" className="form-control" id="fullName" placeholder="Enter your name" />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="emailInput" className="form-label">Email address</Form.Label>
                            <Form.Control type="email" className="form-control" id="emailInput" placeholder="Enter your email" />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="exampleInputPassword1" className="form-label">Password</Form.Label>
                            <Form.Control type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter your password" />
                        </div>
                        <div className="mb-3 form-check">
                            <Form.Check.Input type="checkbox" className="form-check-input" id="checkTerms" />
                            <Form.Check.Label className="form-check-label" htmlFor="checkTerms">I agree to the <span className="fw-semibold">Terms of Service</span> and Privacy Policy</Form.Check.Label>
                        </div>
                        <div className="text-end">
                            <button type="submit" className="btn btn-primary">Sign Up Now</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </React.Fragment >
    );
};
UiModals.layout = (page: any) => <Layout children={page} />
export default UiModals;
