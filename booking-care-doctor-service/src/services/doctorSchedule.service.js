const repo = require('../repositories/doctorSchedule.repository');
const timeSlotRepo = require('../repositories/timeSlot.repository');
const { publishScheduleChanged } = require('../rabbitmq/schedule.publisher');

/**
 * Get all schedules
 */
const getAll = () => repo.findAll();

/**
 * Get schedules by doctor + optional date
 */
const getByDoctor = (doctorId, date) => {
  const where = { doctor_id: doctorId };
  if (date) where.schedule_date = date;
  return repo.findByDoctorWithCondition(where);
};

/**
 * Build payload for event
 */
const buildPayload = async (schedule) => {
  /*
   *  FIX:
   * dùng findById
   */
  const timeSlot = await timeSlotRepo.findAll(schedule.time_slot_id);
  if (!timeSlot) throw new Error('TIME_SLOT_NOT_FOUND');

  return {
    doctor_id: schedule.doctor_id,
    schedule_id: schedule.id,
    schedule_date: schedule.schedule_date,
    time_slot_id: schedule.time_slot_id,
    status: schedule.status
  };
};

/**
 * CREATE schedule
 */
const create = async (data) => {
  const schedule = await repo.create({
    doctor_id: data.doctor_id,
    schedule_date: data.schedule_date,
    time_slot_id: data.time_slot_id,
    status: data.status ?? 1
  });

  try {
    const payload = await buildPayload(schedule);
    await publishScheduleChanged({
      action: 'CREATED',
      data: payload
    });
  } catch (err) {
    console.error('[WARN] Publish CREATED failed:', err.message);
  }

  return schedule;
};

/**
 * UPDATE schedule
 */
const update = async (id, data) => {
  /** 
   * CHỈ update status (và tối đa date / time_slot nếu muốn)
   */
  await repo.updateById(id, {
    status: data.status 
  });

  const updatedSchedule = await repo.findById(id);
  if (!updatedSchedule) throw new Error('NOT_FOUND');

  const payload = await buildPayload(updatedSchedule);

  /**
   * Bọc try/catch
   */
  try {
    await publishScheduleChanged({
      action: 'UPDATED',
      data: payload
    });
  } catch (err) {
    console.error('[WARN] Publish UPDATED failed:', err.message); 
  }

  return updatedSchedule;
};

/**
 * DELETE schedule
 */
const remove = async (id) => {
  const schedule = await repo.findById(id);
  if (!schedule) throw new Error('NOT_FOUND');

  const payload = await buildPayload(schedule);

  await repo.deleteById(id);

  await publishScheduleChanged({
    action: 'DELETED',
    data: payload
  });

  return { success: true };
};

module.exports = {
  getAll,
  getByDoctor,
  create,
  update,
  remove
};
