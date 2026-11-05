import React, { useState } from 'react';
import { Card, Col, Dropdown, Form, Nav, Offcanvas, Pagination, Row, Tab } from 'react-bootstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';

// import Images
import smallImage1 from '../../../../images/small/img-1.jpg';
import smallImage3 from '../../../../images/small/img-3.jpg';
import smallImage4 from '../../../../images/small/img-4.jpg';
import smallImage5 from '../../../../images/small/img-5.jpg';

import { SearchGallery, news, video, swiper } from '../../../common/data';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Head, Link } from '@inertiajs/react';
import Layout from '../../../Layouts';

const SearchResults = () => {


    //OffCanvas  
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleOffCanvas = () => {
        setIsOpen(!isOpen);
    };

    //Dropdown
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const toggledropDown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    return (
        <React.Fragment>
            <Head title='Search Results | Velzon - React Admin & Dashboard Template' />
            <div className="page-content">

                <div className="container-fluid">
                    <BreadCrumb title="Search Results" pageTitle="Pages" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <Card.Header className="border-0">
                                    <Row className="justify-content-center mb-4">
                                        <Col lg={6}>
                                            <Row className="g-2">
                                                <Col>
                                                    <div className="position-relative mb-3">
                                                        <Form.Control type="text" className="form-control form-control-lg bg-light border-light" placeholder="Search here.." defaultValue="Admin Dashboard" />
                                                        <Link href="#" className="btn btn-link link-success btn-lg position-absolute end-0 top-0" onClick={toggleOffCanvas}><i className="ri-mic-fill"></i></Link>
                                                    </div>
                                                </Col>
                                                <div className="col-auto">
                                                    <button type="submit" className="btn btn-primary btn-lg waves-effect waves-light"><i className="mdi mdi-magnify me-1"></i> Search</button>
                                                </div>
                                            </Row>
                                        </Col>
                                        <Col lg={12}>
                                            <h5 className="fs-16 fw-semibold text-center mb-0">Showing results for "<span className="text-primary fw-medium fst-italic">Admin Dashboard</span> "</h5>
                                        </Col>
                                    </Row>

                                    <Offcanvas in={isOpen}
                                        direction="top"
                                        placement="top"
                                        toggle={toggleOffCanvas}
                                        tabIndex={1}
                                    >
                                        <Offcanvas.Body>
                                            <button type="button" onClick={() => setIsOpen(false)} className="btn-close text-reset float-end" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                            <div className="d-flex flex-column h-100 justify-content-center align-items-center">
                                                <div className="search-voice">
                                                    <i className="ri-mic-fill align-middle"></i>
                                                    <span className="voice-wave"></span>
                                                    <span className="voice-wave"></span>
                                                    <span className="voice-wave"></span>
                                                </div>
                                                <h4>Talk to me, what can I do for you?</h4>
                                            </div>
                                        </Offcanvas.Body>
                                    </Offcanvas>
                                </Card.Header>
                                <Tab.Container defaultActiveKey={1}>
                                    <div>
                                        <Nav className="nav-tabs nav-tabs-custom" role="tablist">
                                            <Nav.Item>
                                                <Nav.Link
                                                    href="#"
                                                    eventKey={1}
                                                >
                                                    <i className="ri-search-2-line text-muted align-bottom me-1"></i> All Results
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link
                                                    href="#"
                                                    eventKey={2}
                                                >
                                                    <i className="ri-image-fill text-muted align-bottom me-1"></i> Images
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link
                                                    href="#"
                                                    eventKey={3}
                                                >
                                                    <i className="ri-list-unordered text-muted align-bottom me-1"></i> News
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link
                                                    href="#"
                                                    eventKey={4}
                                                >
                                                    <i className="ri-video-line text-muted align-bottom me-1"></i> Videos
                                                </Nav.Link>
                                            </Nav.Item>
                                            <li className="nav-item ms-auto">
                                                <Dropdown show={dropdownOpen} onClick={toggledropDown} >
                                                    <Dropdown.Toggle className="nav-link fw-medium text-reset mb-n1 btn btn-secondary" role="button">
                                                        <i className="ri-settings-4-line align-middle me-1"></i> Settings
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>Search Settings</Dropdown.Item>
                                                        <Dropdown.Item>Advanced Search</Dropdown.Item>
                                                        <Dropdown.Item>Search History</Dropdown.Item>
                                                        <Dropdown.Item>Search Help</Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item>Dark Mode:Off</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </li>
                                        </Nav>
                                    </div>
                                    <Card.Body className="p-4">
                                        <Tab.Content className="text-muted">
                                            <Tab.Pane eventKey={1}>
                                                <div className="pb-3">
                                                    <h5 className="mb-1 fs-14 fs-14"><Link href="#">Velzon - Responsive Bootstrap 5 Admin Dashboard</Link></h5>
                                                    <p className="text-success mb-2">https://themesbrand.com/velzon/index.html</p>
                                                    <p className="text-muted mb-2">Velzon admin is super flexible, powerful, clean, modern & responsive admin template based on <span className="fw-semibold">bootstrap 5</span> stable with unlimited possibilities. You can simply change to any layout or mode by changing a couple of lines of code. You can start small and large projects or update design in your existing project using Velzon it is very quick and easy as it is beautiful, adroit, and delivers the ultimate user experience.</p>
                                                    <ul className="list-inline d-flex align-items-center g-3 text-muted fs-14 mb-0">
                                                        <li className="list-inline-item me-3"><i className="ri-thumb-up-line align-middle me-1"></i>10</li>
                                                        <li className="list-inline-item me-3"><i className="ri-question-answer-line align-middle me-1"></i>8</li>
                                                        <li className="list-inline-item">
                                                            <div className="d-flex align-items-center">
                                                                <div className="flex-shrink-0">
                                                                    <i className="ri-user-line"></i>
                                                                </div>
                                                                <div className="flex-grow-1 fs-13 ms-1">
                                                                    <span className="fw-medium">Themesbrand</span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="border border-dashed"></div>

                                                <div className="py-3">
                                                    <h5 className="fs-13 mb-3 text-muted fst-italic">Showing results Images</h5>
                                                    <Row>
                                                        <Col xl={4} lg={10}>
                                                            <Row className="g-2">
                                                                <Col md={3} sm={6}>
                                                                    <div>
                                                                        <Link href="/" className="image-popup d-block">
                                                                            <img src={smallImage1} alt="" className="img-fluid d-block rounded" />
                                                                        </Link>
                                                                    </div>
                                                                </Col>
                                                                <Col md={3} sm={6}>
                                                                    <div>
                                                                        <Link href="/" className="image-popup d-block">
                                                                            <img src={smallImage3} alt="" className="img-fluid d-block rounded" />
                                                                        </Link>
                                                                    </div>
                                                                </Col>
                                                                <Col md={3} sm={6}>
                                                                    <div>
                                                                        <Link href="/" className="image-popup d-block">
                                                                            <img src={smallImage4} alt="" className="img-fluid d-block rounded" />
                                                                        </Link>
                                                                    </div>
                                                                </Col>
                                                                <Col md={3} sm={6}>
                                                                    <div className="search-more-results rounded">
                                                                        <Link href="#" className="d-block">
                                                                            <img src={smallImage5} alt="" className="img-fluid d-block rounded" />
                                                                            <div className="bg-overlay"></div>
                                                                            <div className="nav-icon">
                                                                                <i className="ri-image-fill align-middle me-1"></i> 99+
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </div>

                                                <div className="border border-dashed"></div>

                                                <div className="py-3">
                                                    <h5 className="mb-1 fs-14"><Link href="#">Skote - Admin & Dashboard Template by Themesbrand</Link></h5>
                                                    <p className="text-success mb-2">https://themesbrand.com/skote/</p>
                                                    <p className="text-muted mb-2">Skote is an admin dashboard template that is a beautifully crafted, clean & minimal designed admin template with Dark, Light Layouts with RTL options. You can build any type of web application like Saas based interface, eCommerce, Crypto, CRM, CMS, Project management apps, Admin Panels, etc.</p>
                                                    <ul className="list-inline d-flex align-items-center g-3 text-muted fs-14 mb-0">
                                                        <li className="list-inline-item me-3"><i className="ri-thumb-up-line align-middle me-1"></i>485</li>
                                                        <li className="list-inline-item me-3"><i className="ri-question-answer-line align-middle me-1"></i>167</li>
                                                        <li className="list-inline-item">
                                                            <div className="d-flex align-items-center">
                                                                <div className="flex-shrink-0">
                                                                    <i className="ri-user-line"></i>
                                                                </div>
                                                                <div className="flex-grow-1 fs-13 ms-1">
                                                                    <span className="fw-medium">Themesbrand</span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="border border-dashed"></div>

                                                <div className="py-3">
                                                    <h5 className="mb-1 fs-14"><Link href="#">Minia - React Js Admin & Dashboard Template</Link></h5>
                                                    <p className="text-success mb-2">https://themesbrand.com/minia/react/</p>
                                                    <p className="text-muted mb-2">Minia react is a simple and beautiful admin template built with Bootstrap ^5.1.3. It has <span className="fw-semibold">5+ different layouts and 3 modes</span> ( Dark, Light & RTL ) which are managed by SCSS only. You can simply change to any layouts or mode by changing a couple of lines code.</p>
                                                    <ul className="list-inline d-flex align-items-center g-3 text-muted fs-14 mb-0">
                                                        <li className="list-inline-item me-3"><i className="ri-thumb-up-line align-middle me-1"></i>69</li>
                                                        <li className="list-inline-item me-3"><i className="ri-question-answer-line align-middle me-1"></i>43</li>
                                                        <li className="list-inline-item">
                                                            <div className="d-flex align-items-center">
                                                                <div className="flex-shrink-0">
                                                                    <i className="ri-user-line"></i>
                                                                </div>
                                                                <div className="flex-grow-1 fs-13 ms-1">
                                                                    <span className="fw-medium">Themesbrand</span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="border border-dashed"></div>

                                                <div className="py-3">
                                                    <h5 className="mb-1 fs-14"><Link href="#">Doson - Angular Admin & Dashboard Template by Themesbrand</Link></h5>
                                                    <p className="text-success mb-2">https://themesbrand.com/dason/angular/</p>
                                                    <p className="text-muted mb-2">Dason is a simple and beautiful admin template built with Bootstrap ^5.1.3. It has 5+ different layouts and 3 modes ( Dark, Light & RTL ) which are managed by SCSS only. You can simply change to any layouts or mode by changing a couple of lines code.</p>
                                                    <ul className="list-inline d-flex align-items-center g-3 text-muted fs-14 mb-0">
                                                        <li className="list-inline-item me-3"><i className="ri-thumb-up-line align-middle me-1"></i>102</li>
                                                        <li className="list-inline-item me-3"><i className="ri-question-answer-line align-middle me-1"></i>36</li>
                                                        <li className="list-inline-item">
                                                            <div className="d-flex align-items-center">
                                                                <div className="flex-shrink-0">
                                                                    <i className="ri-user-line"></i>
                                                                </div>
                                                                <div className="flex-grow-1 fs-13 ms-1">
                                                                    <span className="fw-medium">Themesbrand</span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <Pagination className="justify-content-center pagination-separated mb-0">
                                                    <Pagination.Item disabled><i className="mdi mdi-chevron-left" /> </Pagination.Item>
                                                    <Pagination.Item active> 1 </Pagination.Item>
                                                    <Pagination.Item> 2 </Pagination.Item>
                                                    <Pagination.Item> 3 </Pagination.Item>
                                                    <Pagination.Item> 4 </Pagination.Item>
                                                    <Pagination.Item> 5 </Pagination.Item>
                                                    <Pagination.Item> <i className="mdi mdi-chevron-right" /> </Pagination.Item>
                                                </Pagination>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey={2}>
                                                <Row>
                                                    <Col lg={12}>
                                                        <Swiper
                                                            loop={true}
                                                            slidesPerView={9}
                                                            spaceBetween={20}
                                                            autoplay={{ delay: 3000 }}
                                                            pagination={{ clickable: true }}
                                                            modules={[Autoplay]}
                                                            className="images-menu mb-3 swiper-initialized swiper-horizontal swiper-pointer-events"
                                                        >
                                                            <div className="swiper-wrapper">
                                                                {(swiper || []).map((item, key) => (
                                                                    <SwiperSlide key={key}>
                                                                        <div className="d-flex align-items-center border border-dashed rounded p-2">
                                                                            <div className="flex-shrink-0">
                                                                                <img src={item.img} alt="" width="65" className="rounded" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-2">
                                                                                <Link href="#" className="stretched-link fw-medium">{item.title}</Link>
                                                                            </div>
                                                                        </div>
                                                                    </SwiperSlide>
                                                                ))}

                                                            </div>
                                                        </Swiper>
                                                    </Col>
                                                </Row>
                                                <div className="gallery-light">
                                                    <Row>
                                                        {(SearchGallery || []).map((item, key) => (
                                                            <Col xl={3} lg={4} sm={6} key={key}>
                                                                <Card className="gallery-box">
                                                                    <div className="gallery-container">
                                                                        <Link className="image-popup" href="/" title="">
                                                                            <img className="gallery-img img-fluid mx-auto" src={item.img} alt="" />
                                                                            <div className="gallery-overlay">
                                                                                <h5 className="overlay-caption">{item.title}</h5>
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="box-content">
                                                                        <div className="d-flex align-items-center mt-2">
                                                                            <div className="flex-grow-1 text-muted">by <Link href="" className="text-body text-truncate">{item.auther}</Link></div>
                                                                            <div className="flex-shrink-0">
                                                                                <div className="d-flex gap-3">
                                                                                    <button type="button" className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0">
                                                                                        <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i> {item.likes}
                                                                                    </button>
                                                                                    <button type="button" className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0">
                                                                                        <i className="ri-question-answer-fill text-muted align-bottom me-1"></i> {item.comments}
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Card>
                                                            </Col>
                                                        ))}
                                                    </Row>

                                                    <div className="mt-4">
                                                        <Pagination className="justify-content-center pagination-separated mb-0">
                                                            <Pagination.Item disabled> <i className="mdi mdi-chevron-left" /> </Pagination.Item>
                                                            <Pagination.Item active> {1} </Pagination.Item>
                                                            <Pagination.Item> {2} </Pagination.Item>
                                                            <Pagination.Item> {3} </Pagination.Item>
                                                            <Pagination.Item> {4} </Pagination.Item>
                                                            <Pagination.Item> {5} </Pagination.Item>
                                                            <Pagination.Item> <i className="mdi mdi-chevron-right" /> </Pagination.Item>
                                                        </Pagination>

                                                    </div>

                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey={3}>
                                                <Row>
                                                    {(news || []).map((item, key) => (
                                                        <Col lg={6} key={key}>
                                                            <Card className="border" >
                                                                <Card.Body>
                                                                    <div className="d-sm-flex">
                                                                        <div className="flex-shrink-0">
                                                                            <img src={item.img} alt="" width="115" className="rounded-1" />
                                                                        </div>
                                                                        <div className="flex-grow-1 ms-sm-4 mt-3 mt-sm-0">
                                                                            <ul className="list-inline mb-2">
                                                                                <li className="list-inline-item"><span className={`badge badge-soft-${item.badgeClass} fs-11`}>{item.badgeText}</span></li>
                                                                            </ul>
                                                                            <h5><Link href="#">{item.title}</Link></h5>
                                                                            <ul className="list-inline mb-0">
                                                                                <li className="list-inline-item"><i className="ri-user-3-fill text-success align-middle me-1"></i> {item.auther}</li>
                                                                                <li className="list-inline-item"><i className="ri-calendar-2-fill text-success align-middle me-1"></i> {item.date}</li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    ))}
                                                </Row>

                                                <Pagination className="justify-content-center pagination-separated mb-0 mt-4">
                                                    <Pagination.Item disabled> <i className="mdi mdi-chevron-left" /> </Pagination.Item>
                                                    <Pagination.Item active> {1} </Pagination.Item>
                                                    <Pagination.Item> {2} </Pagination.Item>
                                                    <Pagination.Item> {3} </Pagination.Item>
                                                    <Pagination.Item> {4} </Pagination.Item>
                                                    <Pagination.Item> {5} </Pagination.Item>
                                                    <Pagination.Item> <i className="mdi mdi-chevron-right" /> </Pagination.Item>
                                                </Pagination>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey={4}>
                                                <Row>
                                                    {(video || []).map((item, key) => (
                                                        <Col lg={12} className="video-list" key={key}>
                                                            <div className="list-element mt-4">
                                                                <h5 className="mb-1 fs-14"><Link href="#">{item.title}</Link></h5>
                                                                <p className="text-success">{item.siteLink}</p>
                                                                <div className="d-flex flex-column flex-sm-row">
                                                                    <div className="flex-shrink-0">
                                                                        <iframe src={item.videoLink} title="YouTube video" allowFullScreen className="rounded"></iframe>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-sm-3 mt-2 mt-sm-0">
                                                                        <p className="text-muted mb-0">{item.description}</p>
                                                                        <div className="border border-dashed mb-1 mt-3"></div>
                                                                        <ul className="list-inline d-flex align-items-center g-3 text-muted fs-14 mb-0">
                                                                            <li className="list-inline-item me-3"><i className="ri-thumb-up-line align-middle me-1"></i>{item.likes}</li>
                                                                            <li className="list-inline-item me-3"><i className="ri-question-answer-line align-middle me-1"></i>{item.comments}</li>
                                                                            <li className="list-inline-item">
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="flex-shrink-0">
                                                                                        <i className="ri-user-line"></i>
                                                                                    </div>
                                                                                    <div className="flex-grow-1 fs-13 ms-1">
                                                                                        <span className="fw-medium">{item.auther}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    ))}
                                                    <div className="text-center">
                                                        <button id="loadmore" className="btn btn-link text-success mt-2"><i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i> Load more </button>
                                                    </div>
                                                </Row>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Card.Body>
                                </Tab.Container>
                            </Card>
                        </Col>
                    </Row>

                </div>

            </div>
        </React.Fragment>
    );
};

SearchResults.layout = (page: any) => <Layout children={page} />

export default SearchResults;