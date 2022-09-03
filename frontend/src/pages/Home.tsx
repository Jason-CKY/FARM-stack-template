import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export interface IHomePageProps {}

export function HomePage(props: IHomePageProps) {
    const navigate = useNavigate();

    return (
        <div>
            <h1>This is the home page</h1>
            <Link to="/todo">Go to todo page!</Link>
            <br />
            <Link to="/about">Go to about page!</Link>
            <br />
            <button onClick={() => navigate('/layout/55')}>Go to layout, with a number</button>
        </div>
    );
}
