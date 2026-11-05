import PrismCode from "../../../Components/Common/Prism";

// Default Modal

const defaultModalCode =
    `
<!-- Default Modals -->

const [modal_standard, setmodal_standard] = useState<boolean>(false);

    function tog_standard() {
        setmodal_standard(!modal_standard);
    }

<Button variant="primary" onClick={() => tog_standard()}>Standard Modal</Button>

<Modal id="myModal"
        show={modal_standard}
        onHide={() => {
            tog_standard();
        }}
>
    <Modal.Header>
        <h5
            className="modal-title"
            id="myModalLabel"
        >
            Modal Heading
        </h5>
        <Button
            type="button"
            className="btn-close"
            onClick={() => {
                setmodal_standard(false);
            }}
            aria-label="Close"
        >
        </Button>
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
            onClick={() => {
                tog_standard();
            }}
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
`;

const DefaultModalExample = () => (
    <PrismCode
        code={defaultModalCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Vertically Centered Modal
const centeredModalCode =
    `
<!-- Vertically Centered -->

const [modal_center, setmodal_center] = useState<boolean>(false);

    function tog_center() {
        setmodal_center(!modal_center);
    }

<Button variant="primary" onClick={() => tog_center()}>Center Modal</Button>

<Modal
    show={modal_center}
    onHide={() => {
        tog_center();
    }}
    centered
>
    ...
</Modal>
`;

const CenteredModalExample = () => (
    <PrismCode
        code={centeredModalCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Grids in Modals
const gridsModalCode =
    `
<!-- Grids in modals -->

const [modal_grid, setmodal_grid] = useState<boolean>(false);

    function tog_grid() {
        setmodal_grid(!modal_grid);
    }

<Button variant="primary" onClick={() => setmodal_grid(true)}>
    Launch Demo Modal
</Button>

<Modal
    show={modal_grid}
    onHide={() => {
        tog_grid();
    }}
>
    <Modal.Header>
        <h5 className="modal-title">
            Grid Modals
        </h5>
        <Button
            type="button"
            onClick={() => {
                setmodal_grid(false);
            }}
            className="btn-close"
            aria-label="Close"
        >
        </Button>
    </Modal.Header>
    <Modal.Body>
        <form action="#">
            <div className="row g-3">
                <Col xxl={6}>
                    <div>
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <Input type="text" className="form-control" id="firstName" placeholder="Enter firstname" />
                    </div>
                </Col>
                <Col xxl={6}>
                    <div>
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <Input type="text" className="form-control" id="lastName" placeholder="Enter lastname" />
                    </div>
                </Col>
                <div className="col-lg-12">
                    <label className="form-label">Gender</label>
                    <div>
                        <div className="form-check form-check-inline">
                            <Input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                            <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <Input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                            <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <Input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                            <label className="form-check-label" htmlFor="inlineRadio3">Others</label>
                        </div>
                    </div>
                </div>
                <Col xxl={6}>
                    <label htmlFor="emailInput" className="form-label">Email</label>
                    <Input type="email" className="form-control" id="emailInput" placeholder="Enter your email" />
                </Col>
                <Col xxl={6}>
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <Input type="password" className="form-control" id="passwordInput" value="451326546" placeholder="Enter password" />
                </Col>
                <div className="col-lg-12">
                    <div className="hstack gap-2 justify-content-end">
                        <Button variant="light" onClick={() => setmodal_grid(false)}>Close</Button>
                        <Button variant="primary">Submit</Button>
                    </div>
                </div>
            </div>
        </form>
    </Modal.Body>
</Modal>
`;

const GridsModalExample = () => (
    <PrismCode
        code={gridsModalCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Static Backdrop Modal
const staticBackdropModalCode =
    `
<!-- Static Backdrop -->

const [modal_backdrop, setmodal_backdrop] = useState<boolean>(false);

    function tog_backdrop() {
        setmodal_backdrop(!modal_backdrop);
    }

<Modal
    show={modal_backdrop}
    onHide={() => {
        tog_backdrop();
    }}
    backdrop={'static'}
    id="staticBackdrop"
    centered
>
    <Modal.Header>
        <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
        <Button type="button" className="btn-close"
            onClick={() => {
                setmodal_backdrop(false);
            }} aria-label="Close"></Button>
    </Modal.Header>
    <Modal.Body className="text-center p-5">
        <i className="bx bx-party display-4 text-success"></i>

        <div className="mt-4">
            <h4 className="mb-3">You've made it!</h4>
            <p className="text-muted mb-4"> The transfer was not successfully received by us. the email of the recipient wasn't correct.</p>
            <div className="hstack gap-2 justify-content-center">
                <Link href="#" className="btn btn-link link-success fw-medium" onClick={() => setmodal_backdrop(false)}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                <Link href="#" className="btn btn-success">Completed</Link>
            </div>
        </div>
    </Modal.Body>
</Modal>
`;

const StaticBackdropModalExample = () => (
    <PrismCode
        code={staticBackdropModalCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// toggle Between Modal
const TogglebetweenCode =
`<Modal
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
</Modal>`
const TogglebetweenExample = () => (
    <PrismCode
        code={TogglebetweenCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);
// onHide Between Modal
const onHidebetweenCode =
    `
<!-- Default List -->

const [modal_togFirst, setmodal_togFirst] = useState<boolean>(false);

    function tog_togFirst() {
        setmodal_togFirst(!modal_togFirst);
    }

    const [modal_togSecond, setmodal_togSecond] = useState<boolean>(false);

    function tog_togSecond() {
        setmodal_togSecond(!modal_togSecond);
    }

<Button variant="primary" onClick={() => tog_togFirst()}>Open First Modal</Button>


<Modal
    show={modal_togFirst}
    onHide={() => {
        tog_togFirst();
    }}
    id="firstmodal"
    centered
>
    <Modal.Header>
        <h5 className="modal-title" id="exampleModalonHideLabel">
            Modal 1
        </h5>
        <Button
            type="button"
            className="btn-close"
            onClick={() => {
                setmodal_togFirst(false);
            }}
            aria-label="Close"
        >
        </Button>
    </Modal.Header>
    <Modal.Body className="text-center p-5">
        <i className="ri-error-warning-line display-2 text-warning"></i>
        <div className="mt-4 pt-4">
            <h4>Uh oh, something went wrong!</h4>
            <p className="text-muted"> The transfer was not successfully received by us. the email of the recipient wasn't correct.</p>
            <Button className="btn btn-warning" onClick={() => { tog_togSecond(); tog_togFirst(false); }}>
                Continue
            </Button>
        </div>
    </Modal.Body>
</Modal>
<Modal
    show={modal_togSecond}
    onHide={() => {
        tog_togSecond();
    }}
    id="secondmodal"
    centered
>
    <Modal.Header>
        <h5 className="modal-title" id="exampleModalonHideLabel2">Modal 2</h5>
        <Button
            type="button"
            className="btn-close"
            onClick={() => {
                setmodal_togSecond(false);
            }}
            aria-label="Close"
        ></Button>
    </Modal.Header>
    <Modal.Body className="text-center p-5">
        <i className="ri-chat-smile-2-line display-2 text-success"></i>
        <div className="mt-4 pt-3">
            <h4 className="mb-3">Follow-Up Email</h4>
            <p className="text-muted mb-4">Hide this modal and show the first with the button below Automatically Send your invitees a follow -Up email.</p>
            <div className="hstack gap-2 justify-content-center">
                <Button className="btn btn-soft-danger" onClick={() => { tog_togFirst(); tog_togSecond(false); }}>
                    Back to First
                </Button>
                <Button variant="light" onClick={() => tog_togSecond(false)}>Close</Button>
            </div>
        </div>
    </Modal.Body>
</Modal>
`;

const onHidebetweenExample = () => (
    <PrismCode
        code={onHidebetweenCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Tooltips and Popovers
const tooltipModalCode =
    `
<!-- Tooltips and Popovers -->

const [modal_tooltip, setmodal_tooltip] = useState<boolean>(false);

    function tog_tooltip() {
        setmodal_tooltip(!modal_tooltip);
    }

<Button variant="primary" onClick={() => tog_tooltip()}>
    Launch Demo Modal
</Button>

<Modal
    show={modal_tooltip}
    onHide={() => {
        tog_tooltip();
    }}
>
    <Modal.Header>
        <h5 className="modal-title">
            Tooltips and Popovers Modal
        </h5>
        <Button
            type="button"
            onClick={() => {
                setmodal_tooltip(false);
            }}
            className="btn-close"
            aria-label="Close"
        >
        </Button>
    </Modal.Header>
    <Modal.Body>
        <h5 className="fs-16">Popover in a Modal</h5>
        <p className="text-muted">You only need to know a little to make a big
            <Link href="#" className="popover-test fw-medium text-decoration-underline link-success" id="UncontrolledPopover">
                Popover on Click
            </Link>
            you do every day. So let's get started. First, some common types of fonts and what you need to know about them triggers a popover on click.</p>
        <UncontrolledPopover placement="bottom" target="UncontrolledPopover" >
            <PopoverHeader> Common Types of Fonts </PopoverHeader>
            <PopoverBody> They're a good choice for more traditional projects. </PopoverBody>
        </UncontrolledPopover>
        <h5 className="fs-16">Tooltips in a Modal</h5>
        <p className="text-muted">Opposites attract, and that’s a fact. It’s in our
            <Link href="#" className="tooltip-test text-decoration-underline fw-medium" id="UncontrolledTooltip1">
                graphic design
            </Link> to be interested in the unusual, and that’s why using
            <Link href="#" className="tooltip-test text-decoration-underline" id="UncontrolledTooltip2">
                design
            </Link> contrasting colors in Graphic Design is a must.</p>
        <UncontrolledTooltip placement="top" target="UncontrolledTooltip1" > Morton Bayer </UncontrolledTooltip>
        <UncontrolledTooltip placement="top" target="UncontrolledTooltip2" > Web Developers </UncontrolledTooltip>
    </Modal.Body>
    <Modal.Footer>
        <div className="mx-auto">
            <Link href="#" className="btn btn-link fw-medium">Read More <i className="ri-arrow-right-line ms-1 align-middle"></i></Link>
        </div>
    </Modal.Footer>
</Modal>
`;

const TooltipModalExample = () => (
    <PrismCode
        code={tooltipModalCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Scrollable Modal
const scrollableModalCode =
    `
<!-- Scrollable Modal -->
const [modal_scroll, setmodal_scroll] = useState<boolean>(false);

    function tog_scroll() {
        setmodal_scroll(!modal_scroll);
    }

<Button variant="primary" onClick={() => setmodal_scroll(true)}>Scrollable Modal</Button>

<Modal
    show={modal_scroll}
    onHide={() => {
        tog_scroll();
    }}
    scrollable={true}
    id="exampleModalScrollable"
>
    ...
</Modal>
`;

const ScrollableModalExample = () => (
    <PrismCode
        code={scrollableModalCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Varying Modal Content
const varyingModalCode =
    `
<!-- Varying Modal Content -->
<div className="hstack gap-2 flex-wrap">
    <Button variant="primary" onClick={() => tog_varying1()}>Open Modal for Mary</Button>
    <Button variant="primary" onClick={() => tog_varying2()}>Open Modal for Jennifer</Button>
    <Button variant="primary" onClick={() => tog_varying3()}>Open Modal for Roderick</Button>
</div>

<Modal show={modal_varying1} onHide={() => { tog_varying1(); }} id="exampleModal">
    <Modal.Header>
        New message to Mary
        <Button
            type="button"
            className="btn-close"
            onClick={() => {
                setmodal_varying1(false);
            }}
            aria-label="Close"
        ></Button>
    </Modal.Header>
    <Modal.Body>
        <form>
            <div className="mb-3">
                <label htmlFor="customer-name" className="col-form-label">Customer Name:</label>
                <Input type="text" className="form-control" id="customer-name" value="Mary" />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Message:</label>
                <textarea className="form-control" id="message-text" rows="4"></textarea>
            </div>
        </form>
    </Modal.Body>
    <Modal.Footer>
        <Button
        variant="light"
            className="btn btn-light"
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
`;

const VaryingModalExample = () => (
    <PrismCode
        code={varyingModalCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Optional Sizes
const optionalModalCode =
    `
<!-- Optional Modal Sizes -->

<!-- Fullscreen modal --> 
const [modal_fullscreen, setmodal_fullscreen] = useState<boolean>(false);

    function tog_fullscreen() {
        setmodal_fullscreen(!modal_fullscreen);
    }

<!-- Extra Large modal --> 
const [modal_xlarge, setmodal_xlarge] = useState<boolean>(false);

    function tog_xlarge() {
        setmodal_xlarge(!modal_xlarge);
    }

<!-- Large modal --> 
const [modal_large, setmodal_large] = useState<boolean>(false);

    function tog_large() {
        setmodal_large(!modal_large);
    }

<!-- Small modal -->
const [modal_small, setmodal_small] = useState<boolean>(false);

    function tog_small() {
        setmodal_small(!modal_small);
    }

<div className="hstack flex-wrap gap-2">

    <!-- Fullscreen modal --> 
    <Button variant="primary" onClick={() => tog_fullscreen()}>Fullscreen Modal</Button>


    <!-- Extra Large modal --> 
    <Button variant="info" onClick={() => tog_xlarge()}>Extra large Modal</Button>


    <!-- Large modal --> 
    <Button variant="success" onClick={() => tog_large()}>Large Modal</Button>


    <!-- Small modal --> 
    <Button variant="danger" onClick={() => tog_small()}>Small Modal</Button>
</div>


<Modal
    size="xl"
    show={modal_fullscreen}
    onHide={() => {
        tog_fullscreen();
    }}
    className="modal-fullscreen"
    id="exampleModalFullscreen"
>
    ...
</Modal>

<Modal
    size="xl"
    show={modal_xlarge}
    onHide={() => {
        tog_xlarge();
    }}
>
    ...
</Modal>

<Modal
    size="lg"
    show={modal_large}
    onHide={() => {
        tog_large();
    }}
>
    ...
</Modal>

<Modal
    size="sm"
    show={modal_small}
    onHide={() => {
        tog_small();
    }}
>
    ...
</Modal>
`;

const OptionalModalExample = () => (
    <PrismCode
        code={optionalModalCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Fullscreen Responsive Modals
const fullscreenResponsiveCode =
    `
<!-- Fullscreen Modals -->
const [modal_fullscreen1, setmodal_fullscreen1] = useState<boolean>(false);

    function tog_fullscreen1() {
        setmodal_fullscreen1(!modal_fullscreen1);
    }

{/* FullscreenSm */}
const [modal_fullscreen_sm, setmodal_fullscreen_sm] = useState<boolean>(false);

    function tog_fullscreen_sm() {
        setmodal_fullscreen_sm(!modal_fullscreen_sm);
    }

{/* FullscreenMd */}
const [modal_fullscreen_md, setmodal_fullscreen_md] = useState<boolean>(false);

    function tog_fullscreen_md() {
        setmodal_fullscreen_md(!modal_fullscreen_md);
    }

{/* FullscreenLg */}
const [modal_fullscreen_lg, setmodal_fullscreen_lg] = useState<boolean>(false);

    function tog_fullscreen_lg() {
        setmodal_fullscreen_lg(!modal_fullscreen_lg);
    }

{/* FullscreenXl */}
const [modal_fullscreen_xl, setmodal_fullscreen_xl] = useState<boolean>(false);

    function tog_fullscreen_xl() {
        setmodal_fullscreen_xl(!modal_fullscreen_xl);
    }

{/* FullscreenXxl */}
const [modal_fullscreen_xxl, setmodal_fullscreen_xxl] = useState<boolean>(false);

    function tog_fullscreen_xxl() {
        setmodal_fullscreen_xxl(!modal_fullscreen_xxl);
    }

<div className="hstack gap-2 flex-wrap">
    <Button variant="primary" onClick={() => tog_fullscreen1()}> Fullscreen modal </Button>
    <Button variant="primary" onClick={() => tog_fullscreen_sm()}>Full Screen Below sm</Button>
    <Button variant="primary" onClick={() => tog_fullscreen_md()}>Full Screen Below md</Button>
    <Button variant="primary" onClick={() => tog_fullscreen_lg()}>Full Screen Below lg</Button>
    <Button variant="primary" onClick={() => tog_fullscreen_xl()}>Full Screen Below xl</Button>
    <Button variant="primary" onClick={() => tog_fullscreen_xxl()}>Full Screen Below xxl</Button>
</div>

{/* Fullscreen Responsive Modals */}
<Modal size="xl" show={modal_fullscreen1} onHide={() => { tog_fullscreen1(); }} className="modal-fullscreen" id="fullscreeexampleModal">
    ...
</Modal>

{/* FullscreenSm */}
<Modal id="exampleModalFullscreenSm" show={modal_fullscreen_sm} onHide={() => { tog_fullscreen_sm(); }} >
    ...
</Modal>

{/* FullscreenMd */}
<Modal id="exampleModalFullscreenMd" show={modal_fullscreen_md} onHide={() => { tog_fullscreen_md(); }} >
    ...
</Modal>

{/* FullscreenLg */}
<Modal id="exampleModalFullscreenLg" show={modal_fullscreen_lg} onHide={() => { tog_fullscreen_lg(); }} >
    ...
</Modal>

{/* FullscreenXl */}
<Modal id="exampleModalFullscreenXl" show={modal_fullscreen_xl} onHide={() => { tog_fullscreen_xl(); }} >
    ...
</Modal>

{/* FullscreenXxl */}
<Modal id="exampleModalFullscreenXxl" show={modal_fullscreen_xxl} onHide={() => { tog_fullscreen_xxl(); }} >
    ...
</Modal>
`;

const FullscreenResponsiveExample = () => (
    <PrismCode
        code={fullscreenResponsiveCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Animation Modals
const animationModalCode =
    `
<!-- Animation Modals -->

const [modal_animationRight, setmodal_animationRight] = useState<boolean>(false);
    function tog_animationRight() {
        setmodal_animationRight(!modal_animationRight);
    }

    const [modal_animationLeft, setmodal_animationLeft] = useState<boolean>(false);
    function tog_animationLeft() {
        setmodal_animationLeft(!modal_animationLeft);
    }

    const [modal_animationUp, setmodal_animationUp] = useState<boolean>(false);
    function tog_animationUp() {
        setmodal_animationUp(!modal_animationUp);
    }

    const [modal_animationFlip, setmodal_animationFlip] = useState<boolean>(false);
    function tog_animationFlip() {
        setmodal_animationFlip(!modal_animationFlip);
    }

    const [modal_animationZoom, setmodal_animationZoom] = useState<boolean>(false);
    function tog_animationZoom() {
        setmodal_animationZoom(!modal_animationZoom);
    }


<div className="hstack gap-2 flex-wrap">
    <Button variant="primary" onClick={() => tog_animationRight()}>Fade In Right Modal</Button>
    <Button variant="primary" onClick={() => tog_animationLeft()} >Fade In Left Modal</Button>
    <Button variant="primary" onClick={() => tog_animationUp()} >Fade In Up Modal</Button>
    <Button variant="primary" onClick={() => tog_animationFlip()} >Flip Modal</Button>
    <Button variant="primary" onClick={() => tog_animationZoom()} >Zoom In Modal</Button>
</div>


<Modal id="fadeInRightModal" show={modal_animationRight} onHide={() => { tog_animationRight(); }} dialogClassName="fadeInRight" centered >
    ...
</Modal>

<Modal id="fadeInleftModal" show={modal_animationLeft} onHide={() => { tog_animationLeft(); }} dialogClassName="fadeInLeft" centered >
    ...
</Modal>

<Modal id="fadeInUpModal" show={modal_animationUp} onHide={() => { tog_animationUp(); }} dialogClassName="fadeInUp" centered >
    ...
</Modal>

<Modal id="flipModal" show={modal_animationFlip} onHide={() => { tog_animationFlip(); }} dialogClassName="flip" centered >
    ...
</Modal>

<Modal id="flipModal" show={modal_animationZoom} onHide={() => { tog_animationZoom(); }} dialogClassName="zoomIn" centered >
    ...
</Modal>
`;

const AnimationModalExample = () => (
    <PrismCode
        code={animationModalCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Modal Positions
const positionModalCode =
    `
<!-- Positions Modals -->

const [modal_positionTop, setmodal_positionTop] = useState<boolean>(false);
    function tog_positionTop() {
        setmodal_positionTop(!modal_positionTop);
    }

    const [modal_positionTopRight, setmodal_positionTopRight] = useState<boolean>(false);
    function tog_positionTopRight() {
        setmodal_positionTopRight(!modal_positionTopRight);
    }

    const [modal_positionBottom, setmodal_positionBottom] = useState<boolean>(false);
    function tog_positionBottom() {
        setmodal_positionBottom(!modal_positionBottom);
    }

    const [modal_positionBottomRight, setmodal_positionBottomRight] = useState<boolean>(false);
    function tog_positionBottomRight() {
        setmodal_positionBottomRight(!modal_positionBottomRight);
    }


<div className="hstack gap-2 flex-wrap">
    <Button variant="primary" onClick={() => tog_positionTop()}>Top Modal</Button>
    <Button variant="secondary" onClick={() => tog_positionTopRight()}>Top Right Modal</Button>
    <Button variant="success" onClick={() => tog_positionBottom()}>Bottom Modal</Button>
    <Button variant="danger" onClick={() => tog_positionBottomRight()}>Bottom Right Modal</Button>
</div>


<Modal id="topmodal" show={modal_positionTop} onHide={() => { tog_positionTop(); }} >
    ...
</Modal>

<Modal id="top-rightmodal" show={modal_positionTopRight} onHide={() => { tog_positionTopRight(); }} className="modal-dialog-right" >
    ...
</Modal>

<Modal id="bottomModal" show={modal_positionBottom} onHide={() => { tog_positionBottom(); }} className="modal-dialog-bottom" >
    ...
</Modal>

<Modal id="bottom-rightModal" show={modal_positionBottomRight} onHide={() => { tog_positionBottomRight(); }} className="modal-dialog-bottom-right" >
    ...
</Modal
`;

const PositionModalExample = () => (
    <PrismCode
        code={positionModalCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

export { DefaultModalExample, CenteredModalExample, GridsModalExample, StaticBackdropModalExample, TogglebetweenExample, onHidebetweenExample, TooltipModalExample, ScrollableModalExample, VaryingModalExample, OptionalModalExample, FullscreenResponsiveExample, AnimationModalExample, PositionModalExample };