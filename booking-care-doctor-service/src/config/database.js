require('dotenv').config();

module.exports = {
  database: process.env.DB_NAME || 'booking_care',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '123456',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  dialect: 'postgres'
};
