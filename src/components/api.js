import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'https://spell-to-excel-7bacf3b9891e.herokuapp.com/api';

const api = axios.create({ baseURL: BASE_URL });

let isRefreshing = false;
let queue = [];

const flushQueue = (error, token = null) => {
  queue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(token)
  );
  queue = [];
};

// Optional: register a callback your AuthContext sets, so we can
// trigger logout/navigation when refresh fails.
let onAuthFailure = null;
export const setOnAuthFailure = (fn) => { onAuthFailure = fn; };

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // If a refresh is already in flight, wait for it
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = await SecureStore.getItemAsync('refresh_token');
      if (!refreshToken) throw new Error('No refresh token');

      const { data } = await axios.post(`${BASE_URL}/token/refresh/`, {
        refresh: refreshToken,
      });

      await SecureStore.setItemAsync('access_token', data.access);
      // Save rotated refresh token if the backend returned one
      if (data.refresh) {
        await SecureStore.setItemAsync('refresh_token', data.refresh);
      }

      flushQueue(null, data.access);
      originalRequest.headers.Authorization = `Bearer ${data.access}`;
      return api(originalRequest);
    } catch (err) {
      flushQueue(err, null);
      await SecureStore.deleteItemAsync('access_token');
      await SecureStore.deleteItemAsync('refresh_token');
      if (onAuthFailure) onAuthFailure();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;