const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("./db");


class staff extends Model {}

module.exports = sequelize.then(async function(sequelize) {
    staff.init({

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    }, {
        sequelize,
        modelName: 'staff'
    });

    await student.sync();
})