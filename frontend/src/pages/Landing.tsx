import React from 'react';
import { Navbar, Container, Row, Col, Alert, Tab } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import { useLocation } from 'react-router-dom';
import { Login } from './Login';
import { Register } from './Register';

type Props = {};

export default function LandingPage({}: Props) {
    const location = useLocation();

    return (
        <>
            <Container className="mt-4">
                <Row>
                    <Col className="mt-4">
                        <h2>Hello!</h2>
                        <Alert variant={'primary'}>
                            If you have the FastAPI backend and MongoDB running, then just create a new user account using the registration form and enter the web application.
                        </Alert>
                    </Col>
                </Row>
                <Row>
                    <Tabs>
                        <Tab eventKey="login" title="Login">
                            <Login />
                        </Tab>
                        <Tab eventKey="register" title="Register">
                            <Register />
                        </Tab>
                    </Tabs>
                </Row>
            </Container>
        </>
    );
}
