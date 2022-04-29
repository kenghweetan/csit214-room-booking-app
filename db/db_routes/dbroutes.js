const express = require("express");
const router = express.Router();
const db = require("../db/models/db");
const book = require("../db/modes/booking.js");

router
    .get("/", (req, res) => booking.findAll())
    .then()((dbroutes) => {
        console.log(dbroutes);
        res.sendStatus(200);
    })

.catch((err) => console.log(err));

module.exports = router;