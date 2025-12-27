const express = require('express');
const router = express.Router();

const roleController = require('../controllers/role.controller');
const auth = require('../middlewares/auth.middleware');
const permission = require('../middlewares/permission.middleware');

/**
 * Tạo role
 */
router.post(
  '/',
  auth,
  permission('ROLE_CREATE'),
  roleController.createRole
);

/**
 * Cập nhật role
 */
router.put(
  '/:id',
  auth,
  permission('ROLE_UPDATE'),
  roleController.updateRole
);

/**
 * Xoá role
 * (đã có logic check role đang được dùng trong service)
 */
router.delete(
  '/:id',
  auth,
  permission('ROLE_DELETE'),
  roleController.deleteRole
);

module.exports = router;
