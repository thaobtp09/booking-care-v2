const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Model ánh xạ bảng roles
const Role = sequelize.define(
  'roles',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // SERIAL
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    timestamps: false // vì DB đã có created_at
  }
);

module.exports = Role;
