const express = require('express');
const router = express.Router();

const permissionController = require('../controllers/permission.controller');
const auth = require('../middlewares/auth.middleware');
const permission = require('../middlewares/permission.middleware');

/**
 * GET /roles/:roleId/permissions
 * Lấy danh sách permission của role
 */
router.get(
  '/roles/:roleId/permissions',
  auth,
  permission('PERMISSION_VIEW'),
  permissionController.getPermissionsByRole
);

/**
 * PUT /roles/:roleId/permissions
 * Gán lại danh sách permission cho role
 *  CỰC KỲ NGUY HIỂM nếu không chặn quyền
 */
router.put(
  '/roles/:roleId/permissions',
  auth,
  permission('PERMISSION_ASSIGN'),
  permissionController.assignPermissions
);

module.exports = router;
