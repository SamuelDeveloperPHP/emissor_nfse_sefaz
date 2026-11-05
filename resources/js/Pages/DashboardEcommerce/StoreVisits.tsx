import React from 'react';
import { Card, Col, Dropdown } from 'react-bootstrap';
import { StoreVisitsCharts } from './DashboardEcommerceCharts';

const StoreVisits = () => {
    return (
        <React.Fragment>
            <Col xl={4}>
                <Card className="card-height-100">
                    <Card.Header className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Store Visits by Source</h4>
                        <div className="flex-shrink-0">
                        <Dropdown className="card-header-dropdown" >
                                <Dropdown.Toggle as="a" className="text-reset dropdown-btn arrow-none" role="button">
                                    <span className="text-muted">Report<i className="mdi mdi-chevron-down ms-1"></i></span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-end">
                                    <Dropdown.Item>Download Report</Dropdown.Item>
                                    <Dropdown.Item>Export</Dropdown.Item>
                                    <Dropdown.Item>Import</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Card.Header>

                    <Card.Body>
                        <StoreVisitsCharts dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]' />

                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default StoreVisits;