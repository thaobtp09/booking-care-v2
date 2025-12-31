const pool = require('../db');

async function createNotification(data) {
  const result = await pool.query(
    `
    INSERT INTO email_notifications
    (booking_id, patient_name, patient_email, patient_phone, appointment_date, status)
    VALUES ($1, $2, $3, $4, $5, 'PENDING')
    RETURNING id
    `,
    [
      data.booking_id,
      data.patient_name,
      data.patient_email,
      data.patient_phone,
      data.appointment_date
    ]
  );

  return result.rows[0].id;
}

async function markAsSent(id, html) {
  await pool.query(
    `
    UPDATE email_notifications
    SET status = 'SENT',
        email_content = $1,
        sent_at = NOW()
    WHERE id = $2
    `,
    [html, id]
  );
}

async function markAsFailed(id, error) {
  await pool.query(
    `
    UPDATE email_notifications
    SET status = 'FAILED',
        error_message = $1
    WHERE id = $2
    `,
    [error, id]
  );
}

module.exports = {
  createNotification,
  markAsSent,
  markAsFailed
};
