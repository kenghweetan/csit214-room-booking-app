const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const db = require("./db/models/index.js");
const login = require("./controllers/login");

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(
    session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
    })
);
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    console.log(req.session);
    if (req.session.loggedIn) {
        return res.redirect("/calendar-view");
    }
    return res.redirect("/login");
});

app.get("/login", (req, res) => {
    res.render(path.join(__dirname, "/views/login"), { title: "Login" });
});

app.post("/login", login);

app.get("/bookingDetails", (req, res) => {
    res.render(path.join(__dirname, "/views/bookingDetails"), { title: "Login" });
});

app.get("/calendar-view", (req, res) => {
    res.render(path.join(__dirname, "/views/calendar-view"), {
        title: "Calendar",
    });
});

require("./routes/bookingRoutes")(app);
require("./routes/roomRoutes")(app);

let PORT = process.env.PORT;

if (PORT == null || PORT == "") {
    PORT = 3001;
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});