module.exports = (app) => {
  const userAdminRoutes = require("../../controllers/userAdminController.js");
  var router = require("express").Router();

  router.put("/:email", userAdminRoutes.updateUserAdminDetails);
  router.get("/", userAdminRoutes.findAllStudentAndStaff);
  router.delete("/:email", userAdminRoutes.deleteUserAdmin);
  router.post("/", userAdminRoutes.createUserAdmin);

  app.use("/api/userAdmin/", router);
};
