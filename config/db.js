const mongoose = require("mongoose");

const connectDB = async () => {
  const db = await mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
  });
  console.log(`MongoDB connected:${db.connection.host}`);
};

module.exports = connectDB;
