const db = require('../db');

exports.create = async (data, client = db) => {
  const result = await client.query(
    `
    INSERT INTO bookings (
      patient_id,
      doctor_id,
      schedule_id,
      appointment_date,
      time_slot_start,
      time_slot_end,
      note
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *
    `,
    [
      data.patient_id,
      data.doctor_id,
      data.schedule_id,
      data.appointment_date,
      data.time_slot_start,
      data.time_slot_end,
      data.note
    ]
  );
  return result.rows[0];
};

exports.findByIdAndDate = async (id, appointment_date) => {
  const result = await db.query(
    `
    SELECT 
      b.*,
      p.full_name,
      p.phone,
      p.email
    FROM bookings b
    JOIN patients p ON p.id = b.patient_id
    WHERE b.id = $1 AND b.appointment_date = $2
    `,
    [id, appointment_date]
  );
  return result.rows[0];
};
