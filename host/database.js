import mongoose from "mongoose";
// Method connect to DB

const connectDB = async () => {
  try {
    const db = mongoose.connect(process.env.URI_MONGODB);
    console.log("Connect to MongoDB successfully");

    return db;
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default connectDB;
