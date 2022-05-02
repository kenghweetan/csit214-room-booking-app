"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Students", [
      {
        email: "student@example.com",
        password: "12345",
      },
      { email: "student2@example.com", password: "23456" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Students", null, {});
  },
};
