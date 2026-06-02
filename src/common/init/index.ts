import { connectDB } from "../database/mongo";

export const initPackages = async () => {
  await connectDB();
};
