//const { status } = require("express/lib/response");
const db = require("../db/models");
const Op = db.Sequelize.Op;
const { Booking } = db;

module.exports = {
    /*  findAll: (req, res) => {
        const bookDetails = req.query.bookDetails;
        var condition = bookDetails ? {
                bookDetails: {
                    [Op.like]: `%${status}%`,
                    [Op.like]: `%${startDateTime}%`,
                    [Op.like]: `%${endDateTime}%`,
                    [Op.like]: `%${RoomName}%`,
                },
            } :
            null;
        Booking.findOne({ where: condition })
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Error Occured.",
                });
            });
    },
 */

    /*  findAll: (req, res) => {
         const status = req.query.status;
         var condition = status ? {
             status: {
                 [Op.like]: `%${status}%`
             }
         } : null;
         Booking.findAll({ where: condition })
             .then(data => {
                 res.send(data);
             })
             .catch(err => {
                 res.status(500).send({
                     message: err.message || "Some error occurred while retrieving tutorials."
                 });
             });
     }, */
    findAll: (req, res) => {
        const grossPrice = req.query.grossPrice;
        const endDateTime = req.query.endDateTime;
        const status = req.query.status;
        const RoomName = req.query.RoomName;
        Booking.findAll({
                where: {
                    [Op.or]: [{
                            grossPrice: {
                                [Op.like]: `%${grossPrice}%`,
                            },
                        },
                        {
                            endDateTime: {
                                [Op.like]: `%${endDateTime}%`,
                            },
                        },
                        {
                            status: {
                                [Op.like]: `%${status}%`,
                            },
                        },
                        {
                            RoomName: {
                                [Op.like]: `%${RoomName}%`,
                            },
                        },
                    ],
                },
            })
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving tutorials.",
                });
            });
    },

    updateBookingDetails: async(req, res) => {
        const bookingId = req.params.bookingId;
        try {
            const num = await Booking.update(req.body, {
                where: { bookingId: bookingId },
            });

            if (num == 1) {
                res.send({ message: "Updated Successfully." });
            } else {
                res.send({ message: `Cannot Update ${bookingId}.` });
            }
        } catch (err) {
            res.status(500).send({
                message: `Error 500 Updating ${bookingId}`,
            });
        }
    },

    deleteBookings: async(req, res) => {
        try {
            let bookingId = req.params.bookingId;

            await Booking.destroy({
                where: { bookingId: bookingId },
            });

            return res.status(200).json({
                message: "Booking Deleted Successfully",
            });
        } catch (err) {
            return res.status(400).json({ error });
        }
    },

    createBookings: (req, res) => {
        const creates = {
            status: req.body.status,
            startDateTime: req.body.startDateTime,
            endDateTime: req.body.endDateTime,
            grossPrice: req.body.grossPrice,
            netPrice: req.body.netPrice,
        };

        Booking.create(creates)
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