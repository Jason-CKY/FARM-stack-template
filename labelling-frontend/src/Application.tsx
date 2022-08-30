import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LayoutComponent } from './components/Layout';
import { AboutPage } from './pages/About';
import { HomePage } from './pages/Home';
import { NumberPage } from './pages/Number';

export interface IApplicationProps {}

export function Application(props: IApplicationProps) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="number">
                    <Route index element={<NumberPage />} />
                    <Route path=":number" element={<NumberPage />} />
                </Route>
                <Route path="layout" element={<LayoutComponent />}>
                    <Route index element={<NumberPage />} />
                    <Route path=":number" element={<NumberPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
