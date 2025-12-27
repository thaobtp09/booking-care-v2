const { Sequelize } = require('sequelize');

// Tạo instance Sequelize để kết nối PostgreSQL
// Thông tin lấy từ file .env (môi trường)
const sequelize = new Sequelize(
  process.env.DB_NAME,      // tên database
  process.env.DB_USER,      // user DB
  process.env.DB_PASSWORD,  // mật khẩu DB
  {
    host: process.env.DB_HOST, // địa chỉ DB
    port: process.env.DB_PORT, // cổng DB
    dialect: 'postgres',       // loại DB
    logging: false             // tắt log SQL
  }
);

// Export để dùng ở các file khác
module.exports = sequelize;
