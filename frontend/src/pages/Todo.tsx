import * as React from 'react';
import 'antd/dist/antd.css';

import { Col, Row, Timeline } from 'antd';
import { CheckCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import NavigationBar from '../components/Navbar';

export interface ITodoProps {}

interface ITodo {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
}

export function Todo(props: ITodoProps) {
    const [todos, setTodos] = React.useState<ITodo[]>([]);
    const [timeline, setTimeline] = React.useState<JSX.Element[]>([]);

    React.useEffect(() => {
        const fetchAllTasks = async () => {
            const token = localStorage.getItem('token');
            // Create request
            const request = new Request('/api/v1/todo', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` }
            });
            // Fetch request
            const response = await fetch(request);
            const fetchedTodos = await response.json();
            setTodos(fetchedTodos);
        };

        const interval = setInterval(fetchAllTasks, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    React.useEffect(() => {
        const timelineItems = todos.reverse().map((todo) => {
            return todo.completed ? (
                <Timeline.Item dot={<CheckCircleOutlined />} color="green" style={{ textDecoration: 'line-through', color: 'green' }}>
                    <b>{todo.title}</b> {todo.description} <small>({todo._id})</small>
                </Timeline.Item>
            ) : (
                <Timeline.Item dot={<MinusCircleOutlined />} color="blue" style={{ textDecoration: 'initial' }}>
                    <b>{todo.title}</b> {todo.description} <small>({todo._id})</small>
                </Timeline.Item>
            );
        });

        setTimeline(timelineItems);
    }, [todos]);

    return (
        <>
            <NavigationBar />
            <Row style={{ marginTop: 50 }}>
                <Col span={14} offset={5}>
                    <Timeline mode="alternate">{timeline}</Timeline>
                </Col>
            </Row>
        </>
    );
}
