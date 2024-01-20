import { Request, Response, NextFunction } from "express";
import * as logger from "firebase-functions/logger";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  throw Error("No mongo URI");
}

export const connectMongoose = async (req: Request, res: Response, next: NextFunction) => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(mongoURI);
      logger.info('Connected to MongoDB');
      next();
    } catch (error) {
      logger.error('Error connecting to MongoDB', error);
      res.status(500).send('Error connecting to database');
    }
  } else {
    next();
  }
};