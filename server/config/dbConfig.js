const mongoose = require("mongoose");

// ✅ Hardcoded MongoDB URI
const MONGO_URL = "mongodb+srv://vignesh:V8uzVIc4uV5F5TA9@cluster0.xnkcutc.mongodb.net/quiz?retryWrites=true&w=majority";

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
