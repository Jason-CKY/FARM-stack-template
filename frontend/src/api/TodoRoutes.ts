export interface TodoInterface {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    created_at: string;
}

export const GetTodoList = async (): Promise<TodoInterface[]> => {
    const request = new Request(`${process.env.REACT_APP_BACKEND_URL}/v1/todo`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    // Fetch request
    const response = await fetch(request);
    // 500 error handling
    if (response.status === 500) {
        const error = { status: response.status, data: { detail: 'Internal Server Error' } };
        throw error;
    }
    // 400 error handling
    const data = await response.json();
    if (response.status >= 400 && response.status < 500) {
        const error = { status: response.status, data: data };
        throw error;
    }

    return data;
};

export const GetTodoListById = async (id: string): Promise<TodoInterface> => {
    const request = new Request(`${process.env.REACT_APP_BACKEND_URL}/v1/todo/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer  ${localStorage.getItem('token')}`
        }
    });
    // Fetch request
    const response = await fetch(request);
    // 500 error handling
    if (response.status === 500) {
        const error = { status: response.status, data: { detail: 'Internal Server Error' } };
        throw error;
    }
    // 400 error handling
    const data = await response.json();
    if (response.status >= 400 && response.status < 500) {
        const error = { status: response.status, data: data };
        throw error;
    }

    return data;
};

export const CreateTodo = async (title: string, description: string, completed?: boolean): Promise<TodoInterface> => {
    const request = new Request(`${process.env.REACT_APP_BACKEND_URL}/v1/todo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            title: title,
            description: description,
            completed: !!completed ? completed : false
        })
    });
    // Fetch request
    const response = await fetch(request);
    // 500 error handling
    if (response.status === 500) {
        const error = { status: response.status, data: { detail: 'Internal Server Error' } };
        throw error;
    }
    // 400 error handling
    const data = await response.json();
    if (response.status >= 400 && response.status < 500) {
        const error = { status: response.status, data: data };
        throw error;
    }

    return data;
};

export const UpdateTodo = async (todo: TodoInterface): Promise<void> => {
    const request = new Request(`${process.env.REACT_APP_BACKEND_URL}/v1/todo/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            title: todo.title,
            description: todo.description,
            completed: todo.completed
        })
    });
    // Fetch request
    const response = await fetch(request);
    // 500 error handling
    if (response.status === 500) {
        const error = { status: response.status, data: { detail: 'Internal Server Error' } };
        throw error;
    }
    // 400 error handling
    const data = await response.json();
    if (response.status >= 400 && response.status < 500) {
        const error = { status: response.status, data: data };
        throw error;
    }

    return data;
};

export const DeleteTodo = async (id: string): Promise<void> => {
    const request = new Request(`${process.env.REACT_APP_BACKEND_URL}/v1/todo/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    // Fetch request
    const response = await fetch(request);
    // 500 error handling
    if (response.status === 500) {
        const error = { status: response.status, data: { detail: 'Internal Server Error' } };
        throw error;
    }
    // 400 error handling
    const data = await response.json();
    if (response.status >= 400 && response.status < 500) {
        const error = { status: response.status, data: data };
        throw error;
    }

    return data;
};
