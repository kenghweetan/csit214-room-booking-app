"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("staffs", [
      {
        email: "staff1@example.com",
        password: "12345",
      },
      {
        email: "staff2@example.com",
        password: "23456",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("staffs", null, {});
  },
};
