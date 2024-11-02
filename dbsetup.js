const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "wpr",
  password: "fit2024",
  multipleStatements: true,
});

const sql = `
  CREATE DATABASE IF NOT EXISTS wpr2221050658;
  USE wpr2221050658;
  
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
  );

  CREATE TABLE IF NOT EXISTS emails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender INT,
    receiver INT,
    subject VARCHAR(255),
    body TEXT,
    attachment VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender) REFERENCES users(id),
    FOREIGN KEY (receiver) REFERENCES users(id)
  );

  INSERT INTO users (fullname, email, password) VALUES 
    ('User A', 'a@a.com', '123'),
    ('User B', 'b@b.com', '123'),
    ('User C', 'c@c.com', '123');

  INSERT INTO emails (sender, receiver, subject, body) VALUES 
    (1, 2, 'Hello', 'This is an email from User A to User B'),
    (2, 1, 'Reply', 'This is an email from User B to User A');
`;

db.connect((err) => {
  if (err) throw err;
  console.log("Đã kết nối tới MySQL");

  db.query(sql, (error) => {
    if (error) throw error;
    console.log("Cơ sở dữ liệu và bảng đã được khởi tạo");
    db.end();
  });
});
