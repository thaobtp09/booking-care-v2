import './home.css';

import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import {
  Search,
  Menu,
  ChevronRight,
  Star,
  MapPin,
  Stethoscope,
  Calendar,
  Bell,
} from 'lucide-react';

const HomeUI = ({
  doctors = [],
  specialties = [],
  facilities = [],
}) => {
  // ✅ HOOK PHẢI Ở ĐÂY
  const history = useHistory();
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home">

      {/* ===== HEADER ===== */}
      <nav className="home-header">
        <div className="home-header-inner">

          <div className="home-logo">
            <Stethoscope size={24} />
            HEALTHCARE
          </div>

          <div className="home-nav">
           <div className="home-nav">
  <button onClick={() => history.push('/')}>
    Trang chủ
  </button>

  <button onClick={() => history.push('/specialties')}>
    Chuyên khoa
  </button>

  <button onClick={() => history.push('/facilities')}>
    Cơ sở y tế
  </button>

  <button onClick={() => history.push('/doctors')}>
    Bác sĩ
  </button>
</div>
          </div>

          <div className="home-actions">
            <button className="icon-btn">
              <Bell size={20} />
            </button>

            {!isAuthenticated ? (
              <button
                className="login-btn"
                onClick={() => history.push('/login')}
              >
                Đăng nhập
              </button>
            ) : (
              <label className="admin-switch">
  <input
    type="checkbox"
    onChange={(e) => {
      if (e.target.checked) {
        history.push('/admin');
      }
    }}
  />
  <span className="switch-slider"></span>
  <span className="switch-label">
    Trang quản trị ({user?.role})
  </span>
</label>
            )}

            <button className="icon-btn mobile-only">
              <Menu size={22} />
            </button>
          </div>

        </div>
      </nav>

      {/* ===== HERO ===== */}
      <header className="home-hero">
        <h1>Nền tảng y tế chăm sóc sức khỏe toàn diện</h1>
        <p>Đặt lịch khám bệnh nhanh chóng, bác sĩ tận tâm, uy tín.</p>

        <div className="home-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Tìm chuyên khoa, bệnh viện, bác sĩ..."
          />
        </div>
      </header>

      {/* ===== MAIN ===== */}
      <main className="home-main">

        {/* === CHUYÊN KHOA === */}
        <section className="home-section">
          <div className="home-section-header">
            <h2>Chuyên khoa phổ biến</h2>
            <span>
              Xem thêm <ChevronRight size={16} />
            </span>
          </div>

          {specialties.length === 0 ? (
            <div className="home-nodata">
              Chưa có dữ liệu chuyên khoa
            </div>
          ) : (
            <div className="home-grid-4">
              {specialties.map(item => (
                <div key={item.id} className="home-card">
                  <div className="home-icon">
                    {item.icon || '🏥'}
                  </div>
                  <div className="home-card-title">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* === CƠ SỞ Y TẾ === */}
        <section className="home-section">
          <div className="home-section-header">
            <h2>Cơ sở y tế nổi bật</h2>
            <span>
              Xem thêm <ChevronRight size={16} />
            </span>
          </div>

          {facilities.length === 0 ? (
            <div className="home-nodata">
              Chưa có dữ liệu cơ sở y tế
            </div>
          ) : (
            <div className="home-grid-3">
              {facilities.map(item => (
                <div key={item.id} className="home-card">
                  <img
                    src={item.imageUrl || '/no-image.png'}
                    alt={item.name}
                  />
                  <div className="home-card-body">
                    <h3>{item.name}</h3>
                    <div className="home-address">
                      <MapPin size={14} />
                      {item.address || '-'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* === BÁC SĨ === */}
        <section className="home-section">
          <div className="home-section-header">
            <h2>Bác sĩ nổi bật</h2>
            <span>
              Xem thêm <ChevronRight size={16} />
            </span>
          </div>

          {doctors.length === 0 ? (
            <div className="home-nodata">
              Chưa có dữ liệu bác sĩ
            </div>
          ) : (
            <div className="home-grid-4">
              {doctors.map(doc => (
                <div key={doc.id} className="home-card">
                  <h3>{doc.name}</h3>
                  <p className="home-specialty">
                    {doc.specialtyName || '-'}
                  </p>

                  <div className="home-rating">
                    <Star size={16} />
                    {doc.rating ?? '-'}
                  </div>

                  <button className="home-button">
                    <Calendar size={16} />
                    Đặt lịch khám
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>

      {/* ===== FOOTER ===== */}
      <footer className="home-footer">
        © 2025 HEALTHCARE. All Rights Reserved.
      </footer>

    </div>
  );
};

export default HomeUI;
