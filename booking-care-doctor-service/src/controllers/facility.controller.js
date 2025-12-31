const service = require('../services/facility.service');

exports.getFacilities = async (req, res) => {
  const data = await service.getAll();
  res.json({ data });
};

exports.getFacilityById = async (req, res) => {
  try {
    const data = await service.getDetail(req.params.id);
    res.json(data);
  } catch {
    res.status(404).json({ message: 'Facility not found' });
  }
};

exports.updateFacility = async (req, res) => {
  try {
    const data = await service.update(req.params.id, req.body);
    res.json(data);
  } catch {
    res.status(404).json({ message: 'Facility not found' });
  }
};

exports.deleteFacility = async (req, res) => {
  try {
    await service.remove(req.params.id);
    res.json({ message: 'Delete facility success' });
  } catch {
    res.status(404).json({ message: 'Facility not found' });
  }
};
exports.createFacility = async (req, res) => {
  try {
    const facility = await service.create(req.body);
    res.status(201).json(facility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
