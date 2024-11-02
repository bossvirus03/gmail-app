const AuthService = require("../sevices/auth.service");

module.exports = {
  loginView: (req, res) => {
    res.render("login", {
      message: "",
    });
  },

  registerView: (req, res) => {
    res.render("register");
  },

  loginUser: AuthService.handleLogin,
  registerUser: AuthService.handleRegister,
  logoutUser: (req, res) => {
    res.clearCookie("session_token");
    res.redirect("/login");
  },
};
