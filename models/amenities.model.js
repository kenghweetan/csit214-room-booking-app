const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db");

class Amenity extends Model {}

Amenity.init(
  {
    roomName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      FOREIGNKEYS: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
  }
);

// await amenities.sync();
