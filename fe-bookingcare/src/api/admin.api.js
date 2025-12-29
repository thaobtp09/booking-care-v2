import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_GATEWAY;

/* ================= USER ================= */
export const getUsers = () =>
  axios.get(`${API_BASE_URL}/users`);

export const getUserById = (id) =>
  axios.get(`${API_BASE_URL}/users/${id}`);

export const createUser = (data) =>
  axios.post(`${API_BASE_URL}/users`, data);

export const updateUser = (id, data) =>
  axios.put(`${API_BASE_URL}/users/${id}`, data);

export const deleteUser = (id) =>
  axios.delete(`${API_BASE_URL}/users/${id}`);

/* ================= ROLE ================= */
export const getRoles = () =>
  axios.get(`${API_BASE_URL}/roles`);
export const getRoleById = (id) =>
  axios.get(`${API_BASE_URL}/roles/${id}`);

export const createRole = (data) =>
  axios.post(`${API_BASE_URL}/roles`, data);

export const updateRole = (id, data) =>
  axios.put(`${API_BASE_URL}/roles/${id}`, data);

export const deleteRole = (id) =>
  axios.delete(`${API_BASE_URL}/roles/${id}`);

export const getRolePermissions = (roleId) =>
  axios.get(`${API_BASE_URL}/roles/${roleId}/permissions`)

/* ================= PERMISSION ================= */
export const getPermissions = () =>
  axios.get(`${API_BASE_URL}/permissions`);

export const assignPermissionToRole = (data) =>
  axios.put(`${API_BASE_URL}/role-permissions`, data);

/* ================= DOCTOR ================= */
export const getDoctors = () =>
  axios.get(`${API_BASE_URL}/doctors`);

/* ================= FACILITY ================= */
export const getFacilities = () =>
  axios.get(`${API_BASE_URL}/facilities`);

/* ================= SPECIALTY ================= */
export const getSpecialties = () =>
  axios.get(`${API_BASE_URL}/specialties`);
