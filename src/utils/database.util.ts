import mongoose from 'mongoose';
import logger from './logger.util';

export default class Database {
  private mongoUrl: string;

  constructor(mongoUrl?: string) {
    if (!process.env.DB_URI) {
      throw new Error('MongoDB URI is not provided');
    }
    this.mongoUrl = mongoUrl ?? process.env.DB_URI;
    mongoose.set('strictQuery', false);
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.mongoUrl);
      logger.info('Successfully connected to MongoDB Atlas ✅');
    } catch (error: any) {
      logger.error(`Error connecting to MongoDB Atlas ❌: ${error.message}`);
      process.exit(1);
    }
  }
}

