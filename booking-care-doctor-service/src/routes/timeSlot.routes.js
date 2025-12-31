const express = require('express');
const router = express.Router();
const controller = require('../controllers/timeSlot.controller');

router.get('/', controller.getTimeSlots);

module.exports = router;
