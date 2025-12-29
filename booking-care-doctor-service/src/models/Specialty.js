module.exports = (sequelize, DataTypes) => {
  /**
   * Model Specialty
   * Lưu thông tin chuyên khoa
   */
  const Specialty = sequelize.define('Specialty', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: 'Tên chuyên khoa'
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'specialties',
    timestamps: true
  });

  return Specialty;
};
