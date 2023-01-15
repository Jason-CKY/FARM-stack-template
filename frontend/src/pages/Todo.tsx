import React, { useEffect, useState } from 'react';

import { Timeline, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { AiFillCloseCircle, AiOutlineMinus, AiOutlineCheck } from 'react-icons/ai';
import { MdOutlineCancel } from 'react-icons/md';

import { TodoForm } from '../components/TodoForm';
import { DeleteTodo, TodoInterface, UpdateTodo, GetTodoList } from '../api/TodoRoutes';

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
            const error = err as Error;
            console.error(error);
            showNotification({
                title: `${error.name} Failed to Delete Todo`,
                message: error.message,
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
            const error = err as Error;
            showNotification({
                title: `${error.name} Failed to Create Todo`,
                message: error.message,
                color: 'red',
                icon: <AiFillCloseCircle />
            });
        }
    };

    useEffect(() => {
        const fetchAllTasks = async () => {
            const fetchedTodos = await GetTodoList();
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
            <div className="flex w-[50%] max-h-[90vh] items-center justify-center overflow-auto mt-30">
                <Timeline bulletSize={24} lineWidth={2} className="my-5 max-h-[100%]">
                    {timeline}
                </Timeline>
            </div>
        </div>
    );
}
