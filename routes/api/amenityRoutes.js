module.exports = (app) => {
    const amenityController = require("../../controllers/amenityController.js");
    var router = require("express").Router();

    router.put("/:RoomName", amenityController.updateAmenityDetails);
    router.get("/", amenityController.findAll);
    router.delete("/:RoomName", amenityController.deleteAmenity);
    router.post("/", amenityController.createAmenity);

    app.use("/api/amenity/", router);
};