const router = require("express").Router();
const { isUserAdmin } = require("../../middleware/isLoggedIn");
module.exports = () => {
  router.get("/userAdminHome", isUserAdmin, (req, res) => {
    res.render("userAdminHome", {
      title: "View Accounts",
      email: req.session.email,
    });
  });

  router.get("/userAdminEdit/:userType/:email", isUserAdmin, (req, res) => {
    res.render("userAdminEdit", {
      title: "Edit Account",
      email: req.session.email,
      userEmail: req.params.email,
      userType: req.params.userType,
    });
  });

  router.get("/userAdminCreate", isUserAdmin, (req, res) => {
    res.render("userAdminCreate", {
      title: "Create Account",
      email: req.session.email,
    });
  });

  router.get("/userAdmin", isUserAdmin, (req, res) => {
    res.redirect("/userAdminHome");
  });

  return router;
};
