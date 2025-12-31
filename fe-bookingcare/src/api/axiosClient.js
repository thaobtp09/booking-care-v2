import axios from 'axios';

// ===== AUTH SERVICE (port 4000) =====
const axiosClient = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// ===== DOCTOR SERVICE (port 5000) =====
const axiosDoctorClient = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// ===== GẮN TOKEN CHO AUTH SERVICE =====
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

// ===== GẮN TOKEN CHO DOCTOR SERVICE (NẾU CẦN) =====
axiosDoctorClient.interceptors.request.use((config) => {
  const auth = localStorage.getItem('bookingcare_auth');
  if (auth) {
    const { token } = JSON.parse(auth);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ✅ EXPORT ĐÚNG
export { axiosDoctorClient };
export default axiosClient;
