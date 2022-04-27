const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db");

/* class Room extends Model {}

Room.init({
        roomName: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        Capacity: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        Location: {
            type: DataTypes.STRING,
            unique: true,
        },
        launchDateTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        hourlyRate: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
    },
    // Room.hasMany(models.amenities, {as: 'roomName'})
    { sequelize }
); */

'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Room', {
            roomName: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            capacity: {
                type: Sequelize.STRING,
                allowNull: false
            },
            location: {
                type: Sequelize.STRING,
                allowNull: false
            },
            launchDateTime: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            hourlyRate: {
                type: DataTypes.DECIMAL(15, 2),
                allowNull: false,
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Room');
    }
};