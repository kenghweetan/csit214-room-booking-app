const path = require("path");
const router = require("express").Router();
const loginController = require("../../controllers/login");

module.exports = (app) => {
  router.get("/login", (_req, res) => {
    res.render("login", { title: "Login" });
  });

  router.post("/login", loginController);

  router.get("/bookingDetails/", (_req, res) => {
    res.render("bookingDetails", {
      title: "Booking Details",
    });
  });

  router.get("/editBooking", (_req, res) => {
    res.render("editBooking", {
      title: "Edit Booking",
    });
  });

  router.get("/calendar-view", (_req, res) => {
    res.render("calendar-view", {
      title: "Calendar",
    });
  });

  router.get("/addBooking", (_req, res) => {
    res.render("addBooking", {
      title: "Add Booking",
    });
  });

  router.get("/addRoom", (_req, res) => {
    res.render("addRoom", {
      title: "Add Room",
    });
  });

  router.get("/", (req, res) => {
    console.log(req.session);
    if (req.session.loggedIn) {
      return res.redirect("/calendar-view");
    }
    return res.redirect("/login");
  });

  app.use("/", router);
};
