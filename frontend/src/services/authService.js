import axios from 'axios';

const API_URL = 'http://localhost:5050/api/auth/';

// Send verification code
const sendVerificationCode = async (email) => {
  const response = await axios.post(API_URL + 'send-verification', { email });
  return response.data;
};

// Verify email with code
const verifyEmail = async (email, code) => {
  const response = await axios.post(API_URL + 'verify-email', { email, code });
  return response.data;
};

// Register user (after email verification)
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  sendVerificationCode,
  verifyEmail,
  register,
  logout,
  login,
};

export default authService;
