const doctorService = require('../services/doctor.service');

/**
 * GET /doctors
 */
exports.getAll = async (req, res) => {
  const data = await doctorService.getAll();
  res.json(data);
};

/**
 * GET /doctors/:id
 */
exports.getById = async (req, res) => {
  const data = await doctorService.getById(req.params.id);
  res.json(data);
};

/**
 * POST /doctors
 * multipart/form-data
 */
exports.create = async (req, res) => {
  const avatarPath = req.file
    ? `/uploads/doctors/${req.file.filename}`
    : null;

  const doctorData = {
    name: req.body.name,
    avatar: avatarPath,
    specialtyId: req.body.specialtyId,
    facilityId: req.body.facilityId,
    description: req.body.description
  };

  const data = await doctorService.create(doctorData);
  res.status(201).json(data);
};

/**
 * PUT /doctors/:id
 */
exports.update = async (req, res) => {
  const avatarPath = req.file
    ? `/uploads/doctors/${req.file.filename}`
    : undefined;

  const updateData = {
    name: req.body.name,
    specialtyId: req.body.specialtyId,
    facilityId: req.body.facilityId,
    description: req.body.description
  };

  if (avatarPath) {
    updateData.avatar = avatarPath;
  }

  await doctorService.update(req.params.id, updateData);
  res.json({ message: 'Updated' });
};

/**
 * DELETE /doctors/:id
 */
exports.delete = async (req, res) => {
  await doctorService.delete(req.params.id);
  res.json({ message: 'Deleted' });
};
