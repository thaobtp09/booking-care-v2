const service = require('../services/doctor.service');


exports.getDoctors = async (req, res) => {
  const data = await service.getAll();
  res.json({ data });
};

exports.getDoctorById = async (req, res) => {
  try {
    const data = await service.getDetail(req.params.id);
    res.json(data);
  } catch {
    res.status(404).json({ message: 'Doctor not found' });
  }
};

exports.createDoctor = async (req, res) => {
  try {
    const doctor = await service.create(req.body);
    res.status(201).json(doctor);
  } catch (e) {
    console.error('CREATE DOCTOR ERROR:', e);
    res.status(500).json({ message: 'Create doctor failed' });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await service.update(req.params.id, req.body);
    res.json(doctor);
  } catch (e) {
    if (e.message === 'USER_ID_IMMUTABLE') {
      return res.status(400).json({ message: 'user_id cannot be changed' });
    }
    res.status(404).json({ message: 'Doctor not found' });
  }
};

exports.deleteDoctor = async (req, res) => {
  await service.remove(req.params.id);
  res.json({ message: 'Delete doctor success' });
};