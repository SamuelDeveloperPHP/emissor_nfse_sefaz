import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import AddEditJobCandidateList from "../../../../Components/Common/AddEditJobCandidateList";
import Pagination from "../../../../Components/Common/Pagination";
import { Head, Link} from "@inertiajs/react";
import { ongetCandidateList } from "../../../../slices/thunk";
import Layout from "../../../../Layouts";
import { jobCandidates } from "../../../../common/data/appsJobs";


const CandidateList = () => {

  const dispatch: any = useDispatch();

  const selectJobList = createSelector(
    (state: any) => state.Jobs,
    (job: any) => ({
      candidatelist: job.candidatelist,
    })
  );
  // Inside your component
  const {candidatelist}: any = useSelector(selectJobList);

  useEffect(() => {
    dispatch(ongetCandidateList());
  }, [dispatch]);

  //add modal state
  const [modal, setModal] = useState<boolean>(false);
  const handleAddModal = useCallback(() => { setModal(!modal); setEditItem(null); }, [modal]);
  const handleShow = () => setModal(true)

  const [editItem, setEditItem] = useState<any>();


useEffect(() => {
  setCalendarList(candidatelist)
  }, [dispatch,candidatelist])


  const [isBookmarkClick, setIsBookmarkClick] = useState<boolean>(false);

  const sortbyname = [
    { label: "All", value: "All" },
    { label: "Today", value: "Today" },
    { label: "Yesterday", value: "Yesterday" },
    { label: "Last 7 Days", value: "Last 7 Days" },
    { label: "Last 30 Days", value: "Last 30 Days" },
    { label: "Thise Month", value: "Thise Month" },
    { label: "Last Year", value: "Last Year" },
  ];

  
  // const [candidateData, setCandidateData] = useState<any>([]);
  const [calendarList, setCalendarList] = useState<any>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  //pagination
  const perPageData = 8;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;
  const currentdata = useMemo(() => jobCandidates?.slice(indexOfFirst, indexOfLast), [indexOfFirst, indexOfLast])

  useEffect(() => {
    setCalendarList(currentdata)
  }, [currentdata]);

  // search
  const handleSearch = (ele: any) => {
    let item = ele.value;

    if (item === "All Tasks") {
      setCalendarList([...candidatelist]);
    } else {
      handleSearchData({ data: candidatelist, item: item, setState: setCalendarList })
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
      <Head title="Candidate List View | Velzon -  Admin & Dashboard Template" />
      <div className="page-content">
        <Container fluid className="container-fluid">
          <BreadCrumb title="List View" pageTitle="Candidates Lists" />

          <Row className="g-4 mb-4">
            <Col className="col-sm">
              <div>
                <Button onClick={handleAddModal} className="btn btn-success">
                  <i className="ri-add-line align-bottom me-1"></i> Add
                  Candidate
                </Button>
              </div>
            </Col>
            <Col className="col-sm">
              <div className="d-md-flex justify-content-sm-end gap-2">
                <div className="search-box ms-md-2 flex-shrink-0 mb-3 mb-md-0">
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="searchJob"
                    autoComplete="off"
                    placeholder="Search for candidate name or designation..."
                    onChange={(e: any) => handleSearch(e.target)}
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>

                <select
                  className="form-control w-md"
                  data-choices
                  data-choices-search-false
                >
                  {sortbyname.map((item: any, key: any) => (
                    <option key={key} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </div>
            </Col>
          </Row>

          <Row className="gy-2 mb-2" id="candidate-list">
            {(calendarList || []).map((item: any, key: any) => (
              <Col className="col-lg-12" key={key}>
                <Card className="mb-0">
                  <Card.Body>
                    <div className="d-lg-flex align-items-center">
                      <div className="flex-shrink-0">
                        {item.nickname ? (
                          <div className="avatar-sm rounded">
                            <div className="avatar-title border bg-light text-primary rounded text-uppercase fs-16">
                              {item.nickname}
                            </div>
                          </div>
                        ) : (
                          <div className="avatar-sm rounded h-100">
                            <img
                              src={item.userImg}
                              alt=""
                              className="member-img img-fluid d-block rounded"
                            ></img>
                          </div>
                        )}
                      </div>
                      <div className="ms-3">
                        <Link href="/pages-profile">
                          <h5 className="fs-16 mb-2">{item.candidateName}</h5>
                        </Link>
                        <p className="text-muted mb-0">{item.designation}</p>
                      </div>
                      <div className="d-flex gap-4 mt-0 text-muted mx-auto">
                        <div>
                          <i className="ri-map-pin-2-line text-primary me-1 align-bottom"></i>{" "}
                          {item.location}
                        </div>
                        <div>
                          <i className="ri-time-line text-primary me-1 align-bottom"></i>{" "}
                          {item.type === "Part Time" ?
                            <span className="badge bg-danger-subtle text-danger">{item.type}</span>
                            :
                            item.type === "Full Time" ?
                              <span className="badge bg-success-subtle text-success">{item.type}</span>
                              :
                              <span className="badge bg-info-subtle text-info">{item.type}</span>
                          }
                        </div>
                      </div>
                      <div className="d-flex flex-wrap gap-2 align-items-center mx-auto">
                        <div className="badge text-bg-success">
                          <i className="mdi mdi-star me-1"></i>
                          {item.rating1}
                        </div>
                        <div className="text-muted">{item.rating2}k Ratings</div>
                      </div>
                      <div>
                        <Link href="#" className="btn btn-soft-success">
                          View Details
                        </Link>
                        <Link
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();

                            setIsBookmarkClick(!isBookmarkClick)
                          }}
                          className={isBookmarkClick ? "btn btn-ghost-danger btn-icon custom-toggle active" : "btn btn-ghost-danger btn-icon custom-toggle"}
                        >
                          {!isBookmarkClick ?
                            <span className="icon-on">
                              <i className="ri-bookmark-line align-bottom"></i>
                            </span>
                            :
                            <span className="icon-off">
                              <i className="ri-bookmark-3-fill align-bottom"></i>
                            </span>
                          }
                        </Link>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>


          <Pagination
            perPageData={perPageData}
            data={jobCandidates}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          <AddEditJobCandidateList show={modal} editItem={editItem} handleShow={handleShow} handleClose={handleAddModal} />
          <ToastContainer closeButton={false} limit={1} />

        </Container>
      </div>
    </React.Fragment>
  );
};
CandidateList.layout = (page: any) => <Layout children={page} />
export default CandidateList;
