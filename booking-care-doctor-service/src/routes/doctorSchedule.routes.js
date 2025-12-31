const express = require('express');
const router = express.Router();
const controller = require('../controllers/doctorSchedule.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const doctorIdMiddleware = require('../middlewares/doctorId.middleware');

router.get('/', controller.getAllSchedules);
router.get('/doctor/:doctorId', controller.getSchedulesByDoctor);
router.post('/', authMiddleware, roleMiddleware, doctorIdMiddleware, controller.createSchedule);
router.put('/:id', controller.updateSchedule);
router.delete('/:id', authMiddleware, roleMiddleware, doctorIdMiddleware, controller.deleteSchedule);

module.exports = router;
