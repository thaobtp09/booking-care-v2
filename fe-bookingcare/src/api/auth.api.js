import axios from './axiosClient';

/**
 * Login qua Gateway → Auth Service
 */
export const login = (payload) => {
  return axios.post('/auth-service/auth/login', payload);
};
