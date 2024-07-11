import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const fetchSupervisors = async () => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    console.error('No token found. Please login to access this resource.');
    return []; // Early return to avoid making a request without a token
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.get(`${BASE_URL}/advisor`, config);
    return response.data.supervisors;
  } catch (error) {
    console.error('Failed to fetch supervisors:', error);
    return [];
  }
};

export { fetchSupervisors };