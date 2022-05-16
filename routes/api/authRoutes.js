const router = require("express").Router();
const authController = require("../../controllers/authController");

module.exports = (app) => {
  router.post("/login", authController.login);
  router.post("/logout", authController.logout);
  app.use("/api/auth", router);
};
