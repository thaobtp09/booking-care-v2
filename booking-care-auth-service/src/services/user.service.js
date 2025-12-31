const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.getUsers = async () => {
  return User.findAll({
    attributes: { exclude: ['password_hash'] },
    include: ['role'],
  });
};

exports.getUserById = async (id) => {
  return User.findByPk(id, {
    attributes: { exclude: ['password_hash'] },
    include: ['role'],
  });
};

/**
 * =========================
 * CREATE USER
 * =========================
 * - doctor_id luôn NULL
 */
exports.createUser = async (data) => {
  const hash = await bcrypt.hash(data.password, 10);
  console.log('data',data)
  return User.create({
    username: data.username,
    email: data.email,
    password_hash: hash,
    role_id: data?.roleId,
  });
};

/**
 * =========================
 * UPDATE USER
 * =========================
 * doctor_id:
 * - DB NULL → cho set
 * - DB có giá trị:
 *    + trùng → OK
 *    + khác → 400
 */
exports.updateUser = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');

  // ===== FIX: map roleId -> role_id =====
  if ('roleId' in data) {
    data.role_id = data.roleId;
    delete data.roleId; // ❗ rất quan trọng
  }

  // XỬ LÝ doctor_id
  if ('doctor_id' in data) {
    const currentDoctorId = user.doctor_id;
    const incomingDoctorId = data.doctor_id;

    if (
      currentDoctorId !== null &&
      String(currentDoctorId) !== String(incomingDoctorId)
    ) {
      throw new Error('doctor_id cannot be changed');
    }
  }

  // Hash lại password nếu có
  if (data.password) {
    data.password_hash = await bcrypt.hash(data.password, 10);
    delete data.password;
  }

  await user.update(data);
  return user;
};

/**
 * =========================
 * DELETE USER
 * =========================
 */
exports.deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');

  await user.destroy();
  return true;
};
