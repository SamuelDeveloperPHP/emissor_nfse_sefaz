import PrismCode from "../../../Components/Common/Prism";

// Default Badges

const defaultBadgesCode =
    `
<Badge bg="primary"> Primary </Badge>

<Badge bg="secondary"> Secondary </Badge>

<Badge bg="success"> Success </Badge>

<Badge bg="info"> Info </Badge>

<Badge bg="warning"> Warning </Badge>

<Badge bg="danger"> Danger </Badge>

<Badge bg="dark"> Dark </Badge>

<Badge bg="light" className="text-body"> Light </Badge>
`;

const DefaultBadgesExample = () => (
    <PrismCode
        code={defaultBadgesCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Soft Badges

const softBadgesCode =
    `
<span className="badge bg-primary-subtle text-primary">Primary</span>

<span className="badge bg-secondary-subtle text-secondary ">Secondary</span>

<span className="badge bg-success-subtle text-success">Success</span>

<span className="badge bg-info-subtle text-info">Info</span>

<span className="badge bg-warning-subtle text-warning">Warning</span>

<span className="badge bg-danger-subtle text-danger">Danger</span>

<span className="badge bg-dark-subtle text-body">Dark</span>

<span className="badge bg-light-subtle text-body">Light</span>

`;

const SoftBadgesExample = () => (
    <PrismCode
        code={softBadgesCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Outline Badges

const outlineBadgesCode =
    `
<span className="badge border border-primary text-primary">Primary</span>

<span className="badge border border-secondary text-secondary">Secondary</span>

<span className="badge border border-success text-success">Success</span>

<span className="badge border border-info text-info">Info</span>

<span className="badge border border-warning text-warning">Warning</span>

<span className="badge border border-danger text-danger">Danger</span>

<span className="badge border border-dark text-body">Dark</span>
    
<span className="badge border border-light text-body">Light</span> 
`;

const OutlineBadgesExample = () => (
    <PrismCode
        code={outlineBadgesCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Rounded Pill Badges

const roundedPillBadgesCode =
    `
<Badge bg="primary" pill> Primary </Badge>

<Badge bg="secondary" pill> Secondary </Badge>

<Badge bg="success" pill> Success </Badge>

<Badge bg="info" pill> Info </Badge>

<Badge bg="warning" pill> Warning </Badge>

<Badge bg="danger" pill> Danger </Badge>

<Badge bg="dark" pill> Dark </Badge>

<Badge bg="light" className="text-body" pill> Light </Badge>

`;

const RoundedPillBadgesExample = () => (
    <PrismCode
        code={roundedPillBadgesCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Label Badges

const labelPillBadgesCode =
    `
<Badge bg="primary" pill> Primary </Badge>

<Badge bg="secondary" pill> Secondary </Badge>

<Badge bg="success" pill> Success </Badge>

<Badge bg="info" pill> Info </Badge>

<Badge bg="warning" pill> Warning </Badge>

<Badge bg="danger" pill> Danger </Badge>

<Badge bg="dark" pill> Dark </Badge>

<Badge bg="light" className="text-body" pill> Light </Badge>

`;

const LabelBadgesExample = () => (
    <PrismCode
        code={labelPillBadgesCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Example of the badge used in the HTML Heading

const htmlBadgesCode =
    `
<h1>Example heading  <Badge bg="secondary"> New </Badge> </h1>

<h2>Example heading  <Badge bg="secondary"> New </Badge> </h2>

<h3>Example heading  <Badge bg="secondary"> New </Badge> </h3>

<h4>Example heading  <Badge bg="secondary"> New </Badge> </h4>

<h5>Example heading  <Badge bg="secondary"> New </Badge> </h5>

<h6 className="mb-0">Example heading  <Badge bg="secondary"> New </Badge> </h6>

`;

const HTMLBadgesExample = () => (
    <PrismCode
        code={htmlBadgesCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Rounded Pill Badges with soft effect

const roundSoftBadgesCode =
    `
<span className="badge rounded-pill bg-primary-subtle text-primary">Primary</span>

<span className="badge rounded-pill bg-secondary-subtle text-secondary ">Secondary</span>

<span className="badge rounded-pill bg-success-subtle text-success">Success</span>

<span className="badge rounded-pill bg-info-subtle text-info">Info</span>

<span className="badge rounded-pill bg-warning-subtle text-warning">Warning</span>

<span className="badge rounded-pill bg-danger-subtle text-danger">Danger</span>

<span className="badge rounded-pill bg-dark-subtle text-body">Dark</span>

<span className="badge rounded-pill bg-light-subtle">Light</span>
`;

const RoundSoftBadgesExample = () => (
    <PrismCode
        code={roundSoftBadgesCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Soft Border Badges

const softBorderBadgesCode =
    `
<span className="badge bg-primary-subtle text-primary badge-border">Primary</span>

<span className="badge bg-secondary-subtle text-secondary  badge-border">Secondary</span>

<span className="badge bg-success-subtle text-success badge-border">Success</span>

<span className="badge bg-info-subtle  text-info badge-border">Info</span>

<span className="badge bg-warning-subtle  text-warning badge-border">Warning</span>

<span className="badge bg-danger-subtle  text-danger badge-border">Danger</span>

<span className="badge bg-dark-subtle badge-border">Dark</span>

<span className="badge bg-light-subtle badge-border">Light</span>
`;

const SoftBorderBadgesExample = () => (
    <PrismCode
        code={softBorderBadgesCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Outline Pill Badges
const outlinePillBadgesCode =
    `
<span className="badge rounded-pill border border-primary text-primary">Primary</span>

<span className="badge rounded-pill border border-secondary text-secondary">Secondary</span>

<span className="badge rounded-pill border border-success text-success">Success</span>

<span className="badge rounded-pill border border-info text-info">Info</span>

<span className="badge rounded-pill border border-warning text-warning">Warning</span>

<span className="badge rounded-pill border border-danger text-danger">Danger</span>

<span className="badge rounded-pill border border-dark text-body">Dark</span>

<span className="badge rounded-pill border border-light text-body">Light</span>

`;

const OutlinePillBadgesExample = () => (
    <PrismCode
        code={outlinePillBadgesCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Button Position Badges
const buttonPositionBadgesCode =
    `
<Button varient="primary" className="position-relative">
    Mails 
    <Badge pill bg="success" className="position-absolute top-0 start-100 translate-middle">+99
        <span className="visually-hidden">unread messages</span></Badge>
</Button>

<Button varient="light" className="position-relative">
    Alerts <span
        className="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-1"><span
            className="visually-hidden">unread messages</span></span>
</Button>

<Button type="button" varient="primary" className="position-relative p-0 avatar-xs rounded">
    <span className="avatar-title bg-transparent">
        <i className="bx bxs-envelope"></i>
    </span>
    <span
        className="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-1"><span
            className="visually-hidden">unread messages</span></span>
</Button>

<Button varient="light" className="position-relative p-0 avatar-xs rounded-circle">
    <span className="avatar-title bg-transparent text-reset">
        <i className="bx bxs-bell"></i>
    </span>
</Button>

<Button varient="light" className="position-relative p-0 avatar-xs rounded-circle">
    <span className="avatar-title bg-transparent text-reset">
        <i className="bx bx-menu"></i>
    </span>
    <span
        className="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-success p-1"><span
            className="visually-hidden">unread messages</span></span>
</Button>
`;

const ButtonPositionBadgesExample = () => (
    <PrismCode
        code={buttonPositionBadgesCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Badges With Button

const buttonBadgesCode =
    `
<Button varient="primary">
    Notifications <Badge bg="success" className="ms-1">4</Badge>
</Button>
<Button varient="success">
    Messages <Badge bg="danger" className="ms-1">2</Badge>
</Button>
<Button varient="secondary" outline>
    Draft <Badge bg="success" className="ms-1">2</Badge>
</Button>
`;

const ButtonBadgesExample = () => (
    <PrismCode
        code={buttonBadgesCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Gradient Badges

const gradientBadgesCode =
    `
<Badge className="badge-gradient-primary">Primary</Badge>

<Badge className="badge-gradient-secondary">Secondary</Badge>

<Badge className="badge-gradient-success">Success</Badge>

<Badge className="badge-gradient-danger">Danger</Badge>

<Badge className="badge-gradient-warning">Warning</Badge>

<Badge className="badge-gradient-info">Info</Badge>

<Badge className="badge-gradient-dark">Dark</Badge>
`;

const GradientBadgesExample = () => (
    <PrismCode
        code={gradientBadgesCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


export { DefaultBadgesExample, RoundedPillBadgesExample, LabelBadgesExample, HTMLBadgesExample, SoftBadgesExample, OutlineBadgesExample, RoundSoftBadgesExample, SoftBorderBadgesExample, OutlinePillBadgesExample, ButtonPositionBadgesExample, ButtonBadgesExample, GradientBadgesExample };