"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("rooms", [
      {
        name: "room1",
        capacity: 5,
        location: "SIM LIBRARY L2R1",
        launchDateTime: new Date("19 May 2022"),
        hourlyRate: 10.5,
      },
      {
        name: "room2",
        capacity: 10,
        location: "SIM LIBRARY L3R2",
        launchDateTime: new Date("10 May 2022"),
        hourlyRate: 6.9,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("rooms", null, {});
  },
};
