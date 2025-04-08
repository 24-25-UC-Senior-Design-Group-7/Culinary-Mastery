// src/services/auth.js
// src/services/authService.js
import axios from '../axiosConfig.js';


export const register = (username, email, password) => {
  return axios.post('/auth/register', { username, email, password });
};

export const verifyOtp = (email, otp) => {
  return axios.post('/auth/verify-otp', { email, otp });
};

export const login = (email, password) => {
  return axios.post('/auth/login', { email, password }, { withCredentials: true });
};

export const logout = () => {
  return axios.post('/auth/logout', {}, { withCredentials: true });
};

export const refreshToken = () => {
  return axios.post('/auth/refresh-token', {}, { withCredentials: true });
};

export const checkSession = () => {
  return axios.get('/auth/check-session', { withCredentials: true });
};
