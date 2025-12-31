const db = require('../models');
const TimeSlot = db.TimeSlot;

const findAll = () =>
  TimeSlot.findAll({
    order: [['start_time', 'ASC']]
  });

module.exports = {
  findAll
};
