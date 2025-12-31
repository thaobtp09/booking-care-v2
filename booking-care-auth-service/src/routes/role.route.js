const express = require('express');
const router = express.Router();

const roleController = require('../controllers/role.controller');
const auth = require('../middlewares/auth.middleware');
const permission = require('../middlewares/permission.middleware');


router.get(
  '/',
  auth,
  roleController.getRoles
);

router.get(
  '/:id',
  auth,
  roleController.getRoleById
);
// GET permissions of role
router.get(
  "/:id/permissions",
  auth,
  roleController.getRolePermissions
);
/**
 * Tạo role
 */
router.post(
  '/',
  auth,
  roleController.createRole
);

/**
 * Cập nhật role
 */
router.put(
  '/:id',
  auth,
  roleController.updateRole
);

/**
 * Xoá role
 * (đã có logic check role đang được dùng trong service)
 */
router.delete(
  '/:id',
  auth,
  roleController.deleteRole
);

module.exports = router;
