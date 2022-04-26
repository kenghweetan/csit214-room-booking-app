const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db");

class Student extends Model {}

Student.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

// await Student.sync();
