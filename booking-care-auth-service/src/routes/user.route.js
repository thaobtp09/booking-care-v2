const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const permission = require('../middlewares/permission.middleware');

router.get('/',auth,permission('USER_VIEW'),userController.getUsers);

router.get(
  '/:id',
  auth,
  userController.getUserById
);
/**
 * Tạo user
 * Chỉ user có quyền USER_CREATE mới được phép
 */
router.post(
  '/',
  auth,                         // 1. phải login
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
  userController.deleteUser
);

module.exports = router;
