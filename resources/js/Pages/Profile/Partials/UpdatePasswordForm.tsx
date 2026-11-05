import React, { useRef } from 'react';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput: any = useRef();
    const currentPasswordInput: any = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e: any) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <React.Fragment>
            <Col>
                <h2 >Update Password</h2>
                <Card>
                    <p className="text-muted p-2">
                        Ensure your account is using a long, random password to stay secure.
                    </p>
                    <Card.Body>
                        <Form onSubmit={updatePassword} className="mt-6 space-y-6">
                            <Row>
                                <Col lg={6}>
                                    <Form.Label htmlFor="current_password" value="Current Password" className='form-label'> Current Password</Form.Label>

                                    <Form.Control
                                        id="current_password"
                                        ref={currentPasswordInput}
                                        value={data.current_password}
                                        onChange={(e: any) => setData('current_password', e.target.value)}
                                        type="password"
                                        className="mt-1 block w-100 form-control border"
                                        autoComplete="current-password"
                                    />
                                    <Form.Control.Feedback type="invalid" className='d-block'> {errors.current_password} </Form.Control.Feedback>
                                    {/* <InputError message={errors.current_password} className="mt-2" /> */}
                                </Col>

                                <Col lg={6}>
                                    <Form.Label htmlFor="password" value="New Password">New Password</Form.Label>

                                    <Form.Control
                                        id="password"
                                        ref={passwordInput}
                                        value={data.password}
                                        onChange={(e: any) => setData('password', e.target.value)}
                                        type="password"
                                        className="mt-1 block w-100 border"
                                        autoComplete="new-password"
                                    />
                                    <Form.Control.Feedback type="invalid" className='d-block'> {errors.password} </Form.Control.Feedback>
                                    {/* <InputError message={errors.password} className="mt-2" /> */}
                                </Col>
                            </Row>

                            <Col lg={6}>
                                <Form.Label htmlFor="password_confirmation" value="Confirm Password" className="mt-2">Confirm Password</Form.Label>

                                <Form.Control
                                    id="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e: any) => setData('password_confirmation', e.target.value)}
                                    type="password"
                                    className="mt-1 block w-100 border"
                                    autoComplete="new-password"
                                />
                                <Form.Control.Feedback type="invalid" className='d-block'> {errors.password_confirmation} </Form.Control.Feedback>
                                {/* <InputError message={errors.password_confirmation} className="mt-2" /> */}
                            </Col>

                            <div className="flex items-center gap-4 mt-3">
                                <Button variant='success' disabled={processing} type='submit' className='btn btn-success'>Save</Button>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    {/* <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p> */}
                                </Transition>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
}
