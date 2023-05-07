import dotenv from "dotenv";
import express from "express";
import logger from "./utils/logger.util";
import configureApplicationMiddleware from "./middleware/configureApp";
import startApolloServer from "./apollo/server";
import routes from "./api/routes";
import Database from "./utils/database.util";
import { gracefulShutdown } from "./utils/gracefulShutdown.util";

/**
 * This function starts a server using Express and Apollo Server, and connects to a database.
 */
const bootstrapServer = async (): Promise<void> => {
  try {
    dotenv.config();
    const app = express();
    const PORT = process.env.PORT || 4000;
    /**
     * This function sets up middleware such as CORS (Cross-Origin Resource Sharing) and cookie parsers, which are commonly used in web applications.
     */
    configureApplicationMiddleware(app);
    /**
     * `startApolloServer()` is starting an Apollo Server instance and attaching it to the Express app.
     * This allows the app to handle GraphQL requests and responses. The `startApolloServer` function
       is defined in a separate file and is responsible for setting up the Apollo Server instance
       with the necessary schema, resolvers, and other configuration options. 
     */
    await startApolloServer(app);
    /**
     * This code is starting the server by listening on a specified port (either the port specified in
       the environment variable `PORT` or the default port 4000). Once the server is started, it logs a
       message to the console indicating that the server is running.
     * It then attempts to connect to a
       database using the `Database` class and sets up the application routes using the `routes`
       function.
     * If there is an error connecting to the database, it logs an error message and exits
       the process with a status code of 1.
    */
    const server = app.listen(PORT, async () => {
      logger.info(`Server running on http://localhost:${PORT} 👾`);
      try {
        await new Database().connect();
        routes(app);
      } catch (error: any) {
        logger.error(`Error connecting to database: ${error.message}`);
        process.exit(1);
      }
    });
    /**
     * The `gracefulShutdown` function is responsible for handling the shutdown process when the server
     * receives one of these signals, allowing it to close any open connections and perform any
     * necessary cleanup before shutting down completely.
     */
    const SIGNALS = ["SIGTERM", "SIGINT"];
    SIGNALS.forEach(async (signal) => {
      gracefulShutdown(signal, server);
    });
  } catch (error: any) {
    logger.error(`Error starting server: ${error.message}`);
  }
};

bootstrapServer();
