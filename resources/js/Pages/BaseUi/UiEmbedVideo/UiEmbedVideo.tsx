import React, { Children } from 'react';
import { Card, Col, Container, Row, } from 'react-bootstrap';

// Import Content
import UiContent from '../../../Components/Common/UiContent';
//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';

import { Ratio169Example, Ratio219Example, Ratio43Example, Ratio11Example, CustomRationExample } from './UiEmbedVideoCode';
import { Head } from '@inertiajs/react';
import Layout from '../../../Layouts';


const UiEmbedVideo = () => {
    return (
        <React.Fragment>
            <Head title='Embed Video | Velzon - React Admin & Dashboard Template' />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Embed Video" pageTitle="Base UI" />
                    <Row>
                        <Col xl={6}>
                            <Card>
                                <PreviewCardHeader title="Ratio Video 16:9" />
                                <Card.Body>
                                    <p className="text-muted">Wrap any embed in<code>&lt;iframe&gt;</code> tag, in a parent element, use <code>ratio-16x9</code> class to set aspect ratio 16:9. </p>
                                    <div className="live-preview">

                                        {/* <!-- 16:9 aspect ratio --> */}
                                        <div className="ratio ratio-16x9">
                                            <iframe className="rounded" src="https://www.youtube.com/embed/1y_kfWUCFDQ" title="YouTube video" allowFullScreen></iframe>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <Ratio169Example />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card>
                                <PreviewCardHeader title="Ratio Video 4:3" />
                                <Card.Body>
                                    <p className="text-muted">Use <code>ratio-4x3</code> class to set aspect ratio 4:3.</p>
                                    <div className="live-preview">

                                        {/* <!-- 4:3 aspect ratio --> */}
                                        <div className="ratio ratio-4x3">
                                            <iframe className="rounded" src="https://www.youtube.com/embed/PHcgN1GTjdU" title="YouTube video" allowFullScreen></iframe>
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <Ratio43Example />
                                            </code>
                                        </pre>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>&lt;!-- Ratio Video 4:3 --&gt;
                                                &lt;div className=&quot;ratio ratio-4x3&quot;&gt;
                                                &lt;iframe src=&quot;https://www.youtube.com/embed/1y_kfWUCFDQ&quot; title=&quot;YouTube video&quot; allowFullScreen&gt;&lt;/iframe&gt;
                                                &lt;/div&gt;</code></pre>
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card>
                                <PreviewCardHeader title="Custom Ratios" />
                                <Card.Body>
                                    <p className="text-muted">Use <code>--vz-aspect-ratio: 50%</code> to style element to set aspect ratio 2:1.</p>
                                    <div className="live-preview">

                                        {/* <!-- 16:9 aspect ratio --> */}
                                        <div className="ratio ratio-16x9">
                                            <iframe className="rounded" src="https://www.youtube.com/embed/2RZQN_ko0iU" title="YouTube video" allowFullScreen></iframe>
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <CustomRationExample />
                                            </code>
                                        </pre>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>&lt;!-- Custom Ratio Video --&gt;
                                                &lt;div className=&quot;ratio&quot; style=&quot;--vz-aspect-ratio: 50%;&quot;&gt;
                                                &lt;iframe src=&quot;https://www.youtube.com/embed/2RZQN_ko0iU&quot; title=&quot;YouTube video&quot; allowFullScreen&gt;&lt;/iframe&gt;
                                                &lt;/div&gt;</code></pre>
                                    </div>
                                </Card.Body>
                            </Card>

                        </Col>

                        {/* <!-- end col --> */}

                        <Col xl={6}>
                            <Card>
                                <PreviewCardHeader title="Ratio Video 21:9" />
                                <Card.Body>
                                    <p className="text-muted">Use <code>ratio-21x9</code> class to set aspect ratio 21:9.</p>
                                    <div className="live-preview">

                                        {/* <!-- 21:9 aspect ratio --> */}
                                        <div className="ratio ratio-21x9">
                                            <iframe className="rounded" src="https://www.youtube.com/embed/Z-fV2lGKnnU" title="YouTube video" allowFullScreen></iframe>
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <Ratio219Example />
                                            </code>
                                        </pre>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>&lt;!-- Ratio Video 21:9 --&gt;
                                                &lt;div className=&quot;ratio ratio-21x9&quot;&gt;
                                                &lt;iframe src=&quot;https://www.youtube.com/embed/Z-fV2lGKnnU&quot; title=&quot;YouTube video&quot; allowFullScreen&gt;&lt;/iframe&gt;
                                                &lt;/div&gt;</code></pre>
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card>
                                <PreviewCardHeader title="Ratio Video 1:1" />
                                <Card.Body>
                                    <p className="text-muted">Use <code>ratio-1x1</code> class to set aspect ratio 1:1.</p>                                       <div className="live-preview">

                                        {/* <!-- 1:1 aspect ratio --> */}
                                        <div className="ratio ratio-1x1">
                                            <iframe className="rounded" src="https://www.youtube.com/embed/GfSZtaoc5bw" title="YouTube video" allowFullScreen></iframe>
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <Ratio11Example />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
UiEmbedVideo.layout = (page:any) => <Layout children={page}/>
export default UiEmbedVideo;
