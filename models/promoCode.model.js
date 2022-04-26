const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db");

class PromoCode extends Model {}

PromoCode.init(
  {
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
  },
  {
    sequelize,
  }
);

/*   await PromoCode.sync();
  const users = await PromoCode.findAll();
  console.log(users.every((user) => user instanceof PromoCode)); // true
  console.log("All users:", JSON.stringify(users, null, 2)); */

//console.log(promoCode === sequelize.models.promoCode);
