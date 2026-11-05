import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { CryptoicoWidgets } from '../../../common/data';

const Widgets = () => {
    return (
        <React.Fragment>
            {(CryptoicoWidgets || []).map((item, key) => (
                <Col key={key}>
                    <Card>
                        <Card.Body className="d-flex">
                            <div className="flex-grow-1">
                                <h4>{item.counter}</h4>
                                <h6 className="text-muted fs-13 mb-0">{item.label}</h6>
                            </div>
                            <div className="flex-shrink-0 avatar-sm">
                                <div className={"avatar-title bg-" + item.iconClass + "-subtle text-" + item.iconClass + " fs-22 rounded"}>
                                    <i className={item.icon}></i>
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