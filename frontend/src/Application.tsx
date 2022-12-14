import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme, createStyles } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoadingSpinner } from './components/LoadingSpinner';
import RequireAuth from './components/RequireAuth';
import LandingPage from './pages/Landing';
import { Logout } from './pages/Logout';
import { Todo } from './pages/Todo';
import { NavBar } from './components/NavBar';

const useStyles = createStyles((theme) => ({
    background: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    }
}));

interface IMainPageLayout {
    children: React.ReactNode;
}
function MainPageLayout({ children }: IMainPageLayout) {
    const { classes } = useStyles();
    return (
        <div className={classes.background}>
            <NavBar />
            {children}
        </div>
    );
}

export interface IApplicationProps {}

export function Application(props: IApplicationProps) {
    const getCurrentColorScheme = () => {
        let currentColorScheme = localStorage.getItem('theme');
        return !!currentColorScheme ? currentColorScheme : 'light';
    };
    const [colorScheme, setColorScheme] = useState<ColorScheme>(getCurrentColorScheme() as ColorScheme);
    const toggleColorScheme = (value?: ColorScheme) => {
        let newColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
        localStorage.setItem('theme', newColorScheme);
        setColorScheme(newColorScheme);
    };

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                <NotificationsProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="/login"
                                element={
                                    <>
                                        <MainPageLayout>
                                            <LandingPage type="login" />
                                        </MainPageLayout>
                                    </>
                                }
                            />
                            <Route
                                path="/register"
                                element={
                                    <MainPageLayout>
                                        <LandingPage type="register" />
                                    </MainPageLayout>
                                }
                            />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/loading" element={<LoadingSpinner />} />
                            <Route
                                path="/"
                                element={
                                    <RequireAuth>
                                        <Navigate to="/todo" />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="todo"
                                element={
                                    <RequireAuth>
                                        <MainPageLayout>
                                            <Todo />
                                        </MainPageLayout>
                                    </RequireAuth>
                                }
                            />
                        </Routes>
                    </BrowserRouter>
                </NotificationsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}
