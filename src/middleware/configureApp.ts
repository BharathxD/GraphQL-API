import cookieParser from "cookie-parser";
import { Express } from "express";

const configureApplicationMiddleware = async (app: Express) => {
  app.use(cookieParser());
};

export default configureApplicationMiddleware;
