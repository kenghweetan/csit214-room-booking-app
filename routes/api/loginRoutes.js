const router = require("express").Router();
const loginController = require("../../controllers/loginController");

module.exports = (app) => {
  router.post("/", loginController);
  app.use("/api/login", router);
};
