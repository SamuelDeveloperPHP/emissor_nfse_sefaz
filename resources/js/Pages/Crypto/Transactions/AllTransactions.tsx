import React, { useEffect, useMemo, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from '../../../Components/Common/TableContainer';

import {
    FromCol,
    ToCol,
    DetailsCol,
    TransactionID,
    TypeCol,
    Status
} from "./TransactionsCol";
import { createSelector } from 'reselect';
import { Link } from '@inertiajs/react';
import { onGetTransationList } from '../../../slices/thunk';

const AllTransactions = () => {
    const dispatch :any= useDispatch();

    const transactionData = createSelector(
        (state :any) => state.Crypto,
        (transationList:any) => transationList.transationList
      );
    // Inside your component
    const transationList:any = useSelector(transactionData);

    useEffect(() => {
        dispatch(onGetTransationList());
    }, [dispatch]);


    useEffect(() => {
        setTransation(transationList);
    }, [transationList]);

    const [transation, setTransation] = useState<any>(transationList);

    const category = (e :any) => {
        if (e === "All") {
            var filter = transationList.filter((item :any) => item.category !== e);
        } else {
            filter = transationList.filter((item :any) => item.category === e);
        }
        setTransation(filter);
    };

    const flowType = (e :any) => {
        setTransation(
            transationList.filter((item :any) => item.type === e));
    };


    const columns = useMemo(
        () => [
            {
                header: "#",
                cell: (transation: any) => (
                    <>
                        <div className="avatar-xs">
                            <div className={"avatar-title bg-" + transation.row.original.iconClass + "-subtle text-" + transation.row.original.iconClass + " rounded-circle fs-16"}>
                                <i className={transation.row.original.icon}></i>
                            </div>
                        </div>
                    </>
                ),
            },
            {
                header: "Timestamp",
                accessorKey: "time",
                enableColumnFilter: false,
                cell: (transation: any) => (
                    <>
                        {transation.row.original.date}{" "}
                        <small className="text-muted">{transation.getValue()}</small>
                    </>
                ),
            },
            {
                header: "Currency",
                cell: (transation: any) => (
                    <>
                        <div className="d-flex align-items-center">
                            <img src={transation.row.original.image} alt="" className="avatar-xxs me-2" />
                            {transation.getValue()}
                        </div>
                    </>
                ),
            },
            {
                header: "From",
                accessorKey: "from",
                enableColumnFilter: false,
                cell: (cellProps: any) => {
                    return <FromCol {...cellProps} />;
                },
            },
            {
                header: "To",
                accessorKey: "to",
                enableColumnFilter: false,
                cell: (cellProps: any) => {
                    return <ToCol {...cellProps} />;
                },
            },
            {
                header: "Details",
                accessorKey: "details",
                enableColumnFilter: false,
                cell: (cellProps: any) => {
                    return <DetailsCol {...cellProps} />;
                },
            },
            {
                header: "Transaction ID",
                accessorKey: "id",
                enableColumnFilter: false,
                cell: (cellProps: any) => {
                    return <TransactionID {...cellProps} />;
                },
            },
            {
                header: "Type",
                accessorKey: "type",
                enableColumnFilter: false,
                cell: (cellProps: any) => {
                    return <TypeCol {...cellProps} />;
                },
            },
            {
                header: "Amount",
                cell: (transation: any) => (
                    <>
                        <h6 className={"text-" + transation.row.original.iconClass + " amount mb-1"}>-{transation.row.original.amount}</h6>
                        <p className="text-muted mb-0">{transation.row.original.amount1}</p>
                    </>
                ),
            },
            {
                header: "Status",
                accessorKey: "status",
                enableColumnFilter: false,
                cell: (cellProps: any) => {
                    return <Status {...cellProps} />;
                },
            },
        ],
        []
    );
    return (
        <React.Fragment>
            <Row className="align-items-center mb-4 g-3">
                <Col sm={2}>
                    <div className="d-flex align-items-center gap-2">
                        <span className="text-muted flex-shrink-0">Sort by: </span>
                        <select className="form-control mb-0" data-choices data-choices-search-false name="choices-single-default" id="choices-single-default" onChange={(e) => category(e.target.value)}>
                            <option defaultValue="All">All</option>
                            <option value="USD">USD</option>
                            <option value="ETH">ETH</option>
                            <option value="BTC">BTC</option>
                            <option value="EUR">EUR</option>
                            <option value="JPY">JPY</option>
                        </select>
                    </div>
                </Col>
                <div className="col-sm-auto ms-auto">
                    <div className="d-flex gap-2">
                        <a href="#" data-bs-toggle="modal" className="btn btn-info" onClick={() => flowType("Deposit")}>Deposite</a>
                        <a href="#" data-bs-toggle="modal" className="btn btn-danger" onClick={() => flowType("Withdraw")}>Withdraw</a>
                    </div>
                </div>
            </Row>

            <Card>
                <Card.Header>
                    <Row className="align-items-center g-3">
                        <Col md={3}>
                            <h5 className="card-title mb-0">All Transactions</h5>
                        </Col>
                        <div className="col-md-auto ms-auto">
                            <div className="d-flex gap-2">
                                <div className="search-box">
                                    <input type="text" className="form-control search" placeholder="Search for transactions..." />
                                    <i className="ri-search-line search-icon"></i>
                                </div>
                                <button className="btn btn-success" >
                                    <i className="ri-equalizer-line align-bottom me-1"></i>
                                    Filters
                                </button>
                            </div>
                        </div>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <TableContainer
                        columns={columns}
                        data={(transation || [])}
                        isGlobalFilter={false}
                        customPageSize={8}
                        divClass="table-responsive table-card mb-4"
                        tableClass="align-middle table-nowrap mb-0"
                        theadClass="table-light table-nowrap"
                        thClass="table-light text-muted"
                    />
                </Card.Body>
            </Card>
        </React.Fragment>
    );
};

export default AllTransactions;