"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("amenities", [
      {
        type: "Computer",
        RoomName: "room1",
      },
      {
        type: "TV",
        RoomName: "room2",
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("amenities", null, {});
  },
};
