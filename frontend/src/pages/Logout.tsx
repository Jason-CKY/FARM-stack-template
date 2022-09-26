import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';
import * as AuthRoutes from '../provider/AuthRoutes';

export function Logout() {
    const [hasLoaded, setHasLoaded] = useState(false);
    useEffect(() => {
        const handleLogout = async () => {
            await AuthRoutes.logout();
            setHasLoaded(true);
        };

        handleLogout();
    }, []);
    if (hasLoaded) {
        return <Navigate to="/login" />;
    } else {
        return <LoadingSpinner />;
    }
}
