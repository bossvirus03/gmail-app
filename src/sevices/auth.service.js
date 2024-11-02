const db = require("../utils/db");
const uuid = require("uuid");
module.exports = {
  handleLogin: (req, res) => {
    const { email, password } = req.body;
    db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
      (err, results) => {
        if (err) {
          console.error("Lỗi truy vấn cơ sở dữ liệu:", err);
          return res.status(500).send("Đã xảy ra lỗi, vui lòng thử lại sau.");
        }

        if (results.length > 0) {
          res.cookie("session_token", uuid.v4());
          req.session.userId = results[0].id;
          res.redirect("/inbox");
        } else {
          res.render("login", { message: "Email hoặc mật khẩu không đúng" });
        }
      }
    );
  },
  handleRegister: (req, res) => {
    const { fullname, email, password, confirmPassword } = req.body;
    if (!fullname || !email || !password || !confirmPassword) {
      return res.render("register", {
        message: "Tất cả các trường đều bắt buộc",
      });
    }

    if (password.length < 6) {
      return res.render("register", {
        message: "password cần ít nhất 6 kí tự",
      });
    }

    if (password !== confirmPassword) {
      return res.render("register", {
        message: "Mật khẩu nhập lại không khớp!",
      });
    }

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) return res.status(500).send("Database error");

      if (results.length > 0) {
        return res.render("register", { message: "Email đã tồn tại!" });
      }

      db.query(
        "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)",
        [fullname, email, password],
        (err) => {
          if (err) return res.status(500).send("Database error");
          res.render("login", {
            message: "Đăng kí thành công! Vui lòng đăng nhập",
          });
        }
      );
    });

    res.redirect("/login");
  },
};
