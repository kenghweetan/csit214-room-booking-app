const studentRouter = require("./studentRoutes");
const staffRouter = require("./staffRoutes");
const userAdminRouter = require("./userAdminRoutes");
const router = require("express").Router();
const { isLoggedIn } = require("../../middleware/isLoggedIn");

module.exports = (app) => {
  router.use(isLoggedIn);
  router.get("/login", (_req, res) => {
    res.render("login", { title: "Login" });
  });
  router.use("/", studentRouter());
  router.use("/", staffRouter());
  router.use("/", userAdminRouter());
  router.get("/", (req, res) => {
    switch (req.session.userType) {
      case "Student":
        return res.redirect("/student");
      case "Staff":
        return res.redirect("/staff");
      case "userAdmin":
        return res.redirect("/userAdmin");
    }
  });

  app.use("/", router);
};
