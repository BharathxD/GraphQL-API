import mongoose from "mongoose";
import logger from "./logger";

const connect = async () => {
  const mongoUrl = process.env.DB_URI;
  mongoose.set({
    strictQuery: false,
  });
  try {
    if (!mongoUrl) {
      throw new Error("Provided Invalid MongoDB URL");
    }
    await mongoose.connect(mongoUrl);
    logger.info("Successfuly connected to the MongoDB Atlas ✅");
  } catch (error: any) {
    logger.error(`Something went wrong ❌: ${error.message}`);
    process.exit(1);
  }
};

export default connect;
