"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("bookings", {
      bookingId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      status: {
        type: Sequelize.ENUM("confirmed", "canceled"),
        allowNull: false,
      },
      startDateTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDateTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      grossPrice: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      netPrice: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      PromoCodeName: {
        type: Sequelize.STRING,
        references: {
          model: "PromoCodes",
          key: "name",
        },
      },
      RoomName: {
        type: Sequelize.STRING,
        references: {
          model: "Rooms",
          key: "name",
        },
      },
      StudentEmail: {
        type: Sequelize.STRING,
        references: {
          model: "students",
          key: "email",
        },
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("bookings");
  },
};
