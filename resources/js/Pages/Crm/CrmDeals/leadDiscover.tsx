

import React from "react";
import {
  Card,
  CardFooter,
  Button,
  Accordion
} from "react-bootstrap";

const leadDiscover = (props: any) => {

  return (
    <React.Fragment>
      <div className="col">
        <Accordion defaultActiveKey={"#leadDiscovered" + props.index}>
          <Accordion.Item eventKey={"#leadDiscovered" + props.index} className="arrow-none">
            <Accordion.Button
              className={"d-block card-header bg-" + props.deal.bgColor + "-subtle"}
            >

              <h5 className="card-title text-uppercase fw-semibold mb-1 fs-15">
                {props.deal.title}
              </h5>
              <p className="text-muted mb-0">
                {props.deal.price}{" "}
                <span className="fw-medium">{props.deal.deals} Deals</span>
              </p>
            </Accordion.Button>
            <Accordion.Body>
              {props.deal.subItems.map((subitem: any, subitemkey: any) => (
                <React.Fragment key={subitemkey}>
                  <Accordion className="mb-3">
                    <Accordion.Item eventKey="" className="arrow-none">
                      <Accordion.Header>


                        <div className="flex-shrink-0">
                          <img
                            src={subitem.img}
                            alt=""
                            className="avatar-xs rounded-circle"
                          />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="fs-14 mb-1">{subitem.title}</h6>
                          <p className="text-muted mb-0">
                            {subitem.price} - {subitem.date}
                          </p>
                        </div>

                      </Accordion.Header>
                      <Accordion.Body>
                        <Card
                          className={
                            subitem.isRibbon
                              ? "mb-1 ribbon-box ribbon-fill ribbon-sm"
                              : "mb-1"
                          }
                        >
                          {subitem.isRibbon && (
                            <div className="ribbon ribbon-info">
                              <i className="ri-flashlight-fill"></i>
                            </div>
                          )}

                          <Accordion.Body>
                            <h6 className="fs-14 mb-1">
                              {subitem.subTitle}{" "}
                              <small
                                className={
                                  "badge bg-" + subitem.timeDurationClass + "-subtle text-" + subitem.timeDurationClass
                                }
                              >
                                {subitem.timeDuration}
                              </small>
                            </h6>
                            <p className="text-muted">
                              As a company grows however, you find it's not as easy to
                              shout across
                            </p>
                            <ul className="list-unstyled vstack gap-2 mb-0">
                              <li>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 avatar-xxs text-muted">
                                    <i className="ri-question-answer-line"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    <h6 className="mb-0">Meeting with Thomas</h6>
                                    <small className="text-muted">
                                      Yesterday at 9:12AM
                                    </small>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 avatar-xxs text-muted">
                                    <i className="ri-mac-line"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    <h6 className="mb-0">Product Demo</h6>
                                    <small className="text-muted">
                                      Monday at 04:41PM
                                    </small>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 avatar-xxs text-muted">
                                    <i className="ri-earth-line"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    <h6 className="mb-0">Marketing Team Meeting</h6>
                                    <small className="text-muted">
                                      Monday at 04:41PM
                                    </small>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </Accordion.Body>
                          <CardFooter className="hstack gap-2">
                            <Button variant="primary" className="btn-sm w-100">
                              <i className="ri-phone-line align-bottom me-1"></i> Call
                            </Button>
                            <Button variant="secondary" className="btn-sm w-100">
                              <i className="ri-question-answer-line align-bottom me-1"></i>{" "}
                              Message
                            </Button>
                          </CardFooter>
                        </Card>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </React.Fragment>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </React.Fragment>
  )
}

export default leadDiscover;
