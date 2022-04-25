const { Sequelize, DataTypes, Model } = require('sequelize');
const { FOREIGNKEYS } = require('sequelize/types/query-types');
const sequelize = require("./db");


class amenities extends Model {}

module.exports = sequelize.then(async function(sequelize) {
    amenities.init({

        roomName: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            FOREIGNKEYS: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true

        }

    }, {
        sequelize,
        modelName: 'amenities'
    });

    await amenities.sync();
})