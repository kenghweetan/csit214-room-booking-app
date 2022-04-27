'use strict';
module.exports = (sequelize, DataTypes) => {
    const Amenity = sequelize.define('Amenity', {
        amenityID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, {});

    Amenity.associate = (models) => {
        Amenity.belongsTo(models.Room, {
            foreignKey: {
                name: 'roomName',
                allowNull: false
            },
            as: 'id'
        });
    };
    return Amenity;
};