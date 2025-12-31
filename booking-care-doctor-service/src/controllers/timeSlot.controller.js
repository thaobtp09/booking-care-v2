const service = require('../services/timeSlot.service');

exports.getTimeSlots = async (req, res) => {
  const data = await service.getAll();
  res.json({ data });
};
