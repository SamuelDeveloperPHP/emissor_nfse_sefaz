import PrismCode from "../../../Components/Common/Prism";

// Single Button Dropdown

const singleButtonDropdownCode =
    `
<!-- Single Button Dropdown -->
<Dropdown>
    <Dropdown.Toggle as="button" className="btn btn-secondary" id="dropdown.MenuButton">
        Dropdown button <i className="mdi mdi-chevron-down"></i>
    </Dropdown.Toggle>
    <Dropdown.Menu>
        <Dropdown.Item>Action</Dropdown.Item>
        <Dropdown.Item>Another action</Dropdown.Item>
        <Dropdown.Item>Something else here</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>

<Dropdown>
    <Dropdown.Toggle as="a" className="btn btn-secondary">
        Dropdown link <i className="mdi mdi-chevron-down"></i>
    </Dropdown.Toggle>
    <Dropdown.Menu>
        <Dropdown.Item>Action</Dropdown.Item>
        <Dropdown.Item>Another action</Dropdown.Item>
        <Dropdown.Item>Something else here</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>
`;

const SingleButtonDropdownExample = () => (
    <PrismCode
        code={singleButtonDropdownCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Dropdown Color Variant
const colorDropdownCode =
    `
<!-- Dropdown Variant -->
<Dropdown>
        <Dropdown.Toggle variant="primary">
            Primary
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
        <Dropdown.Toggle variant="success">
            Success
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
        <Dropdown.Toggle variant="light">
            Light
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
        <Dropdown.Toggle variant="info">
            Info
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
        <Dropdown.Toggle variant="secondary">
            Secondary
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
        <Dropdown.Toggle variant="warning">
            Warning
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
        <Dropdown.Toggle variant="danger">
            Danger
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
        <Dropdown.Toggle variant="dark">
            Dark
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item href="#"> Action</Dropdown.Item>
            <Dropdown.Item href="#">Another action</Dropdown.Item>
            <Dropdown.Item href="#">Something else here</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>

`;

const ColorDropdownExample = () => (
    <PrismCode
        code={colorDropdownCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Split Button Dropdown
const splitButtonDropdownCode =
    `
<!-- Split Button Dropdown -->
<Dropdown>
<Dropdown as={ButtonGroup}>
    <Button variant="primary">Primary</Button>

    <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />

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

    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

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

    <Dropdown.Toggle split variant="light" id="dropdown-split-basic" />

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

    <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />

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

    <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />

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

    <Dropdown.Toggle split variant="warning" id="dropdown-split-basic" />

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

    <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />

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

    <Dropdown.Toggle split variant="dark" id="dropdown-split-basic" />

    <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>
</Dropdown>
`;

const SplitButtonDropdownExample = () => (
    <PrismCode
        code={splitButtonDropdownCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Dropdown Sizing
const sizingDropdownCode =
    `
<!-- Dropdown Sizing -->
<Dropdown bsPrefix='btn-group'>
            <Dropdown.Toggle variant="primary" size='lg'>
                Large button </Dropdown.Toggle>
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
         <Dropdown.Toggle split variant="light" id="dropdown-split-basic" />
         <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
     <Dropdown>
            <Dropdown.Toggle variant="primary" size='sm' >
                Small button </Dropdown.Toggle>
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
         <Dropdown.Toggle split variant="light" className='btn btn-sm btn-light' id="dropdown-split-basic" />
         <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
`;

const SizingDropdownExample = () => (
    <PrismCode
        code={sizingDropdownCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Dark Dropdowns
const darkDropdownCode =
    `
<!-- Dark Dropdowns -->
<Dropdown>
    <Dropdown.Toggle as="button" className="btn btn-secondary" id="dropdown.MenuButton2">
        Dropdown button <i className="mdi mdi-chevron-down"></i>
    </Dropdown.Toggle>
    <Dropdown.Menu className="dropdown-menu-dark">
        <Dropdown.Item active >Action</Dropdown.Item>
        <Dropdown.Item>Another action</Dropdown.Item>
        <Dropdown.Item>Something else here</Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item>Separated link</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>
`;

const DarkDropdownExample = () => (
    <PrismCode
        code={darkDropdownCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Alignment options
const alignDropdownCode =
    `
<!-- Alignment options -->
<Dropdown>
    <Dropdown.Toggle variant="secondary">
        Dropdown </Dropdown.Toggle>
    <Dropdown.Menu>
        <Dropdown.Item href="#" active>Menu item</Dropdown.Item>
        <Dropdown.Item href="#">Menu item</Dropdown.Item>
        <Dropdown.Item href="#">Menu item</Dropdown.Item>
    </Dropdown.Menu>
    </Dropdown>
    <Dropdown align='end'>
        <Dropdown.Toggle variant="secondary">
            Right-aligned menu </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item href="#" active>Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    <Dropdown align='end'>
        <Dropdown.Toggle variant="secondary">
            Left-aligned, right-aligned lg </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item href="#" active>Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    <Dropdown>
        <Dropdown.Toggle variant="secondary">
            Right-aligned, left-aligned lg </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item href="#" active>Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    <Dropdown drop='start'>
        <Dropdown.Toggle variant="secondary">
            Dropstart </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item href="#" active>Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    <Dropdown drop='end'>
        <Dropdown.Toggle variant="secondary">
            Dropend </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item href="#" active>Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    <Dropdown drop='up'>
        <Dropdown.Toggle variant="secondary">
            Dropup </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item href="#" active>Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
            <Dropdown.Item href="#">Menu item</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
`;

const AlignDropdownExample = () => (
    <PrismCode
        code={alignDropdownCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Dropdown Options
const optionDropdownCode =
    `
<!-- Dropdown Options -->
<Dropdown>
    <Dropdown.Toggle variant="secondary">
        Offset </Dropdow
    <Dropdown.Menu>
        <Dropdown.Item href="#" active>Action</Dropdown.Item>
        <Dropdown.Item href="#">Another action</Dropdown.Item>
        <Dropdown.Item href="#">Something else here</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>

<Dropdown bsPrefix='btn-group'>
    <Button variant="secondary">Reference</Button>
    <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic">
        <span className="visually-hidden">Toggle Dropdown</span>
    </Dropdown.Toggle>
    <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>
`;

const OptionDropdownExample = () => (
    <PrismCode
        code={optionDropdownCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Auto Close Behavior
const autoCloseDropdownCode =
    `
<!-- Default dropdown -->
<Dropdown>
    <Dropdown.Toggle variant="light">
        Default dropdown </Dropdown.Toggle>
    <Dropdown.Menu>
        <Dropdown.Item href="#">Menu item</Dropdown.Item>
        <Dropdown.Item href="#">Menu item</Dropdown.Item>
        <Dropdown.Item href="#">Menu item</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>

<Dropdown autoClose='outside'>
    <Dropdown.Toggle variant="light">
        Clickable outside </Dropdown.Toggle>
    <Dropdown.Menu>
        <Dropdown.Item href="#">Menu item</Dropdown.Item>
        <Dropdown.Item href="#">Menu item</Dropdown.Item>
        <Dropdown.Item href="#">Menu item</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>

<Dropdown autoClose='inside'>
    <Dropdown.Toggle variant="light">
        Clickable inside </Dropdown.Toggle>
    <Dropdown.Menu>
        <Dropdown.Item href="#">Menu item</Dropdown.Item>
        <Dropdown.Item href="#">Menu item</Dropdown.Item>
        <Dropdown.Item href="#">Menu item</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>

<Dropdown autoClose={false}>
    <Dropdown.Toggle variant="light">
        Manual close </Dropdown.Toggle>
    <Dropdown.Menu>
        <Dropdown.Item href="#">Menu item</Dropdown.Item>
        <Dropdown.Item href="#">Menu item</Dropdown.Item>
        <Dropdown.Item href="#">Menu item</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>
`;

const AutoCloseDropdownExample = () => (
    <PrismCode
        code={autoCloseDropdownCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Dropdown Menu Item Color
const menuItemDropdownCode =
    `
<!-- Dropdown Menu Item Color -->
<div>
    <h6 className="font-size-13 mb-3">Dropdown Menu Success link example</h6>
    <div className="clearfix">
        <div className="dropdown-menu d-inline-block position-relative dropdown.menu-success" style={{ zIndex: "1" }}>
            <Link className="dropdown-item" to="#">Action</Link>
            <Link className="dropdown-item" to="#">Another action</Link>
            <Link className="dropdown-item active" to="#">Something else here</Link>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" to="#">Separated link</Link>
        </div>
    </div>
</div>

<Dropdown>
    <Dropdown.Toggle variant="primary">
        Primary
    </Dropdown.Toggle>
    <Dropdown.Menu className='dropdown.menu-primary'>
        <Dropdown.Item href="#"> Action</Dropdown.Item>
        <Dropdown.Item href="#">Another action</Dropdown.Item>
        <Dropdown.Item href="#">Something else here</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>

<Dropdown>
    <Dropdown.Toggle variant="secondary">
        Sacondary
    </Dropdown.Toggle>
    <Dropdown.Menu className='dropdown.menu-secondary'>
        <Dropdown.Item href="#"> Action</Dropdown.Item>
        <Dropdown.Item href="#">Another action</Dropdown.Item>
        <Dropdown.Item href="#">Something else here</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>

<Dropdown>
    <Dropdown.Toggle variant="success">
        Success
    </Dropdown.Toggle>
    <Dropdown.Menu className='dropdown.menu-success'>
        <Dropdown.Item href="#"> Action</Dropdown.Item>
        <Dropdown.Item href="#">Another action</Dropdown.Item>
        <Dropdown.Item href="#">Something else here</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>

<Dropdown>
        <Dropdown.Toggle as="button" variant="warning">
            Warning <i className="mdi mdi-chevron-down"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown.menu-warning">
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Item>Something else here</Dropdown.Item>
            <Dropdown.Item divider />
            <Dropdown.Item>Separated link</Dropdown.Item>
        </Dropdown.Menu>
</Dropdown>

<Dropdown>
        <Dropdown.Toggle as="button" variant="info">
            Info <i className="mdi mdi-chevron-down"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown.menu-info">
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Item>Something else here</Dropdown.Item>
            <Dropdown.Item divider />
            <Dropdown.Item>Separated link</Dropdown.Item>
        </Dropdown.Menu>
</Dropdown>

<Dropdown>
        <Dropdown.Toggle as="button" variant="danger">
            Danger <i className="mdi mdi-chevron-down"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown.menu-danger">
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Item>Something else here</Dropdown.Item>
            <Dropdown.Item divider />
            <Dropdown.Item>Separated link</Dropdown.Item>
        </Dropdown.Menu>
</Dropdown>
`;

const MenuItemDropdownExample = () => (
    <PrismCode
        code={menuItemDropdownCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Menu Content
const menuContentDropdownCode =
    `
<!-- Menu Content -->
    <Dropdown>
        <Dropdown.Toggle as="button" className="btn btn-primary">
            Header <i className="mdi mdi-chevron-down"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <div className="dropdown-header noti-title">
                <h5 className="font-size-13 text-muted text-truncate mb-0">Welcome Jessie!</h5>
            </div>
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Item>Something else here</Dropdown.Item>
            <Dropdown.Item divider />
            <Dropdown.Item>Separated link</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>

    <Dropdown>
        <Dropdown.Toggle as="button" className="btn btn-success">
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

    <Dropdown>
        <Dropdown.Toggle as="button" className="btn btn-light">
            Forms <i className="mdi mdi-chevron-down"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-md p-4">
            <form>
                <div className="mb-2">
                    <label className="form-label" htmlFor="exampleDropdownFormEmail">Email address</label>
                    <Input type="email" className="form-control" id="exampleDropdownFormEmail" placeholder="email@example.com" />
                </div>
                <div className="mb-2">
                    <label className="form-label" htmlFor="exampleDropdownFormPassword">Password</label>
                    <Input type="password" className="form-control" id="exampleDropdownFormPassword" placeholder="Password" />
                </div>
                <div className="mb-2">
                    <div className="form-check custom-checkbox">
                        <Input type="checkbox" className="form-check-input" id="rememberdropdownCheck" />
                        <label className="form-check-label" htmlFor="rememberdropdownCheck">Remember me</label>
                    </div>
                </div>
                <Button type="submit" className="btn btn-primary">Sign in</Button>
            </form>
        </Dropdown.Menu>
    </Dropdown>

`;

const MenuContentDropdownExample = () => (
    <PrismCode
        code={menuContentDropdownCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Notifications
const notificationDropdownCode =
    `
<!-- Notifications -->
<div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 d-inline-block position-relative w-100" aria-labelledby="page-header-notifications-dropdown" style={{ zIndex: "1" }}>
    <div className="dropdown-head bg-primary bg-pattern rounded-top">
        <div className="p-3">
            <Row className="align-items-center">
                <Col>
                    <h6 className="m-0 fs-16 fw-semibold text-white"> Notifications </h6>
                </Col>
                <div className="col-auto dropdown-tabs">
                    <span className="badge bg-light-subtle fs-13"> 4 New</span>
                </div>
            </Row>
        </div>
        <div className="px-2 pt-2">
            <Nav tabs className="dropdown-tabs nav-tabs-custom">
                <NavItem>
                    <NavLink style={{ cursor: "pointer" }} className={classnames({ active: activeTab === "1", })} onClick={() => { toggle("1"); }} >
                        All (4)
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink style={{ cursor: "pointer" }} className={classnames({ active: activeTab === "2", })} onClick={() => { toggle("2"); }} >
                        Messages
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink style={{ cursor: "pointer" }} className={classnames({ active: activeTab === "3", })} onClick={() => { toggle("3"); }} >
                        Alerts
                    </NavLink>
                </NavItem>
            </Nav>
        </div>
    </div>
    <Tab.Content id="notificationItemsTabContent4">
        <Tab.Pane eventKey="1" className="py-2 ps-2">
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
                            <Input className="form-check-input" type="checkbox" />
                        </div>
                    </div>
                </div>
                <div className="text-reset notification-item d-block dropdown-item">
                    <div className="d-flex">
                        <img src={avatar2}
                            className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                        <div className="flex-grow-1">
                            <Link to="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6></Link>
                            <div className="fs-13 text-muted">
                                <p className="mb-1">Answered to your comment on the cash flow forecast's graph 🔔.</p>
                            </div>
                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span><i className="mdi mdi-clock-outline"></i> 48 min ago</span>
                            </p>
                        </div>
                        <div className="px-2 fs-16">
                            <Input className="form-check-input" type="checkbox" />
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
                            <Input className="form-check-input" type="checkbox" />
                        </div>
                    </div>
                </div>
                <div className="text-reset notification-item d-block dropdown-item">
                    <div className="d-flex">
                        <img src={avatar8}
                            className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                        <div className="flex-grow-1">
                            <Link to="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Maureen Gibson</h6></Link>
                            <div className="fs-13 text-muted">
                                <p className="mb-1">We talked about a project on linkedin.</p>
                            </div>
                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span><i className="mdi mdi-clock-outline"></i> 4 hrs ago</span>
                            </p>
                        </div>
                        <div className="px-2 fs-16">
                            <Input className="form-check-input" type="checkbox" />
                        </div>
                    </div>
                </div>
                <div className="my-3 text-center">
                    <button type="button" className="btn btn-soft-success waves-effect waves-light">View All Notifications <i className="ri-arrow-right-line align-middle"></i></button>
                </div>
            </SimpleBar>
        </Tab.Pane>
        <Tab.Pane eventKey="2" className="py-2 ps-2">
            <SimpleBar style={{ maxHeight: "300px" }} className="pe-2">
                <div className="text-reset notification-item d-block dropdown-item">
                    <div className="d-flex">
                        <img src={avatar3}
                            className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                        <div className="flex-grow-1">
                            <Link to="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">James Lemire</h6></Link>
                            <div className="fs-13 text-muted">
                                <p className="mb-1">We talked about a project on linkedin.</p>
                            </div>
                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span><i className="mdi mdi-clock-outline"></i> 30 min ago</span>
                            </p>
                        </div>
                        <div className="px-2 fs-16">
                            <Input className="form-check-input" type="checkbox" />
                        </div>
                    </div>
                </div>
                <div className="text-reset notification-item d-block dropdown-item">
                    <div className="d-flex">
                        <img src={avatar2}
                            className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                        <div className="flex-grow-1">
                            <Link to="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6></Link>
                            <div className="fs-13 text-muted">
                                <p className="mb-1">Answered to your comment on the cash flow forecast's graph 🔔.</p>
                            </div>
                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span><i className="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                            </p>
                        </div>
                        <div className="px-2 fs-16">
                            <Input className="form-check-input" type="checkbox" />
                        </div>
                    </div>
                </div>
                <div className="text-reset notification-item d-block dropdown-item">
                    <div className="d-flex">
                        <img src={avatar6}
                            className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                        <div className="flex-grow-1">
                            <Link to="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Kenneth Brown</h6></Link>
                            <div className="fs-13 text-muted">
                                <p className="mb-1">Mentionned you in his comment on 📃 invoice #12501.</p>
                            </div>
                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span><i className="mdi mdi-clock-outline"></i> 10 hrs ago</span>
                            </p>
                        </div>
                        <div className="px-2 fs-16">
                            <Input className="form-check-input" type="checkbox" />
                        </div>
                    </div>
                </div>
                <div className="text-reset notification-item d-block dropdown-item">
                    <div className="d-flex">
                        <img src={avatar8}
                            className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                        <div className="flex-grow-1">
                            <Link to="#"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Maureen Gibson</h6></Link>
                            <div className="fs-13 text-muted">
                                <p className="mb-1">We talked about a project on linkedin.</p>
                            </div>
                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span><i className="mdi mdi-clock-outline"></i> 3 days ago</span>
                            </p>
                        </div>
                        <div className="px-2 fs-16">
                            <Input className="form-check-input" type="checkbox" />
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
    </TabContent>
</div>
`;

const NotificationDropdownExample = () => (
    <PrismCode
        code={notificationDropdownCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

export { SingleButtonDropdownExample, ColorDropdownExample, SplitButtonDropdownExample, SizingDropdownExample, DarkDropdownExample, AlignDropdownExample, OptionDropdownExample, AutoCloseDropdownExample, MenuItemDropdownExample, MenuContentDropdownExample, NotificationDropdownExample };