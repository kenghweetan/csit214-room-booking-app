const mysql = require("mysql2/promise");
const dbConfig = require("../../config/db.config.js");
const { Sequelize } = require("Sequelize");

const { username, password, database, host, dialect } =
dbConfig[process.env.NODE_ENV];

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
});

sequelize
    .authenticate()
    .then(() => console.log("Connected to database"))
    .catch((error) => console.error(error));

module.exports = sequelize;