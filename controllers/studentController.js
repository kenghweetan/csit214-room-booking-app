const db = require("../db/models");
const Op = db.Sequelize.Op;
const { Student } = db;

module.exports = {
    findAll: async(req, res) => {
        const studentDetails = req.query.studentDetails;
        var condition = studentDetails ? {
                studentDetails: {
                    [Op.like]: `%${email}%`,
                    [Op.like]: `%${password}%`,
                    [Op.like]: `%${suspended}%`,
                    [Op.like]: `%${lastLoggedIn}%`,
                    [Op.like]: `%${lastLoggedOut}%`,
                },
            } :
            Student.findAll({ where: condition })
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Error Occured.",
                });
            });
    },

    updateStudentDetails: async(req, res) => {
        const email = req.params.email;
        try {
            const num = await Student.update(req.body, {
                where: { email: email },
            });

            if (num == 1) {
                res.send({ message: "Updated Successfully." });
            } else {
                res.send({ message: `Cannot Update` });
            }
        } catch (err) {
            res.status(500).send({
                message: `Error 500 Updating`,
            });
        }
    },

    deleteStudent: async(req, res) => {
        try {
            let email = req.params.email;

            await Student.destroy({
                where: { email: email },
            });

            return res.status(200).json({
                message: "Student Deleted Successfully",
            });
        } catch (err) {
            return res.status(400).json({ error });
        }
    },

    createStudent: (req, res) => {
        const creates = {
            email: req.body.email,
            password: req.body.password,
            suspended: req.body.suspended,
            lastLoggedIn: req.body.lastLoggedIn,
            lastLoggedOut: req.body.lastLoggedOut
        };

        Student.create(creates)
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