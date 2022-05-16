"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("staffs", [{
                email: "staff1@example.com",
                password: "12345",
                suspended: false,
                lastLoggedIn: new Date("10 May 2022"),
                lastLoggedOut: new Date("11 May 2022"),

            },
            {
                email: "staff2@example.com",
                password: "23456",
                suspended: false,
                lastLoggedIn: new Date("10 May 2022"),
                lastLoggedOut: new Date("11 May 2022"),

            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("staffs", null, {});
    },
};