const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const permission = require('../middlewares/permission.middleware');
const proxy = require('../utils/proxy');

// ===== DOCTOR =====
router.get('/doctors', auth, permission('DOCTOR_VIEW'), proxy('doctor'));
router.get('/doctors/:id', auth, permission('DOCTOR_VIEW'), proxy('doctor'));
router.post('/doctors', auth, permission('DOCTOR_CREATE'), proxy('doctor'));
router.put('/doctors/:id', auth, permission('DOCTOR_UPDATE'), proxy('doctor'));
router.delete('/doctors/:id', auth, permission('DOCTOR_DELETE'), proxy('doctor'));

/* ===== SCHEDULE ===== */
router.get('/schedules', auth, permission('SCHEDULE_VIEW'), proxy('doctor'));
router.post('/schedules', auth, permission('SCHEDULE_CREATE'), proxy('doctor'));
router.put('/schedules/:id', auth, permission('SCHEDULE_UPDATE'), proxy('doctor'));
router.delete('/schedules/:id', auth, permission('SCHEDULE_DELETE'), proxy('doctor'));

/* ===== SCHEDULE BOOKING ===== */
router.get('/schedules/:id/bookings', auth, permission('SCHEDULE_VIEW_BOOKING'), proxy('doctor'));
router.get('/bookings/:id', auth, permission('BOOKING_VIEW_DETAIL'), proxy('doctor'));


//* ===== SPECIALTY ===== */
router.get('/specialties', auth, permission('SPECIALTY_VIEW'), proxy('specialty'));
router.get('/specialties/:id', auth, permission('SPECIALTY_VIEW'), proxy('specialty'));
router.post('/specialties', auth, permission('SPECIALTY_CREATE'), proxy('specialty'));
router.put('/specialties/:id', auth, permission('SPECIALTY_UPDATE'), proxy('specialty'));
router.delete('/specialties/:id', auth, permission('SPECIALTY_DELETE'), proxy('specialty'));


// ===== FACILITY =====
router.get('/facilities', auth, permission('FACILITY_VIEW'), proxy('facility'));
router.get('/facilities/:id', auth, permission('FACILITY_VIEW'), proxy('facility'));
router.post('/facilities', auth, permission('FACILITY_CREATE'), proxy('facility'));
router.put('/facilities/:id', auth, permission('FACILITY_UPDATE'), proxy('facility'));
router.delete('/facilities/:id', auth, permission('FACILITY_DELETE'), proxy('facility'));


module.exports = router;
