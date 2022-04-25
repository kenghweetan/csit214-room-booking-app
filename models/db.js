const mysql = require("mysql2/promise");
const dbConfig = require("../config/db.config.js");
const { Sequelize } = require("Sequelize");

async function initialise() {
    const {
        DB: db = "rookboomdb",
        PORT: port = 3306,
        USER: user,
        PASSWORD: password,
        HOST: host,
    } = dbConfig;

    const connection = await mysql.createConnection({
        host,
        port,
        user,
        password,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${db};`);

    const sequelize = new Sequelize(db, user, password, {
        host,
        dialect: "mysql",
    });

    return sequelize;
}

module.exports = initialise();