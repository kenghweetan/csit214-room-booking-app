const db = require("../db/models");
const Op = db.Sequelize.Op;
const { Amenity } = db;

module.exports = {
    findAll: async(req, res) => {
        const condition = req.query.RoomName ? {
                RoomName: {
                    [Op.eq]: req.query.RoomName,
                },
            } :
            null;
        Amenity.findAll({ where: condition })
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Error Occured.",
                });
            });
    },

    updateAmenityDetails: async(req, res) => {
        const RoomName = req.params.RoomName;
        try {
            const num = await Amenity.update(req.body, {
                where: { RoomName: RoomName },
            });

            if (num == 1) {
                res.send({ message: "Updated Successfully." });
            } else {
                res.send({ message: `Cannot Update ${RoomName}.` });
            }
        } catch (err) {
            res.status(500).send({
                message: `Error 500 Updating ${RoomName}`,
            });
        }
    },

    deleteAmenity: async(req, res) => {
        try {
            let RoomName = req.params.RoomName;

            await Amenity.destroy({
                where: { RoomName: RoomName },
            });

            return res.status(200).json({
                message: "Amenity Deleted Successfully",
            });
        } catch (err) {
            return res.status(400).json({ error });
        }
    },

    createAmenity: (req, res) => {
        const creates = {
            type: req.body.type,
            RoomName: req.body.RoomName,
        };

        Amenity.create(creates)
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