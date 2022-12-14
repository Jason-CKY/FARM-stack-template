import React, { useEffect, useState } from 'react';

import { Timeline, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { AiFillCloseCircle, AiOutlineMinus, AiOutlineCheck } from 'react-icons/ai';
import { MdOutlineCancel } from 'react-icons/md';

import { TodoForm } from '../components/TodoForm';
import { DeleteTodo, TodoInterface, UpdateTodo } from '../api/TodoRoutes';
import { ErrorType } from '../api/Error';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export interface ITodoProps {}

export function Todo(props: ITodoProps) {
    const [todos, setTodos] = useState<TodoInterface[]>([]);
    const [timeline, setTimeline] = useState<JSX.Element[]>([]);

    const deleteTodo = async (id: string) => {
        try {
            await DeleteTodo(id);
        } catch (err) {
            // Handle errors thrown from backend
            const error = err as ErrorType;
            showNotification({
                title: `${error.status} Failed to Create Todo`,
                message: error.data.detail,
                color: 'red',
                icon: <AiFillCloseCircle />
            });
        }
    };

    const toggleTodo = async (todo: TodoInterface) => {
        try {
            todo.completed = !todo.completed;
            await UpdateTodo(todo);
        } catch (err) {
            // Handle errors thrown from backend
            const error = err as ErrorType;
            showNotification({
                title: `${error.status} Failed to Create Todo`,
                message: error.data.detail,
                color: 'red',
                icon: <AiFillCloseCircle />
            });
        }
    };

    useEffect(() => {
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

    useEffect(() => {
        const timelineItems = todos.reverse().map((todo, index) => {
            return (
                <Timeline.Item
                    key={index}
                    bullet={
                        todo.completed ? (
                            <AiOutlineCheck
                                size={24}
                                onClick={() => {
                                    toggleTodo(todo);
                                }}
                            />
                        ) : (
                            <AiOutlineMinus
                                size={24}
                                onClick={() => {
                                    toggleTodo(todo);
                                }}
                            />
                        )
                    }
                    title={
                        <div className="flex justify-between">
                            <Text>{todo.title}</Text>
                            <MdOutlineCancel
                                size={24}
                                color="red"
                                className="hover:cursor-pointer"
                                onClick={() => {
                                    deleteTodo(todo.id);
                                }}
                            />
                        </div>
                    }
                    active={todo.completed ? true : false}
                >
                    <Text color="dimmed" size="sm">
                        {todo.description}
                    </Text>
                    <Text size="xs" mt={4}>
                        {dayjs(`${todo.created_at}Z`).fromNow()} - {todo.id}
                    </Text>
                </Timeline.Item>
            );
        });

        setTimeline(timelineItems);
    }, [todos]);

    return (
        <div className="flex h-[100%]">
            <div className="flex w-[50%] items-center justify-center">
                <div className="w-[50%]">
                    <TodoForm />
                </div>
            </div>
            <div className="flex w-[50%] items-center justify-center">
                <Timeline bulletSize={24} lineWidth={2} className="mt-5">
                    {timeline}
                </Timeline>
            </div>
        </div>
    );
}
