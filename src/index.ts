import express from "express";
import dotenv from "dotenv";
import logger from "./utils/logger";
import configureApp from "./config/configureApp";
import connect from "./utils/connect";
import routes from "./routes";
import startApolloServer from "./apollo/server";

const bootstrapServer = async (): Promise<void> => {
  try {
    dotenv.config();
    const app = express();
    const PORT = process.env.PORT || 4000;

    configureApp(app);
    await startApolloServer(app);

    const server = app.listen(PORT, async () => {
      logger.info(`Server running on http://localhost:${PORT}`);
      await connect();
      routes(app);
    });
  } catch (error: any) {
    logger.error(`Error starting server: ${error.message}`);
    process.exit(1);
  }
};

bootstrapServer();
