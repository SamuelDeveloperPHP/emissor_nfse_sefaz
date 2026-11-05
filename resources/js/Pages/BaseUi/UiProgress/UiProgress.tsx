import React from 'react';
import { Button, Card, Col, Container, ProgressBar, Row, } from 'react-bootstrap';

// Import Content
import UiContent from '../../../Components/Common/UiContent';
//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';

import { DefaultProgressExample, BackgroundColorExample, LabelExample, MultipleBarsExample, HeightExample, StripedExample, AnimatedStripedExample, GradientExample, AnimatedExample, CustomExample, CustomProgressExample, ContentExample, ProgressWithStepExample, StepProgressArrowExample } from './UiProgressCode';
import { Head } from '@inertiajs/react';
import Layout from '../../../Layouts';


const UiProgress = () => {
    
    return (
        <React.Fragment>
            <Head title='Progress | Velzon - React Admin & Dashboard Template' />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Progress" pageTitle="Base UI" />
                    <Row>
                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Default Progress" />

                                <Card.Body>
                                    <p className="text-muted">A Default Progress Example.</p>

                                    <div className="live-preview">
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
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <DefaultProgressExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Progress with background color" />

                                <Card.Body>

                                    <p className="text-muted">Use <code>variant="Required Color"</code> attribute to progress bar class with the below-mentioned color variation to set the background color progress bar.</p>

                                    <div className="live-preview">
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
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <BackgroundColorExample />
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
                                <PreviewCardHeader title="Progress with Label" />

                                <Card.Body>

                                    <p className="text-muted">Add labels to your progress bars by placing text within the progress-bar.</p>

                                    <div className="live-preview">
                                        <ProgressBar variant="primary" now={25} label={`${25}%`}></ProgressBar>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ maxHeight: "275px" }}>
                                            <code>
                                                <LabelExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Multiple Bars" />

                                <Card.Body>
                                    <p className="text-muted">Multiple bar color to change the appearance of individual progress bars.</p>

                                    <div className="live-preview">
                                        <div>
                                            <ProgressBar >
                                                <ProgressBar key={1} now={15} />
                                                <ProgressBar key={2} variant="success" now={30} />
                                                <ProgressBar key={3} variant="info" now={20} />
                                            </ProgressBar>
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ maxHeight: "275px" }}>
                                            <code>
                                                <MultipleBarsExample />
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
                                <PreviewCardHeader title="Height" />

                                <Card.Body>

                                    <p className="text-muted">Use <code>progress-sm</code>, <code>progress-lg</code>, or <code>progress-xl</code> class to set the different heights of progress.</p>
                                    <div className="live-preview">
                                        <div className="mb-4">
                                            <h5 className="fs-13">Small Progress</h5>
                                            <ProgressBar variant="primary" now={25} className="progress-sm" />
                                        </div>
                                        <div className="mb-4">
                                            <h5 className="fs-13">Default Progress </h5>
                                            <ProgressBar variant="success" now={40} className="progress-md" />
                                        </div>
                                        <div className="mb-4">
                                            <h5 className="fs-13">Large Progress</h5>
                                            <ProgressBar variant="warning" now={50} className="progress-lg" />
                                        </div>
                                        <div>
                                            <h5 className="fs-13">Extra Large Progress</h5>
                                            <ProgressBar variant="danger" now={70} className="progress-xl" />
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <HeightExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Striped Progress" />

                                <Card.Body>

                                    <p className="text-muted">Use <code>striped</code> attribute to add strip to the progress.</p>
                                    <div className="live-preview">
                                        <div className="mb-4">
                                            <ProgressBar striped now={25} />
                                        </div>
                                        <div>
                                            <ProgressBar variant="success" striped now={40} />
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ maxHeight: "275px" }}>
                                            <code>
                                                <StripedExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card>
                                <PreviewCardHeader title="Animated Striped Progress" />

                                <Card.Body>

                                    <p className="text-muted">Use <code>striped animated</code> attribute to add strip with animation to the progress.</p>

                                    <div className="live-preview">
                                        <div>
                                            <ProgressBar now={75} striped animated />
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ maxHeight: "275px" }}>
                                            <code>
                                                <AnimatedStripedExample />
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
                                <PreviewCardHeader title="Gradient Progress" />

                                <Card.Body>

                                    <p className="text-muted">Use <code>bg-gradient</code> class to show gradient progress bar.</p>

                                    <div className="live-preview">
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
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <GradientExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Animated Progress" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>animated-progess</code> class to show progress with animation.</p>
                                    <div className="live-preview">
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
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <AnimatedExample />
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
                                <PreviewCardHeader title="Custom Progress" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>animated-progess custom-progess </code> class to show custom progress with animation.</p>
                                    <div className="live-preview">
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
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <CustomExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Custom Progress with Label" />

                                <Card.Body>
                                    <p className="text-muted">Use <code>animated-progess custom-progess progress-label</code> class to show custom progress with animation and label.</p>
                                    <div className="live-preview">
                                        <div className="d-flex align-items-center pb-2 mt-4">
                                            <div className="flex-shrink-0 me-3">
                                                <div className="avatar-xs">
                                                    <div className="avatar-title bg-light rounded-circle text-muted fs-16">
                                                        <i className="mdi mdi-facebook"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                            <div className="progress animated-progress custom-progress progress-label">
                                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${15}%` }}
                                                        aria-valuenow={15} aria-valuemin={0} aria-valuemax={100}>
                                                        <div className="label">15%</div>
                                                    </div>
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
                                            <div className="progress animated-progress custom-progress progress-label">
                                                    <div className="progress-bar bg-success" role="progressbar" style={{ width: `${25}%` }}
                                                        aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                                        <div className="label">25%</div>
                                                    </div>
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
                                            <div className="progress animated-progress custom-progress progress-label">
                                                    <div className="progress-bar bg-info" role="progressbar" style={{ width: `${50}%` }}
                                                        aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>
                                                        <div className="label">30%</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <CustomProgressExample />
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
                                <PreviewCardHeader title="Content Progress" />
                                <Card.Body>
                                    <p className="text-muted pb-2">Example of progress with content wrapped in progress.</p>

                                    <div className="live-preview">

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

                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <ContentExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Progress with Steps" />

                                <Card.Body>
                                    <p className="text-muted pb-2">Here is the example of progress which is represented by steps completion.</p>

                                    <div className="live-preview">
                                        <div className="position-relative m-4">
                                            <ProgressBar now={50} style={{ height: "1px" }} />
                                            <Button size="sm" variant="primary" className="position-absolute top-0 start-0 translate-middle rounded-pill" style={{ width: "2rem", height: "2rem" }}>1</Button>
                                            <Button size="sm" variant="primary" className="position-absolute top-0 start-50 translate-middle rounded-pill" style={{ width: "2rem", height: "2rem" }}>2</Button>
                                            <Button size="sm" variant="light" className="position-absolute top-0 start-100 translate-middle rounded-pill" style={{ width: "2rem", height: "2rem" }}>3</Button>
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ maxHeight: "275px" }}>
                                            <code>
                                                <ProgressWithStepExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>

                            <Card>
                                <PreviewCardHeader title="Step Progress with Arrow" />

                                <Card.Body>
                                    <p className="text-muted pb-2">Use <code>progress-step-arrow </code>class to create step progress with an arrow.</p>

                                    <div className="live-preview">
                                        <ProgressBar className='progress-step-arrow progress-info'>
                                            <ProgressBar key={1} now={35} label="Step 1"> </ProgressBar>
                                            <ProgressBar key={2} now={35} label="Step 2"> </ProgressBar>
                                            <ProgressBar key={3} now={35} variant="light" className="text-body" label="Step 3"> </ProgressBar>
                                        </ProgressBar>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ maxHeight: "275px" }}>
                                            <code>
                                                <StepProgressArrowExample />
                                            </code>
                                        </pre>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div >
        </React.Fragment >
    );
};
UiProgress.layout = (page:any) => <Layout children={page} />
export default UiProgress;
