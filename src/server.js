require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

const authRoutes = require("./routes/auth.route");
const emailRoutes = require("./routes/email.route");
const authMiddleware = require("./middlewares/auth.middleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("1234"));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(express.static(path.join("public")));

app.use(authMiddleware);

app.get("/", (req, res) => res.render("home"));
app.use("/", authRoutes);
app.use("/", emailRoutes);
app.use("/private", (req, res) => res.send("Private page"));

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
