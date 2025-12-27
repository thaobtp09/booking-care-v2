const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const permission = require('../middlewares/permission.middleware');

/**
 * Tạo user
 * Chỉ user có quyền USER_CREATE mới được phép
 */
router.post(
  '/',
  auth,                         // 1. phải login
  permission('USER_CREATE'),    // 2. phải có quyền tạo user
  userController.createUser
);

/**
 * Cập nhật user
 */
router.put(
  '/:id',
  auth,
  permission('USER_UPDATE'),
  userController.updateUser
);

/**
 * Xoá user
 */
router.delete(
  '/:id',
  auth,
  permission('USER_DELETE'),
  userController.deleteUser
);

module.exports = router;
