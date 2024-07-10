import api from './api';

export const fetchUserDetails = async () => {
    try {
        const response = await api.get('/whoami');
        if (response.status === 200) {
            return response.data;
        } else {
            console.error("Failed to fetch user details due to server error");
            return null;
        }
    } catch (error) {
        if (error.response) {
            console.error("Server responded with an error:", error.response.status);
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Error:", error.message);
        }
        return null;
    }
};
