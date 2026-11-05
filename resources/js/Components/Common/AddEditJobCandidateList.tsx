import React, { useEffect, useState } from "react";
import { Form, Modal} from "react-bootstrap";

import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import dummy from "../../../images/users/user-dummy-img.jpg"
import { onAddCandidate } from "../../slices/thunk";

interface modal {
    show: boolean,
    editItem: any,
    handleShow: any,
    handleClose: any,
}
interface ImgData {
    id: number,
    name: string;
    avatar: {
        src: string;
    };
}

const AddEditJobCandidateList = ({ show, handleClose, handleShow, editItem }: modal) => {

    const dispatch = useDispatch<any>();
    const [imgStore, setImgStore] = useState<any>();
    // image
    const [selectedImage, setSelectedImage] = useState<any>();

    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues: {
            id: (editItem && editItem.id) || '',
            candidateName: (editItem && editItem.candidateName) || '',
            designation: (editItem && editItem.designation) || '',
            location: (editItem && editItem.location) || '',
            rating1: (editItem && editItem.rating1) || '',
            rating2: (editItem && editItem.rating2) || '',
            userImg: (editItem && editItem.userImg) || '',
            type: (editItem && editItem.type) || '',
        },
        validationSchema: Yup.object({
            userImg: Yup.string().required("Please Enter Your Image"),
            candidateName: Yup.string().required("Please Enter Your CandidateName"),
            designation: Yup.string().required("Please Enter Your Designation"),
            location: Yup.string().required("Please Enter Location"),
            rating1: Yup.number().required("Please Enter Stars"),
            rating2: Yup.number().required("Please Enter Rating"),
            type:  Yup.string().required("Please Enter Status"),
        }),
        onSubmit: (values: any) => {
            const newCandidateadd = {
                id: (Math.floor(Math.random() * (30 - 20)) + 20),
                candidateName: values['candidateName'],
                designation: values['designation'],
                location: values['location'],
                rating1: values['rating1'],
                rating2: values['rating2'],
                // userImg: selectedImage,
                userImg: values['userImg'],
                type: values['type']
            }
            dispatch(onAddCandidate(newCandidateadd));
            validation.resetForm();

            if (values === null) {
                handleShow();
            } else {
                handleClose();
                setSelectedImage('')
                setImgStore('')
            }
        }
    });

    const handleClick = (item: ImgData) => {
        const newData = [...imgStore, item];
        setImgStore(newData);
        validation.setFieldValue('assignedto', newData)
    }

    useEffect(() => {
        setImgStore((editItem && editItem.assignedto) || [])
    }, [editItem])



    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
            validation.setFieldValue('userImg', e.target.result);
            setSelectedImage(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <React.Fragment>
            <Modal id="showModal" show={show} onHide={handleClose} centered>
                <Modal.Header className="bg-light p-3" closeButton>
                    {/* {!!isEdit ? "Edit Order" : "Add Order"} */}
                    <h5 className="modal-title">
                    Add Candidate
                    </h5>
                </Modal.Header>

                <Form className="tablelist-form" onSubmit={(e: any) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                }}>
                     <Modal.Body>
                        <input type="hidden" id="id-field" />

                        <div className="text-center mb-3">
                            <div className="position-relative d-inline-block">
                                <div className="position-absolute bottom-0 end-0">
                                    <Form.Label htmlFor="customer-image-input" className="mb-0" data-bs-toggle="tooltip" data-bs-placement="right" title="Select Image">
                                        <div className="avatar-xs cursor-pointer">
                                            <div className="avatar-title bg-light border rounded-circle text-muted">
                                                <i className="ri-image-fill"></i>
                                            </div>
                                        </div>
                                    </Form.Label>
                                    <Form.Control name="userImg" className="form-control d-none" value="" id="customer-image-input" type="file" accept="image/png, image/gif, image/jpeg" onChange={handleImageChange} />
                                </div>
                                <div className="avatar-lg p-1" onClick={(item: any) => handleClick(item)}>
                                    <div className="avatar-title bg-light rounded-circle">
                                        <img src={selectedImage || dummy} alt="" id="customer-img" className="avatar-md rounded-circle object-cover" />
                                    </div>
                                </div>

                            </div>
                            {validation.errors.userImg && validation.touched.userImg ? (
                                <Form.Control.Feedback type="invalid" className='d-block'> {validation.errors.userImg} </Form.Control.Feedback>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <Form.Label
                                htmlFor="id-field"
                                className="form-label"
                            >
                                Name
                            </Form.Label>
                            <Form.Control
                                name="candidateName"
                                id="id-field"
                                className="form-control"
                                placeholder="Enter Your CandidateName"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.candidateName || ""}
                            />
                            {validation.touched.candidateName && validation.errors.candidateName ? (
                                <Form.Control.Feedback type="invalid">{validation.errors.candidateName}</Form.Control.Feedback>
                            ) : null}

                        </div>

                        <div className="mb-3">
                            <Form.Label
                                htmlFor="id-field"
                                className="form-label"
                            >
                                Designation
                            </Form.Label>
                            <Form.Control
                                name="designation"
                                id="id-field"
                                className="form-control"
                                placeholder="Enter Your Designation"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.designation || ""}
                            />
                            {validation.touched.designation && validation.errors.designation ? (
                                <Form.Control.Feedback type="invalid">{validation.errors.designation}</Form.Control.Feedback>
                            ) : null}

                        </div>

                        <div className="mb-3">
                            <Form.Label htmlFor="task-type">Time</Form.Label>
                            <select className="form-control" id="task-status-input"
                                name="type"
                                value={validation.values.type}
                                onChange={validation.handleChange}
                            >
                                <option value="all">Part Time</option>
                                <option defaultValue="New">Full Time</option>
                                <option value="Inprogress">Freelancer</option>
                            </select>
                            {validation.errors.type && validation.touched.type ? (
                                <Form.Control.Feedback type="invalid" className="d-block">{validation.errors.type}</Form.Control.Feedback>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <Form.Label
                                htmlFor="id-field"
                                className="form-label"
                            >
                                Location
                            </Form.Label>
                            <Form.Control
                                name="location"
                                id="id-field"
                                className="form-control"
                                placeholder="Enter Your Location"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.location || ""}
                            />
                            {validation.touched.location && validation.errors.location ? (
                                <Form.Control.Feedback type="invalid">{validation.errors.location}</Form.Control.Feedback>
                            ) : null}

                        </div>

                        <div className="mb-3">
                            <Form.Label
                                htmlFor="id-field"
                                className="form-label"
                            >
                                Stars
                            </Form.Label>
                            <Form.Control
                                name="rating1"
                                id="id-field"
                                className="form-control"
                                placeholder="Enter Your Stars"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.rating1 || ""}
                            />
                            {validation.touched.rating1 && validation.errors.rating1 ? (
                                <Form.Control.Feedback type="invalid">{validation.errors.rating1}</Form.Control.Feedback>
                            ) : null}

                        </div>

                        <div className="mb-3">
                            <Form.Label
                                htmlFor="id-field"
                                className="form-label"
                            >
                                Ratings
                            </Form.Label>
                            <Form.Control
                                name="rating2"
                                id="id-field"
                                className="form-control"
                                placeholder="Enter Your Rating"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.rating2 || ""}
                            />
                            {validation.touched.rating2 && validation.errors.rating2 ? (
                                <Form.Control.Feedback type="invalid">{validation.errors.rating2}</Form.Control.Feedback>
                            ) : null}

                        </div>


                    </Modal.Body>
                    <div className="modal-footer">
                        <div className="hstack gap-2 justify-content-end">
                            <button
                                type="button"
                                className="btn btn-light"
                                onClick={() => {
                                    // setModal(false);
                                }}
                            >
                                Close
                            </button>

                            <button type="submit" className="btn btn-success">
                                {/* {!!isEdit
                                    ? "Update"
                                    : "Add Customer"} */}
                                Add Customer
                            </button>
                        </div>
                    </div>
                </Form>
            </Modal>
        </React.Fragment>
    )
}

export default AddEditJobCandidateList