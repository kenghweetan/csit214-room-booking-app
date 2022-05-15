const router = require("express").Router();
const { isStaff } = require("../../middleware/isLoggedIn");

module.exports = () => {
  router.get("/addRoom", isStaff, (req, res) => {
    res.render("addRoom", {
      title: "Add Room",
      email: req.session.email,
    });
  });

  router.get("/roomDetails", isStaff, (req, response) => {
    response.render("roomDetails", {
      title: "roomDetails",
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
    res.redirect("/viewRooms");
  });

  return router;
};
