const service = require('../services/specialty.service');

exports.createSpecialty = async (req, res) => {
  const data = await service.create(req.body);
  res.status(201).json(data);
};

exports.getSpecialties = async (req, res) => {
  const data = await service.getAll();
  res.json({ data });
};

exports.getSpecialtyById = async (req, res) => {
  try {
    const data = await service.getDetail(req.params.id);
    res.json(data);
  } catch {
    res.status(404).json({ message: 'Specialty not found' });
  }
};

exports.updateSpecialty = async (req, res) => {
  try {
    const data = await service.update(req.params.id, req.body);
    res.json(data);
  } catch {
    res.status(404).json({ message: 'Specialty not found' });
  }
};

exports.deleteSpecialty = async (req, res) => {
  try {
    await service.remove(req.params.id);
    res.json({ message: 'Delete specialty success' });
  } catch {
    res.status(404).json({ message: 'Specialty not found' });
  }
};
