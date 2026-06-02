import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo: MongoMemoryServer;

export const connectDB = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri);

  console.log("MongoDB In-Memory connected");
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
  await mongo.stop();
};
