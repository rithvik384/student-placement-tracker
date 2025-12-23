const express = require("express");
const db = require("../config/mysql");
const auth = require("../middleware/authMiddleware");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/profile", auth, (req, res) => {
  const { name, branch } = req.body;
  const userId = req.user.id;
  
  const checkSql = "SELECT id FROM students WHERE user_id = ?";

db.query(checkSql, [req.user.id], (err, rows) => {
  if (rows.length > 0) {
    return res.status(400).json({ message: "Profile already exists" });
  }

  const sql = `
    INSERT INTO students (user_id, name, branch)
    VALUES (?, ?, ?)
  `;
});


  /*const sql = `
    INSERT INTO students (user_id, name, branch)
    VALUES (?, ?, ?)
  `;*/

  db.query(sql, [userId, name, branch], (err) => {
    if (err) {
      return res.status(400).json({ message: "Profile already exists" });
    }
    res.json({ message: "Profile created" });
  });
});

router.get("/profile", auth, (req, res) => {
  const userId = req.user.id;

  const sql = "SELECT * FROM students WHERE user_id = ?";

  db.query(sql, [userId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(results[0]);
  });
});

router.put("/profile", auth, (req, res) => {
  const { company, package_lpa, status } = req.body;
  const userId = req.user.id;

  const sql = `
    UPDATE students
    SET company = ?, package_lpa = ?, status = ?
    WHERE user_id = ?
  `;

  db.query(sql, [company, package_lpa, status, userId], (err) => {
    if (err) {
      return res.status(400).json({ message: "Update failed" });
    }
    res.json({ message: "Profile updated" });
  });
});

router.put("/profile", authenticateToken, (req, res) => {
  const { company, package_lpa, status } = req.body;

  const sql = `
    UPDATE students
    SET company = ?, package_lpa = ?, status = ?
    WHERE user_id = ?
  `;

  db.query(sql, [company, package_lpa, status, req.user.id], (err) => {
    if (err) return res.status(500).json({ message: "Update failed" });

    res.json({ message: "Profile updated" });
  });
});

module.exports = router;
