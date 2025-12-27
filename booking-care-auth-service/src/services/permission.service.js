const Role = require('../models/role.model');
const Permission = require('../models/permission.model');

/**
 * Gán danh sách permission cho role
 * - Xoá quyền cũ
 * - Gán lại quyền mới
 */
exports.assignPermissionsToRole = async (roleId, permissionIds) => {
  const role = await Role.findByPk(roleId);
  if (!role) throw new Error('Role not found');

  const permissions = await Permission.findAll({
    where: { id: permissionIds }
  });

  // setPermissions là hàm Sequelize sinh ra từ belongsToMany
  await role.setPermissions(permissions);
  return true;
};
