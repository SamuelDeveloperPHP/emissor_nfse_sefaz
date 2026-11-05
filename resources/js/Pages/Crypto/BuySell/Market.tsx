import React, { useMemo } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { market } from '../../../common/data';
import TableContainer from '../../../Components/Common/TableContainer';
import {
    Price,
    Pairs,
    HighPrice,
    LowPrice,
    MarketVolume
} from "./MarketCol";
import { Link } from '@inertiajs/react';

const Market = () => {
    const columns = useMemo(
        () => [
            {
                header: "Currency",
                cell: (market:any) => (
                    <>
                        <div className="d-flex align-items-center fw-medium">
                            <img src={market.row.original.img} alt="" className="avatar-xxs me-2" />
                            <Link href="#" className="currency_name">{market.getValue()}</Link>
                        </div>
                    </>
                ),
            },
            {
                header: "Price",
                accessorKey: "price",
                enableColumnFilter: false,
                cell: (cellProps:any) => {
                    return <Price {...cellProps} />;
                },
            },
            {
                header: "Pairs",
                accessorKey: "pairs",
                enableColumnFilter: false,
                cell: (cellProps:any) => {
                    return <Pairs {...cellProps} />;
                },
            },
            {
                header: "24 High",
                accessorKey: "high",
                enableColumnFilter: false,
                cell: (cellProps:any) => {
                    return <HighPrice {...cellProps} />;
                },
            },
            {
                header: "24 Low",
                accessorKey: "low",
                enableColumnFilter: false,
                cell: (cellProps:any) => {
                    return <LowPrice {...cellProps} />;
                },
            },
            {
                header: "Market Volume",
                accessorKey: "marketVolume",
                enableColumnFilter: false,
                cell: (cellProps:any) => {
                    return <MarketVolume {...cellProps} />;
                },
            },
            {
                header: "Volume %",
                cell: (market:any) => (
                    <>
                        <h6 className={"text-" + market.row.original.iconClass + " fs-13 mb-0"}>
                            <i className={market.row.original.icon + " align-middle me-1"}></i>
                            {market.getValue()}
                        </h6>
                    </>
                ),
            },
            {
                header: "Action",
                cell: () => (
                    <>
                        <button className="btn btn-sm btn-soft-info">Trade Now</button>
                    </>
                ),
            },
        ],
        []
    );
    return (
        <React.Fragment>
            <Card>
                <Card.Header className="border-bottom-dashed">
                    <Row className="align-items-center">
                        <Col xs={3}>
                            <h5 className="card-title mb-0">Markets</h5>
                        </Col>
                        <div className="col-auto ms-auto">
                            <div className="d-flex gap-2">
                                <button className="btn btn-success"><i className="ri-equalizer-line align-bottom me-1"></i> Filters</button>
                            </div>
                        </div>
                    </Row>
                </Card.Header>
                <Card.Body className="p-0 border-bottom border-bottom-dashed">
                    <div className="search-box">
                        <input type="text" className="form-control search border-0 py-3" placeholder="Search to currency..." />
                        <i className="ri-search-line search-icon"></i>
                    </div>
                </Card.Body>
                <Card.Body>
                    <TableContainer
                        columns={columns}
                        data={(market || [])}
                        isGlobalFilter={false}
                        customPageSize={8}
                        divClass="table-responsive table-card"
                        tableClass="align-middle table-nowrap"
                        theadClass="table-light text-muted"
                    />
                </Card.Body>
            </Card>
        </React.Fragment>
    );
};

export default Market;