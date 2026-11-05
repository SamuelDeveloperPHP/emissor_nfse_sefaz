import PrismCode from "../../../Components/Common/Prism";

// Default Alerts

const defaultAlertsCode =
    `
<!-- Primary Alert -->
<Alert varient="primary">
    <strong> Hi! </strong> A simple <b>Primary alert</b> —check it out!
</Alert>

<!-- Secondary Alert -->
<Alert varient="secondary">
    <strong> How are you! </strong> A simple <b>secondary alert</b> —check it out!
</Alert>

<!-- Success Alert -->
<Alert varient="success">
    <strong> Yey! Everything worked! </strong> A simple <b>success alert</b> —check it out!
</Alert>

<!-- Danger Alert -->
<Alert varient="danger">
    <strong> Something is very wrong! </strong> A simple <b>danger alert</b> —check it out!
</Alert>

<!-- Warning Alert -->
<Alert varient="warning">
    <strong> Uh oh, something went wrong </strong> A simple <b>warning alert</b> —check it out!
</Alert>

<!-- Info Alert -->
<Alert varient="info">
    <strong> Don't forget' it ! </strong> A simple <b>info alert</b> —check it out!
</Alert>

<!-- Light Alert -->
<Alert varient="light">
    <strong> Mind Your Step! </strong> A simple <b>light alert</b> —check it out!
</Alert>

<!-- Dark Alert -->
<Alert varient="dark">
    <strong> Did you know? </strong> A simple <b>dark alert</b> —check it out!
</Alert>
`;

const DefaultAlertsExample = () => (
    <PrismCode
        code={defaultAlertsCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Borderless Alerts

const borderlessAlertsCode = `
<!-- Primary Alert -->
<Alert varient="primary" className="border-0 border-0">
    <strong> Hi! </strong> A simple <b>Primary alert</b> —check it out!
</Alert>

<!-- Secondary Alert -->
<Alert varient="secondary" className="border-0 border-0">
    <strong> How are you! </strong> A simple <b>secondary alert</b> —check it out!
</Alert>

<!-- Success Alert -->
<Alert varient="success" className="border-0 border-0">
    <strong> Yey! Everything worked! </strong> A simple <b>success alert</b> —check it out!
</Alert>

<!-- Danger Alert -->
<Alert varient="danger" className="border-0 border-0 mb-xl-0">
    <strong> Something is very wrong! </strong> A simple danger alert—check it out!
</Alert>

<!-- Warning Alert -->
<Alert varient="warning" className="border-0 border-0">
    <strong> Uh oh, something went wrong </strong> A simple <b>warning alert</b> —check it out!
</Alert>

<!-- Info Alert -->
<Alert varient="info" className="border-0 border-0">
    <strong>Don't forget' it !</strong> A simple <b>info alert</b> —check it out!
</Alert>

<!-- Light Alert -->
<Alert varient="light" className="border-0 border-0 bg-light">
    <strong>Mind Your Step!</strong> A simple <b>light alert</b> —check it out!
</Alert>

<!-- Dark Alert -->
<Alert varient="dark" className="border-0 border-0 mb-0">
    <strong>Did you know?</strong> A simple <b>dark alert</b> —check it out!
</Alert>`;

const BorderlessExample = () => (
    <PrismCode
        code={borderlessAlertsCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Dismissing Alerts

const dismissingAlertsCode = `
<!-- Primary Alert -->
<Alert varient="primary">
    <strong> Hi! </strong> A simple <b>Dismissible primary Alert </b> — check it out!
</Alert>

<!-- Secondary Alert -->
<Alert varient="secondary">
    <strong> How are you! </strong> A simple <b>Dismissible secondary alert</b> —check it out!
</Alert>

<!-- Success Alert -->
<Alert varient="success">
    <strong>Right Way !</strong> A simple <b>Dismissible success alert</b> —check it out!
</Alert>

<!-- Danger Alert -->
<Alert varient="danger" className="mb-xl-0">
    <strong> Something is very wrong! </strong> A simple <b>Dismissible danger alert</b> —check it out!
</Alert>

<!-- Warning Alert -->
<Alert varient="warning">
    <strong>Welcome Back!</strong> A simple <b>Dismissible warning alert</b> —check it out!
</Alert>

<!-- Info Alert -->
<Alert varient="info">
    <strong>Don't forget' it !</strong> A simple <b>Dismissible info alert</b> —check it out!
</Alert>

<!-- Light Alert -->
<Alert varient="light">
    <strong>Mind Your Step!</strong> A simple <b>Dismissible light alert</b> —check it out!
</Alert>

<!-- Dark Alert -->
<Alert varient="dark" className="mb-0">
    <strong>Did you know?</strong> A simple <b>Dismissible dark alert</b> —check it out!
</Alert>`;

const DismissingExample = () => (
    <PrismCode
        code={dismissingAlertsCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Link Color Alerts

const linkColorAlertsCode = `
<!-- Primary Alert -->
<Alert varient="primary">
    A simple Primary alert with <Link to="#" className="alert-link">an example link</Link>. Give it a click if you like.
</Alert>

<!-- Secondary Alert -->
<Alert varient="secondary">
    A simple Secondary alert with <Link to="#" className="alert-link">an example link</Link>.  Give it a click if you like.
</Alert>

<!-- Success Alert -->
<Alert varient="success">
    A simple Success alert with <Link to="#" className="alert-link">an example link</Link>. Give it a click if you like.
</Alert>

<!-- Danger Alert -->
<Alert varient="danger" className="mb-xl-0">
    A simple Danger alert with <Link to="#" className="alert-link">an example link</Link>. Give it a click if you like.
</Alert>

<!-- Warning Alert -->
<Alert varient="warning">
    A simple Warning alert with <Link to="#" className="alert-link">an example link</Link>. Give  it a click if you like.
</Alert>

<!-- Info Alert -->
<Alert varient="info">
    A simple Info alert with <Link to="#" className="alert-link">an example link</Link>. Give it  a click if you like.
</Alert>

<!-- Light Alert -->
<Alert varient="light">
    A simple Light alert with <Link to="#" className="alert-link">an example link</Link>. Give it a click if you like.
</Alert>

<!-- Dark Alert -->
<Alert varient="dark" className="mb-0">
    A simple Dark alert with <Link to="#" className="alert-link">an example link</Link>. Give it a click if you like.
</Alert>`;

const LinkColorExample = () => (
    <PrismCode
        code={linkColorAlertsCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Live Alert Example

const liveAlertsCode = `
const [show, setShow] = useState<boolean>(false);
<Alert varient="success" isOpen={show} toggle={() => setShow(false)}>
    Nice, you triggered this alert message!
</Alert>
<button type="button" className="btn btn-primary" id="liveAlertBtn" onClick={() => setShow(true)}>Show live alert</button>`;

const LiveExample = () => (
    <PrismCode
        code={liveAlertsCode}
        language={("jsx")}
        plugins={["line-numbers"]}
    />
);

// Outline Alerts

const outlineAlertsCode = `
<!-- Primary Alert -->
<Alert varient="primary" className="border-2 bg-body-secondary alert-dismissible border-2 bg-body-secondary fade show">
    <strong> Hi! </strong> - Outline <b>primary alert</b> example
</Alert>

<!-- Secondary Alert -->
<Alert varient="secondary" className="border-2 bg-body-secondary alert-dismissible border-2 bg-body-secondary fade show">
    <strong> How are you! </strong> - Outline <b>secondary alert</b> example
</Alert>

<!-- Success Alert -->
<Alert varient="success" className="border-2 bg-body-secondary alert-dismissible border-2 bg-body-secondary fade show">
    <strong> Yey! Everything worked! </strong> - Outline <b>success alert</b> example
</Alert>

<!-- Danger Alert -->
<Alert varient="danger" className="border-2 bg-body-secondary alert-dismissible border-2 bg-body-secondary fade show mb-xl-0">
    <strong> Something is very wrong! </strong> - Outline <b>danger alert</b> example
</Alert>

<!-- Warning Alert -->
<Alert varient="warning" className="border-2 bg-body-secondary alert-dismissible border-2 bg-body-secondary fade show">
    <strong> Uh oh, something went wrong! </strong> - Outline <b>warning alert</b> example
</Alert>

<!-- Info Alert -->
<Alert varient="info" className="border-2 bg-body-secondary alert-dismissible border-2 bg-body-secondary fade show">
    <strong>Don't forget' it !</strong> - Outline <b>info alert</b> example
</Alert>

<!-- Dark Alert -->
<Alert varient="dark" className="border-2 bg-body-secondary alert-dismissible border-2 bg-body-secondary fade show mb-0">
    <strong>Did you know?</strong> - Outline <b>dark alert</b> example
</Alert>`;

const OutlineAlertsExample = () => (
    <PrismCode
        code={outlineAlertsCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Left Border Alerts

const leftBorderAlertsCode = `
<!-- Primary Alert -->
<Alert varient="primary" className="alert-border-left">
    <i className="ri-user-smile-line me-3 align-middle fs-16"></i><strong>Primary</strong> - Left border alert
</Alert>

<!-- Secondary Alert -->
<Alert varient="secondary" className="alert-border-left">
    <i className="ri-check-double-line me-3 align-middle fs-16"></i><strong>Secondary</strong> - Left border alert
</Alert>

<!-- Success Alert -->
<Alert varient="success" className="alert-border-left">
    <i className="ri-notification-off-line me-3 align-middle fs-16"></i><strong>Success</strong> - Left border alert
</Alert>

<!-- Danger Alert -->
<Alert varient="danger" className="alert-border-left mb-xl-0">
    <i className="ri-error-warning-line me-3 align-middle fs-16"></i><strong>Danger</strong> - Left border alert
</Alert>

<!-- Warning Alert -->
<Alert varient="warning" className="alert-border-left">
    <i className="ri-alert-line me-3 align-middle fs-16"></i><strong>Warning</strong> - Left border alert
</Alert>

<!-- Info Alert -->
<Alert varient="info" className="alert-border-left">
    <i className="ri-airplay-line me-3 align-middle fs-16"></i><strong>Info</strong> - Left border alert
</Alert>

<!-- Light Alert -->
<Alert varient="light" className="alert-border-left">
    <i className="ri-mail-line me-3 align-middle fs-16"></i><strong>Light</strong> - Left border alert
</Alert>

<!-- Dark Alert -->
<Alert varient="dark" className="alert-border-left mb-0">
    <i className="ri-refresh-line me-3  align-middle fs-16"></i><strong>Dark</strong> - Left border alert
</Alert>`;

const LeftBorderAlertsExample = () => (
    <PrismCode
        code={leftBorderAlertsCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Label Icon Alerts

const labelIconAlertsCode = `
<!-- Primary Alert -->
<Alert varient="primary" className="alert-solid alert-dismissible bg-primary text-white alert-label-icon fade show">
    <i className="ri-user-smile-line label-icon"></i><strong>Primary</strong> -Label icon alert 
</Alert>

<!-- Secondary Alert -->
<Alert varient="secondary" className="alert-solid alert-dismissible bg-secondary text-white alert-label-icon fade show">
    <i className="ri-check-double-line label-icon"></i><strong>Secondary</strong> - Label icon alert
</Alert>

<!-- Success Alert -->
<Alert varient="success" className="alert-solid alert-dismissible bg-success text-white alert-label-icon fade show">
    <i className="ri-notification-off-line label-icon"></i><strong>Success</strong> - Label icon alert
</Alert>

<!-- Danger Alert -->
<Alert varient="danger" className="alert-solid alert-dismissible bg-danger text-white alert-label-icon fade show mb-xl-0">
    <i className="ri-error-warning-line label-icon"></i><strong>Danger</strong> - Label icon alert
</Alert>

<!-- Warning Alert -->
<Alert varient="warning" className="alert-solid alert-dismissible bg-warning text-white alert-label-icon fade show">
    <i className="ri-alert-line label-icon"></i><strong>warning</strong> - Label icon alert
</Alert>

<!-- Info Alert -->
<Alert varient="info" className="alert-solid alert-dismissible bg-info text-white alert-label-icon fade show">
    <i className="ri-airplay-line label-icon"></i><strong>Info</strong> - Label icon alert
</Alert>

<!-- Light Alert -->
<Alert varient="light" className="alert-solid alert-dismissible bg-light text-white alert-label-icon fade show">
    <i className="ri-mail-line label-icon"></i><strong>Light</strong> - Label icon alert
</Alert>

<!-- Dark Alert -->
<Alert varient="dark" className="alert-solid alert-dismissible bg-dark text-white alert-label-icon fade show mb-0">
    <i className="ri-refresh-line label-icon"></i><strong>Dark</strong> - Label icon alert
</Alert>`;

const LabelIconAlertsExample = () => (
    <PrismCode
        code={labelIconAlertsCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Top Border with Outline Alerts Alerts

const topBarAlertsCode = `
<!-- Primary Alert -->
<Alert varient="primary" className="alert-top-border">
    <i className="ri-user-smile-line me-3 align-middle fs-16 text-primary"></i><strong>Primary</strong> - Top border alert
</Alert>

<!-- Secondary Alert -->
<Alert varient="secondary" className="alert-top-border">
    <i className="ri-check-double-line me-3 align-middle fs-16 text-secondary"></i><strong>Secondary</strong> - Top border alert
</Alert>

<!-- Success Alert -->
<Alert varient="success" className="alert-top-border">
    <i className="ri-notification-off-line me-3 align-middle fs-16 text-success"></i><strong>Success</strong> - Top border alert
</Alert>

<!-- Danger Alert -->
<Alert varient="danger" className="alert-top-border mb-xl-0">
    <i className="ri-error-warning-line me-3 align-middle fs-16 text-danger "></i><strong>Danger</strong> - Top border alert
</Alert>

<!-- Warning Alert -->
<Alert varient="warning" className="alert-top-border">
    <i className="ri-alert-line me-3 align-middle fs-16 text-warning"></i><strong>Warning</strong> - Top border alert
</Alert>

<!-- Info Alert -->
<Alert varient="info" className="alert-top-border">
    <i className="ri-airplay-line me-3 align-middle fs-16 text-info"></i><strong>Info</strong> - Top border alert
</Alert>

<!-- Light Alert -->
<Alert varient="light" className="alert-top-border">
    <i className="ri-mail-line me-3 align-middle fs-16 text-body"></i><strong>Light</strong> - Top border alert
</Alert>

<!-- Dark Alert -->
<Alert varient="dark" className="alert-top-border mb-0">
    <i className="ri-refresh-line me-3 align-middle fs-16 text-body"></i><strong>Dark</strong> - Top border alert
</Alert>`;

const TopBarAlertsExample = () => (
    <PrismCode
        code={topBarAlertsCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Label Icon Arrow Alerts Alerts Alerts

const labelIconArrowAlertsCode = `
<!-- Primary Alert -->
<Alert varient="primary" className="alert-label-icon label-arrow ">
 <i className="ri-user-smile-line label-icon"></i><strong>Primary</strong> - Label icon arrow alert
</Alert>

<!-- Secondary Alert -->
<Alert varient="secondary" className="alert-label-icon label-arrow ">
    <i className="ri-check-double-line label-icon"></i><strong>Secondary</strong> - Label icon arrow alert
</Alert>

<!-- Success Alert -->
<Alert varient="success" className="alert-label-icon label-arrow ">
    <i className="ri-notification-off-line label-icon"></i><strong>Success</strong> - Label icon arrow alert
</Alert>

<!-- Danger Alert -->
<Alert varient="danger" className="alert-label-icon label-arrow mb-xl-0">
    <i className="ri-error-warning-line label-icon"></i><strong>Danger</strong> - Label icon arrow alert
</Alert>

<!-- Warning Alert -->
<Alert varient="warning" className="alert-label-icon label-arrow ">
    <i className="ri-alert-line label-icon"></i><strong>Warning</strong> - Label icon arrow alert
</Alert>

<!-- Info Alert -->
<Alert varient="info" className="alert-label-icon label-arrow ">
    <i className="ri-airplay-line label-icon"></i><strong>Info</strong> - Label icon arrow alert
</Alert>

<!-- Light Alert -->
<Alert varient="light" className="alert-label-icon label-arrow ">
    <i className="ri-mail-line label-icon"></i><strong>Light</strong> - Label icon arrow alert
</Alert>

<!-- Dark Alert -->
<Alert varient="dark" className="alert-label-icon label-arrow mb-0">
    <i className="ri-refresh-line label-icon"></i><strong>Dark</strong> - Label icon arrow alert
</Alert>`;

const LabelIconArrowAlertsExample = () => (
    <PrismCode
        code={labelIconArrowAlertsCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Rounded Label Icon Alerts

const roundedLabelIconAlertsCode = `
<!-- Primary Alert -->
<Alert varient="primary" className="alert-label-icon rounded-label">
    <i className="ri-user-smile-line label-icon"></i><strong>Primary</strong> - Rounded label alert 
</Alert>

<!-- Secondary Alert -->
<Alert varient="secondary" className="alert-label-icon rounded-label">
    <i className="ri-check-double-line label-icon"></i><strong>Secondary</strong> - Rounded label alert
</Alert>

<!-- Success Alert -->
<Alert varient="success" className="alert-label-icon rounded-label">
    <i className="ri-notification-off-line label-icon"></i><strong>Success</strong> - Rounded label alert
</Alert>

<!-- Danger Alert -->
<Alert varient="danger" className="alert-label-icon rounded-label">
    <i className="ri-error-warning-line label-icon"></i><strong>Danger</strong> - Rounded label alert
</Alert>

<!-- Warning Alert -->
<Alert varient="warning" className="alert-label-icon rounded-label">
    <i className="ri-alert-line label-icon"></i><strong>Warning</strong> - Rounded label alert 
</Alert>

<!-- Info Alert -->
<Alert varient="info" className="alert-label-icon rounded-label">
    <i className="ri-airplay-line label-icon"></i><strong>Info</strong> - Rounded label alert
</Alert>

<!-- Light Alert -->
<Alert varient="light" className="alert-label-icon rounded-label">
    <i className="ri-mail-line label-icon"></i><strong>Light</strong> - Rounded label alert
</Alert>

<!-- Dark Alert -->
<Alert varient="dark" className="alert-label-icon rounded-label">
    <i className="ri-refresh-line label-icon"></i><strong>Dark</strong> - Rounded label alert
</Alert>`;

const RoundedLabelIconAlertsExample = () => (
    <PrismCode
        code={roundedLabelIconAlertsCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Additional Content Alerts

const additionalContentAlertsCode = `
<!-- Primary Alert -->
<Alert varient="primary" className="alert-additional">
<div className="alert-body">
    <div className="d-flex">
        <div className="flex-shrink-0 me-3">
            <i className="ri-error-warning-line fs-16 align-middle"></i>
        </div>
        <div className="flex-grow-1">
        <h5 className="alert-heading">Well done !</h5>
            <p className="mb-0">Aww yeah, you successfully read this important alert message. </p>
        </div>
    </div>
</div>
<div className="alert-content">
    <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
</div>
</Alert>

<!-- Success Alert -->
<Alert varient="success" className="alert-additional">
<div className="alert-body">
    <div className="d-flex">
        <div className="flex-shrink-0 me-3">
            <i className="ri-notification-off-line fs-16 align-middle"></i>
        </div>
        <div className="flex-grow-1">
        <h5 className="alert-heading">Yey! Everything worked!</h5>
            <p className="mb-0">This alert needs your attention, but it's not super important.</p>
        </div>
    </div>
</div>
<div className="alert-content">
    <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
</div>
</Alert>

<!-- Danger Alert -->
<Alert varient="danger" className="alert-additional mb-xl-0">
<div className="alert-body">
    <div className="d-flex">
        <div className="flex-shrink-0 me-3">
            <i className="ri-alert-line fs-16 align-middle"></i>
        </div>
        <div className="flex-grow-1">
        <h5 className="alert-heading">Something is very wrong!</h5>
            <p className="mb-0">Change a few things up and try submitting again.</p>
        </div>
    </div>
</div>
<div className="alert-content">
    <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
</div>
</Alert>

<!-- Warning Alert -->
<Alert varient="warning" className="alert-additional mb-0">
<div className="alert-body">
    <div className="d-flex">
        <div className="flex-shrink-0 me-3">
            <i className="ri-alert-line fs-16 align-middle"></i>
        </div>
        <div className="flex-grow-1">
        <h5 className="alert-heading">Uh oh, something went wrong!</h5>
            <p className="mb-0">Better check yourself, you're not looking too good.</p>
        </div>
    </div>
</div>
<div className="alert-content">
<p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
</div>
</Alert>
`;

const AdditionalContentAlertsExample = () => (
    <PrismCode
        code={additionalContentAlertsCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);



// Solid Alerts

const solidAlertsCode = `
<!-- Primary Alert -->
<Alert varient="primary" className="bg-primary text-white border-0">
    <strong>Hi!</strong> - Solid <b>primary alert</b> example
</Alert>

<!-- Secondary Alert -->
<Alert varient="secondary" className="border-0 bg-secondary text-white">
    <strong>How are you!</strong> - Solid <b>secondary alert</b> example
</Alert>

<!-- Success Alert -->
<Alert varient="success" className="border-0 bg-success text-white">
    <strong>Yey! Everything worked! </strong> - Solid <b>success alert</b> example
</Alert>

<!-- Danger Alert -->
<Alert varient="danger" className="border-0 bg-danger text-white mb-xl-0">
    <strong>Something is very wrong!</strong> - Solid <b>danger alert</b> example
</Alert>

<!-- Warning Alert -->
<Alert varient="warning" className="border-0 bg-warning text-white">
    <strong>Uh oh, something went wrong!</strong> - Solid <b>warning alert</b> example
</Alert>

<!-- Info Alert -->
<Alert varient="info" className="border-0 bg-info text-white">
    <strong>Don't forget' it !</strong> - Solid <b>info alert</b> example
</Alert>

<!-- Light Alert -->
<Alert varient="light" className="border-0 bg-secondary text-white">
    <strong>Mind Your Step!</strong> - Solid <b>secondary alert</b> example
</Alert>

<!-- Dark Alert -->
<Alert varient="dark" className="border-0 bg-dark text-white mb-0">
    <strong>Did you know?</strong> - Solid <b>dark alert</b> example
</Alert>`;

const SolidAlertsExample = () => (
    <PrismCode
        code={solidAlertsCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


export { DefaultAlertsExample, BorderlessExample, DismissingExample, LinkColorExample, LiveExample, OutlineAlertsExample, LeftBorderAlertsExample, LabelIconAlertsExample, TopBarAlertsExample, LabelIconArrowAlertsExample, RoundedLabelIconAlertsExample, SolidAlertsExample, AdditionalContentAlertsExample };
