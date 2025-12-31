const express = require('express');
const app = express();
const cors = require('cors');

const facilityRoutes = require('./routes/facility.routes');
const specialtyRoutes = require('./routes/specialty.routes');
const doctorRoutes = require('./routes/doctor.routes');
const timeSlotRoutes = require('./routes/timeSlot.routes');
const doctorScheduleRoutes = require('./routes/doctorSchedule.routes');

app.use(cors());
app.use(express.json());
app.use('/facilities', facilityRoutes);
app.use('/specialties', specialtyRoutes);
app.use('/doctors', doctorRoutes);
app.use('/time-slots', timeSlotRoutes);
app.use('/doctor-schedules', doctorScheduleRoutes);

module.exports = app;
