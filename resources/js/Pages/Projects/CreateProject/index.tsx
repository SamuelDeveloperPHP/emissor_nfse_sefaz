import React, { useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
//Import Flatepicker
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Dropzone from "react-dropzone";

//Import Images
import avatar3 from "../../../../images/users/avatar-3.jpg";
import avatar4 from "../../../../images/users/avatar-4.jpg";
import { Head, Link } from "@inertiajs/react";
import Layout from "../../../Layouts";

const CreateProject = () => {
    const SingleOptions = [
        { value: "Watches", label: "Watches" },
        { value: "Headset", label: "Headset" },
        { value: "Sweatshirt", label: "Sweatshirt" },
        { value: "20% off", label: "20% off" },
        { value: "4 star", label: "4 star" },
    ];

    const [selectedMulti, setselectedMulti] = useState<any>(null);

    const handleMulti = (selectedMulti: any) => {
        setselectedMulti(selectedMulti);
    };

    //Dropzone file upload
    const [selectedFiles, setselectedFiles] = useState<any>([]);

    const handleAcceptedFiles = (files: any) => {
        files.map((file: any) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            })
        );
        setselectedFiles(files);
    };

    /**
     * Formats the size
     */
    const formatBytes = (bytes: any, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (
            parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
        );
    };

    return (
        <React.Fragment>
            <Head title="Create Project | Velzon - React Admin & Dashboard Template" />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Create Project" pageTitle="Projects" />
                    <Row>
                        <Col lg={8}>
                            <Card>
                                <Card.Body>
                                    <div className="mb-3">
                                        <Form.Label
                                            className="form-label"
                                            htmlFor="project-title-input"
                                        >
                                            Project Title
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            id="project-title-input"
                                            placeholder="Enter project title"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <Form.Label
                                            className="form-label"
                                            htmlFor="project-thumbnail-img"
                                        >
                                            Thumbnail Image
                                        </Form.Label>
                                        <Form.Control
                                            className="form-control"
                                            id="project-thumbnail-img"
                                            type="file"
                                            accept="image/png, image/gif, image/jpeg"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <Form.Label className="form-label">
                                            Project Description
                                        </Form.Label>
                                        <CKEditor
                                            editor={ClassicEditor as any}
                                            data="<p>Hello from CKEditor 5!</p>"
                                            onReady={(editor) => {
                                                // You can store the "editor" and use when it is needed.
                                            }}
                                            // onChange={(editor) => {
                                            //     editor.getData();
                                            // }}
                                        />
                                    </div>

                                    <Row>
                                        <Col lg={4}>
                                            <div className="mb-3 mb-lg-0">
                                                <Form.Label
                                                    htmlFor="choices-priority-input"
                                                    className="form-label"
                                                >
                                                    Priority
                                                </Form.Label>
                                                <select
                                                    className="form-select"
                                                    data-choices
                                                    data-choices-search-false
                                                    id="choices-priority-input"
                                                >
                                                    <option defaultValue="High">
                                                        High
                                                    </option>
                                                    <option value="Medium">
                                                        Medium
                                                    </option>
                                                    <option value="Low">
                                                        Low
                                                    </option>
                                                </select>
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div className="mb-3 mb-lg-0">
                                                <Form.Label
                                                    htmlFor="choices-status-input"
                                                    className="form-label"
                                                >
                                                    Status
                                                </Form.Label>
                                                <select
                                                    className="form-select"
                                                    data-choices
                                                    data-choices-search-false
                                                    id="choices-status-input"
                                                >
                                                    <option defaultValue="Inprogress">
                                                        Inprogress
                                                    </option>
                                                    <option value="Completed">
                                                        Completed
                                                    </option>
                                                </select>
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div>
                                                <Form.Label
                                                    htmlFor="datepicker-deadline-input"
                                                    className="form-label"
                                                >
                                                    Deadline
                                                </Form.Label>
                                                <Flatpickr
                                                    className="form-control"
                                                    options={{
                                                        dateFormat: "d M, Y",
                                                    }}
                                                    placeholder="Enter due date"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <h5 className="card-title mb-0">
                                        Attached files
                                    </h5>
                                </Card.Header>
                                <Card.Body>
                                    <div>
                                        <p className="text-muted">
                                            Add Attached files here.
                                        </p>

                                        <Dropzone
                                            onDrop={(acceptedFiles) => {
                                                handleAcceptedFiles(
                                                    acceptedFiles
                                                );
                                            }}
                                        >
                                            {({
                                                getRootProps,
                                                getInputProps,
                                            }) => (
                                                <div className="dropzone dz-clickable">
                                                    <div
                                                        className="dz-message needsclick"
                                                        {...getRootProps()}
                                                    >
                                                        <div className="mb-3">
                                                            <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                                                        </div>
                                                        <h4>
                                                            Drop files here or
                                                            click to upload.
                                                        </h4>
                                                    </div>
                                                </div>
                                            )}
                                        </Dropzone>

                                        <ul
                                            className="list-unstyled mb-0"
                                            id="dropzone-preview"
                                        >
                                            {selectedFiles.map(
                                                (f: any, i: any) => {
                                                    return (
                                                        <Card
                                                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                            key={i + "-file"}
                                                        >
                                                            <div className="p-2">
                                                                <Row className="align-items-center">
                                                                    <Col className="col-auto">
                                                                        <img
                                                                            data-dz-thumbnail=""
                                                                            height="80"
                                                                            className="avatar-sm rounded bg-light"
                                                                            alt={
                                                                                f.name
                                                                            }
                                                                            src={
                                                                                f.preview
                                                                            }
                                                                        />
                                                                    </Col>
                                                                    <Col>
                                                                        <Link
                                                                            href="#"
                                                                            className="text-muted font-weight-bold"
                                                                        >
                                                                            {
                                                                                f.name
                                                                            }
                                                                        </Link>
                                                                        <p className="mb-0">
                                                                            <strong>
                                                                                {
                                                                                    f.formattedSize
                                                                                }
                                                                            </strong>
                                                                        </p>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </Card>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    </div>
                                </Card.Body>
                            </Card>

                            <div className="text-end mb-4">
                                <button
                                    type="submit"
                                    className="btn btn-danger w-sm me-1"
                                >
                                    Delete
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-secondary w-sm me-1"
                                >
                                    Draft
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-success w-sm"
                                >
                                    Create
                                </button>
                            </div>
                        </Col>

                        <Col lg={4}>
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Privacy</h5>
                                </div>
                                <Card.Body>
                                    <div>
                                        <Form.Label
                                            htmlFor="choices-privacy-status-input"
                                            className="form-label"
                                        >
                                            Status
                                        </Form.Label>
                                        <select
                                            className="form-select"
                                            data-choices
                                            data-choices-search-false
                                            id="choices-privacy-status-input"
                                        >
                                            <option defaultValue="Private">
                                                Private
                                            </option>
                                            <option value="Team">Team</option>
                                            <option value="Public">
                                                Public
                                            </option>
                                        </select>
                                    </div>
                                </Card.Body>
                            </div>

                            <Card>
                                <Card.Header>
                                    <h5 className="card-title mb-0">Tags</h5>
                                </Card.Header>
                                <Card.Body>
                                    <div className="mb-3">
                                        <Form.Label
                                            htmlFor="choices-categories-input"
                                            className="form-label"
                                        >
                                            Categories
                                        </Form.Label>
                                        <select
                                            className="form-select"
                                            data-choices
                                            data-choices-search-false
                                            id="choices-categories-input"
                                        >
                                            <option defaultValue="Designing">
                                                Designing
                                            </option>
                                            <option value="Development">
                                                Development
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <Form.Label
                                            htmlFor="choices-text-input"
                                            className="form-label"
                                        >
                                            Skills
                                        </Form.Label>
                                        <Select
                                            value={selectedMulti}
                                            isMulti={true}
                                            onChange={(selectedMulti: any) => {
                                                handleMulti(selectedMulti);
                                            }}
                                            options={SingleOptions}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Header>
                                    <h5 className="card-title mb-0">Members</h5>
                                </Card.Header>
                                <Card.Body>
                                    <div className="mb-3">
                                        <Form.Label
                                            htmlFor="choices-lead-input"
                                            className="form-label"
                                        >
                                            Team Lead
                                        </Form.Label>
                                        <select
                                            className="form-select"
                                            data-choices
                                            data-choices-search-false
                                            id="choices-lead-input"
                                        >
                                            <option defaultValue="Brent Gonzalez">
                                                Brent Gonzalez
                                            </option>
                                            <option value="Darline Williams">
                                                Darline Williams
                                            </option>
                                            <option value="Sylvia Wright">
                                                Sylvia Wright
                                            </option>
                                            <option value="Ellen Smith">
                                                Ellen Smith
                                            </option>
                                            <option value="Jeffrey Salazar">
                                                Jeffrey Salazar
                                            </option>
                                            <option value="Mark Williams">
                                                Mark Williams
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <Form.Label className="form-label">
                                            Team Members
                                        </Form.Label>
                                        <div className="avatar-group">
                                            <Link
                                                href="#"
                                                className="avatar-group-item"
                                                data-bs-toggle="tooltip"
                                                data-bs-trigger="hover"
                                                data-bs-placement="top"
                                                title="Brent Gonzalez"
                                            >
                                                <div className="avatar-xs">
                                                    <img
                                                        src={avatar3}
                                                        alt=""
                                                        className="rounded-circle img-fluid"
                                                    />
                                                </div>
                                            </Link>
                                            <Link
                                                href="#"
                                                className="avatar-group-item"
                                                data-bs-toggle="tooltip"
                                                data-bs-trigger="hover"
                                                data-bs-placement="top"
                                                title="Sylvia Wright"
                                            >
                                                <div className="avatar-xs">
                                                    <div className="avatar-title rounded-circle bg-secondary">
                                                        S
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link
                                                href="#"
                                                className="avatar-group-item"
                                                data-bs-toggle="tooltip"
                                                data-bs-trigger="hover"
                                                data-bs-placement="top"
                                                title="Ellen Smith"
                                            >
                                                <div className="avatar-xs">
                                                    <img
                                                        src={avatar4}
                                                        alt=""
                                                        className="rounded-circle img-fluid"
                                                    />
                                                </div>
                                            </Link>
                                            <Link
                                                href="#"
                                                className="avatar-group-item"
                                                data-bs-toggle="tooltip"
                                                data-bs-trigger="hover"
                                                data-bs-placement="top"
                                                title="Add Members"
                                            >
                                                <div
                                                    className="avatar-xs"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#inviteMembersModal"
                                                >
                                                    <div className="avatar-title fs-16 rounded-circle bg-light border-dashed border text-primary">
                                                        +
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
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
CreateProject.layout = (page: any) => <Layout children={page} />;
export default CreateProject;
