import React, { useState, useEffect, useCallback } from 'react';
import { Button, Card, Col, Container, Dropdown, Form, Modal, Offcanvas, Row } from 'react-bootstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import DeleteModal from "../../../Components/Common/DeleteModal";
import { ToastContainer } from 'react-toastify';

//User Images
import avatar2 from '../../../../images/users/avatar-2.jpg';
import userdummyimg from '../../../../images/users/user-dummy-img.jpg';

//Small Images
import smallImage9 from '../../../../images/small/img-9.jpg';
//redux
import { useSelector, useDispatch } from 'react-redux'

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { createSelector } from 'reselect';
import { Head, Link } from '@inertiajs/react';
import Layout from '../../../Layouts';
import { onAddTeamData, onDeleteTeamData, onGetTeamData, onUpdateTeamData } from '../../../slices/team/thunk';

const Team = () => {

    const dispatch: any = useDispatch();

    const selectteamData = createSelector(
        (state: any) => state.Team,
        (teamData: any) => teamData.teamData
    );
    // Inside your component
    const teamData: any = useSelector(selectteamData);

    const [team, setTeam] = useState<any>(null);
    const [deleteModal, setDeleteModal] = useState<any>(false);
    const [teamList, setTeamlist] = useState<any>([]);

    //Modal  
    const [teamMem, setTeamMem] = useState<any>('');
    const [isEdit, setIsEdit] = useState<any>(false);
    const [modal, setModal] = useState<any>(false);

    useEffect(() => {
        dispatch(onGetTeamData());
    }, [dispatch]);

    useEffect(() => {
        setTeam(teamData);
        setTeamlist(teamData);
    }, [teamData]);

    const toggle = useCallback(() => {
        if (modal) {
            setModal(false);
            setTeamMem(null);
        } else {
            setModal(true);
        }
    }, [modal]);

    // Update To do
    const handleTeamClick = useCallback((arg: any) => {
        const teamMem: any = arg;
        setTeamMem({
            id: teamMem.id,
            name: teamMem.name,
            designation: teamMem.designation,
            projectCount: teamMem.projectCount,
            taskCount: teamMem.taskCount,
        });

        setIsEdit(true);
        toggle();
    }, [toggle]);

    // Add To do
    const handleTeamClicks = () => {
        setTeamMem("");
        setModal(!modal);
        setIsEdit(false);
        toggle();
    };

    // delete
    const onClickData = (team: any) => {
        setTeam(team);
        setDeleteModal(true);
    };

    const handleDeleteTeamData = () => {
        if (team) {
            dispatch(onDeleteTeamData(team.id));
            setDeleteModal(false);
        }
    };

    useEffect(() => {
        const list = document.querySelectorAll(".team-list");
        const buttonGroups = document.querySelectorAll('.filter-button');
        for (let i = 0; i < buttonGroups.length; i++) {
            buttonGroups[i].addEventListener('click', onButtonGroupClick);
        }

        function onButtonGroupClick(event: any) {
            const target = event.target as HTMLButtonElement;
            const targetId = target.id;
            const parentTargetId = target.parentElement?.id;

            if (targetId === 'list-view-button' || parentTargetId === 'list-view-button') {
                document.getElementById("list-view-button")?.classList.add("active");
                document.getElementById("grid-view-button")?.classList.remove("active");

                list.forEach((el) => {
                    el.classList.add("list-view-filter");
                    el.classList.remove("grid-view-filter");
                });
            } else {
                document.getElementById("grid-view-button")?.classList.add("active");
                document.getElementById("list-view-button")?.classList.remove("active");

                list.forEach((el) => {
                    el.classList.remove("list-view-filter");
                    el.classList.add("grid-view-filter");
                });
            }
        }
    }, []);

    const favouriteBtn = (ele: any) => {
        if (ele.closest("button").classList.contains("active")) {
            ele.closest("button").classList.remove("active");
        } else {
            ele.closest("button").classList.add("active");
        }
    };

    const searchList = (e: any) => {
        let inputVal = e.target.value.toLowerCase();

        const filterItems = (arr: any, query: string) => {
            return arr.filter((el: any) => {
                return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
            });
        };

        let filterData = filterItems(teamData, inputVal);
        setTeamlist(filterData);

        const noResultElement = document.getElementById("noresult");
        const teamListElement = document.getElementById("teamlist");

        if (filterData.length === 0) {
            if (noResultElement) {
                noResultElement.style.display = "block";
            }
            if (teamListElement) {
                teamListElement.style.display = "none";
            }
        } else {
            if (noResultElement) {
                noResultElement.style.display = "none";
            }
            if (teamListElement) {
                teamListElement.style.display = "block";
            }
        }
    };

    //OffCanvas  
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [sideBar, setSideBar] = useState<any>([]);

    //Dropdown
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const toggledropDown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // validation
    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            name: (teamMem && teamMem.name) || '',
            designation: (teamMem && teamMem.designation) || '',
            projectCount: (teamMem && teamMem.projectCount) || '',
            taskCount: (teamMem && teamMem.taskCount) || '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter team Name"),
            designation: Yup.string().required("Please Enter Your designation"),
            projectCount: Yup.number().required("Please Enter Project Count"),
            taskCount: Yup.number().required("Please Enter Task Count"),
        }),
        onSubmit: (values: any) => {
            if (isEdit) {
                const updateTeamData = {
                    id: teamMem ? teamMem.id : 0,
                    name: values.name,
                    designation: values.designation,
                    projectCount: values.projectCount,
                    taskCount: values.taskCount
                };
                // save edit Team data
                dispatch(onUpdateTeamData(updateTeamData));
                validation.resetForm();
            } else {
                const newTeamData = {
                    id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                    name: values.name,
                    designation: values.designation,
                    projectCount: 0 || values.projectCount,
                    taskCount: 0 || values.taskCount,
                    backgroundImg: smallImage9
                };
                // save new TeamData
                dispatch(onAddTeamData(newTeamData));
                validation.resetForm();
            }
            toggle();
        },
    });
    return (
        <React.Fragment>
            <Head title='Team | Velzon - React Admin & Dashboard Template' />
            <ToastContainer closeButton={false} />
            <DeleteModal
                show={deleteModal}
                onDeleteClick={() => handleDeleteTeamData()}
                onCloseClick={() => setDeleteModal(false)}
            />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Team" pageTitle="Pages" />
                    <Card>
                        <Card.Body>
                            <Row className="g-2">
                                <Col sm={4}>
                                    <div className="search-box">
                                        <Form.Control type="text" className="form-control" placeholder="Search for name or designation..." onChange={(e) => searchList(e.target.value)} />
                                        <i className="ri-search-line search-icon"></i>
                                    </div>
                                </Col>
                                <Col className="col-sm-auto ms-auto">
                                    <div className="list-grid-nav hstack gap-1">

                                        <Button variant="info" id="grid-view-button" className="btn btn-soft-info nav-link btn-icon fs-14 active filter-button"><i className="ri-grid-fill"></i></Button>
                                        <Button variant="info" id="list-view-button" className="btn btn-soft-info nav-link  btn-icon fs-14 filter-button"><i className="ri-list-unordered"></i></Button>
                                        <Dropdown
                                            show={dropdownOpen}
                                            onClick={toggledropDown}>
                                            <Dropdown.Toggle type="button" className="btn btn-soft-info btn-icon fs-14 arrow-none">
                                                <i className="ri-more-2-fill"></i>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <li><Link className="dropdown-item" href="#">All</Link></li>
                                                <li><Link className="dropdown-item" href="#">Last Week</Link></li>
                                                <li><Link className="dropdown-item" href="#">Last Month</Link></li>
                                                <li><Link className="dropdown-item" href="#">Last Year</Link></li>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Button variant="success" onClick={() => handleTeamClicks()}>
                                            <i className="ri-add-fill me-1 align-bottom"></i> Add Members</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <Row>
                        <Col lg={12}>
                            <div id="teamlist">
                                <Row className="team-list grid-view-filter">
                                    {(teamList || []).map((item: any, key: any) => (
                                        <Col key={key}>
                                            <Card className="team-box">
                                                <div className="team-cover">
                                                    <img src={item.backgroundImg} alt="" className="img-fluid" />
                                                </div>
                                                <Card.Body className="p-4">
                                                    <Row className="align-items-center team-row">
                                                        <Col className="team-settings">
                                                            <Row>
                                                                <Col>
                                                                    <div className="flex-shrink-0 me-2">
                                                                        <button type="button" className="btn btn-light btn-icon rounded-circle btn-sm favourite-btn" onClick={(e) => favouriteBtn(e.target)}>
                                                                            <i className="ri-star-fill fs-14"></i>
                                                                        </button>
                                                                    </div>
                                                                </Col>
                                                                <Dropdown dir='start' className="col text-end">
                                                                    <Dropdown.Toggle as="a" id="dropdown.MenuLink2" role="button" className='arrow-none'>
                                                                        <i className="ri-more-fill fs-17"></i>
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu>
                                                                        <Dropdown.Item className="dropdown-item edit-list" href="#addmemberModal" onClick={() => handleTeamClick(item)}>
                                                                            <i className="ri-pencil-line me-2 align-bottom text-muted"></i>Edit
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item className="dropdown-item remove-list" href="#removeMemberModal" onClick={() => onClickData(item)}>
                                                                            <i className="ri-delete-bin-5-line me-2 align-bottom text-muted"></i>Remove
                                                                        </Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </Row>
                                                        </Col>
                                                        <Col lg={4} className="col">
                                                            <div className="team-profile-img">

                                                                <div className="avatar-lg img-thumbnail rounded-circle flex-shrink-0">
                                                                    {item.userImage != null ?
                                                                        <img src={item.userImage} alt="" className="img-fluid d-block rounded-circle" />

                                                                        :
                                                                        <div className="avatar-title text-uppercase border rounded-circle bg-light text-primary">
                                                                            {item.name.charAt(0) + item.name.split(" ").slice(-1).toString().charAt(0)}
                                                                        </div>}
                                                                </div>
                                                                <div className="team-content">
                                                                    <Link href="#" onClick={() => { setIsOpen(!isOpen); setSideBar(item); }}><h5 className="fs-16 mb-1">{item.name}</h5></Link>
                                                                    <p className="text-muted mb-0">{item.designation}</p>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col lg={4} className="col">
                                                            <Row className="text-muted text-center">
                                                                <Col xs={6} className="border-end border-end-dashed">
                                                                    <h5 className="mb-1">{item.projectCount}</h5>
                                                                    <p className="text-muted mb-0">Projects</p>
                                                                </Col>
                                                                <Col xs={6}>
                                                                    <h5 className="mb-1">{item.taskCount}</h5>
                                                                    <p className="text-muted mb-0">Tasks</p>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col lg={2} className="col">
                                                            <div className="text-end">
                                                                <Link href="/pages-profile" className="btn btn-light view-btn">View Profile</Link>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}

                                    <Col lg={12}>
                                        <div className="text-center mb-3">
                                            <Link href="#" className="text-success"><i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i> Load More </Link>
                                        </div>
                                    </Col>
                                </Row>

                                <div className="modal fade" id="addmembers" tabIndex={1} aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <Modal show={modal} onHide={toggle} centered>
                                            <Modal.Body>
                                                <Form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}>
                                                    <Row>
                                                        <Col lg={12}>

                                                            <input type="hidden" id="memberid-input" className="form-control" defaultValue="" />
                                                            <div className="px-1 pt-1">
                                                                <div className="modal-team-cover position-relative mb-0 mt-n4 mx-n4 rounded-top overflow-hidden">
                                                                    <img src={smallImage9} alt="" id="cover-img" className="img-fluid" />

                                                                    <div className="d-flex position-absolute start-0 end-0 top-0 p-3">
                                                                        <div className="flex-grow-1">
                                                                            <h5 className="modal-title text-white" id="createMemberLabel">{!isEdit ? "Add New Members" : "Edit Member"}</h5>
                                                                        </div>
                                                                        <div className="flex-shrink-0">
                                                                            <div className="d-flex gap-3 align-items-center">
                                                                                <div>
                                                                                    <label htmlFor="cover-image-input" className="mb-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Select Cover Image">
                                                                                        <div className="avatar-xs">
                                                                                            <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                                                                                <i className="ri-image-fill"></i>
                                                                                            </div>
                                                                                        </div>
                                                                                    </label>
                                                                                    <input className="form-control d-none" defaultValue="" id="cover-image-input" type="file" accept="image/png, image/gif, image/jpeg" />
                                                                                </div>
                                                                                <button type="button" className="btn-close btn-close-white" onClick={() => setModal(false)} id="createMemberBtn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-center mb-4 mt-n5 pt-2">
                                                                <div className="position-relative d-inline-block">
                                                                    <div className="position-absolute bottom-0 end-0">
                                                                        <label htmlFor="member-image-input" className="mb-0" data-bs-toggle="tooltip" data-bs-placement="right" title="Select Member Image">
                                                                            <div className="avatar-xs">
                                                                                <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                                                                    <i className="ri-image-fill"></i>
                                                                                </div>
                                                                            </div>
                                                                        </label>
                                                                        <input className="form-control d-none" defaultValue="" id="member-image-input" type="file" accept="image/png, image/gif, image/jpeg" />
                                                                    </div>
                                                                    <div className="avatar-lg">
                                                                        <div className="avatar-title bg-light rounded-circle">
                                                                            <img src={userdummyimg} alt=" " id="member-img" className="avatar-md rounded-circle h-auto" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="mb-3">
                                                                <Form.Label htmlFor="teammembersName" className="form-label">Name</Form.Label>
                                                                <Form.Control type="text" className="form-control" id="teammembersName" placeholder="Enter name"
                                                                    name='name'
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.name || ""}
                                                                    isInvalid={
                                                                        validation.touched.name && validation.errors.name ? true : false
                                                                    }
                                                                />
                                                                {validation.touched.name && validation.errors.name ? (
                                                                    <Form.Control.Feedback type="invalid">{validation.errors.name}</Form.Control.Feedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col lg={12}>
                                                            <div className="mb-3">
                                                                <Form.Label htmlFor="designation" >Designation</Form.Label>
                                                                <Form.Control type="text" id="designation" placeholder="Enter designation" name='designation'
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
                                                        </Col>

                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <Form.Label htmlFor="projectCount" >project</Form.Label>
                                                                <Form.Control type="number" id="projectCount" placeholder="Enter projects" name='projectCount'
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.projectCount || ""}
                                                                    isInvalid={
                                                                        validation.touched.projectCount && validation.errors.projectCount ? true : false
                                                                    }
                                                                />
                                                                {validation.touched.projectCount && validation.errors.projectCount ? (
                                                                    <Form.Control.Feedback type="invalid">{validation.errors.projectCount}</Form.Control.Feedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col lg={6}>
                                                        <div className="mb-3">
                                                                <Form.Label htmlFor="taskCount" >Task</Form.Label>
                                                                <Form.Control type="number" id="taskCount" placeholder="Enter projects" name='taskCount'
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.taskCount || ""}
                                                                    isInvalid={
                                                                        validation.touched.taskCount && validation.errors.taskCount ? true : false
                                                                    }
                                                                />
                                                                {validation.touched.taskCount && validation.errors.taskCount ? (
                                                                    <Form.Control.Feedback type="invalid">{validation.errors.taskCount}</Form.Control.Feedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col lg={12}>
                                                            <div className="hstack gap-2 justify-content-end">
                                                                <button type="button" className="btn btn-light" onClick={() => setModal(false)}>Close</button>
                                                                <button type="submit" className="btn btn-success" id="addNewMember">{!isEdit ? "Add Member" : "Save"}</button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                </div>

                                <Offcanvas
                                    show={isOpen}
                                    direction="end"
                                    onHide={() => setIsOpen(!isOpen)}
                                    className="offcanvas-end border-0"
                                    tabIndex={1}
                                    id="member-overview"
                                >
                                    <Offcanvas.Body className="profile-offcanvas p-0">
                                        <div className="team-cover">
                                            <img src={sideBar.backgroundImg || smallImage9} alt="" className="img-fluid" />
                                        </div>
                                        <div className="p-3">
                                            <div className="team-settings">
                                                <Row>
                                                    <Col>
                                                        <button type="button" className="btn btn-light btn-icon rounded-circle btn-sm favourite-btn "> <i className="ri-star-fill fs-14"></i> </button>
                                                    </Col>
                                                    <Dropdown dir='start' className="col text-end">
                                                        <Dropdown.Toggle as="a" id="dropdown.MenuLink14" role="button" className='arrow-none'>
                                                            <i className="ri-more-fill fs-17"></i>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item><i className="ri-star-line me-2 align-middle" />Favorites</Dropdown.Item>
                                                            <Dropdown.Item><i className="ri-delete-bin-5-line me-2 align-middle" />Delete</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Row>
                                            </div>
                                        </div>
                                        <div className="p-3 text-center">
                                            <img src={sideBar.userImage || avatar2} alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto" />
                                            <div className="mt-3">
                                                <h5 className="fs-15 profile-name"><Link href="#" className="link-primary">{sideBar.name || "Nancy Martino"}</Link></h5>
                                                <p className="text-muted profile-designation">{sideBar.designation || "Team Leader & HR"}</p>
                                            </div>
                                            <div className="hstack gap-2 justify-content-center mt-4">
                                                <div className="avatar-xs">
                                                    <Link href="#" className="avatar-title bg-secondary-subtle text-secondary rounded fs-16">
                                                        <i className="ri-facebook-fill"></i>
                                                    </Link>
                                                </div>
                                                <div className="avatar-xs">
                                                    <Link href="#" className="avatar-title bg-success-subtle text-success rounded fs-16">
                                                        <i className="ri-slack-fill"></i>
                                                    </Link>
                                                </div>
                                                <div className="avatar-xs">
                                                    <Link href="#" className="avatar-title bg-info-subtle text-info rounded fs-16">
                                                        <i className="ri-linkedin-fill"></i>
                                                    </Link>
                                                </div>
                                                <div className="avatar-xs">
                                                    <Link href="#" className="avatar-title bg-danger-subtle text-danger rounded fs-16">
                                                        <i className="ri-dribbble-fill"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <Row className="g-0 text-center">
                                            <Col xs={6}>
                                                <div className="p-3 border border-dashed border-start-0">
                                                    <h5 className="mb-1 profile-project">{sideBar.projectCount || "124"}</h5>
                                                    <p className="text-muted mb-0">Projects</p>
                                                </div>
                                            </Col>
                                            <Col xs={6}>
                                                <div className="p-3 border border-dashed border-start-0">
                                                    <h5 className="mb-1 profile-task">{sideBar.taskCount || "81"}</h5>
                                                    <p className="text-muted mb-0">Tasks</p>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="p-3">
                                            <h5 className="fs-15 mb-3">Personal Details</h5>
                                            <div className="mb-3">
                                                <p className="text-muted text-uppercase fw-semibold fs-12 mb-2">Number</p>
                                                <h6>+(256) 2451 8974</h6>
                                            </div>
                                            <div className="mb-3">
                                                <p className="text-muted text-uppercase fw-semibold fs-12 mb-2">Email</p>
                                                <h6>nancymartino@email.com</h6>
                                            </div>
                                            <div>
                                                <p className="text-muted text-uppercase fw-semibold fs-12 mb-2">Location</p>
                                                <h6 className="mb-0">Carson City - USA</h6>
                                            </div>
                                        </div>
                                        <div className="p-3 border-top">
                                            <h5 className="fs-15 mb-4">File Manager</h5>
                                            <div className="d-flex mb-3">
                                                <div className="flex-shrink-0 avatar-xs">
                                                    <div className="avatar-title bg-danger-subtle text-danger rounded fs-16">
                                                        <i className="ri-image-2-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6 className="mb-1"><Link href="#">Images</Link></h6>
                                                    <p className="text-muted mb-0">4469 Files</p>
                                                </div>
                                                <div className="text-muted">
                                                    12 GB
                                                </div>
                                            </div>
                                            <div className="d-flex mb-3">
                                                <div className="flex-shrink-0 avatar-xs">
                                                    <div className="avatar-title bg-secondary-subtle text-secondary rounded fs-16">
                                                        <i className="ri-file-zip-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6 className="mb-1"><Link href="#">Documents</Link></h6>
                                                    <p className="text-muted mb-0">46 Files</p>
                                                </div>
                                                <div className="text-muted">
                                                    3.46 GB
                                                </div>
                                            </div>
                                            <div className="d-flex mb-3">
                                                <div className="flex-shrink-0 avatar-xs">
                                                    <div className="avatar-title bg-success-subtle text-success rounded fs-16">
                                                        <i className="ri-live-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6 className="mb-1"><Link href="#">Media</Link></h6>
                                                    <p className="text-muted mb-0">124 Files</p>
                                                </div>
                                                <div className="text-muted">
                                                    4.3 GB
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 avatar-xs">
                                                    <div className="avatar-title bg-primary-subtle text-primary rounded fs-16">
                                                        <i className="ri-error-warning-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6 className="mb-1"><Link href="#">Others</Link></h6>
                                                    <p className="text-muted mb-0">18 Files</p>
                                                </div>
                                                <div className="text-muted">
                                                    846 MB
                                                </div>
                                            </div>
                                        </div>
                                    </Offcanvas.Body>
                                    <div className="offcanvas-foorter border p-3 hstack gap-3 text-center position-relative">
                                        <button className="btn btn-light w-100"><i className="ri-question-answer-fill align-bottom ms-1"></i> Send Message</button>
                                        <Link href="/pages-profile" className="btn btn-primary w-100"><i className="ri-user-3-fill align-bottom ms-1"></i> View Profile</Link>
                                    </div>
                                </Offcanvas>
                            </div>
                            <div className="py-4 mt-4 text-center" id="noresult" style={{ display: "none" }}>
                                <i className="ri-search-line display-5 text-success"></i>
                                <h5 className="mt-4">Sorry! No Result Found</h5>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

Team.layout = (page: any) => <Layout children={page} />

export default Team;