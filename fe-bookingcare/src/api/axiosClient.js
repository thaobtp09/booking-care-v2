import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000', // gateway
  headers: {
    'Content-Type': 'application/json'
  }
});

// Gắn token tự động
axiosClient.interceptors.request.use((config) => {
  const auth = localStorage.getItem('bookingcare_auth');
  if (auth) {
    const { token } = JSON.parse(auth);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosClient;
