const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/database');

const sequelize = new Sequelize({
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  logging: false
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Facility = require('./facility.model')(sequelize, DataTypes);
db.Specialty = require('./specialty.model')(sequelize, DataTypes);
db.Doctor = require('./doctor.model')(sequelize, DataTypes);
db.TimeSlot = require('./timeSlot.model')(sequelize, DataTypes);
db.DoctorSchedule = require('./doctorSchedule.model')(sequelize, DataTypes);

module.exports = db;
