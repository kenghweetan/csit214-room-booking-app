const db = require("../db/models");
const Op = db.Sequelize.Op;
const { PromoCode } = db;

module.exports = {
  findAll: (req, res) => {
    const name = req.query.name;
    var condition = name
      ? {
          name: {
            [Op.eq]: `${name}`,
          },
        }
      : null;
    PromoCode.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occured.",
        });
      });
  },

  findAllValid: async (req, res) => {
    const currentDateWithoutTime = new Date();
    currentDateWithoutTime.setHours(0, 0, 0, 0);
    try {
      const data = await PromoCode.findAll({
        where: {
          expiryDate: {
            [Op.gte]: currentDateWithoutTime,
          },
        },
      });
      res.send(data);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Error Occured.",
      });
    }
  },

  updatePromoCodeDetails: async (req, res) => {
    const name = req.params.name;
    try {
      const num = await PromoCode.update(req.body, {
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

  deletePromoCode: async (req, res) => {
    try {
      let name = req.params.name;

      await PromoCode.destroy({
        where: { name: name },
      });

      return res.status(200).json({
        message: "Room Deleted Successfully",
      });
    } catch (err) {
      return res.status(400).json({ error });
    }
  },

  createPromoCode: (req, res) => {
    const creates = {
      name: req.body.name,
      discountRate: req.body.discountRate,
      expiryDate: req.body.expiryDate,
    };

    PromoCode.create(creates)
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
