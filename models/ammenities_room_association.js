'use strict';
module.exports = (sequelize, DataTypes) => {
    const Amenities = sequelize.define('Amenities', {
        roomName: DataTypes.STRING,
        type: DataTypes.STRING
    }, {});
    Amenities.associate = function(models) {
        Amenities.belongsTo(models.Room, { foreignkey: 'roomName', as: 'Room' })
    };
    return Amenities;
};