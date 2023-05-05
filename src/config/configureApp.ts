import cookieParser from "cookie-parser";
import { Express } from "express";

const configureApp = async (app: Express) => {
    app.use(cookieParser());
}

export default configureApp;