// Stores all the relevant api function calls with error handling
// Prevents repeating of code if the same api calls is required in many components

type RegisterFunctionSignature = (
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    passwordConfirmation: String
) => Promise<RegisterSuccessResponseInterface | FailureResponseInterface>;
type LoginFunctionSignature = (email: string, password: string) => Promise<LoginSuccessResponseInterface | FailureResponseInterface>;
type LogoutFunctionSignature = () => Promise<void>;
type GetUserFunctionSignature = () => Promise<UserInterface>;

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

export const register: RegisterFunctionSignature = async (firstName, lastName, email, password, passwordConfirmation) => {
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

export const login: LoginFunctionSignature = async (email, password) => {
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
    }

    return data;
};

export const logout: LogoutFunctionSignature = async () => {
    const token = localStorage.getItem('token');
    await fetch('/api/auth/jwt/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
    });
    localStorage.removeItem('token');
};

export const getUser: GetUserFunctionSignature = async () => {
    const token = localStorage.getItem('token');
    // Create request
    const request = new Request('/api/users/me', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    });
    // Fetch request
    const response = await fetch(request);
    const data = await response.json();
    if (response.status >= 400 && response.status < 500) {
        if (data.detail) {
            throw data.detail;
        }
        throw data;
    }
    return data;
};
