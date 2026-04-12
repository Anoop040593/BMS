import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo DB connected");
  } catch (e) {
    console.log("Mongo DB connection failed");
    process.exit(1);
  }
};

export default connectDB;
