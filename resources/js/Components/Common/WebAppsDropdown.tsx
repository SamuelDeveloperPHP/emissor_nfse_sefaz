import React, { useState } from 'react';
import { Button, Col, Dropdown, Row } from 'react-bootstrap';

//import images
import github from "../../../images/brands/github.png";
import bitbucket from "../../../images/brands/bitbucket.png";
import dribbble from "../../../images/brands/dribbble.png";
import dropbox from "../../../images/brands/dropbox.png";
import mail_chimp from "../../../images/brands/mail_chimp.png";
import slack from "../../../images/brands/slack.png";
import { Link } from '@inertiajs/react';

const WebAppsDropdown = () => {
    const [isWebAppDropdown, setIsWebAppDropdown] = useState<boolean>(false);
    const toggleWebAppDropdown = () => {
        setIsWebAppDropdown(!isWebAppDropdown);
    };
    return (
        <React.Fragment>
            <Dropdown show={isWebAppDropdown} onClick={toggleWebAppDropdown} className="topbar-head-dropdown ms-1 header-item">
                <Dropdown.Toggle as="button" type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle arrow-none">
                    <i className='bx bx-category-alt fs-22'></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-lg p-0 dropdown-menu-end">
                    <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
                        <Row className="align-items-center">
                            <Col>
                                <h6 className="m-0 fw-semibold fs-15"> Web Apps </h6>
                            </Col>
                            <div className="col-auto">
                                <Button variant='link' className="btn btn-sm btn-soft-info"> View All Apps
                                    <i className="ri-arrow-right-s-line align-middle"></i></Button>
                            </div>
                        </Row>
                    </div>

                    <div className="p-2">
                        <div className="row g-0">
                            <Col>
                                <Link className="dropdown-icon-item" href="#">
                                    <img src={github} alt="Github" />
                                    <span>GitHub</span>
                                </Link>
                            </Col>
                            <Col>
                                <Link className="dropdown-icon-item" href="#">
                                    <img src={bitbucket} alt="bitbucket" />
                                    <span>Bitbucket</span>
                                </Link>
                            </Col>
                            <Col>
                                <Link className="dropdown-icon-item" href="#">
                                    <img src={dribbble} alt="dribbble" />
                                    <span>Dribbble</span>
                                </Link>
                            </Col>
                        </div>

                        <div className="row g-0">
                            <Col>
                                <Link className="dropdown-icon-item" href="#">
                                    <img src={dropbox} alt="dropbox" />
                                    <span>Dropbox</span>
                                </Link>
                            </Col>
                            <Col>
                                <Link className="dropdown-icon-item" href="#">
                                    <img src={mail_chimp} alt="mail_chimp" />
                                    <span>Mail Chimp</span>
                                </Link>
                            </Col>
                            <Col>
                                <Link className="dropdown-icon-item" href="#">
                                    <img src={slack} alt="slack" />
                                    <span>Slack</span>
                                </Link>
                            </Col>
                        </div>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    );
};

export default WebAppsDropdown;