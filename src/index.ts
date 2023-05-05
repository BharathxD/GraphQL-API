import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import logger from "./utils/logger";
import configureApp from "./config/configureApp";
import apolloServer from "./apollo/server";
import connect from "./utils/connect";


const bootstrapServer = async () => {
    dotenv.config();
    const app = express();

    const PORT = process.env.PORT || 4000;

    configureApp(app);

    await apolloServer(app);

    const expressServer = app.listen(PORT, async () => {
        logger.info(`The server is running at http://localhost:${PORT}}`);
        await connect();
        routes(app);
    })
}

bootstrapServer();