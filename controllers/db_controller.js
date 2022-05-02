const db = require("../db/models");
const booking = require("../db/models/booking");
const Op = db.Sequelize.Op;
const { Booking, Room } = db;

module.exports = {
    findAll: (req, res) => {
        const bookDetails = req.query.bookDetails;
        var condition = bookDetails ? {
                bookDetails: {
                    [Op.like]: `%${bookingId}%`,
                    [Op.like]: `%${status}%`,
                    [Op.like]: `%${startDateTime}%`,
                    [Op.like]: `%${endDateTime}%`,
                    [Op.like]: `%${grossPrice}%`,
                    [Op.like]: `%${netPrice}%`,
                },
            } :
            null;
        Booking.findAll({ where: condition })
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Error Occured.",
                });
            });
    },

    updateBookingDetails: (req, res) => {
        let { status, startDateTime, endDateTime, grossPrice, netPrice } = req.body;
        let bookingId = req.params.bookingId;

        userBook
            .findOne({
                where: { bookingId: bookingId },
            })
            .then((booking) => {
                if (booking) {
                    booking
                        .update({ status, startDateTime, endDateTime, grossPrice, netPrice })
                        .then((updateBooking) => {
                            return res.status(202).json({
                                message: "Booking updated successfully",
                                updateBooking,
                            });
                        });
                } else {
                    return (
                        res.status(206),
                        json({
                            message: "Booking not updated",
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

    deleteBookings: (req, res) => {
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

        Booking.destroy({
                where: { name: name },
            })
            .then(() => {
                return res.status(200).json({
                    message: "Booking Deleted successfully",
                });
            })
            .catch((err) => {
                return res.status(400).json({ error });
            });
    },

    createBookings: (req, res) => {
        if (!req.body.bookingId) {
            res.status(400).send({
                message: "Please input values"
            });
            return;
        }
        const create = {
            status: req.body.status,
            startDateTime: req.body.startDateTime,
            endDateTime: req.body.endDateTime,
            grossPrice: req.body.grossPrice,
            netPrice: req.body.netPrice
        };

        Booking.create(create)
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