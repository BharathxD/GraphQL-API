import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import logger from "./utils/logger";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, async () => {
    logger.info(`The server is running at http://localhost:${PORT}}`);
    routes(app);
})