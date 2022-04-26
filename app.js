const express = require("express");
const path = require("path");
const app = express();
//const sequelize = require("./models/db");
const sequelize = require("./models/amenities.model.js");

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "/views/login"), { title: "Login" });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  console.log(req.body.email);
  res.render(path.join(__dirname, "/views/login"), { title: "Login" });
});

let PORT = process.env.PORT;

if (PORT == null || PORT == "") {
  PORT = 3001;
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
