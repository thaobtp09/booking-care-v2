const {
  createNotification,
  markAsSent,
  markAsFailed
} = require('../repositories/emailNotification.repository');

const { sendMail } = require('./mail.service');

async function handleBookingCreated(data) {
  const notificationId = await createNotification(data);

  try {
    const html = `
      <h3>Xác nhận đặt lịch khám</h3>
      <p>Xin chào <b>${data.patient_name}</b>,</p>
      <p>Bạn đã đặt lịch khám thành công.</p>
      <ul>
        <li>Ngày khám: ${data.appointment_date}</li>
        <li>SĐT: ${data.patient_phone}</li>
      </ul>
      <p>Cảm ơn bạn.</p>
    `;

    await sendMail(
      data.patient_email,
      'Xác nhận đặt lịch khám',
      html
    );

    await markAsSent(notificationId, html);
  } catch (err) {
    await markAsFailed(notificationId, err.message);
    throw err;
  }
}

module.exports = { handleBookingCreated };
