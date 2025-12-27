const sequelize = require('../config/database');
const Role = require('./role.model');
const Permission = require('./permission.model');

// Bảng trung gian role_permissions
const RolePermission = sequelize.define(
  'role_permissions',
  {},
  {
    timestamps: false
  }
);

// Một role có nhiều permission
Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: 'role_id'
});

// Một permission thuộc nhiều role
Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: 'permission_id'
});

module.exports = RolePermission;
