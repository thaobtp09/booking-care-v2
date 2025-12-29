module.exports = (sequelize, DataTypes) => {
  /**
   * Model Doctor
   * Lưu thông tin bác sĩ
   */
  const Doctor = sequelize.define('Doctor', {
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
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Đường dẫn ảnh đại diện bác sĩ'
    },

    specialtyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    facilityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    description: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'doctors',
    timestamps: true
  });

  return Doctor;
};
