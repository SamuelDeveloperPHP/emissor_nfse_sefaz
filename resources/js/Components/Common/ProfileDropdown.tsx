import React, { useState} from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, usePage } from '@inertiajs/react';
//import images
import avatar1 from "../../../images/users/avatar-1.jpg";

const ProfileDropdown = () => {

    const user = usePage().props.auth.user;

    //Dropdown Toggle
    const [isProfileDropdown, setIsProfileDropdown] = useState<boolean>(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };
    return (
        <React.Fragment>
            <Dropdown
                show={isProfileDropdown}
                onClick={toggleProfileDropdown}
                className="ms-sm-3 header-item topbar-user">
                <Dropdown.Toggle as="button" type="button" className="arrow-none btn">
                    <span className="d-flex align-items-center">
                        <img className="rounded-circle header-profile-user" src={avatar1}
                            alt="Header Avatar" />
                        <span className="text-start ms-xl-2">
                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{user.name}</span>
                            <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">Founder</span>
                        </span>
                    </span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end">
                    <h6 className="dropdown-header">Welcome {user.name}!</h6>

                    <Dropdown.Item href={route('profile.edit')} className="dropdown-item">
                        <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                        <span className="align-middle">Edit Profile</span>
                    </Dropdown.Item>

                    <Dropdown.Item href="/apps-chat" className="dropdown-item">
                            <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i> <span
                                className="align-middle">Messages</span>
                    </Dropdown.Item>
                    <Dropdown.Item href={"#"} className="dropdown-item">
                        <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle">Taskboard</span>
                    </Dropdown.Item>

                    <Dropdown.Item href="/pages-faqs" className="dropdown-item">
                        <i
                            className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i> <span
                                className="align-middle">Help</span>
                    </Dropdown.Item>

                    <div className="dropdown-divider"></div>

                    <Dropdown.Item href="/pages-profile" className="dropdown-item">
                        <i
                            className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i> <span
                                className="align-middle">Balance : <b>$5971.67</b></span>
                    </Dropdown.Item >

                    <Dropdown.Item href="/pages-profile-settings" className="dropdown-item">
                        <span
                            className="badge bg-success-subtle text-success mt-1 float-end">New</span><i
                                className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i> <span
                                    className="align-middle">Settings</span>
                    </Dropdown.Item>

                    <Dropdown.Item href="/auth-lockscreen-basic" className="dropdown-item">
                        <i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Lock screen</span>
                    </Dropdown.Item>
                    <Link className="dropdown-item" as="button" method="post" href={route('logout')}><i
                            className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span
                                className="align-middle" data-key="t-logout">Logout</span></Link>
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ProfileDropdown;