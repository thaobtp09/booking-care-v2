import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_GATEWAY;

/**
 * Lấy danh sách user
 */
export const getUsers = () => {
  return axios.get(`${API_BASE_URL}/users`);
};

/**
 * Lấy chi tiết user theo id
 */
export const getUserById = (id) => {
  return axios.get(`${API_BASE_URL}/users/${id}`);
};

/**
 * Thêm user mới
 */
export const createUser = (data) => {
  return axios.post(`${API_BASE_URL}/users`, data);
};

/**
 * Cập nhật user
 */
export const updateUser = (id, data) => {
  return axios.put(`${API_BASE_URL}/users/${id}`, data);
};

/**
 * Xoá user
 */
export const deleteUser = (id) => {
  return axios.delete(`${API_BASE_URL}/users/${id}`);
};
