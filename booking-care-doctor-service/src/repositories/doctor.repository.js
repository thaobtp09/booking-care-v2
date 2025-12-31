const db = require('../models');
const Doctor = db.Doctor;
const { publishDoctorCreated } = require('../rabbitmq/publisher');

const create = (data) => Doctor.create(data);

const findAll = () =>
  Doctor.findAll({ order: [['created_at', 'DESC']] });

const findById = (id) => Doctor.findByPk(id);

const updateById = (id, data) => {
  const { user_id, ...updateData } = data;
  return Doctor.update(updateData, { where: { id } });
};
const deleteById = (id) =>
  Doctor.destroy({ where: { id } });

module.exports = {
  create,
  findAll,
  findById,
  updateById,
  deleteById
};
