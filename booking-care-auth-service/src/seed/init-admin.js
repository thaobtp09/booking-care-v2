const bcrypt = require('bcrypt');
const Role = require('../models/role.model');
const Permission = require('../models/permission.model');
const User = require('../models/user.model');

async function initAdmin() {
  //  Role ADMIN
  const [adminRole] = await Role.findOrCreate({
    where: { name: 'ADMIN' },
  });

  const permissionNames = [
  // USER
  'USER_VIEW',
  'USER_CREATE',
  'USER_UPDATE',
  'USER_DELETE',

  // ROLE & PERMISSION
  'ROLE_VIEW',
  'ROLE_CREATE',
  'ROLE_UPDATE',
  'ROLE_DELETE',
  'PERMISSION_VIEW',
  'PERMISSION_ASSIGN',

  // DOCTOR
  'DOCTOR_VIEW',
  'DOCTOR_CREATE',
  'DOCTOR_UPDATE',
  'DOCTOR_DELETE',

  // SCHEDULE
  'SCHEDULE_VIEW',
  'SCHEDULE_CREATE',
  'SCHEDULE_UPDATE',
  'SCHEDULE_DELETE',

  // FACILITY
  'FACILITY_VIEW',
  'FACILITY_CREATE',
  'FACILITY_UPDATE',
  'FACILITY_DELETE',

  // SPECIALTY
  'SPECIALTY_VIEW',
  'SPECIALTY_CREATE',
  'SPECIALTY_UPDATE',
  'SPECIALTY_DELETE',
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

  console.log(' Init admin success');
}

module.exports = initAdmin;