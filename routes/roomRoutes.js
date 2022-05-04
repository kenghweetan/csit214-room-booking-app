module.exports = (app) => {
    const roomContoller = require("../controllers/roomController.js");
    var router = require("express").Router();

    router.put("/:name", roomContoller.updateRoomDetails);
    router.get("/", roomContoller.findAll);
    router.delete("/:name", roomContoller.deleteRooms);
    router.post("/", roomContoller.createRooms);

    app.use("/api/rooms/", router);
};