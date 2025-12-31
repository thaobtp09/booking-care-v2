module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Specialty',
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
      description: {
        type: DataTypes.TEXT
      }
    },
    {
      tableName: 'specialties',
      timestamps: true,
      underscored: true
    }
  );
};
