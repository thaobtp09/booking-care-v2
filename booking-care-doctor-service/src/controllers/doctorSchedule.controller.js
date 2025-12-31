const service = require('../services/doctorSchedule.service');

exports.getAllSchedules = async (req, res) => {
  const data = await service.getAll();
  res.json({ data });
};

exports.getSchedulesByDoctor = async (req, res) => {
  const { date } = req.query;
  const data = await service.getByDoctor(req.params.doctorId, date);
  res.json({ data });
};


exports.createSchedule = async (req, res) => {
  try {
    const data = await service.create(req.body); 
    res.status(201).json(data);
  } catch (e) {
    console.error('[CREATE SCHEDULE ERROR]', e);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateSchedule = async (req, res) => {
  try {
    const data = await service.update(req.params.id, req.body);
    res.json(data);
  } catch (e) {
    console.error('[UPDATE SCHEDULE ERROR]', e);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    await service.remove(req.params.id);
    res.json({ success: true });
  } catch (e) {
    console.error('[DELETE SCHEDULE ERROR]', e);
    res.status(500).json({ message: 'Server error' });
  }
};

