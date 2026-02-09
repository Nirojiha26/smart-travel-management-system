import axios from 'axios';

const API_URL = 'http://localhost:5050/api/auth/';

const authService = {
  async register(userData) {
    const response = await axios.post(`${API_URL}/register`, userData)
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  },

  async login(userData) {
    const response = await axios.post(`${API_URL}/login`, userData)
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  },

  async logout() {
    localStorage.removeItem('user')
  },

  async sendVerificationCode(email) {
    const response = await axios.post(`${API_URL}/send-verification`, { email })
    return response.data
  },

  async verifyEmail(email, code) {
    const response = await axios.post(`${API_URL}/verify-email`, { email, code })
    return response.data
  },

  async forgotPassword(email) {
    const response = await axios.post(`${API_URL}/forgot-password`, { email })
    return response.data
  },

  async resetPassword(email, code, newPassword) {
    const response = await axios.post(`${API_URL}/reset-password`, { 
      email, 
      code, 
      newPassword 
    })
    return response.data
  },

  getCurrentUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  getAuthHeader() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` }
    } else {
      return {}
    }
  }
}

export default authService;
