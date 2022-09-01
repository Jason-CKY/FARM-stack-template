/*
Router-dom layout for navbar and sidebar common components to be set for every route
*/
import * as React from 'react';
import { Outlet } from 'react-router-dom';

export interface ILayoutComponentProps {}

export function LayoutComponent(props: ILayoutComponentProps) {
    return (
        <div style={{ border: 2, padding: 2, borderColor: 'black', borderStyle: 'dashed', margin: 5, width: 500, height: 500 }}>
            <Outlet />
        </div>
    );
}
