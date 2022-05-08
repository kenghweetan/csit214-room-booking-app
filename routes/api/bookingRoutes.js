module.exports = (app) => {
  const bookingController = require("../../controllers/bookingController.js");
  var router = require("express").Router();

  router.put("/:email", bookingController.updateBookingDetails);
  router.get("/", bookingController.findAll);
  router.delete("/:email", bookingController.deleteBookings);
  router.post("/", bookingController.createBookings);

  app.use("/api/bookings/", router);
};
