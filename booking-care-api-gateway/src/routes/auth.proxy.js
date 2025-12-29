const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const permission = require('../middlewares/permission.middleware');
const proxy = require('../utils/proxy');

// ===== USER =====
router.get('/users', auth, permission('USER_VIEW'), proxy('auth'));
router.get('/users/:id', auth, permission('USER_VIEW'), proxy('auth'));
router.post('/users', auth, permission('USER_CREATE'), proxy('auth'));
router.put('/users/:id', auth, permission('USER_UPDATE'), proxy('auth'));
router.delete('/users/:id', auth, permission('USER_DELETE'), proxy('auth'));

// ===== ROLE =====
router.get('/roles', auth, permission('ROLE_VIEW'), proxy('auth'));
router.get('/roles/:id', auth, permission('ROLE_VIEW'), proxy('auth'));
router.post('/roles', auth, permission('ROLE_CREATE'), proxy('auth'));
router.put('/roles/:id', auth, permission('ROLE_UPDATE'), proxy('auth'));
router.delete('/roles/:id', auth, permission('ROLE_DELETE'), proxy('auth'));

// ===== ROLE ↔ PERMISSION =====
router.get(
  '/roles/:id/permissions',
  auth,
  permission('PERMISSION_VIEW'),
  proxy('auth')
);

// ===== PERMISSION =====
router.get(
  '/permissions',
  auth,
  permission('PERMISSION_VIEW'),
  proxy('auth')
);

router.put(
  '/roles/:id/permissions',
  auth,
  permission('PERMISSION_ASSIGN'),
  proxy('auth')
);

module.exports = router;
