import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LayoutComponent } from './components/Layout';
import Navbar from './components/Navbar';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './hooks/auth';
import { AboutPage } from './pages/About';
import { HomePage } from './pages/Home';
import Login from './pages/Login';
import { NumberPage } from './pages/Number';
import { Todo } from './pages/Todo';

export interface IApplicationProps {}

export function Application(props: IApplicationProps) {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route
                        path="todo"
                        element={
                            <RequireAuth>
                                <Todo />
                            </RequireAuth>
                        }
                    />
                    <Route path="number">
                        <Route index element={<NumberPage />} />
                        <Route path=":number" element={<NumberPage />} />
                    </Route>
                    <Route path="layout" element={<LayoutComponent />}>
                        <Route index element={<NumberPage />} />
                        <Route path=":number" element={<NumberPage />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
