import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/auth';

interface RequireAuthProps {
    children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
    const authCtx = useAuth();

    return authCtx?.isAuthenticated() === true ? <div>{children}</div> : <Navigate to="/login" replace />;
}
