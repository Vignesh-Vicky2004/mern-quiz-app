const mongoose = require("mongoose");
require("dotenv").config(); // Load .env variables (only needed for local dev)

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("✅ MongoDB Connection Successful");
});

connection.on("error", (err) => {
  console.error("❌ MongoDB Connection Failed:", err);
});

module.exports = connection;
