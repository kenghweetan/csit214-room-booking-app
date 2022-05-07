const db = require("../db/models");
const Op = db.Sequelize.Op;
const { Staff } = db;

module.exports = {
    findAll: async(req, res) => {
        const staffDetails = req.query.staffDetails;
        var condition = staffDetails ? {
                staffDetails: {
                    [Op.like]: `%${email}%`,
                    [Op.like]: `%${password}%`,
                },
            } :
            Staff.findAll({ where: condition })
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Error Occured.",
                });
            });
    },

    updateStaffDetails: async(req, res) => {
        const email = req.params.email;
        try {
            const num = await Staff.update(req.body, {
                where: { email: email },
            });

            if (num == 1) {
                res.send({ message: "Updated Successfully." });
            } else {
                res.send({ message: `Cannot Update ${amenityID}.` });
            }
        } catch (err) {
            res.status(500).send({
                message: `Error 500 Updating ${amenityID}`,
            });
        }
    },

    deleteStaff: async(req, res) => {
        try {
            let email = req.params.email;

            await Staff.destroy({
                where: { email: email },
            });

            return res.status(200).json({
                message: "Staff Deleted Successfully",
            });
        } catch (err) {
            return res.status(400).json({ error });
        }
    },

    createStaff: (req, res) => {
        const creates = {
            email: req.body.email,
            password: req.body.password,
        };

        Staff.create(creates)
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