import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL: 'https://spell-to-excel-7bacf3b9891e.herokuapp.com/api',
});

// Attach access token to every request
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await SecureStore.getItemAsync('refresh_token');

      try {
        const response = await axios.post(
          'https://spell-to-excel-7bacf3b9891e.herokuapp.com/api/token/refresh/',
          { refresh: refreshToken }
        );

        const newAccess = response.data.access;

        await SecureStore.setItemAsync('access_token', newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return api(originalRequest);
      } catch (err) {
        // Refresh failed → force logout
        await SecureStore.deleteItemAsync('access_token');
        await SecureStore.deleteItemAsync('refresh_token');
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;