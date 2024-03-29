const db = require("../db/models/index");

module.exports = {
  login: async (req, res) => {
    const { userType, email, password } = req.body;
    const userTypeModel = db[userType];

    if (!(email && password))
      return res.status(401).send("Please enter Email or Password");

    if (!userTypeModel)
      return res.status(401).send(`Invalid User Type: ${userType}`);

    // Execute SQL query that'll select the account from the database based on the specified email and password
    try {
      const validUser = await userTypeModel.findOne({
        where: { email: email },
      });

      console.log(validUser);

      if (!validUser) return res.status(401).send("User not found");
      if (validUser.password !== password)
        return res.status(401).send("Incorrect Password");
      if (validUser.suspended)
        return res.status(401).send("User has been suspended");

      await userTypeModel.update(
        { lastLoggedIn: new Date() },
        {
          where: { email: email },
        }
      );
    } catch (err) {
      return res
        .status(500)
        .send(`${err.message ? err.message : "Internal Server Error"}`);
    }

    // Authenticate the user
    req.session.loggedIn = true;
    req.session.email = email;
    req.session.userType = userType;

    return res.status(200).end();
  },

  logout: async (req, res) => {
    // Authenticate the user
    try {
      const userTypeModel = db[req.session.userType];

      await userTypeModel.update(
        { lastLoggedOut: new Date() },
        {
          where: { email: req.session.email },
        }
      );

      req.session.loggedIn = false;
      req.session.email = "";
      req.session.userType = "";
    } catch (err) {
      return res
        .status(500)
        .send(`${err.message ? err.message : "Internal Server Error"}`);
    }

    return res.status(200).end();
  },
};
