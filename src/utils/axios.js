import axios from 'axios'
import { API_BASE_URL } from '@/config/api.js'

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL
})

// Request interceptor to add Authorization header
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage (works outside Vue context)
    const token = localStorage.getItem('accessToken')
    
    // Add Authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle 401 errors
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // If 401, clear auth data and redirect to login
    if (error.response && error.response.status === 401) {
      // Clear auth data from localStorage
      localStorage.removeItem('userID')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('accessTokenExpirationDate')
      localStorage.removeItem('userEmail')
      
      // Only redirect if we're not already on login page
      if (window.location.pathname !== '/sign-in') {
        window.location.href = '/sign-in?next=' + encodeURIComponent(window.location.pathname)
      }
    }
    
    return Promise.reject(error)
  }
)

export default apiClient

