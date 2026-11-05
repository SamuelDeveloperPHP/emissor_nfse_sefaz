    import React from 'react'
    import UiContent from '../../../Components/Common/UiContent';
    import { Card, Col, Container, Row } from 'react-bootstrap';
    import BreadCrumb from '../../../Components/Common/BreadCrumb';
    import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
    import { ColorExample, DefaultLinkExample, OffsetExample, OpacityExample, OpacityHoverExample, UtilitiesExample, UtilityOpacityExample } from './UiLinkCode';
import { Head, Link } from '@inertiajs/react';
import Layout from '../../../Layouts';

const UiLink = () => {
    return (
        <React.Fragment>
            <Head title='Link | Velzon - React Admin & Dashboard Template'/>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Colored Links" pageTitle="Base UI" />
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <PreviewCardHeader title="Link colors" />
                                <Card.Body>
                                    <p className="text-muted">You can use the <code>.link-*</code> classes to colorize links. Unlike the <Link href="/ui-colors"><code>.text-*</code> classes</Link>, these classes have a <code>:hover</code> and <code>:focus</code> state. Some of the link styles use a relatively light foreground color, and should only be used on a dark background in order to have sufficient contrast.</p>
                                    <div className='live-preview'>
                                        <p><Link href="#" className="link-primary">Primary link</Link></p>
                                        <p><Link href="#" className="link-secondary">Secondary link</Link></p>
                                        <p><Link href="#" className="link-success">Success link</Link></p>
                                        <p><Link href="#" className="link-danger">Danger link</Link></p>
                                        <p><Link href="#" className="link-warning">Warning link</Link></p>
                                        <p><Link href="#" className="link-info">Info link</Link></p>
                                        <p><Link href="#" className="link-light">Light link</Link></p>
                                        <p><Link href="#" className="text-body">Dark link</Link></p>
                                        <p><Link href="#" className="link-body-emphasis mb-0">Emphasis link</Link></p>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <DefaultLinkExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>

                            </Card>
                        </Col>
                        <Col lg={6}>
                            <Card>
                                <PreviewCardHeader title="Link utilities" />
                                <Card.Body>
                                    <p className="text-muted">Colored links can also be modified by our link utilities.</p>
                                    <div className='live-preview'>
                                        <p><Link href="#" className="link-primary link-offset-2 text-decoration-underline link-underline-opacity-25 link-underline-opacity-100-hover">Primary link</Link></p>
                                        <p><Link href="#" className="link-secondary link-offset-2 text-decoration-underline link-underline-opacity-25 link-underline-opacity-100-hover">Secondary link</Link></p>
                                        <p><Link href="#" className="link-success link-offset-2 text-decoration-underline link-underline-opacity-25 link-underline-opacity-100-hover">Success link</Link></p>
                                        <p><Link href="#" className="link-danger link-offset-2 text-decoration-underline link-underline-opacity-25 link-underline-opacity-100-hover">Danger link</Link></p>
                                        <p><Link href="#" className="link-warning link-offset-2 text-decoration-underline link-underline-opacity-25 link-underline-opacity-100-hover">Warning link</Link></p>
                                        <p><Link href="#" className="link-info link-offset-2 text-decoration-underline link-underline-opacity-25 link-underline-opacity-100-hover">Info link</Link></p>
                                        <p><Link href="#" className="link-light link-offset-2 text-decoration-underline link-underline-opacity-25 link-underline-opacity-100-hover">Light link</Link></p>
                                        <p><Link href="#" className="text-body link-offset-2 text-decoration-underline link-underline-opacity-25 link-underline-opacity-100-hover">Dark link</Link></p>
                                        <p><Link href="#" className="link-body-emphasis link-offset-2 text-decoration-underline link-underline-opacity-25 link-underline-opacity-75-hover mb-0">Emphasis link</Link></p>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <UtilitiesExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>

                            </Card>
                        </Col>
                    </Row>


                    <Row>
                        <Col lg={6}>
                            <Card>
                                <PreviewCardHeader title="Link Opacity" />
                                <Card.Body>
                                    <p>Change the alpha opacity of the link <code>rgba()</code> color value with utilities. Please be aware that changes to a color’s opacity can lead to links with <Link href="https://getbootstrap.com/docs/5.3/getting-started/accessibility/#color-contrast" target="_blank"><em>insufficient</em> contrast</Link>.</p>
                                    <div className='live-preview'>
                                        <p><Link className="link-opacity-10" href="#">Link opacity 10</Link></p>
                                        <p><Link className="link-opacity-25" href="#">Link opacity 25</Link></p>
                                        <p><Link className="link-opacity-50" href="#">Link opacity 50</Link></p>
                                        <p><Link className="link-opacity-75" href="#">Link opacity 75</Link></p>
                                        <p className="mb-0"><Link className="link-opacity-100" href="#">Link opacity 100</Link></p>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <OpacityExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>

                            </Card>
                        </Col>
                        <Col lg={6}>
                            <Card>
                                <PreviewCardHeader title="Link Opacity Hover" />
                                <Card.Body>
                                    <p className="text-muted">You can even change the opacity level on hover.</p>
                                    <div className='live-preview'>
                                        <p><Link className="link-opacity-10-hover" href="#">Link hover opacity 10</Link></p>
                                        <p><Link className="link-opacity-25-hover" href="#">Link hover opacity 25</Link></p>
                                        <p><Link className="link-opacity-50-hover" href="#">Link hover opacity 50</Link></p>
                                        <p><Link className="link-opacity-75-hover" href="#">Link hover opacity 75</Link></p>
                                        <p className="mb-0"><Link className="link-opacity-100-hover" href="#">Link hover opacity 100</Link></p>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <OpacityHoverExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>

                            </Card>
                        </Col>
                    </Row>



                    <Row>
                        <Col xxl={4}>
                            <Card>
                                <PreviewCardHeader title="Underline color" />
                                <Card.Body>
                                    <p className="text-muted">Change the underline’s color independent of the link text color.</p>
                                    <div className='live-preview'>
                                        <p><Link href="#" className="text-decoration-underline link-underline-primary">Primary underline</Link></p>
                                        <p><Link href="#" className="text-decoration-underline link-underline-secondary">Secondary underline</Link></p>
                                        <p><Link href="#" className="text-decoration-underline link-underline-success">Success underline</Link></p>
                                        <p><Link href="#" className="text-decoration-underline link-underline-danger">Danger underline</Link></p>
                                        <p><Link href="#" className="text-decoration-underline link-underline-warning">Warning underline</Link></p>
                                        <p><Link href="#" className="text-decoration-underline link-underline-info">Info underline</Link></p>
                                        <p><Link href="#" className="text-decoration-underline link-underline-light">Light underline</Link></p>
                                        <p className="mb-0"><Link href="#" className="text-decoration-underline link-underline-dark">Dark underline</Link></p>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <ColorExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>

                            </Card>
                        </Col>
                        <Col xxl={4}>
                            <Card>
                                <PreviewCardHeader title="Underline opacity" />
                                <Card.Body>
                                    <p className="text-muted">Change the underline’s opacity. Requires adding <code>.link-underline</code> to first set an <code>rgba()</code> color we use to then modify the alpha opacity.</p>
                                    <div className='live-preview'>
                                        <p><Link className="link-offset-2 text-decoration-underline link-underline link-underline-opacity-0" href="#">Underline opacity 0</Link></p>
                                        <p><Link className="link-offset-2 text-decoration-underline link-underline link-underline-opacity-10" href="#">Underline opacity 10</Link></p>
                                        <p><Link className="link-offset-2 text-decoration-underline link-underline link-underline-opacity-25" href="#">Underline opacity 25</Link></p>
                                        <p><Link className="link-offset-2 text-decoration-underline link-underline link-underline-opacity-50" href="#">Underline opacity 50</Link></p>
                                        <p><Link className="link-offset-2 text-decoration-underline link-underline link-underline-opacity-75" href="#">Underline opacity 75</Link></p>
                                        <p className="mb-0"><Link className="link-offset-2 text-decoration-underline link-underline link-underline-opacity-100" href="#">Underline opacity 100</Link></p>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <UtilityOpacityExample />
                                            </code>
                                        </pre>
                                    </div>
                                </Card.Body>

                            </Card>
                        </Col>
                        <Col xxl={4}>
                            <Card>
                                <PreviewCardHeader title="Underline offset" />
                                <Card.Body>
                                    <p className="text-muted">Change the underline’s distance from your text. Offset is set in <code>em</code> units to automatically scale with the element’s current <code>font-size</code>.</p>
                                    <div className='live-preview'>
                                        <p><Link href="#">Default link</Link></p>
                                        <p><Link className="text-decoration-underline link-offset-1" href="#">Offset 1 link</Link></p>
                                        <p><Link className="text-decoration-underline link-offset-2" href="#">Offset 2 link</Link></p>
                                        <p className="mb-0"><Link className="text-decoration-underline link-offset-3" href="#">Offset 3 link</Link></p>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup">
                                            <code>
                                                <OffsetExample />
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
    )
}
UiLink.layout = (page:any) => <Layout children={page}/>
export default UiLink;