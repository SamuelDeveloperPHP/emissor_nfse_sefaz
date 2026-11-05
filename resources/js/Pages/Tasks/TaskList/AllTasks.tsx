import React, { useState, useEffect, useMemo, useCallback } from 'react';
import TableContainer from '../../../Components/Common/TableContainer';
import DeleteModal from "../../../Components/Common/DeleteModal";

// Import Scroll Bar - SimpleBar
import SimpleBar from 'simplebar-react';

//Import Flatepicker
import Flatpickr from "react-flatpickr";
import moment from "moment";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Col, Modal, Row, Button, Form } from 'react-bootstrap';


import {
  OrdersId,
  Project,
  CreateBy,
  DueDate,
  Status,
  Priority
} from "./TaskListCol";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { isEmpty } from "lodash";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../../Components/Common/Loader";
import { createSelector } from 'reselect';

import avatar1 from "../../../../images/users/avatar-1.jpg";
import avatar2 from "../../../../images/users/avatar-2.jpg";
import avatar3 from "../../../../images/users/avatar-3.jpg";
import avatar5 from "../../../../images/users/avatar-5.jpg";
import avatar6 from "../../../../images/users/avatar-6.jpg";
import avatar7 from "../../../../images/users/avatar-7.jpg";
import avatar8 from "../../../../images/users/avatar-8.jpg";
import avatar10 from "../../../../images/users/avatar-10.jpg";
import { Link } from '@inertiajs/react';
import { onaddNewTask, ondeleteTask, ongetTaskList, onupdateTask } from '../../../slices/tasks/thunk';

const Assigned = [
  { id: 1, imgId: "anna-adame", img: avatar1, name: "Anna Adame" },
  { id: 2, imgId: "frank-hook", img: avatar3, name: "Frank Hook" },
  { id: 3, imgId: "alexis-clarke", img: avatar6, name: "Alexis Clarke" },
  { id: 4, imgId: "herbert-stokes", img: avatar2, name: "Herbert Stokes" },
  { id: 5, imgId: "michael-morris", img: avatar7, name: "Michael Morris" },
  { id: 6, imgId: "nancy-martino", img: avatar5, name: "Nancy Martino" },
  { id: 7, imgId: "thomas-taylor", img: avatar8, name: "Thomas Taylor" },
  { id: 8, imgId: "tonya-noble", img: avatar10, name: "Tonya Noble" },
];

const AllTasks = () => {
  const dispatch: any = useDispatch();

  const selectTaskState = (state: any) => state.Tasks;
  const selectTaskProperties = createSelector(
    selectTaskState,
    (state:any) => ({
      taskList: state.taskList,
      isTaskSuccess: state.isTaskSuccess,
      error: state.error,
      isTaskAdd: state.isTaskAdd,
      isTaskAddFail: state.isTaskAddFail,
      isTaskDelete: state.isTaskDelete,
      isTaskDeleteFail: state.isTaskDeleteFail,
      isTaskUpdate: state.isTaskUpdate,
      isTaskUpdateFail: state.isTaskUpdateFail,
    })
  );
  // Inside your component
  const {
    taskList, isTaskSuccess, error
  }:any = useSelector(selectTaskProperties);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [task, setTask] = useState<any>([]);
  const [TaskData, setTaskList] = useState<any>([]);


  // Delete Task
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setTask(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  // Delete Data
  const onClickDelete = (task: any) => {
    setTask(task);
    setDeleteModal(true);
  };

  useEffect(() => {
    setTaskList(taskList);
  }, [taskList]);

  // Delete Data
  const handleDeleteTask = () => {
    if (task) {
      dispatch(ondeleteTask(task.id));
      setDeleteModal(false);
    }
  };

  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      taskId: (task && task.taskId) || '',
      project: (task && task.project) || '',
      task: (task && task.task) || '',
      creater: (task && task.creater) || '',
      dueDate: (task && task.dueDate) || '',
      status: (task && task.status) || '',
      priority: (task && task.priority) || '',
      subItem: (task && task.subItem) || [],
    },
    validationSchema: Yup.object({
      taskId: Yup.string().required("Please Enter Task Id"),
      project: Yup.string().required("Please Enter Project Name"),
      task: Yup.string().required("Please Enter Your Task"),
      creater: Yup.string().required("Please Enter Creater Name"),
      dueDate: Yup.string().required("Please Enter Due Date"),
      status: Yup.string().required("Please Enter Status"),
      priority: Yup.string().required("Please Enter Priority"),
      subItem: Yup.array().required("Please Enter an Image")
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updatedTask = {
          id: task ? task.id : 0,
          taskId: values.taskId,
          project: values.project,
          task: values.task,
          creater: values.creater,
          dueDate: values.dueDate,
          status: values.status,
          priority: values.priority,
          subItem: values.subItem,
        };
        // update customer
        dispatch(onupdateTask(updatedTask));
        validation.resetForm();
      } else {
        const newTask = {
          id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          taskId: values["taskId"],
          project: values["project"],
          task: values["task"],
          creater: values["creater"],
          dueDate: values["dueDate"],
          status: values["status"],
          priority: values["priority"],
          subItem: values["subItem"],
        };
        // save new customer
        dispatch(onaddNewTask(newTask));
        validation.resetForm();
      }
      toggle();

    },
  });
  // Update Data
  const handleCustomerClick = useCallback((arg: any) => {
    const task = arg;

    setTask({
      id: task.id,
      taskId: task.taskId,
      project: task.project,
      task: task.task,
      creater: task.creater,
      dueDate: task.dueDate,
      status: task.status,
      priority: task.priority,
      subItem: task.subItem,
    });

    setIsEdit(true);
    toggle();
  }, [toggle]);

  // Add Data
  const handleTaskClicks = () => {
    setTask("");
    setIsEdit(false);
    toggle();
  };

  // Get Data

  useEffect(() => {
    if (!isEmpty(taskList)) setTaskList(taskList);
  }, [taskList]);

  useEffect(() => {
    if (taskList && !taskList.length) {
      dispatch(ongetTaskList());
    }
  }, [dispatch, taskList]);


  useEffect(() => {
    setTaskList(taskList);
  }, [taskList]);

  useEffect(() => {
    if (!isEmpty(taskList)) {
      setTaskList(taskList);
      setIsEdit(false);
    }
  }, [taskList]);


  // Checked All
  const checkedAll = useCallback(() => {
    const checkall: any = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".taskCheckBox");

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
      dispatch(ondeleteTask(element.value));
      setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckbox = () => {
    const ele = document.querySelectorAll(".taskCheckBox:checked");
    ele.length > 0 ? setIsMultiDeleteButton(true) : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };


  const columns = useMemo(
    () => [
      {
        header: <Form.Check.Input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
        cell: (cellProps: any) => {
          return <Form.Check.Input type="checkbox" className="taskCheckBox form-check-input" value={cellProps.getValue()} onChange={() => deleteCheckbox()} />;
        },
        id: '#',
      },
      {
        header: "Order ID",
        accessorKey: "taskId",
        enableColumnFilter: false,
        cell: (cellProps: any) => {
          return <OrdersId {...cellProps} />;
        },
      },
      {
        header: "Project",
        accessorKey: "project",
        enableColumnFilter: false,
        cell: (cellProps: any) => {
          return <Project {...cellProps} />;
        },
      },
      {
        header: "Tasks",
        accessorKey: "task",
        enableColumnFilter: false,
        cell: (cellProps: any) => {
          return <React.Fragment>
            <div className="d-flex">
              <div className="flex-grow-1 tasks_name">{cellProps.getValue()}</div>
              <div className="flex-shrink-0 ms-4">
                <ul className="list-inline tasks-list-menu mb-0">
                  <li className="list-inline-item">
                    <Button variant='link' href="/apps-tasks-details">
                      <i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                    </Button>
                  </li>
                  <li className="list-inline-item">
                    <Button variant='link' href="#" onClick={() => { const taskData = cellProps.row.original; handleCustomerClick(taskData); }}>
                      <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                    </Button>
                  </li>
                  <li className="list-inline-item">
                    <Button variant='link' href="#" className="remove-item-btn" onClick={() => { const taskData = cellProps.row.original; onClickDelete(taskData); }}>
                      <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </React.Fragment>;
        },
      },
      {
        header: "Created By",
        accessorKey: "creater",
        enableColumnFilter: false,
        cell: (cellProps: any) => {
          return <CreateBy {...cellProps} />;
        },
      },
      {
        header: "Assigned To",
        accessorKey: "subItem",
        enableColumnFilter: false,
        cell: (cell: any) => {
          const assigned = cell.getValue().map((item: any) => item.img ? item.img : item);
          return (<React.Fragment>
            <div className="avatar-group">
              {assigned.map((item: any, index: any) => (
                <Link key={index} href="#" className="avatar-group-item">
                  <img src={item} alt="" className="rounded-circle avatar-xxs" />
                  {/* process.env.REACT_APP_API_URL + "/images/users/" + */}
                </Link>
              ))}

            </div>
          </React.Fragment>);
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
    ],
    [handleCustomerClick, checkedAll]
  );

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteTask}
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
      <div className="row">
        <Col lg={12}>
          <div className="card" id="tasksList">
            <div className="card-header border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">All Tasks</h5>
                <div className="flex-shrink-0">
                  <div className="d-flex flex-wrap gap-2">
                    <button className="btn btn-danger add-btn me-1" onClick={() => { setIsEdit(false); toggle(); }}><i className="ri-add-line align-bottom me-1"></i> Create Task</button>
                    {isMultiDeleteButton && <button className="btn btn-soft-danger" onClick={() => setDeleteModalMulti(true)} ><i className="ri-delete-bin-2-line"></i></button>}
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body pt-0">
              {TaskData && TaskData.length ? (
                <TableContainer
                  columns={columns}
                  data={(TaskData || [])}
                  customPageSize={8}
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  theadClass="table-light text-muted"
                  thClass="table-light text-muted"
                  handleTaskClick={handleTaskClicks}
                  isTaskListFilter={true}
                  SearchPlaceholder="Search for tasks or something..."
                />
              ) : (<Loader error={error} />)
              }
              <ToastContainer closeButton={false} limit={1} />
            </div>
          </div>
        </Col>
      </div>


      <Modal
        show={modal}
        onHide={toggle}
        centered
        size="lg"
        className="border-0"
        modalClassName='modal fade zoomIn'
      >
        <Modal.Header className="p-3 bg-info-subtle" closeButton>
          <h5 className='modal-title'>
          {!!isEdit ? "Edit Task" : "Create Task"}
          </h5>
        </Modal.Header>
        <Form className="tablelist-form" onSubmit={(e: any) => {
          e.preventDefault();
          validation.handleSubmit();
          return false;
        }}>
          <Modal.Body className="modal-body">
            <Row className="g-3">
              <Col lg={12}>
                <Form.Label htmlFor="taskId-field" className="form-label">Order Id</Form.Label>
                <Form.Control
                  name="taskId"
                  id="taskId-field"
                  className="form-control"
                  placeholder="Enter Task Id "
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.taskId || ""}
                />
                {validation.touched.taskId && validation.errors.taskId ? (
                  <Form.Control.Feedback type="invalid">{validation.errors.taskId}</Form.Control.Feedback>
                ) : null}
              </Col>

              <Col lg={12}>
                <Form.Label htmlFor="projectName-field" className="form-label">Project Name</Form.Label>
                <Form.Control
                  name="project"
                  id="projectName-field"
                  className="form-control"
                  placeholder="Project name"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.project || ""}
                />
                {validation.touched.project && validation.errors.project ? (
                  <Form.Control.Feedback type="invalid">{validation.errors.project}</Form.Control.Feedback>
                ) : null}
              </Col>
              <Col lg={12}>
                <div>
                  <Form.Label htmlFor="tasksTitle-field" className="form-label">Title</Form.Label>
                  <Form.Control
                    name="task"
                    id="tasksTitle-field"
                    className="form-control"
                    placeholder="Title"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.task || ""}
                  />
                  {validation.touched.task && validation.errors.task ? (
                    <Form.Control.Feedback type="invalid">{validation.errors.task}</Form.Control.Feedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={12}>
                <Form.Label htmlFor="clientName-field" className="form-label">Client Name</Form.Label>
                <Form.Control
                  name="creater"
                  id="clientName-field"
                  className="form-control"
                  placeholder="Client name"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.creater || ""}
                />
                {validation.touched.creater && validation.errors.creater ? (
                  <Form.Control.Feedback type="invalid">{validation.errors.creater}</Form.Control.Feedback>
                ) : null}
              </Col>

              <Col lg={12}>
                <Form.Label className="form-label">Assigned To</Form.Label>
                <SimpleBar style={{ maxHeight: "95px" }}>
                  <ul className="list-unstyled vstack gap-2 mb-0">
                    {Assigned.map((item, key) => (<li key={key}>
                      <div className="form-check d-flex align-items-center">
                        <Form.Check.Input name="subItem" className="form-check-input me-3" type="checkbox"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={item.img}
                          id={item.imgId} />

                        <Form.Check.Label className="form-check-label d-flex align-items-center" htmlFor={item.imgId}>
                          <span className="flex-shrink-0">
                            <img src={item.img} alt="" className="avatar-xxs rounded-circle" />
                          </span>
                          <span className="flex-grow-1 ms-2">
                            {item.name}
                          </span>
                        </Form.Check.Label>
                        {validation.touched.subItem && validation.errors.subItem ? (
                          <Form.Control.Feedback type="invalid">{validation.errors.subItem}</Form.Control.Feedback>
                        ) : null}
                      </div>
                    </li>))}
                  </ul>
                </SimpleBar>
              </Col>

              <Col lg={6}>
                <Form.Label htmlFor="duedate-field" className="form-label">Due Date</Form.Label>
                <Flatpickr
                  name="dueDate"
                  id="duedate-field"
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
                  id="ticket-field"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ""}
                >
                  <option value="">Status</option>
                  <option value="New">New</option>
                  <option value="Inprogress">Inprogress</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
                {validation.touched.status && validation.errors.status ? (
                  <Form.Control.Feedback type="invalid">{validation.errors.status}</Form.Control.Feedback>
                ) : null}
              </Col>
              <Col lg={12}>
                <Form.Label htmlFor="priority-field" className="form-label">Priority</Form.Label>
                <select
                  name="priority"
                  className="form-select"
                  id="priority-field"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.priority || ""}
                >
                  <option value="">Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                {validation.touched.priority && validation.errors.priority ? (
                  <Form.Control.Feedback type="invalid">{validation.errors.priority}</Form.Control.Feedback>
                ) : null}
              </Col>
            </Row>
          </Modal.Body>
          <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <Button
                type="button"
                onClick={() => {
                  setModal(false);
                }}
                className="btn-light"
              >Close</Button>
              <button type="submit" className="btn btn-success" id="add-btn">{!!isEdit ? "Update Task" : "Add Task"}</button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default AllTasks;