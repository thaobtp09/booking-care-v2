const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const Role = require('../models/role.model');
const Permission = require('../models/permission.model');
const { generateToken } = require('../utils/jwt');

// Xử lý login
exports.login = async ({ email, password }) => {
  // Tìm user theo email
  const user = await User.findOne({
    where: { email },
    include: {
      model: Role,
      include: Permission // lấy luôn permissions của role
    }
  });
  console.log('user', user)
  if (!user) {
    throw new Error('User not found');
  }

  // So sánh password với password_hash
  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    throw new Error('Invalid password');
  }

  // Lấy danh sách permission
  // const permissions = user?.role?.permissions.map(p => p.name);

  // Tạo JWT
  const token = generateToken({
    userId: user.id,
    role: user?.role?.name,
    // permissions,
    doctor_id: user.doctor_id
  });

  // Trả về cho UI
  return {
    token,
    user: {
      id: user?.id,
      username: user?.username,
      role: user?.role?.name,
      // permissions,
      doctor_id: user.doctor_id
    }
  };
};
