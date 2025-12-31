module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'doctor_schedules',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      schedule_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      time_slot_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      }
    },
    {
      timestamps: true,
      underscored: true
    }
  );
};
