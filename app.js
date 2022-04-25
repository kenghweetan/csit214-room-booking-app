const express = require("express");
const path = require("path");
const app = express();
//const sequelize = require("./models/db");
const sequelize = require("./models/amenities.model.js");

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/login.html"));
});

let PORT = process.env.PORT;

if (PORT == null || PORT == "") {
  PORT = 3001;
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
