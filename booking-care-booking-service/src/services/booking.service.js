const db = require('../db');
const patientRepo = require('../repositories/patient.repository');
const bookingRepo = require('../repositories/booking.repository');

exports.createBooking = async (payload) => {
  const client = await db.connect();

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
    return booking;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

exports.getBooking = async (id, appointment_date) => {
  return bookingRepo.findByIdAndDate(id, appointment_date);
};
