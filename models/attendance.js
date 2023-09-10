"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Attendance.belongsTo(models.User, {
        as: "dataUserd",
        foreignKey: "userId",
      });
    }
  }
  Attendance.init(
    {
      userId: DataTypes.STRING,
      dateAttendance: DataTypes.DATEONLY,
      timeAttendance: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Attendance",
    }
  );
  return Attendance;
};
