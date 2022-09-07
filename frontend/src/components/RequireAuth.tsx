import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/auth';

interface RequireAuthProps {
    children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
    const authCtx = useAuth();
    const location = useLocation();

    return authCtx?.isAuthenticated() === true ? <div>{children}</div> : <Navigate to="/login" replace state={{ path: location.pathname }} />;
}
