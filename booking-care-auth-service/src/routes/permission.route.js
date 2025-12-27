const express = require('express');
const router = express.Router();

const permissionController = require('../controllers/permission.controller');
const auth = require('../middlewares/auth.middleware');
const permission = require('../middlewares/permission.middleware');

/**
 * Gán permission cho role
 * CỰC KỲ NGUY HIỂM nếu không chặn
 */
router.post(
  '/roles/:id/permissions',
  auth,
  permission('PERMISSION_ASSIGN'),
  permissionController.assignPermissions
);

module.exports = router;
