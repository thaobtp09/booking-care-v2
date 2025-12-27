const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Model ánh xạ bảng permissions
const Permission = sequelize.define(
  'permissions',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    timestamps: false
  }
);

module.exports = Permission;
