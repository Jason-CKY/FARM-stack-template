import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { AiFillCloseCircle } from 'react-icons/ai';
import { IoMdAlert } from 'react-icons/io';
import { TextInput, PasswordInput, Text, Paper, Group, PaperProps, Button, Anchor, Stack, Alert, Divider } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import * as AuthRoutes from '../api/AuthRoutes';
import { GithubButton, GitlabButton } from './SocialButtons';

interface LocationStateInterface {
    path: string | null;
}

interface IAuthenticationForm {
    paperProps?: PaperProps;
    type: string;
}
export function AuthenticationForm({ paperProps, type }: IAuthenticationForm) {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationStateInterface;
    const form = useForm({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: ''
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
            confirmPassword: (val, values) => (type === 'register' && val !== values.password ? 'Confirm Password must match Password' : null)
        }
    });

    // Function to register user
    const callRegister = async (firstName: string, lastName: string, email: string, password: string) => {
        try {
            const response = await AuthRoutes.register(firstName, lastName, email, password);
            // Executes only when there are no 400 and 500 errors, else they are thrown as errors
            // Callbacks can be added here
            if (response) {
                navigate(state?.path || '/');
            }
        } catch (err) {
            if (err instanceof Error) {
                // Handle errors thrown from frontend
                showNotification({
                    title: 'Failed to Register',
                    message: err.message,
                    color: 'red',
                    icon: <AiFillCloseCircle />
                });
            } else {
                // Handle errors thrown from backend
                if (err === 'REGISTER_USER_ALREADY_EXISTS') {
                    showNotification({
                        title: 'Failed to Register',
                        message: 'User already exists',
                        color: 'red',
                        icon: <AiFillCloseCircle />
                    });
                } else {
                    showNotification({
                        title: 'Failed to Register',
                        message: 'Error occured in the API',
                        color: 'red',
                        icon: <AiFillCloseCircle />
                    });
                }
            }
        }
    };

    // Function to login user
    const callLogin = async (email: string, password: string) => {
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
                showNotification({
                    title: 'Failed to Login',
                    message: err.message,
                    color: 'red',
                    icon: <AiFillCloseCircle />
                });
            } else {
                // Handle errors thrown from backend
                if (err === 'LOGIN_BAD_CREDENTIALS') {
                    showNotification({
                        title: 'Failed to Login',
                        message: 'Incorrect credentials',
                        color: 'red',
                        icon: <AiFillCloseCircle />
                    });
                } else {
                    showNotification({
                        title: 'Failed to Register',
                        message: 'Error occured in the API',
                        color: 'red',
                        icon: <AiFillCloseCircle />
                    });
                }
            }
        }
    };
    return (
        <Paper radius="md" p="xl" withBorder {...paperProps}>
            <Alert icon={<IoMdAlert size={16} />} title="Attention!">
                If you have the FastAPI backend and MongoDB running, then just create a new user account using the registration form and enter the web application.
            </Alert>
            <Text size="lg" weight={500} className="mt-3">
                Welcome to Mantine, {type} with
            </Text>
            <Group grow mb="md" mt="md">
                <GithubButton radius="xl">Github</GithubButton>
                <GitlabButton radius="xl">Gitlab</GitlabButton>
            </Group>

            <Divider label="Or continue with email" labelPosition="center" my="lg" />
            <form
                onSubmit={form.onSubmit(
                    (values, _event) => {
                        console.log(values);
                        console.log(_event);

                        if (type === 'register') {
                            callRegister(values.firstName, values.lastName, values.email, values.password);
                            console.log('User has registered');
                        } else {
                            callLogin(values.email, values.password);
                            console.log('User has logged in');
                        }
                    },
                    (validationErrors, _values, _event) => {
                        console.log(validationErrors);
                    }
                )}
            >
                <Stack>
                    {type === 'register' && (
                        <>
                            <TextInput
                                required
                                label="First Name"
                                placeholder="Your first name"
                                value={form.values.firstName}
                                onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                            />
                            <TextInput
                                required
                                label="Last Name"
                                placeholder="Your last name"
                                value={form.values.lastName}
                                onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
                            />
                        </>
                    )}

                    <TextInput
                        required
                        label="Email"
                        placeholder="hello@mantine.dev"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password should include at least 6 characters'}
                    />

                    {type === 'register' && (
                        <PasswordInput
                            required
                            label="Confirm Password"
                            placeholder="Your password"
                            value={form.values.confirmPassword}
                            onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
                            error={form.errors.confirmPassword}
                        />
                    )}
                </Stack>

                <Group position="apart" mt="xl">
                    <Anchor
                        component="button"
                        type="button"
                        color="dimmed"
                        onClick={() => {
                            form.setValues({ email: '', firstName: '', lastName: '', password: '', confirmPassword: '' });
                            type === 'register' ? navigate('/login') : navigate('/register');
                        }}
                        size="xs"
                    >
                        {type === 'register' ? 'Already have an account? Login' : "Don't have an account? Register"}
                    </Anchor>
                    <Button type="submit">{upperFirst(type)}</Button>
                </Group>
            </form>
        </Paper>
    );
}
