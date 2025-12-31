const db = require('../db');

const upsert = async (data) => {
  console.log('[CACHE][UPSERT] DATA =', data);

  const sql = `
    INSERT INTO doctor_schedule_cache (
      schedule_id,
      doctor_id,
      schedule_date,
      time_slot_id,
      status,
      updated_at
    )
    VALUES ($1, $2, $3, $4, $5, NOW())
    ON CONFLICT (schedule_id)
    DO UPDATE SET
      doctor_id = EXCLUDED.doctor_id,
      schedule_date = EXCLUDED.schedule_date,
      time_slot_id = EXCLUDED.time_slot_id,
      status = EXCLUDED.status,
      updated_at = NOW()
  `;

  await db.query(sql, [
    data.schedule_id,
    data.doctor_id,
    data.schedule_date,
    data.time_slot_id,
    data.status
  ]);

  console.log('[CACHE][UPSERT] DONE');
};

const remove = async (schedule_id) => {
  const sql = `
    DELETE FROM doctor_schedule_cache
    WHERE schedule_id = $1
  `;

  await db.query(sql, [schedule_id]);

  console.log('[CACHE][DELETE] DONE:', schedule_id);
};

const findValidSchedule = async (schedule_id,doctor_id) => {
  const sql = `
    SELECT 1
    FROM doctor_schedule_cache
    WHERE schedule_id = $1
      AND doctor_id = $2
      AND status = 1
    LIMIT 1
  `;

  const result = await db.query(sql, [schedule_id,doctor_id]);
  return result.rowCount > 0; 
};
module.exports = {
  upsert,
  remove,
  findValidSchedule
};
