import React from "react";
import { Card, Col, Row, Form, Container } from "react-bootstrap";
import UiContent from "../../../Components/Common/UiContent";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Head } from "@inertiajs/react";
import Layout from "../../../Layouts";

const FormEditor = () => {
    return (
        <React.Fragment>
            <Head title="Editors | Velzon - React Admin & Dashboard Template" />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Editors" pageTitle="Forms" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <Card.Header className="align-items-center d-flex">
                                    <h4 className="card-title mb-0">
                                        Ckeditor Classic Editor
                                    </h4>
                                </Card.Header>
                                <Card.Body>
                                    <Form method="post">
                                        <CKEditor
                                            editor={ClassicEditor as any}
                                            data="<p>Hello from CKEditor 5!</p>"
                                            onReady={(editor) => {
                                                // You can store the "editor" and use when it is needed.
                                            }}
                                        />
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
FormEditor.layout = (page: any) => <Layout children={page} />;
export default FormEditor;
