const express = require("express");
const cors = require("cors");
const studentRoutes = require("./backend/routes/student");
const authRoutes = require("./backend/routes/auth");
const adminRoutes = require("./backend/routes/admin");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Backend server is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
