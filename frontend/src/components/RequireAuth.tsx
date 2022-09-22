import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import * as AuthRoutes from '../provider/AuthRoutes';

interface RequireAuthProps {
    children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
    const location = useLocation();
    return AuthRoutes.isAuthenticated() === true ? <div>{children}</div> : <Navigate to="/login" replace state={{ path: location.pathname }} />;
}
