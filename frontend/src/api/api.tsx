import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api-url.com', // Replace with your API's base URL
});

// Function to send a login request
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to send a register request
export const register = async (email: string, password: string) => {
  try {
    const response = await api.post('/register', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
