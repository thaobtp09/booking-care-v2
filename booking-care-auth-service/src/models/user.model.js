const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./role.model');

// Model ánh xạ bảng users
const User = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false // lưu mật khẩu đã hash
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    role_id: {
      type: DataTypes.INTEGER,
    },
    doctor_id: {
  type: DataTypes.INTEGER,
  allowNull: true
    }

  },
  {
    timestamps: false
  }
);

// Quan hệ: user thuộc về 1 role
User.belongsTo(Role, { foreignKey: 'role_id' });

module.exports = User;
