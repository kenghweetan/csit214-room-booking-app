const db = require("../db/models");
const Op = db.Sequelize.Op;
const { Room } = db;

module.exports = {
    /*   findAll: (req, res) => {
          const name = req.query.name;
          var condition = name ?
              {
                  name: {
                      [Op.eq]: `${name}`,
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
      }, */

    findAll: (req, res) => {
        const {
            name = "",
                capacity = "",
                location = "",
                launchDateTime = "",
                hourlyRate = ""
        } = req.query;
        const condition1 = name ? {
                name: {
                    [Op.like]: `%${name}`,
                },
            } :
            null;
        const condition2 = location ? {
                name: {
                    [Op.like]: `%${location}`,
                },
            } :
            null;
        Room.findAll({
                where: {
                    [Op.and]: {...condition1, ...condition2 },
                },
            }).then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving data",
                });
            });
    },

    updateRoomDetails: async(req, res) => {
        const name = req.params.name;
        try {
            const num = await Room.update(req.body, {
                where: { name: name },
            });

            if (num == 1) {
                res.send({ message: "Updated Successfully." });
            } else {
                res.send({ message: `Cannot Update ${name}.` });
            }
        } catch (err) {
            res.status(500).send({
                message: `Error 500 Updating ${name}`,
            });
        }
    },

    deleteRooms: async(req, res) => {
        try {
            let name = req.params.name;

            await Booking.destroy({
                where: { name: name },
            });

            return res.status(200).json({
                message: "Room Deleted Successfully",
            });
        } catch (err) {
            return res.status(400).json({ err });
        }
    },

    createRooms: (req, res) => {
        const creates = {
            name: req.body.name,
            capacity: req.body.capacity,
            location: req.body.location,
            launchDateTime: req.body.launchDateTime,
            hourlyRate: req.body.hourlyRate,
        };
        console.log(creates)
        Room.create(creates)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "error occured",
                });
            });
    },
};