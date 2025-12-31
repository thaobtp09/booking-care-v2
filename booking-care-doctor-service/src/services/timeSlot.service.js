const repo = require('../repositories/timeSlot.repository');

const getAll = () => repo.findAll();

module.exports = {
  getAll
};
