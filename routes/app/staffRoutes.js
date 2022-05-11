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

  router.get("/staff", isStaff, (_req, res) => {
    res.redirect("/addRoom");
  });

  router.get("/promoHome", isStaff, (request, response) => {
    response.render("promoHome", {
      title: "Promo Code",
    });
  });

  return router;
};
