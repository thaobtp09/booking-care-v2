const bcrypt = require('bcrypt');
const Role = require('../models/role.model');
const Permission = require('../models/permission.model');
const User = require('../models/user.model');

async function initAdmin() {
  //  Role ADMIN
  const [adminRole] = await Role.findOrCreate({
    where: { name: 'ADMIN' },
  });

  //  Permissions
  const permissionNames = [
    'USER_VIEW',
    'USER_CREATE',
    'USER_UPDATE',
    'USER_DELETE',
    'ROLE_VIEW',
    'ROLE_CREATE',
    'ROLE_UPDATE',
    'ROLE_DELETE',
    'PERMISSION_ASSIGN',
  ];

  const permissions = [];
  for (const name of permissionNames) {
    const [p] = await Permission.findOrCreate({ where: { name } });
    permissions.push(p);
  }

  //  Gán permission cho ADMIN
  await adminRole.setPermissions(permissions);

  //  User admin
  const passwordHash = await bcrypt.hash('123456', 10);

  await User.findOrCreate({
    where: { email: 'admin@system.com' },
    defaults: {
      username: 'Super Admin',
      password_hash: passwordHash,
      roleId: adminRole.id,
    },
  });

  console.log('✅ Init admin success');
}

module.exports = initAdmin;
