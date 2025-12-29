const doctorRepo = require('../repositories/doctor.repository');

exports.getAll = () => doctorRepo.findAll();

exports.getById = (id) => doctorRepo.findById(id);

exports.create = (data) => doctorRepo.create(data);

exports.update = (id, data) => doctorRepo.update(id, data);

exports.delete = (id) => doctorRepo.delete(id);
