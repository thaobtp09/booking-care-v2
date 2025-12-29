const { Doctor } = require('../models');

exports.findAll = () => Doctor.findAll();

exports.findById = (id) => Doctor.findByPk(id);

exports.create = (data) => Doctor.create(data);

exports.update = (id, data) =>
  Doctor.update(data, { where: { id } });

exports.delete = (id) =>
  Doctor.destroy({ where: { id } });
