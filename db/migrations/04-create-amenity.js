"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("amenities", {
            amenityID: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            RoomName: {
                type: Sequelize.STRING,
                onDelete: 'CASCADE',
                references: {
                    model: "rooms",
                    key: "name",
                },
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("amenities");
    },
};