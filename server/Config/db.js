import mongoose from "mongoose";

const DB_NAME = "Excel_Analytics";

const connectdb = async () => {
  try {
    const connectInstruct = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `✅ Successfully connected to MongoDB: ${connectInstruct.connection.host}`
    );
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectdb;
