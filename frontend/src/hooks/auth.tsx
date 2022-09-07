import React, { useState } from 'react';

interface LoginSuccessResponseInterface {
    access_token: string;
    token_type: string;
}

interface LoginFailureResponseInterface {
    detail: string;
}

interface AuthContextInterface {
    isAuthenticated: () => boolean;
    login: (email: string, password: string) => Promise<LoginSuccessResponseInterface | LoginFailureResponseInterface>;
    logout: () => Promise<void>;
}

const authContext = React.createContext<AuthContextInterface | null>(null);

function useAuth() {
    const isAuthenticated = () => {
        const permissions = localStorage.getItem('permissions');
        if (!permissions) {
            return false;
        }
        return permissions === 'user' ? true : false;
    };

    const login = async (email: string, password: string) => {
        // Assert email is not empty
        if (!(email.length > 0)) {
            throw new Error('Email was not provided');
        }
        // Assert password is not empty
        if (!(password.length > 0)) {
            throw new Error('Password was not provided');
        }
        // Create data JSON
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);
        // Create request
        const request = new Request('/api/auth/jwt/login', {
            method: 'POST',
            body: formData
        });
        // Fetch request
        const response = await fetch(request);
        // 500 error handling
        if (response.status === 500) {
            throw new Error('Internal server error');
        }
        // Extracting response data
        const data = await response.json();
        // 400 error handling
        if (response.status >= 400 && response.status < 500) {
            if (data.detail) {
                throw data.detail;
            }
            throw data;
        }
        // Successful login handling
        if ('access_token' in data) {
            // localStorage.setItem('token', data['access_token']);
            // localStorage.setItem('permissions', 'user');
            localStorage.setItem('token', data['access_token']);
            localStorage.setItem('permissions', 'user');
        }

        return data;
    };
    const logout = async () => {
        await fetch('/api/auth/jwt/logout', {
            method: 'POST'
        });
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
    };

    return {
        isAuthenticated,
        login,
        logout
    };
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const auth = useAuth();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
    return React.useContext(authContext);
}
