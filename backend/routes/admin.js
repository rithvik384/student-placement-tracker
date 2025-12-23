const express = require("express");
const router = express.Router();
const db = require("../config/mysql");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/students", authenticateToken, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const sql = `
    SELECT students.id, name, branch, company, package_lpa, status, users.email
    FROM students
    JOIN users ON students.user_id = users.id
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });

    res.json(results);
  });
});

module.exports = router;

router.get("/stats", authenticateToken, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const sql = `
    SELECT
      COUNT(*) AS total_students,
      SUM(status = 'Placed') AS placed_students,
      ROUND(
        (SUM(status = 'Placed') / COUNT(*)) * 100,
        2
      ) AS placement_percentage,
      ROUND(AVG(package_lpa), 2) AS avg_package
    FROM students
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });

    res.json(results[0]);
  });
});
