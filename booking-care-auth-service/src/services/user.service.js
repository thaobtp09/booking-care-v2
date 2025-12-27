const bcrypt = require('bcrypt');
const User = require('../models/user.model');

/**
 * Tạo user mới
 */
exports.createUser = async (data) => {
  const hash = await bcrypt.hash(data.password, 10);

  return User.create({
    username: data.username,
    email: data.email,
    password_hash: hash,
    role_id: data.role_id
  });
};

/**
 * Cập nhật user
 * - Cho phép đổi username, email, status, role
 * - Nếu có password thì hash lại
 */
exports.updateUser = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');

  // Nếu có password mới thì hash
  if (data.password) {
    data.password_hash = await bcrypt.hash(data.password, 10);
    delete data.password;
  }

  await user.update(data);
  return user;
};

/**
 * Xoá user
 */
exports.deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');

  await user.destroy();
  return true;
};
