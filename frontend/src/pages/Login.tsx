import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import * as AuthRoutes from '../provider/AuthRoutes';

interface LocationStateInterface {
    path: string | null;
}

export function Login() {
    const navigate = useNavigate();

    // User information hook
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const state = location.state as LocationStateInterface;

    // Function to call submit
    const callSubmit = async (e: FormEvent) => {
        // Prevents page reload on wrongs creds
        e.preventDefault();
        setError('');
        try {
            const response = await AuthRoutes.login(email, password);
            // Executes only when there are no 400 and 500 errors, else they are thrown as errors
            // Callbacks can be added here
            if (response) {
                if (state?.path === '/login' || state?.path === '/register') {
                    navigate('/');
                }
                navigate(state?.path || '/');
            }
        } catch (err) {
            if (err instanceof Error) {
                // Handle errors thrown from frontend
                setError(err.message);
            } else {
                // Handle errors thrown from backend
                if (err === 'LOGIN_BAD_CREDENTIALS') {
                    setError('Incorrect credentials');
                } else {
                    setError('Error occured in the API.');
                }
            }
        }
    };

    return (
        <>
            <Form onSubmit={callSubmit}>
                <Form.Group controlId="formLoginEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} />
                </Form.Group>
                <Form.Group controlId="formLoginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(p: ChangeEvent<HTMLInputElement>) => setPassword(p.currentTarget.value)} />
                </Form.Group>
                <Alert variant="danger" style={error !== '' ? { display: 'block' } : { display: 'none' }}>
                    {error}
                </Alert>
                <Button variant="primary" type="submit" size="lg">
                    Log In
                </Button>
            </Form>
        </>
    );
}
