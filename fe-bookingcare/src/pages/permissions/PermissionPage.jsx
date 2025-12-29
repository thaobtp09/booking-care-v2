import React, { useEffect, useState } from "react";
import {
  getRoles,
  getPermissions,
  getRolePermissions,
  assignPermissionToRole,
} from "../../api/admin.api";

const PermissionPage = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [checkedPermissions, setCheckedPermissions] = useState([]);

  /* ===== LOAD ROLE + PERMISSION ===== */
  useEffect(() => {
    const fetchInitData = async () => {
      try {
        const [roleRes, permRes] = await Promise.all([
          getRoles(),
          getPermissions(),
        ]);

        setRoles(roleRes.data || []);
        setPermissions(permRes.data || []);
      } catch {
        alert("Không tải được role / permission");
      }
    };

    fetchInitData();
  }, []);

  /* ===== CHỌN ROLE → LOAD PERMISSION ===== */
  const handleSelectRole = async (roleId) => {
    setSelectedRoleId(roleId);

    try {
      const res = await getRolePermissions(roleId);
      const permissionIds = res.data.map((p) => p.id);
      setCheckedPermissions(permissionIds);
    } catch {
      alert("Không load được permission của role");
      setCheckedPermissions([]);
    }
  };

  /* ===== TOGGLE ===== */
  const togglePermission = (permissionId) => {
    setCheckedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  /* ===== UPDATE ===== */
  const handleUpdate = async () => {
    if (!selectedRoleId) {
      alert("Vui lòng chọn role");
      return;
    }

    try {
      await assignPermissionToRole(selectedRoleId, {
        permissionIds: checkedPermissions,
      });

      alert("Cập nhật permission thành công");
    } catch {
      alert("Cập nhật permission thất bại");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Phân quyền hệ thống</h2>
        <button onClick={handleUpdate}>💾 Cập nhật</button>
      </div>

      <div style={{ display: "flex", gap: 32, marginTop: 16 }}>
        {/* ROLE */}
        <div style={{ width: 240, borderRight: "1px solid #ddd" }}>
          <h4>Role</h4>
          {roles.map((role) => (
            <label key={role.id} style={{ display: "block", marginBottom: 8 }}>
              <input
                type="radio"
                name="role"
                checked={selectedRoleId === role.id}
                onChange={() => handleSelectRole(role.id)}
              />
              {" "}{role.name}
            </label>
          ))}
        </div>

        {/* PERMISSION */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
          }}
        >
          {permissions.map((p) => (
            <label key={p.id}>
              <input
                type="checkbox"
                checked={checkedPermissions.includes(p.id)}
                onChange={() => togglePermission(p.id)}
              />
              {" "}{p.name}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PermissionPage;
