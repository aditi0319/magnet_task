const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();
const taskRoutes = require("./routes/taskRoutes");

app.use(cors());
app.use(express.json());

// 🔑 AUTH ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// TEST
app.get("/", (req, res) => {
  res.send("HELLO FROM SERVER");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
