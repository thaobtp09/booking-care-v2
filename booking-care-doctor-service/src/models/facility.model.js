module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Facility',
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
      image: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.TEXT
      }
    },
    {
      tableName: 'facilities',
      timestamps: true,
      underscored: true
    }
  );
};
