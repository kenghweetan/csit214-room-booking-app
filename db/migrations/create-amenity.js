"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Amenities', {
            roomName: {
                allowNull: false,
                type: Sequelize.STRING,
                references: { //FK ref
                    model: 'Room',
                    key: 'id',
                },
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Amenities');
    },
};