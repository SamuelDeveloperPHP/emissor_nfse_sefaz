import PrismCode from "../../../Components/Common/Prism";

// Image Rounded & Circle

const imgRoundedCircleCode =
    `
<!-- Rounded Image -->
<img className="rounded" alt="200x200" width="200" src={img4} />

<!-- Rounded-circle Image -->
<img className="rounded-circle avatar-xl" alt="200x200" src={avatar4} />
`;

const ImgRoundedCircleExample = () => (
    <PrismCode
        code={imgRoundedCircleCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Image Thumbnails

const imgThumbnailsCode =
    `
<!-- Thumbnails Images -->
<img className="img-thumbnail" alt="200x200" width="200" src={img3} />

<img className="img-thumbnail rounded-circle avatar-xl" alt="200x200" src={avatar3} />
`;

const ImgThumbnailsExample = () => (
    <PrismCode
        code={imgThumbnailsCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Image Sizes

const imgSizesCode =
    `
<!-- Image Sizes -->
<img src={avatar2} alt="" className="rounded avatar-xxs" />

<img src={avatar10} alt="" className="rounded avatar-xs" />

<img src={avatar3} alt="" className="rounded avatar-sm" />

<img src={avatar4} alt="" className="rounded avatar-md" />

<img src={avatar5} alt="" className="rounded avatar-lg" />

<img src={avatar8} alt="" className="rounded avatar-xl" />

<img src={avatar2} alt="" className="rounded-circle avatar-xxs" />

<img src={avatar10} alt="" className="rounded-circle avatar-xs" />

<img src={avatar3} alt="" className="rounded-circle avatar-sm" />

<img src={avatar4} alt="" className="rounded-circle avatar-md" />

<img src={avatar5} alt="" className="rounded-circle avatar-lg" />

<img src={avatar8} alt="" className="rounded-circle avatar-xl" />
`;

const ImgSizesExample = () => (
    <PrismCode
        code={imgSizesCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Avatar With Content

const avatarCode =
    `
<!-- Avatar With Content -->
<div className="avatar-xxs">
    <div className="avatar-title rounded bg-primary-subtle text-primary">
    XXS
    </div>
</div>

<div className="avatar-xs">
    <div className="avatar-title rounded bg-secondary-subtle text-secondary">
    XS
    </div>
</div>

<div className="avatar-sm">
    <div className="avatar-title rounded bg-success-subtle text-success">
    Sm
    </div>
</div>

<div className="avatar-md">
    <div className="avatar-title rounded bg-info-subtle text-info">
    Md
    </div>
</div>

<div className="avatar-lg">
    <div className="avatar-title rounded bg-warning-subtle text-warning">
    Lg
    </div>
</div>

<div className="avatar-xl">
    <div className="avatar-title rounded bg-danger-subtle text-danger">
    Xl
    </div>
</div>
`;

const AvatarExample = () => (
    <PrismCode
        code={avatarCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Avatar Group

const avatarGroupCode =
    `
<!-- Simple Group -->
<div className="avatar-group">
    <div className="avatar-group-item">
        <img src={avatar4} alt="" className="rounded-circle avatar-sm" />
    </div>
    <div className="avatar-group-item">
    <img src={avatar5} alt="" className="rounded-circle avatar-sm" />
    </div>
    <div className="avatar-group-item">
        <div className="avatar-sm">
            <div className="avatar-title rounded-circle bg-light text-primary">
                A
            </div>
        </div>
    </div>
    <div className="avatar-group-item">
        <img src={avatar2} alt="" className="rounded-circle avatar-sm" />
    </div>
</div>

<!-- Avatar Group with Tooltip -->
<div className="mt-lg-0 mt-3">
    <p className="text-muted">Use <code>avatar-group</code> class with <code>data-bs-toggle="tooltip"</code> to show avatar group images with tooltip.</p>
    <div className="avatar-group">
<Link href="#" className="avatar-group-item" >
    <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="button-tooltip"> Christi </Tooltip>}
    >
        <Image src={avatar4} alt="" className="rounded-circle avatar-sm" />
    </OverlayTrigger>
</Link>
<Link href="#" className="avatar-group-item">
<OverlayTrigger
    placement="top"
    overlay={<Tooltip id="button-tooltip"> Frank Hook </Tooltip>}
>
    <Image src={avatar3} alt="" className="rounded-circle avatar-sm" />
</OverlayTrigger>
</Link>
<Link href="#" className="avatar-group-item">
<OverlayTrigger
    placement="top"
    overlay={<Tooltip id="button-tooltip"> Christi </Tooltip>}
>
    <div className="avatar-sm">
        <div className="avatar-title rounded-circle bg-light text-primary">
            C
        </div>
    </div>
</OverlayTrigger>
</Link>

<Link href="#" className="avatar-group-item">
<OverlayTrigger
    placement="top"
    overlay={<Tooltip id="button-tooltip"> MORE </Tooltip>}
>
    <div className="avatar-sm">
        <div className="avatar-title rounded-circle">
            2+
        </div>
    </div>
</OverlayTrigger>
</Link>
</div>
    </div>
`;

const AvatarGroupExample = () => (
    <PrismCode
        code={avatarGroupCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Figures

const figuresCode =
    `
<!-- figures Images -->
<figure className="figure">
    <img src={img4} className="figure-img img-fluid rounded" alt="..." />
    <figcaption className="figure-caption">A caption for the above image.</figcaption>
</figure>

<figure className="figure mb-0">
    <img src={img5} className="figure-img img-fluid rounded" alt="..." />
    <figcaption className="figure-caption text-end">A caption for the above image.</figcaption>
</figure>
`;

const FiguresExample = () => (
    <PrismCode
        code={figuresCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Responsive Images

const responsiveCode =
    `
<!-- Responsive Images -->
<img src={img2} className="img-fluid" alt="Responsive image" />
`;

const ResponsiveExample = () => (
    <PrismCode
        code={responsiveCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

export { ImgRoundedCircleExample, ImgThumbnailsExample, ImgSizesExample, AvatarExample, AvatarGroupExample, FiguresExample, ResponsiveExample };