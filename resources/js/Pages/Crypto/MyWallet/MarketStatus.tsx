import React, { useMemo } from 'react';
import { Card } from 'react-bootstrap';
import TableContainer from '../../../Components/Common/TableContainer';
import { marketStatus } from "../../../common/data";

import { Quantity, AvgPrice, CurrentValue, Returns } from "./MarketStatusCol";
import { Link } from '@inertiajs/react';

const MarketStatus = () => {
    const columns = useMemo(
        () => [
            {
                header: "Name",
                cell: (wallet:any) => (
                    <>
                        <div className="d-flex align-items-center fw-medium">
                            <img src={wallet.row.original.img} alt="" className="avatar-xxs me-2" />
                            <Link href="#" className="currency_name">{wallet.getValue()}</Link>
                        </div>
                    </>
                ),
            },
            {
                header: "Quantity",
                accessorKey: "quantity",
                enableColumnFilter: false,
                cell: (cellProps:any) => {
                    return <Quantity {...cellProps} />;
                },
            },
            {
                header: "Avg Price",
                accessorKey: "avgPrice",
                enableColumnFilter: false,
                cell: (cellProps:any) => {
                    return <AvgPrice {...cellProps} />;
                },
            },
            {
                header: "Current Value",
                accessorKey: "value",
                enableColumnFilter: false,
                cell: (cellProps:any) => {
                    return <CurrentValue {...cellProps} />;
                },
            },
            {
                header: "Returns",
                accessorKey: "returns",
                enableColumnFilter: false,
                cell: (cellProps:any) => {
                    return <Returns {...cellProps} />;
                },
            },
            {
                header: "Returns %x",
                cell: (wallet:any) => (
                    <>
                        <h6 className={"text-" + wallet.row.original.percentageClass + " fs-13 mb-0"}>
                            <i className={wallet.row.original.icon + " align-middle me-1"}></i>
                            {wallet.getValue()}
                        </h6>
                    </>
                ),
            },
        ],
        []
    );
    return (
        <React.Fragment>
            <Card>
                <Card.Header className="border-bottom-dashed d-flex align-items-center">
                    <h4 className="card-title mb-0 flex-grow-1">Market Status</h4>
                    <div className="flex-shrink-0">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary btn-sm">Today</button>
                            <button type="button" className="btn btn-outline-primary btn-sm">Overall</button>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <TableContainer
                        columns={columns}
                        data={(marketStatus || [])}
                        isGlobalFilter={false}
                        customPageSize={6}
                        divClass="table-responsive table-card mb-3"
                        tableClass="align-middle table-nowrap"
                        theadClass="table-light text-muted"
                    />
                </Card.Body>
            </Card>
        </React.Fragment>
    );
};

export default MarketStatus;