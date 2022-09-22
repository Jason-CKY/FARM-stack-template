import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/logo.svg';
import * as AuthRoutes from '../provider/AuthRoutes';

export default function NavigationBar() {
    const navigate = useNavigate();
    const [welcomeMessage, setWelcomeMessage] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await AuthRoutes.getUser();
                setWelcomeMessage(`Welcome, ${user.firstName} ${user.lastName}`);
            } catch (err) {
                navigate('/logout');
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = async () => {
        navigate('/logout');
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
                    {AuthRoutes.isAuthenticated() && (
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
