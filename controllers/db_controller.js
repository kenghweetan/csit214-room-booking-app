const db = require("../db/models");
const Op = db.Sequelize.Op;
const { Booking, Room } = db;

module.exports = {
    findAll: (req, res) => {
        const bookDetails = req.query.bookDetails;
        var condition = bookDetails ?
            {
                bookDetails: {
                    [Op.like]: `%${startDateTime}%`,
                    [Op.like]: `%${endDateTime}%`,
                    [Op.like]: `%${grossPrice}%`,
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

    updateBookingDetails: (req, res) => {
        let { startDateTime, endDateTime } = req.body;
        let bookingId = req.params.bookingId;

        userBook
            .findOne({
                where: { bookingId: bookingId },
            })
            .then((booking) => {
                if (booking) {
                    booking
                        .update({ startDateTime, endDateTime })
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
};