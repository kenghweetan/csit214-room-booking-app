"use strict";
module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define(
        "Room", {
            name: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            capacity: DataTypes.INTEGER,
            location: DataTypes.STRING,
            launchDateTime: DataTypes.DATE,
            hourlyRate: DataTypes.DECIMAL(15, 2),
        }, {}
    );

    Room.associate = (models) => {
        Room.hasMany(models.Amenity, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Room.hasMany(models.Booking, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };
    return Room;
};