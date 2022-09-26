import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import * as AuthRoutes from '../provider/AuthRoutes';
import { LoadingSpinner } from './LoadingSpinner';

interface RequireAuthProps {
    children: React.ReactNode;
}

export const AuthContext = React.createContext<AuthRoutes.UserInterface>({
    id: '',
    email: '',
    is_active: false,
    is_superuser: false,
    is_verified: false,
    firstName: '',
    lastName: ''
});

export default function RequireAuth({ children }: RequireAuthProps) {
    const location = useLocation();
    const [user, setUser] = useState<AuthRoutes.UserInterface | null>(null);
    const [hasLoaded, setHasLoaded] = useState(false);
    useEffect(() => {
        const getUser = async () => {
            try {
                const currentUser = await AuthRoutes.getUser();
                setUser(currentUser);
            } catch (err) {
                if (err === 'Unauthorized') {
                    localStorage.removeItem('token');
                }
            }
            setHasLoaded(true);
        };
        getUser();
    }, []);

    if (!hasLoaded) {
        return <LoadingSpinner />;
    }
    return !!user ? <AuthContext.Provider value={user}>{children}</AuthContext.Provider> : <Navigate to="/login" replace state={{ path: location.pathname }} />;
}
