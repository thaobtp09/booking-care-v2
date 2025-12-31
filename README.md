# 🏥 BookingCare V2 - Medical Appointment System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-%5E17.0.0-blue)](https://reactjs.org/)

**BookingCare V2** là nền tảng đặt lịch khám bệnh trực tuyến toàn diện, giúp kết nối bệnh nhân với các bác sĩ và cơ sở y tế hàng đầu. Dự án được xây dựng với mô hình Fullstack chuyên nghiệp.

---

## ✨ Tính Năng Nổi Bật

### 🧑‍💻 Đối với Bệnh nhân
- **Tìm kiếm thông minh:** Tìm kiếm bác sĩ theo chuyên khoa, phòng khám hoặc khu vực.
- **Đặt lịch nhanh chóng:** Chọn khung giờ khám và nhận xác nhận qua Email tự động.
- **Thông tin minh bạch:** Xem chi tiết bảng giá, quy trình và bài viết giới thiệu về bác sĩ.

### 🩺 Đối với Bác sĩ
- **Quản lý lịch trình:** Tự thiết lập các khung giờ khám bệnh (Sáng/Chiều) theo ngày.
- **Quản lý bệnh nhân:** Danh sách bệnh nhân đã đặt lịch và cập nhật trạng thái khám.

### ⚙️ Đối với Quản trị viên (Admin)
- **Dashboard quản trị:** Quản lý người dùng (CRUD bác sĩ, bệnh nhân, admin).
- **Quản lý chuyên khoa/Phòng khám:** Tạo mới và chỉnh sửa thông tin các cơ sở y tế.
- **Hệ thống Cẩm nang:** Soạn thảo bài viết y khoa bằng Markdown/Rich Text Editor.

---

## 🛠 Công Nghệ Sử Dụng

| Phần | Công nghệ |
| :--- | :--- |
| **Frontend** | ReactJS, Redux, SCSS, Axios, React-Markdown |
| **Backend** | Node.js, Express, Sequelize (ORM) |
| **Database** | MySQL |
| **Tiện ích** | Nodemailer (Email), JWT (Auth), Moment.js |

---

## 🚀 Hướng Dẫn Cài Đặt

### 1. Yêu cầu hệ thống
- **Node.js**: >= 14.x
- **MySQL**: >= 5.7
### 2. Clone dự án
```bash
git clone [https://github.com/thaobtp09/booking-care-v2.git](https://github.com/thaobtp09/booking-care-v2.git)
cd booking-care-v2
```
### 3. Cài đặt Backend
```bash
cd backend
npm install
```
### 4. Cài đặt frontend
```bash
cd frontend
npm install
```
### 5. Khởi chạy
```bash
Chạy Backend: npm start (tại thư mục backend)

Chạy Frontend: npm start (tại thư mục frontend)
```
## 📂 Cấu Trúc Thư Mục
```bash
booking-care-v2/
├── backend/            # Express.js API, Sequelize Models, Migrations
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   └── route/
├── frontend/           # ReactJS Application
│   ├── src/
│   │   ├── containers/ # Trang chính (Patient, System, Doctor)
│   │   ├── store/      # Redux (Actions, Reducers)
│   │   └── services/   # API Services
└── database/           # Scripts SQL (nếu có)
```
