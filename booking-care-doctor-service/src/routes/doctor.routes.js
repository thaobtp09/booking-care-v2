const router = require('express').Router();
const controller = require('../controllers/doctor.controller');
const { uploadDoctorAvatar } = require('../config/upload');

/**
 * Doctor routes
 */

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

router.post(
  '/',
  uploadDoctorAvatar.single('avatar'),
  controller.create
);

router.put(
  '/:id',
  uploadDoctorAvatar.single('avatar'),
  controller.update
);

router.delete('/:id', controller.delete);

module.exports = router;
