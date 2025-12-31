import React, { useEffect, useState } from "react";
import {
  createUser,
  getRoles,
  getUserById,
  updateUser
} from "../../api/userApi";

const UserForm = ({ userId, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    roleId: "",
    password: "" // 🔥 thêm password
  });

  const [roles, setRoles] = useState([]);
  const isEdit = Boolean(userId);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await getRoles();
        setRoles(res.data || []);
      } catch {
        alert("Không lấy được danh sách role");
      }
    };

    const fetchUser = async () => {
      if (!userId) return;

      try {
        const res = await getUserById(userId);
        setForm(prev => ({
          ...prev,
          username: res.data.username,
          email: res.data.email,
          roleId: res.data?.role?.id || "",
          password: "" // ❗ không fill password khi edit
        }));
      } catch {
        alert("Không lấy được thông tin user");
      }
    };

    fetchRoles();
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username: form.username,
      email: form.email,
      roleId: Number(form.roleId)
    };

    // 🔥 CHỈ gửi password khi có nhập
    if (form.password) {
      payload.password = form.password;
    }

    try {
      if (isEdit) {
        await updateUser(userId, payload);
      } else {
        await createUser(payload);
      }
      onSuccess();
    } catch {
      alert("Lưu user thất bại");
    }
  };

  return (
    <div style={modalStyle}>
      <h3>{isEdit ? "Sửa User" : "Thêm User"}</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* 🔥 PASSWORD */}
        <div>
          <label>
            Mật khẩu {isEdit && <i>(để trống nếu không đổi)</i>}
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required={!isEdit} // tạo mới bắt buộc
          />
        </div>

        <div>
          <label>Role</label>
          <select
            name="roleId"
            value={form.roleId}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn role --</option>
            {roles.map(role => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: 10 }}>
          <button type="submit">💾 Lưu</button>
          <button
            type="button"
            onClick={onClose}
            style={{ marginLeft: 8 }}
          >
            ❌ Huỷ
          </button>
        </div>
      </form>
    </div>
  );
};

const modalStyle = {
  position: "fixed",
  top: "20%",
  left: "35%",
  background: "#fff",
  padding: 20,
  border: "1px solid #ccc"
};

export default UserForm;
