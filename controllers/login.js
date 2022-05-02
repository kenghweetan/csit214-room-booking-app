const db = require("../db/models/index");

module.exports = async function login(req, res) {
  const { userType, email, password } = req.body;
  const userModel = db[userType];

  if (!(email && password))
    return res.status(401).send("Please enter Email and Password");

  if (!userModel) return res.status(401).send(`Invalid User Type: ${userType}`);

  // Execute SQL query that'll select the account from the database based on the specified username and password
  const validStudent = await userModel.findOne({
    where: { email: email, password: password },
  });
  console.log(validStudent);
  if (validStudent) {
    // Authenticate the user
    req.session.loggedIn = true;
    req.session.email = email;
    req.session.userType = userType;
    // Redirect to home page
    return res.status(200).end();
  } else {
    return res.status(401).send("Incorrect Email and/or Password");
  }
};
