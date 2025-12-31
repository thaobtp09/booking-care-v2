import React, { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  getRoles
} from "../../api/userApi";
import UserForm from "./UserForm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  // Load danh sách user
  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data || []);
    } catch (error) {
      console.error("Load users failed", error);
      setUsers([]); // API chưa có vẫn hiển thị trống
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Xoá user
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá user này?")) return;

    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      alert("Xoá user thất bại");
    }
  };
  console.log('user',users)
  return (
    <div>
      <h2>Quản lý User</h2>

      <button onClick={() => {
        setEditingUserId(null);
        setOpenForm(true);
      }}>
        ➕ Thêm User
      </button>

      <table border="1" cellPadding="8" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan="6" align="center">
                Chưa có dữ liệu
              </td>
            </tr>
          )}

          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user?.role?.name}</td>
              <td>{user.created_at}</td>
              <td>
                <button onClick={() => {
                  setEditingUserId(user.id);
                  setOpenForm(true);
                }}>
                  ✏️ Sửa
                </button>

                <button
                  style={{ marginLeft: 8 }}
                  onClick={() => handleDelete(user.id)}
                >
                  🗑 Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openForm && (
        <UserForm
          userId={editingUserId}
          onClose={() => setOpenForm(false)}
          onSuccess={() => {
            setOpenForm(false);
            fetchUsers();
          }}
        />
      )}
    </div>
  );
};

export default UserList;
