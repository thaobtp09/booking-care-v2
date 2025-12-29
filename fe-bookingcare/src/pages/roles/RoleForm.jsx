import React, { useEffect, useState } from "react";
import { createRole, updateRole, getRoleById } from "../../api/admin.api";

const RoleForm = ({ roleId, onClose, onSuccess }) => {
  const isEdit = Boolean(roleId);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!isEdit) return;

    const fetchRole = async () => {
      try {
        const res = await getRoleById(roleId);
        setName(res.data.name || "");
      } catch {
        alert("Không load được role");
      }
    };

    fetchRole();
  }, [isEdit, roleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateRole(roleId, { name });
      } else {
        await createRole({ name });
      }
      onSuccess();
    } catch {
      alert("Lưu role thất bại");
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>{isEdit ? "Sửa Role" : "Thêm Role"}</h3>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Tên role</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div style={{ marginTop: 16 }}>
            <button type="submit">
              {isEdit ? "Cập nhật" : "Tạo"}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{ marginLeft: 8 }}
            >
              Huỷ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.3)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modalStyle = {
  background: "#fff",
  padding: 24,
  borderRadius: 8,
  width: 400,
};

export default RoleForm;
