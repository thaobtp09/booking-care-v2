const express = require('express');
const app = express();

app.use(express.json());

// Routes
app.use('/doctors', require('./routes/doctor.routes'));
app.use('/specialties', require('./routes/specialty.routes'));
app.use('/facilities', require('./routes/facility.routes'));
app.use('/schedules', require('./routes/schedule.routes'));

module.exports = app;
