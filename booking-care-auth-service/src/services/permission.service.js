const Role = require('../models/role.model');
const Permission = require('../models/permission.model');
const RolePermission = require('../models/rolePermission.model');

/**
 * Gán danh sách permission cho role
 * - Xoá quyền cũ
 * - Gán lại quyền mới
 */
const assignPermissionsToRole = async (roleId, permissionIds) => {
  const role = await Role.findByPk(roleId);
  if (!role) {
    throw new Error('Role not found');
  }

  const permissions = await Permission.findAll({
    where: { id: permissionIds },
  });

  // Sequelize tự xử lý bảng role_permissions
  await role.setPermissions(permissions);
};

/**
 * Lấy danh sách permissionId theo role
 */
const getPermissionIdsByRole = async (roleId) => {
  const rolePermissions = await RolePermission.findAll({
    where: { roleId },
    attributes: ['permissionId'],
  });

  return rolePermissions.map(rp => rp.permissionId);
};

module.exports = {
  assignPermissionsToRole,
  getPermissionIdsByRole,
};
exports.getPermissions = async () => {
  return Permission.findAll();
};
