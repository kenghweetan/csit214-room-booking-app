const studentRouter = require("./studentRoutes");
const staffRouter = require("./staffRoutes");
const router = require("express").Router();
const { isLoggedIn } = require("../../middleware/isLoggedIn");

module.exports = (app) => {
  router.use(isLoggedIn);
  router.get("/login", (_req, res) => {
    res.render("login", { title: "Login" });
  });
  router.use("/", studentRouter());
  router.use("/", staffRouter());
  router.get("/", (req, res) => {
    switch (req.session.userType) {
      case "Student":
        return res.redirect("/student");
      case "Staff":
        return res.redirect("/staff");
    }
  });

  app.use("/", router);
};
