const router = require("express").Router();
const { isStaff } = require("../../middleware/isLoggedIn");

module.exports = () => {
    router.get("/addRoom", isStaff, (_req, res) => {
        res.render("addRoom", {
            title: "Add Room",
        });
    });

    router.get("/roomDetails", isStaff, (request, response) => {
        response.render("roomDetails", {
            title: "roomDetails",
        });
    });

    router.get("/viewPromoCodes", isStaff, (request, response) => {
        response.render("viewPromoCodes", {
            title: "Promo Codes",
        });
    });

    router.get("/addPromoCodes", isStaff, (request, response) => {
        response.render("addPromoCodes", {
            title: "Add Promo Codes",
        });
    });

    router.get("/editPromoCodes", isStaff, (request, response) => {
        response.render("editPromoCodes", {
            title: "Edit Promo Codes",
        });
    });

    router.get("/staff", isStaff, (_req, res) => {
        res.redirect("/viewRoom");
    });

    router.get("/editRoom", isStaff, (request, response) => {
        response.render("editRoom", {
            title: "Edit Promo Codes",
        });
    });

    router.get("/viewRoom", isStaff, (request, response) => {
        response.render("viewRoom", {
            title: "View Rooms",
        });
    });


    return router;
};