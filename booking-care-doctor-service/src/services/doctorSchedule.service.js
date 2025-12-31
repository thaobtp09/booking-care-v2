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
  const timeSlot = await timeSlotRepo.findById(schedule.time_slot_id);
  if (!timeSlot) throw new Error('TIME_SLOT_NOT_FOUND');

  return {
    doctor_id: schedule.doctor_id,
    schedule_id: schedule.id,
    schedule_date: schedule.schedule_date,
    time_slot_id: schedule.time_slot_id,
    start_time: timeSlot.start_time,
    end_time: timeSlot.end_time,
    status: schedule.status
  };
};

/**
 * CREATE schedule
 * ❌ NO auth / role / doctor validation
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
    // LOG nhưng KHÔNG throw
    console.error('[WARN] Publish schedule CREATED failed:', err.message);
  }

  return schedule;
};

/**
 * UPDATE schedule
 * ❌ NO auth / role / doctor validation
 */
const update = async (id, data) => {
  await repo.updateById(id, {
    doctor_id: data.doctor_id,
    schedule_date: data.schedule_date,
    time_slot_id: data.time_slot_id,
    status: data.status
  });

  const updatedSchedule = await repo.findById(id);
  if (!updatedSchedule) throw new Error('NOT_FOUND');

  const payload = await buildPayload(updatedSchedule);

  await publishScheduleChanged({
    action: 'UPDATED',
    data: payload
  });

  return updatedSchedule;
};

/**
 * DELETE schedule
 * ❌ NO auth / role / doctor validation
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
