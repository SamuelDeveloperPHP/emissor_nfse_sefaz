import React, { useState } from 'react';
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';

// Import Content
import UiContent from '../../../Components/Common/UiContent';

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';

// Import Code Components
import { DefaultAlertsExample, BorderlessExample, DismissingExample, LinkColorExample, LiveExample, OutlineAlertsExample, LeftBorderAlertsExample, LabelIconAlertsExample, TopBarAlertsExample, LabelIconArrowAlertsExample, RoundedLabelIconAlertsExample, AdditionalContentAlertsExample, SolidAlertsExample } from './UiAlertsCode';
import { Head, Link } from '@inertiajs/react';
import Layout from '../../../Layouts';

interface AlertProps {
    variant: string,
    name: string,
    discription: string
}

const UiAlerts = () => {
    const [liveAlertPlaceholder, setLiveAlertPlaceholder] = useState<boolean>(false);
    const alert: AlertProps[] = [
        { variant: "primary", name: "Primary", discription: ` <strong> Hi! </strong> A simple <b>Dismissible Primary alert</b> —check it out!` },
        { variant: "secondary", name: "Secondary", discription: ` <strong> How are you! </strong> A simple <b>Dismissible secondary alert</b> —check it out!`, },
        { variant: "success", name: "Success", discription: `<strong> Yey! Everything worked! </strong> A simple <b>Dismissible success alert</b> —check it out!` },
        { variant: "danger", name: "Danger", discription: ` <strong> Something is very wrong! </strong> A simple <b>Dismissible danger alert</b> —check it out!` },
        { variant: "warning", name: "Warning", discription: ` <strong> Uh oh, something went wrong </strong> A simple <b>Dismissible warning alert</b> —check it out!` },
        { variant: "info", name: "Info", discription: ` <strong>Don't forget' it !</strong> A simple <b>Dismissible info alert</b> —check it out!` },
        { variant: "light", name: "Light", discription: `<strong>Mind Your Step!</strong> A simple <b>Dismissible light alert</b> —check it out!` },
        { variant: "dark", name: "Dark", discription: ` <strong>Did you know?</strong> A simple <b>Dismissible dark alert</b> —check it out!` },
    ];
    return (
        <React.Fragment>
            <Head title='Alerts | Velzon - React Admin & Dashboard Template' />
            <UiContent />
            <div className="page-content">
                <Container fluid={true}>
                    <BreadCrumb title="Alerts" pageTitle="Base UI" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Default Alerts" />
                                <Card.Body>
                                    <p className="text-muted">Use the <code>Alert</code> tag to show a default alert.</p>
                                    <div className="live-preview">
                                        <Row>
                                            <Col xl={6}>
                                                <h6>Primary Alert</h6>
                                                <Alert variant="primary">
                                                    <strong> Hi! </strong> A simple <b>Primary alert</b> —check it out!
                                                </Alert>

                                                <h6>Secondary Alert</h6>
                                                <Alert variant="secondary">
                                                    <strong> How are you! </strong> A simple <b>secondary alert</b> —check it out!
                                                </Alert>

                                                <h6>Success Alert</h6>
                                                <Alert variant="success">
                                                    <strong> Yey! Everything worked! </strong> A simple <b>success alert</b> —check it out!
                                                </Alert>

                                                <h6>Danger Alert</h6>
                                                <Alert variant="danger" className='mb-0'>
                                                    <strong> Something is very wrong! </strong> A simple <b>danger alert</b> —check it out!
                                                </Alert>
                                            </Col>

                                            <Col xl={6}>
                                                <h6>Warning Alert</h6>
                                                <Alert variant="warning">
                                                    <strong> Uh oh, something went wrong </strong> A simple <b>warning alert</b> —check it out!
                                                </Alert>

                                                <h6>Info Alert</h6>
                                                <Alert variant="info">
                                                    <strong>Don't forget' it !</strong> A simple <b>info alert</b> —check it out!
                                                </Alert>

                                                <h6>Light Alert</h6>
                                                <Alert variant="light">
                                                    <strong>Mind Your Step!</strong> A simple <b>light alert</b> —check it out!
                                                </Alert>

                                                <h6>Dark Alert</h6>
                                                <Alert variant="dark" className='mb-0'>
                                                    <strong>Did you know?</strong> A simple <b>dark alert</b> —check it out!
                                                </Alert>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "352px" }}>
                                            <code>
                                                <DefaultAlertsExample />
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
                                <PreviewCardHeader title="Borderless Alerts" />

                                <Card.Body>
                                    <p className="text-muted">Use the <code>border-0</code> class to set alert without border.</p>

                                    <div className="live-preview">
                                        <Row>
                                            <Col xl={6}>
                                                <h6>Primary Alert</h6>
                                                <Alert variant="primary" className='border-0 border-0'>
                                                    <strong> Hi! </strong> A simple <b>Primary alert</b> —check it out!
                                                </Alert>

                                                <h6>Secondary Alert</h6>
                                                <Alert variant="secondary" className='border-0 border-0'>
                                                    <strong> How are you! </strong> A simple <b>secondary alert</b> —check it out!
                                                </Alert>

                                                <h6>Success Alert</h6>
                                                <Alert variant="success" className='border-0 border-0'>
                                                    <strong> Yey! Everything worked! </strong> A simple <b>success alert</b> —check it out!
                                                </Alert>

                                                <h6>Danger Alert</h6>
                                                <Alert variant="danger" className='border-0 border-0 mb-xl-0'>
                                                    <strong> Something is very wrong! </strong> A simple danger alert—check it out!
                                                </Alert>

                                            </Col>

                                            <Col xl={6}>
                                                <h6>Warning Alert</h6>
                                                <Alert variant="warning" className='border-0 border-0'>
                                                    <strong> Uh oh, something went wrong </strong> A simple <b>warning alert</b> —check it out!
                                                </Alert>

                                                <h6>Info Alert</h6>
                                                <Alert variant="info" className='border-0 border-0'>
                                                    <strong>Don't forget' it !</strong> A simple <b>info alert</b> —check it out!
                                                </Alert>

                                                <h6>Light Alert</h6>
                                                <Alert variant="light" className='border-0 border-0 bg-light'>
                                                    <strong>Mind Your Step!</strong> A simple <b>light alert</b> —check it out!
                                                </Alert>

                                                <h6>Dark Alert</h6>
                                                <Alert variant="dark" className='border-0 border-0 mb-0'>
                                                    <strong>Did you know?</strong> A simple <b>dark alert</b> —check it out!
                                                </Alert>

                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "352px" }}>
                                            <code>
                                                <BorderlessExample />
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
                                <PreviewCardHeader title="Dismissing Alerts" />
                                <Card.Body>
                                    <p className="text-muted">Use the <code>UncontrolledAlert</code> tag to add dismissing button to the alert.
                                    </p>
                                    <div className="live-preview">

                                        <Row>
                                            <Col xl={6}>
                                                {(alert || []).slice(0, 4).map((value: AlertProps, inx: number) => (
                                                    <React.Fragment key={inx}>
                                                        <h6>{value.name} Alert</h6>
                                                        <Alert key={inx} variant={value.variant} role="alert" dismissible>
                                                            <div dangerouslySetInnerHTML={{ __html: value.discription }} />
                                                            {/* <button type="button" className="btn-close" onClick={(e) => removeAlert(e.target)} /> */}
                                                        </Alert>
                                                    </React.Fragment>
                                                ))}
                                            </Col>

                                            <Col xl={6}>
                                                {(alert || []).slice(4, 8).map((value: AlertProps, inx: number) => (
                                                    <React.Fragment key={inx}>
                                                        <h6>{value.name} Alert</h6>
                                                        <Alert key={inx} variant={value.variant} role="alert" dismissible>
                                                            <div dangerouslySetInnerHTML={{ __html: value.discription }} />
                                                            {/* <button type="button" className="btn-close" onClick={(e) => removeAlert(e.target)} /> */}
                                                        </Alert>
                                                    </React.Fragment>
                                                ))} 
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "352px" }}>
                                            <code>
                                                <DismissingExample />
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
                                <PreviewCardHeader title="Link Color Alerts" />
                                <Card.Body>
                                    <p className="text-muted">Use the <code>alert-link</code> class at &lt;a&gt; tag to show matching colored links within the given alert.</p>

                                    <div className="live-preview">
                                        <Row>
                                            <Col xl={6}>
                                                <h6>Primary Alert</h6>

                                                <Alert variant="primary">
                                                    A simple Primary alert with <Link href="#" className="alert-link">an example
                                                        link</Link>. Give it a click if you like.
                                                </Alert>

                                                <h6>Secondary Alert</h6>
                                                <Alert variant="secondary">
                                                    A simple Secondary alert with <Link href="#" className="alert-link">an example
                                                        link</Link>.  Give it a click if you like.
                                                </Alert>

                                                <h6>Success Alert</h6>
                                                <Alert variant="success">
                                                    A simple Success alert with <Link href="#" className="alert-link">an example
                                                        link</Link>. Give it a click if you like.
                                                </Alert>

                                                <h6>Danger Alert</h6>
                                                <Alert variant="danger" className="mb-xl-0">
                                                    A simple Danger alert with <Link href="#" className="alert-link">an example
                                                        link</Link>. Give it a click if you like.
                                                </Alert>
                                            </Col>

                                            <Col xl={6}>
                                                <h6>Warning Alert</h6>
                                                <Alert variant="warning">
                                                    A simple Warning alert with <Link href="#" className="alert-link">an example
                                                        link</Link>. Give  it a click if you like.
                                                </Alert>

                                                <h6>Info Alert</h6>
                                                <Alert variant="info">
                                                    A simple Info alert with <Link href="#" className="alert-link">an example
                                                        link</Link>. Give it  a click if you like.
                                                </Alert>

                                                <h6>Light Alert</h6>
                                                <Alert variant="light">
                                                    A simple Light alert with <Link href="#" className="alert-link">an example
                                                        link</Link>. Give it a click if you like.
                                                </Alert>

                                                <h6>Dark Alert</h6>
                                                <Alert variant="dark" className="mb-0">
                                                    A simple Dark alert with <Link href="#" className="alert-link">an example
                                                        link</Link>. Give it a click if you like.
                                                </Alert>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup lang-jsx" style={{ maxHeight: "260px" }}>
                                            <code>
                                                <LinkColorExample />
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
                                <PreviewCardHeader title="Live Alert Example" />
                                <Card.Body>
                                    <p className="text-muted">Click the Show live alert button to show an alert on button click.</p>
                                    <div className="live-preview">
                                        <div id="liveAlertPlaceholder">
                                            <Alert show={liveAlertPlaceholder} variant="success" onClose={() => setLiveAlertPlaceholder(!liveAlertPlaceholder)} dismissible>
                                                Nice, you triggered this alert message!
                                            </Alert>
                                            <Button type="button" variant="primary" id="liveAlertBtn" onClick={() => setLiveAlertPlaceholder(!liveAlertPlaceholder)}>Show live alert</Button>
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup language-jsx" style={{ maxHeight: "260px" }}>
                                            <code>
                                                <LiveExample />
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
                                <PreviewCardHeader title="Outline Alerts" />
                                <Card.Body>
                                    <p className="text-muted">Use the <code>border-2 bg-body-secondary</code>  class to set an alert with outline.</p>

                                    <div className="live-preview">
                                        <Row>
                                            <Col xl={6}>
                                            <h6>Primary Outline Alert</h6>
                                            <Alert variant="primary" className="bg-body-secondary" role="alert" dismissible>
                                                <strong> Hi! </strong> - Outline <b>primary alert</b> example
                                            </Alert>

                                            <h6>Secondary Outline Alert</h6>
                                            <Alert variant="secondary"  className="bg-body-secondary" role="alert" dismissible>
                                                <strong> How are you! </strong> - Outline <b>secondary alert</b> example
                                            </Alert>

                                            <h6>Success Outline Alert</h6>
                                            <Alert variant="success" className="bg-body-secondary" role="alert" dismissible>
                                                <strong> Yey! Everything worked! </strong> - Outline <b>success alert</b> example
                                            </Alert>

                                            <h6>Danger Outline Alert</h6>
                                            <Alert variant="danger" className="bg-body-secondary mb-xl-0" role="alert" dismissible>
                                                <strong> Something is very wrong! </strong> - Outline <b>danger alert</b> example
                                            </Alert>

                                            </Col>

                                            <Col xl={6}>
                                            <h6>Warning Outline Alert</h6>
                                            <Alert variant="warning" className="bg-body-secondary" role="alert" dismissible>
                                                <strong> Uh oh, something went wrong! </strong> - Outline <b>warning alert</b> example
                                            </Alert>

                                            <h6>Info Outline Alert</h6>
                                            <Alert variant="info" className="bg-body-secondary" role="alert" dismissible>
                                                <strong>Don't forget' it !</strong> - Outline <b>info alert</b> example
                                            </Alert>

                                            <h6>Dark Alert</h6>
                                            <Alert variant="dark" className="text-body bg-body-secondary mb-0" role="alert" dismissible>
                                                <strong>Did you know?</strong> - Outline <b>dark alert</b> example
                                            </Alert>

                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup lang-jsx" style={{ maxHeight: "260px" }}>
                                            <code>
                                                <OutlineAlertsExample />
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
                                <PreviewCardHeader title="Left Border Alerts" />
                                <Card.Body>
                                    <p className="text-muted">Use the <code>alert-border-left </code> class to set an alert with the left border.</p>

                                    <div className="live-preview">
                                        <Row>
                                            <Col xl={6}>
                                            <h6>Primary Alert</h6>
                                            <Alert variant="primary" className="alert-border-left" role="alert" dismissible>
                                                <i className="ri-user-smile-line me-3 align-middle fs-lg"></i>
                                                <strong> Primary </strong>- Left border alert
                                            </Alert>

                                            <h6>Secondary Alert</h6>
                                            <Alert variant="secondary" className="alert-border-left" role="alert" dismissible>
                                                <i className="ri-check-double-line me-3 align-middle fs-lg"></i><strong>Secondary</strong> - Left border alert
                                            </Alert>

                                            <h6>Success Alert</h6>
                                            <Alert variant="success" className="alert-border-left" role="alert" dismissible>
                                                <i className="ri-notification-off-line me-3 align-middle fs-lg"></i><strong>Success</strong> - Left border alert
                                            </Alert>

                                            <h6>Danger Alert</h6>
                                            <Alert variant="danger" className="alert-border-left mb-xl-0" role="alert" dismissible>
                                                <i className="ri-error-warning-line me-3 align-middle fs-lg"></i><strong>Danger</strong> - Left border alert
                                            </Alert>

                                            </Col>

                                            <Col xl={6}>
                                            <h6>Warning Alert</h6>
                                            <Alert variant="warning" className="alert-border-left" role="alert" dismissible>
                                                <i className="ri-alert-line me-3 align-middle fs-lg"></i><strong>Warning</strong> - Left border alert
                                            </Alert>

                                            <h6>Info Alert</h6>
                                            <Alert variant="info" className="alert-border-left" role="alert" dismissible>
                                                <i className="ri-airplay-line me-3 align-middle fs-lg"></i><strong>Info</strong> - Left border alert
                                            </Alert>

                                            <h6>Light Alert</h6>
                                            <Alert variant="light" className="alert-border-left" role="alert" dismissible>
                                                <i className="ri-mail-line me-3 align-middle fs-lg"></i><strong>Light</strong> - Left border alert
                                            </Alert>

                                            <h6>Dark Alert</h6>
                                            <Alert variant="dark" className="text-body alert-border-left mb-0" role="alert" dismissible>
                                                <i className="ri-refresh-line me-3 align-middle fs-lg"></i><strong>Dark</strong> - Left border alert
                                            </Alert>

                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup lang-jsx" style={{ maxHeight: "260px" }}>
                                            <code>
                                                <LeftBorderAlertsExample />
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
                                <PreviewCardHeader title="Label Icon Alerts" />
                                <Card.Body>
                                    <p className="text-muted">Use the <code>alert-label-icon</code> class to set an alert with a label icon.</p>
                                    <div className="live-preview">
                                        <Row>
                                            <Col xl={6}>
                                            <h6>Primary Alert</h6>
                                            <Alert variant="primary" className="text-white bg-primary alert-label-icon" role="alert" closeVariant="white" dismissible>
                                                <i className="ri-user-smile-line label-icon"></i><strong>Primary</strong> - Label icon alert
                                            </Alert>

                                            <h6>Secondary Alert</h6>
                                            <Alert variant="secondary" className="text-white bg-secondary alert-label-icon" role="alert" closeVariant="white" dismissible>
                                                <i className="ri-check-double-line label-icon"></i><strong>Secondary</strong> - Label icon alert
                                            </Alert>

                                            <h6>Success Alert</h6>
                                            <Alert variant="success" className="text-white bg-success alert-label-icon" role="alert" closeVariant="white" dismissible>
                                                <i className="ri-notification-off-line label-icon"></i><strong>Success</strong> - Label icon alert
                                            </Alert>

                                            <h6>Danger Alert</h6>
                                            <Alert variant="danger" className="text-white bg-danger alert-label-icon mb-xl-0" role="alert" closeVariant="white" dismissible>
                                                <i className="ri-error-warning-line label-icon"></i><strong>Danger</strong> - Label icon alert
                                            </Alert>
                                            </Col>

                                            <Col xl={6}>
                                            <h6>Warning Alert</h6>
                                            <Alert variant="warning" className="text-white bg-warning alert-label-icon" role="alert" closeVariant="white" dismissible>
                                                <i className="ri-alert-line label-icon"></i><strong>Warning</strong> - Label icon alert
                                            </Alert>

                                            <h6>Info Alert</h6>
                                            <Alert variant="info" className="text-white bg-info alert-label-icon" role="alert" closeVariant="white" dismissible>
                                                <i className="ri-airplay-line label-icon"></i><strong>Info</strong> - Label icon alert
                                            </Alert>

                                            <h6>Light Alert</h6>
                                            <Alert variant="light" className="text-body bg-light alert-label-icon" role="alert" closeVariant="white" dismissible>
                                                <i className="ri-mail-line label-icon"></i><strong>Light</strong> - Label icon alert
                                            </Alert>

                                            <h6>Dark Alert</h6>
                                            <Alert variant="dark" className="text-white bg-dark alert-label-icon mb-0" role="alert" closeVariant="white" dismissible>
                                                <i className="ri-refresh-line label-icon"></i><strong>Dark</strong> - Label icon alert
                                            </Alert>

                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup lang-jsx" style={{ maxHeight: "260px" }}>
                                            <code>
                                                <LabelIconAlertsExample />
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
                                <PreviewCardHeader title="Additional Content Alerts" />
                                <Card.Body>
                                    <p className="text-muted">Use the <code>alert-additional</code> class and Use the <code>alert-</code> class to HTML elements like headings, paragraphs, dividers etc.</p>
                                    <div className="live-preview">
                                        <Row>
                                            <Col xl={6}>
                                                <h6>Primary Alert</h6>

                                                <Alert variant="primary" className="alert-additional" role="alert" dismissible>
                                                <div className="alert-body">
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0 me-3">
                                                            <i className="ri-error-warning-line fs-lg align-middle"></i>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <Alert.Heading as="h5">Well done !</Alert.Heading>
                                                            <p className="mb-0">Aww yeah, you successfully read this important alert message. </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="alert-content">
                                                    <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
                                                </div>
                                            </Alert>

                                                <h6>Danger Alert</h6>
                                                <Alert variant="danger" className="alert-additional mb-xl-0" role="alert" dismissible>
                                                <div className="alert-body">
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0 me-3">
                                                            <i className="ri-alert-line fs-lg align-middle"></i>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <Alert.Heading as="h5">Something is very wrong!</Alert.Heading>
                                                            <p className="mb-0">Change a few things up and try submitting again.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="alert-content">
                                                    <p className="mb-0">Whenever you need to, be sure to use margin
                                                        utilities to keep things nice and tidy.</p>
                                                </div>
                                            </Alert>
                                            </Col>

                                            <Col xl={6}>

                                                <h6>Success Alert</h6>
                                                <Alert variant="success" role="alert" className="alert-additional" dismissible>
                                                <div className="alert-body">
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0 me-3">
                                                            <i className="ri-notification-off-line fs-lg align-middle"></i>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <Alert.Heading as="h5">Yey! Everything worked!</Alert.Heading>
                                                            <p className="mb-0">This alert needs your attention, but it's not super important.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="alert-content">
                                                    <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
                                                </div>
                                            </Alert>

                                                <h6>Warning Alert</h6>
                                                <Alert variant="warning" className="alert-additional mb-0" role="alert" dismissible>
                                                <div className="alert-body">
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0 me-3">
                                                            <i className="ri-alert-line fs-lg align-middle"></i>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <Alert.Heading as="h5">Uh oh, something went wrong!</Alert.Heading>
                                                            <p className="mb-0">Better check yourself, you're not looking too good.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="alert-content">
                                                    <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
                                                </div>
                                            </Alert>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup lang-jsx" style={{ maxHeight: "260px" }}>
                                            <code>
                                                <AdditionalContentAlertsExample />
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
                                <PreviewCardHeader title="Top Border with Outline Alerts" />
                                <Card.Body>
                                    <p className="text-muted">Use the <code>alert-top-border</code> class to set an alert with the top border and outline.</p>
                                    <div className="live-preview">
                                        <Row>
                                            <Col xl={6}>
                                            <h6>Primary Alert</h6>
                                            <Alert variant="primary" className="alert-top-border" role="alert" dismissible>
                                                <i className="me-3 align-middle fs-lg text-primary ri-user-smile-line label-icon"></i><strong>Primary</strong> - Top border alert
                                            </Alert>

                                            <h6>Secondary Alert</h6>
                                            <Alert variant="secondary" className="alert-top-border" role="alert" dismissible>
                                                <i className="me-3 align-middle fs-lg text-secondary ri-check-double-line label-icon"></i><strong>Secondary</strong> - Top border alert
                                            </Alert>

                                            <h6>Success Alert</h6>
                                            <Alert variant="success" className="alert-top-border" role="alert" dismissible>
                                                <i className="me-3 align-middle fs-lg text-success ri-notification-off-line label-icon"></i><strong>Success</strong> - Top border alert
                                            </Alert>

                                            <h6>Danger Alert</h6>
                                            <Alert variant="danger" className="alert-top-border mb-xl-0" role="alert" dismissible>
                                                <i className="me-3 align-middle fs-lg text-danger ri-error-warning-line label-icon"></i><strong>Danger</strong> - Top border alert
                                            </Alert>

                                            </Col>

                                            <Col xl={6}>
                                            <h6>Warning Alert</h6>
                                            <Alert variant="warning" className="alert-top-border" role="alert" dismissible>
                                                <i className="me-3 align-middle fs-lg text-warning ri-alert-line label-icon"></i><strong>Warning</strong> - Top border alert
                                            </Alert>

                                            <h6>Info Alert</h6>
                                            <Alert variant="info" className="alert-top-border" role="alert" dismissible>
                                                <i className="me-3 align-middle fs-lg text-info ri-airplay-line label-icon"></i><strong>Info</strong> - Top border alert
                                            </Alert>

                                            <h6>Light Alert</h6>
                                            <Alert variant="light" className="alert-top-border" role="alert" dismissible>
                                                <i className="ri-mail-line me-3 align-middle fs-lg text-dark"></i><strong>Light</strong> - Top border alert
                                            </Alert>

                                            <h6>Dark Alert</h6>
                                            <Alert variant="dark" className="alert-top-border mb-0" role="alert" dismissible>
                                                <i className="me-3 align-middle fs-lg text-dark ri-refresh-line label-icon"></i><strong>Dark</strong> - Top border alert
                                            </Alert>

                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup lang-jsx" style={{ maxHeight: "260px" }}>
                                            <code>
                                                <TopBarAlertsExample />
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
                                <PreviewCardHeader title="Label Icon Arrow Alerts" />
                                <Card.Body>
                                    <p className="text-muted">Use the <code>alert-label-icon label-arrow</code> class to show an alert with label icon and arrow.</p>
                                    <div className="live-preview">

                                        <Row>
                                            <Col xl={6}>
                                            <h6>Primary Alert</h6>
                                            <Alert variant="primary" className="alert-label-icon label-arrow" dismissible role="alert">
                                                <i className="ri-user-smile-line label-icon"></i><strong>Primary</strong> - Label icon arrow alert
                                            </Alert>

                                            <h6>Secondary Alert</h6>
                                            <Alert variant="secondary" className="alert-label-icon label-arrow" role="alert" dismissible>
                                                <i className="ri-check-double-line label-icon"></i><strong>Secondary</strong> - Label icon arrow alert
                                            </Alert>

                                            <h6>Success Alert</h6>
                                            <Alert variant="success" className="alert-label-icon label-arrow" role="alert" dismissible>
                                                <i className="ri-notification-off-line label-icon"></i><strong>Success</strong> - Label icon arrow alert
                                            </Alert>

                                            <h6>Danger Alert</h6>
                                            <Alert variant="danger" className="alert-label-icon label-arrow mb-xl-0" role="alert" dismissible>
                                                <i className="ri-error-warning-line label-icon"></i><strong>Danger</strong> - Label icon arrow alert
                                            </Alert>

                                            </Col>

                                            <Col xl={6}>

                                            <h6>Warning Alert</h6>
                                            <Alert variant="warning" className="alert-label-icon label-arrow" role="alert" dismissible>
                                                <i className="ri-alert-line label-icon"></i><strong>Warning</strong> - Label icon arrow alert
                                            </Alert>

                                            <h6>Info Alert</h6>
                                            <Alert variant="info" className="alert-label-icon label-arrow" role="alert" dismissible>
                                                <i className="ri-airplay-line label-icon"></i><strong>Info</strong> - Label icon arrow alert
                                            </Alert>

                                            <h6>Light Alert</h6>
                                            <Alert variant="light" className="alert-label-icon label-arrow" role="alert" dismissible>
                                                <i className="ri-mail-line label-icon"></i><strong>Light</strong> - Label icon arrow alert
                                            </Alert>

                                            <h6>Dark Alert</h6>
                                            <Alert variant="dark" className="alert-label-icon label-arrow mb-0" role="alert" dismissible>
                                                <i className="ri-refresh-line label-icon"></i><strong>Dark</strong> - Label icon arrow alert
                                            </Alert>

                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup lang-jsx" style={{ maxHeight: "260px" }}>
                                            <code>
                                                <LabelIconArrowAlertsExample />
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
                                <PreviewCardHeader title="Rounded Label Icon Alerts" />
                                <Card.Body>
                                    <p className="text-muted">Use the <code>alert-label-icon rounded-label</code> class to set an alert with a rounded label icon.</p>
                                    <div className="live-preview">

                                        <Row>
                                            <Col xl={6}>
                                            <h6>Primary Alert</h6>
                                            <Alert variant="primary" className="alert-label-icon rounded-label" role="alert" dismissible>
                                                <i className="ri-user-smile-line label-icon"></i><strong>Primary</strong> - Rounded label alert
                                            </Alert>

                                            <h6>Secondary Alert</h6>
                                            <Alert variant="secondary" className="alert-label-icon rounded-label" role="alert" dismissible>
                                                <i className="ri-check-double-line label-icon"></i><strong>Secondary</strong>- Rounded label alert
                                            </Alert>

                                            <h6>Success Alert</h6>
                                            <Alert variant="success" className="alert-label-icon  -label" role="alert" dismissible>
                                                <i className="ri-notification-off-line label-icon"></i><strong>Success</strong>- Rounded label alert
                                            </Alert>

                                            <h6>Danger Alert</h6>
                                            <Alert variant="danger" className="alert-label-icon rounded-label mb-xl-0" role="alert" dismissible>
                                                <i className="ri-error-warning-line label-icon"></i><strong>Danger</strong>- Rounded label alert
                                            </Alert>

                                            </Col>

                                            <Col xl={6}>
                                            <h6>Warning Alert</h6>
                                            <Alert variant="warning" className="alert-label-icon rounded-label" role="alert" dismissible>
                                                <i className="ri-alert-line label-icon"></i><strong>Warning</strong> - Rounded label alert
                                            </Alert>

                                            <h6>Info Alert</h6>
                                            <Alert variant="info" className="alert-label-icon rounded-label" role="alert" dismissible>
                                                <i className="ri-airplay-line label-icon"></i><strong>Info</strong> - Rounded label alert
                                            </Alert>

                                            <h6>Light Alert</h6>
                                            <Alert variant="light" className="alert-label-icon rounded-label" role="alert" dismissible>
                                                <i className="ri-mail-line label-icon"></i><strong>Light</strong> - Rounded label alert
                                            </Alert>

                                            <h6>Dark Alert</h6>
                                            <Alert variant="dark" className="alert-label-icon rounded-label mb-0" role="alert" dismissible>
                                                <i className="ri-refresh-line label-icon"></i><strong>Dark</strong> - Rounded label alert
                                            </Alert>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup lang-jsx" style={{ maxHeight: "260px" }}>
                                            <code>
                                                <RoundedLabelIconAlertsExample />
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
                                <PreviewCardHeader title="Solid Alerts" />
                                <Card.Body>
                                    <p className="text-muted">Use the <code>alert-solid</code> class to set an alert with solid style.</p>

                                    <div className="live-preview">
                                        <Row>
                                            <Col xl={6}>
                                                <h6>Primary Solid Alert</h6>
                                                <Alert variant="primary" className="bg-primary text-white border-0">
                                                    <strong>Hi!</strong> - Solid <b>primary alert</b> example
                                                </Alert>

                                                <h6>Secondary Solid Alert</h6>
                                                <Alert variant="secondary" className="border-0 bg-secondary text-white">
                                                    <strong>How are you!</strong> - Solid <b>secondary alert</b> example
                                                </Alert>

                                                <h6>Success Solid Alert</h6>
                                                <Alert variant="success" className="border-0 bg-success text-white">
                                                    <strong>Yey! Everything worked! </strong> - Solid <b>success alert</b> example
                                                </Alert>

                                                <h6>Danger Solid Alert</h6>
                                                <Alert variant="danger" className="border-0 bg-danger text-white mb-xl-0">
                                                    <strong>Something is very wrong!</strong> - Solid <b>danger alert</b> example
                                                </Alert>

                                            </Col>

                                            <Col xl={6}>
                                                <h6>Warning Solid Alert</h6>
                                                <Alert variant="warning" className="border-0 bg-warning text-white">
                                                    <strong>Uh oh, something went wrong!</strong> - Solid <b>warning alert</b> example
                                                </Alert>

                                                <h6>Info Solid Alert</h6>
                                                <Alert variant="info" className="border-0 bg-info text-white">
                                                    <strong>Don't forget' it !</strong> - Solid <b>info alert</b> example
                                                </Alert>

                                                <h6>Light Solid Alert</h6>
                                                <Alert variant="light" className="border-0 bg-light text-white">
                                                    <strong>Mind Your Step!</strong> - Solid <b>secondary alert</b> example
                                                </Alert>

                                                <h6>Dark Solid Alert</h6>
                                                <Alert variant="dark" className="border-0 bg-dark text-white mb-0">
                                                    <strong>Did you know?</strong> - Solid <b>dark alert</b> example
                                                </Alert>

                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "260px" }}>
                                            <code>
                                                <SolidAlertsExample />
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
UiAlerts.layout = (page:any) => <Layout children={page}/>
export default UiAlerts;
