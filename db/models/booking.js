"use strict";
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      bookingId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("confirmed", "cancelled"),
        allowNull: false,
      },
      startDateTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDateTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      grossPrice: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      netPrice: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
    },
    {}
  );

  Booking.associate = (models) => {
    Booking.belongsTo(models.Room);
    Booking.belongsTo(models.PromoCode);
    Booking.belongsTo(models.Student);
  };
  return Booking;
};
