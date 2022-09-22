import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './provider/AuthContext';
import { AboutPage } from './pages/About';
import LandingPage from './pages/Landing';
import { NumberPage } from './pages/Number';
import { Todo } from './pages/Todo';
import { Logout } from './pages/Logout';

export interface IApplicationProps {}

export function Application(props: IApplicationProps) {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LandingPage defaultActiveKey="login" />} />
                    <Route path="/register" element={<LandingPage defaultActiveKey="register" />} />
                    <Route path="/logout" element={<Logout />} />
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
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
