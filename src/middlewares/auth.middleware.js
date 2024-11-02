function authMiddleware(req, res, next) {
  const sessionToken = req.cookies["session_token"];
  const isAuthPage = req.path === "/login" || req.path === "/register";

  if (sessionToken) {
    if (isAuthPage) {
      return res.redirect("/inbox");
    }
  } else {
    console.log("Không thấy session token");
    if (!isAuthPage) {
      return res.redirect("/login");
    }
  }

  next();
}

module.exports = authMiddleware;
