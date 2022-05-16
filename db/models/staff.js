/* const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db");

class Staff extends Model {}

Staff.init({
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

"use strict";
module.exports = (sequelize, DataTypes) => {
    const Staff = sequelize.define(
        "Staff", {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            suspended: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            lastLoggedIn: {
                type: DataTypes.DATE,
            },
            lastLoggedOut: {
                type: DataTypes.DATE,
            }
        }, {}
    );

    return Staff;
};