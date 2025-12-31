import axiosClient from './axiosClient';

/* ================= USER ================= */
export const getUsers = () =>
  axiosClient.get('/users');

export const getUserById = (id) =>
  axiosClient.get(`/users/${id}`);

export const createUser = (data) =>
  axiosClient.post('/users', data);

export const updateUser = (id, data) =>
  axiosClient.put(`/users/${id}`, data);

export const deleteUser = (id) =>
  axiosClient.delete(`/users/${id}`);

/* ================= ROLE ================= */
export const getRoles = () =>
  axiosClient.get('/roles');

export const getRoleById = (id) =>
  axiosClient.get(`/roles/${id}`);

export const createRole = (data) =>
  axiosClient.post('/roles', data);

export const updateRole = (id, data) =>
  axiosClient.put(`/roles/${id}`, data);

export const deleteRole = (id) =>
  axiosClient.delete(`/roles/${id}`);

export const getRolePermissions = (roleId) =>
  axiosClient.get(`/roles/${roleId}/permissions`);

/* ================= PERMISSION ================= */
//  Auth Service CHƯA có API GET /permissions → tạm thời comment
// export const getPermissions = () =>
//   axiosClient.get('/permissions');

export const assignPermissionToRole = (roleId, data) =>
  axiosClient.put(`/roles/${roleId}/permissions`, data);
export const getPermissions = () =>
  axiosClient.get('/permissions');

/* ================= DOCTOR ================= */
export const getDoctors = () =>
  axiosClient.get('/doctors');

/* ================= FACILITY ================= */
export const getFacilities = () =>
  axiosClient.get('/facilities');

/* ================= SPECIALTY ================= */
export const getSpecialties = () =>
  axiosClient.get('/specialties');
