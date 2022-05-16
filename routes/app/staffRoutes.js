const router = require("express").Router();
const { isStaff } = require("../../middleware/isLoggedIn");

module.exports = () => {
    router.get("/addRoom", isStaff, (req, res) => {
        res.render("addRoom", {
            title: "Add Room",
            email: req.session.email,
        });
    });

    router.get("/roomDetails/:name", isStaff, (req, response) => {
        response.render("roomDetails", {
            title: "Edit Room",
            name: req.params.name,
            email: req.session.email,
        });
    });

    router.get("/viewRooms", isStaff, (req, response) => {
        response.render("viewRooms", {
            title: "View Rooms",
            email: req.session.email,
        });
    });

    router.get("/viewPromoCodes", isStaff, (req, response) => {
        response.render("viewPromoCodes", {
            title: "Promo Codes",
            email: req.session.email,
        });
    });

    router.get("/addPromoCode", isStaff, (req, response) => {
        response.render("addPromoCode", {
            title: "Add Promo Code",
            email: req.session.email,
        });
    });

    router.get("/editPromoCode/:name", isStaff, (req, response) => {
        response.render("editPromoCode", {
            title: "Edit Promo Code",
            promoCodeName: req.params.name,
            email: req.session.email,
        });
    });

    router.get("/staff", isStaff, (_req, res) => {
        res.redirect("/viewRoom");
    });

    /*   router.get("/editRoom", isStaff, (request, response) => {
          response.render("editRoom", {
              title: "Edit Promo Codes",
              email: request.session.email,
          }); */

    router.get("/viewRoom", isStaff, (request, response) => {
        response.render("viewRoom", {
            title: "View Rooms",
            email: request.session.email,
        });
    });

    return router;
};