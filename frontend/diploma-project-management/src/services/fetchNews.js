import api from './api';
import axios from 'axios';

const fetchNews = async () => {
  try {
    const response = await api.get('/news');
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error fetching news:', error.response);
    } else {
      console.error('Error fetching news:', error.message);
    }
    return [];
  }
};

export default fetchNews;