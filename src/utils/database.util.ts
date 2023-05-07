import mongoose from "mongoose";
import logger from "./logger.util";

/* This is a TypeScript class that connects to a MongoDB Atlas database and allows for disconnection. */
export default class Database {
  private mongoUrl: string;

  constructor(mongoUrl?: string) {
    if (!process.env.DB_URI) {
      throw new Error("MongoDB URI is not provided");
    }
    this.mongoUrl = mongoUrl ?? process.env.DB_URI;
    mongoose.set("strictQuery", false);
  }

  /**
   * This function connects to a MongoDB Atlas database using a provided URL and logs a success message
   * or exits the process with an error message if the connection fails.
   */
  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.mongoUrl);
      logger.info("Successfully connected to MongoDB Atlas ✅");
    } catch (error: any) {
      logger.error(`Error connecting to MongoDB Atlas ❌: ${error.message}`);
      process.exit(1);
    }
  }
  /**
   * This is a TypeScript function that disconnects from a MongoDB database using Mongoose and returns
   * a Promise that resolves to void or a string error message.
   * @returns The `disconnect` method is returning a `Promise` that resolves to `void` if the
   * disconnection is successful, or a `string` containing the error message if an error occurs during
   * the disconnection process.
   */
  public async disconnect(): Promise<void | string> {
    try {
      return await mongoose.disconnect();
    } catch (error: any) {
      return error.message;
    }
  }
}
