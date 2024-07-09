import api, { setAuthToken } from './api';

export const login = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        if (response.status === 200) {
            const { access_token } = response.data;
            setAuthToken(access_token);
            localStorage.setItem('access_token', access_token);
            return true;
        }
        return false;
    } catch (error) {
        console.error("Login error:", error);
        return false;
    }
};

export const register = async (email, password, role) => {
    try {
        const response = await api.post('/register', { email, password, role });
        if (response.status === 201) {
            return response.data.message;
        }
        return "Registration failed";
    } catch (error) {
        console.error("Registration error:", error);
        return "Registration failed";
    }
}

export const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('access_token');
};
