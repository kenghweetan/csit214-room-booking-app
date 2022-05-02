"use strict";
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
      name: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      capacity: DataTypes.INTEGER,
      location: DataTypes.STRING,
      launchDateTime: DataTypes.DATE,
      hourlyRate: DataTypes.DECIMAL(15, 2),
    },
    {}
  );

  Room.associate = (models) => {
    Room.hasMany(models.Amenity);
    Room.hasMany(models.Booking);
  };
  return Room;
};
