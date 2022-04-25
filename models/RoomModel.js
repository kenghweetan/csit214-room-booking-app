const dotenv = require("dotenv");
const mysql2 = require("mysql2");

dotenv.config();

const connection = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the database!");
  let query = "CREATE DATABASE IF NOT EXISTS room_db ";
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

module.exports = connection;
