const { Sequelize } = require('sequelize');

/**
 * Khởi tạo kết nối PostgreSQL
 * Dùng Sequelize giống auth-service
 */
const sequelize = new Sequelize(
  process.env.DB_NAME,     // tên DB
  process.env.DB_USER,     // user
  process.env.DB_PASSWORD,// password
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
  }
);

module.exports = sequelize;
