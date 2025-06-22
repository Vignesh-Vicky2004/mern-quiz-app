const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());

// DB config
const dbConfig = require("./config/dbConfig");

// Routes
const usersRoute = require("./routes/usersRoute");
const examsRoute = require("./routes/examsRoute");
const reportsRoute = require("./routes/reportsRoute");

app.use("/api/users", usersRoute);
app.use("/api/exams", examsRoute);
app.use("/api/reports", reportsRoute);

// Serve frontend from client/build
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname1, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
