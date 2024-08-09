import mongoose from "mongoose";

type connection = {
  isConnected?: number;
};

const connected: connection = {};

const connectToDB = async () => {
  if (connected.isConnected) {
    console.log("database is already connected");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI!);
    const test = (connected.isConnected = db.connections[0].readyState);

    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to DB: ", error);
  }
};

export default connectToDB;
