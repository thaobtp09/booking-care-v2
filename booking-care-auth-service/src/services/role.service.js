const Role = require('../models/role.model');
const User = require('../models/user.model');
const Permission = require("../models/permission.model");

exports.getRoles = async () => {
  return Role.findAll();
};

exports.getRoleById = async (id) => {
  return Role.findByPk(id);
};
/**
 * Tạo role mới
 */
exports.createRole = async (data) => {
  return Role.create({
    name: data.name,
    description: data.description
  });
};

/**
 * Cập nhật role
 */
exports.updateRole = async (id, data) => {
  const role = await Role.findByPk(id);
  if (!role) throw new Error('Role not found');

  await role.update(data);
  return role;
};

/**
 * Xoá role
 * KHÔNG cho xoá nếu role đang được gán cho user
 */
exports.deleteRole = async (id) => {
  const count = await User.count({ where: { role_id: id } });

  // Nếu role đang được user sử dụng → cấm xoá
  if (count > 0) {
    throw new Error('Role is in use by users');
  }

  const role = await Role.findByPk(id);
  if (!role) throw new Error('Role not found');

  await role.destroy();
  return true;
};
