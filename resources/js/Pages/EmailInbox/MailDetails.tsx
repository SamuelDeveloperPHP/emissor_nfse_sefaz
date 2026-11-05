import React, { useEffect } from 'react';

//redux
import { useSelector, useDispatch } from "react-redux";

//SimpleBar
import SimpleBar from "simplebar-react";

// Rating
import Rating from "react-rating";
import { createSelector } from 'reselect';
import { ongetMailDetails } from '../../slices/thunk';
import { Button, Form } from 'react-bootstrap';


const MailDetails = () => {
    const dispatch: any = useDispatch();

    const selectmaildetailData = createSelector(
        (state: any) => state.Mailbox,
        (mailDetails: any) => mailDetails.mailDetails
    );
    // Inside your component
    const mailDetails: any = useSelector(selectmaildetailData);

    useEffect(() => {
        dispatch(ongetMailDetails());
    }, [dispatch]);

    function sidebar() {
        var element = document.getElementsByTagName('body')[0];
        element.classList.add("email-detail-show");
    }
    return (
        <React.Fragment>
            <SimpleBar className="message-list-content mx-n4 px-4 message-list-scroll">
                <ul className="message-list">
                    {
                        mailDetails.map((item: any, key: any) => (
                            <li className={item.unread ? "unread" : ''} key={key}>
                                <div className="col-mail col-mail-1">
                                    <div className="form-check checkbox-wrapper-mail fs-14">
                                        <Form.Check.Input className="form-check-input" type="checkbox" value="" id={item.forId} />
                                        <Form.Check.Label className="form-check-label" htmlFor={item.forId}></Form.Check.Label>
                                    </div>
                                    <button type="button" className="btn avatar-xs p-0 favourite-btn fs-15 active">
                                        <Rating
                                            stop={1}
                                            emptySymbol="ri-star-fill text-muted"
                                            fullSymbol="ri-star-fill text-warning "
                                        />
                                    </button>
                                    <Button variant='link' as='a' href="#" className="title">{item.name}</Button>
                                </div>
                                <div className="col-mail col-mail-2"
                                    onClick={() => sidebar()}
                                >
                                    <Button variant='link' as='a' href="#" className="subject"> {item.badge ? <span className={"badge me-2 bg-" + item.badgeClass}>{item.badge}</span> : null} {item.subject} - <span className="teaser">{item.teaser}</span>
                                    </Button>
                                    <div className="date">{item.date}</div>
                                </div>
                            </li>
                        ))}
                </ul>
            </SimpleBar>
        </React.Fragment>
    );
};

export default MailDetails;