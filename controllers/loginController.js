const db = require("../db/models/index");

module.exports = async function login(req, res) {
  const { userType, email, password } = req.body;
  const userTypeModel = db[userType];

  if (!(email && password))
    return res.status(401).send("Please enter Email or Password");

  if (!userTypeModel)
    return res.status(401).send(`Invalid User Type: ${userType}`);

  // Execute SQL query that'll select the account from the database based on the specified email and password
  try {
    const validStudent = await userTypeModel.findOne({
      where: { email: email, password: password },
    });

    console.log(validStudent);

    if (!validStudent)
      return res.status(401).send("Incorrect Email and/or Password");
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Internal Server Error",
    });
  }

  // Authenticate the user
  req.session.loggedIn = true;
  req.session.email = email;
  req.session.userType = userType;

  return res.status(200).end();
};
