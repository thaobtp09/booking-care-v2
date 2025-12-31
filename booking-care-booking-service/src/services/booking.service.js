const db = require('../db');
const doctorScheduleCacheRepo = require('../repositories/doctorScheduleCache.repository');
const patientRepo = require('../repositories/patient.repository');
const bookingRepo = require('../repositories/booking.repository');
const { publishScheduleBooked } = require('../rabbitmq/schedule.publisher');
const {publishBookingCreatedEvent} = require('../rabbitmq/booking.publisher');

exports.createBooking = async (payload) => {
  const client = await db.connect();

  const { schedule_id } = payload;

  const isValidSchedule =
    await doctorScheduleCacheRepo.findValidSchedule(payload.schedule_id,payload.doctor_id);

  if (!isValidSchedule) {
    throw new Error('SCHEDULE_NOT_AVAILABLE');
  }

  try {
    await client.query('BEGIN');

    // 1️⃣ tạo patient
    const patient = await patientRepo.create(payload, client);

    // 2️⃣ tạo booking
    const booking = await bookingRepo.create(
      {
        patient_id: patient.id,
        doctor_id: payload.doctor_id,
        schedule_id: payload.schedule_id,
        appointment_date: payload.appointment_date,
        time_slot_start: payload.time_slot_start,
        time_slot_end: payload.time_slot_end,
        note: payload.note
      },
      client
    );

    await client.query('COMMIT');

    try {
      
  const eventPayload = {
    schedule_id: payload.schedule_id,
    status: 0
  };

  console.log('[BOOKING] Publish schedule.booked payload:', payload)

  await publishScheduleBooked(eventPayload);

  console.log('[BOOKING] Publish schedule.booked SUCCESS');

  }
 catch (e) {
  console.error('[BOOKING] Publish schedule.booked failed:', e.message);
}

await client.query('COMMIT');

const mailEventPayload = {
  booking_id: booking.id,
  patient_name: patient.full_name,
  patient_email: patient.email,
  patient_phone: patient.phone,
  appointment_date: booking.appointment_date,
  created_at: new Date().toISOString()
};

console.log('[BOOKING] Publish booking.created payload:', mailEventPayload);

await publishBookingCreatedEvent(mailEventPayload);

console.log('[BOOKING] Publish booking.created SUCCESS');

    return {booking,patient};
  } 
  catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

exports.getBooking = async (id, appointment_date) => {
  return bookingRepo.findByIdAndDate(id, appointment_date);
};
