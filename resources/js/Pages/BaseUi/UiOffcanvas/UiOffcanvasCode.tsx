import PrismCode from "../../../Components/Common/Prism";

// Default Offcanvas

const defaultOffcanvasCode =
    `
<!-- Base Examples -->
const [open, setOpen] = useState<boolean>(false);

const toggleDefultCanvas = () => {
    setOpen(!open);
};
<div className="hstack flex-wrap gap-2">
    <Link to="#" className="btn btn-secondary" onClick={toggleDefultCanvas}>
        Link with href
    </Link>
    <Button variant="secondary" onClick={toggleDefultCanvas}>
        Button with target
    </Button>
</div>

<Offcanvas show={open} onHide={toggleDefultCanvas} id="offcanvasExample">
    <OffcanvcloseButtonader>
    <OffcanvasBody>
        ...
    </OffcanvasBody>
</Offcanvas>
`;

const DefaultOffcanvasExample = () => (
    <PrismCode
        code={defaultOffcanvasCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Placement Offcanvas
const placementOffcanvasCode =
    `
<!-- Placement Offcanvas -->

const [isTop, setIsTop] = useState<boolean>(false);
const toggleTopCanvas = () => {
    setIsTop(!isTop);
};

const [isRight, setIsRight] = useState<boolean>(false);
const toggleRightCanvas = () => {
    setIsRight(!isRight);
};

const [isBottom, setIsBottom] = useState<boolean>(false);
const toggleBottomCanvas = () => {
    setIsBottom(!isBottom);
};

const [isLeft, setIsLeft] = useState<boolean>(false);
const toggleLeftCanvas = () => {
    setIsLeft(!isLeft);
};

<div className="d-flex flex-wrap gap-2">
    <Button variant="primary" onClick={toggleTopCanvas}>Toggle Top Offcanvas</Button>
    <Button variant="secondary" onClick={toggleRightCanvas}>Toggle Right Offcanvas</Button>
    <Button variant="success" onClick={toggleBottomCanvas}>Toggle Bottom Offcanvas</Button>
    <Button variant="danger" onClick={toggleLeftCanvas}>Toggle Left Offcanvas</Button>
</div>

<!-- top offcanvas -->
<Offcanvas show={isTop} onHide={toggleTopCanvas} id="offcanvasTop">
    <OffcacloseButton <OffcanvasBody>
        ...
    </OffcanvasBody>
</Offcanvas>

<!-- right offcanvas -->
<Offcanvas show={isRight} onHide={toggleRightCanvas} id="offcanvasRight">
    <OffcanvasHeadercloseButton      Recent Acitivity
    </OffcanvasHeader>
    <OffcanvasBody>
        ...
    </OffcanvasBody>
</Offcanvas>


<!-- bottom offcanvas -->
<Offcanvas show={isBottom} onHide={toggleBottomCanvas} id="offcanvasBottom">
    <OffcanvasHeader closeButton        Gallery
    </OffcanvasHeader>
    <OffcanvasBody>
        ...
    </OffcanvasBody>
</Offcanvas>

<!-- left offcanvas -->
<Offcanvas show={isLeft} onHide={toggleLeftCanvas} id="offcanvasLeft">
    <OffcanvasHeadcloseButton    Recent Acitivity
    </OffcanvasHeader>
    <OffcanvasBody>
        ...
    </OffcanvasBody>
</Offcanvas>
`;

const PlacementOffcanvasExample = () => (
    <PrismCode
        code={placementOffcanvasCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Backdrop Offcanvas

const backdropOffcanvasCode =
    `
<!-- Backdrop Offcanvas -->

const [isEnableScroll, setIsEnableScroll] = useState<boolean>(false);
const toggleEnableScroll = () => {
    setIsEnableScroll(!isEnableScroll);
};

const [isBackdrop, setIsBackdrop] = useState<boolean>(false);
const toggleBackdrop = () => {
    setIsBackdrop(!isBackdrop);
};

const [isScrollBackDrop, setIsScrollBackDrop] = useState<boolean>(false);
const toggleScrollBackDrop = () => {
    setIsScrollBackDrop(!isScrollBackDrop);
};

<div className="d-flex flex-wrap gap-2">
    <Button className="btn btn-light" onClick={toggleEnableScroll}>Enable Body Scrolling</Button>
    <Button className="btn btn-light" onClick={toggleBackdrop}>Enable Backdrop (Default)</Button>
    <Button className="btn btn-light" onClick={toggleScrollBackDrop}>Enable Both Scrolling & Backdrop</Button>
</div>    

<Offcanvas show={isEnableScroll} onHide={toggleEnableScroll} id="offcanvasScrolling">
    <OffcanvasHeader closeButton">
        Customer Activity
    </OffcanvasHeader>
    <OffcanvasBody>
        ...
    </OffcanvasBody>
</Offcanvas>

<Offcanvas show={isBackdrop} onHide={toggleBackdrop} id="offcanvasWithBackdrop">
    <OffcanvasHeader closeButton>
        Customer Activity
    </OffcanvasHeader>
    <OffcanvasBody>
        ...
    </OffcanvasBody>
</Offcanvas>

<Offcanvas show={isScrollBackDrop} onHide={toggleScrollBackDrop} id="offcanvasWithBothOptions" scrollable>
    <OffcanvasHeader closeButton">
        Customer Activity
    </OffcanvasHeader>
    <OffcanvasBody>
        ...
    </OffcanvasBody>
</Offcanvas>
`;

const BackdropOffcanvasExample = () => (
    <PrismCode
        code={backdropOffcanvasCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

export { DefaultOffcanvasExample, PlacementOffcanvasExample, BackdropOffcanvasExample };