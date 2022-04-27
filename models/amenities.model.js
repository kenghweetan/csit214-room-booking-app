const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db");

/* class Amenity extends Model {}

Amenity.init({
    roomName: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'room.model',
            key: 'id'
        }

    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
}, {
    sequelize,
});

Room.hasMany(Amenity); */

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