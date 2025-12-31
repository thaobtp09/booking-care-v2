const express = require('express');
const router = express.Router();
const controller = require('../controllers/doctor.controller');

router.post('/', controller.createDoctor);
router.get('/', controller.getDoctors);
router.get('/:id', controller.getDoctorById);
router.put('/:id', controller.updateDoctor);
router.delete('/:id', controller.deleteDoctor);

module.exports = router;
