const db = require('../models');
const DoctorSchedule = db.DoctorSchedule;

const findAll = () =>
  DoctorSchedule.findAll({ order: [['schedule_date', 'DESC']] });

const findByDoctor = (doctorId) =>
  DoctorSchedule.findAll({
    where: { doctor_id: doctorId },
    order: [['schedule_date', 'DESC']]
  });

  const findByDoctorWithCondition = (where) =>
  DoctorSchedule.findAll({
    where,
    order: [['schedule_date', 'DESC'], ['time_slot_id', 'ASC']]
  });

const findExist = (doctor_id, schedule_date, time_slot_id) =>
  DoctorSchedule.findOne({
    where: { doctor_id, schedule_date, time_slot_id }
  });

const create = (data) => DoctorSchedule.create(data);

const updateById = (id, data) =>
  DoctorSchedule.update(
    data,
    {
      where: { id },
      fields: ['doctor_id', 'schedule_date', 'time_slot_id', 'status'], 
      returning: true                                                   
    }
  );

const findById = (id) => DoctorSchedule.findByPk(id);

const deleteById = (id) =>
  DoctorSchedule.destroy({ where: { id } });

module.exports = {
  findAll,
  findByDoctor,
  findByDoctorWithCondition,
  findExist,
  create,
  updateById,
  findById,
  deleteById
};
