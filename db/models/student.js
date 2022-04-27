/* const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db");

class Student extends Model {}

Student.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
}); */

'use strict';
module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {});

    Student.associate = (models) => {
        Student.hasMany(models.Booking, {
            foreignKey: {
                name: 'email',
                allowNull: false
            },
            as: 'id'
        });
    };
    return Student;
};