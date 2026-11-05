import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Card, Col, Form, Modal, Row, Dropdown } from 'react-bootstrap';
//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from '../../../Components/Common/TableContainer';
import { TicketsId, Title, Client, AssignedTo, CreateDate, DueDate, Status, Priority } from "./TicketCol";
//Import Flatepicker
import Flatpickr from "react-flatpickr";
import moment from "moment";
import { isEmpty } from "lodash";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import DeleteModal from "../../../Components/Common/DeleteModal";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../../Components/Common/Loader";
import { createSelector } from 'reselect';
import { onAddNewTicket, ondeleteTicket, onGetTicketsList, onupdateTicket } from '../../../slices/thunk';

const TicketsData = () => {
    const dispatch: any = useDispatch();

    const selectTicketState = (state: any) => state.Tickets;
    const selectTicketProperties = createSelector(
        selectTicketState,
        (state: any) => ({
            ticketsList: state.ticketsList,
            isTicketSuccess: state.isTicketSuccess,
            error: state.error,
        })
    );
    // Inside your component
    const {
        ticketsList, isTicketSuccess, error
    }: any = useSelector(selectTicketProperties);


    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [ticket, setTicket] = useState<any>([]);

    const [ticketdata, setTicketData] = useState<any>([]);

    // Delete Tickets
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);

    const toggle = useCallback(() => {
        if (modal) {
            setModal(false);
            setTicket("");
        } else {
            setModal(true);
            setTicket("")
        }
    }, [modal]);

    // validation
    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            id: (ticket && ticket.id) || '',
            ticketId: (ticket && ticket.ticketId) || '',
            title: (ticket && ticket.title) || '',
            client: (ticket && ticket.client) || '',
            assigned: (ticket && ticket.assigned) || '',
            createDate: (ticket && ticket.createDate) || '',
            dueDate: (ticket && ticket.dueDate) || '',
            status: (ticket && ticket.status) || '',
            priority: (ticket && ticket.priority) || '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Please Enter Title"),
            client: Yup.string().required("Please Enter Client Name"),
            assigned: Yup.string().required("Please Enter Assigned Name"),
            createDate: Yup.string().required("Please Enter Date"),
            dueDate: Yup.string().required("Please Enter Date"),
            status: Yup.string().required("Please Enter Your Joining status"),
            priority: Yup.string().required("Please Enter Your Priority")
        }),
        onSubmit: (values) => {
            if (isEdit) {
                const updateTickets = {
                    id: ticket ? ticket.id : 0,
                    ticketId: values.ticketId,
                    title: values.title,
                    client: values.client,
                    assigned: values.assigned,
                    createDate: values.createDate,
                    dueDate: values.dueDate,
                    status: values.status,
                    priority: values.priority
                };
                // update ticket
                dispatch(onupdateTicket(updateTickets));
                validation.resetForm();
            } else {

                const newTicket = {
                    id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                    ticketId: "#VLZ4" + (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                    title: values["title"],
                    client: values["client"],
                    assigned: values["assigned"],
                    createDate: values["createDate"],
                    dueDate: values["dueDate"],
                    status: values["status"],
                    priority: values["priority"]
                };
                // save new ticket
                dispatch(onAddNewTicket(newTicket));
                validation.resetForm();

            }
            toggle();
        },
    });

    // Delete Data
    const onClickDelete = (ticket: any) => {
        setTicket(ticket);
        setDeleteModal(true);
    };

    const handleDeleteTicket = () => {
        if (ticket) {
            dispatch(ondeleteTicket(ticket.id));
            setDeleteModal(false);
        }
    };

    // Update Data
    const handleTicketsClick = (arg: any) => {
        const ticket = arg;

        setTicket({
            id: ticket.id,
            ticketId: ticket.ticketId,
            title: ticket.title,
            client: ticket.client,
            assigned: ticket.assigned,
            createDate: ticket.createDate,
            dueDate: ticket.dueDate,
            status: ticket.status,
            priority: ticket.priority
        });

        setIsEdit(true);
        setModal(true);
    };

    // Get Data

    useEffect(() => {
        // if (ticketsList && !ticketsList.length) {
        dispatch(onGetTicketsList());
        // }
    }, [dispatch]);


    useEffect(() => {
        setTicketData(ticketsList);
    }, [ticketsList]);

    useEffect(() => {
        if (!isEmpty(ticketsList)) {
            setTicket(ticketsList);
            setIsEdit(false);
        }
    }, [ticketsList]);

    // Add Data
    const handleTicketsClicks = () => {
        setTicket("");
        setIsEdit(false);
        toggle();
    };

    // Checked All
    const checkedAll = useCallback(() => {
        const checkall: any = document.getElementById("checkBoxAll");
        const ele = document.querySelectorAll(".ticketCheckBox");

        if (checkall.checked) {
            ele.forEach((ele: any) => {
                ele.checked = true;
            });
        } else {
            ele.forEach((ele: any) => {
                ele.checked = false;
            });
        }
        deleteCheckbox();
    }, []);

    // Delete Multiple
    const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState<any>([]);
    const [isMultiDeleteButton, setIsMultiDeleteButton] = useState<boolean>(false);

    const deleteMultiple = () => {
        const checkall: any = document.getElementById("checkBoxAll");
        selectedCheckBoxDelete.forEach((element: any) => {
            dispatch(ondeleteTicket(element.value));
            setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
        });
        setIsMultiDeleteButton(false);
        checkall.checked = false;
    };

    const deleteCheckbox = () => {
        const ele = document.querySelectorAll(".ticketCheckBox:checked");
        ele.length > 0 ? setIsMultiDeleteButton(true) : setIsMultiDeleteButton(false);
        setSelectedCheckBoxDelete(ele);
    };

    const columns = useMemo(
        () => [
            {
                header: <Form.Check.Input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
                cell: (cellProps: any) => {
                    return <Form.Check.Input type="checkbox" className="ticketCheckBox form-check-input" value={cellProps.getValue()} onChange={() => deleteCheckbox()} />;
                },
                id: '#',
            },
            {
                header: "ID",
                accessorKey: "ticketId",
                enableColumnFilter: false,
                cell: (cellProps: any) => {
                    return <TicketsId {...cellProps} />;
                },
            },
            {
                header: "Title",
                accessorKey: "title",
                enableColumnFilter: false,
                cell: (cellProps: any) => {
                    return <Title {...cellProps} />;
                },
            },
            {
                header: "Client",
                accessorKey: "client",
                enableColumnFilter: false,
                cell: (cellProps: any) => {
                    return <Client {...cellProps} />;
                },
            },
            {
                header: "Assigned To",
                accessorKey: "assigned",
                enableColumnFilter: false,
                cell: (cellProps: any) => {
                    return <AssignedTo {...cellProps} />;
                },
            },
            {
                header: "Create Date",
                accessorKey: "createDate",
                enableColumnFilter: false,
                cell: (cellProps: any) => {
                    return <CreateDate {...cellProps} />;
                },
            },
            {
                header: "Due Date",
                accessorKey: "dueDate",
                enableColumnFilter: false,
                cell: (cellProps: any) => {
                    return <DueDate {...cellProps} />;
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
                header: "Priority",
                accessorKey: "priority",
                enableColumnFilter: false,
                cell: (cellProps: any) => {
                    return <Priority {...cellProps} />;
                },
            },
            {
                header: "Actions",
                cell: (cellProps: any) => {
                    return (
                        <Dropdown>
                            <Dropdown.Toggle as="a" className="btn btn-soft-secondary btn-sm arrow-none">
                                <i className="ri-more-fill align-middle"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-end">
                                <li><Dropdown.Item href="/apps-tickets-details"><i className="ri-eye-fill align-bottom me-2 text-muted"></i> View</Dropdown.Item></li>
                                <li><Dropdown.Item className="edit-item-btn" href="#showModal" data-bs-toggle="modal" onClick={() => { const TicketData = cellProps.row.original; handleTicketsClick(TicketData); }}><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit</Dropdown.Item></li>
                                <li>
                                    <Dropdown.Item className="remove-item-btn" data-bs-toggle="modal" href="#deleteOrder"
                                        onClick={() => {
                                            const ticketData = cellProps.row.original;
                                            onClickDelete(ticketData);
                                        }}>
                                        <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete
                                    </Dropdown.Item>
                                </li>
                            </Dropdown.Menu>
                        </Dropdown>
                    );
                },
            },
        ],
        [checkedAll]
    );

    return (
        <React.Fragment>
            <Row>
                <DeleteModal
                    show={deleteModal}
                    onDeleteClick={handleDeleteTicket}
                    onCloseClick={() => setDeleteModal(false)}
                />
                <DeleteModal
                    show={deleteModalMulti}
                    onDeleteClick={() => {
                        deleteMultiple();
                        setDeleteModalMulti(false);
                    }}
                    onCloseClick={() => setDeleteModalMulti(false)}
                />
                <Col lg={12}>
                    <Card>
                        <Card.Header className="border-0">
                            <div className="d-flex align-items-center">
                                <h5 className="card-title mb-0 flex-grow-1">Tickets</h5>
                                <div className="flex-shrink-0">
                                    <div className="d-flex flex-wrap gap-2">
                                        <button className="btn btn-danger add-btn" onClick={() => { setIsEdit(false); toggle(); }}><i className="ri-add-line align-bottom"></i> Create Tickets</button>
                                        {" "}{isMultiDeleteButton && <button className="btn btn-soft-danger"
                                            onClick={() => setDeleteModalMulti(true)}
                                        ><i className="ri-delete-bin-2-line"></i></button>}
                                    </div>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body className='pt-0'>
                            {ticketdata && ticketdata.length > 0 ? (
                                <TableContainer
                                    columns={columns}
                                    data={(ticketdata || [])}
                                    isGlobalFilter={true}
                                    customPageSize={8}
                                    divClass="table-responsive table-card mb-3"
                                    tableClass="align-middle table-nowrap mb-0"
                                    theadClass=""
                                    thClass=""
                                    handleTicketClick={handleTicketsClicks}
                                    isTicketsListFilter={true}
                                    SearchPlaceholder="Search for ticket details or something..."
                                />
                            )
                                : (<Loader className="flex-grow-1 ms-2" error={error} />)
                            }
                            <ToastContainer closeButton={false} limit={1} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={modal} onHide={toggle} centered size="lg" className="border-0" dialogClassName="zoomIn">
                <Modal.Header className="p-3 bg-info-subtle" closeButton>
                    <h5 className='modal-title'>
                        {!!isEdit ? "Edit Ticket" : "Add Ticket"}
                    </h5>
                </Modal.Header>
                <Form className="tablelist-form" onSubmit={(e: any) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                }}>
                    <Modal.Body>
                        <Row className="g-3">
                            <Col lg={12}>
                                <div>
                                    <Form.Label htmlFor="tasksTitle-field" className="form-label">Title</Form.Label>
                                    <Form.Control
                                        name="title"
                                        id="tasksTitle-field"
                                        className="form-control"
                                        placeholder="Enter Title"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.title || ""}
                                    />
                                    {validation.touched.title && validation.errors.title ? (
                                        <Form.Control.Feedback type="invalid">{validation.errors.title}</Form.Control.Feedback>
                                    ) : null}
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div>
                                    <Form.Label htmlFor="client_nameName-field" className="form-label">Client</Form.Label>
                                    <Form.Control
                                        name="client"
                                        type="text"
                                        id="client_nameName-field"
                                        placeholder="Enter Client Name"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.client || ""}
                                    />
                                    {validation.touched.client && validation.errors.client ? (
                                        <Form.Control.Feedback type="invalid">{validation.errors.client}</Form.Control.Feedback>
                                    ) : null}
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div>
                                    <Form.Label htmlFor="assignedtoName-field" className="form-label">Assigned To</Form.Label>
                                    <Form.Control
                                        name="assigned"
                                        type="text"
                                        id="assignedtoName-field"
                                        placeholder="Enter Assigned Name"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.assigned || ""}
                                    />
                                    {validation.touched.assigned && validation.errors.assigned ? (
                                        <Form.Control.Feedback type="invalid">{validation.errors.assigned}</Form.Control.Feedback>
                                    ) : null}
                                </div>
                            </Col>
                            <Col lg={6}>
                                <Form.Label htmlFor="date-field" className="form-label">Create Date</Form.Label>
                                <Flatpickr
                                    name="createDate"
                                    id="date-field"
                                    className="form-control"
                                    placeholder="Select a date"
                                    options={{
                                        altInput: true,
                                        altFormat: "d M, Y",
                                        dateFormat: "d M, Y",
                                    }}
                                    onChange={(createDate: any) => validation.setFieldValue("createDate", moment(createDate[0]).format("DD MMMM ,YYYY"))}
                                    // onChange={(date: any) => {
                                    //     validation.setFieldValue("date", moment(date[0]).format('DD MMM YYYY'));
                                    // }}
                                    value={validation.values.createDate || ''}
                                />
                                {validation.errors.createDate && validation.touched.createDate ? (
                                    <Form.Control.Feedback type="invalid" className='d-block'>{validation.errors.createDate}</Form.Control.Feedback>
                                ) : null}
                            </Col>
                            <Col lg={6}>
                                <Form.Label htmlFor="duedate-field" className="form-label">Due Date</Form.Label>
                                <Flatpickr
                                    name="dueDate"
                                    id="date-field"
                                    className="form-control"
                                    placeholder="Select a date"
                                    options={{
                                        altInput: true,
                                        altFormat: "d M, Y",
                                        dateFormat: "d M, Y",
                                    }}
                                    onChange={(dueDate: any) => validation.setFieldValue("dueDate", moment(dueDate[0]).format("DD MMMM ,YYYY"))}
                                    value={validation.values.dueDate || ''}
                                />
                                {validation.errors.dueDate && validation.touched.dueDate ? (
                                    <Form.Control.Feedback type="invalid" className='d-block'>{validation.errors.dueDate}</Form.Control.Feedback>
                                ) : null}
                            </Col>
                            <Col lg={6}>
                                <Form.Label htmlFor="ticket-status" className="form-label">Status</Form.Label>
                                <select
                                    name="status"
                                    className="form-select"
                                    id="status-field"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={
                                        validation.values.status || ""
                                    }
                                >
                                    <option value="">Status</option>
                                    <option value="New">New</option>
                                    <option value="Inprogress">Inprogress</option>
                                    <option value="Closed">Closed</option>
                                    <option value="Open">Open</option>
                                </select>
                                {validation.touched.status &&
                                    validation.errors.status ? (
                                    <Form.Control.Feedback type="invalid">
                                        {validation.errors.status}
                                    </Form.Control.Feedback>
                                ) : null}
                            </Col>
                            <Col lg={6}>
                                <Form.Label htmlFor="priority-field" className="form-label">Priority</Form.Label>
                                <select
                                    name="priority"
                                    className="form-select"
                                    id="priority-field"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={
                                        validation.values.priority || ""
                                    }
                                >
                                    <option value="">Priority</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                                {validation.touched.priority &&
                                    validation.errors.priority ? (
                                    <Form.Control.Feedback type="invalid">
                                        {validation.errors.priority}
                                    </Form.Control.Feedback>
                                ) : null}
                            </Col>
                        </Row>

                    </Modal.Body>
                    <div className="modal-footer">
                        <div className="hstack gap-2 justify-content-end">
                            <button onClick={toggle} type="button" className="btn btn-light">Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn">{!!isEdit ? "Update" : "Add Ticket"}</button>
                        </div>
                    </div>
                </Form>
            </Modal>
        </React.Fragment>
    );
};

export default TicketsData;