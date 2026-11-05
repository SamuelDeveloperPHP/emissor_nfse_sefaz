import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, usePage } from '@inertiajs/react';

const initialsOf = (name: string) =>
    name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('');

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
                        <span
                            className="rounded-circle header-profile-user d-inline-flex align-items-center justify-content-center bg-primary-subtle text-primary fw-semibold fs-13"
                            aria-hidden="true">
                            {initialsOf(user.name)}
                        </span>
                        <span className="text-start ms-xl-2">
                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{user.name}</span>
                            <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">{user.email}</span>
                        </span>
                    </span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end">
                    <h6 className="dropdown-header">Olá, {user.name}</h6>

                    <Dropdown.Item href={route('profile.edit')} className="dropdown-item">
                        <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                        <span className="align-middle">Meu perfil</span>
                    </Dropdown.Item>

                    <div className="dropdown-divider"></div>

                    <Link className="dropdown-item" as="button" method="post" href={route('logout')}><i
                            className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span
                                className="align-middle" data-key="t-logout">Sair</span></Link>
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ProfileDropdown;
