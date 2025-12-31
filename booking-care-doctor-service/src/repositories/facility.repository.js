const db = require('../models');
const Facility = db.Facility;

const create = (data) => Facility.create(data);
const findAll = () => Facility.findAll({ order: [['created_at', 'DESC']] });
const findById = (id) => Facility.findByPk(id);
const updateById = (id, data) => Facility.update(data, { where: { id } });
const deleteById = (id) => Facility.destroy({ where: { id } });

module.exports = {
  create,        
  findAll,
  findById,
  updateById,
  deleteById
};
