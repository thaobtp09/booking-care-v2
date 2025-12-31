const express = require('express');
const router = express.Router();
const controller = require('../controllers/doctorSchedule.controller');

router.get('/', controller.getAllSchedules);
router.get('/doctor/:doctorId', controller.getSchedulesByDoctor);
router.post('/', controller.createSchedule);
router.put('/:id', controller.updateSchedule);
router.delete('/:id', controller.deleteSchedule);

module.exports = router;
