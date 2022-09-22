import React from 'react';
import { isAuthenticated } from './AuthRoutes';

export const AuthContext = React.createContext({
    isAuthenticated: false
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    return <AuthContext.Provider value={{ isAuthenticated: isAuthenticated() }}>{children}</AuthContext.Provider>;
}
