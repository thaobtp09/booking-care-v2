import React, { useEffect, useState } from "react";
import {
  createUser,
  getUserById,
  updateUser
} from "../../api/userApi";

const UserForm = ({ userId, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    role: ""
  });

  const isEdit = Boolean(userId);

  // Nếu là sửa → gọi API lấy thông tin user
  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const res = await getUserById(userId);
        setForm({
          username: res.data.username,
          email: res.data.email,
          role: res.data.role
        });
      } catch (error) {
        alert("Không lấy được thông tin user");
      }
    };

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

    try {
      if (isEdit) {
        await updateUser(userId, form);
      } else {
        await createUser(form);
      }

      onSuccess();
    } catch (error) {
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

        <div>
          <label>Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn role --</option>
            <option value="ADMIN">ADMIN</option>
            <option value="DOCTOR">DOCTOR</option>
            <option value="PATIENT">PATIENT</option>
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
