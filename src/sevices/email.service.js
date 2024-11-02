const db = require("../utils/db");
module.exports = {
  listInbox: (req, res) => {
    if (!req.session.userId) return res.redirect("/login");
    db.query(
      "SELECT * FROM emails WHERE receiver = ?",
      [req.session.userId],
      (err, emails) => {
        res.render("inbox", { emails });
      }
    );
  },
  composeView: (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.redirect("/login");
    }

    db.query(
      "SELECT id, email FROM users WHERE id != ?",
      [userId],
      (err, results) => {
        if (err) {
          console.error("Lỗi khi truy vấn cơ sở dữ liệu:", err);
          return res.render("error", {
            message: "Đã xảy ra lỗi, vui lòng thử lại sau.",
          });
        }

        res.render("compose", { users: results, message: null });
      }
    );
  },
  postCompose: (req, res) => {
    const { receiverId, subject, body } = req.body;
    const senderId = req.session.userId;

    if (!senderId) {
      return res.redirect("/login");
    }

    db.query(
      "INSERT INTO emails (sender, receiver, subject, body, created_at) VALUES (?, ?, ?, ?, NOW())",
      [senderId, receiverId, subject, body],
      (err) => {
        if (err) {
          console.error("Lỗi khi gửi email:", err);
          return res.render("compose", {
            users: [],
            message: "Đã xảy ra lỗi, vui lòng thử lại.",
          });
        }

        res.redirect("/sent");
      }
    );
  },
  sentView: (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.redirect("/login");
    }

    db.query(
      "SELECT * FROM emails WHERE sender = ? ORDER BY created_at DESC",
      [userId],
      (err, results) => {
        if (err) {
          console.error("Lỗi khi truy vấn cơ sở dữ liệu:", err);
          return res.render("error", {
            message: "Đã xảy ra lỗi, vui lòng thử lại sau.",
          });
        }

        res.render("sent", { emails: results });
      }
    );
  },
  emailDetailView: (req, res) => {
    const emailId = req.params.id;

    const query = `SELECT emails.*, users.fullname AS senderName 
                   FROM emails 
                   JOIN users ON emails.sender = users.id 
                   WHERE emails.id = ?`;

    db.query(query, [emailId], (err, results) => {
      if (err) {
        return res.status(500).send("Lỗi truy vấn cơ sở dữ liệu");
      }

      if (results.length === 0) {
        return res.status(404).send("Email không tồn tại");
      }

      const email = results[0];
      res.render("detail", { email });
    });
  },
  deleteEmail: (req, res) => {
    const emailId = req.params.id;

    db.query("DELETE FROM emails WHERE id = ?", [emailId], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi truy vấn cơ sở dữ liệu" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Email không tồn tại" });
      }

      res.json({ message: "Email đã được xóa thành công" });
    });
  },
};
