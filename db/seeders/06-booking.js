"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("bookings", [
      {
        bookingId: 1,
        status: "confirmed",
        startDateTime: new Date("3 May 2022 15:00"),
        endDateTime: new Date("3 May 2022 16:00"),
        grossPrice: 15.0,
        netPrice: 15.0,
        PromoCodeName: null,
        RoomName: "room1",
        StudentEmail: "student@example.com",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("bookings", null, {});
  },
};
