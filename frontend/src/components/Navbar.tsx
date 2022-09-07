import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/auth';

export default function Navbar() {
    const authCtx = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await authCtx?.logout();
        navigate('/');
    };
    console.log(authCtx?.isAuthenticated());
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/todo">Todo</Link>
                </li>
            </ul>
            {authCtx?.isAuthenticated() && <button onClick={handleLogout}>Logout</button>}
        </nav>
    );
}
