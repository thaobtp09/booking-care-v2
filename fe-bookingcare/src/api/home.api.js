/**
 * API cho trang HOME
 * UI chỉ gọi, không xử lý nghiệp vụ
 */

import { axiosDoctorClient } from "./axiosClient";

export const getHomeDoctors = () => {
  return axiosDoctorClient.get('/doctor-service/api/doctors/top');
};

export const getHomeSpecialties = () => {
  return axiosDoctorClient.get('/doctor-service/api/specialties/popular');
};

export const getHomeFacilities = () => {
  return axiosDoctorClient.get('/doctor-service/api/facilities/highlight');
};
export const getAllSpecialties = () => {
  return axiosDoctorClient.get('/specialties');
};