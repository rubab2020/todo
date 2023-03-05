import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL
});

const useApi = () => ({
    validateToken: async (token: string) => {
        // const response = await api.post('/api/validate', {token});
        // return response.data;
        return {
            user: {name: 'Admin', email: 'admin@demo.com'}
        };
    },
    login: async (email: string, password: string) => {
        // const response = await api.post('/api/login', {email, password});
        // return response.data;
        return {
            user: {name: 'Admin', email: 'admin@demo.com'},
            token: '12345678'
        };
    },
    logout: async () => {
        // const response = await api.post('/api/logout');
        // return response.data;
        return {status: true};
    }
});
 
export default useApi;