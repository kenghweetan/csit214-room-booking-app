const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db");

class Staff extends Model {}

Staff.init(
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

// await student.sync();
