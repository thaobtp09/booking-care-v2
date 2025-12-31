const db = require('../models');
const Specialty = db.Specialty;

const create = (data) => Specialty.create(data);
const findAll = () => Specialty.findAll({ order: [['created_at', 'DESC']] });
const findById = (id) => Specialty.findByPk(id);
const updateById = (id, data) => Specialty.update(data, { where: { id } });
const deleteById = (id) => Specialty.destroy({ where: { id } });

module.exports = {
  create,
  findAll,
  findById,
  updateById,
  deleteById
};
