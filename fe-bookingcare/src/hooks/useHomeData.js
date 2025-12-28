import { useEffect, useState } from 'react';
import {
  getHomeDoctors,
  getHomeFacilities,
  getHomeSpecialties,
} from '../api/home.api';

/**
 * useHomeData
 *
 * MỤC ĐÍCH:
 * - Lấy toàn bộ dữ liệu cho trang Home
 * - Quản lý trạng thái loading / error
 * - Đảm bảo UI KHÔNG BAO GIỜ trắng
 */
export const useHomeData = () => {

  // ========================
  // STATE QUẢN LÝ DỮ LIỆU
  // ========================

  // Danh sách bác sĩ cho Home
  const [doctors, setDoctors] = useState([]);

  // Danh sách chuyên khoa cho Home
  const [specialties, setSpecialties] = useState([]);

  // Danh sách cơ sở y tế cho Home
  const [facilities, setFacilities] = useState([]);

  // Trạng thái loading (đang gọi API)
  const [loading, setLoading] = useState(true);

  // Trạng thái lỗi (nếu API fail)
  const [error, setError] = useState(null);

  // ========================
  // SIDE EFFECT: GỌI API
  // ========================

  useEffect(() => {
    // Cờ để tránh setState khi component đã unmount
    let isMounted = true;

    // Hàm async lấy dữ liệu cho Home
    const fetchHomeData = async () => {
      try {
        /**
         * Gọi song song 3 API:
         * - Bác sĩ nổi bật
         * - Chuyên khoa phổ biến
         * - Cơ sở y tế nổi bật
         */
        const [doctorRes, specialtyRes, facilityRes] = await Promise.all([
          getHomeDoctors(),
          getHomeSpecialties(),
          getHomeFacilities(),
        ]);

        // Nếu component đã bị unmount thì dừng
        if (!isMounted) return;

        /**
         * Gán dữ liệu vào state
         * - Có data → dùng
         * - Không có → fallback []
         */
        setDoctors(doctorRes?.data || []);
        setSpecialties(specialtyRes?.data || []);
        setFacilities(facilityRes?.data || []);
      } catch (err) {
        /**
         * Nếu API lỗi:
         * - Log lỗi để dev biết
         * - Không cho UI crash
         * - Set data rỗng để UI vẫn render
         */
        console.error('HOME API ERROR:', err);

        if (!isMounted) return;

        setError(err);
        setDoctors([]);
        setSpecialties([]);
        setFacilities([]);
      } finally {
        /**
         * Dù API thành công hay thất bại
         * → loading PHẢI = false
         *
         * Đây là dòng QUAN TRỌNG NHẤT
         * nếu thiếu → UI sẽ trắng
         */
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Gọi hàm fetch dữ liệu
    fetchHomeData();

    /**
     * Cleanup function:
     * - Chạy khi component unmount
     * - Tránh memory leak
     * - Tránh warning: setState on unmounted component
     */
    return () => {
      isMounted = false;
    };
  }, []);

  // ========================
  // GIÁ TRỊ TRẢ VỀ CHO PAGE
  // ========================

  return {
    doctors,       // dữ liệu bác sĩ
    specialties,   // dữ liệu chuyên khoa
    facilities,    // dữ liệu cơ sở y tế
    loading,       // trạng thái loading
    error,         // lỗi (nếu có)
  };
};
