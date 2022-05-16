"use strict";
module.exports = (sequelize, DataTypes) => {
    const userAdmin = sequelize.define(
        "userAdmin", {
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
        },
    );

    return userAdmin;
};