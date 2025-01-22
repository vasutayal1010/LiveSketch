import mongoose from "mongoose";

const DB_NAME = process.env.DB_NAME;

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("DataBase Connection Failed (:", error);
    process.exit(1);
  }
};

export default connectDB;
