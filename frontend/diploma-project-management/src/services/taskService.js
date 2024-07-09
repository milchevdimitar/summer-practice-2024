import api from './api';

export const fetchTasks = async () => {
    try {
        const response = await api.get('/tasks');
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.error("Access denied. Please ensure you have the necessary permissions.");
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Error:", error.message);
        }
        return [];
    }
};