const router = require("express").Router();
const { isStudent } = require("../../middleware/isLoggedIn");
module.exports = () => {
  router.get("/bookingDetails/:bookingId", isStudent, (req, res) => {
    res.render("bookingDetails", {
      title: "Booking Details",
      email: req.session.email,
      bookingId: req.params.bookingId,
    });
  });

  router.get("/viewBookings", isStudent, (req, res) => {
    res.render("viewBookings", {
      title: "My Bookings",
      email: req.session.email,
    });
  });

  router.get("/editBooking", isStudent, (req, res) => {
    res.render("editBooking", {
      title: "Edit Booking",
      email: req.session.email,
    });
  });

  /*   router.get("/calendar-view", isStudent, (req, res) => {
    res.render("calendar-view", {
      title: "Calendar",
      email: req.session.email,
    });
  }); */

  router.get("/addBooking", isStudent, (req, res) => {
    res.render("addBooking", {
      title: "Add Booking",
      email: req.session.email,
    });
  });

  router.get("/paymentReceipt/:bookingId", isStudent, (req, res) => {
    res.render("paymentReceipt", {
      title: "Payment Receipt",
      email: req.session.email,
      bookingId: req.params.bookingId,
    });
  });

  router.get("/student", isStudent, (req, res) => {
    res.redirect("/viewBookings");
  });

  return router;
};
