import React, { useRef, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState<boolean>(false);
    const passwordInput: any = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e: any) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <React.Fragment>
            <Row>
                <Col lg={12}>
                    <h2 >Delete Account</h2>
                    <Card>
                        <p className="text-muted p-2">
                            Once your account is deleted, all of its resources and data will be permanently deleted. Before
                            deleting your account, please download any data or information that you wish to retain.
                        </p>
                        <Col lg={6}>
                            <Button variant="danger" onClick={confirmUserDeletion} type='submit' className='btn btn-danger mb-3 ms-3'>Delete Account</Button>
                        </Col>
                    </Card>
                </Col>
            </Row >

            <Modal show={confirmingUserDeletion} onHide={closeModal} centered>
                <Modal.Header className="bg-light p-3" closeButton>
                    <h5 className='modal-title'>
                        Are you sure you want to delete your account?
                    </h5>


                </Modal.Header>
                <Form onSubmit={deleteUser} className="p-6">
                    <Modal.Body>
                        <div className="mt-6">
                            <p className="mt-1 ">
                                Once your account is deleted, all of its resources and data will be permanently deleted. Please
                                enter your password to confirm you would like to permanently delete your account.
                            </p>
                            <Form.Label htmlFor="password" value="Password" className="sr-only" />

                            <Form.Control
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e: any) => setData('password', e.target.value)}
                                className="mt-1 block w-3/4"
                                autoFocus
                                placeholder="Password"
                            />
                            <Form.Control.Feedback type="invalid" className='d-block'> {errors.password} </Form.Control.Feedback>
                        </div>
                    </Modal.Body>
                    <div className="mt-6 flex justify-end mb-4">
                        <Button variant='light' onClick={closeModal} className='btn ms-2' type='submit'>Cancel</Button>

                        <Button variant='danger' className="btn ml-3 ms-3" disabled={processing} type='submit'>
                            Delete Account
                        </Button>
                    </div>
                </Form>
            </Modal>

        </React.Fragment >
    );
}
