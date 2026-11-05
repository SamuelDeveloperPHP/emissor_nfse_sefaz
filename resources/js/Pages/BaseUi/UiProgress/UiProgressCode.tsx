import PrismCode from "../../../Components/Common/Prism";

// Default Progress

const defaultProgressCode =
    `
<!-- Base Examples -->
<div className="mb-4">
    <ProgressBar now={0} />
</div>

<div className="mb-4">
    <ProgressBar now={25} />
</div>

<div className="mb-4">
    <ProgressBar now={50} />
</div>

<div className="mb-4">
    <ProgressBar now={75} />
</div>

<div>
    <ProgressBar now={100} />
</div>`;

const DefaultProgressExample = () => (
    <PrismCode
        code={defaultProgressCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Progress with background color

const backgroundColorCode =
    `
<!-- Backgrounds -->
<div className="mb-4">
    <ProgressBar variant="primary" now={15} />
</div>

<div className="mb-4">
    <ProgressBar variant="success" now={25} />
</div>

<div className="mb-4">
    <ProgressBar variant="info" now={50} />
</div>

<div className="mb-4">
    <ProgressBar variant="warning" now={75} />
</div>

<div>
    <ProgressBar variant="danger" now={100} />
</div>`;

const BackgroundColorExample = () => (
    <PrismCode
        code={backgroundColorCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Progress with Label

const labelCode =
    `
<!-- Labels Example -->
<ProgressBar variant="primary" now={25}> 25% </Progress>
`;

const LabelExample = () => (
    <PrismCode
        code={labelCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Multiple Bars
const multipleBarsCode =
    `
<!-- Multiple Bars -->
<ProgressBar multi>
    <ProgressBar bar now="15" />
    <ProgressBar bar variant="success" now="30" />
    <ProgressBar bar variant="info" now="20" />
</Progress>
`;

const MultipleBarsExample = () => (
    <PrismCode
        code={multipleBarsCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Height
const heightCode =
    `
<!-- Prgress sm -->
<div className="mb-4">
    <h5 className="fs-13">Small Progress</h5>
    <ProgressBar variant="primary" now={25} className="progress-sm" />
</div>

<!-- Prgress Default -->
<div className="mb-4">
    <h5 className="fs-13">Default Progress </h5>
    <ProgressBar variant="success" now={40} className="progress-md" />
</div>

<!-- Prgress lg -->
<div className="mb-4">
    <h5 className="fs-13">Large Progress</h5>
    <ProgressBar variant="warning" now={50} className="progress-lg" />
</div>

<!-- Prgress xl -->
<div>
    <h5 className="fs-13">Extra Large Progress</h5>
    <ProgressBar variant="danger" now={70} className="progress-xl" />
</div>
`;

const HeightExample = () => (
    <PrismCode
        code={heightCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Striped Progress
const stripedCode =
    `
<!-- Striped Prgress -->
<div className="mb-4">
    <ProgressBar striped now={25} />
</div>
<div>
    <ProgressBar variant="success" striped now={40} />
</div>
`;

const StripedExample = () => (
    <PrismCode
        code={stripedCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Animated Striped Progress
const animatedStripedCode =
    `
<!-- Animated Striped Progress -->
<div>
    <ProgressBar now={75} striped animated />
</div>
`;

const AnimatedStripedExample = () => (
    <PrismCode
        code={animatedStripedCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Gradient Progress
const gradientCode =
    `
<!-- Gradient -->
<div className="mb-4">
    <ProgressBar now={15} className="bg-gradient" />
</div>
<div className="mb-4">
    <ProgressBar variant="success" now={25} className="bg-gradient" />
</div>
<div className="mb-4">
    <ProgressBar variant="info" now={50} className="bg-gradient" />
</div>
<div className="mb-4">
    <ProgressBar variant="warning" now={75} className="bg-gradient" />
</div>
<div>
    <ProgressBar variant="danger" now={100} className="bg-gradient" />
</div>
`;

const GradientExample = () => (
    <PrismCode
        code={gradientCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Animated Progress
const animatedCode =
    `
<!-- Animated Progress -->
<div className="mb-4">
    <ProgressBar now={15} className="animated-progess" />
</div>
<div className="mb-4">
    <ProgressBar now={25} variant="success" className="animated-progess" />
</div>
<div className="mb-4">
    <ProgressBar now={50} variant="info" className="animated-progess" />
</div>
<div className="mb-4">
    <ProgressBar now={75} variant="warning" className="animated-progess" />
</div>
<div>
    <ProgressBar now={100} variant="danger" className="animated-progess" />
</div>
`;

const AnimatedExample = () => (
    <PrismCode
        code={animatedCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Custom Progress
const customCode =
    `
<!-- Custom Progress -->
<div className="mb-4">
    <ProgressBar now={15} variant="primary" className="animated-progess custom-progress" />
</div>
<div className="mb-4">
    <ProgressBar now={25} variant="success" className="animated-progess custom-progress" />
</div>
<div className="mb-4">
    <ProgressBar now={50} variant="info" className="animated-progess custom-progress" />
</div>
<div className="mb-4">
    <ProgressBar now={75} variant="warning" className="animated-progess custom-progress" />
</div>
<div>
    <ProgressBar now={100} variant="danger" className="animated-progess custom-progress" />
</div>
`;

const CustomExample = () => (
    <PrismCode
        code={customCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Custom Progress with Label
const customProgressCode =
    `
<!-- Custom Progress with Label -->
<div className="d-flex align-items-center pb-2 mt-4">
    <div className="flex-shrink-0 me-3">
        <div className="avatar-xs">
            <div className="avatar-title bg-light rounded-circle text-muted fs-16">
                <i className="mdi mdi-facebook"></i>
            </div>
        </div>
    </div>
    <div className="flex-grow-1">
        <div>
            <ProgressBar now={15} variant="primary" className="animated-progess custom-progress progress-label" ><div className="label">15%</div> </Progress>
        </div>
    </div>
</div>

<div className="d-flex align-items-center py-2">
    <div className="flex-shrink-0 me-3">
        <div className="avatar-xs">
            <div className="avatar-title bg-light rounded-circle text-muted fs-16">
                <i className="mdi mdi-twitter"></i>
            </div>
        </div>
    </div>
    <div className="flex-grow-1">
        <div>
            <ProgressBar now={25} variant="success" className="animated-progess custom-progress progress-label" ><div className="label">25%</div> </Progress>
        </div>
    </div>
</div>

<div className="d-flex align-items-center py-2">
    <div className="flex-shrink-0 me-3">
        <div className="avatar-xs">
            <div className="avatar-title bg-light rounded-circle text-muted fs-16">
                <i className="mdi mdi-github"></i>
            </div>
        </div>
    </div>
    <div className="flex-grow-1">
        <div>
            <ProgressBar now={50} variant="info" className="animated-progess custom-progress progress-label" ><div className="label">30%</div> </Progress>
        </div>
    </div>
</div>
`;

const CustomProgressExample = () => (
    <PrismCode
        code={customProgressCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Content Progress
const contentCode =
    `
<!-- Content Progress -->
<Card className="bg-light overflow-hidden shadow-none">
    <Card.Body>
        <div className="d-flex">
            <div className="flex-grow-1">
                <h6 className="mb-0"><b className="text-secondary">30%</b> Update in
                    progress...</h6>
            </div>
            <div className="flex-shrink-0">
                <h6 className="mb-0">1 min left</h6>
            </div>
        </div>
    </Card.Body>
    <div >
        <ProgressBar now={30} variant="info" className="bg-info-subtle rounded-0" />
    </div>
</Card>

<Card className="bg-light overflow-hidden shadow-none">
    <Card.Body>
        <div className="d-flex">
            <div className="flex-grow-1">
                <h6 className="mb-0"><b className="text-success">60%</b> Update in
                    progress...</h6>
            </div>
            <div className="flex-shrink-0">
                <h6 className="mb-0">45s left</h6>
            </div>
        </div>
    </Card.Body>
    <div>
        <ProgressBar now={60} variant="success" className="bg-success-subtle rounded-0" />
    </div>
</Card>

<Card className="bg-light overflow-hidden shadow-none">
    <Card.Body>
        <div className="d-flex">
            <div className="flex-grow-1">
                <h6 className="mb-0"><b className="text-danger">82%</b> Update in
                    progress...</h6>
            </div>
            <div className="flex-shrink-0">
                <h6 className="mb-0">25s left</h6>
            </div>
        </div>
    </Card.Body>
    <div>
        <ProgressBar now={82} variant="danger" className="bg-danger-subtle rounded-0" />
    </div>
</Card>
`;



const ContentExample = () => (
    <PrismCode
        code={contentCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Progress with Steps
const progressWithStepCode =
    `
<!-- Progress with Steps -->
<div className="position-relative m-4">
    <ProgressBar now={50} style={{ height: "1px" }} />
    <Button size="sm" variant="primary" className="position-absolute top-0 start-0 translate-middle rounded-pill" style={{ width: "2rem", height: "2rem" }}>1</Button>
    <Button size="sm" variant="primary" className="position-absolute top-0 start-50 translate-middle rounded-pill" style={{ width: "2rem", height: "2rem" }}>2</Button>
    <Button size="sm" variant="light" className="position-absolute top-0 start-100 translate-middle rounded-pill" style={{ width: "2rem", height: "2rem" }}>3</Button>
</div>
`;

const ProgressWithStepExample = () => (
    <PrismCode
        code={progressWithStepCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Step Progress with Arrow
const stepProgressArrowCode =
    `
<!-- Step Progress with Arrow -->
<ProgressBar multi className='progress-step-arrow progress-info'>
    <ProgressBar bar now="35"> Step 1 </Progress>
    <ProgressBar bar now="35"> Step 2 </Progress>
    <ProgressBar bar now="35" variant="light" className="text-body"> Step 3 </Progress>
</Progress>
`;

const StepProgressArrowExample = () => (
    <PrismCode
        code={stepProgressArrowCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

export { DefaultProgressExample, BackgroundColorExample, LabelExample, MultipleBarsExample, HeightExample, StripedExample, AnimatedStripedExample, GradientExample, AnimatedExample, CustomExample, CustomProgressExample, ContentExample, ProgressWithStepExample, StepProgressArrowExample };