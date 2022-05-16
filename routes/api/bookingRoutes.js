module.exports = (app) => {
  const bookingController = require("../../controllers/bookingController.js");
  var router = require("express").Router();

  router.put("/:bookingId", bookingController.updateBookingDetails);
  // Find all bookings
  router.get("/myBookings", bookingController.findByUser);
  router.get("/", bookingController.findAll);
  router.delete("/:bookingId", bookingController.cancelBookings);
  router.post("/", bookingController.createBookings);

  // Go to this route by default
  app.use("/api/bookings/", router);
};
