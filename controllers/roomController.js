const db = require("../db/models");
const booking = require("../db/models/room");
const Op = db.Sequelize.Op;
const { Room } = db;

module.exports = {
    findAll: (req, res) => {
        const roomDetails = req.query.roomDetails;
        var condition = roomDetails ? {
                roomDetails: {
                    [Op.like]: `%${name}%`,
                    [Op.like]: `%${capacity}%`,
                    [Op.like]: `%${location}%`,
                    [Op.like]: `%${launchDateTime}%`,
                    [Op.like]: `%${hourlyRate}%`,
                },
            } :
            null;
        Room.findAll({ where: condition })
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Error Occured.",
                });
            });
    },

    updateRoomDetails: (req, res) => {
        let { name, capacity, location, launchDateTime, hourlyRate } = req.body;
        let nameId = req.params.nameId;

        roomBook
            .findOne({
                where: { nameId: name },
            })
            .then((booking) => {
                if (booking) {
                    booking
                        .update({ name, capacity, location, launchDateTime, hourlyRate })
                        .then((updateRoom) => {
                            return res.status(202).json({
                                message: "Room updated successfully",
                                updateRoom,
                            });
                        });
                } else {
                    return (
                        res.status(206),
                        json({
                            message: "Room not updated",
                        })
                    );
                }
            })
            .catch((error) => {
                return res.status(400).json({
                    error: error,
                });
            });
    },

    deleteRooms: (req, res) => {
        /*   Booking.destroy({
                  truncate: true
              }).then(() => {
                  return res.status(200).json({
                      success: true,
                      "message": "Deleted"
                  })
              }).catch(err => {
                  return res.status(400).json({
                      err
                  })
              }) */
        let name = req.params.name;

        Room.destroy({
                where: { name: name },
            })
            .then(() => {
                return res.status(200).json({
                    message: "Room Deleted successfully",
                });
            })
            .catch((err) => {
                return res.status(400).json({ error });
            });
    },

    createRooms: (req, res) => {
        if (!req.body.name) {
            res.status(400).send({
                message: "Please input values"
            });
            return;
        }
        const create = {
            name: req.body.name,
            capacity: req.body.capacity,
            location: req.body.location,
            launchDateTime: req.body.launchDateTime,
            hourlyRate: req.body.hourlyRate
        };

        Room.create(create)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "error occured"
                });
            });
    }
};