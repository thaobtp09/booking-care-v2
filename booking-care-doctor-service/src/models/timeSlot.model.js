module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'TimeSlot',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      slot_key: {
        type: DataTypes.STRING,
        allowNull: false
      },
      start_time: {
        type: DataTypes.TIME,
        allowNull: false
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: false
      }
    },
    {
      tableName: 'time_slots',
      timestamps: true,
      underscored: true,
      updatedAt: false   // bảng không có updated_at
    }
  );
};
