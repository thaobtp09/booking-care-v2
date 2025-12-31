import "./home.css";

import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import {
  Stethoscope,
  Bell,
  LogOut,
} from "lucide-react";

/**
 * AdminUI
 * - UI riêng cho Admin (KHÔNG dùng HomeUI)
 * - Header ngang, menu ngang
 * - Menu hiển thị ĐẦY ĐỦ chức năng admin
 * - Role chỉ dùng để HIỂN THỊ tên & redirect mặc định (xử lý ở Admin.jsx)
 */

const AdminUI = ({ children }) => {
  const history = useHistory();
  const routerLocation = useLocation(); // ĐỔI TÊN
  const { user, logout } = useAuth();

  return (
    <div className="home">

      {/* ===== HEADER ===== */}
      <nav className="home-header">
        <div className="home-header-inner">

          {/* LOGO */}
          <div className="home-logo">
            <Stethoscope size={24} />
            HEALTHCARE ADMIN
          </div>

          {/* ===== MENU ADMIN (FULL) ===== */}
          <div className="home-nav">
            <button onClick={() => history.push("/admin/users")}>
              User
            </button>

            <button onClick={() => history.push("/admin/roles")}>
              Role
            </button>

            {/* <button onClick={() => history.push("/admin/permissions")}>
              Permission
            </button> */}

            <button onClick={() => history.push("/admin/schedule")}>
              Lịch khám
            </button>

            <button onClick={() => history.push("/admin/doctors")}>
              Quản lý bác sĩ
            </button>

            <button onClick={() => history.push("/admin/facilities")}>
              Quản lý CSYT
            </button>

            <button onClick={() => history.push("/admin/specialties")}>
              Quản lý chuyên khoa
            </button>
          </div>

          {/* ===== ACTIONS ===== */}
          <div className="home-actions">

            {/*  Thông báo */}
            <button className="icon-btn" title="Thông báo">
              <Bell size={20} />
            </button>

            {/*  SWITCH ADMIN */}
            <label className="admin-switch">
              <input
                type="checkbox"
                checked={routerLocation.pathname.startsWith("/admin")}
                onChange={(e) => {
                  history.push(e.target.checked ? "/admin" : "/");
                }}
              />
              <span className="switch-slider"></span>
              <span className="switch-label">
                Trang quản trị ({user?.role})
              </span>
            </label>

            {/* 👤 USER */}
            <span style={{ margin: "0 12px", fontSize: 14 }}>
              {user?.username} ({user?.role})
            </span>

            {/*  LOGOUT */}
            <button
              className="icon-btn"
              title="Đăng xuất"
              onClick={() => {
                logout();
                history.push("/login");
              }}
            >
              <LogOut size={20} />
            </button>

          </div>

        </div>
      </nav>

      {/* ===== MAIN ===== */}
      <main className="home-main">
        {children}
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="home-footer">
        © 2025 HEALTHCARE ADMIN. All Rights Reserved.
      </footer>

    </div>
  );
};

export default AdminUI;
