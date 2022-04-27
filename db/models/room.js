'use strict';
module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define('Room', {
        roomName: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        capacity: DataTypes.STRING,
        location: DataTypes.STRING,
        launchDateTime: DataTypes.DATE,
        hourlyRate: DataTypes.DECIMAL(15, 2)
    }, {});

    Room.associate = (models) => {
        Room.hasMany(models.Amenity, {
                foreignKey: {
                    name: 'roomName',
                    allowNull: false
                },
                as: 'id'
            }),
            Room.hasMany(models.Booking, {
                foreignKey: {
                    name: 'roomName',
                    allowNull: false
                },
                as: 'id'
            });
    };
    return Room;
};