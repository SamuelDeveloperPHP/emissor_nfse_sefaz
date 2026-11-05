// export default CandidateGrid;
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import Pagination from "../../../../Components/Common/Pagination";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import dummy from "../../../../../images/users/user-dummy-img.jpg"
import { useFormik } from "formik";
import * as Yup from "yup";
import { Head } from "@inertiajs/react";
import Layout from "../../../../Layouts";
import { onAddCandidateGrid, onGetCandidateGrid } from "../../../../slices/thunk";
import { jobCandidates } from "../../../../common/data/appsJobs";

interface ImgData {
  id: number,
  name: string;
  avatar: {
    src: string;
  };
}

const CandidateGrid = () => {

  const dispatch: any = useDispatch();

  const selectCandidateGrid = createSelector(
    (state: any) => state.Jobs,
    (candidate:any) => ({
      candidategrid: candidate.candidategrid,
    })
  );
  // Inside your component
  const { candidategrid }:any = useSelector(selectCandidateGrid);


  useEffect(() => {
    dispatch(onGetCandidateGrid());
  }, [dispatch]);


  //add modal state
  const [modal, setModal] = useState<boolean>(false);
  const handleAddModal = useCallback(() => { setModal(!modal); setEditItem(null); }, [modal]);
  const handleShow = () => setModal(true)

  const [editItem, setEditItem] = useState<any>();
  
  useEffect(() => {
    setCalendarGrid(candidategrid)
  }, [dispatch,candidategrid])

  const [calendarGrid, setCalendarGrid] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);


  //pagination
  const perPageData = 20;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;
  const currentdata = useMemo(() => jobCandidates?.slice(indexOfFirst, indexOfLast), [indexOfFirst, indexOfLast])

  useEffect(() => {
    setCalendarGrid(currentdata)
  }, [currentdata]);


  // Modal

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
      // type: (editItem && editItem.type) || '',
    },
    validationSchema: Yup.object({
      userImg: Yup.string().required("Please Enter Image"),
      candidateName: Yup.string().required("Please Enter Your CandidateName"),
      designation: Yup.string().required("Please Enter Your Designation"),
      location: Yup.string().required("Please Enter Location"),
      rating1: Yup.number().required("Please Enter Stars"),
      rating2: Yup.number().required("Please Enter Rating"),
      // type: Yup.number().required("Please Enter Status"),
    }),
    onSubmit: (values: any) => {
      const newCandidateadd = {
        id: (Math.floor(Math.random() * (30 - 20)) + 20),
        candidateName: values['candidateName'],
        designation: values['designation'],
        location: values['location'],
        rating1: values['rating1'],
        rating2: values['rating2'],
        userImg: values['userImg'],
        // type: values['type']
      }
      dispatch(onAddCandidateGrid(newCandidateadd));
      validation.resetForm();

      if (values === null) {
        handleShow();
      } else {
        handleAddModal();
        setImgStore('');
        setSelectedImage('');
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


  // search
  const handleSearch = (ele: any) => {
    let item = ele.value;

    if (item === "All Tasks") {
      setCalendarGrid([...candidategrid]);
    } else {
      handleSearchData({ data: candidategrid, item: item, setState: setCalendarGrid })
    }
  }

  const handleSearchData = ({ data, item, setState }: any) => {
    setState(
      data.filter((search: any) =>
        Object.values(search).some(
          (field) =>
            typeof field === 'string' &&
            field.toLowerCase().includes(item?.toLowerCase()),
        )
      )
    )
  }

  return (
    <React.Fragment>
      <Head title="Candidates Grid View | Velzon -  Admin & Dashboard Template" />
      <div className="page-content">
        <Container fluid className="container-fluid">
          <BreadCrumb title="Grid View" pageTitle="Candidates Grid" />

          <Row className="g-4 mb-4">
            <Col className="col-sm-auto">
              <div>
                <a className="btn btn-success" onClick={handleAddModal}>
                  <i className="ri-add-line align-bottom me-1"></i> Add Candidate
                </a>
              </div>
            </Col>
            <Col className="col-sm">
              <div className="d-md-flex justify-content-sm-end gap-2">
                <div className="search-box ms-md-2 flex-shrink-0 mb-3 mb-md-0">
                  <Form.Control type="text" className="form-control" id="searchJob" placeholder="Search for candidate name or designation..." autoComplete="off" onChange={(e: any) => handleSearch(e.target)} />
                  <i className="ri-search-line search-icon"></i>
                </div>

                <select className="form-control w-md" data-choices data-choices-search-false>
                  <option value="All">All</option>
                  <option value="Today">Today</option>
                  <option value="Yesterday" defaultValue="">Yesterday</option>
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="Last 30 Days">Last 30 Days</option>
                  <option value="This Month">This Month</option>
                  <option value="Last Year">Last Year</option>
                </select>
              </div>
            </Col>
          </Row>

          <Row className="gy-2 mb-2" id="candidate-list">
            {(calendarGrid || []).map((item: any, key: any) => (
              <Col className="col-xxl-3 col-md-6" key={key}>
                <Card >
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        {item.nickname ? (
                          <div className="avatar-title border bg-light text-primary rounded text-uppercase fs-24 p-4">
                            {item.nickname}
                          </div>
                        ) : (
                          <div className="avatar-lg rounded">
                            <img
                              src={item.userImg}
                              alt=""
                              className="member-img img-fluid d-block rounded"
                            ></img>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <a href="/pages-profile">
                          <h5 className="fs-16 mb-1">{item.candidateName}</h5>
                        </a>
                        <p className="text-muted mb-2">{item.designation}</p>
                        <div className="d-flex flex-wrap gap-2 align-items-center">
                          <div className="badge text-bg-success">
                            <i className="mdi mdi-star me-1"></i>
                            {item.rating1}
                          </div>
                          <div className="text-muted">{item.rating2}k Ratings</div>
                        </div>
                        <div className="d-flex gap-4 mt-2 text-muted">
                          <div>
                            <i className="ri-map-pin-2-line text-primary me-1 align-bottom"></i>{" "}
                            {item.location}
                          </div>
                          <div>
                            <i className="ri-time-line text-primary me-1 align-bottom"></i>
                            {item.type === "Part Time" ?
                              <span className="badge bg-danger-subtle text-danger">{item.type}</span>
                              :
                              item.type === "Full Time" ?
                                <span className="badge bg-success-subtle text-success">{item.type}</span>
                                :
                                <span className="badge bg-secondary-subtle text-secondary">{item.type}</span>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Pagination
            className="g-0 justify-content-end mb-4"
            perPageData={perPageData}
            data={jobCandidates}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          <Modal id="showModal" show={modal} onHide={handleAddModal} centered>
            <Modal.Header className="bg-light p-3" closeButton>
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
                <Form.Control type="hidden" id="id-field" />

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
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.type || ""}
                  >
                    <option value="all">Part Time</option>
                    <option defaultValue="New">Full Time</option>
                    <option value="Inprogress">Freelancer</option>
                  </select>
                  {validation.errors.type && validation.touched.type ? (
                    <Form.Control.Feedback type="invalid">{validation.errors.type}</Form.Control.Feedback>
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
                      setModal(false);
                    }}
                  >
                    Close
                  </button>

                  <button type="submit" className="btn btn-success"> Add Candidate
                  </button>
                </div>
              </div>
            </Form>
          </Modal>
          <ToastContainer closeButton={false} limit={1} />

        </Container>
      </div>
    </React.Fragment>
  );
};
CandidateGrid.layout = (page: any) => <Layout children={page} />
export default CandidateGrid;
