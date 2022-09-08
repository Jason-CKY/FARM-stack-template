import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/auth';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../images/logo.svg';

export default function NavigationBar() {
    const authCtx = useAuth();
    const navigate = useNavigate();
    const [welcomeMessage, setWelcomeMessage] = useState<string>('');

    useEffect(() => {
        const fetchUser = async () => {
            const user = await authCtx?.getUser();
            if (user !== undefined && 'firstName' in user) {
                setWelcomeMessage(`Welcome, ${user.firstName} ${user.lastName}`);
            } else {
                setWelcomeMessage('Welcome, Anonymous User');
            }
        };

        fetchUser();
    }, [authCtx]);

    const handleLogout = async () => {
        await authCtx?.logout();
        navigate('/');
    };
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <img alt="" src={Logo} width="40" height="40" className="me-3" />
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/number">Number</Nav.Link>
                    </Nav>
                    {authCtx?.isAuthenticated() && (
                        <Nav className="justify-content-end">
                            <Nav.Item>
                                <Nav.Link disabled>{welcomeMessage}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item onClick={handleLogout}>
                                <Nav.Link>Log Out</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    )}
                </Container>
            </Navbar>
        </>
    );
}
