import React, { useState } from 'react';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { Accordion, Button, Card, Col, Collapse, Container, Row } from 'react-bootstrap';


// Import Content
import UiContent from '../../../Components/Common/UiContent';

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { DefaultAccordionExample, FlushAccordionExample, IconAccordionExample, WithIconAccordionExample, PlusIconAccordionExample, LeftIconAccordionExample, BorderedAccordionExample, NestingAccordionExample, FillColoredAccordionExample, CollapseExample, HorizontalCollapseExample, IconCollapseExample, InlineBLockCollapseExample, MultipleTargetCollapseExample } from './UiAccordion&CollapseCode';
import { Head, Link } from '@inertiajs/react';
import Layout from '../../../Layouts';

const UiAccordions = () => {

    const [open, setOpen] = useState<boolean>(true);
    const [horizontal, setHorizontal] = useState<boolean>(true);
    const [collapseWithicon, setCollapseWithicon] = useState<boolean>(true);
    const [collapseWithicon2, setCollapseWithicon2] = useState<boolean>(false);
    const [collapseblock, setCollapseblock] = useState<boolean>(true);
    const [collapseinline, setCollapseinline] = useState<boolean>(true);
    const [multiCollapseExample1, setMultiCollapseExample1] = useState<boolean>(true);
    const [multiCollapseExample2, setMultiCollapseExample2] = useState<boolean>(true);

    return (
        <React.Fragment>
            <Head title='Accordions | Velzon - React Admin & Dashboard Template' />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Accordions" pageTitle="Base UI" />
                    <Row>
                        <Col xxl={6}>
                            <Card>

                                <PreviewCardHeader title="Default Accordion" />

                                <Card.Body>
                                    <p className="text-muted">A Default Accordian Example.</p>
                                    <div className="live-preview">
                                        <Accordion id="default-accordion-example" defaultActiveKey="1">
                                            <Accordion.Item eventKey='1'>
                                                <Accordion.Header id="headingOne">
                                                    How to create a group booking ?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    Although you probably won’t get into any legal trouble if you do it just once, why risk it? If you made your subscribers a promise, you should honor that. If not, you run the risk of a drastic increase in opt outs, which will only hurt you in the long run.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='2'>
                                                <Accordion.Header id="headingTwo">
                                                    Why do we use it ?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    No charges are put in place by SlickText when subscribers join your text list. This does not mean however that charges 100% will not occur. Charges that may occur fall under part of the compliance statement stating "Message and Data rates may apply."
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='3'>
                                                <Accordion.Header id="headingThree">
                                                    Where does it come from ?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    Now that you have a general idea of the amount of texts you will need per month, simply find a plan size that allows you to have this allotment, plus some extra for growth. Don't worry, there are no mistakes to be made here. You can always upgrade and downgrade.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <DefaultAccordionExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xxl={6}>
                            <Card>

                                <PreviewCardHeader title="Accordion Flush" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>accordion-flush</code> class to remove the default background-color, some borders, and some rounded corners to render accordions edge-to-edge with their parent container.</p>
                                    <div className="live-preview">

                                        <Accordion id="default-accordion-example" defaultActiveKey="4">
                                            <Accordion.Item eventKey='4'>
                                                <Accordion.Header>
                                                    How do I set up my profile ?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    The renewal of your SlickText service happens on the anniversary of your original paid sign up date. Upgrading in the middle of your billing period will not change the billing date. Upgrading does however force an immediate, pro-rated charge to take place on your account.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='5'>
                                                <Accordion.Header >
                                                    What can I do with my project ?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    If you had signed up on a free account with Slicktext, then upgraded to a paid plan at a later date, your bill will renew based on the date you had upgraded to a paid plan. All invoices are able to be viewed under your plan options in your SlickText account.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='6'>
                                                <Accordion.Header >
                                                    Where can I go to edit voice settings
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    No, we cannot provide this information. Opting out from a list is an anonymous, private act. This prevents further harassment. Providing this information is considered bad practice, and further communication after they opt out would be considered against compliance.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <FlushAccordionExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Accordions with Icons" />
                                <Card.Body>
                                    <p className="text-muted">Use <code>custom-accordionwithicon</code> class to show custom icon at accordion.</p>
                                    <div className="live-preview">

                                        <Accordion className="custom-accordionwithicon accordion-secondary" defaultActiveKey="7">
                                            <Accordion.Item eventKey='7'>
                                                <Accordion.Header id="headingOne">
                                                    <i className="ri-global-line me-2"></i> How Does Age Verification Work?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    Increase or decrease the letter spacing depending on the situation and try, try again until it looks right, and each assumenda labore aes Homo nostrud organic, assumenda labore aesthetic magna elements, buttons, everything.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='8'>
                                                <Accordion.Header id="headingTwo">
                                                    <i className="ri-user-location-line me-2"></i> How Does Link Tracking Work?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='9'>
                                                <Accordion.Header id="headingThree">
                                                    <i className="ri-pen-nib-line me-2"></i> How Do I Set Up the Drip Feature?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis aliquam ultrices mauris.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <IconAccordionExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Accordions without Icons" />
                                <Card.Body>
                                    <p className="text-muted">Use <code>accordion-icon-none</code> class to remove icon at accordion.</p>
                                    <div className="live-preview">

                                        <Accordion className="accordion-icon-none" defaultActiveKey="10">
                                            <Accordion.Item eventKey='10'>
                                                <Accordion.Header>
                                                    <i className="ri-global-line me-2"></i> How Does Age Verification Work?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    Each design is a new, unique piece of art birthed into this world, and while you have the opportunity to be creative and make your own style choices. For that very reason, I went on a quest and spoke to many different professional graphic designers.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='11'>
                                                <Accordion.Header>
                                                    <i className="ri-user-location-line me-2"></i> How Does Link Tracking Work?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='12'>
                                                <Accordion.Header>
                                                    <i className="ri-pen-nib-line me-2"></i> How Do I Set Up the Drip Feature?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis aliquam ultrices mauris.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <WithIconAccordionExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xl={12}>
                            <Card>

                                <PreviewCardHeader title="Accordions with Plus Icon" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>custom-accordionwithicon-plus</code> class to show plus icon at the accordion.</p>
                                    <div className="live-preview">

                                        <Accordion className="custom-accordionwithicon-plus" id="accordionWithplusicon" defaultActiveKey="14">
                                            <Accordion.Item eventKey='14'>
                                                <Accordion.Header>
                                                    What is User Interface Design?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    Big July earthquakes confound zany experimental vow. My girl wove six dozen plaid jackets before she quit. Six big devils from Japan quickly forgot how to waltz. try again until it looks right, and each assumenda labore aes Homo nostrud organic, assumenda labore aesthetic magna elements, buttons, everything.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='14'>
                                                <Accordion.Header>
                                                    What is Digital Marketing?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    It makes a statement, it’s impressive graphic design. Increase or decrease the letter spacing depending on the situation and try, try again until it looks right, and each letter has the perfect spot of its own. commodo enim craft beer mlkshk aliquip jean shorts ullamco.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='15'>
                                                <Accordion.Header>
                                                    Where does it come from ?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    Spacing depending on the situation and try, try again until it looks right, and each. next level wes anderson artisan four loko farm-to-table craft beer twee. commodo enim craft beer mlkshk aliquip jean shorts ullamco. omo nostrud organic, assumenda labore aesthetic magna delectus. pposites attract, and that’s a fact.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <PlusIconAccordionExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>

                    <Row>
                        <Col xxl={6}>
                            <Card>

                                <PreviewCardHeader title="Left Icon Accordions" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>lefticon-accordion</code> class to show the icon on the left side of the accordion.</p>
                                    <div className="live-preview">
                                        <Accordion className="lefticon-accordion custom-accordionwithicon accordion-border-box" id="accordionlefticon" defaultActiveKey='16'>
                                            <Accordion.Item eventKey='16'>
                                                <Accordion.Header>
                                                    What is User Interface Design?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua nulla assumenda shoreditch et.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='17'>
                                                <Accordion.Header>
                                                    What is Digital Marketing?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='18'>
                                                <Accordion.Header>
                                                    Where does it come from ?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis aliquam ultrices mauris.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <LeftIconAccordionExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xxl={6}>
                            <Card>

                                <PreviewCardHeader title="Accordions Bordered" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>custom-accordion-border</code> class to create the border at the accordion.</p>
                                    <div className="live-preview">

                                        <Accordion className="custom-accordionwithicon custom-accordion-border accordion-border-box accordion-success" id="accordionBordered" defaultActiveKey="19">
                                            <Accordion.Item eventKey='19'>
                                                <Accordion.Header>
                                                    What is User Interface Design?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua nulla assumenda shoreditch et.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='20'>
                                                <Accordion.Header>
                                                    What is Digital Marketing?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='21'>
                                                <Accordion.Header>
                                                    Where does it come from ?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis aliquam ultrices mauris.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <BorderedAccordionExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={12}>
                            <Card>

                                <PreviewCardHeader title="Nesting Accordions" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>nesting-accordion</code> class to create a nesting accordion.</p>
                                    <div className="live-preview">

                                        <Accordion className="custom-accordionwithicon accordion-border-box" id="accordionnesting" defaultActiveKey="22">
                                            <Accordion.Item eventKey='22'>
                                                <Accordion.Header>
                                                    How Do I Add Contacts/Subscribers?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    This opt in method is perfect for those looking to integrate a different software such Shopify or Hubspot with Slicktext. For example, upon cashing out online, a subscriber may submit to have their mobile number to receive marketing messages. The API will pass this information from said software over to Slicktext via API integration.
                                                    <Accordion defaultActiveKey="23" className="nesting2-accordion custom-accordionwithicon accordion-border-box mt-3" id="accordionnesting2">
                                                        <Accordion.Item eventKey='23'>
                                                            <Accordion.Header>
                                                                How Do I Search For Contacts?
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                When you are in need of finding a specific subscriber, you will want to use the help of SlickText's search navigation tool, located under the Contacts tab of your Slicktext account. Once here, you will have options to sort by, filter, and search your contacts.
                                                                <Accordion defaultActiveKey="24" className="nesting4-accordion custom-accordionwithicon accordion-border-box mt-3" id="accordionnesting4">
                                                                    <Accordion.Item eventKey='24'>
                                                                        <Accordion.Header id="accordionnesting4Example2">
                                                                            How do I reset my digital tide watch ?
                                                                        </Accordion.Header>
                                                                        <Accordion.Body>
                                                                            Opting out a subscriber will allow SlickText to maintain the history of the subscriber as it pertains to the textword you are opting them out of. If this user was to text to join again, the initial text they are met with will be a "welcome back" message instead of the auto reply.
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>
                                                                </Accordion>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey='25'>
                                                            <Accordion.Header id="accordionnesting2Example2">
                                                                How Do I Delete a Contact From My List?
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                Opting out a subscriber will allow SlickText to maintain the history of the subscriber as it pertains to the textword you are opting them out of. If this user was to text to join again, the initial text they are met with will be a "welcome back" message instead of the auto reply.
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='26'>
                                                <Accordion.Header>
                                                    How Does Personalization Work?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    Personalization allows you to provide a personal touch to your outbound text marketing campaigns. SlickText uses merge tags as placeholders that are replaced with contact-specific information when a text message is sent. These merge tags may also be known as personalization fields.
                                                    <Accordion defaultActiveKey="27" className="nesting3-accordion custom-accordionwithicon accordion-border-box mt-3" id="accordionnesting3">
                                                        <Accordion.Item eventKey='27' className="mt-2">
                                                            <Accordion.Header id="accordionnesting4Example2">
                                                                Howe does temperature impact my watch?
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                Opting out a subscriber will allow SlickText to maintain the history of the subscriber as it pertains to the textword you are opting them out of. If this user was to text to join again, the initial text they are met with will be a "welcome back" message instead of the auto reply.
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey='28'>
                                                <Accordion.Header>
                                                    What Happens When I Run Out of Messages?
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    When you run out of messages, you will not be able to send any outbound campaigns. This would include any scheduled messages, drip campaigns, and birthday messages. However, we will continue to deliver your auto-reply messages to allow your subscriber list to continue to grow.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <NestingAccordionExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={12}>
                            <Card>

                                <PreviewCardHeader title="Accordions Fill Colored" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>accordion-fill-</code> class with modifier class to the color accordion.</p>
                                    <div className="live-preview">
                                        <Row>
                                            <Col xxl={6}>
                                                <Accordion className="custom-accordionwithicon accordion-fill-success" id="accordionFill" defaultActiveKey="29">
                                                    <Accordion.Item eventKey='29'>
                                                        <Accordion.Header>
                                                            What are webhooks?
                                                        </Accordion.Header>
                                                        <Accordion.Body>
                                                            Webhooks allow you to gather real time data on key interactions that happen with your Slick Text account. Simply provide us with a url where you'd like the data to be sent, choose which events you'd like to be informed of, and click save.                                                            </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item eventKey='30'>
                                                        <Accordion.Header>
                                                            Where can I find my Textword ID?
                                                        </Accordion.Header>
                                                        <Accordion.Body>
                                                            Head over to the Textwords page. Click options on the right hand side, and then click Settings. This will redirect you to your Textword Setting page. Now, go check your url, and the textword ID will be the number after "word=". Too much or too little spacing, as in the example below.
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item eventKey='31'>
                                                        <Accordion.Header>
                                                            Where is your API documentation?
                                                        </Accordion.Header>
                                                        <Accordion.Body>
                                                            You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you’re working with reputable font websites.
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </Col>
                                            <Col xxl={6}>

                                                <Accordion className="custom-accordionwithicon accordion-flush accordion-fill-secondary" id="accordionFill2" defaultActiveKey="32">
                                                    <Accordion.Item eventKey='32'>
                                                        <Accordion.Header>
                                                            How Does Age Verification Work?
                                                        </Accordion.Header>
                                                        <Accordion.Body>
                                                            Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR.
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item eventKey='33'>
                                                        <Accordion.Header>
                                                            What Kind of List Growth Should I Expect?
                                                        </Accordion.Header>
                                                        <Accordion.Body>
                                                            Consistency is the one thing that can take all of the different elements in your design, and tie them all together and make them work. In an awareness campaign, it is vital for people to begin put 2 and 2 together and begin to recognize your cause. Consistency piques people’s interest.
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item eventKey='34'>
                                                        <Accordion.Header>
                                                            How Do I Delete a Contact From My List?
                                                        </Accordion.Header>
                                                        <Accordion.Body>
                                                            Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis aliquam ultrices mauris.                                                            </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <FillColoredAccordionExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xxl={6}>
                            <Card>

                                <PreviewCardHeader title="Collapse Example" />

                                <Card.Body>
                                    <div className="live-preview">
                                        <div className="d-flex gap-2 flex-wrap mb-3">
                                           <Button variant="link" className='btn btn-primary text-white' href="#collapseExample" aria-expanded={open} onClick={() => setOpen(!open)}>
                                            Link with href
                                        </Button>
                                        <Button variant="primary" type="button" aria-expanded={open} onClick={() => setOpen(!open)}>
                                            Button with data-bs-target
                                        </Button>
                                        </div>
                                        <Collapse in={open} >
                                            <Card className="mb-0">
                                                <Card.Body>
                                                    When designing, the goal is to draw someone’s attention and portray to them what you’re trying to say. You can make a big statement by using little tricks, like this one. Use contrasting fonts. you can use a bold sanserif font with a cursive.
                                                </Card.Body>
                                            </Card>
                                        </Collapse>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <CollapseExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xxl={6}>
                            <Card>

                                <PreviewCardHeader title="Horizontal Collapse" />

                                <Card.Body>
                                    <div className="live-preview">
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
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <HorizontalCollapseExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xxl={6}>
                            <Card>

                                <PreviewCardHeader title="Collapse with Icon" />

                                <Card.Body>
                                    <p className="text-muted">
                                        Here is the example of collapse in which the icon is wrapped within the button collapse toggle.
                                    </p>
                                    <div className="live-preview">

                                    <div className="hstack gap-3 mb-3">
                                        <Button variant='link' className="link-success" type='button' onClick={() => setCollapseWithicon(!collapseWithicon)}>
                                            <i className="ri-arrow-down-circle-line fs-lg"></i>
                                        </Button>
                                        <Button variant="light" type="button" onClick={() => setCollapseWithicon2(!collapseWithicon2)}>
                                            <i className="ri-filter-2-line"></i>
                                        </Button>
                                    </div>
                                        <Collapse in={collapseWithicon}>
                                            <Card className="mb-0">
                                                <Card.Body>
                                                    If you enter text including symbols in the search criteria, the search criteria is interpreted exactly as you entered it, and the search is case sensitive as a case insensitive search that contains certain text but does also provide a lot of search criteria options.
                                                </Card.Body>
                                            </Card>
                                        </Collapse>
                                        <Collapse in={collapseWithicon2}>
                                            <Card className="mb-0 mt-3">
                                                <Card.Body>
                                                    When you want to search for data, such as customer names, addresses, or product groups, you enter criteria. In search criteria you can use all the numbers and letters that you normally use in the specific field. In addition, you can use special symbols to further filter the results.
                                                </Card.Body>
                                            </Card>
                                        </Collapse>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <IconCollapseExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xxl={6}>
                            <Card>

                                <PreviewCardHeader title="Inline & Block Element Collapse" />

                                <Card.Body>
                                    <p className="text-muted">Inline element collapse takes all horizontal space hence you can activate the collapse within by clicking on
                                        full-width horizontal space. Block element collapse can be activated by clicking on collapse toggle only.</p>
                                    <div className="live-preview">

                                        <div className="mb-3">
                                        <h6 className="text-primary" aria-controls="collapseblock" onClick={() => setCollapseblock(!collapseblock)}>
                                            <code>&lt;h6&gt;</code> Inline Element Collapse
                                        </h6>
                                        <span role="button" className="text-primary fw-medium" aria-expanded={collapseinline} aria-controls="collapseinline" onClick={() => setCollapseinline(!collapseinline)}>
                                            <code>&lt;span&gt;</code> Block Element Collapse
                                        </span>

                                        </div>
                                        <Row className="g-2">
                                            <Col className="col-auto">
                                            <Collapse dimension="width" in={collapseblock}>
                                                <div id="collapseblock">
                                                    <Card className="card-body mb-0" style={{ width: "300px" }}>
                                                        A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring heart.
                                                    </Card>
                                                </div>
                                            </Collapse>
                                            </Col>
                                            <Col className="col-auto">
                                            <Collapse dimension="width" in={collapseinline}>
                                                <div id="collapseinline">
                                                    <Card className="card-body mb-0" style={{ width: "300px" }}>
                                                        When you have created a new account schedule and set up the rows, you must set up columns.
                                                    </Card>
                                                </div>
                                            </Collapse>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <InlineBLockCollapseExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Multiple Targets Collapse" />
                                <Card.Body>
                                    <p className="text-muted">
                                        A <code>&lt;button&gt;</code> or <code>&lt;a&gt;</code> can show and hide multiple elements by referencing them with a selector in its href or data-bs-target attribute. Multiple <code>&lt;button&gt;</code> or <code>&lt;a&gt;</code> can
                                        show and hide an element if they each reference it with their href or data-bs-target attribute.
                                    </p>
                                    <div className="live-preview">

                                        <div className="d-flex gap-2 flex-wrap mb-3">
                                        <a className="btn btn-primary" href="#multiCollapseExample1" onClick={() => setMultiCollapseExample1(!multiCollapseExample1)}>Toggle First Element</a>
                                        <Button variant="primary" onClick={() => setMultiCollapseExample2(!multiCollapseExample2)}>Toggle Second Element</Button>
                                        <Button variant="primary" onClick={() => { setMultiCollapseExample1(!multiCollapseExample1); setMultiCollapseExample2(!multiCollapseExample2) }}>Toggle Both Elements</Button>
                                        </div>
                                        <Row>
                                            <Col>
                                            <Collapse className="multi-collapse" in={multiCollapseExample1} >
                                                <div id="multiCollapseExample1">
                                                    <Card className="card-body mb-0">
                                                        Some placeholder content for the first collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
                                                    </Card>
                                                </div>
                                            </Collapse>
                                            </Col>
                                            <Col>
                                            <Collapse className="multi-collapse" in={multiCollapseExample2} >
                                                <div id="multiCollapseExample2">
                                                    <Card className="card-body mb-0">
                                                        Some placeholder content for the second collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
                                                    </Card>
                                                </div>
                                            </Collapse>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <MultipleTargetCollapseExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment >
    );
};
UiAccordions.layout = (page:any) => <Layout children={page}/>
export default UiAccordions;
