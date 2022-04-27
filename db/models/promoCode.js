/* const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db");

class PromoCode extends Model {}

PromoCode.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    discountRate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    expiryDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
}); */

'use strict';
module.exports = (sequelize, DataTypes) => {
    const PromoCode = sequelize.define('PromoCode', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        discountRate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        expiryDate: {
            type: DataTypes.DATE,
            allowNull: false,
        }

    }, {});

    PromoCode.associate = (models) => {
        PromoCode.hasMany(models.Booking, {
            foreignKey: {
                name: 'name',
                allowNull: false
            },
            as: 'id'
        });
    };
    return PromoCode;
};