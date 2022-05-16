const db = require("../db/models");
const Op = db.Sequelize.Op;
const { userAdmin, Student, Staff } = db;

module.exports = {
  findByEmailAndType: async (req, res) => {
    try {
      const userEmail = req.params.userEmail;
      const userType = req.params.userType;
      const userTypeModel = userType === "Student" ? Student : Staff;

      const result = await userTypeModel.findOne({
        where: { email: userEmail },
      });

      res.send(result);
    } catch (err) {
      res.status(500).send(`${err.message ? err.message : "error occured"}`);
    }
  },

  findAllStudentAndStaff: async (req, res) => {
    try {
      const students = (await Student.findAll()).map((student) => {
        return { ...student.dataValues, type: "Student" };
      });

      const staffs = (await Staff.findAll()).map((staff) => {
        return { ...staff.dataValues, type: "Staff" };
      });
      res.send([...students, ...staffs]);
    } catch (err) {
      console.log(err);
      res.status(500).send(`${err.message ? err.message : "error occured"}`);
    }
  },

  updateUserAdminDetails: async (req, res) => {
    const email = req.params.email;
    try {
      const num = await userAdmin.update(req.body, {
        where: { email: email },
      });

      if (num == 1) {
        res.send({ message: "Updated Successfully." });
      } else {
        res.send({ message: `Cannot Update` });
      }
    } catch (err) {
      res.status(500).send(`${err.message ? err.message : "error occured"}`);
    }
  },

  deleteUserAdmin: async (req, res) => {
    try {
      let email = req.params.email;

      await userAdmin.destroy({
        where: { email: email },
      });

      return res.status(200).json({
        message: "User Admin Deleted Successfully",
      });
    } catch (err) {
      return res
        .status(400)
        .send(`${err.message ? err.message : "error occured"}`);
    }
  },

  createUserAdmin: (req, res) => {
    const creates = {
      email: req.body.email,
      password: req.body.password,
      suspended: req.body.suspended,
      lastLoggedIn: req.body.lastLoggedIn,
      lastLoggedOut: req.body.lastLoggedOut,
    };

    userAdmin
      .create(creates)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send(`${err.message ? err.message : "error occured"}`);
      });
  },
};
