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
    const {
      startDateTime = "",
      endDateTime = "",
      status = "",
      RoomName = "",
      grossPrice = "",
    } = req.query;
    Booking.findAll({
      where: /* {
        [Op.and]: [
          {
            grossPrice: {
              [Op.like]: `%${grossPrice}%`,
            },
          },
          {
            startDateTime: {
              [Op.like]: `%${startDateTime}`,
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
      } */ null,
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  },

  updateBookingDetails: async (req, res) => {
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

  deleteBookings: async (req, res) => {
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
    console.log(req.session.email);
    const newBooking = {
      status: req.body.status,
      startDateTime: req.body.startDateTime,
      endDateTime: req.body.endDateTime,
      grossPrice: req.body.grossPrice,
      promoCode: req.body.grossPrice,
      netPrice: req.body.netPrice,
      StudentEmail: req.session.email,
    };

    Booking.create(newBooking)
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
