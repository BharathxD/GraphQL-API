import dotenv from "dotenv";
import express from "express";
import logger from "./utils/logger.util";
import configureApplicationMiddleware from "./middleware/configureApp";
import startApolloServer from "./apollo/server";
import connect from "./utils/database.util";
import routes from "./api/routes";
import Database from "./utils/database.util";

/*** This function starts a server using Express and Apollo Server, and connects to a database. */
const bootstrapServer = async (): Promise<void> => {
  try {
    dotenv.config();
    const app = express();
    const PORT = process.env.PORT || 4000;
    configureApplicationMiddleware(app);
    await startApolloServer(app);

    const server = app.listen(PORT, async () => {
      logger.info(`Server running on http://localhost:${PORT} 👾`);
      await new Database().connect();
      routes(app);
    });
  } catch (error: any) {
    logger.error(`Error starting server: ${error.message}`);
  }
};

bootstrapServer();
