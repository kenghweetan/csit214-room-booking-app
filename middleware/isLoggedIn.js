module.exports = {
  isLoggedIn: (req, res, next) => {
    if (!req.session.loggedIn && req.url != "/login")
      return res.redirect("/login");
    if (req.session.loggedIn && req.url === "/login") return res.redirect("/");
    next();
  },
  isStudent: (req, res, next) => {
    if (req.session.userType !== "Student") return res.redirect("/");
    next();
  },
  isStaff: (req, res, next) => {
    if (req.session.userType !== "Staff") return res.redirect("/");
    next();
  },
  isUserAdmin: (req, res, next) => {
    if (req.session.userType !== "userAdmin") return res.redirect("/");
    next();
  },
};
