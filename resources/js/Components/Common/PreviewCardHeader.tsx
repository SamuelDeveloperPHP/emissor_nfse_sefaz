import React from 'react';
import { Card, Form} from 'react-bootstrap';

const PreviewCardHeader = ({ title }:any) => {
    return (
        <React.Fragment>
            <Card.Header className="align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">{title}</h4>
                <div className="flex-shrink-0">
                    <div className="form-check form-switch form-switch-right form-switch-md">
                    <Form.Label className="form-label text-muted">Show Code</Form.Label>
                        <Form.Check.Input className="form-check-input code-switcher" type="checkbox" />
                    </div>
                </div>
            </Card.Header>
        </React.Fragment>
    );
}

export default PreviewCardHeader;