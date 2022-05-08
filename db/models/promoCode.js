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
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

    };
    return PromoCode;
};