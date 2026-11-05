import React, { useMemo } from 'react';
import { Card, Col } from 'react-bootstrap';
import TableContainer from '../../../Components/Common/TableContainer';
import {
    Type,
    Quantity,
    OrderValue,
    AvgPrice,
    Price,
    Status
} from './OrderCol';
import { Link } from '@inertiajs/react';

const AllOrders = ({ orderList }:any) => {
    const columns = useMemo(
        () => [
            {
                header: "Date",
                cell: (order:any) => (
                    <>
                        {order.getValue()}{" "}
                        <small className="text-muted">{order.row.original.time}</small>
                    </>
                ),
            },
            {
                header: "Name",
                cell: (order:any) => (
                    <>
                        <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                                <img src={order.row.original.img} alt="" className="avatar-xxs" />
                            </div>
                            <Link href="#" className="currency_name flex-grow-1 ms-2"> {order.getValue()}</Link>
                        </div>
                    </>
                ),
            },
            {
                header: "Type",
                accessorKey: "type",
                enableColumnFilter: false,
                cell: (cellProps:any) => {
                    return <Type {...cellProps} />;
                },
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
                header: "Order Value",
                accessorKey: "orderValue",
                enableColumnFilter: false,
                cell: (cellProps:any) => {
                    return <OrderValue {...cellProps} />;
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
                header: "Price",
                accessorKey: "price",
                enableColumnFilter: false,
                cell: (cellProps:any) => {
                    return <Price {...cellProps} />;
                },
            },
            {
                header: "Status",
                accessorKey: "status",
                enableColumnFilter: false,
                cell: (cellProps:any) => {
                    return <Status {...cellProps} />;
                },
            },
        ],
        []
    );
    return (
        <React.Fragment>
            <Col lg={12}>
                <Card>
                    <Card.Header className="d-flex align-items-center border-0">
                        <h5 className="card-title mb-0 flex-grow-1">All Orders</h5>
                        <div className="flex-shrink-0">
                            <div className="flax-shrink-0 hstack gap-2">
                                <button className="btn btn-primary">Today's Orders</button>
                                <button className="btn btn-soft-info">Past Orders</button>
                            </div>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <TableContainer
                            columns={columns}
                            data={(orderList || [])}
                            isGlobalFilter={true}
                            customPageSize={8}
                            divClass="table-responsive table-card mb-1"
                            tableClass="align-middle table-nowrap"
                            theadClass="table-light text-muted"
                            isCryptoOrdersFilter={true}
                            SearchPlaceholder='Search for orders'
                        />
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default AllOrders;