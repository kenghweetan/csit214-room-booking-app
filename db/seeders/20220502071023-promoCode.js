"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("promoCodes", [
      {
        name: "discount5",
        discountRate: 5,
        expiryDate: new Date("25 May 2022"),
      },
      {
        name: "discount10",
        discountRate: 10,
        expiryDate: new Date("18 May 2022"),
      },
      {
        name: "discount15",
        discountRate: 15,
        expiryDate: new Date("11 May 2022"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("promoCodes", null, {});
  },
};
