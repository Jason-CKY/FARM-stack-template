import React from 'react';

interface RegisterSuccessResponseInterface {
    id: string;
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    is_verified: boolean;
    firstName: string;
    lastName: string;
}

interface LoginSuccessResponseInterface {
    access_token: string;
    token_type: string;
}

interface UserSuccessResponseInterface {
    id: string;
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    is_verified: boolean;
    firstName: string;
    lastName: string;
}

interface FailureResponseInterface {
    detail: string;
}

interface AuthContextInterface {
    isAuthenticated: () => boolean;
    register: (firstName: String, lastName: String, email: String, password: String, passwordConfirmation: String) => Promise<RegisterSuccessResponseInterface | FailureResponseInterface>;
    login: (email: string, password: string) => Promise<LoginSuccessResponseInterface | FailureResponseInterface>;
    logout: () => Promise<void>;
    getUser: () => Promise<UserSuccessResponseInterface | FailureResponseInterface>;
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
    const register = async (firstName: String, lastName: String, email: String, password: String, passwordConfirmation: String) => {
        // Assert firstName, lastName and phone not empty
        if (!(firstName.length > 0)) {
            throw new Error('First Name was not provided');
        }
        // Assert firstName, lastName and phone not empty
        if (!(lastName.length > 0)) {
            throw new Error('Last Name was not provided');
        }
        // Assert email is not empty
        if (!(email.length > 0)) {
            throw new Error('Email was not provided');
        }
        // Assert password is not empty
        if (!(password.length > 0)) {
            throw new Error('Password was not provided');
        }
        // Assert password confirmation is not empty
        if (!(passwordConfirmation.length > 0)) {
            throw new Error('Password confirmation was not provided');
        }
        // Assert email or password or password confirmation is not empty
        if (password !== passwordConfirmation) {
            throw new Error('Passwords do not match');
        }
        // Create data JSON
        const formData = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        };
        // Create request
        const request = new Request('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        // Fetch request
        const response = await fetch(request);
        // 500 error handling
        if (response.status === 500) {
            throw new Error('Internal server error');
        }
        // 400 error handling
        const data = await response.json();
        if (response.status >= 400 && response.status < 500) {
            if (data.detail) {
                throw data.detail;
            }
            throw data;
        }
        return data;
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
    const getUser = async () => {
        const token = localStorage.getItem('token');
        // Create request
        const request = new Request('/api/users/me', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        });
        // Fetch request
        const response = await fetch(request);
        const data = await response.json();
        return data;
    };
    return {
        isAuthenticated,
        register,
        login,
        logout,
        getUser
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
