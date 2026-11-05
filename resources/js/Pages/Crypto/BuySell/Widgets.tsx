import React from "react";
import CountUp from "react-countup";
import { Card, Col } from "react-bootstrap";
import { buysellWidgets } from "../../../common/data";

const Widgets = () => {
  return (
    <React.Fragment>
      {buysellWidgets.map((item, key) => (
        <Col xl={3} sm={6} key={key}>
          <Card className="card-animate">
            <Card.Body>
              <div className="d-flex">
                <div className="flex-grow-1">
                  <h6 className="text-muted mb-3">{item.title}</h6>
                  <h2 className="mb-0">
                    $
                    <span className="counter-value">
                      <CountUp start={0} end={item.counter} duration={3} />
                    </span>
                    <small className="text-muted fs-13">.{item.decimal}k</small>
                  </h2>
                </div>
                <div className="flex-shrink-0 avatar-sm">
                  <div
                    className={
                      "avatar-title fs-22 rounded bg-" +item.iconClass +"-subtle text-" +item.iconClass
                    }
                  >
                    <i className={item.icon}></i>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  );
};

export default Widgets;
