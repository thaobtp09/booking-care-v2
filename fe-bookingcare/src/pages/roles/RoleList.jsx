import React, { useEffect, useState } from "react";
import { getRoles, deleteRole } from "../../api/admin.api";
import RoleForm from "./RoleForm";

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);

  const fetchRoles = async () => {
    try {
      const res = await getRoles();
      setRoles(res.data || []);
    } catch {
      setRoles([]);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Xoá role này?")) return;
    try {
      await deleteRole(id);
      fetchRoles();
    } catch {
      alert("Xoá role thất bại");
    }
  };

  return (
    <div>
      <h2>Quản lý Role</h2>

      <button
        onClick={() => {
          setEditingRoleId(null);
          setOpenForm(true);
        }}
      >
        ➕ Thêm Role
      </button>

      <table border="1" cellPadding="8" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên role</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {roles.length === 0 && (
            <tr>
              <td colSpan="3" align="center">
                Chưa có dữ liệu
              </td>
            </tr>
          )}

          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td>
                <button
                  onClick={() => {
                    setEditingRoleId(role.id);
                    setOpenForm(true);
                  }}
                >
                  ✏️ Sửa
                </button>
                <button
                  style={{ marginLeft: 8 }}
                  onClick={() => handleDelete(role.id)}
                >
                  🗑 Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openForm && (
        <RoleForm
          roleId={editingRoleId}
          onClose={() => setOpenForm(false)}
          onSuccess={() => {
            setOpenForm(false);
            fetchRoles();
          }}
        />
      )}
    </div>
  );
};

export default RoleList;
