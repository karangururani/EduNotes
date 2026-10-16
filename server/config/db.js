
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("URI Loaded:", !!process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);

    const users = await conn.connection.db
      .collection("users")
      .find({})
      .project({ name: 1, email: 1 })
      .toArray();

    console.log("===== USERS FROM DATABASE =====");
    console.log(users);
    console.log("===============================");

  } catch (error) {
    console.error("Mongo Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
