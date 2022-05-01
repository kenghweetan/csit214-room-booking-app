'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};
const dbConfig = require("../config.js");


/* let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
} */

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


fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        console.log(file)
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});





sequelize.sync({ force: true }).then(() => {;
    console.log("All models were synchronized successfully.");
});

db.sequelize = sequelize;
module.exports = db;