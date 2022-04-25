const dbConfig = require("../config/db.config.js");
const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database!");
});

module.exports = connection;
