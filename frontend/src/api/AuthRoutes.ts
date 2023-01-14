// Stores all the relevant api function calls with error handling
// Prevents repeating of code if the same api calls is required in many components

import { process_response } from './Base';

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

export interface UserInterface {
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

export const register = async (firstName: string, lastName: string, email: string, password: string): Promise<RegisterSuccessResponseInterface | FailureResponseInterface> => {
    // Create data JSON
    const formData = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    };
    // Create request
    const request = new Request(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    // Fetch request
    const response = await fetch(request);
    const data = await process_response(response);
    return data;
};

export const login = async (email: string, password: string): Promise<LoginSuccessResponseInterface | FailureResponseInterface> => {
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
    const request = new Request(`${process.env.REACT_APP_BACKEND_URL}/auth/jwt/login`, {
        method: 'POST',
        body: formData
    });
    // Fetch request
    const response = await fetch(request);
    const data: any = await process_response(response);
    // Successful login handling
    if ('access_token' in data) {
        localStorage.setItem('token', data['access_token']);
    }

    return data;
};

export const logout = async (): Promise<void> => {
    const token = localStorage.getItem('token');
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/jwt/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
    });
    localStorage.removeItem('token');
};

export const getUser = async (): Promise<UserInterface> => {
    const token = localStorage.getItem('token');
    // Create request
    const request = new Request(`${process.env.REACT_APP_BACKEND_URL}/users/me`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    });
    // Fetch request
    const response = await fetch(request);
    const data = await process_response(response);
    return data;
};

interface AuthorizeInterface {
    authorization_url: string;
}

interface TokenResponseInterface {
    access_token: string;
    token_type: string;
}

export const oauth_login = async (authorization_endpoint: string): Promise<void> => {
    // Fetch request
    const authorization_response = await fetch(authorization_endpoint, {
        method: 'GET'
    });
    const authorization_data: AuthorizeInterface = await process_response(authorization_response);
    setTimeout(console.log, 500, authorization_data.authorization_url);
    window.location.replace(authorization_data.authorization_url);
};

export const oauth_fetch_token = async (callback_endpoint: string, urlParams: URLSearchParams) => {
    // GET callback endpoint with code from backend to get access token
    const authorization_response = await fetch(`${callback_endpoint}?${urlParams.toString()}`, {
        method: 'GET'
    });
    // Fetch request
    const data: TokenResponseInterface = await process_response(authorization_response);
    // Successful login handling
    if ('access_token' in data) {
        localStorage.setItem('token', data['access_token']);
        return data['access_token'];
    }
    return null;
};
