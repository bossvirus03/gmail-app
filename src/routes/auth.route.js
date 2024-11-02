const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");

router.get("/login", AuthController.loginView);
router.get("/register", AuthController.registerView);

router.post("/login", AuthController.loginUser);
router.post("/register", AuthController.registerUser);
router.get("/logout", AuthController.logoutUser);

module.exports = router;
