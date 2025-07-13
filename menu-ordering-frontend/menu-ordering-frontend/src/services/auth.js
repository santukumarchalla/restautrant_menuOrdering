import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const authAPI = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  login: async (credentials) => {
    const response = await authAPI.post('/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await authAPI.post('/register', userData);
    return response.data;
  },
};