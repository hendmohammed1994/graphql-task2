import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URL = process.env.MONGODB_URI;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection error:", error.message);
    throw error;
  }
};

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

export { connectToDatabase, closeDatabase, clearDatabase };
