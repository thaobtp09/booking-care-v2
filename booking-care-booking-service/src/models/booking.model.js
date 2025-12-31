module.exports = {
  tableName: 'bookings',
  fields: [
    'id',
    'patient_id',
    'doctor_id',
    'schedule_id',
    'appointment_date',
    'time_slot_start',
    'time_slot_end',
    'status',
    'note',
    'created_at',
    'updated_at'
  ]
};
