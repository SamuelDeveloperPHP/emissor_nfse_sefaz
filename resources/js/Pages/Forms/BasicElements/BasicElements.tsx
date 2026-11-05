import React from 'react';
import { InputExample, InputSizing, FileInput, InputGroup, InputGroupSizing, MultipleInputs, ButtonsCheckboxesRadiosGroup, ButtonsWithDropdowns, CustomForms } from './BasicElementCode';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, Col, Container, Row, Dropdown, Form, FloatingLabel } from 'react-bootstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { Head } from '@inertiajs/react';
import Layout from '../../../Layouts';


const BasicElements = () => {

    return (
        <React.Fragment>
            <Head title='Basic Elements | Velzon - React Admin & Dashboard Template' />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Basic Elements" pageTitle="Forms" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Input Example" />

                                <Card.Body >
                                    <div className="live-preview">
                                        <Row className="gy-4">
                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="basiInput" className="form-label">Basic Input</Form.Label>
                                                    <Form.Control type="password" className="form-control" id="basiInput" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="labelInput" className="form-label">Input with Label</Form.Label>
                                                    <Form.Control type="password" className="form-control" id="labelInput" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="placeholderInput" className="form-label">Input with Placeholder</Form.Label>
                                                    <Form.Control type="password" className="form-control" id="placeholderInput" placeholder="Placeholder" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="valueInput" className="form-label">Input with Value</Form.Label>
                                                    <Form.Control type="text" className="form-control" id="valueInput" defaultValue="Input value" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="readonlyPlaintext" className="form-label">Readonly Plain Text Input</Form.Label>
                                                    <Form.Control type="text" className="form-control-plaintext" id="readonlyPlaintext" defaultValue="Readonly input" readOnly />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="readonlyInput" className="form-label">Readonly Input</Form.Label>
                                                    <Form.Control type="text" className="form-control" id="readonlyInput" defaultValue="Readonly input" readOnly />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="disabledInput" className="form-label">Disabled Input</Form.Label>
                                                    <Form.Control type="text" className="form-control" id="disabledInput" defaultValue="Disabled input" disabled />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="iconInput" className="form-label">Input with Icon</Form.Label>
                                                    <div className="form-icon">
                                                        <Form.Control type="email" className="form-control form-control-icon" id="iconInput" placeholder="example@gmail.com" />
                                                        <i className="ri-mail-unread-line"></i>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="iconrightInput" className="form-label">Input with Icon Right</Form.Label>
                                                    <div className="form-icon right">
                                                        <Form.Control type="email" className="form-control form-control-icon" id="iconrightInput" placeholder="example@gmail.com" />
                                                        <i className="ri-mail-unread-line"></i>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="exampleInputdate" className="form-label">Input Date</Form.Label>
                                                    <Form.Control type="date" className="form-control" id="exampleInputdate" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="exampleInputtime" className="form-label">Input Time</Form.Label>
                                                    <Form.Control type="time" className="form-control" id="exampleInputtime" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="exampleInputpassword" className="form-label">Input Password</Form.Label>
                                                    <Form.Control type="password" className="form-control" id="exampleInputpassword" defaultValue="44512465" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="exampleFormControlTextarea5" className="form-label">Example Textarea</Form.Label>
                                                    <textarea className="form-control" id="exampleFormControlTextarea5" rows={3}></textarea>
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="formtextInput" className="form-label">Form Text</Form.Label>
                                                    <Form.Control type="password" className="form-control" id="formtextInput" />
                                                    <div id="passwordHelpBlock" className="form-text">
                                                        Must be 8-20 characters long.
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="colorPicker" className="form-label">Color Picker</Form.Label>
                                                    <Form.Control type="color" className="form-control form-control-color w-100" id="colorPicker" defaultValue="#364574" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="borderInput" className="form-label">Input Border Style</Form.Label>
                                                    <Form.Control type="text" className="form-control border-dashed" id="borderInput" placeholder="Enter your name" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <Form.Label htmlFor="exampleDataList" className="form-label">Datalist example</Form.Label>
                                                <Form.Control className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Search your country..." />
                                                <datalist id="datalistOptions">
                                                    <option defaultValue="Switzerland"> </option>
                                                    <option defaultValue="New York"> </option>
                                                    <option defaultValue="France"> </option>
                                                    <option defaultValue="Spain"> </option>
                                                    <option defaultValue="Chicago"> </option>
                                                    <option defaultValue="Bulgaria"> </option>
                                                    <option defaultValue="Hong Kong"> </option>
                                                </datalist>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="exampleInputrounded" className="form-label">Rounded Input</Form.Label>
                                                    <Form.Control type="text" className="form-control rounded-pill" id="exampleInputrounded" placeholder="Enter your name" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <FloatingLabel label="Floating Input" >
                                                        <Form.Control
                                                            id="exampleEmail"
                                                            name="email"
                                                            placeholder="Floating Input"
                                                            type="text"
                                                        />
                                                    </FloatingLabel>
                                                </div>
                                            </Col>

                                        </Row>

                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "352px" }}>
                                            <code>
                                                <InputExample />
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
                                <PreviewCardHeader title="Input Sizing" />

                                <div className="card-body">
                                    <p className="text-muted">Use <code>form-control-lg</code> class to set large size input and Use <code>form-control-sm</code> class to set small size input. No class is needed for default size input.</p>
                                    <div className="live-preview">
                                        <Row className="align-items-center g-3">
                                            <Col lg={4}>
                                                <Form.Control className="form-control form-control-sm" type="text" placeholder=".form-control-sm" />
                                            </Col>

                                            <Col lg={4}>
                                                <Form.Control className="form-control" type="text" placeholder=".form-control" />
                                            </Col>

                                            <Col lg={4}>
                                                <Form.Control className="form-control form-control-lg" type="text" placeholder=".form-control-lg" />
                                            </Col>

                                        </Row>

                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <InputSizing />
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </Card>
                        </Col>

                    </Row>


                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="File Input" />

                                <Card.Body>
                                    <div className="live-preview">
                                        <Row className="align-items-center g-3">
                                            <Col lg={4}>
                                                <div>
                                                    <Form.Label htmlFor="formFile" className="form-label">Default File Input Example</Form.Label>
                                                    <p className="text-muted">Use <code>input</code> attribute with <code>type="file"</code> tag for default file input.</p>
                                                    <Form.Control className="form-control" type="file" id="formFile" />
                                                </div>
                                            </Col>

                                            <Col lg={4}>
                                                <div>
                                                    <Form.Label htmlFor="formFileMultiple" className="form-label">Multiple Files Input Example</Form.Label>
                                                    <p className="text-muted">Use <code>multiple</code> attribute within the input attribute to select multiple files.</p>
                                                    <Form.Control className="form-control" type="file" id="formFileMultiple" multiple />
                                                </div>
                                            </Col>

                                            <Col lg={4}>
                                                <div>
                                                    <Form.Label htmlFor="formFileDisabled" className="form-label">Disabled File Input Example</Form.Label>
                                                    <p className="text-muted">Use <code>disabled</code> attribute within the input attribute to disable the file input.</p>
                                                    <Form.Control className="form-control" type="file" id="formFileDisabled" disabled />
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row className="mt-4 align-items-center g-3">
                                            <h5 className="fs-14">File Input Sizing</h5>
                                            <Col lg={4}>
                                                <div>
                                                    <Form.Label htmlFor="formSizeSmall" className="form-label">Small Size File Input Example</Form.Label>
                                                    <p className="text-muted">Use <code>form-control-sm</code> class within the form-control class to set a small size file input.</p>
                                                    <Form.Control className="form-control form-control-sm" id="formSizeSmall" type="file" />
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div>
                                                    <Form.Label htmlFor="formSizeDefault" className="form-label">Default Size File Input Example</Form.Label>
                                                    <p className="text-muted">Use <code>form-control </code>class and <code>type="file"</code> attribute within the input attribute to set a default size file input.</p>
                                                    <Form.Control className="form-control" id="formSizeDefault" type="file" />
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div>
                                                    <Form.Label htmlFor="formSizeLarge" className="form-label">Large Size File Input Example</Form.Label>
                                                    <p className="text-muted">Use <code>form-control-lg</code> class within the form-control class to set a large size file input.</p>

                                                    <Form.Control className="form-control form-control-lg" id="formSizeLarge" type="file" />
                                                </div>
                                            </Col>

                                        </Row>

                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <FileInput />
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
                                <PreviewCardHeader title="Input Group" />

                                <Card.Body>
                                    <div className="live-preview">
                                        <div>
                                            <h5 className="fs-15">Basic example</h5>
                                            <p className="text-muted">Use <code>input-group</code> class to div element which contains input attribute to wrap a default input in the group.</p>
                                            <Row className="g-3">
                                                <Col lg={6}>
                                                    <div className="input-group">
                                                        <span className="input-group-text" id="basic-addon1">@</span>
                                                        <Form.Control type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="input-group">
                                                        <Form.Control type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                                        <span className="input-group-text" id="basic-addon2">@example.com</span>
                                                    </div>
                                                </Col>
                                                <Col lg={12}>
                                                    <div className="input-group">
                                                        <span className="input-group-text">$</span>
                                                        <Form.Control type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
                                                        <span className="input-group-text">.00</span>
                                                    </div>
                                                </Col>
                                                <Col lg={12}>
                                                    <div className="input-group">
                                                        <Form.Control type="text" className="form-control" placeholder="Username" aria-label="Username" />
                                                        <span className="input-group-text">@</span>
                                                        <Form.Control type="text" className="form-control" placeholder="Server" aria-label="Server" />
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="input-group">
                                                        <span className="input-group-text">With textarea</span>
                                                        <textarea className="form-control" aria-label="With textarea" rows={2}></textarea>
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <Form.Label htmlFor="basic-url" className="form-label">Your vanity URL</Form.Label>
                                                    <div className="input-group">
                                                        <span className="input-group-text" id="basic-addon3">https://example.com/users/</span>
                                                        <Form.Control type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className="mt-4">
                                            <h5 className="fs-15">Wrapping</h5>
                                            <p className="text-muted">
                                                Input groups wrap by default via <code>flex-wrap: wrap</code> in order to accommodate custom form field validation within an input group. You may disable this with <code>flex-nowrap</code> class.
                                            </p>
                                            <div className="input-group flex-nowrap">
                                                <span className="input-group-text" id="addon-wrapping">@</span>
                                                <Form.Control type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <InputGroup />
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
                                <PreviewCardHeader title="Input Group Sizing" />

                                <div className="card-body">
                                    <p className="text-muted">
                                        Use <code>input-group-sm</code> class to set a small size input group and <code>input-group-lg</code> class to input-group class to set a large size input group respectively. no such class is required for a
                                        default size input group.
                                    </p>
                                    <div className="live-preview">
                                        <Row className="align-items-center g-3">
                                            <Col lg={4} >
                                                <div className="input-group input-group-sm">
                                                    <span className="input-group-text" id="inputGroup-sizing-sm">Small</span>
                                                    <Form.Control type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                                                </div>
                                            </Col>
                                            <Col lg={4} >
                                                <div className="input-group">
                                                    <span className="input-group-text" id="inputGroup-sizing-default">Default</span>
                                                    <Form.Control type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                                </div>
                                            </Col>
                                            <Col lg={4} >
                                                <div className="input-group input-group-lg">
                                                    <span className="input-group-text" id="inputGroup-sizing-lg">Large</span>
                                                    <Form.Control type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <InputGroupSizing />
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </Card>
                        </Col>

                    </Row>


                    <Row>
                        <Col lg={12}>
                            <div className="card">
                                <PreviewCardHeader title="Multiple Inputs" />

                                <div className="card-body">
                                    <p className="text-muted">While multiple <code>&lt;input&gt;</code>s are supported visually, validation styles are only available for input groups with a single <code>&lt;input&gt;</code>.</p>
                                    <div className="live-preview">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">First and last name</span>
                                            <Form.Control type="text" aria-label="First name" className="form-control" />
                                            <Form.Control type="text" aria-label="Last name" className="form-control" />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">$</span>
                                            <span className="input-group-text">0.00</span>
                                            <Form.Control type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                                        </div>

                                        <div className="input-group">
                                            <Form.Control type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                                            <span className="input-group-text">$</span>
                                            <span className="input-group-text">0.00</span>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <MultipleInputs />
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>

                    </Row>


                    <Row>
                        <Col lg={12}>
                            <div className="card">
                                <PreviewCardHeader title="Buttons, Checkboxs and Radios Group" />

                                <div className="card-body">
                                    <div className="live-preview">
                                        <div>
                                            <p className="text-muted">
                                                Use any checkbox, radio, or button option within an input group’s addon instead of text. We recommend adding <code>mt-0</code> class to the <code>form-check-input</code> when there’s no visible text next
                                                to the input.
                                            </p>
                                            <Row className="g-3">
                                                <Col lg={6}>
                                                    <div className="input-group">
                                                        <div className="input-group-text">
                                                            <Form.Check.Input className="form-check-input mt-0" type="checkbox" defaultValue="" aria-label="Checkbox for following text input" />
                                                        </div>
                                                        <Form.Control type="text" className="form-control" aria-label="Text input with checkbox" />
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="input-group">
                                                        <div className="input-group-text">
                                                            <Form.Check.Input className="form-check-input mt-0" type="radio" defaultValue="" aria-label="Radio button for following text input" />
                                                        </div>
                                                        <Form.Control type="text" className="form-control" aria-label="Text input with radio button" />
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="input-group">
                                                        <button className="btn btn-outline-primary" type="button" id="button-addon1">Button</button>
                                                        <Form.Control type="text" className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="input-group">
                                                        <Form.Control type="text" className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                                        <button className="btn btn-outline-success" type="button" id="button-addon2">Button</button>
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="input-group">
                                                        <button className="btn btn-primary" type="button">Button</button>
                                                        <button className="btn btn-success" type="button">Button</button>
                                                        <Form.Control type="text" className="form-control" placeholder="" aria-label="Example text with two button addons" />
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="input-group">
                                                        <Form.Control type="text" className="form-control" aria-label="Recipient's username with two button addons" />
                                                        <button className="btn btn-primary" type="button">Button</button>
                                                        <button className="btn btn-success" type="button">Button</button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <ButtonsCheckboxesRadiosGroup />
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>

                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Buttons with dropdowns" />

                                <div className="card-body">
                                    <div className="live-preview">
                                        <div>
                                            <p className="text-muted">You can use a button with the dropdown toggle to set the file input group.</p>
                                            <Row className="g-3">
                                                <Col lg={6}>
                                                    <Dropdown className="input-group">
                                                        <Dropdown.Toggle as="button" className="btn btn-primary dropdown-toggle" type="button">Dropdown</Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <li><Dropdown.Item>Action</Dropdown.Item></li>
                                                            <li><Dropdown.Item>Another action</Dropdown.Item></li>
                                                            <li><Dropdown.Item>Something else here</Dropdown.Item></li>
                                                            <li><hr className="dropdown-divider" /></li>
                                                            <li><Dropdown.Item>Separated link</Dropdown.Item></li>
                                                        </Dropdown.Menu>
                                                        <Form.Control type="text" className="form-control" aria-label="Text input with dropdown button" />
                                                    </Dropdown>
                                                </Col>
                                                <Col lg={6}>
                                                    <Dropdown className="input-group">
                                                        <Form.Control type="text" className="form-control" aria-label="Text input with dropdown button" />
                                                        <Dropdown.Toggle as="button" className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</Dropdown.Toggle>
                                                        <Dropdown.Menu className="dropdown-menu-end">
                                                            <li><Dropdown.Item>Action</Dropdown.Item></li>
                                                            <li><Dropdown.Item>Another action</Dropdown.Item></li>
                                                            <li><Dropdown.Item>Something else here</Dropdown.Item></li>
                                                            <li><hr className="dropdown-divider" /></li>
                                                            <li><Dropdown.Item>Separated link</Dropdown.Item></li>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Col>
                                                <Col lg={12}>
                                                    <Dropdown className="input-group">
                                                        <Dropdown.Toggle as="button" className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <li><Dropdown.Item>Action before</Dropdown.Item></li>
                                                            <li><Dropdown.Item>Another action before</Dropdown.Item></li>
                                                            <li><Dropdown.Item>Something else here</Dropdown.Item></li>
                                                            <li><hr className="dropdown-divider" /></li>
                                                            <li><Dropdown.Item>Separated link</Dropdown.Item></li>
                                                        </Dropdown.Menu>
                                                        <Form.Control type="text" className="form-control" aria-label="Text input with 2 dropdown buttons" />
                                                        <Dropdown.Toggle as="button" className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</Dropdown.Toggle>
                                                        <Dropdown.Menu className="dropdown-menu-end">
                                                            <li><Dropdown.Item>Action</Dropdown.Item></li>
                                                            <li><Dropdown.Item>Another action</Dropdown.Item></li>
                                                            <li><Dropdown.Item>Something else here</Dropdown.Item></li>
                                                            <li><hr className="dropdown-divider" /></li>
                                                            <li><Dropdown.Item>Separated link</Dropdown.Item></li>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <ButtonsWithDropdowns />
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </Card>
                        </Col>

                    </Row>


                    <Row >
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Custom Forms" />

                                <div className="card-body">
                                    <p className="text-muted">Input groups include support for custom selects and custom file inputs. Browser default versions of these are not supported.</p>
                                    <div className="live-preview">
                                        <div>
                                            <h5 className="fs-15 mb-3">Select</h5>
                                            <Row className="g-3">
                                                <Col lg={6}>
                                                    <div className="input-group">
                                                        <Form.Label className="input-group-text" htmlFor="inputGroupSelect01">Options</Form.Label>
                                                        <select className="form-select" id="inputGroupSelect01">
                                                            <option >Choose...</option>
                                                            <option defaultValue="1">One</option>
                                                            <option defaultValue="2">Two</option>
                                                            <option defaultValue="3">Three</option>
                                                        </select>
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="input-group">
                                                        <select className="form-select" id="inputGroupSelect02">
                                                            <option >Choose...</option>
                                                            <option defaultValue="1">One</option>
                                                            <option defaultValue="2">Two</option>
                                                            <option defaultValue="3">Three</option>
                                                        </select>
                                                        <Form.Label className="input-group-text" htmlFor="inputGroupSelect02">Options</Form.Label>
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="input-group">
                                                        <button className="btn btn-outline-primary" type="button">Button</button>
                                                        <select className="form-select" id="inputGroupSelect03" aria-label="Example select with button addon">
                                                            <option >Choose...</option>
                                                            <option defaultValue="1">One</option>
                                                            <option defaultValue="2">Two</option>
                                                            <option defaultValue="3">Three</option>
                                                        </select>
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="input-group">
                                                        <select className="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                                                            <option >Choose...</option>
                                                            <option defaultValue="1">One</option>
                                                            <option defaultValue="2">Two</option>
                                                            <option defaultValue="3">Three</option>
                                                        </select>
                                                        <button className="btn btn-outline-secondary" type="button">Button</button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className="mt-4">
                                            <h5 className="fs-15 mb-3">File Input</h5>
                                            <Row className="g-3">
                                                <Col lg={6} >
                                                    <div className="input-group">
                                                        <Form.Label className="input-group-text" htmlFor="inputGroupFile01">Upload</Form.Label>
                                                        <Form.Control type="file" className="form-control" id="inputGroupFile01" />
                                                    </div>
                                                </Col>
                                                <Col lg={6} >
                                                    <div className="input-group">
                                                        <Form.Control type="file" className="form-control" id="inputGroupFile02" />
                                                        <Form.Label className="input-group-text" htmlFor="inputGroupFile02">Upload</Form.Label>
                                                    </div>
                                                </Col>
                                                <Col lg={6} >
                                                    <div className="input-group">
                                                        <button className="btn btn-outline-primary" type="button" id="inputGroupFileAddon03">Button</button>
                                                        <Form.Control type="file" className="form-control" id="inputGroupFile03" aria-describedby="inputGroupFileAddon03" aria-label="Upload" />
                                                    </div>
                                                </Col>
                                                <Col lg={6} >
                                                    <div className="input-group">
                                                        <Form.Control type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                                                        <button className="btn btn-outline-success" type="button" id="inputGroupFileAddon04">Button</button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <CustomForms />
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </Card>
                        </Col>

                    </Row>

                </Container>

            </div>


        </React.Fragment>
    );
}
BasicElements.layout = (page: any) => <Layout children={page} />
export default BasicElements;