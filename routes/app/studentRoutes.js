const router = require("express").Router();
const { isStudent } = require("../../middleware/isLoggedIn");
module.exports = () => {
  router.get("/bookingDetails", isStudent, (_req, res) => {
    res.render("bookingDetails", {
      title: "Booking Details",
    });
  });

  router.get("/editBooking", isStudent, (_req, res) => {
    res.render("editBooking", {
      title: "Edit Booking",
    });
  });

  router.get("/calendar-view", isStudent, (_req, res) => {
    res.render("calendar-view", {
      title: "Calendar",
    });
  });

  router.get("/addBooking", isStudent, (_req, res) => {
    res.render("addBooking", {
      title: "Add Booking",
    });
  });

  router.get("/student", isStudent, (_req, res) => {
    res.redirect("/calendar-view");
  });

  return router;
};
