import axios from 'axios';
import { showResponseToast } from '../utils/toastHandler';

const axiosInstance = axios.create({
  baseURL: 'https://uggdqjqnqjwbbjwxrhpj.supabase.co/rest/v1',
  headers: {
    'apikey': 'sb_publishable_0fXwcDjFyBV49rxNH9ooQA__fCl9M3L',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  }
});

// Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 
                    error.response?.data?.error?.message || 
                    "Something went wrong";
    
    showResponseToast(status, message, "error");
    return Promise.reject(error);
  }
);

export default axiosInstance;