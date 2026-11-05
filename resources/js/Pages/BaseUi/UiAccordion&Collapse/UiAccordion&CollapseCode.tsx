import PrismCode from "../../../Components/Common/Prism";

// Default Accordion

const defaultAccordionCode =
    `<!-- Base Example -->
<Accordion id="default-accordion-example">
    <Accordion.Item>
        <Accordion.Header id="headingOne">
                How to create a group booking ?
        </Accordion.Header>
            <Accordion.Body>
                Although you probably won’t get into any legal trouble if you do it just once, why risk it? If you made your subscribers a promise, you should honor that. If not, you run the risk of a drastic increase in opt outs, which will only hurt you in the long run.
            </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item>
        <Accordion.Header id="headingTwo">
                Why do we use it ?
        </Accordion.Header>
            <Accordion.Body>
                No charges are put in place by SlickText when subscribers join your text list. This does not mean however that charges 100% will not occur. Charges that may occur fall under part of the compliance statement stating "Message and Data rates may apply."
            </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item>
        <Accordion.Header id="headingThree">
                Where does it come from ?
        </Accordion.Header>
            <Accordion.Body>
                Now that you have a general idea of the amount of texts you will need per month, simply find a plan size that allows you to have this allotment, plus some extra for growth. Don't worry, there are no mistakes to be made here. You can always upgrade and downgrade.
            </Accordion.Body>
    </Accordion.Item>
</Accordion>
`;

const DefaultAccordionExample = () => (
    <PrismCode
        code={defaultAccordionCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

// Accordion Flush
const flushAccordionCode =
    `
<!-- Accordion Flush Example -->


<Accordion id="default-accordion-example" flush>
    <Accordion.Item>
        <Accordion.Header id="headingOne">
                How to create a group booking ?
        </Accordion.Header>
            <Accordion.Body>
                Although you probably won’t get into any legal trouble if you do it just once, why risk it? If you made your subscribers a promise, you should honor that. If not, you run the risk of a drastic increase in opt outs, which will only hurt you in the long run.
            </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item>
        <Accordion.Header id="headingTwo">
                Why do we use it ?
        </Accordion.Header>
            <Accordion.Body>
                No charges are put in place by SlickText when subscribers join your text list. This does not mean however that charges 100% will not occur. Charges that may occur fall under part of the compliance statement stating "Message and Data rates may apply."
            </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item>
        <Accordion.Header id="headingThree">
                Where does it come from ?
        </Accordion.Header>
            <Accordion.Body>
                Now that you have a general idea of the amount of texts you will need per month, simply find a plan size that allows you to have this allotment, plus some extra for growth. Don't worry, there are no mistakes to be made here. You can always upgrade and downgrade.
            </Accordion.Body>
    </Accordion.Item>
</Accordion>
`;

const FlushAccordionExample = () => (
    <PrismCode
        code={flushAccordionCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Accordions with Icons
const iconAccordionCode =
    `
<!-- Accordions with Icons -->

<Accordion className="custom-accordionwithicon accordion-secondary" id="accordionWithicon">
    <Accordion.Item>
        <Accordion.Header id="headingOne">
                <i className="ri-global-line me-2"></i> How Does Age Verification Work?
        </Accordion.Header>
            <Accordion.Body>
                Increase or decrease the letter spacing depending on the situation and try, try again until it looks right, and each assumenda labore aes Homo nostrud organic, assumenda labore aesthetic magna elements, buttons, everything.
            </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item>
        <Accordion.Header id="headingTwo">
                <i className="ri-user-location-line me-2"></i> How Does Link Tracking Work?
        </Accordion.Header>
            <Accordion.Body>
                Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien.
            </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item>
        <Accordion.Header id="headingThree">
                <i className="ri-pen-nib-line me-2"></i> How Do I Set Up the Drip Feature?
        </Accordion.Header>
            <Accordion.Body>
                Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis aliquam ultrices mauris.
            </Accordion.Body>
    </Accordion.Item>
</Accordion>
`;

const IconAccordionExample = () => (
    <PrismCode
        code={iconAccordionCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Accordions without Icons
const withIconAccordionCode =
    `
<!-- Accordions without Icons -->


<Accordion className="accordion-icon-none" id="accordionWithouticon">
    <Accordion.Item>
        <Accordion.Header id="accordionwithouticonExample1">
                <i className="ri-global-line me-2"></i> How Does Age Verification Work?
        </Accordion.Header>
            <Accordion.Body>
                Each design is a new, unique piece of art birthed into this world, and while you have the opportunity to be creative and make your own style choices. For that very reason, I went on a quest and spoke to many different professional graphic designers.
            </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item>
        <Accordion.Header id="accordionwithouticonExample2">
                <i className="ri-user-location-line me-2"></i> How Does Link Tracking Work?
        </Accordion.Header>

            <Accordion.Body>
                When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown.
            </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item>
        <Accordion.Header id="accordionwithouticonExample3">
                <i className="ri-pen-nib-line me-2"></i> How Do I Set Up the Drip Feature?
        </Accordion.Header>
            <Accordion.Body>
                Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis aliquam ultrices mauris.
            </Accordion.Body>
    </Accordion.Item>
</Accordion>
`;

const WithIconAccordionExample = () => (
    <PrismCode
        code={withIconAccordionCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Accordions with Plus Icon
const plusIconAccordionCode =
    `
<!-- Accordions with Plus Icon -->


<Accordion className="custom-accordionwithicon-plus" id="accordionWithplusicon">
    <Accordion.Item>
        <Accordion.Header id="accordionwithouticonExample1">
                What is User Interface Design?
        </Accordion.Header>
            <Accordion.Body>
                Big July earthquakes confound zany experimental vow. My girl wove six dozen plaid jackets before she quit. Six big devils from Japan quickly forgot how to waltz. try again until it looks right, and each assumenda labore aes Homo nostrud organic, assumenda labore aesthetic magna elements, buttons, everything.
            </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item>
        <Accordion.Header id="accordionwithplusExample2">
                What is Digital Marketing?
        </Accordion.Header>
            <Accordion.Body>
                It makes a statement, it’s impressive graphic design. Increase or decrease the letter spacing depending on the situation and try, try again until it looks right, and each letter has the perfect spot of its own. commodo enim craft beer mlkshk aliquip jean shorts ullamco.
            </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item>
        <Accordion.Header id="accordionwithplusExample3">
                Where does it come from ?
        </Accordion.Header>
            <Accordion.Body>
                Spacing depending on the situation and try, try again until it looks right, and each. next level wes anderson artisan four loko farm-to-table craft beer twee. commodo enim craft beer mlkshk aliquip jean shorts ullamco. omo nostrud organic, assumenda labore aesthetic magna delectus. pposites attract, and that’s a fact.
            </Accordion.Body>
    </Accordion.Item>
</Accordion>
`;

const PlusIconAccordionExample = () => (
    <PrismCode
        code={plusIconAccordionCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Left Icon Accordions
const leftIconAccordionCode =
    `
<!-- Left Icon Accordions -->


<Accordion className="lefticon-accordion custom-accordionwithicon accordion-border-box" id="accordionlefticon">
    <Accordion.Item>
        <Accordion.Header id="accordionlefticonExample1">
            <button
                className={classnames("accordion-button", { collapsed: !lefticonCol1 })} type="button" onClick={t_lefticonCol1} style={{ cursor: "pointer" }} >
                What is User Interface Design?
            </button>
        </Accordion.Header>
            <Accordion.Body>
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua nulla assumenda shoreditch et.
            </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item>
        <Accordion.Header id="accordionlefticonExample2">
                What is Digital Marketing?
        </Accordion.Header>

            <Accordion.Body>
                Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien.
            </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item>
        <Accordion.Header id="accordionlefticonExample3">
                Where does it come from ?
        </Accordion.Header>
            <Accordion.Body>
                Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis aliquam ultrices mauris.
            </Accordion.Body>
    </Accordion.Item>
</Accordion>
`;

const LeftIconAccordionExample = () => (
    <PrismCode
        code={leftIconAccordionCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Accordions Bordered
const borderedAccordionCode =
    `
<!-- Accordions Bordered -->

<Accordion className="custom-accordionwithicon custom-accordion-border accordion-border-box accordion-success" id="accordionBordered">
    <Accordion.Item>
        <Accordion.Header id="accordionborderedExample1">
                What is User Interface Design?
        </Accordion.Header>
            <Accordion.Body>
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua nulla assumenda shoreditch et.
            </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item>
        <Accordion.Header id="accordionborderedExample2">
                What is Digital Marketing?
        </Accordion.Header>
            <Accordion.Body>
                Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien.
            </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item>
        <Accordion.Header id="accordionborderedExample3">
                Where does it come from ?
        </Accordion.Header>
            <Accordion.Body>
                Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis aliquam ultrices mauris.
            </Accordion.Body>
    </Accordion.Item>
</Accordion>
`;

const BorderedAccordionExample = () => (
    <PrismCode
        code={borderedAccordionCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Nesting Accordions
const nestingAccordionCode =
    `
<!-- Nesting Accordions -->


<Accordion className="custom-accordionwithicon accordion-border-box" id="accordionnesting">
    <Accordion.Item>
        <Accordion.Header id="accordionnestingExample1">
                How Do I Add Contacts/Subscribers?
        </Accordion.Header>
            <Accordion.Body>
                This opt in method is perfect for those looking to integrate a different software such Shopify or Hubspot with Slicktext. For example, upon cashing out online, a subscriber may submit to have their mobile number to receive marketing messages. The API will pass this information from said software over to Slicktext via API integration.
                <Accordion className="nesting2-accordion custom-accordionwithicon accordion-border-box mt-3" id="accordionnesting2">
                    <Accordion.Item>
                        <Accordion.Header id="accordionnesting2Example1">
                                How Do I Search For Contacts?
                        </Accordion.Header>
                            <Accordion.Body>
                                When you are in need of finding a specific subscriber, you will want to use the help of SlickText's search navigation tool, located under the Contacts tab of your Slicktext account. Once here, you will have options to sort by, filter, and search your contacts.
                                <Accordion className="nesting4-accordion custom-accordionwithicon accordion-border-box mt-3" id="accordionnesting4">
                                    <Accordion.Item>
                                        <Accordion.Header id="accordionnesting4Example2">
                                                How do I reset my digital tide watch ?
                                        </Accordion.Header>
                                            <Accordion.Body>
                                                Opting out a subscriber will allow SlickText to maintain the history of the subscriber as it pertains to the textword you are opting them out of. If this user was to text to join again, the initial text they are met with will be a "welcome back" message instead of the auto reply.
                                            </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion.Body>
                            </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item>
                        <Accordion.Header id="accordionnesting2Example2">
                                How Do I Delete a Contact From My List?
                        </Accordion.Header>
                            <Accordion.Body>
                                Opting out a subscriber will allow SlickText to maintain the history of the subscriber as it pertains to the textword you are opting them out of. If this user was to text to join again, the initial text they are met with will be a "welcome back" message instead of the auto reply.
                            </Accordion.Body>
                    </Accordion.Item>
                </Accordion.Body>
            </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item>
        <Accordion.Header id="headingTwo">
                How Does Personalization Work?
        </Accordion.Header>
            <Accordion.Body>
                Personalization allows you to provide a personal touch to your outbound text marketing campaigns. SlickText uses merge tags as placeholders that are replaced with contact-specific information when a text message is sent. These merge tags may also be known as personalization fields.
                <Accordion className="nesting3-accordion custom-accordionwithicon accordion-border-box mt-3" id="accordionnesting3">
                    <Accordion.Item className=" mt-2">
                        <Accordion.Header id="accordionnesting4Example2">
                                Howe does temperature impact my watch?
                        </Accordion.Header>
                            <Accordion.Body>
                                Opting out a subscriber will allow SlickText to maintain the history of the subscriber as it pertains to the textword you are opting them out of. If this user was to text to join again, the initial text they are met with will be a "welcome back" message instead of the auto reply.
                            </Accordion.Body>
                    </Accordion.Item>
                </Accordion.Body>
            </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item>
        <Accordion.Header id="headingThree">
                What Happens When I Run Out of Messages?
        </Accordion.Header>
            <Accordion.Body>
                When you run out of messages, you will not be able to send any outbound campaigns. This would include any scheduled messages, drip campaigns, and birthday messages. However, we will continue to deliver your auto-reply messages to allow your subscriber list to continue to grow.
            </Accordion.Body>
    </Accordion.Item>
</Accordion>
`;

const NestingAccordionExample = () => (
    <PrismCode
        code={nestingAccordionCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Accordions Fill Colored
const fillColoredAccordionCode =
    `
<!-- Accordions Fill Colored -->

<Accordion className="custom-accordionwithicon accordion-fill-success" id="accordionFill">
    <Accordion.Item>
        <Accordion.Header id="accordionFillExample1">
                What are webhooks?
        </Accordion.Header>
            <Accordion.Body>
                Webhooks allow you to gather real time data on key interactions that happen with your Slick Text account. Simply provide us with a url where you'd like the data to be sent, choose which events you'd like to be informed of, and click save.                                                            
                </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item>
        <Accordion.Header id="accordionFillExample2">
                Where can I find my Textword ID?
        </Accordion.Header>
            <Accordion.Body>
                Head over to the Textwords page. Click options on the right hand side, and then click Settings. This will redirect you to your Textword Setting page. Now, go check your url, and the textword ID will be the number after "word=". Too much or too little spacing, as in the example below.
            </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item>
        <Accordion.Header id="accordionFillExample3">
                Where is your API documentation?
        </Accordion.Header>
            <Accordion.Body>
                You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you’re working with reputable font websites.
            </Accordion.Body>
    </Accordion.Item>
</Accordion>


<!-- Accordions Fill Colored -->


<Accordion className="custom-accordionwithicon accordion-flush accordion-fill-secondary" id="accordionFill2">
    <Accordion.Item>
        <Accordion.Header id="accordionFill2Example1">
                How Does Age Verification Work?
        </Accordion.Header>
            <Accordion.Body>
                Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR.
            </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item>
        <Accordion.Header id="accordionFill2Example2">
                What Kind of List Growth Should I Expect?
        </Accordion.Header>
            <Accordion.Body>
                Consistency is the one thing that can take all of the different elements in your design, and tie them all together and make them work. In an awareness campaign, it is vital for people to begin put 2 and 2 together and begin to recognize your cause. Consistency piques people’s interest.
            </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item>
        <Accordion.Header id="accordionFill2Example3">
                How Do I Delete a Contact From My List?
        </Accordion.Header>
            <Accordion.Body>
                Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis aliquam ultrices mauris.                                                            
                </Accordion.Body>
    </Accordion.Item>
</Accordion>
`;

const FillColoredAccordionExample = () => (
    <PrismCode
        code={fillColoredAccordionCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Collapse Example
const collapseCode =
    `
<!-- Collapse Example -->

const [open, setOpen] = useState<boolean>(true);

<div className="d-flex gap-2 flex-wrap mb-3">
       <Button as="a" variant="primary" href="#collapseExample" aria-expanded={open} onClick={() => setOpen(!open)}>
        Link with href
    </Button>
    <Button variant="primary" type="button" aria-expanded={open} onClick={() => setOpen(!open)}>
        Button with data-bs-target
    </Button>
    </div>
    <Collapse in={open}>
        <Card className="mb-0">
            <Card.Body>
                When designing, the goal is to draw someone’s attention and portray to them what you’re trying to say. You can make a big statement by using little tricks, like this one. Use contrasting fonts. you can use a bold sanserif font with a cursive.
            </Card.Body>
        </Card>
    </Collapse>
</div>
`;

const CollapseExample = () => (
    <PrismCode
        code={collapseCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Horizontal Collapse
const horizontalCollapseCode =
    `
<!-- Horizontal Collapse -->

const [horizontal, setHorizontal] = useState<boolean>(true);

<p>
    <Button
        variant="primary"
        onClick={() => setHorizontal(!horizontal)}
        aria-controls="collapseWidthExample"
        aria-expanded={horizontal}
    >
        Toggle Width Collapse
    </Button>
</p>
    <div>
        <Collapse in={horizontal} dimension="width">
            <div className="card card-body mb-0" style={{ width: "300px" }}>
                This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.
            </div>
        </Collapse>
    </div>
`;

const HorizontalCollapseExample = () => (
    <PrismCode
        code={horizontalCollapseCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Collapse with Icon
const iconCollapseCode =
    `
<!-- Collapse with Icon -->

    const [coll6, setcoll6] = useState<boolean>(true);
    const [coll7, setcoll7] = useState<boolean>(false);

    const t_coll6 = () => {
        setcoll6(!coll6);
    };

    const t_coll7 = () => {
        setcoll7(!coll7);
    };

<div className="hstack gap-3 mb-3">
    <Link to="#" onClick={t_coll6} style={{ cursor: "pointer" }} className="link-success" >
        <i className="ri-arrow-down-circle-line fs-16"></i>
    </Link>
    <Button variant="light" onClick={t_coll7} style={{ cursor: "pointer" }} >
        <i className="ri-filter-2-line"></i>
    </Button>
</Accordion.Body>
<Collapse isOpen={coll6} id="collapseWithicon">
    <div className="card mb-0">
        <Card.Body>
            If you enter text including symbols in the search criteria, the search criteria is interpreted exactly as you entered it, and the search is case sensitive as a case insensitive search that contains certain text but does also provide a lot of search criteria options.
        </Card.Body>
    </Accordion.Body>
</Collapse>
<Collapse isOpen={coll7} id="collapseWithicon2">
    <div className="card mb-0 mt-3">
        <Card.Body>
            When you want to search for data, such as customer names, addresses, or product groups, you enter criteria. In search criteria you can use all the numbers and letters that you normally use in the specific field. In addition, you can use special symbols to further filter the results.
        </Card.Body>
    </Accordion.Body>
</Collapse>
`;

const IconCollapseExample = () => (
    <PrismCode
        code={iconCollapseCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Inline & Block Element Collapse
const inlineBLockCollapseCode =
    `
<!-- Inline & Block Element Collapse -->

    const [coll8, setcoll8] = useState<boolean>(true);
    const [coll9, setcoll9] = useState<boolean>(true);

    const t_coll8 = () => {
        setcoll8(!coll8);
    };

    const t_coll9 = () => {
        setcoll9(!coll9);
    };

<div className="mb-3">
    <h6 className="text-primary" onClick={t_coll8}>
        <code>&lt;h6&gt;</code> Inline Element Collapse
    </h6>
    <span role="button" className="text-primary fw-medium" onClick={t_coll9}>
        <code>&lt;span&gt;</code> Block Element Collapse
    </span>
</Accordion.Body>
<Row className="g-2">
    <Col className="col-auto">
        <Collapse isOpen={coll8} id="collapseblock" horizontal>
            <div className="card card-body mb-0" style={{ width: "300px" }}>
                A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring heart.
            </Accordion.Body>
        </Collapse>
    </Col>
    <Col className="col-auto">
        <Collapse isOpen={coll9} id="collapseinline" horizontal>
            <div className="card card-body mb-0" style={{ width: "300px" }}>
                When you have created a new account schedule and set up the rows, you must set up columns.
            </Accordion.Body>
        </Collapse>
    </Col>
</Row>
`;

const InlineBLockCollapseExample = () => (
    <PrismCode
        code={inlineBLockCollapseCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);


// Multiple Targets Collapse
const multipleTargetCollapseCode =
    `
<!-- Multiple Targets Collapse -->

    const [coll3, setcoll3] = useState<boolean>(true);
    const [coll4, setcoll4] = useState<boolean>(true);

    const t_coll3 = () => {
        setcoll3(!coll3);
    };

    const t_coll4 = () => {
        setcoll4(!coll4);
    };

    const t_coll5 = () => {
        setcoll3(!coll3);
        setcoll4(!coll4);
    };

<div className="d-flex gap-2 flex-wrap mb-3">
    <Link to="#" onClick={t_coll3} style={{ cursor: "pointer" }} className="btn btn-primary" > Toggle First Element </Link>
    <Button onClick={t_coll4} variant="primary" style={{ cursor: "pointer" }} > Toggle Second Element </Button>
    <Button onClick={t_coll5} variant="primary" style={{ cursor: "pointer" }} > Toggle Both Elements </Button>
</Accordion.Body>
<Row>
    <div className="col">
        <Collapse isOpen={coll3} id="multiCollapseExample1">
            <Card>
                <div className="card card-body mb-0">
                    Some placeholder content for the first collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
                </Accordion.Body>
            </Card>
        </Collapse>
    </Accordion.Body>
    <div className="col">
        <Collapse isOpen={coll4} id="multiCollapseExample2">
            <Card>
                <div className="card card-body mb-0">
                    Some placeholder content for the second collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
                </Accordion.Body>
            </Card>
        </Collapse>
    </Accordion.Body>
</Row>
`;

const MultipleTargetCollapseExample = () => (
    <PrismCode
        code={multipleTargetCollapseCode}
        language={("html")}
        plugins={["line-numbers"]}
    />
);

export { DefaultAccordionExample, FlushAccordionExample, IconAccordionExample, WithIconAccordionExample, PlusIconAccordionExample, LeftIconAccordionExample, BorderedAccordionExample, NestingAccordionExample, FillColoredAccordionExample, CollapseExample, HorizontalCollapseExample, IconCollapseExample, InlineBLockCollapseExample, MultipleTargetCollapseExample };