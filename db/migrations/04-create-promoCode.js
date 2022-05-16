module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("promoCodes", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      discountRate: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      expiryDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("promoCodes");
  },
};
