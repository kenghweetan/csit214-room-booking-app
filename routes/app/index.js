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
    console.log(req.session.userType);
    if (req.session.userType === "Student") return res.redirect("/student");
    else return res.redirect("/staff");
  });

  app.use("/", router);
};
