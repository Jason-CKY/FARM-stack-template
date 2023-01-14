export const process_response = async (response: Response) => {
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
