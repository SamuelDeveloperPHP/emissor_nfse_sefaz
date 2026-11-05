import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  Nav,
  Row,
  Modal,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import DeleteModal from "../../../Components/Common/DeleteModal";
import classnames from "classnames";
import moment from 'moment';

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";
import {
  AppId,
  Designation,
  Contact,
  Status,
  Type,
} from "./ApplicationCol";
import { createSelector } from "reselect";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import ExportCSVModal from "../../../Components/Common/ExportCSVModal";
import { Head } from "@inertiajs/react";
import { onaddNewJobApplicationList, ondeleteJobApplicationList, ongetApplicationList, onupdateJobApplicationList } from "../../../slices/jobs/thunk";
import Layout from "../../../Layouts";
import { ToastContainer } from "react-toastify";

const Application = () => {
  const option = [
    {
      options: [
        { label: "Status", value: "Status" },
        { label: "Approved", value: "Approved" },
        { label: "New", value: "New" },
        { label: "Pending", value: "Pending" },
        { label: "Rejected", value: "Rejected" },
      ],
    },
  ];

  const option1 = [
    {
      options: [
        { label: "Select Options", value: "Select Options" },
        { label: "Full Time", value: "Full Time" },
        { label: "Part Time", value: "Part Time" },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState<any>("All");

  const toggleTab = (type: any) => {
    if (activeTab !== type) {
      setActiveTab(type);
      let filteredOrders = appList;
      if (type !== "All") {
        filteredOrders = appList.filter((job: any) => job.status === type);
      }
      setApplication(filteredOrders);
    }
  };

  const dispatch: any = useDispatch();
  const [show, setShow] = useState<boolean>(false);
  const [application, setApplication] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);

  const [eventData, setEventData] = useState<any>()
  const [isEdit, setIsEdit] = useState<boolean>(false);


  const onClickDelete = (order: any) => {
    setDeleteModal(true);
    if (order.id) {
      setEventData(order)
    }
  };

  const selectapplistData = createSelector(
    (state: any) => state.Jobs,
    (appList: any) => appList.appList
  );
  // Inside your component
  const appList: any = useSelector(selectapplistData);


  useEffect(() => {
    dispatch(ongetApplicationList());
  }, [dispatch]);

  useEffect(() => {
    setApplication(appList);
  }, [appList]);



  // Filter Application Data
  const [date, setDate] = useState<any>([])
  const [status, setStatus] = useState<any>()
  const [type, setType] = useState<any>()
  const [search, setSearch] = useState<any>()

  const filterData = () => {
    const keysToSearch = ['designation', 'contacts', 'type', 'status', 'appid', 'company'];
    const filteredData = appList.filter((item: any) => {
      const searchMatch = !search || keysToSearch.some((key: any) => item[key].toLowerCase().includes(search.toLowerCase()))
      const dateMatch = date.length === 0 || (new Date(item.date) >= new Date(date[0]) && new Date(item.date) <= new Date(date[1]));
      const statusMatch = !status || item.status === status;
      const typeMatch = !type || item.type === type;

      return searchMatch && dateMatch && statusMatch && typeMatch;
    });

    setActiveTab("All")
    setApplication(filteredData)
  };

  // Search
  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
    filterData()
  };

  const columns = useMemo(
    () => [
      {
        header: <Form.Check.Input type="checkbox" className="form-check-input" id="checkBoxAll" />,
        cell: (cellProps: any) => {
          return <Form.Check.Input type="checkbox" className="orderCheckBox form-check-input" value={cellProps.getValue()} />;
        },
        id: '#',
      },
      {
        header: "Application ID",
        accessorKey: "id",
        enableColumnFilter: false,
        cell: (cellProps: any) => {
          return <AppId {...cellProps} />;
        },
      },
      {
        header: "COMPANY NAME",
        accessorKey: "company",
        enableColumnFilter: false,
        cell: (appList: any) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <img
                  src={appList.row.original.img}
                  alt=""
                  className="avatar-xxs rounded-circle image_src object-fit-cover"
                />
              </div>
              <div className="flex-grow-1 ms-2 ">
              {appList.getValue()}
              </div>
            </div>
          </>
        ),
      },
      {
        header: "Designation",
        accessorKey: "designation",
        enableColumnFilter: false,
        cell: (cellProps: any) => {
          return <Designation {...cellProps} />;
        },
      },
      {
        header: "Apply Date",
        accessorKey: "date",
        enableColumnFilter: false,
        cell: (appList) => {
          return appList.row.original.date;
        }
      },
      {
        header: "Contact",
        accessorKey: "contacts",
        enableColumnFilter: false,
        cell: (cellProps: any) => {
          return <Contact {...cellProps} />;
        },
      },
      {
        header: "Type",
        accessorKey: "type",
        enableColumnFilter: false,
        cell: (cellProps: any) => {
          return <Type {...cellProps} />;
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cellProps: any) => {
          return <Status {...cellProps} />;
        },
      },
      {
        header: "Action",
        accessorKey: "action",
        disableFilters: true,
        enableColumnFilter: false,
        cell: (cellProps: any) => {
          return (
            <div className="d-flex gap-3">
              <Button
              variant="link"
                href="/apps-job-details"
                className="p-0 text-primary d-inline-block"
              >
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>View</Tooltip>}
                >
                  <Button variant="link" className="p-0 text-primary d-inline-block p-0 btn-sucess">
                    <i className="ri-eye-fill fs-16"></i>
                  </Button>
                </OverlayTrigger>
              </Button>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Edit</Tooltip>}
              >
                <Button
                  variant="link"
                  className="p-0 text-success"
                  onClick={() => {
                    const data = cellProps.row.original;
                    handleUpdateApplicationClick(data);
                  }}
                >
                  <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                </Button>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Delete</Tooltip>}
              >
                <Button variant="link" className="p-0 text-danger" onClick={() => {
                  const orderData = cellProps.row.original;
                  onClickDelete(orderData);
                }}>
                  <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                </Button>
              </OverlayTrigger>
            </div>
          );
        },
      },
    ],
    []
  );

  const [imgStore, setImgStore] = useState<any>();
  const [selectedImage, setSelectedImage] = useState<any>();

  const handleClick = (item: any) => {
    const newData = [...imgStore, item];
    setImgStore(newData);
    validation.setFieldValue('img', newData)
  }

  useEffect(() => {
    setImgStore((eventData && eventData.img) || [])
  }, [eventData])

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      validation.setFieldValue('img', e.target.result);
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Delete Data
  const handleDelete = () => {
    if (eventData) {
      dispatch(ondeleteJobApplicationList(eventData.id));
      setDeleteModal(false);
    }
  }

  // Add

  const toggle = useCallback(() => {
    if (show) {
      setShow(false);
      setEventData("");
      setIsEdit(false)
      setSelectedImage('')
      setImgStore('')
    } else {
      setShow(true);
      setEventData("");
      setSelectedImage('')
      setImgStore('')
    }
  }, [show]);

  // Update Data
  const handleUpdateApplicationClick = (ele: any) => {
    setEventData({ ...ele });
    setIsEdit(true);
    setShow(true);
  }


  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      img: (eventData && eventData.img) || '',
      company: (eventData && eventData.company) || '',
      designation: (eventData && eventData.designation) || '',
      contacts: (eventData && eventData.contacts) || '',
      date: (eventData && eventData.date) || '',
      type: (eventData && eventData.type) || '',
      status: (eventData && eventData.status) || '',
    },
    validationSchema: Yup.object({
      img: Yup.string().required("Please Add Company Image"),
      company: Yup.string().required("Please Enter Company Name"),
      designation: Yup.string().required("Please Enter Your Designation"),
      contacts: Yup.string().required("Please Enter Your Contacts"),
      date: Yup.string().required("Please Enter Date"),
      type: Yup.string().required("Please Enter Your Type"),
      status: Yup.string().required("Please Enter Your Status")
    }),

    onSubmit: (values) => {
      if (isEdit) {
        const updateJobApplication = {
          id: eventData ? eventData.id : 0,
          img: values.img,
          date: values.date,
          company: values.company,
          designation: values.designation,
          contacts: values.contacts,
          type: values.type,
          status: values.status,
        };
        // update customer
        dispatch(onupdateJobApplicationList(updateJobApplication));
      } else {
        const newJobApplication = {
          id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          img: values.img,
          date: values.date,
          company: values.company,
          designation: values.designation,
          contacts: values.contacts,
          type: values.type,
          status: values.status,
        };
        // save new customer
        dispatch(onaddNewJobApplicationList(newJobApplication));
      }
      toggle();
      validation.resetForm();
      
    },
  });

  // Export Modal
  const [isExportCSV, setIsExportCSV] = useState<boolean>(false);

  return (
    <React.Fragment>
      <Head title="Application | Velzon - React Admin & Dashboard Template" />
      <div className="page-content">
        <ExportCSVModal
          show={isExportCSV}
          onCloseClick={() => setIsExportCSV(false)}
          data={application}
        />
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDelete}
          onCloseClick={() => setDeleteModal(false)}
        />
        <DeleteModal
          show={deleteModalMulti}
          onDeleteClick={() => {
            setDeleteModalMulti(false);
          }}
          onCloseClick={() => setDeleteModalMulti(false)}
        />
        <Container fluid>
          <BreadCrumb title="Application" pageTitle="Jobs" />
          <Row>
            <Col>
              <Card>
                <Card.Header className="border-0">
                  <div className="d-md-flex align-items-center">
                    <h5 className="card-title mb-3 mb-md-0 flex-grow-1">
                      Job Application
                    </h5>
                    <div className="flex-shrink-0">
                      <div className="d-flex gap-1 flex-wrap">
                        <Button
                          variant="success"
                          type="button"
                          className="add-btn"
                          id="create-btn"
                          onClick={toggle}
                        >
                          <i className="ri-add-line align-bottom me-1"></i>{" "}
                          Create Application
                        </Button>
                        <Button variant="info" type="button" onClick={() => setIsExportCSV(true)}>
                          <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                          Import
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body className="border border-dashed border-end-0 border-start-0">
                  <Form>
                    <Row className="g-3">
                      <Col xxl={5} sm={6}>
                        <div className="search-box">
                          <Form.Control
                            type="text"
                            className="form-control search"
                            placeholder="Search for application ID, company, designation status or something..."
                            onChange={handleSearchChange}
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </Col>
                      <Col xxl={2} sm={6}>
                        <div>
                          <Flatpickr
                            className="form-control"
                            id="datepicker-publish-input"
                            placeholder="Select date"
                            options={{
                              altInput: true,
                              altFormat: "F j, Y",
                              mode: "multiple",
                              dateFormat: "d.m.y",
                              onChange: function (selectedDates: any) {
                                setDate(selectedDates.map((item: any) => item),
                                );
                              },
                            }}
                          />
                        </div>
                      </Col>
                      <Col xxl={2} sm={4}>
                        <div>
                          <Select
                            options={option}
                            name="choices-single-default"
                            id="idStatus"
                            onChange={(e: any) => setStatus(e.value)}
                          ></Select>
                        </div>
                      </Col>
                      <Col xxl={2} sm={4}>
                        <div>
                          <Select
                            options={option1}
                            name="choices-single-default"
                            id="idType"
                            onChange={(e: any) => setType(e.value)}
                          ></Select>
                        </div>
                      </Col>
                      <Col xxl={1} sm={4}>
                        <div>
                          <Button
                            type="button"
                            variant="primary"
                            className="btn w-100"
                            onClick={() => filterData()}
                          >
                            {" "}
                            <i className="ri-equalizer-fill me-1 align-bottom"></i>
                            Filters
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
                <Card.Body className="pt-0">
                  <div>
                    <Nav
                      className="nav nav-tabs nav-tabs-custom nav-success mb-3"
                      role="tablist"
                    >
                      <Nav.Item>
                        <Nav.Link
                          className={classnames({ active: activeTab === "All" }, "All py-3")} onClick={() => { toggleTab("All"); }}>
                          All Application
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link className={classnames({ active: activeTab === "New" }, "New py-3")} onClick={() => { toggleTab("New"); }}>
                          New
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link className={classnames({ active: activeTab === "Pending" }, "Pending py-3")} onClick={() => { toggleTab("Pending"); }}>
                          Pending{" "}
                          <span className="badge bg-danger align-middle ms-1">
                            2
                          </span>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link className={classnames({ active: activeTab === "Approved" }, "Approved py-3")} onClick={() => { toggleTab("Approved"); }}>
                          Approved
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link className={classnames({ active: activeTab === "Rejected" }, "Rejected py-3")} onClick={() => { toggleTab("Rejected"); }}>
                          Rejected
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <TableContainer
                      columns={columns}
                      data={application || []}
                      // hadleApplicationClick={hadleApplicationClicks}
                      customPageSize={8}
                      divClass="table-responsive table-card mb-1"
                      tableClass="align-middle table-nowrap"
                      theadClass="table-light text-muted"
                    />
                  </div>

                  <Modal show={show} onHide={toggle} centered={true} >
                    <Modal.Header className="bg-light p-3" closeButton>
                      <h5 className="modal-title">
                        {!!isEdit ? "Edit Application" : "Add Application"}

                      </h5>
                    </Modal.Header>
                    <Form className="tablelist-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <Modal.Body>
                        <Form.Control type="hidden" id="id-field" />

                        <div className="mb-3 d-none" id="modal-id">
                          <Form.Label htmlFor="applicationId" className="form-label"> ID </Form.Label>
                          <Form.Control type="text" id="applicationId" className="form-control" placeholder="ID" readOnly />
                        </div>

                        <div className="text-center">
                          <div className="position-relative d-inline-block">
                            <div className="position-absolute  bottom-0 end-0">
                              <Form.Label htmlFor="companylogo-image-input" className="mb-0" title="Select Image">
                                <div className="avatar-xs cursor-pointer">
                                  <div className="avatar-title bg-light border rounded-circle text-muted">
                                    <i className="ri-image-fill"></i>
                                  </div>
                                </div>
                              </Form.Label>
                              <Form.Control
                                className="form-control d-none"
                                id="companylogo-image-input"
                                type="file"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={handleImageChange}
                                isInvalid={
                                  validation.touched.img && validation.errors.img ? true : false
                                }
                              />
                            </div>
                            <div className="avatar-lg p-1" onClick={(item: any) => handleClick(item)}>
                              <div className="avatar-title bg-light rounded-circle">
                                <img
                                  src={selectedImage || validation.values.img}
                                  id="companylogo-img"
                                  className="avatar-md h-auto rounded-circle object-fit-cover"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          {validation.errors.img && validation.touched.img ? (
                            <Form.Control.Feedback type="invalid" className='d-block'> {validation.errors.img} </Form.Control.Feedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Form.Label htmlFor="company-field" className="form-label"> Company </Form.Label>
                          <Form.Control type="text" id="company-field" className="form-control" placeholder="Enter company name"
                            name="company"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.company || ""}
                            isInvalid={
                              validation.touched.company && validation.errors.company ? true : false
                            }
                          />
                          {validation.touched.company && validation.errors.company ? (
                            <Form.Control.Feedback type="invalid">{validation.errors.company}</Form.Control.Feedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Form.Label htmlFor="designation-field" className="form-label" > Designation </Form.Label>
                          <Form.Control type="text" id="designation-field" className="form-control" placeholder="Enter designation"
                            name="designation"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.designation || ""}
                            isInvalid={
                              validation.touched.designation && validation.errors.designation ? true : false
                            }
                          />
                          {validation.touched.designation && validation.errors.designation ? (
                            <Form.Control.Feedback type="invalid">{validation.errors.designation}</Form.Control.Feedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Form.Label htmlFor="date-field" className="form-label" > Apply Date </Form.Label>
                          <Flatpickr
                            name="date"
                            className="form-control"
                            id="date-field"
                            placeholder="Select date"
                            options={{
                              mode: "single",
                              dateFormat: 'd M, Y',
                            }}
                            value={validation.values.date || ''}
                            onChange={(date: any) => {
                              validation.setFieldValue("date", moment(date[0]).format('DD MMM YYYY'));
                            }}
                          />
                          {validation.errors.date && validation.touched.date ? (
                            <Form.Control.Feedback type="invalid" className='d-block'>{validation.errors.date}</Form.Control.Feedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Form.Label htmlFor="contact-field" className="form-label" > Contacts </Form.Label>
                          <Form.Control type="text" id="contact-field" className="form-control" placeholder="Enter contact"
                            name="contacts"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.contacts || ""}
                            isInvalid={
                              validation.touched.contacts && validation.errors.contacts ? true : false
                            }
                          />
                          {validation.touched.contacts && validation.errors.contacts ? (
                            <Form.Control.Feedback type="invalid">{validation.errors.contacts}</Form.Control.Feedback>
                          ) : null}
                        </div>

                        <div className="row gy-4 mb-3">
                          <div className="col-md-6">
                            <div>
                              <Form.Label htmlFor="status-input" className="form-label"> Status </Form.Label>
                              <select className="form-control" id="status-input"
                                name="status"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.status || ""}
                              >
                                <option value="">Status</option>
                                <option value="Approved">Approved</option>
                                <option value="New">New</option>
                                <option value="Pending">Pending</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                              {validation.touched.status && validation.errors.status ? (
                                <Form.Control.Feedback type="invalid">{validation.errors.status}</Form.Control.Feedback>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div>
                              <Form.Label htmlFor="type-input" className="form-label" > Type </Form.Label>
                              <select className="form-control" id="type-input"
                                name="type"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.type || ""}
                              >
                                <option value="">Select Type</option>
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                              </select>
                              {validation.touched.type && validation.errors.type ? (
                                <Form.Control.Feedback type="invalid">{validation.errors.type}</Form.Control.Feedback>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <div className="hstack gap-2 justify-content-end">
                          <Button type="button" className="btn btn-light" onClick={toggle} >
                            Close
                          </Button>

                          <Button type="submit" className="btn btn-success">
                            {!!isEdit ? "Update" : "Add"}
                          </Button>
                        </div>
                      </Modal.Footer>
                    </Form>
                  </Modal>

                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};
Application.layout = (page: any) => <Layout children={page} />
export default Application;
