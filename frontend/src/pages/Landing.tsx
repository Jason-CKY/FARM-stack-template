import React from 'react';
import { Container, Row, Col, Alert, Tab } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate } from 'react-router-dom';
import { Login } from './Login';
import { Register } from './Register';

type Props = {
    defaultActiveKey: string;
};

export default function LandingPage({ defaultActiveKey }: Props) {
    const navigate = useNavigate();

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
                    <Tabs defaultActiveKey={defaultActiveKey} onSelect={(e) => navigate('/' + e)}>
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
