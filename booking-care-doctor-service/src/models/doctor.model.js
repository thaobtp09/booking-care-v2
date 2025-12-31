module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Doctor',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      avatar: {
        type: DataTypes.STRING
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true
      },
      specialty_id: {
        type: DataTypes.INTEGER
      },
      facility_id: {
        type: DataTypes.INTEGER
      },
      description: {
        type: DataTypes.TEXT
      }
    },
    {
      tableName: 'doctors',
      timestamps: true,
      underscored: true
    }
  );
};

