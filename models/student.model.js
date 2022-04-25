const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("./db");


class student extends Model {}

module.exports = sequelize.then(async function(sequelize) {
    student.init({

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
        modelName: 'student'
    });

    await student.sync();
})