import React from 'react';

import { useForm } from '@mantine/form';
import { TextInput, Paper, Group, PaperProps, Button, Stack, Checkbox } from '@mantine/core';
import { CreateTodo } from '../api/TodoRoutes';
import { ErrorType } from '../api/Error';
import { AiFillCloseCircle } from 'react-icons/ai';
import { showNotification } from '@mantine/notifications';

interface ITodoForm {
    paperProps?: PaperProps;
}
export function TodoForm({ paperProps }: ITodoForm) {
    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            completed: false
        }
    });

    const callCreateTodo = async (title: string, description: string, completed: boolean) => {
        try {
            await CreateTodo(title, description, completed);
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

    return (
        <Paper radius="md" p="xl" withBorder {...paperProps}>
            <form
                onSubmit={form.onSubmit((values, _event) => {
                    callCreateTodo(values.title, values.description, values.completed);
                })}
            >
                <Stack>
                    <TextInput required label="Title" placeholder="Morning Task" value={form.values.title} onChange={(event) => form.setFieldValue('title', event.currentTarget.value)} />

                    <TextInput
                        required
                        label="Description"
                        placeholder="Walk the dog"
                        value={form.values.description}
                        onChange={(event) => form.setFieldValue('description', event.currentTarget.value)}
                    />
                    <Checkbox label="Completed?" checked={form.values.completed} onChange={(event) => form.setFieldValue('completed', event.currentTarget.checked)} />
                </Stack>

                <Group position="apart" mt="xl">
                    <Button type="submit">Create Todo</Button>
                </Group>
            </form>
        </Paper>
    );
}
