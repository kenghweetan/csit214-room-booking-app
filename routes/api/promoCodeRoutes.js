module.exports = (app) => {
  const promoCodeController = require("../../controllers/promoCodeController.js");
  var router = require("express").Router();

  router.put("/:name", promoCodeController.updatePromoCodeDetails);
  router.get("/findAllValid", promoCodeController.findAllValid);
  router.get("/", promoCodeController.findAll);
  router.delete("/:name", promoCodeController.deletePromoCode);
  router.post("/", promoCodeController.createPromoCode);

  app.use("/api/promocodes/", router);
};
