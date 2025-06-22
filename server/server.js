const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// MongoDB config
const dbConfig = require("./config/dbConfig");

// Routes
const usersRoute = require("./routes/usersRoute");
const examsRoute = require("./routes/examsRoute");
const reportsRoute = require("./routes/reportsRoute");

app.use("/api/users", usersRoute);
app.use("/api/exams", examsRoute);
app.use("/api/reports", reportsRoute);

// Serve React frontend in production
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname1, "client", "build", "index.html"));
  });
}

// Default test route
app.get("/", (req, res) => {
  res.send("🟢 Backend is running");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
