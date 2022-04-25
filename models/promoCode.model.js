const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("./db");


class promoCode extends Model {}

module.exports = sequelize.then(async function(sequelize) {
    promoCode.init({

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
    }, {
        sequelize,
        modelName: 'promoCode'
    });

    await promoCode.sync();
    const users = await promoCode.findAll();
    console.log(users.every(user => user instanceof promoCode)); // true
    console.log("All users:", JSON.stringify(users, null, 2));
})



//console.log(promoCode === sequelize.models.promoCode);