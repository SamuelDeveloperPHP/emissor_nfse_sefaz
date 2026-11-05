import React from 'react';
import { Card} from 'react-bootstrap';

//import images
import btc from "../../../../images/svg/crypto-icons/btc.svg"; 
import ltc from "../../../../images/svg/crypto-icons/ltc.svg"; 
import xmr from "../../../../images/svg/crypto-icons/xmr.svg"; 
import fil from "../../../../images/svg/crypto-icons/fil.svg"; 
import dot from "../../../../images/svg/crypto-icons/dot.svg"; 
import { Link } from '@inertiajs/react';

const RecentTransaction = () => {
    return (
        <React.Fragment>
            <Card>
                <Card.Header>
                    <h5 className="card-title mb-0">Recent Transaction</h5>
                </Card.Header>
                <Card.Body>
                    <div className="d-flex mb-3">
                        <div className="flex-shrink-0">
                            <img src={btc} alt="" className="avatar-xxs" />
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <h6 className="mb-1">Bitcoin (BTC)</h6>
                            <p className="text-muted mb-0">Today</p>
                        </div>
                        <div>
                            <h6 className="text-danger mb-0">- $422.89</h6>
                        </div>
                    </div>
                    <div className="d-flex mb-3">
                        <div className="flex-shrink-0">
                            <img src={ltc} alt="" className="avatar-xxs" />
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <h6 className="mb-1">Litecoin (LTC)</h6>
                            <p className="text-muted mb-0">Yesterday</p>
                        </div>
                        <div>
                            <h6 className="text-success mb-0">+ $784.20</h6>
                        </div>
                    </div>
                    <div className="d-flex mb-3">
                        <div className="flex-shrink-0">
                            <img src={xmr} alt="" className="avatar-xxs" />
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <h6 className="mb-1">Monero (XMR)</h6>
                            <p className="text-muted mb-0">01 Jan, 2022</p>
                        </div>
                        <div>
                            <h6 className="text-danger mb-0">- $356.74</h6>
                        </div>
                    </div>
                    <div className="d-flex mb-3">
                        <div className="flex-shrink-0">
                            <img src={fil} alt="" className="avatar-xxs" />
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <h6 className="mb-1">Filecoin (FIL)</h6>
                            <p className="text-muted mb-0">30 Dec, 2021</p>
                        </div>
                        <div>
                            <h6 className="text-success mb-0">+ $1,247.00</h6>
                        </div>
                    </div>
                    <div className="d-flex mb-3">
                        <div className="flex-shrink-0">
                            <img src={dot} alt="" className="avatar-xxs" />
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <h6 className="mb-1">Polkadot (DOT)</h6>
                            <p className="text-muted mb-0">27 Dec, 2021</p>
                        </div>
                        <div>
                            <h6 className="text-success btn mb-0">+ $7,365.80</h6>
                        </div>
                    </div>
                    <div>
                        <Link href="/apps-crypto-transactions" className="btn btn-soft-info w-100">View All Transactions <i className="ri-arrow-right-line align-bottom"></i></Link>
                    </div>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
};

export default RecentTransaction;