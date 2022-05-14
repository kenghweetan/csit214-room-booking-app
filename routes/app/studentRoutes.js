const router = require("express").Router();
const { isStudent } = require("../../middleware/isLoggedIn");
module.exports = () => {
  router.get("/bookingDetails/:bookingId", isStudent, (req, res) => {
    res.render("bookingDetails", {
      title: "Booking Details",
      bookingId: req.params.bookingId,
    });
  });

  router.get("/viewBookings", isStudent, (_req, res) => {
    res.render("viewBookings", {
      title: "My Bookings",
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

  router.get("/paymentReceipt", isStudent, (_req, res) => {
    res.render("paymentReceipt", {
      title: "Payment Receipt",
    });
  });

  router.get("/student", isStudent, (_req, res) => {
    res.redirect("/calendar-view");
  });

  return router;
};
