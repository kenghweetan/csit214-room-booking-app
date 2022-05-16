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
            suspended: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            lastLoggedIn: {
                type: Sequelize.DATE,

            },
            lastLoggedOut: {
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("students");
    },
};