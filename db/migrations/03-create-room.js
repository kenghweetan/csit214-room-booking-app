"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("rooms", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      launchDateTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      hourlyRate: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("rooms");
  },
};
