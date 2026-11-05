import React, { useState } from 'react';
import { Button, Card, Col, Container, Image, Offcanvas, OverlayTrigger, Row, Tooltip, } from 'react-bootstrap';

// Import Content
import UiContent from '../../../Components/Common/UiContent';
//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import SimpleBar from 'simplebar-react';
import { DefaultOffcanvasExample, PlacementOffcanvasExample, BackdropOffcanvasExample } from './UiOffcanvasCode';

// Import Images
import avatar1 from "../../../../images/users/avatar-1.jpg";
import avatar2 from "../../../../images/users/avatar-2.jpg";
import avatar3 from "../../../../images/users/avatar-3.jpg";
import avatar4 from "../../../../images/users/avatar-4.jpg";
import avatar6 from "../../../../images/users/avatar-6.jpg";
import avatar7 from "../../../../images/users/avatar-7.jpg";
import avatar8 from "../../../../images/users/avatar-8.jpg";

import img2 from "../../../../images/small/img-2.jpg";
import img3 from "../../../../images/small/img-3.jpg";
import img4 from "../../../../images/small/img-4.jpg";
import img9 from "../../../../images/small/img-9.jpg";
import img10 from "../../../../images/small/img-10.jpg";
import img11 from "../../../../images/small/img-11.jpg";
import img12 from "../../../../images/small/img-12.jpg";
import { Head, Link } from '@inertiajs/react';
import Layout from '../../../Layouts';

const UiOffcanvas = () => {
    const [isTop, setIsTop] = useState<boolean>(false);
    const [isRight, setIsRight] = useState<boolean>(false);
    const [isBottom, setIsBottom] = useState<boolean>(false);
    const [isLeft, setIsLeft] = useState<boolean>(false);
    const [isEnableScroll, setIsEnableScroll] = useState<boolean>(false);
    const [isBackdrop, setIsBackdrop] = useState<boolean>(false);
    const [isScrollBackDrop, setIsScrollBackDrop] = useState<boolean>(false);


    const toggleTopCanvas = () => {
        setIsTop(!isTop);
    };
    const toggleRightCanvas = () => {
        setIsRight(!isRight);
    };
    const toggleBottomCanvas = () => {
        setIsBottom(!isBottom);
    };
    const toggleLeftCanvas = () => {
        setIsLeft(!isLeft);
    };
    const toggleEnableScroll = () => {
        setIsEnableScroll(!isEnableScroll);
    };
    const toggleBackdrop = () => {
        setIsBackdrop(!isBackdrop);
    };
    const toggleScrollBackDrop = () => {
        setIsScrollBackDrop(!isScrollBackDrop);
    };

    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <React.Fragment>
            <Head title='Offcanvas | Velzon - React Admin & Dashboard Template' />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Offcanvas" pageTitle="Base UI" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Default Offcanvas" />

                                <Card.Body>
                                    <p className="text-muted">Use the <code>offcanvas</code> class to set a default offcanvas.</p>
                                    <div className="live-preview">
                                        <div className="hstack flex-wrap gap-2">
                                            <Button variant="link" href="#" className="btn btn-secondary text-white" onClick={handleShow}>
                                                Link with href
                                            </Button>
                                            <Button variant="secondary" onClick={handleShow}>
                                                Button with data-bs-target
                                            </Button>
                                        </div>

                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <DefaultOffcanvasExample />
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
                                <PreviewCardHeader title="Placement Offcanvas" />
                                <Card.Body>
                                    <p className="text-muted">Use <code>direction="start"</code> , <code>direction="top"</code>, <code>direction="bottom"</code>, or <code>direction="end"</code>, to offcanvas attribute to set different Offcanvas Placement.</p>
                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap gap-2">
                                            <Button variant="primary" onClick={toggleTopCanvas}>Toggle Top Offcanvas</Button>
                                            <Button variant="secondary" onClick={toggleRightCanvas}>Toggle Right Offcanvas</Button>
                                            <Button variant="success" onClick={toggleBottomCanvas}>Toggle Bottom Offcanvas</Button>
                                            <Button variant="danger" onClick={toggleLeftCanvas}>Toggle Left Offcanvas</Button>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <PlacementOffcanvasExample />
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
                                <PreviewCardHeader title="Backdrop Offcanvas" />
                                <Card.Body>
                                    <p className="text-muted">Here are the example of offcanvas with scrolling active and backdrop visible.</p>
                                    <div className="live-preview">
                                        <div className="d-flex flex-wrap gap-2">
                                            <Button className="btn btn-light" onClick={toggleEnableScroll}>Enable Body Scrolling</Button>
                                            <Button className="btn btn-light" onClick={toggleBackdrop}>Enable Backdrop (Default)</Button>
                                            <Button className="btn btn-light" onClick={toggleScrollBackDrop}>Enable Both Scrolling & Backdrop</Button>
                                        </div>

                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <BackdropOffcanvasExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </Container >
            </div >

            {/* Defult Offcanvas */}
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header className="border-bottom" closeButton>
                    <Offcanvas.Title id="offcanvasExampleLabel">Recent Acitivity</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-0 overflow-hidden">
                    <SimpleBar style={{ height: "calc(100vh - 112px)" }}>
                        <div className="acitivity-timeline p-4">
                            <div className="acitivity-item d-flex">
                                <div className="flex-shrink-0">
                                    <Image src={avatar1} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Oliver Phillips <span className="badge bg-primary-subtle text-primary align-middle">New</span></h6>
                                    <p className="text-muted mb-2">We talked about a project on linkedin.</p>
                                    <small className="mb-0 text-muted">Today</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                                    <div className="avatar-title bg-success-subtle text-success rounded-circle">
                                        N
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Nancy Martino <span className="badge bg-secondary-subtle text-secondary align-middle">In Progress</span></h6>
                                    <p className="text-muted mb-2"><i className="ri-file-text-line align-middle ms-2"></i> Create new project Building product</p>
                                    <div className="avatar-group mb-2">
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Christi</Tooltip>}
                                            >
                                                <Image src={avatar4} alt="" className="rounded-circle avatar-xs" />
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Frank Hook</Tooltip>}
                                            >
                                                <a href="#" className="avatar-group-item">
                                                    <Image src={avatar3} alt="" className="rounded-circle avatar-xs" />
                                                </a>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Ruby</Tooltip>}
                                            >
                                                <Link href="#" className="avatar-group-item">
                                                    <div className="avatar-xs">
                                                        <div className="avatar-title rounded-circle bg-light text-primary">
                                                            R
                                                        </div>
                                                    </div>
                                                </Link>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>More</Tooltip>}
                                            >
                                                <Link href="#" className="avatar-group-item">
                                                    <div className="avatar-xs">
                                                        <div className="avatar-title rounded-circle">
                                                            2+
                                                        </div>
                                                    </div>
                                                </Link>
                                            </OverlayTrigger>

                                    </div>
                                    <small className="mb-0 text-muted">Yesterday</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <Image src={avatar2} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Natasha Carey <span className="badge bg-success-subtle text-success align-middle">Completed</span></h6>
                                    <p className="text-muted mb-2">Adding a new event with attachments</p>
                                    <div className="row border border-dashed gx-2 p-2 mb-2">
                                        <div className="col-4">
                                            <Image src={img2} alt="" className="img-fluid rounded" />
                                        </div>
                                        <div className="col-4">
                                            <Image src={img3} alt="" className="img-fluid rounded" />
                                        </div>
                                        <div className="col-4">
                                            <Image src={img4} alt="" className="img-fluid rounded" />
                                        </div>
                                    </div>
                                    <small className="mb-0 text-muted">25 Nov</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <Image src={avatar6} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Bethany Johnson</h6>
                                    <p className="text-muted mb-2">added a new member to Judia dashboard</p>
                                    <small className="mb-0 text-muted">19 Nov</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <div className="avatar-xs acitivity-avatar">
                                        <div className="avatar-title rounded-circle bg-danger-subtle text-danger">
                                            <i className="ri-shopping-bag-line"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Your order is placed <span className="badge bg-danger-subtle text-danger align-middle ms-1">Out of Delivery</span></h6>
                                    <p className="text-muted mb-2">These customers can rest assured their order has been placed.</p>
                                    <small className="mb-0 text-muted">16 Nov</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <Image src={avatar7} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Lewis Pratt</h6>
                                    <p className="text-muted mb-2">They all have something to say beyond the words on the page. They can come across as casual or neutral, exotic or graphic. </p>
                                    <small className="mb-0 text-muted">22 Oct</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <div className="avatar-xs acitivity-avatar">
                                        <div className="avatar-title rounded-circle bg-info-subtle text-info">
                                            <i className="ri-line-chart-line"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Monthly sales report</h6>
                                    <p className="text-muted mb-2"><span className="text-danger">2 days left</span> notification to submit the monthly sales report. <Link href="#" className="link-warning text-decoration-underline">Reports Builder</Link></p>
                                    <small className="mb-0 text-muted">15 Oct</small>
                                </div>
                            </div>
                            <div className="acitivity-item d-flex">
                                <div className="flex-shrink-0">
                                    <Image src={avatar8} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">New ticket received <span className="badge bg-success-subtle text-success align-middle">Completed</span></h6>
                                    <p className="text-muted mb-2">User <span className="text-secondary">Erica245</span> submitted a ticket.</p>
                                    <small className="mb-0 text-muted">26 Aug</small>
                                </div>
                            </div>
                        </div>
                    </SimpleBar>
                </Offcanvas.Body>
                <div className="offcanvas-foorter border-top p-3 text-center">
                    <Link href="#" className="link-success">View All Acitivity <i className="ri-arrow-right-s-line align-middle ms-1"></i></Link>
                </div>
            </Offcanvas>

            {/* Top offcanvas */}
            <Offcanvas
                show={isTop}
                placement='top'
                onHide={toggleTopCanvas}
                id="offcanvasTop"
                style={{ minHeight: "46vh" }}
            >
                <Offcanvas.Header closeButton className='border-bottom'>
                    <Offcanvas.Title id="offcanvasExampleLabel">Gallery</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row className="gallery-light">
                        <Col xl={3} lg={4} sm={6}>
                            <Card className="gallery-box light mb-0">
                                <div className="gallery-container">
                                    <Link href="#" title="">
                                        <img className="gallery-img img-fluid mx-auto" src={img12} alt="" />
                                        <div className="gallery-overlay">
                                            <h5 className="overlay-caption">A mix of friends and strangers heading off to find an adventure.</h5>
                                        </div>
                                    </Link>
                                </div>
                                <div className="box-content">
                                    <div className="d-flex align-items-center mt-1">
                                        <div className="flex-grow-1 text-muted">by <Link href="#" className="text-body text-truncate">Erica Kernan</Link></div>
                                        <div className="flex-shrink-0">
                                            <div className="d-flex gap-3">
                                                <button type="button" className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0">
                                                    <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i> 3.4K
                                                </button>
                                                <button type="button" className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0">
                                                    <i className="ri-question-answer-fill text-muted align-bottom me-1"></i> 1.3K
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col xl={3} lg={4} sm={6}>
                            <Card className="gallery-box light mb-0">
                                <div className="gallery-container">
                                    <Link href="#" title="">
                                        <img className="gallery-img img-fluid mx-auto" src={img9} alt="" />
                                        <div className="gallery-overlay">
                                            <h5 className="overlay-caption">Dramatic clouds at the Golden Gate Bridge</h5>
                                        </div>
                                    </Link>
                                </div>
                                <div className="box-content">
                                    <div className="d-flex align-items-center mt-1">
                                        <div className="flex-grow-1 text-muted">by <Link href="#" className="text-body text-truncate">Ron Mackie</Link></div>
                                        <div className="flex-shrink-0">
                                            <div className="d-flex gap-3">
                                                <button type="button" className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0">
                                                    <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i> 5.1K
                                                </button>
                                                <button type="button" className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0">
                                                    <i className="ri-question-answer-fill text-muted align-bottom me-1"></i> 4.7K
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col xl={3} lg={4} sm={6}>
                            <Card className="gallery-box mb-0">
                                <div className="gallery-container">
                                    <Link href="#" title="">
                                        <img className="gallery-img img-fluid mx-auto" src={img11} alt="" />
                                        <div className="gallery-overlay">
                                            <h5 className="overlay-caption">Cycling in the countryside</h5>
                                        </div>
                                    </Link>
                                </div>

                                <div className="box-content">
                                    <div className="d-flex align-items-center mt-1">
                                        <div className="flex-grow-1 text-muted">by <Link href="#" className="text-body text-truncate">Nancy Martino</Link></div>
                                        <div className="flex-shrink-0">
                                            <div className="d-flex gap-3">
                                                <button type="button" className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0">
                                                    <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i> 3.2K
                                                </button>
                                                <button type="button" className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0">
                                                    <i className="ri-question-answer-fill text-muted align-bottom me-1"></i> 1.1K
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col xl={3} lg={4} sm={6} className="d-md-none d-xl-block">
                            <Card className="gallery-box mb-0">
                                <div className="gallery-container">
                                    <Link href="#" title="">
                                        <img className="gallery-img img-fluid mx-auto" src={img10} alt="" />
                                        <div className="gallery-overlay">
                                            <h5 className="overlay-caption">Fun day at the Hill Station</h5>
                                        </div>
                                    </Link>
                                </div>
                                <div className="box-content">
                                    <div className="d-flex align-items-center mt-1">
                                        <div className="flex-grow-1 text-muted">by <Link href="#" className="text-body text-truncate">Henry Baird</Link></div>
                                        <div className="flex-shrink-0">
                                            <div className="d-flex gap-3">
                                                <button type="button" className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0">
                                                    <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i> 632
                                                </button>
                                                <button type="button" className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0">
                                                    <i className="ri-question-answer-fill text-muted align-bottom me-1"></i> 95
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Right offcanvas */}
            <Offcanvas
                show={isRight}
                placement="end"
                onHide={toggleRightCanvas}
                id="offcanvasRight"
                className="border-bottom"
            >
                <Offcanvas.Header closeButton className='border-bottom'>
                    <Offcanvas.Title id="offcanvasExampleLabel">Recent Acitivity</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-0 overflow-hidden">
                    <SimpleBar style={{ height: "100vh" }}>
                        <div className="acitivity-timeline p-4">
                            <div className="acitivity-item d-flex">
                                <div className="flex-shrink-0">
                                    <img src={avatar1} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Oliver Phillips <span className="badge bg-primary-subtle text-primary align-middle">New</span></h6>
                                    <p className="text-muted mb-2">We talked about a project on linkedin.</p>
                                    <small className="mb-0 text-muted">Today</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                                    <div className="avatar-title bg-success-subtle text-success rounded-circle">
                                        N
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Nancy Martino <span className="badge bg-secondary-subtle text-secondary align-middle">In Progress</span></h6>
                                    <p className="text-muted mb-2"><i className="ri-file-text-line align-middle ms-2"></i> Create new project Buildng product</p>
                                    <div className="avatar-group mb-2">
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Christi</Tooltip>}
                                            >
                                                <Image src={avatar4} alt="" className="rounded-circle avatar-xs" />
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Frank Hook</Tooltip>}
                                            >
                                                <a href="#" className="avatar-group-item">
                                                    <Image src={avatar3} alt="" className="rounded-circle avatar-xs" />
                                                </a>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Ruby</Tooltip>}
                                            >
                                                <Link href="#" className="avatar-group-item">
                                                    <div className="avatar-xs">
                                                        <div className="avatar-title rounded-circle bg-light text-primary">
                                                            R
                                                        </div>
                                                    </div>
                                                </Link>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>More</Tooltip>}
                                            >
                                                <Link href="#" className="avatar-group-item">
                                                    <div className="avatar-xs">
                                                        <div className="avatar-title rounded-circle">
                                                            2+
                                                        </div>
                                                    </div>
                                                </Link>
                                            </OverlayTrigger>
                                    </div>
                                    <small className="mb-0 text-muted">Yesterday</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <img src={avatar2} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Natasha Carey <span className="badge bg-success-subtle text-success align-middle">Completed</span></h6>
                                    <p className="text-muted mb-2">Adding a new event with attachments</p>
                                    <div className="row border border-dashed gx-2 p-2 mb-2">
                                        <Col className="col-4">
                                            <img src={img2} alt="" className="img-fluid rounded" />
                                        </Col>
                                        <Col className="col-4">
                                            <img src={img3} alt="" className="img-fluid rounded" />
                                        </Col>
                                        <Col className="col-4">
                                            <img src={img4} alt="" className="img-fluid rounded" />
                                        </Col>
                                    </div>
                                    <small className="mb-0 text-muted">25 Nov</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <img src={avatar6} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Bethany Johnson</h6>
                                    <p className="text-muted mb-2">added a new member to velzon dashboard</p>
                                    <small className="mb-0 text-muted">19 Nov</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <div className="avatar-xs acitivity-avatar">
                                        <div className="avatar-title rounded-circle bg-danger-subtle text-danger">
                                            <i className="ri-shopping-bag-line"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Your order is placed <span className="badge bg-danger-subtle text-danger align-middle ms-1">Out of Delivery</span></h6>
                                    <p className="text-muted mb-2">These customers can rest assured their order has been placed.</p>
                                    <small className="mb-0 text-muted">16 Nov</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <img src={avatar7} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Lewis Pratt</h6>
                                    <p className="text-muted mb-2">They all have something to say beyond the words on the page. They can come across as casual or neutral, exotic or graphic. </p>
                                    <small className="mb-0 text-muted">22 Oct</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <div className="avatar-xs acitivity-avatar">
                                        <div className="avatar-title rounded-circle bg-info-subtle text-info">
                                            <i className="ri-line-chart-line"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Monthly sales report</h6>
                                    <p className="text-muted mb-2"><span className="text-danger">2 days left</span> notification to submit the monthly sales report. <Link href="#" className="link-warning text-decoration-underline">Reports Builder</Link></p>
                                    <small className="mb-0 text-muted">15 Oct</small>
                                </div>
                            </div>
                            <div className="acitivity-item d-flex">
                                <div className="flex-shrink-0">
                                    <img src={avatar8} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">New ticket received <span className="badge bg-success-subtle text-success align-middle">Completed</span></h6>
                                    <p className="text-muted mb-2">User <span className="text-secondary">Erica245</span> submitted a ticket.</p>
                                    <small className="mb-0 text-muted">26 Aug</small>
                                </div>
                            </div>
                        </div>
                    </SimpleBar>
                </Offcanvas.Body>
                <div className="offcanvas-foorter border p-3 text-center">
                    <Link href="#" className="link-success">View All Acitivity <i className="ri-arrow-right-s-line align-middle ms-1"></i></Link>
                </div>
            </Offcanvas>

            {/* Bottom offcanvas */}
            <Offcanvas
                show={isBottom}
                placement="bottom"
                onHide={toggleBottomCanvas}
                id="offcanvasBottom"
                style={{ minHeight: "46vh" }}
            >
                <Offcanvas.Header closeButton className="border-bottom">
                    <Offcanvas.Title id="offcanvasBottomLabel">Gallery</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row className="gallery-light">
                        <Col xl={3} lg={4} sm={6}>
                            <Card className="gallery-box light mb-0">
                                <div className="gallery-container">
                                    <Link href="#" title="">
                                        <img className="gallery-img img-fluid mx-auto" src={img12} alt="" />
                                        <div className="gallery-overlay">
                                            <h5 className="overlay-caption">A mix of friends and strangers heading off to find an adventure.</h5>
                                        </div>
                                    </Link>
                                </div>
                                <div className="box-content">
                                    <div className="d-flex align-items-center mt-1">
                                        <div className="flex-grow-1 text-muted">by <Link href="#" className="text-body text-truncate">Erica Kernan</Link></div>
                                        <div className="flex-shrink-0">
                                            <div className="d-flex gap-3">
                                                <button type="button" className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0">
                                                    <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i> 3.4K
                                                </button>
                                                <button type="button" className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0">
                                                    <i className="ri-question-answer-fill text-muted align-bottom me-1"></i> 1.3K
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col xl={3} lg={4} sm={6}>
                            <Card className="gallery-box light mb-0">
                                <div className="gallery-container">
                                    <Link href="#" title="">
                                        <img className="gallery-img img-fluid mx-auto" src={img9} alt="" />
                                        <div className="gallery-overlay">
                                            <h5 className="overlay-caption">Dramatic clouds at the Golden Gate Bridge</h5>
                                        </div>
                                    </Link>
                                </div>
                                <div className="box-content">
                                    <div className="d-flex align-items-center mt-1">
                                        <div className="flex-grow-1 text-muted">by <Link href="#" className="text-body text-truncate">Ron Mackie</Link></div>
                                        <div className="flex-shrink-0">
                                            <div className="d-flex gap-3">
                                                <button type="button" className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0">
                                                    <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i> 5.1K
                                                </button>
                                                <button type="button" className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0">
                                                    <i className="ri-question-answer-fill text-muted align-bottom me-1"></i> 4.7K
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col xl={3} lg={4} sm={6}>
                            <Card className="gallery-box mb-0">
                                <div className="gallery-container">
                                    <Link href="#" title="">
                                        <img className="gallery-img img-fluid mx-auto" src={img11} alt="" />
                                        <div className="gallery-overlay">
                                            <h5 className="overlay-caption">Cycling in the countryside</h5>
                                        </div>
                                    </Link>

                                </div>

                                <div className="box-content">
                                    <div className="d-flex align-items-center mt-1">
                                        <div className="flex-grow-1 text-muted">by <Link href="#" className="text-body text-truncate">Nancy Martino</Link></div>
                                        <div className="flex-shrink-0">
                                            <div className="d-flex gap-3">
                                                <button type="button" className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0">
                                                    <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i> 5.1K
                                                </button>
                                                <button type="button" className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0">
                                                    <i className="ri-question-answer-fill text-muted align-bottom me-1"></i> 4.7K
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col xl={3} lg={4} sm={6} className="d-md-none d-xl-block">
                            <Card className="gallery-box mb-0">
                                <div className="gallery-container">
                                    <Link href="#" title="">
                                        <img className="gallery-img img-fluid mx-auto" src={img10} alt="" />
                                        <div className="gallery-overlay">
                                            <h5 className="overlay-caption">Fun day at the Hill Station</h5>
                                        </div>
                                    </Link>
                                </div>
                                <div className="box-content">
                                    <div className="d-flex align-items-center mt-1">
                                        <div className="flex-grow-1 text-muted">by <Link href="#" className="text-body text-truncate">Henry Baird</Link></div>
                                        <div className="flex-shrink-0">
                                            <div className="d-flex gap-3">
                                                <button type="button" className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0">
                                                    <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i> 632
                                                </button>
                                                <button type="button" className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0">
                                                    <i className="ri-question-answer-fill text-muted align-bottom me-1"></i> 95
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Left offcanvas */}
            <Offcanvas
                show={isLeft}
                placement="start"
                onHide={toggleLeftCanvas}
                id="offcanvasLeft"
            >
                <Offcanvas.Header closeButton className="border-bottom">
                    <Offcanvas.Title id="offcanvasLeftLabel">Recent Acitivity</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <SimpleBar style={{ height: "100vh" }}>
                        <div className="acitivity-timeline p-4">
                            <div className="acitivity-item d-flex">
                                <div className="flex-shrink-0">
                                    <img src={avatar1} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Oliver Phillips <span className="badge bg-primary-subtle text-primary align-middle">New</span></h6>
                                    <p className="text-muted mb-2">We talked about a project on linkedin.</p>
                                    <small className="mb-0 text-muted">Today</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                                    <div className="avatar-title bg-success-subtle text-success rounded-circle">
                                        N
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Nancy Martino <span className="badge bg-secondary-subtle text-secondary align-middle">In Progress</span></h6>
                                    <p className="text-muted mb-2"><i className="ri-file-text-line align-middle ms-2"></i> Create new project Buildng product</p>
                                    <div className="avatar-group mb-2">
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Christi</Tooltip>}
                                            >
                                                <Image src={avatar4} alt="" className="rounded-circle avatar-xs" />
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Frank Hook</Tooltip>}
                                            >
                                                <a href="#" className="avatar-group-item">
                                                    <Image src={avatar3} alt="" className="rounded-circle avatar-xs" />
                                                </a>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Ruby</Tooltip>}
                                            >
                                                <Link href="#" className="avatar-group-item">
                                                    <div className="avatar-xs">
                                                        <div className="avatar-title rounded-circle bg-light text-primary">
                                                            R
                                                        </div>
                                                    </div>
                                                </Link>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>More</Tooltip>}
                                            >
                                                <Link href="#" className="avatar-group-item">
                                                    <div className="avatar-xs">
                                                        <div className="avatar-title rounded-circle">
                                                            2+
                                                        </div>
                                                    </div>
                                                </Link>
                                            </OverlayTrigger>
                                    </div>
                                    <small className="mb-0 text-muted">Yesterday</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <img src={avatar2} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Natasha Carey <span className="badge bg-success-subtle text-success align-middle">Completed</span></h6>
                                    <p className="text-muted mb-2">Adding a new event with attachments</p>
                                    <div className="row border border-dashed gx-2 p-2 mb-2">
                                        <Col className="col-4">
                                            <img src={img2} alt="" className="img-fluid rounded" />
                                        </Col>
                                        <Col className="col-4">
                                            <img src={img3} alt="" className="img-fluid rounded" />
                                        </Col>
                                        <Col className="col-4">
                                            <img src={img4} alt="" className="img-fluid rounded" />
                                        </Col>
                                    </div>
                                    <small className="mb-0 text-muted">25 Nov</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <img src={avatar6} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Bethany Johnson</h6>
                                    <p className="text-muted mb-2">added a new member to velzon dashboard</p>
                                    <small className="mb-0 text-muted">19 Nov</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <div className="avatar-xs acitivity-avatar">
                                        <div className="avatar-title rounded-circle bg-danger-subtle text-danger">
                                            <i className="ri-shopping-bag-line"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Your order is placed <span className="badge bg-danger-subtle text-danger align-middle ms-1">Out of Delivery</span></h6>
                                    <p className="text-muted mb-2">These customers can rest assured their order has been placed.</p>
                                    <small className="mb-0 text-muted">16 Nov</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <img src={avatar7} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Lewis Pratt</h6>
                                    <p className="text-muted mb-2">They all have something to say beyond the words on the page. They can come across as casual or neutral, exotic or graphic. </p>
                                    <small className="mb-0 text-muted">22 Oct</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <div className="avatar-xs acitivity-avatar">
                                        <div className="avatar-title rounded-circle bg-info-subtle text-info">
                                            <i className="ri-line-chart-line"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Monthly sales report</h6>
                                    <p className="text-muted mb-2"><span className="text-danger">2 days left</span> notification to submit the monthly sales report. <Link href="#" className="link-warning text-decoration-underline">Reports Builder</Link></p>
                                    <small className="mb-0 text-muted">15 Oct</small>
                                </div>
                            </div>
                            <div className="acitivity-item d-flex">
                                <div className="flex-shrink-0">
                                    <img src={avatar8} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">New ticket received <span className="badge bg-success-subtle text-success align-middle">Completed</span></h6>
                                    <p className="text-muted mb-2">User <span className="text-secondary">Erica245</span> submitted a ticket.</p>
                                    <small className="mb-0 text-muted">26 Aug</small>
                                </div>
                            </div>
                        </div>
                    </SimpleBar>
                </Offcanvas.Body>
                <div className="offcanvas-foorter border-top p-3 text-center">
                    <Link href="#" className="link-success">View All Acitivity <i className="ri-arrow-right-s-line align-middle ms-1"></i></Link>
                </div>
            </Offcanvas>

            {/* Enable body scrolling */}
            <Offcanvas
                show={isEnableScroll}
                scroll={false}
                backdrop={true}
                onHide={toggleEnableScroll}
                id="offcanvasScrolling"
            >
                <Offcanvas.Header closeButton
                    className="border-bottom"
                >
                    <Offcanvas.Title id="offcanvasScrollingLabel">Customer Activity</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-0 overflow-hidden">
                    <div>
                        <SimpleBar style={{ height: "100vh" }}>
                            <div className="acitivity-timeline p-4">
                                <div className="acitivity-item d-flex">
                                    <div className="flex-shrink-0">
                                        <img src={avatar1} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">Oliver Phillips <span className="badge bg-primary-subtle text-primary align-middle">New</span></h6>
                                        <p className="text-muted mb-2">We talked about a project on linkedin.</p>
                                        <small className="mb-0 text-muted">Today</small>
                                    </div>
                                </div>
                                <div className="acitivity-item py-3 d-flex">
                                    <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                                        <div className="avatar-title bg-success-subtle text-success rounded-circle">
                                            N
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">Nancy Martino <span className="badge bg-secondary-subtle text-secondary align-middle">In Progress</span></h6>
                                        <p className="text-muted mb-2"><i className="ri-file-text-line align-middle ms-2"></i> Create new project Buildng product</p>
                                        <div className="avatar-group mb-2">
                                        <div>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Christi</Tooltip>}
                                            >
                                                <Image src={avatar4} alt="" className="rounded-circle avatar-xs" />
                                            </OverlayTrigger>
                                        </div>

                                        <div>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Frank Hook</Tooltip>}
                                            >
                                                <a href="#" className="avatar-group-item">
                                                    <Image src={avatar3} alt="" className="rounded-circle avatar-xs" />
                                                </a>
                                            </OverlayTrigger>
                                        </div>

                                        <div>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Ruby</Tooltip>}
                                            >
                                                <Link href="#" className="avatar-group-item">
                                                    <div className="avatar-xs">
                                                        <div className="avatar-title rounded-circle bg-light text-primary">
                                                            R
                                                        </div>
                                                    </div>
                                                </Link>
                                            </OverlayTrigger>
                                        </div>

                                        <div>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>More</Tooltip>}
                                            >
                                                <Link href="#" className="avatar-group-item">
                                                    <div className="avatar-xs">
                                                        <div className="avatar-title rounded-circle">
                                                            2+
                                                        </div>
                                                    </div>
                                                </Link>
                                            </OverlayTrigger>
                                        </div>

                                        </div>
                                        <small className="mb-0 text-muted">Yesterday</small>
                                    </div>
                                </div>
                                <div className="acitivity-item py-3 d-flex">
                                    <div className="flex-shrink-0">
                                        <img src={avatar2} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">Natasha Carey <span className="badge bg-success-subtle text-success align-middle">Completed</span></h6>
                                        <p className="text-muted mb-2">Adding a new event with attachments</p>
                                        <div className="row border border-dashed gx-2 p-2 mb-2">
                                            <Col className="col-4">
                                                <img src={img2} alt="" className="img-fluid rounded" />
                                            </Col>
                                            <Col className="col-4">
                                                <img src={img3} alt="" className="img-fluid rounded" />
                                            </Col>
                                            <Col className="col-4">
                                                <img src={img4} alt="" className="img-fluid rounded" />
                                            </Col>
                                        </div>
                                        <small className="mb-0 text-muted">25 Nov</small>
                                    </div>
                                </div>
                                <div className="acitivity-item py-3 d-flex">
                                    <div className="flex-shrink-0">
                                        <img src={avatar6} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">Bethany Johnson</h6>
                                        <p className="text-muted mb-2">added a new member to velzon dashboard</p>
                                        <small className="mb-0 text-muted">19 Nov</small>
                                    </div>
                                </div>
                                <div className="acitivity-item py-3 d-flex">
                                    <div className="flex-shrink-0">
                                        <div className="avatar-xs acitivity-avatar">
                                            <div className="avatar-title rounded-circle bg-danger-subtle text-danger">
                                                <i className="ri-shopping-bag-line"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">Your order is placed <span className="badge bg-danger-subtle text-danger align-middle ms-1">Out of Delivery</span></h6>
                                        <p className="text-muted mb-2">These customers can rest assured their order has been placed.</p>
                                        <small className="mb-0 text-muted">16 Nov</small>
                                    </div>
                                </div>
                                <div className="acitivity-item py-3 d-flex">
                                    <div className="flex-shrink-0">
                                        <img src={avatar7} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">Lewis Pratt</h6>
                                        <p className="text-muted mb-2">They all have something to say beyond the words on the page. They can come across as casual or neutral, exotic or graphic. </p>
                                        <small className="mb-0 text-muted">22 Oct</small>
                                    </div>
                                </div>
                                <div className="acitivity-item py-3 d-flex">
                                    <div className="flex-shrink-0">
                                        <div className="avatar-xs acitivity-avatar">
                                            <div className="avatar-title rounded-circle bg-info-subtle text-info">
                                                <i className="ri-line-chart-line"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">Monthly sales report</h6>
                                        <p className="text-muted mb-2"><span className="text-danger">2 days left</span> notification to submit the monthly sales report. <Link href="#" className="link-warning text-decoration-underline">Reports Builder</Link></p>
                                        <small className="mb-0 text-muted">15 Oct</small>
                                    </div>
                                </div>
                                <div className="acitivity-item d-flex">
                                    <div className="flex-shrink-0">
                                        <img src={avatar8} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">New ticket received <span className="badge bg-success-subtle text-success align-middle">Completed</span></h6>
                                        <p className="text-muted mb-2">User <span className="text-secondary">Erica245</span> submitted a ticket.</p>
                                        <small className="mb-0 text-muted">26 Aug</small>
                                    </div>
                                </div>
                            </div>
                        </SimpleBar>
                    </div>
                </Offcanvas.Body>
                <div className="offcanvas-foorter border-top p-3 text-center">
                    <Link href="#" className="link-success">View All Acitivity <i className="ri-arrow-right-s-line align-middle ms-1"></i></Link>
                </div>
            </Offcanvas>

            {/* Enable backdrop (default) */}
            <Offcanvas
                show={isBackdrop}
                scroll={true}
                backdrop={false}
                onHide={toggleBackdrop}
                id="offcanvasWithBackdrop"
                className="border-bottom"
            >
                <Offcanvas.Header closeButton className="border-bottom">
                    <Offcanvas.Title id="offcanvasWithBackdropLabel">Customer Activity</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-0 overflow-hidden">
                    <div>
                        <SimpleBar style={{ height: "100vh" }}>
                            <div className="acitivity-timeline p-4">
                                <div className="acitivity-item d-flex">
                                    <div className="flex-shrink-0">
                                        <img src={avatar1} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">Oliver Phillips <span className="badge bg-primary-subtle text-primary align-middle">New</span></h6>
                                        <p className="text-muted mb-2">We talked about a project on linkedin.</p>
                                        <small className="mb-0 text-muted">Today</small>
                                    </div>
                                </div>
                                <div className="acitivity-item py-3 d-flex">
                                    <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                                        <div className="avatar-title bg-success-subtle text-success rounded-circle">
                                            N
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">Nancy Martino <span className="badge bg-secondary-subtle text-secondary align-middle">In Progress</span></h6>
                                        <p className="text-muted mb-2"><i className="ri-file-text-line align-middle ms-2"></i> Create new project Buildng product</p>
                                        <div className="avatar-group mb-2">
                                        
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Christi</Tooltip>}
                                            >
                                                <Image src={avatar4} alt="" className="rounded-circle avatar-xs" />
                                            </OverlayTrigger>

                                       
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Frank Hook</Tooltip>}
                                            >
                                                <a href="#" className="avatar-group-item">
                                                    <Image src={avatar3} alt="" className="rounded-circle avatar-xs" />
                                                </a>
                                            </OverlayTrigger>
                                        
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Ruby</Tooltip>}
                                            >
                                                <Link href="#" className="avatar-group-item">
                                                    <div className="avatar-xs">
                                                        <div className="avatar-title rounded-circle bg-light text-primary">
                                                            R
                                                        </div>
                                                    </div>
                                                </Link>
                                            </OverlayTrigger>
                                        
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>More</Tooltip>}
                                            >
                                                <Link href="#" className="avatar-group-item">
                                                    <div className="avatar-xs">
                                                        <div className="avatar-title rounded-circle">
                                                            2+
                                                        </div>
                                                    </div>
                                                </Link>
                                            </OverlayTrigger>
                                        

                                        </div>
                                        <small className="mb-0 text-muted">Yesterday</small>
                                    </div>
                                </div>
                                <div className="acitivity-item py-3 d-flex">
                                    <div className="flex-shrink-0">
                                        <img src={avatar2} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">Natasha Carey <span className="badge bg-success-subtle text-success align-middle">Completed</span></h6>
                                        <p className="text-muted mb-2">Adding a new event with attachments</p>
                                        <div className="row border border-dashed gx-2 p-2 mb-2">
                                            <Col className="col-4">
                                                <img src={img2} alt="" className="img-fluid rounded" />
                                            </Col>
                                            <Col className="col-4">
                                                <img src={img3} alt="" className="img-fluid rounded" />
                                            </Col>
                                            <Col className="col-4">
                                                <img src={img4} alt="" className="img-fluid rounded" />
                                            </Col>
                                        </div>
                                        <small className="mb-0 text-muted">25 Nov</small>
                                    </div>
                                </div>
                                <div className="acitivity-item py-3 d-flex">
                                    <div className="flex-shrink-0">
                                        <img src={avatar6} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">Bethany Johnson</h6>
                                        <p className="text-muted mb-2">added a new member to velzon dashboard</p>
                                        <small className="mb-0 text-muted">19 Nov</small>
                                    </div>
                                </div>
                                <div className="acitivity-item py-3 d-flex">
                                    <div className="flex-shrink-0">
                                        <div className="avatar-xs acitivity-avatar">
                                            <div className="avatar-title rounded-circle bg-danger-subtle text-danger">
                                                <i className="ri-shopping-bag-line"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">Your order is placed <span className="badge bg-danger-subtle text-danger align-middle ms-1">Out of Delivery</span></h6>
                                        <p className="text-muted mb-2">These customers can rest assured their order has been placed.</p>
                                        <small className="mb-0 text-muted">16 Nov</small>
                                    </div>
                                </div>
                                <div className="acitivity-item py-3 d-flex">
                                    <div className="flex-shrink-0">
                                        <img src={avatar7} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">Lewis Pratt</h6>
                                        <p className="text-muted mb-2">They all have something to say beyond the words on the page. They can come across as casual or neutral, exotic or graphic. </p>
                                        <small className="mb-0 text-muted">22 Oct</small>
                                    </div>
                                </div>
                                <div className="acitivity-item py-3 d-flex">
                                    <div className="flex-shrink-0">
                                        <div className="avatar-xs acitivity-avatar">
                                            <div className="avatar-title rounded-circle bg-info-subtle text-info">
                                                <i className="ri-line-chart-line"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">Monthly sales report</h6>
                                        <p className="text-muted mb-2"><span className="text-danger">2 days left</span> notification to submit the monthly sales report. <Link href="#" className="link-warning text-decoration-underline">Reports Builder</Link></p>
                                        <small className="mb-0 text-muted">15 Oct</small>
                                    </div>
                                </div>
                                <div className="acitivity-item d-flex">
                                    <div className="flex-shrink-0">
                                        <img src={avatar8} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">New ticket received <span className="badge bg-success-subtle text-success align-middle">Completed</span></h6>
                                        <p className="text-muted mb-2">User <span className="text-secondary">Erica245</span> submitted a ticket.</p>
                                        <small className="mb-0 text-muted">26 Aug</small>
                                    </div>
                                </div>
                            </div>
                        </SimpleBar>
                    </div>
                </Offcanvas.Body>
                <div className="offcanvas-foorter border-top p-3 text-center">
                    <Link href="#" className="link-success">View All Acitivity <i className="ri-arrow-right-s-line align-middle ms-1"></i></Link>
                </div>
            </Offcanvas>

            {/* Enable both scrolling & backdrop */}
            <Offcanvas
                show={isScrollBackDrop}
                scroll={true}
                backdrop={true}
                onHide={toggleScrollBackDrop}
                id="offcanvasWithBothOptions"

            >
                <Offcanvas.Header closeButton className="border-bottom">
                    <Offcanvas.Title id="offcanvasWithBothOptionsLabel">Customer Activity</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-0 overflow-hidden">
                    <SimpleBar style={{ height: "100vh" }}>
                        <div className="acitivity-timeline p-4">
                            <div className="acitivity-item d-flex">
                                <div className="flex-shrink-0">
                                    <img src={avatar1} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Oliver Phillips <span className="badge bg-primary-subtle text-primary align-middle">New</span></h6>
                                    <p className="text-muted mb-2">We talked about a project on linkedin.</p>
                                    <small className="mb-0 text-muted">Today</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                                    <div className="avatar-title bg-success-subtle text-success rounded-circle">
                                        N
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Nancy Martino <span className="badge bg-secondary-subtle text-secondary align-middle">In Progress</span></h6>
                                    <p className="text-muted mb-2"><i className="ri-file-text-line align-middle ms-2"></i> Create new project Buildng product</p>
                                    <div className="avatar-group mb-2">
                                    
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Christi</Tooltip>}
                                            >
                                                <Image src={avatar4} alt="" className="rounded-circle avatar-xs" />
                                            </OverlayTrigger>
                                        
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Frank Hook</Tooltip>}
                                            >
                                                <a href="#" className="avatar-group-item">
                                                    <Image src={avatar3} alt="" className="rounded-circle avatar-xs" />
                                                </a>
                                            </OverlayTrigger>
                                       
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Ruby</Tooltip>}
                                            >
                                                <Link href="#" className="avatar-group-item">
                                                    <div className="avatar-xs">
                                                        <div className="avatar-title rounded-circle bg-light text-primary">
                                                            R
                                                        </div>
                                                    </div>
                                                </Link>
                                            </OverlayTrigger>
                                      
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>More</Tooltip>}
                                            >
                                                <Link href="#" className="avatar-group-item">
                                                    <div className="avatar-xs">
                                                        <div className="avatar-title rounded-circle">
                                                            2+
                                                        </div>
                                                    </div>
                                                </Link>
                                            </OverlayTrigger>
                                       
                                    </div>
                                    <small className="mb-0 text-muted">Yesterday</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <img src={avatar2} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Natasha Carey <span className="badge bg-success-subtle text-success align-middle">Completed</span></h6>
                                    <p className="text-muted mb-2">Adding a new event with attachments</p>
                                    <div className="row border border-dashed gx-2 p-2 mb-2">
                                        <Col className="col-4">
                                            <img src={img2} alt="" className="img-fluid rounded" />
                                        </Col>
                                        <Col className="col-4">
                                            <img src={img3} alt="" className="img-fluid rounded" />
                                        </Col>
                                        <Col className="col-4">
                                            <img src={img4} alt="" className="img-fluid rounded" />
                                        </Col>
                                    </div>
                                    <small className="mb-0 text-muted">25 Nov</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <img src={avatar6} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Bethany Johnson</h6>
                                    <p className="text-muted mb-2">added a new member to velzon dashboard</p>
                                    <small className="mb-0 text-muted">19 Nov</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <div className="avatar-xs acitivity-avatar">
                                        <div className="avatar-title rounded-circle bg-danger-subtle text-danger">
                                            <i className="ri-shopping-bag-line"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Your order is placed <span className="badge bg-danger-subtle text-danger align-middle ms-1">Out of Delivery</span></h6>
                                    <p className="text-muted mb-2">These customers can rest assured their order has been placed.</p>
                                    <small className="mb-0 text-muted">16 Nov</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <img src={avatar7} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Lewis Pratt</h6>
                                    <p className="text-muted mb-2">They all have something to say beyond the words on the page. They can come across as casual or neutral, exotic or graphic. </p>
                                    <small className="mb-0 text-muted">22 Oct</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <div className="avatar-xs acitivity-avatar">
                                        <div className="avatar-title rounded-circle bg-info-subtle text-info">
                                            <i className="ri-line-chart-line"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Monthly sales report</h6>
                                    <p className="text-muted mb-2"><span className="text-danger">2 days left</span> notification to submit the monthly sales report. <Link href="#" className="link-warning text-decoration-underline">Reports Builder</Link></p>
                                    <small className="mb-0 text-muted">15 Oct</small>
                                </div>
                            </div>
                            <div className="acitivity-item d-flex">
                                <div className="flex-shrink-0">
                                    <img src={avatar8} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">New ticket received <span className="badge bg-success-subtle text-success align-middle">Completed</span></h6>
                                    <p className="text-muted mb-2">User <span className="text-secondary">Erica245</span> submitted a ticket.</p>
                                    <small className="mb-0 text-muted">26 Aug</small>
                                </div>
                            </div>
                        </div>
                    </SimpleBar>
                </Offcanvas.Body>
                <div className="offcanvas-foorter border-top p-3 text-center">
                    <Link href="#" className="link-success">View All Acitivity <i className="ri-arrow-right-s-line align-middle ms-1"></i></Link>
                </div>
            </Offcanvas>
        </React.Fragment >
    );
};
UiOffcanvas.layout = (page: any) => <Layout children={page} />

export default UiOffcanvas;
