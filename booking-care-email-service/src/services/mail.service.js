const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

async function sendMail(to, subject, html) {
  return transporter.sendMail({
    from: '"Booking Care" <no-reply@bookingcare.com>',
    to,
    subject,
    html
  });
}

module.exports = { sendMail };
