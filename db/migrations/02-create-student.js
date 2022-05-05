module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("students", {
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("students");
    },
};