//const { status } = require("express/lib/response");
const db = require("../db/models");
const Op = db.Sequelize.Op;
const { Booking } = db;

module.exports = {
  findAll: (req, res) => {
    const {
      startDateTime = "",
      endDateTime = "",
      status = "",
      RoomName = "",
      grossPrice = "",
      bookingId = "",
    } = req.query;
    const condition1 = RoomName
      ? {
          RoomName: {
            [Op.like]: `%${RoomName}%`,
          },
        }
      : null;
    const condition2 = startDateTime
      ? {
          startDateTime: {
            [Op.eq]: new Date(startDateTime),
          },
        }
      : null;
    const condition3 = bookingId
      ? {
          bookingId: {
            [Op.eq]: bookingId,
          },
        }
      : null;
    console.log(startDateTime);

    Booking.findAll({
      where: {
        [Op.and]: { ...condition1, ...condition2, ...condition3 },
      },
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving data",
        });
      });
  },

  findByUser: async (req, res) => {
    const userEmail = req.session.email;
    try {
      const data = await Booking.findAll({
        where: {
          StudentEmail: userEmail,
        },
      });
      res.send(data);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data",
      });
    }
  },

  updateBookingDetails: async (req, res) => {
    const bookingId = req.params.bookingId;
    try {
      const updatedBooking = {
        status: req.body.status,
        startDateTime: req.body.startDateTime,
        endDateTime: req.body.endDateTime,
        grossPrice: req.body.grossPrice,
        promoCode: req.body.promoCode ? req.body.promoCode : null,
        netPrice: req.body.netPrice,
        StudentEmail: req.session.email,
        RoomName: req.body.roomName,
      };

      const anotherBookingAlreadyExists = !!(await Booking.findOne({
        where: {
          [Op.and]: {
            bookingId: {
              [Op.ne]: bookingId,
            },
            RoomName: {
              [Op.like]: `%${updatedBooking.RoomName}%`,
            },
            startDateTime: {
              [Op.lt]: new Date(updatedBooking.endDateTime),
            },
            endDateTime: {
              [Op.gt]: new Date(updatedBooking.startDateTime),
            },
          },
        },
      }));

      if (anotherBookingAlreadyExists) {
        return res.status(500).send("Timeslot unavailable");
      }

      const num = await Booking.update(req.body, {
        where: { bookingId: bookingId },
      });

      if (num === 1) {
        return res.send({ message: "Updated Successfully." });
      } else {
        return res.send({ message: `Cannot Update ${bookingId}.` });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: `Error 500 Updating ${bookingId}`,
      });
    }
  },

  deleteBookings: async (req, res) => {
    try {
      const bookingId = req.params.bookingId;

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

  createBookings: async (req, res) => {
    const newBooking = {
      status: req.body.status,
      startDateTime: req.body.startDateTime,
      endDateTime: req.body.endDateTime,
      grossPrice: req.body.grossPrice,
      promoCode: req.body.grossPrice,
      netPrice: req.body.netPrice,
      StudentEmail: req.session.email,
      RoomName: req.body.roomName,
    };

    try {
      const anotherBookingAlreadyExists = !!(await Booking.findOne({
        where: {
          [Op.and]: {
            RoomName: {
              [Op.like]: `%${newBooking.RoomName}%`,
            },
            startDateTime: {
              [Op.lt]: new Date(newBooking.endDateTime),
            },
            endDateTime: {
              [Op.gt]: new Date(newBooking.startDateTime),
            },
          },
        },
      }));

      if (anotherBookingAlreadyExists) {
        return res.status(500).send("Timeslot unavailable");
      }

      const result = await Booking.create(newBooking);
      return res.send(result);
    } catch (err) {
      return res.status(500).send({
        message: err.message || "error occured",
      });
    }
  },
};
