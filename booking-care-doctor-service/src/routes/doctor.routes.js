const express = require('express');
const router = express.Router();
const controller = require('../controllers/doctor.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, controller.createDoctor);
router.get('/', auth, controller.getDoctors);
router.get('/:id', auth, controller.getDoctorById);
router.put('/:id', auth, controller.updateDoctor);
router.delete('/:id', auth, controller.deleteDoctor);

module.exports = router;
