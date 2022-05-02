const express = require("express");
const path = require("path");
const app = express();
const db = require("./db/models/index.js");

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render(path.join(__dirname, "/views/login"), { title: "Login" });
});

app.get("/bookingDetails", (req, res) => {
    res.render(path.join(__dirname, "/views/bookingDetails"), { title: "Login" });
});

app.get("/calendar-view", (req, res) => {
    res.render(path.join(__dirname, "/views/calendar-view"), {
        title: "Calendar",
    });
});

require("./routes/db_routes")(app);
let PORT = process.env.PORT;

if (PORT == null || PORT == "") {
    PORT = 3001;
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});