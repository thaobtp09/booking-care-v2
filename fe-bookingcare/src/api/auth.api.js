import axios from './axiosClient';

/**
 * Login qua Gateway → Auth Service
 */
export const login = (payload) => {
  console.log ('here')
  return axios.post('/auth/login', payload);
};
