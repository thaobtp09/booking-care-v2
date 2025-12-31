const router = require('express').Router();
const controller = require('../controllers/booking.controller');

router.post('/bookings', controller.createBooking);
router.get('/bookings/:id', controller.getBooking);

module.exports = router;
