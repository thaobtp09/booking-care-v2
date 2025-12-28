import axiosClient from './axiosClient';

/**
 * API cho trang HOME
 * UI chỉ gọi, không xử lý nghiệp vụ
 */

export const getHomeDoctors = () => {
  return axiosClient.get('/doctor-service/api/doctors/top');
};

export const getHomeSpecialties = () => {
  return axiosClient.get('/doctor-service/api/specialties/popular');
};

export const getHomeFacilities = () => {
  return axiosClient.get('/doctor-service/api/facilities/highlight');
};
