import axios from 'axios';

const API_URL = 'http://laravel-api.test/api';

export const register = async (data: { name: string; email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
};
export const login = async (data: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
}
