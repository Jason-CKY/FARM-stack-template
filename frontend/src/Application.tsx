import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LayoutComponent } from './components/Layout';
import NavigationBar from './components/Navbar';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './hooks/auth';
import { AboutPage } from './pages/About';
import LandingPage from './pages/Landing';
import { Login } from './pages/Login';
import { NumberPage } from './pages/Number';
import { Todo } from './pages/Todo';

export interface IApplicationProps {}

export function Application(props: IApplicationProps) {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LandingPage />} />
                    <Route
                        path="/"
                        element={
                            <RequireAuth>
                                <Navigate to="/todo" />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="about"
                        element={
                            <RequireAuth>
                                <AboutPage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="todo"
                        element={
                            <RequireAuth>
                                <Todo />
                            </RequireAuth>
                        }
                    />
                    <Route path="number">
                        <Route
                            index
                            element={
                                <RequireAuth>
                                    <NumberPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path=":number"
                            element={
                                <RequireAuth>
                                    <NumberPage />
                                </RequireAuth>
                            }
                        />
                    </Route>
                    <Route
                        path="layout"
                        element={
                            <RequireAuth>
                                <LayoutComponent />
                            </RequireAuth>
                        }
                    >
                        <Route
                            index
                            element={
                                <RequireAuth>
                                    <NumberPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path=":number"
                            element={
                                <RequireAuth>
                                    <NumberPage />
                                </RequireAuth>
                            }
                        />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
