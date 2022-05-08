const router = require("express").Router();
const loginController = require("../../controllers/login");

module.exports = (app) => {
  router.get("/login", (_req, res) => {
    res.render(path.join(__dirname, "/views/login"), { title: "Login" });
  });

  router.post("/login", loginController);

  router.get("/bookingDetails/", (_req, res) => {
    res.render(path.join(__dirname, "/views/bookingDetails"), {
      title: "Booking Details",
    });
  });

  router.get("/editBooking", (_req, res) => {
    res.render(path.join(__dirname, "/views/editBooking"), {
      title: "Edit Booking",
    });
  });

  router.get("/calendar-view", (_req, res) => {
    res.render(path.join(__dirname, "/views/calendar-view"), {
      title: "Calendar",
    });
  });

  router.get("/addBooking", (_req, res) => {
    res.render(path.join(__dirname, "/views/addBooking"), {
      title: "Add Booking",
    });
  });

  router.get("/addRoom", (_req, res) => {
    res.render(path.join(__dirname, "/views/addRoom"), {
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
