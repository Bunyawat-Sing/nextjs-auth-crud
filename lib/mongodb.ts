import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in environment variables.");
    }

    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};