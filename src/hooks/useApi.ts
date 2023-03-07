import axios from 'axios';

let axiosConfig = {baseURL: import.meta.env.VITE_BASE_API_URL};
const api = axios.create(axiosConfig);
api.interceptors.request.use((axiosConfig) => {
    if (localStorage.getItem('accessToken')) {
        axiosConfig.headers.Authorization =  `Bearer ${localStorage.getItem('accessToken')}`;
    }
    return axiosConfig;
});

const useApi = () => ({
    validateToken: async (token: string) => {
        try {
            const response = await api.get('/api/user');
            if (response.data.code === 200) {
                return {
                    user: {name: response.data?.data?.name, email: response?.data?.data?.email},
                    token: response?.data?.data?.access_token
                }
            }
        } catch (error) {
            // handle exception
        }

        return {user: null, token: null};
    },
    login: async (email: string, password: string) => {
        try {
            const response = await api.post('/api/login', {email, password});
            if (response.data.code === 200) {
                return {
                    user: {name: response.data?.data?.name, email: response?.data?.data?.email},
                    token: response?.data?.data?.access_token
                }
            }
        } catch (error) {
            // handle exception
        }

        return {user: null, token: null};
    },
    register: async (name: string, email: string, password: string) => {
        try {
            const response = await api.post('/api/register', {name, email, password, password_confirmation: password});
            if (response.data.code === 200) {
                return {
                    user: {name: response.data?.data?.name, email: response?.data?.data?.email}
                }
            }
        } catch (error) {
            // handle exception
        }

        return {user: null};
    },
    logout: async () => {
        try {
            const response = await api.post('/api/logout');
            if (response.data.code === 200) {
                return {status: true};
            }
        } catch (error) {
            // handle exception
        }

        return {status: false};
    },
    getTodoList: async () => {
        try {
            const response = await api.get('/api/todos');
            if (response.data.code === 200) {
                return response.data?.data || [];
            }
        } catch (error) {
            // handle exception
        }

        return [];
    },
    createTodo: async (name: string, status: boolean) => {
        try {
            const response = await api.post('/api/todos', {name, status});
            if (response.data.code === 200) {
                // return response.data?.data || {};
                return true;
            }
        } catch (error) {
            // handle exception
        }

        // return {};
        return false;
    },
    updateTodo: async (id: string, name: string, status: boolean) => {
        try {
            const response = await api.patch(`/api/todos/${id}`, {name, status});
            if (response.data.code === 200) {
                // return response.data?.data || {};
                return true;
            }
        } catch (error) {
            // handle exception
        }

        // return {};
        return false;
    },
    deleteTodo: async (id: string) => {
        try {
            const response = await api.delete(`/api/todos/${id}`);
            if (response.data.code === 200) {
                // return response.data?.data || {};
                return true;
            }
        } catch (error) {
            // handle exception
        }

        // return {};
        return false;
    },
    getTaskList: async () => {
        try {
            const response = await api.get('/api/tasks');
            if (response.data.code === 200) {
                return response.data?.data || [];
            }
        } catch (error) {
            // handle exception
        }

        return [];
    },
    createTask: async (todoId: string, name: string, status: boolean) => {
        try {
            const response = await api.post('/api/tasks', {todo_id: todoId, name, status});
            if (response.data.code === 200) {
                // return response.data?.data || {};
                return true;
            }
        } catch (error) {
            // handle exception
        }

        // return {};
        return false;
    },
    updateTask: async (id: string, name: string, status: boolean) => {
        try {
            const response = await api.patch(`/api/tasks/${id}`, {name, status});
            if (response.data.code === 200) {
                // return response.data?.data || {};
                return true;
            }
        } catch (error) {
            // handle exception
        }

        // return {};
        return false;
    },
    deleteTask: async (id: string) => {
        try {
            const response = await api.delete(`/api/tasks/${id}`);
            if (response.data.code === 200) {
                // return response.data?.data || {};
                return true;
            }
        } catch (error) {
            // handle exception
        }

        // return {};
        return false;
    },
});
 
export default useApi;