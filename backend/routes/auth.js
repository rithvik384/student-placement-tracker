const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../config/mysql");
require("dotenv").config();

const router = express.Router();

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";

  db.query(sql, [email, hashedPassword], (err) => {
    if (err) {
      return res.status(400).json({ message: "User already exists" });
    }
    res.json({ message: "User registered successfully" });
  });
});

const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );


    res.json({
      message: "Login successful",
      token
    });
  });
});

module.exports = router;
